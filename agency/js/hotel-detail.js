// Hotel Detail Page JavaScript
$(document).ready(function() {
    // Get hotel ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const hotelId = urlParams.get('id');
    
    if (!hotelId) {
        window.location.href = 'hotels.html';
        return;
    }
    
    // Load hotel details
    const hotel = HotelAgency.getHotelById(hotelId);
    
    if (!hotel) {
        $('#hotelDetail').html('<div class="alert alert-danger">호텔을 찾을 수 없습니다.</div>');
        return;
    }
    
    displayHotelDetail(hotel);
    
    // Booking form handlers
    $('#bookingCheckIn, #bookingCheckOut, #bookingGuests').on('change', calculateTotal);
    $('#confirmBooking').on('click', confirmBooking);
    
    // Set minimum dates
    const today = new Date().toISOString().split('T')[0];
    $('#bookingCheckIn').attr('min', today);
    $('#bookingCheckOut').attr('min', today);
    
    $('#bookingCheckIn').on('change', function() {
        const checkInDate = $(this).val();
        if (checkInDate) {
            const nextDay = new Date(checkInDate);
            nextDay.setDate(nextDay.getDate() + 1);
            $('#bookingCheckOut').attr('min', nextDay.toISOString().split('T')[0]);
        }
    });
});

function displayHotelDetail(hotel) {
    const amenitiesIcons = {
        wifi: '<i class="fa fa-wifi"></i> 무선 인터넷',
        parking: '<i class="fa fa-car"></i> 주차',
        pool: '<i class="fa fa-tint"></i> 수영장',
        gym: '<i class="fa fa-dumbbell"></i> 헬스장',
        spa: '<i class="fa fa-spa"></i> 스파',
        restaurant: '<i class="fa fa-utensils"></i> 레스토랑'
    };
    
    const amenitiesHtml = hotel.amenities.map(amenity => 
        `<span class="amenity-badge">${amenitiesIcons[amenity] || amenity}</span>`
    ).join('');
    
    const html = `
        <div class="row">
            <div class="col-md-8">
                <img src="${hotel.image}" alt="${hotel.name}" class="img-responsive" style="width: 100%; border-radius: 10px; margin-bottom: 30px;">
                <h1 style="font-size: 36px; font-weight: 700; margin-bottom: 20px; color: #2c3e50;">${hotel.name}</h1>
                <p style="font-size: 18px; color: #7f8c8d; margin-bottom: 20px;">
                    <i class="fa fa-map-marker"></i> ${hotel.location} - ${hotel.address}
                </p>
                <div style="margin-bottom: 30px;">
                    ${HotelAgency.renderStars(hotel.rating)}
                    <span style="margin-left: 10px; font-size: 18px; color: #7f8c8d;">${hotel.rating}성급 호텔</span>
                </div>
                <div style="margin-bottom: 30px;">
                    <h3>설명</h3>
                    <p style="font-size: 16px; line-height: 1.8; color: #555;">${hotel.description || '상세 설명이 없습니다.'}</p>
                </div>
                <div style="margin-bottom: 30px;">
                    <h3>편의시설</h3>
                    <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                        ${amenitiesHtml}
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="booking-widget" style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); position: sticky; top: 90px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <div style="font-size: 36px; font-weight: 700; color: #3498db; margin-bottom: 10px;">
                            ${HotelAgency.formatPrice(hotel.price)}
                        </div>
                        <div style="color: #7f8c8d;">1박 기준</div>
                    </div>
                    <button class="btn btn-primary btn-lg btn-block" data-toggle="modal" data-target="#bookingModal" onclick="openBookingModal(${hotel.id})">
                        예약하기
                    </button>
                    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ecf0f1;">
                        <p style="color: #7f8c8d; font-size: 14px; margin-bottom: 5px;">
                            <i class="fa fa-check"></i> 무료 취소 가능
                        </p>
                        <p style="color: #7f8c8d; font-size: 14px; margin-bottom: 5px;">
                            <i class="fa fa-check"></i> 즉시 확인
                        </p>
                        <p style="color: #7f8c8d; font-size: 14px;">
                            <i class="fa fa-check"></i> 최저가 보장
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    $('#hotelDetail').html(html);
}

function openBookingModal(hotelId) {
    const hotel = HotelAgency.getHotelById(hotelId);
    $('#bookingHotelId').val(hotelId);
    $('#bookingHotelName').val(hotel.name);
    calculateTotal();
}

function calculateTotal() {
    const hotelId = $('#bookingHotelId').val();
    if (!hotelId) return;
    
    const hotel = HotelAgency.getHotelById(hotelId);
    const checkIn = $('#bookingCheckIn').val();
    const checkOut = $('#bookingCheckOut').val();
    const guests = parseInt($('#bookingGuests').val()) || 2;
    
    if (checkIn && checkOut) {
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
        
        if (nights > 0) {
            const totalPrice = hotel.price * nights * guests;
            $('#bookingTotalPrice').text(HotelAgency.formatPrice(totalPrice));
        } else {
            $('#bookingTotalPrice').text('0원');
        }
    } else {
        $('#bookingTotalPrice').text('0원');
    }
}

function confirmBooking() {
    const form = $('#bookingForm');
    
    if (!form[0].checkValidity()) {
        form[0].reportValidity();
        return;
    }
    
    const bookingData = {
        hotelId: $('#bookingHotelId').val(),
        checkIn: $('#bookingCheckIn').val(),
        checkOut: $('#bookingCheckOut').val(),
        guests: $('#bookingGuests').val(),
        customerName: $('#bookingCustomerName').val(),
        customerEmail: $('#bookingCustomerEmail').val(),
        customerPhone: $('#bookingCustomerPhone').val()
    };
    
    const booking = HotelAgency.addBooking(bookingData);
    
    $('#bookingModal').modal('hide');
    form[0].reset();
    
    alert(`예약이 완료되었습니다!\n예약번호: #${booking.id}\n총액: ${HotelAgency.formatPrice(booking.totalPrice)}`);
    
    // Redirect to bookings page
    setTimeout(() => {
        window.location.href = 'bookings.html';
    }, 1000);
}


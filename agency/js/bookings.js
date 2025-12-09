// Bookings Page JavaScript
$(document).ready(function() {
    loadBookings();
});

function loadBookings() {
    const bookings = HotelAgency.getBookings();
    const hotels = HotelAgency.getHotels();
    const container = $('#bookingsList');
    
    if (bookings.length === 0) {
        container.html(`
            <div class="text-center" style="padding: 60px;">
                <i class="fa fa-calendar-times-o" style="font-size: 64px; color: #ccc; margin-bottom: 20px;"></i>
                <h3>예약 내역이 없습니다</h3>
                <p>호텔을 예약해보세요!</p>
                <a href="hotels.html" class="btn btn-primary">호텔 찾기</a>
            </div>
        `);
        return;
    }
    
    // Sort by date (newest first)
    bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    const html = bookings.map(booking => {
        const hotel = hotels.find(h => h.id === booking.hotelId);
        return `
            <div class="hotel-card" style="margin-bottom: 30px;">
                <div class="hotel-card-body">
                    <div class="row">
                        <div class="col-md-3">
                            <img src="${hotel ? hotel.image : '../template/assets/images/room-1.jpg'}" 
                                 alt="${booking.hotelName}" 
                                 class="img-responsive" 
                                 style="width: 100%; border-radius: 5px;">
                        </div>
                        <div class="col-md-9">
                            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                                <div>
                                    <h3 style="margin-top: 0; color: #2c3e50;">${booking.hotelName}</h3>
                                    <p style="color: #7f8c8d; margin-bottom: 10px;">
                                        <i class="fa fa-calendar"></i> 
                                        ${HotelAgency.formatDate(booking.checkIn)} ~ ${HotelAgency.formatDate(booking.checkOut)}
                                    </p>
                                </div>
                                <div>
                                    <span class="label label-${booking.status === 'confirmed' ? 'success' : 'warning'}" style="font-size: 14px;">
                                        ${booking.status === 'confirmed' ? '확정' : '대기'}
                                    </span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <p style="margin-bottom: 5px;"><strong>예약번호:</strong> #${booking.id}</p>
                                    <p style="margin-bottom: 5px;"><strong>예약자:</strong> ${booking.customerName}</p>
                                    <p style="margin-bottom: 5px;"><strong>이메일:</strong> ${booking.customerEmail}</p>
                                    <p style="margin-bottom: 5px;"><strong>전화번호:</strong> ${booking.customerPhone}</p>
                                </div>
                                <div class="col-md-6">
                                    <p style="margin-bottom: 5px;"><strong>인원:</strong> ${booking.guests}명</p>
                                    <p style="margin-bottom: 5px;"><strong>숙박일수:</strong> ${booking.nights}박</p>
                                    <p style="margin-bottom: 5px;"><strong>예약일:</strong> ${HotelAgency.formatDate(booking.createdAt)}</p>
                                    <div style="margin-top: 15px;">
                                        <div style="font-size: 24px; font-weight: 700; color: #3498db;">
                                            ${HotelAgency.formatPrice(booking.totalPrice)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    container.html(html);
}


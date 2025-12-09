// Admin Page JavaScript
$(document).ready(function() {
    loadHotelsTable();
    loadBookingsTable();
    loadStatistics();
    
    // Save hotel handler
    $('#saveHotel').on('click', function() {
        saveHotel();
    });
    
    // Tab change handler
    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        if ($(e.target).attr('href') === '#bookings') {
            loadBookingsTable();
        } else if ($(e.target).attr('href') === '#statistics') {
            loadStatistics();
        }
    });
});

function loadHotelsTable() {
    const hotels = HotelAgency.getHotels();
    const tbody = $('#hotelsTableBody');
    
    if (hotels.length === 0) {
        tbody.html('<tr><td colspan="7" class="text-center">등록된 호텔이 없습니다.</td></tr>');
        return;
    }
    
    const html = hotels.map(hotel => `
        <tr>
            <td>${hotel.id}</td>
            <td>${hotel.name}</td>
            <td>${hotel.location}</td>
            <td>${HotelAgency.formatPrice(hotel.price)}</td>
            <td>${HotelAgency.renderStars(hotel.rating)}</td>
            <td><span class="label label-success">활성</span></td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="deleteHotel(${hotel.id})">
                    <i class="fa fa-trash"></i> 삭제
                </button>
            </td>
        </tr>
    `).join('');
    
    tbody.html(html);
}

function loadBookingsTable() {
    const bookings = HotelAgency.getBookings();
    const hotels = HotelAgency.getHotels();
    const tbody = $('#bookingsTableBody');
    
    if (bookings.length === 0) {
        tbody.html('<tr><td colspan="9" class="text-center">예약 내역이 없습니다.</td></tr>');
        return;
    }
    
    const html = bookings.map(booking => {
        const hotel = hotels.find(h => h.id === booking.hotelId);
        return `
            <tr>
                <td>#${booking.id}</td>
                <td>${booking.hotelName}</td>
                <td>${booking.customerName}</td>
                <td>${HotelAgency.formatDate(booking.checkIn)}</td>
                <td>${HotelAgency.formatDate(booking.checkOut)}</td>
                <td>${booking.guests}명</td>
                <td>${HotelAgency.formatPrice(booking.totalPrice)}</td>
                <td>
                    <span class="label label-${booking.status === 'confirmed' ? 'success' : 'warning'}">
                        ${booking.status === 'confirmed' ? '확정' : '대기'}
                    </span>
                </td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="cancelBooking(${booking.id})">
                        <i class="fa fa-times"></i> 취소
                    </button>
                </td>
            </tr>
        `;
    }).join('');
    
    tbody.html(html);
}

function loadStatistics() {
    const hotels = HotelAgency.getHotels();
    const bookings = HotelAgency.getBookings();
    
    $('#totalHotels').text(hotels.length);
    $('#totalBookings').text(bookings.length);
    
    const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
    $('#totalRevenue').text(HotelAgency.formatPrice(totalRevenue));
    
    // Count unique users (by email)
    const uniqueUsers = new Set(bookings.map(b => b.customerEmail));
    $('#totalUsers').text(uniqueUsers.size);
}

function saveHotel() {
    const form = $('#addHotelForm');
    
    // Validate
    if (!form[0].checkValidity()) {
        form[0].reportValidity();
        return;
    }
    
    // Get form data
    const hotelData = {
        name: $('#hotelName').val(),
        location: $('#hotelLocation').val(),
        address: $('#hotelAddress').val(),
        price: $('#hotelPrice').val(),
        rating: $('#hotelRating').val(),
        image: $('#hotelImage').val() || '../template/assets/images/room-1.jpg',
        description: $('#hotelDescription').val(),
        amenities: []
    };
    
    // Get selected amenities
    $('.checkbox-group input:checked').each(function() {
        hotelData.amenities.push($(this).val());
    });
    
    // Add hotel
    HotelAgency.addHotel(hotelData);
    
    // Close modal and reset form
    $('#addHotelModal').modal('hide');
    form[0].reset();
    
    // Reload table
    loadHotelsTable();
    loadStatistics();
    
    // Show success message
    alert('호텔이 성공적으로 추가되었습니다!');
}

function deleteHotel(id) {
    if (confirm('정말 이 호텔을 삭제하시겠습니까?')) {
        HotelAgency.deleteHotel(id);
        loadHotelsTable();
        loadStatistics();
        alert('호텔이 삭제되었습니다.');
    }
}

function cancelBooking(id) {
    if (confirm('정말 이 예약을 취소하시겠습니까?')) {
        const bookings = HotelAgency.getBookings();
        const filtered = bookings.filter(b => b.id !== id);
        localStorage.setItem(HotelAgency.STORAGE_KEYS.BOOKINGS, JSON.stringify(filtered));
        loadBookingsTable();
        loadStatistics();
        alert('예약이 취소되었습니다.');
    }
}


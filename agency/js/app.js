// Hotel Agency App
const HotelAgency = {
    // Local Storage Keys
    STORAGE_KEYS: {
        HOTELS: 'hotel_agency_hotels',
        BOOKINGS: 'hotel_agency_bookings',
        NEXT_HOTEL_ID: 'hotel_agency_next_hotel_id',
        NEXT_BOOKING_ID: 'hotel_agency_next_booking_id'
    },

    // Initialize default hotels
    initDefaultHotels: function() {
        if (!localStorage.getItem(this.STORAGE_KEYS.HOTELS)) {
            const defaultHotels = [
                {
                    id: 1,
                    name: '그랜드 호텔 서울',
                    location: '서울',
                    address: '서울특별시 강남구 테헤란로 123',
                    price: 150000,
                    rating: 5,
                    image: '../template/assets/images/room-1.jpg',
                    description: '서울 중심가에 위치한 럭셔리 호텔입니다.',
                    amenities: ['wifi', 'parking', 'pool', 'gym', 'spa', 'restaurant']
                },
                {
                    id: 2,
                    name: '제주 리조트',
                    location: '제주도',
                    address: '제주특별자치도 제주시 연동 456',
                    price: 200000,
                    rating: 4,
                    image: '../template/assets/images/room-2.jpg',
                    description: '제주도의 아름다운 바다를 바라보는 리조트입니다.',
                    amenities: ['wifi', 'parking', 'pool', 'restaurant']
                },
                {
                    id: 3,
                    name: '부산 해운대 호텔',
                    location: '부산',
                    address: '부산광역시 해운대구 해운대해변로 789',
                    price: 120000,
                    rating: 4,
                    image: '../template/assets/images/room-3.jpg',
                    description: '해운대 해변과 가까운 위치의 호텔입니다.',
                    amenities: ['wifi', 'parking', 'pool', 'gym']
                },
                {
                    id: 4,
                    name: '경주 힐튼 호텔',
                    location: '경주',
                    address: '경상북도 경주시 보문로 321',
                    price: 180000,
                    rating: 5,
                    image: '../template/assets/images/room-4.jpg',
                    description: '경주 보문관광단지에 위치한 프리미엄 호텔입니다.',
                    amenities: ['wifi', 'parking', 'pool', 'gym', 'spa', 'restaurant']
                },
                {
                    id: 5,
                    name: '강릉 오션뷰 호텔',
                    location: '강릉',
                    address: '강원도 강릉시 해안로 654',
                    price: 130000,
                    rating: 3,
                    image: '../template/assets/images/room-5.jpg',
                    description: '동해 바다를 조망할 수 있는 호텔입니다.',
                    amenities: ['wifi', 'parking', 'restaurant']
                },
                {
                    id: 6,
                    name: '서울 명동 호텔',
                    location: '서울',
                    address: '서울특별시 중구 명동길 987',
                    price: 100000,
                    rating: 3,
                    image: '../template/assets/images/apartment-1.jpg',
                    description: '명동 중심가에 위치한 편리한 호텔입니다.',
                    amenities: ['wifi', 'parking']
                }
            ];
            localStorage.setItem(this.STORAGE_KEYS.HOTELS, JSON.stringify(defaultHotels));
            localStorage.setItem(this.STORAGE_KEYS.NEXT_HOTEL_ID, '7');
        }
        
        if (!localStorage.getItem(this.STORAGE_KEYS.BOOKINGS)) {
            localStorage.setItem(this.STORAGE_KEYS.BOOKINGS, JSON.stringify([]));
            localStorage.setItem(this.STORAGE_KEYS.NEXT_BOOKING_ID, '1');
        }
    },

    // Get all hotels
    getHotels: function() {
        const hotelsJson = localStorage.getItem(this.STORAGE_KEYS.HOTELS);
        return hotelsJson ? JSON.parse(hotelsJson) : [];
    },

    // Get hotel by ID
    getHotelById: function(id) {
        const hotels = this.getHotels();
        return hotels.find(hotel => hotel.id === parseInt(id));
    },

    // Add new hotel
    addHotel: function(hotelData) {
        const hotels = this.getHotels();
        const nextId = parseInt(localStorage.getItem(this.STORAGE_KEYS.NEXT_HOTEL_ID) || '1');
        
        const newHotel = {
            id: nextId,
            name: hotelData.name,
            location: hotelData.location,
            address: hotelData.address,
            price: parseInt(hotelData.price),
            rating: parseInt(hotelData.rating),
            image: hotelData.image || '../template/assets/images/room-1.jpg',
            description: hotelData.description || '',
            amenities: hotelData.amenities || []
        };
        
        hotels.push(newHotel);
        localStorage.setItem(this.STORAGE_KEYS.HOTELS, JSON.stringify(hotels));
        localStorage.setItem(this.STORAGE_KEYS.NEXT_HOTEL_ID, (nextId + 1).toString());
        
        return newHotel;
    },

    // Update hotel
    updateHotel: function(id, hotelData) {
        const hotels = this.getHotels();
        const index = hotels.findIndex(h => h.id === parseInt(id));
        
        if (index !== -1) {
            hotels[index] = {
                ...hotels[index],
                ...hotelData,
                id: parseInt(id),
                price: parseInt(hotelData.price),
                rating: parseInt(hotelData.rating)
            };
            localStorage.setItem(this.STORAGE_KEYS.HOTELS, JSON.stringify(hotels));
            return hotels[index];
        }
        return null;
    },

    // Delete hotel
    deleteHotel: function(id) {
        const hotels = this.getHotels();
        const filtered = hotels.filter(h => h.id !== parseInt(id));
        localStorage.setItem(this.STORAGE_KEYS.HOTELS, JSON.stringify(filtered));
    },

    // Get all bookings
    getBookings: function() {
        const bookingsJson = localStorage.getItem(this.STORAGE_KEYS.BOOKINGS);
        return bookingsJson ? JSON.parse(bookingsJson) : [];
    },

    // Add booking
    addBooking: function(bookingData) {
        const bookings = this.getBookings();
        const nextId = parseInt(localStorage.getItem(this.STORAGE_KEYS.NEXT_BOOKING_ID) || '1');
        
        const hotel = this.getHotelById(bookingData.hotelId);
        const checkIn = new Date(bookingData.checkIn);
        const checkOut = new Date(bookingData.checkOut);
        const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        const totalPrice = hotel.price * nights * parseInt(bookingData.guests);
        
        const newBooking = {
            id: nextId,
            hotelId: parseInt(bookingData.hotelId),
            hotelName: hotel.name,
            customerName: bookingData.customerName,
            customerEmail: bookingData.customerEmail,
            customerPhone: bookingData.customerPhone,
            checkIn: bookingData.checkIn,
            checkOut: bookingData.checkOut,
            guests: parseInt(bookingData.guests),
            nights: nights,
            totalPrice: totalPrice,
            status: 'confirmed',
            createdAt: new Date().toISOString()
        };
        
        bookings.push(newBooking);
        localStorage.setItem(this.STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
        localStorage.setItem(this.STORAGE_KEYS.NEXT_BOOKING_ID, (nextId + 1).toString());
        
        return newBooking;
    },

    // Format price
    formatPrice: function(price) {
        return new Intl.NumberFormat('ko-KR').format(price) + '원';
    },

    // Format date
    formatDate: function(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR');
    },

    // Render stars
    renderStars: function(rating) {
        let stars = '';
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                stars += '<i class="fa fa-star"></i>';
            } else {
                stars += '<i class="fa fa-star-o"></i>';
            }
        }
        return stars;
    }
};

// Initialize on page load
$(document).ready(function() {
    HotelAgency.initDefaultHotels();
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    $('#checkIn').attr('min', today);
    $('#checkOut').attr('min', today);
    
    // Update checkOut min date when checkIn changes
    $('#checkIn').on('change', function() {
        const checkInDate = $(this).val();
        if (checkInDate) {
            const nextDay = new Date(checkInDate);
            nextDay.setDate(nextDay.getDate() + 1);
            $('#checkOut').attr('min', nextDay.toISOString().split('T')[0]);
        }
    });
    
    // Search form handler
    $('#searchForm').on('submit', function(e) {
        e.preventDefault();
        const location = $('#searchLocation').val();
        const checkIn = $('#checkIn').val();
        const checkOut = $('#checkOut').val();
        const guests = $('#guests').val();
        
        // Redirect to hotels page with search params
        const params = new URLSearchParams({
            location: location || '',
            checkIn: checkIn || '',
            checkOut: checkOut || '',
            guests: guests || '2'
        });
        
        window.location.href = 'hotels.html?' + params.toString();
    });
    
    // Load featured hotels on index page
    if ($('#featuredHotels').length) {
        loadFeaturedHotels();
    }
    
    // Statistics counter animation
    if ($('.stat-number').length) {
        animateCounters();
    }
});

// Load featured hotels
function loadFeaturedHotels() {
    const hotels = HotelAgency.getHotels().slice(0, 6);
    const html = hotels.map(hotel => `
        <div class="col-md-4 col-sm-6">
            <div class="hotel-card" onclick="window.location.href='hotel-detail.html?id=${hotel.id}'">
                <img src="${hotel.image}" alt="${hotel.name}" class="hotel-card-image">
                <div class="hotel-card-body">
                    <h3 class="hotel-card-title">${hotel.name}</h3>
                    <p class="hotel-card-location">
                        <i class="fa fa-map-marker"></i> ${hotel.location}
                    </p>
                    <div class="hotel-card-rating">
                        ${HotelAgency.renderStars(hotel.rating)}
                    </div>
                    <div class="hotel-card-price">
                        ${HotelAgency.formatPrice(hotel.price)} <small>/박</small>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    $('#featuredHotels').html(html);
}

// Animate counters
function animateCounters() {
    $('.stat-number').each(function() {
        const $this = $(this);
        const countTo = parseFloat($this.attr('data-count'));
        
        $({ countNum: 0 }).animate({
            countNum: countTo
        }, {
            duration: 2000,
            easing: 'swing',
            step: function() {
                const value = $this.attr('data-count').includes('.') 
                    ? this.countNum.toFixed(1) 
                    : Math.floor(this.countNum);
                $this.text(value);
            },
            complete: function() {
                $this.text($this.attr('data-count'));
            }
        });
    });
}


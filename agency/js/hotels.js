// Hotels Page JavaScript
$(document).ready(function() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const searchLocation = urlParams.get('location') || '';
    const checkIn = urlParams.get('checkIn') || '';
    const checkOut = urlParams.get('checkOut') || '';
    const guests = urlParams.get('guests') || '2';
    
    // Set search form values
    if (searchLocation) $('#searchLocation').val(searchLocation);
    if (checkIn) $('#checkIn').val(checkIn);
    if (checkOut) $('#checkOut').val(checkOut);
    if (guests) $('#guests').val(guests);
    
    // Load hotels
    let allHotels = HotelAgency.getHotels();
    
    // Apply search filters
    if (searchLocation) {
        allHotels = allHotels.filter(hotel => 
            hotel.name.toLowerCase().includes(searchLocation.toLowerCase()) ||
            hotel.location.toLowerCase().includes(searchLocation.toLowerCase())
        );
    }
    
    // Initialize filters
    initializeFilters();
    
    // Load hotels
    displayHotels(allHotels);
    
    // Sort handler
    $('#sortBy').on('change', function() {
        const sortedHotels = sortHotels([...allHotels], $(this).val());
        displayHotels(sortedHotels);
    });
    
    // Filter handlers
    $('#applyFilters').on('click', function() {
        const filteredHotels = applyFilters(allHotels);
        displayHotels(filteredHotels);
    });
    
    $('#resetFilters').on('click', function() {
        resetFilters();
        displayHotels(allHotels);
    });
    
    // Price range handlers
    $('#priceMin, #priceMax').on('input', function() {
        updatePriceDisplay();
    });
});

function initializeFilters() {
    updatePriceDisplay();
}

function updatePriceDisplay() {
    const min = parseInt($('#priceMin').val());
    const max = parseInt($('#priceMax').val());
    $('#priceMinDisplay').text(HotelAgency.formatPrice(min));
    $('#priceMaxDisplay').text(HotelAgency.formatPrice(max));
}

function applyFilters(hotels) {
    // Price filter
    const minPrice = parseInt($('#priceMin').val());
    const maxPrice = parseInt($('#priceMax').val());
    hotels = hotels.filter(hotel => hotel.price >= minPrice && hotel.price <= maxPrice);
    
    // Star rating filter
    const selectedRatings = [];
    $('.star-filter input:checked').each(function() {
        selectedRatings.push(parseInt($(this).val()));
    });
    if (selectedRatings.length > 0) {
        hotels = hotels.filter(hotel => selectedRatings.includes(hotel.rating));
    }
    
    // Amenities filter
    const selectedAmenities = [];
    $('.amenities-filter input:checked').each(function() {
        selectedAmenities.push($(this).val());
    });
    if (selectedAmenities.length > 0) {
        hotels = hotels.filter(hotel => {
            return selectedAmenities.every(amenity => hotel.amenities.includes(amenity));
        });
    }
    
    return hotels;
}

function resetFilters() {
    $('#priceMin').val(0);
    $('#priceMax').val(500000);
    $('.star-filter input').prop('checked', false);
    $('.amenities-filter input').prop('checked', false);
    updatePriceDisplay();
}

function sortHotels(hotels, sortBy) {
    switch(sortBy) {
        case 'name':
            return hotels.sort((a, b) => a.name.localeCompare(b.name));
        case 'price-low':
            return hotels.sort((a, b) => a.price - b.price);
        case 'price-high':
            return hotels.sort((a, b) => b.price - a.price);
        case 'rating':
            return hotels.sort((a, b) => b.rating - a.rating);
        default:
            return hotels;
    }
}

function displayHotels(hotels) {
    $('#hotelsCount strong').text(hotels.length);
    
    if (hotels.length === 0) {
        $('#hotelsList').html(`
            <div class="text-center" style="padding: 60px;">
                <i class="fa fa-search" style="font-size: 64px; color: #ccc; margin-bottom: 20px;"></i>
                <h3>호텔을 찾을 수 없습니다</h3>
                <p>다른 검색 조건을 시도해보세요.</p>
            </div>
        `);
        return;
    }
    
    const html = hotels.map(hotel => `
        <div class="hotel-card" onclick="window.location.href='hotel-detail.html?id=${hotel.id}'">
            <div class="row">
                <div class="col-md-4">
                    <img src="${hotel.image}" alt="${hotel.name}" class="hotel-card-image" style="height: 100%;">
                </div>
                <div class="col-md-8">
                    <div class="hotel-card-body">
                        <h3 class="hotel-card-title">${hotel.name}</h3>
                        <p class="hotel-card-location">
                            <i class="fa fa-map-marker"></i> ${hotel.location} - ${hotel.address}
                        </p>
                        <div class="hotel-card-rating" style="margin-bottom: 15px;">
                            ${HotelAgency.renderStars(hotel.rating)}
                            <span style="margin-left: 10px; color: #7f8c8d;">(${hotel.rating}성급)</span>
                        </div>
                        <p style="color: #7f8c8d; margin-bottom: 15px;">${hotel.description || ''}</p>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <div class="hotel-card-price">
                                    ${HotelAgency.formatPrice(hotel.price)} <small>/박</small>
                                </div>
                            </div>
                            <div>
                                <button class="btn btn-primary" onclick="event.stopPropagation(); window.location.href='hotel-detail.html?id=${hotel.id}'">
                                    상세보기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    $('#hotelsList').html(html);
}


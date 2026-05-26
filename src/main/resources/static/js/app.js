/* ============================================
   Travel Planner - Main Application JavaScript
   ============================================ */

// ---- State Management ----
let currentUser = null;
let searchParams = {};
let selectedTransport = null;
let selectedHotel = null;
let selectedAttractions = [];
let transportData = [];
let hotelData = [];
let attractionData = [];

// ---- Auth Functions ----
async function checkAuth() {
    try {
        const res = await fetch('/api/auth/status');
        const data = await res.json();
        if (data.loggedIn) {
            currentUser = { id: data.userId, name: data.userName, email: data.userEmail };
            updateNavbar(true);
        } else {
            updateNavbar(false);
        }
    } catch (e) {
        updateNavbar(false);
    }
}

function updateNavbar(loggedIn) {
    const navLogin = document.getElementById('nav-login');
    const navUser = document.getElementById('nav-user');
    const navDashboard = document.getElementById('nav-dashboard');
    const navUsername = document.getElementById('nav-username');

    if (navLogin) navLogin.style.display = loggedIn ? 'none' : 'block';
    if (navUser) navUser.style.display = loggedIn ? 'block' : 'none';
    if (navDashboard) navDashboard.style.display = loggedIn ? 'block' : 'none';
    if (navUsername && currentUser) navUsername.textContent = currentUser.name;
}

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const btn = document.getElementById('loginBtn');

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';

    try {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();

        if (data.success) {
            window.location.href = '/dashboard';
        } else {
            showAlert('login-alert', data.message, 'error');
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign In';
        }
    } catch (err) {
        showAlert('login-alert', 'Connection error. Please try again.', 'error');
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign In';
    }
    return false;
}

async function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confirm = document.getElementById('regConfirm').value;
    const btn = document.getElementById('regBtn');

    if (password !== confirm) {
        showAlert('register-alert', 'Passwords do not match', 'error');
        return false;
    }

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';

    try {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const data = await res.json();

        if (data.success) {
            showAlert('register-alert', 'Account created! Redirecting to login...', 'success');
            setTimeout(() => window.location.href = '/login', 1500);
        } else {
            showAlert('register-alert', data.message, 'error');
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-user-plus"></i> Create Account';
        }
    } catch (err) {
        showAlert('register-alert', 'Connection error. Please try again.', 'error');
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-user-plus"></i> Create Account';
    }
    return false;
}

async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    currentUser = null;
    window.location.href = '/';
}

// ---- Search ----
function handleSearch(e) {
    e.preventDefault();
    const source = document.getElementById('sourceCity').value;
    const dest = document.getElementById('destCity').value;
    const travelDate = document.getElementById('travelDate').value;
    const numDays = document.getElementById('numDays').value;
    const numTravelers = document.getElementById('numTravelers').value;
    const tripName = document.getElementById('tripName').value;

    if (source === dest) {
        alert('Source and destination must be different!');
        return false;
    }

    const params = new URLSearchParams({ source, dest, travelDate, numDays, numTravelers, tripName });
    window.location.href = '/results?' + params.toString();
    return false;
}

// ---- Results Page ----
async function loadResults() {
    const params = new URLSearchParams(window.location.search);
    searchParams = {
        source: params.get('source'),
        dest: params.get('dest'),
        travelDate: params.get('travelDate'),
        numDays: parseInt(params.get('numDays')) || 3,
        numTravelers: parseInt(params.get('numTravelers')) || 1,
        tripName: params.get('tripName') || ''
    };

    if (!searchParams.source || !searchParams.dest) return;

    const titleEl = document.getElementById('results-title');
    const subEl = document.getElementById('results-subtitle');
    if (titleEl) titleEl.innerHTML = `<i class="fas fa-route text-accent-purple"></i> ${searchParams.source} → ${searchParams.dest}`;
    if (subEl) subEl.textContent = `${searchParams.numDays} days · ${searchParams.numTravelers} traveler(s) · ${searchParams.travelDate || 'Flexible dates'}`;

    // Load all data
    await Promise.all([
        loadTransport(searchParams.source, searchParams.dest),
        loadHotels(searchParams.dest),
        loadAttractions(searchParams.dest)
    ]);
}

async function loadTransport(source, dest, type) {
    let url = `/api/transport/search?source=${encodeURIComponent(source)}&destination=${encodeURIComponent(dest)}`;
    if (type) url += `&type=${type}`;

    try {
        const res = await fetch(url);
        transportData = await res.json();
        renderTransport(transportData);
    } catch (e) {
        document.getElementById('transport-results').innerHTML = '<div class="empty-state"><i class="fas fa-exclamation-triangle"></i><h5>Error loading transport options</h5></div>';
    }
}

function renderTransport(data) {
    const container = document.getElementById('transport-results');
    if (!data.length) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-bus"></i><h5>No transport options found</h5><p>Try different cities or transport type.</p></div>';
        return;
    }

    container.innerHTML = data.map(t => {
        const typeClass = t.type.toLowerCase();
        const typeIcon = t.type === 'FLIGHT' ? 'fa-plane' : t.type === 'TRAIN' ? 'fa-train' : 'fa-bus';
        const isSelected = selectedTransport && selectedTransport.id === t.id;

        return `
        <div class="result-card">
            <div class="d-flex justify-content-between align-items-start flex-wrap gap-3">
                <div class="flex-grow-1">
                    <div class="d-flex align-items-center gap-2 mb-2">
                        <span class="type-badge ${typeClass}"><i class="fas ${typeIcon}"></i> ${t.type}</span>
                        <h5 style="font-family: 'Outfit', sans-serif; font-weight: 600; margin: 0;">${t.provider}</h5>
                    </div>
                    <div class="d-flex gap-4 flex-wrap" style="color: var(--text-secondary); font-size: 0.9rem;">
                        <span><i class="fas fa-clock"></i> ${t.durationHours}h</span>
                        <span><i class="fas fa-map-marker-alt"></i> ${t.source} → ${t.destination}</span>
                        <span class="rating">${renderStars(t.rating)} ${t.rating}</span>
                    </div>
                </div>
                <div class="text-end">
                    <div class="price">₹${formatNumber(t.price)}</div>
                    <div class="price-label">per person</div>
                    <button class="btn ${isSelected ? 'btn-primary-custom' : 'btn-outline-custom'} btn-sm-custom select-btn mt-2"
                            onclick="selectTransport(${t.id})" id="transport-btn-${t.id}">
                        <i class="fas ${isSelected ? 'fa-check' : 'fa-plus'}"></i> ${isSelected ? 'Selected' : 'Select'}
                    </button>
                </div>
            </div>
        </div>`;
    }).join('');
}

function filterTransport() {
    const type = document.getElementById('transportFilter').value;
    loadTransport(searchParams.source, searchParams.dest, type || null);
}

async function loadHotels(city, minPrice, maxPrice, minRating) {
    let url = `/api/hotels/search?city=${encodeURIComponent(city)}`;
    if (minPrice) url += `&minPrice=${minPrice}`;
    if (maxPrice) url += `&maxPrice=${maxPrice}`;
    if (minRating) url += `&minRating=${minRating}`;

    try {
        const res = await fetch(url);
        hotelData = await res.json();
        renderHotels(hotelData);
    } catch (e) {
        document.getElementById('hotel-results').innerHTML = '<div class="empty-state"><i class="fas fa-exclamation-triangle"></i><h5>Error loading hotels</h5></div>';
    }
}

function renderHotels(data) {
    const container = document.getElementById('hotel-results');
    if (!data.length) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-hotel"></i><h5>No hotels found</h5><p>Try adjusting your filters.</p></div>';
        return;
    }

    container.innerHTML = data.map(h => {
        const typeClass = h.type.toLowerCase();
        const isSelected = selectedHotel && selectedHotel.id === h.id;

        return `
        <div class="result-card">
            <div class="d-flex justify-content-between align-items-start flex-wrap gap-3">
                <div class="flex-grow-1">
                    <div class="d-flex align-items-center gap-2 mb-2">
                        <span class="type-badge ${typeClass}">${h.type}</span>
                        <h5 style="font-family: 'Outfit', sans-serif; font-weight: 600; margin: 0;">${h.name}</h5>
                    </div>
                    <div class="d-flex gap-4 flex-wrap mb-2" style="color: var(--text-secondary); font-size: 0.9rem;">
                        <span><i class="fas fa-map-pin"></i> ${h.location}</span>
                        <span class="rating">${renderStars(h.rating)} ${h.rating}</span>
                    </div>
                    <div style="color: var(--text-muted); font-size: 0.85rem;">
                        <i class="fas fa-concierge-bell"></i> ${h.amenities || 'Standard amenities'}
                    </div>
                </div>
                <div class="text-end">
                    <div class="price">₹${formatNumber(h.pricePerNight)}</div>
                    <div class="price-label">per night</div>
                    <button class="btn ${isSelected ? 'btn-primary-custom' : 'btn-outline-custom'} btn-sm-custom select-btn mt-2"
                            onclick="selectHotel(${h.id})" id="hotel-btn-${h.id}">
                        <i class="fas ${isSelected ? 'fa-check' : 'fa-plus'}"></i> ${isSelected ? 'Selected' : 'Select'}
                    </button>
                </div>
            </div>
        </div>`;
    }).join('');
}

function filterHotels() {
    const minPrice = document.getElementById('minPrice').value || null;
    const maxPrice = document.getElementById('maxPrice').value || null;
    const minRating = document.getElementById('minRating').value || null;
    loadHotels(searchParams.dest, minPrice, maxPrice, minRating);
}

async function loadAttractions(city) {
    try {
        const res = await fetch(`/api/places/search?city=${encodeURIComponent(city)}`);
        attractionData = await res.json();
        renderAttractions(attractionData);
    } catch (e) {
        document.getElementById('attraction-results').innerHTML = '<div class="empty-state"><i class="fas fa-exclamation-triangle"></i><h5>Error loading attractions</h5></div>';
    }
}

function renderAttractions(data) {
    const container = document.getElementById('attraction-results');
    if (!data.length) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-map"></i><h5>No attractions found</h5></div>';
        return;
    }

    container.innerHTML = data.map(a => {
        const isSelected = selectedAttractions.some(sa => sa.id === a.id);
        return `
        <div class="result-card">
            <div class="d-flex justify-content-between align-items-start flex-wrap gap-3">
                <div class="flex-grow-1">
                    <h5 style="font-family: 'Outfit', sans-serif; font-weight: 600; margin-bottom: 0.5rem;">${a.name}</h5>
                    <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem;">${a.description || ''}</p>
                    <div class="d-flex gap-4 flex-wrap" style="font-size: 0.9rem;">
                        <span class="rating">${renderStars(a.rating)} ${a.rating}</span>
                        <span style="color: ${a.entryFee > 0 ? 'var(--accent-orange)' : 'var(--accent-green)'};">
                            <i class="fas fa-ticket-alt"></i> ${a.entryFee > 0 ? '₹' + formatNumber(a.entryFee) : 'Free Entry'}
                        </span>
                    </div>
                </div>
                <div class="text-end">
                    <button class="btn ${isSelected ? 'btn-primary-custom' : 'btn-outline-custom'} btn-sm-custom"
                            onclick="toggleAttraction(${a.id})" id="attraction-btn-${a.id}">
                        <i class="fas ${isSelected ? 'fa-check' : 'fa-plus'}"></i> ${isSelected ? 'Added' : 'Add to Trip'}
                    </button>
                </div>
            </div>
        </div>`;
    }).join('');
}

// ---- Selection Functions ----
function selectTransport(id) {
    const transport = transportData.find(t => t.id === id);
    if (selectedTransport && selectedTransport.id === id) {
        selectedTransport = null;
    } else {
        selectedTransport = transport;
    }
    renderTransport(transportData);
    updateCostSummary();
}

function selectHotel(id) {
    const hotel = hotelData.find(h => h.id === id);
    if (selectedHotel && selectedHotel.id === id) {
        selectedHotel = null;
    } else {
        selectedHotel = hotel;
    }
    renderHotels(hotelData);
    updateCostSummary();
}

function toggleAttraction(id) {
    const idx = selectedAttractions.findIndex(a => a.id === id);
    if (idx > -1) {
        selectedAttractions.splice(idx, 1);
    } else {
        const attraction = attractionData.find(a => a.id === id);
        if (attraction) selectedAttractions.push(attraction);
    }
    renderAttractions(attractionData);
    updateCostSummary();
}

// ---- Cost Summary ----
function updateCostSummary() {
    const days = searchParams.numDays || 3;
    const travelers = searchParams.numTravelers || 1;
    const nights = Math.max(days - 1, 1);

    const transportCost = selectedTransport ? selectedTransport.price * travelers * 2 : 0;
    const hotelCost = selectedHotel ? selectedHotel.pricePerNight * nights : 0;
    const foodCost = 800 * days * travelers;
    const localTransportCost = 500 * days * travelers;
    const attractionCost = selectedAttractions.reduce((sum, a) => sum + (a.entryFee || 0) * travelers, 0);
    const totalCost = transportCost + hotelCost + foodCost + localTransportCost + attractionCost;

    setTextIfExists('cost-transport', '₹' + formatNumber(transportCost));
    setTextIfExists('cost-hotel', '₹' + formatNumber(hotelCost));
    setTextIfExists('cost-food', '₹' + formatNumber(foodCost));
    setTextIfExists('cost-local', '₹' + formatNumber(localTransportCost));
    setTextIfExists('cost-attractions', '₹' + formatNumber(attractionCost));
    setTextIfExists('cost-total', '₹' + formatNumber(totalCost));

    // Update selected info
    setTextIfExists('selected-transport-info',
        selectedTransport ? `${selectedTransport.provider} (${selectedTransport.type}) — ₹${formatNumber(selectedTransport.price)}/person` : 'No transport selected');
    setTextIfExists('selected-hotel-info',
        selectedHotel ? `${selectedHotel.name} (${selectedHotel.type}) — ₹${formatNumber(selectedHotel.pricePerNight)}/night` : 'No hotel selected');

    const attractionsList = document.getElementById('selected-attractions-list');
    if (attractionsList) {
        if (selectedAttractions.length) {
            attractionsList.innerHTML = selectedAttractions.map(a =>
                `<div class="d-flex justify-content-between mb-1"><span>${a.name}</span><span style="color: var(--accent-orange);">₹${formatNumber(a.entryFee || 0)}</span></div>`
            ).join('');
        } else {
            attractionsList.textContent = 'No attractions selected';
        }
    }
}

// ---- Save Trip ----
async function saveTrip() {
    if (!currentUser) {
        showAlert('save-alert', 'Please <a href="/login" style="color: var(--accent-cyan);">login</a> to save your trip.', 'error');
        return;
    }

    const trip = {
        source: searchParams.source,
        destination: searchParams.dest,
        travelDate: searchParams.travelDate || null,
        numDays: searchParams.numDays,
        numTravelers: searchParams.numTravelers,
        tripName: searchParams.tripName || `${searchParams.source} to ${searchParams.dest}`,
        transportOptionId: selectedTransport ? selectedTransport.id : null,
        hotelId: selectedHotel ? selectedHotel.id : null,
        attractionIds: selectedAttractions.map(a => a.id).join(',')
    };

    try {
        const res = await fetch('/api/trips', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(trip)
        });
        const data = await res.json();
        if (data.success) {
            showAlert('save-alert', 'Trip saved successfully! <a href="/dashboard" style="color: var(--accent-cyan);">View Dashboard</a>', 'success');
        } else {
            showAlert('save-alert', data.message || 'Error saving trip', 'error');
        }
    } catch (e) {
        showAlert('save-alert', 'Connection error. Please try again.', 'error');
    }
}

// ---- Dashboard ----
async function loadDashboard() {
    const loader = document.getElementById('dashboard-loader');
    const container = document.getElementById('trips-container');
    const noTrips = document.getElementById('no-trips');

    try {
        const res = await fetch('/api/trips');
        if (res.status === 401) {
            window.location.href = '/login';
            return;
        }
        const trips = await res.json();

        if (loader) loader.style.display = 'none';

        if (!trips.length) {
            if (noTrips) noTrips.style.display = 'block';
            return;
        }

        if (container) {
            container.style.display = 'flex';
            container.innerHTML = trips.map(t => `
                <div class="col-md-6 col-lg-4">
                    <div class="trip-card">
                        <div class="trip-route">
                            <span class="trip-city">${t.source}</span>
                            <i class="fas fa-arrow-right trip-arrow"></i>
                            <span class="trip-city">${t.destination}</span>
                        </div>
                        ${t.tripName ? `<p style="color: var(--accent-cyan); font-size: 0.9rem; margin-bottom: 0.75rem;">${t.tripName}</p>` : ''}
                        <div class="trip-meta">
                            <div class="trip-meta-item"><i class="fas fa-calendar"></i> ${t.travelDate || 'Flexible'}</div>
                            <div class="trip-meta-item"><i class="fas fa-clock"></i> ${t.numDays} days</div>
                            <div class="trip-meta-item"><i class="fas fa-users"></i> ${t.numTravelers || 1}</div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mt-3">
                            <div class="trip-total">₹${formatNumber(t.totalCost || 0)}</div>
                            <div class="d-flex gap-2">
                                <a href="/trip-summary?id=${t.id}" class="btn btn-outline-custom btn-sm-custom">
                                    <i class="fas fa-eye"></i> View
                                </a>
                                <button class="btn btn-outline-custom btn-sm-custom" style="border-color: var(--accent-red); color: var(--accent-red);" onclick="deleteTrip(${t.id})">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    } catch (e) {
        if (loader) loader.style.display = 'none';
        if (noTrips) {
            noTrips.style.display = 'block';
            noTrips.querySelector('h5').textContent = 'Error Loading Trips';
            noTrips.querySelector('p').textContent = 'Please try again later.';
        }
    }
}

async function deleteTrip(id) {
    if (!confirm('Delete this trip?')) return;
    try {
        await fetch(`/api/trips/${id}`, { method: 'DELETE' });
        loadDashboard();
    } catch (e) {
        alert('Error deleting trip');
    }
}

// ---- Trip Summary Page ----
async function loadTripSummary(tripId) {
    const loader = document.getElementById('trip-loader');
    const details = document.getElementById('trip-details');

    try {
        const res = await fetch(`/api/trips/${tripId}`);
        const trip = await res.json();

        if (loader) loader.style.display = 'none';
        if (details) details.style.display = 'block';

        setTextIfExists('trip-title', trip.tripName || `${trip.source} → ${trip.destination}`);
        setTextIfExists('detail-route', `${trip.source} → ${trip.destination}`);
        setTextIfExists('detail-date', trip.travelDate || 'Flexible');
        setTextIfExists('detail-days', `${trip.numDays} days`);
        setTextIfExists('detail-travelers', `${trip.numTravelers || 1} person(s)`);

        setTextIfExists('s-cost-transport', '₹' + formatNumber(trip.transportCost || 0));
        setTextIfExists('s-cost-hotel', '₹' + formatNumber(trip.hotelCost || 0));
        setTextIfExists('s-cost-food', '₹' + formatNumber(trip.foodCost || 0));
        setTextIfExists('s-cost-local', '₹' + formatNumber(trip.localTransportCost || 0));
        setTextIfExists('s-cost-attractions', '₹' + formatNumber(trip.attractionCost || 0));
        setTextIfExists('s-cost-total', '₹' + formatNumber(trip.totalCost || 0));
    } catch (e) {
        if (loader) loader.innerHTML = '<div class="empty-state"><i class="fas fa-exclamation-triangle"></i><h5>Error loading trip</h5></div>';
    }
}

// ---- Reviews ----
async function loadReviews(entityType) {
    const loader = document.getElementById('reviews-loader');
    const list = document.getElementById('reviews-list');
    const noReviews = document.getElementById('no-reviews');

    let url = '/api/reviews';
    if (entityType) url += `?entityType=${entityType}`;

    try {
        const res = await fetch(url);
        const reviews = await res.json();

        if (loader) loader.style.display = 'none';
        if (noReviews) noReviews.style.display = reviews.length ? 'none' : 'block';

        if (list) {
            list.innerHTML = reviews.map(r => `
                <div class="review-card">
                    <div class="review-header">
                        <div>
                            <div class="review-user"><i class="fas fa-user-circle text-accent-cyan"></i> ${r.userName || 'Traveler'}</div>
                            <div class="review-entity">${getEntityIcon(r.entityType)} ${r.entityType} — ${r.entityName || 'Item #' + r.entityId}</div>
                        </div>
                        <div class="text-end">
                            <div class="rating">${renderStars(r.rating)}</div>
                            <div class="review-date">${formatDate(r.createdAt)}</div>
                        </div>
                    </div>
                    <p class="review-comment">${r.comment}</p>
                </div>
            `).join('');
        }
    } catch (e) {
        if (loader) loader.style.display = 'none';
        if (noReviews) noReviews.style.display = 'block';
    }
}

function filterReviews(type, btn) {
    document.querySelectorAll('.custom-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('reviews-list').innerHTML = '';
    document.getElementById('reviews-loader').style.display = 'flex';
    loadReviews(type || null);
}

async function handleReview(e) {
    e.preventDefault();
    if (!currentUser) {
        showAlert('review-form-alert', 'Please <a href="/login" style="color: var(--accent-cyan);">login</a> to submit a review.', 'error');
        return false;
    }

    const review = {
        entityType: document.getElementById('reviewEntityType').value,
        entityId: parseInt(document.getElementById('reviewEntityId').value),
        entityName: document.getElementById('reviewEntityName').value,
        rating: parseInt(document.getElementById('reviewRating').value),
        comment: document.getElementById('reviewComment').value
    };

    try {
        const res = await fetch('/api/reviews', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(review)
        });
        const data = await res.json();
        if (data.success) {
            showAlert('review-form-alert', 'Review submitted successfully!', 'success');
            document.getElementById('reviewForm').reset();
            loadReviews();
        } else {
            showAlert('review-form-alert', data.message || 'Error submitting review', 'error');
        }
    } catch (err) {
        showAlert('review-form-alert', 'Connection error. Please try again.', 'error');
    }
    return false;
}

// ---- Tab Switching ----
function switchTab(tab, btn) {
    document.querySelectorAll('.tab-content').forEach(tc => tc.style.display = 'none');
    document.querySelectorAll('.custom-tab').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-' + tab).style.display = 'block';
    btn.classList.add('active');

    if (tab === 'summary') updateCostSummary();
}

// ---- Utility Functions ----
function renderStars(rating) {
    const full = Math.floor(rating || 0);
    const empty = 5 - full;
    return '<i class="fas fa-star filled"></i>'.repeat(full) + '<i class="far fa-star empty"></i>'.repeat(empty);
}

function formatNumber(num) {
    return Math.round(num || 0).toLocaleString('en-IN');
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    try {
        return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch (e) { return dateStr; }
}

function getEntityIcon(type) {
    switch (type) {
        case 'TRANSPORT': return '<i class="fas fa-plane"></i>';
        case 'HOTEL': return '<i class="fas fa-hotel"></i>';
        case 'ATTRACTION': return '<i class="fas fa-map-marker-alt"></i>';
        default: return '<i class="fas fa-circle"></i>';
    }
}

function showAlert(containerId, message, type) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const cls = type === 'success' ? 'alert-success-custom' : 'alert-error-custom';
    container.innerHTML = `<div class="alert-custom ${cls}">${message}</div>`;
    setTimeout(() => { container.innerHTML = ''; }, 5000);
}

function setTextIfExists(id, text) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = text;
}

// ---- Button Ripple Effect ----
document.addEventListener('click', function(e) {
    const btn = e.target.closest('.btn-primary-custom, .btn-outline-custom');
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
});

// ---- Cursor-Responsive Floating Elements ----
(function() {
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    let rafId = null;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!rafId) rafId = requestAnimationFrame(updateFloatingElements);
    });

    function updateFloatingElements() {
        // Smooth interpolation
        currentX += (mouseX - currentX) * 0.08;
        currentY += (mouseY - currentY) * 0.08;

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const deltaX = (currentX - centerX) / centerX;
        const deltaY = (currentY - centerY) / centerY;

        // Move floating background shapes
        const shapes = document.querySelectorAll('.float-shape');
        shapes.forEach(shape => {
            const speed = parseFloat(shape.dataset.speed) || 0.03;
            const moveX = deltaX * speed * 600;
            const moveY = deltaY * speed * 600;
            const rotate = deltaX * speed * 40;
            shape.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rotate}deg)`;
        });

        // Move hero illustration items
        const heroItems = document.querySelectorAll('.abstract-item');
        heroItems.forEach(item => {
            const speed = parseFloat(item.dataset.speed) || 0.04;
            const moveX = deltaX * speed * 800;
            const moveY = deltaY * speed * 800;
            item.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        const dist = Math.abs(mouseX - currentX) + Math.abs(mouseY - currentY);
        if (dist > 0.5) {
            rafId = requestAnimationFrame(updateFloatingElements);
        } else {
            rafId = null;
        }
    }
})();


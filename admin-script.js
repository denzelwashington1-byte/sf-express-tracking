// Admin Panel JavaScript
let adminMap;
let trackingData;
let editMode = false;

// Default credentials
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    loadTrackingData();
    setupEventListeners();
});

// Load tracking data from localStorage or use default
function loadTrackingData() {
    const savedData = localStorage.getItem('sfTrackingData');
    if (savedData) {
        trackingData = JSON.parse(savedData);
    } else {
        // Import default data from main script
        trackingData = {
            trackingNumber: 'SF2026UKTHAI',
            currentStatus: 'Arrived in Thailand',
            lastUpdate: 'March 4, 2026 - 09:30 AM',
            estimatedDelivery: 'March 8, 2026',
            currentLocation: {
                lat: 13.7563,
                lng: 100.5018,
                city: 'Bangkok',
                country: 'Thailand'
            },
            route: [
                { lat: 50.4501, lng: 30.5234, city: 'Kyiv', country: 'Ukraine', status: 'Departed' },
                { lat: 52.2297, lng: 21.0122, city: 'Warsaw', country: 'Poland', status: 'Completed' },
                { lat: 11.5564, lng: 104.9282, city: 'Phnom Penh', country: 'Cambodia', status: 'Completed' },
                { lat: 13.7563, lng: 100.5018, city: 'Bangkok', country: 'Thailand', status: 'Current' }
            ],
            packageDetails: {
                contents: ['3 Big Luggage\'s', 'Mental Box (Black)', 'Documents'],
                weight: '87.5 kg',
                weightBreakdown: {
                    luggage: '25kg each',
                    mentalBox: '10kg',
                    documents: '2.5kg'
                },
                serviceType: 'International Express',
                departure: 'Kyiv, Ukraine',
                destination: 'Bangkok, Thailand'
            },
            sender: {
                name: 'Walter Mario Oliveira',
                address: 'Block 45 / B6 camp\nLypska St, 11\nKyiv, Ukraine, 01021'
            },
            receiver: {
                name: 'นุชจรีย์. มีบำรุง / Nuchjaree. (Mee Bamrung)',
                address: '45/268 Paisarn Park Ville Village\nSoi Wat Sukjai 13, Nimit Mai Road\nKhlong Sam Wa East, Bangkok 10510'
            },
            timeline: [
                {
                    status: 'Package Processed',
                    description: 'Shipment processed at facility',
                    date: 'March 2, 2026 - 06:00 AM',
                    location: 'Kyiv, Ukraine',
                    completed: true
                },
                {
                    status: 'Departed Facility',
                    description: 'Package left Ukraine company facility',
                    date: 'March 2, 2026 - 08:00 AM',
                    location: 'Kyiv, Ukraine',
                    completed: true
                },
                {
                    status: 'In Transit',
                    description: 'Package currently in transit to destination',
                    date: 'March 2, 2026 - 02:30 PM',
                    location: 'Warsaw, Poland',
                    completed: true
                },
                {
                    status: 'Arrived in Cambodia',
                    description: 'Package arrived at Cambodia transit hub',
                    date: 'March 3, 2026 - 11:45 AM',
                    location: 'Phnom Penh, Cambodia',
                    completed: true
                },
                {
                    status: 'Arrived in Thailand',
                    description: 'Package arrived in Thailand, processing for final delivery',
                    date: 'March 4, 2026 - 09:30 AM',
                    location: 'Bangkok, Thailand',
                    completed: true,
                    active: true
                },
                {
                    status: 'Out for Delivery',
                    description: 'Package out for final delivery',
                    date: 'March 4, 2026 - 02:00 PM',
                    location: 'Bangkok, Thailand',
                    completed: false
                }
            ]
        };
    }
}

// Setup event listeners
function setupEventListeners() {
    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    
    // Save button
    document.getElementById('saveAllBtn').addEventListener('click', saveAllChanges);
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        showDashboard();
    } else {
        showNotification('Invalid credentials. Please try again.', 'error');
    }
}

// Show dashboard
function showDashboard() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'block';
    
    populateFormFields();
    initializeAdminMap();
    populateRouteList();
    populateTimelineList();
    populatePackageContents();
}

// Handle logout
function handleLogout() {
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
    
    // Clear form
    document.getElementById('loginForm').reset();
}

// Populate form fields with current data
function populateFormFields() {
    document.getElementById('editTrackingNumber').value = trackingData.trackingNumber;
    document.getElementById('editCurrentStatus').value = trackingData.currentStatus;
    document.getElementById('editLastUpdate').value = trackingData.lastUpdate;
    document.getElementById('editEstimatedDelivery').value = trackingData.estimatedDelivery;
    
    // Package details
    document.getElementById('editTotalWeight').value = trackingData.packageDetails.weight;
    document.getElementById('editLuggageWeight').value = trackingData.packageDetails.weightBreakdown.luggage;
    document.getElementById('editBoxWeight').value = trackingData.packageDetails.weightBreakdown.mentalBox;
    document.getElementById('editDocumentsWeight').value = trackingData.packageDetails.weightBreakdown.documents;
    document.getElementById('editServiceType').value = trackingData.packageDetails.serviceType;
    document.getElementById('editDeparture').value = trackingData.packageDetails.departure;
    document.getElementById('editDestination').value = trackingData.packageDetails.destination;
    
    // Contact information
    document.getElementById('editSenderName').value = trackingData.sender.name;
    document.getElementById('editSenderAddress').value = trackingData.sender.address;
    document.getElementById('editReceiverName').value = trackingData.receiver.name;
    document.getElementById('editReceiverAddress').value = trackingData.receiver.address;
}

// Initialize admin map
function initializeAdminMap() {
    if (adminMap) {
        adminMap.remove();
    }
    
    adminMap = L.map('adminMap').setView([trackingData.currentLocation.lat, trackingData.currentLocation.lng], 3);
    
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors © CARTO',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(adminMap);
    
    updateMapMarkers();
}

// Update map markers
function updateMapMarkers() {
    // Clear existing markers
    adminMap.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
            adminMap.removeLayer(layer);
        }
    });
    
    // Add route line
    const routeCoordinates = trackingData.route.map(point => [point.lat, point.lng]);
    L.polyline(routeCoordinates, {
        color: '#0074D9',
        weight: 3,
        opacity: 0.7,
        dashArray: '10, 10'
    }).addTo(adminMap);
    
    // Add markers
    trackingData.route.forEach((point, index) => {
        const isCurrent = point.status === 'Current';
        
        let iconHtml = '';
        if (isCurrent) {
            iconHtml = '<div style="background: #FF4136; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 10px rgba(255,65,54,0.5);"></div>';
        } else {
            iconHtml = '<div style="background: #0074D9; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>';
        }
        
        const customIcon = L.divIcon({
            html: iconHtml,
            className: 'custom-marker',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });
        
        const marker = L.marker([point.lat, point.lng], { icon: customIcon, draggable: editMode }).addTo(adminMap);
        
        if (editMode) {
            marker.on('dragend', function(e) {
                const newLatLng = e.target.getLatLng();
                updateRoutePoint(index, newLatLng.lat, newLatLng.lng);
            });
        }
        
        marker.bindPopup(`
            <div style="font-family: 'Inter', sans-serif;">
                <strong>${point.city}, ${point.country}</strong><br>
                <span style="color: #7f8c8d; font-size: 0.875rem;">${point.status}</span><br>
                <small>Lat: ${point.lat.toFixed(4)}, Lng: ${point.lng.toFixed(4)}</small>
            </div>
        `);
    });
}

// Populate route list
function populateRouteList() {
    const routeList = document.getElementById('routeList');
    routeList.innerHTML = '';
    
    trackingData.route.forEach((point, index) => {
        const routeItem = document.createElement('div');
        routeItem.className = 'route-item';
        routeItem.innerHTML = `
            <div class="route-item-header">
                <div class="route-item-title">${point.city}, ${point.country}</div>
                <div class="route-item-actions">
                    <button class="btn-edit" onclick="editRoutePoint(${index})">Edit</button>
                    <button class="btn-delete" onclick="deleteRoutePoint(${index})">Delete</button>
                </div>
            </div>
            <div class="route-item-details">
                <input type="text" placeholder="City" value="${point.city}" onchange="updateRoutePointData(${index}, 'city', this.value)">
                <input type="text" placeholder="Country" value="${point.country}" onchange="updateRoutePointData(${index}, 'country', this.value)">
                <input type="number" placeholder="Latitude" value="${point.lat}" step="0.0001" onchange="updateRoutePointData(${index}, 'lat', parseFloat(this.value))">
                <input type="number" placeholder="Longitude" value="${point.lng}" step="0.0001" onchange="updateRoutePointData(${index}, 'lng', parseFloat(this.value))">
                <select onchange="updateRoutePointData(${index}, 'status', this.value)" style="grid-column: 1 / -1;">
                    <option value="Departed" ${point.status === 'Departed' ? 'selected' : ''}>Departed</option>
                    <option value="Completed" ${point.status === 'Completed' ? 'selected' : ''}>Completed</option>
                    <option value="Current" ${point.status === 'Current' ? 'selected' : ''}>Current</option>
                    <option value="Upcoming" ${point.status === 'Upcoming' ? 'selected' : ''}>Upcoming</option>
                </select>
            </div>
        `;
        routeList.appendChild(routeItem);
    });
}

// Populate timeline list
function populateTimelineList() {
    const timelineList = document.getElementById('timelineList');
    timelineList.innerHTML = '';
    
    trackingData.timeline.forEach((event, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.innerHTML = `
            <div class="timeline-item-header">
                <div class="timeline-item-title">${event.status}</div>
                <div class="route-item-actions">
                    <button class="btn-edit" onclick="editTimelineEvent(${index})">Edit</button>
                    <button class="btn-delete" onclick="deleteTimelineEvent(${index})">Delete</button>
                </div>
            </div>
            <div class="timeline-item-form">
                <input type="text" placeholder="Status" value="${event.status}" onchange="updateTimelineEventData(${index}, 'status', this.value)">
                <input type="text" placeholder="Date" value="${event.date}" onchange="updateTimelineEventData(${index}, 'date', this.value)">
                <input type="text" placeholder="Location" value="${event.location}" onchange="updateTimelineEventData(${index}, 'location', this.value)">
                <label style="display: flex; align-items: center; gap: 0.5rem;">
                    <input type="checkbox" ${event.completed ? 'checked' : ''} onchange="updateTimelineEventData(${index}, 'completed', this.checked)">
                    Completed
                </label>
                <textarea placeholder="Description" onchange="updateTimelineEventData(${index}, 'description', this.value)">${event.description}</textarea>
            </div>
        `;
        timelineList.appendChild(timelineItem);
    });
}

// Populate package contents
function populatePackageContents() {
    const contentsList = document.getElementById('contentsList');
    contentsList.innerHTML = '';
    
    trackingData.packageDetails.contents.forEach((content, index) => {
        const contentItem = document.createElement('div');
        contentItem.className = 'content-item';
        contentItem.innerHTML = `
            <input type="text" value="${content}" onchange="updatePackageContent(${index}, this.value)">
            <button class="btn-delete" onclick="deletePackageContent(${index})">×</button>
        `;
        contentsList.appendChild(contentItem);
    });
}

// Update functions
function updateRoutePoint(index, lat, lng) {
    trackingData.route[index].lat = lat;
    trackingData.route[index].lng = lng;
    updateMapMarkers();
}

function updateRoutePointData(index, field, value) {
    trackingData.route[index][field] = value;
    
    if (field === 'lat' || field === 'lng') {
        updateMapMarkers();
    }
}

function updateTimelineEventData(index, field, value) {
    trackingData.timeline[index][field] = value;
}

function updatePackageContent(index, value) {
    trackingData.packageDetails.contents[index] = value;
}

// Add functions
function addRoutePoint() {
    const newPoint = {
        lat: 0,
        lng: 0,
        city: 'New Location',
        country: 'Country',
        status: 'Upcoming'
    };
    trackingData.route.push(newPoint);
    populateRouteList();
    updateMapMarkers();
    showNotification('Route point added', 'success');
}

function addTimelineEvent() {
    const newEvent = {
        status: 'New Event',
        description: 'Event description',
        date: new Date().toLocaleString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        }),
        location: 'Location',
        completed: false
    };
    trackingData.timeline.push(newEvent);
    populateTimelineList();
    showNotification('Timeline event added', 'success');
}

function addPackageContent() {
    trackingData.packageDetails.contents.push('New Item');
    populatePackageContents();
    showNotification('Package item added', 'success');
}

// Delete functions
function deleteRoutePoint(index) {
    if (confirm('Are you sure you want to delete this route point?')) {
        trackingData.route.splice(index, 1);
        populateRouteList();
        updateMapMarkers();
        showNotification('Route point deleted', 'success');
    }
}

function deleteTimelineEvent(index) {
    if (confirm('Are you sure you want to delete this timeline event?')) {
        trackingData.timeline.splice(index, 1);
        populateTimelineList();
        showNotification('Timeline event deleted', 'success');
    }
}

function deletePackageContent(index) {
    if (confirm('Are you sure you want to delete this item?')) {
        trackingData.packageDetails.contents.splice(index, 1);
        populatePackageContents();
        showNotification('Package item deleted', 'success');
    }
}

// Edit functions
function editRoutePoint(index) {
    // Focus on the first input field
    const routeItems = document.querySelectorAll('.route-item');
    if (routeItems[index]) {
        const firstInput = routeItems[index].querySelector('input');
        if (firstInput) {
            firstInput.focus();
            firstInput.select();
        }
    }
}

function editTimelineEvent(index) {
    // Focus on the first input field
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems[index]) {
        const firstInput = timelineItems[index].querySelector('input');
        if (firstInput) {
            firstInput.focus();
            firstInput.select();
        }
    }
}

// Quick action functions
function addNewLocation() {
    addRoutePoint();
    document.getElementById('routeList').scrollTop = document.getElementById('routeList').scrollHeight;
}

function updateCurrentStatus() {
    const newStatus = prompt('Enter new status:', trackingData.currentStatus);
    if (newStatus) {
        trackingData.currentStatus = newStatus;
        document.getElementById('editCurrentStatus').value = newStatus;
        showNotification('Status updated', 'success');
    }
}

function resetTracking() {
    if (confirm('Are you sure you want to reset all tracking data to default?')) {
        localStorage.removeItem('sfTrackingData');
        location.reload();
    }
}

function exportData() {
    const dataStr = JSON.stringify(trackingData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sf-tracking-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showNotification('Data exported successfully', 'success');
}

// Map functions
function centerMap() {
    if (trackingData.route.length > 0) {
        const bounds = L.latLngBounds(trackingData.route.map(point => [point.lat, point.lng]));
        adminMap.fitBounds(bounds, { padding: [50, 50] });
    }
}

function toggleEditMode() {
    editMode = !editMode;
    updateMapMarkers();
    showNotification(`Edit mode ${editMode ? 'enabled' : 'disabled'}`, 'info');
}

// Save all changes
function saveAllChanges() {
    // Collect data from form fields
    trackingData.trackingNumber = document.getElementById('editTrackingNumber').value;
    trackingData.currentStatus = document.getElementById('editCurrentStatus').value;
    trackingData.lastUpdate = document.getElementById('editLastUpdate').value;
    trackingData.estimatedDelivery = document.getElementById('editEstimatedDelivery').value;
    
    // Package details
    trackingData.packageDetails.weight = document.getElementById('editTotalWeight').value;
    trackingData.packageDetails.weightBreakdown.luggage = document.getElementById('editLuggageWeight').value;
    trackingData.packageDetails.weightBreakdown.mentalBox = document.getElementById('editBoxWeight').value;
    trackingData.packageDetails.weightBreakdown.documents = document.getElementById('editDocumentsWeight').value;
    trackingData.packageDetails.serviceType = document.getElementById('editServiceType').value;
    trackingData.packageDetails.departure = document.getElementById('editDeparture').value;
    trackingData.packageDetails.destination = document.getElementById('editDestination').value;
    
    // Contact information
    trackingData.sender.name = document.getElementById('editSenderName').value;
    trackingData.sender.address = document.getElementById('editSenderAddress').value;
    trackingData.receiver.name = document.getElementById('editReceiverName').value;
    trackingData.receiver.address = document.getElementById('editReceiverAddress').value;
    
    // Update current location based on route
    const currentRoutePoint = trackingData.route.find(point => point.status === 'Current');
    if (currentRoutePoint) {
        trackingData.currentLocation = {
            lat: currentRoutePoint.lat,
            lng: currentRoutePoint.lng,
            city: currentRoutePoint.city,
            country: currentRoutePoint.country
        };
    }
    
    // Save to localStorage
    localStorage.setItem('sfTrackingData', JSON.stringify(trackingData));
    
    // Also update the main tracking database
    updateMainTrackingDatabase();
    
    showNotification('All changes saved successfully!', 'success');
}

// Update main tracking database
function updateMainTrackingDatabase() {
    // This would normally update the main script.js file
    // For now, we'll save to localStorage and the main script will read from there
    localStorage.setItem('sfTrackingData', JSON.stringify(trackingData));
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    const messageElement = document.getElementById('notificationMessage');
    
    messageElement.textContent = message;
    notification.className = `notification ${type} show`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function hideNotification() {
    const notification = document.getElementById('notification');
    notification.classList.remove('show');
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl+S to save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveAllChanges();
    }
    
    // Ctrl+E to toggle edit mode
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        toggleEditMode();
    }
    
    // Escape to logout
    if (e.key === 'Escape' && document.getElementById('adminDashboard').style.display !== 'none') {
        if (confirm('Are you sure you want to logout?')) {
            handleLogout();
        }
    }
});

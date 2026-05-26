// Initialize map variable
let map;
let currentMarker;
let routeLine;

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhFmYpQvINgDoE4PWkP6AwzyuY8OxwTP8",
  authDomain: "sfexpressinternational-7b50b.firebaseapp.com",
  databaseURL: "https://sfexpressinternational-7b50b-default-rtdb.firebaseio.com",
  projectId: "sfexpressinternational-7b50b",
  storageBucket: "sfexpressinternational-7b50b.firebasestorage.app",
  messagingSenderId: "808031073166",
  appId: "1:808031073166:web:ced6ffc6d9e98453bceadf",
  measurementId: "G-SWT5E7WQZX"
};

// Initialize Firebase
try {
    firebase.initializeApp(firebaseConfig);
    console.log('Firebase initialized successfully');
} catch (e) {
    console.error('Firebase initialization error:', e);
}

// Firebase database reference
const db = firebase.database();
const shipmentsRef = db.ref('shipments');

// Private tracking numbers database
let trackingDatabase = {};

// Load tracking data from JSON file
async function loadTrackingDataFromJSON() {
    try {
        const response = await fetch('tracking-data.json');
        const data = await response.json();
        trackingDatabase = data;
    } catch (e) {
        console.error('Error loading tracking data from JSON:', e);
        // Fallback to localStorage
        loadTrackingDataFromStorage();
    }
}

// Load tracking data from localStorage if available
async function loadTrackingDataFromStorage() {
    const savedData = localStorage.getItem('sfTrackingData');
    if (savedData) {
        try {
            const parsedData = JSON.parse(savedData);
            trackingDatabase['SF2026UKTHAI'] = parsedData;
        } catch (e) {
            console.error('Error loading tracking data from localStorage:', e);
        }
    }
    
    // Load shipments from Firebase (priority for cross-device tracking)
    try {
        console.log('Attempting to load shipments from Firebase...');
        const snapshot = await shipmentsRef.once('value');
        if (snapshot.exists()) {
            const firebaseShipments = snapshot.val();
            Object.assign(trackingDatabase, firebaseShipments);
            console.log('Shipments loaded from Firebase successfully:', Object.keys(firebaseShipments));
        } else {
            console.log('Firebase database is empty - no shipments found');
            // Fallback to localStorage only if Firebase is empty
            const adminShipments = localStorage.getItem('sfExpressShipments');
            if (adminShipments) {
                try {
                    const parsedShipments = JSON.parse(adminShipments);
                    Object.assign(trackingDatabase, parsedShipments);
                    console.log('Loaded shipments from localStorage as fallback');
                } catch (e) {
                    console.error('Error loading admin shipments from localStorage:', e);
                }
            }
        }
    } catch (e) {
        console.error('Error loading shipments from Firebase:', e);
        // Fallback to localStorage on Firebase error
        const adminShipments = localStorage.getItem('sfExpressShipments');
        if (adminShipments) {
            try {
                const parsedShipments = JSON.parse(adminShipments);
                Object.assign(trackingDatabase, parsedShipments);
                console.log('Loaded shipments from localStorage as fallback');
            } catch (e) {
                console.error('Error loading admin shipments from localStorage:', e);
            }
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', async function() {
    // Load tracking data from JSON file first
    await loadTrackingDataFromJSON();
    
    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Add input validation
    const trackingInput = document.getElementById('trackingNumber');
    trackingInput.addEventListener('input', function() {
        this.value = this.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    });

    // Add enter key support for tracking
    trackingInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            trackShipment();
        }
    });
});

// Main tracking function
async function trackShipment() {
    const trackingNumber = document.getElementById('trackingNumber').value.trim();
    const privateCode = document.getElementById('privateCode').value.trim();
    
    if (!trackingNumber) {
        showNotification('Please enter a tracking number', 'error');
        return;
    }
    
    if (!privateCode) {
        showNotification('Please enter your private access code', 'error');
        return;
    }

    // Show loading state
    const button = document.querySelector('.tracking-button');
    const originalText = button.textContent;
    button.innerHTML = '<span class="loading"></span> Tracking...';
    button.disabled = true;

    // Ensure Firebase data is loaded
    await loadTrackingDataFromStorage();
    
    // Simulate API call delay
    setTimeout(() => {
        const shipmentData = trackingDatabase[trackingNumber];
        
        if (shipmentData) {
            // Verify private code
            if (shipmentData.privateCode && shipmentData.privateCode !== privateCode) {
                showNotification('Invalid private access code. Please try again.', 'error');
                button.textContent = originalText;
                button.disabled = false;
                return;
            }
            
            // If no private code is set (for backward compatibility), allow access
            if (!shipmentData.privateCode) {
                console.warn('Shipment has no private code set - allowing access for backward compatibility');
            }
            displayTrackingResults(shipmentData);
            showNotification('Tracking information found!', 'success');
        } else {
            showNotification('Tracking number not found. Please check and try again.', 'error');
        }
        
        // Reset button
        button.textContent = originalText;
        button.disabled = false;
    }, 1500);
}

// Display tracking results
function displayTrackingResults(data) {
    // Update tracking number display
    document.getElementById('displayTrackingNumber').textContent = data.trackingNumber;
    
    // Update status overview
    document.getElementById('currentStatus').textContent = data.currentStatus;
    document.getElementById('lastUpdate').textContent = data.lastUpdate;
    document.getElementById('estimatedDelivery').textContent = data.estimatedDelivery;
    
    // Update package details
    updatePackageDetails(data);
    
    // Update contact information
    updateContactInfo(data);
    
    // Update timeline
    updateTimeline(data.timeline);
    
    // Show results section
    const resultsSection = document.getElementById('tracking-results');
    resultsSection.style.display = 'block';
    
    // Initialize map after showing section
    setTimeout(() => {
        initializeMap(data);
    }, 100);
    
    // Scroll to results
    resultsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Initialize map
function initializeMap(data) {
    // Destroy existing map if it exists
    if (map) {
        map.remove();
    }

    // Create new map
    map = L.map('map').setView([data.currentLocation.lat, data.currentLocation.lng], 5);

    // Add tile layer with standard OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);

    // Create route coordinates
    const routeCoordinates = data.route.map(point => [point.lat, point.lng]);
    
    // Draw route line
    routeLine = L.polyline(routeCoordinates, {
        color: '#0074D9',
        weight: 3,
        opacity: 0.7,
        dashArray: '10, 10'
    }).addTo(map);

    // Add markers for each point
    data.route.forEach((point, index) => {
        const isCurrent = point.status === 'Current';
        const isDestination = point.status === 'Destination';
        
        let iconHtml = '';
        if (isCurrent) {
            iconHtml = '<div style="background: #FF4136; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 10px rgba(255,65,54,0.5);"></div>';
        } else if (isDestination) {
            iconHtml = '<div style="background: #2ECC40; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white;"></div>';
        } else {
            iconHtml = '<div style="background: #0074D9; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>';
        }
        
        const customIcon = L.divIcon({
            html: iconHtml,
            className: 'custom-marker',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });
        
        const marker = L.marker([point.lat, point.lng], { icon: customIcon }).addTo(map);
        
        // Add popup
        marker.bindPopup(`
            <div style="font-family: 'Inter', sans-serif;">
                <strong>${point.city}, ${point.country}</strong><br>
                <span style="color: #7f8c8d; font-size: 0.875rem;">${point.status}</span>
            </div>
        `);
        
        if (isCurrent) {
            currentMarker = marker;
            marker.openPopup();
        }
    });

    // Fit map to show entire route
    if (routeCoordinates.length > 0) {
        map.fitBounds(routeLine.getBounds(), { padding: [50, 50] });
    }

    // Simulate real-time updates
    simulateRealTimeUpdates(data);
}

// Simulate real-time location updates
function simulateRealTimeUpdates(data) {
    let updateCount = 0;
    const maxUpdates = 3;
    
    const updateInterval = setInterval(() => {
        if (updateCount >= maxUpdates) {
            clearInterval(updateInterval);
            return;
        }
        
        // Slightly move the current marker to simulate movement
        if (currentMarker) {
            const currentPos = currentMarker.getLatLng();
            const randomOffset = 0.1;
            const newLat = currentPos.lat + (Math.random() - 0.5) * randomOffset;
            const newLng = currentPos.lng + (Math.random() - 0.5) * randomOffset;
            
            currentMarker.setLatLng([newLat, newLng]);
            
            // Update last update time
            const now = new Date();
            const timeString = now.toLocaleString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
            });
            document.getElementById('lastUpdate').textContent = timeString;
        }
        
        updateCount++;
    }, 10000); // Update every 10 seconds
}

// Update package details
function updatePackageDetails(data) {
    const packageList = document.querySelector('.package-list');
    packageList.innerHTML = '';
    
    data.packageDetails.contents.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        packageList.appendChild(li);
    });
    
    // Update weight information
    document.querySelector('.weight-value').textContent = data.packageDetails.weight;
    
    const weightBreakdown = document.querySelector('.weight-breakdown');
    weightBreakdown.innerHTML = `
        3 Luggage: ${data.packageDetails.weightBreakdown.luggage}<br>
        Mental Box: ${data.packageDetails.weightBreakdown.mentalBox}<br>
        Documents: ${data.packageDetails.weightBreakdown.documents}
    `;
    
    // Update shipment information
    const shipmentInfo = document.querySelector('.shipment-info');
    shipmentInfo.innerHTML = `
        <div class="info-row">
            <span>Service Type:</span>
            <span>${data.packageDetails.serviceType}</span>
        </div>
        <div class="info-row">
            <span>Departure:</span>
            <span>${data.packageDetails.departure}</span>
        </div>
        <div class="info-row">
            <span>Destination:</span>
            <span>${data.packageDetails.destination}</span>
        </div>
    `;
}

// Update contact information
function updateContactInfo(data) {
    // Update sender information
    const senderName = document.querySelector('.info-section:first-child .contact-name h4');
    const senderAddress = document.querySelector('.info-section:first-child .contact-details p');
    
    senderName.textContent = data.sender.name;
    senderAddress.innerHTML = `<strong>Address:</strong><br>${data.sender.address.replace(/\n/g, '<br>')}`;
    
    // Update receiver information
    const receiverName = document.querySelector('.info-section:last-child .contact-name h4');
    const receiverAddress = document.querySelector('.info-section:last-child .contact-details p');
    
    receiverName.textContent = data.receiver.name;
    receiverAddress.innerHTML = `<strong>Address:</strong><br>${data.receiver.address.replace(/\n/g, '<br>')}`;
}

// Update timeline
function updateTimeline(timelineData) {
    const timeline = document.querySelector('.timeline');
    timeline.innerHTML = '';
    
    timelineData.forEach((event, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        if (event.completed) {
            timelineItem.classList.add('completed');
        }
        if (event.active) {
            timelineItem.classList.add('active');
        }
        
        timelineItem.innerHTML = `
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <h4>${event.status}</h4>
                <p>${event.description}</p>
                <span class="timeline-date">${event.date}</span>
                <span class="timeline-location">${event.location}</span>
            </div>
        `;
        
        timeline.appendChild(timelineItem);
    });
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.background = '#2ECC40';
    } else if (type === 'error') {
        notification.style.background = '#FF4136';
    } else {
        notification.style.background = '#0074D9';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add restart functionality
document.addEventListener('DOMContentLoaded', function() {
    const restartButton = document.getElementById('restart-button');
    if (restartButton) {
        restartButton.addEventListener('click', function() {
            // Reset form
            document.getElementById('trackingNumber').value = '';
            
            // Hide results
            document.getElementById('tracking-results').style.display = 'none';
            
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            showNotification('Ready for new tracking', 'info');
        });
    }
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to focus tracking input
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('trackingNumber').focus();
    }
    
    // Escape to clear tracking input
    if (e.key === 'Escape') {
        const trackingInput = document.getElementById('trackingNumber');
        if (document.activeElement === trackingInput) {
            trackingInput.value = '';
            trackingInput.blur();
        }
    }
});

// Add page visibility API for real-time updates
document.addEventListener('visibilitychange', function() {
    if (!document.hidden && map) {
        // Refresh map when page becomes visible again
        map.invalidateSize();
    }
});

// Add error handling for map loading
window.addEventListener('error', function(e) {
    if (e.message.includes('Leaflet')) {
        console.error('Map loading error:', e);
        showNotification('Map loading failed. Please refresh the page.', 'error');
    }
});

// Add performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
    
    // Show performance notification in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('Development mode detected');
    }
});

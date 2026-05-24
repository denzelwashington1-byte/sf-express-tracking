// Public Tracking Page JavaScript
let trackingMap;
let currentMarker;
let routeLine;

// Initialize the tracking page
document.addEventListener('DOMContentLoaded', function() {
    // Get tracking code from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const trackingCode = urlParams.get('code');
    
    if (trackingCode) {
        document.getElementById('trackingCode').value = trackingCode;
        trackShipment();
    }
    
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
});

// Track shipment function
function trackShipment() {
    const trackingCode = document.getElementById('trackingCode').value.trim();
    
    if (!trackingCode) {
        showNotification('Please enter a tracking code', 'error');
        return;
    }
    
    // Show loading state
    const button = document.querySelector('.tracking-button');
    const originalText = button.textContent;
    button.innerHTML = '<span class="loading"></span> Tracking...';
    button.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        const shipmentData = getShipmentData(trackingCode);
        
        if (shipmentData) {
            displayTrackingResults(shipmentData);
            showNotification('Tracking information found!', 'success');
        } else {
            showNotification('Tracking code not found. Please check and try again.', 'error');
        }
        
        // Reset button
        button.textContent = originalText;
        button.disabled = false;
    }, 1500);
}

// Get shipment data from localStorage or shipments.json
function getShipmentData(trackingCode) {
    // Try localStorage first
    const localShipments = JSON.parse(localStorage.getItem('sfExpressShipments')) || {};
    if (localShipments[trackingCode]) {
        return localShipments[trackingCode];
    }
    
    // Try fetching from shipments.json
    try {
        const response = fetch('shipments.json');
        const data = response.json();
        return data[trackingCode] || null;
    } catch (e) {
        console.error('Error fetching shipments:', e);
        return null;
    }
}

// Display tracking results
function displayTrackingResults(data) {
    // Update tracking code display
    document.getElementById('displayTrackingCode').textContent = data.trackingCode;
    
    // Update status overview
    document.getElementById('currentStatus').textContent = data.currentStatus;
    document.getElementById('lastUpdate').textContent = data.lastUpdate;
    document.getElementById('estimatedDelivery').textContent = data.estimatedDelivery;
    
    // Update package details
    document.getElementById('packageContents').innerHTML = '';
    data.packageDetails.contents.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        document.getElementById('packageContents').appendChild(li);
    });
    
    document.getElementById('packageWeight').textContent = data.packageDetails.weight;
    document.getElementById('serviceType').textContent = data.packageDetails.serviceType;
    document.getElementById('departure').textContent = data.packageDetails.departure;
    document.getElementById('destination').textContent = data.packageDetails.destination;
    
    // Update contact information
    document.getElementById('senderName').textContent = data.sender.name;
    document.getElementById('senderAddress').textContent = data.sender.address.replace(/\n/g, '<br>');
    document.getElementById('receiverName').textContent = data.receiver.name;
    document.getElementById('receiverAddress').textContent = data.receiver.address.replace(/\n/g, '<br>');
    
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

// Initialize 3D map using Leaflet (2D map with 3D-like features)
function initializeMap(data) {
    // Destroy existing map if it exists
    if (trackingMap) {
        trackingMap.remove();
    }
    
    // Create new map centered on current location
    const centerLat = data.currentLocation.lat || 0;
    const centerLng = data.currentLocation.lng || 0;
    
    trackingMap = L.map('trackingMap').setView([centerLat || 20, centerLng || 0], 3);
    
    // Add dark theme tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors © CARTO',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(trackingMap);
    
    // Draw route if available
    if (data.route && data.route.length > 0) {
        const routeCoordinates = data.route.map(point => [point.lat, point.lng]);
        
        routeLine = L.polyline(routeCoordinates, {
            color: '#0074D9',
            weight: 4,
            opacity: 0.8,
            dashArray: '10, 10'
        }).addTo(trackingMap);
        
        // Add markers for each point
        data.route.forEach((point, index) => {
            const isCurrent = point.status === 'Current';
            
            let iconHtml = '';
            if (isCurrent) {
                iconHtml = '<div style="background: #FF4136; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 15px rgba(255,65,54,0.6); animation: pulse 2s infinite;"></div>';
            } else {
                iconHtml = '<div style="background: #0074D9; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white;"></div>';
            }
            
            const customIcon = L.divIcon({
                html: iconHtml,
                className: 'custom-marker',
                iconSize: [24, 24],
                iconAnchor: [12, 12]
            });
            
            const marker = L.marker([point.lat, point.lng], { icon: customIcon }).addTo(trackingMap);
            
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
            trackingMap.fitBounds(routeLine.getBounds(), { padding: [50, 50] });
        }
    } else {
        // Show current location marker if no route
        if (centerLat !== 0 && centerLng !== 0) {
            const iconHtml = '<div style="background: #FF4136; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 15px rgba(255,65,54,0.6); animation: pulse 2s infinite;"></div>';
            
            const customIcon = L.divIcon({
                html: iconHtml,
                className: 'custom-marker',
                iconSize: [24, 24],
                iconAnchor: [12, 12]
            });
            
            currentMarker = L.marker([centerLat, centerLng], { icon: customIcon }).addTo(trackingMap);
            currentMarker.bindPopup(`
                <div style="font-family: 'Inter', sans-serif;">
                    <strong>${data.currentLocation.city}, ${data.currentLocation.country}</strong><br>
                    <span style="color: #7f8c8d; font-size: 0.875rem;">Current Location</span>
                </div>
            `).openPopup();
        }
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
        if (currentMarker && data.currentLocation.lat !== 0 && data.currentLocation.lng !== 0) {
            const currentPos = currentMarker.getLatLng();
            const randomOffset = 0.05;
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
    }, 15000); // Update every 15 seconds
}

// Update timeline
function updateTimeline(timelineData) {
    const timeline = document.getElementById('timeline');
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

// Add CSS animation for pulse effect
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(255, 65, 54, 0.7); }
        70% { box-shadow: 0 0 0 15px rgba(255, 65, 54, 0); }
        100% { box-shadow: 0 0 0 0 rgba(255, 65, 54, 0); }
    }
    
    .tracking-map-3d {
        height: 500px;
        border-radius: var(--border-radius);
        overflow: hidden;
        border: 2px solid var(--border-color);
        box-shadow: var(--shadow-lg);
    }
    
    .loading {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: white;
        animation: spin 1s ease-in-out infinite;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

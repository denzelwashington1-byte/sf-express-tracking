// Public Tracking Page JavaScript
let trackingMap;
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
const chatsRef = db.ref('chats');

// Chat variables
let currentTrackingCode = null;
let chatListener = null;

// Multi-language support
const translations = {
    en: {
        title: 'Track Your Shipment',
        subtitle: 'Enter your tracking code to see real-time shipment status',
        placeholder: 'Enter tracking code',
        track: 'Track',
        scanBarcode: '📷 Scan Barcode',
        hint: 'Enter the private tracking code provided by the sender',
        trackingDetails: 'Shipment Tracking Details',
        trackingCode: 'Tracking Code:',
        currentStatus: 'Current Status',
        sender: 'Sender',
        receiver: 'Receiver',
        package: 'Package Information',
        timeline: 'Shipment Timeline',
        customerCare: 'Customer Care',
        online: 'Online',
        typeMessage: 'Type your message...',
        welcome: 'Welcome to SF Express Customer Care. How can we help you today?'
    },
    es: {
        title: 'Rastrear su Envío',
        subtitle: 'Ingrese su código de seguimiento para ver el estado en tiempo real',
        placeholder: 'Ingrese código de seguimiento',
        track: 'Rastrear',
        scanBarcode: '📷 Escanear Código',
        hint: 'Ingrese el código de seguimiento privado proporcionado por el remitente',
        trackingDetails: 'Detalles de Seguimiento de Envío',
        trackingCode: 'Código de Seguimiento:',
        currentStatus: 'Estado Actual',
        sender: 'Remitente',
        receiver: 'Destinatario',
        package: 'Información del Paquete',
        timeline: 'Cronología del Envío',
        customerCare: 'Atención al Cliente',
        online: 'En línea',
        typeMessage: 'Escriba su mensaje...',
        welcome: 'Bienvenido a Atención al Cliente de SF Express. ¿Cómo podemos ayudarle hoy?'
    },
    fr: {
        title: 'Suivre votre Expédition',
        subtitle: 'Entrez votre code de suivi pour voir le statut en temps réel',
        placeholder: 'Entrez le code de suivi',
        track: 'Suivre',
        scanBarcode: '📷 Scanner le Code',
        hint: 'Entrez le code de suivi privé fourni par l\'expéditeur',
        trackingDetails: 'Détails de Suivi d\'Expédition',
        trackingCode: 'Code de Suivi:',
        currentStatus: 'Statut Actuel',
        sender: 'Expéditeur',
        receiver: 'Destinataire',
        package: 'Informations sur le Colis',
        timeline: 'Chronologie de l\'Expédition',
        customerCare: 'Service Client',
        online: 'En ligne',
        typeMessage: 'Tapez votre message...',
        welcome: 'Bienvenue au Service Client SF Express. Comment pouvons-nous vous aider aujourd\'hui?'
    },
    de: {
        title: 'Sendung Verfolgen',
        subtitle: 'Geben Sie Ihre Sendungsnummer ein, um den Echtzeit-Status zu sehen',
        placeholder: 'Sendungsnummer eingeben',
        track: 'Verfolgen',
        scanBarcode: '📷 Barcode Scannen',
        hint: 'Geben Sie die private Sendungsnummer ein, die vom Absender bereitgestellt wurde',
        trackingDetails: 'Sendungsverfolgungsdetails',
        trackingCode: 'Sendungsnummer:',
        currentStatus: 'Aktueller Status',
        sender: 'Absender',
        receiver: 'Empfänger',
        package: 'Paketinformationen',
        timeline: 'Sendungszeitlinie',
        customerCare: 'Kundenservice',
        online: 'Online',
        typeMessage: 'Geben Sie Ihre Nachricht ein...',
        welcome: 'Willkommen beim SF Express Kundenservice. Wie können wir Ihnen heute helfen?'
    },
    zh: {
        title: '追踪您的货物',
        subtitle: '输入您的追踪码以查看实时货物状态',
        placeholder: '输入追踪码',
        track: '追踪',
        scanBarcode: '📷 扫描条形码',
        hint: '输入寄件人提供的私人追踪码',
        trackingDetails: '货物追踪详情',
        trackingCode: '追踪码：',
        currentStatus: '当前状态',
        sender: '寄件人',
        receiver: '收件人',
        package: '包裹信息',
        timeline: '货物时间线',
        customerCare: '客户服务',
        online: '在线',
        typeMessage: '输入您的消息...',
        welcome: '欢迎使用SF Express客户服务。我们今天能为您做些什么？'
    },
    ar: {
        title: 'تتبع شحنتك',
        subtitle: 'أدخل رمز التتبع لرؤية حالة الشحنة في الوقت الفعلي',
        placeholder: 'أدخل رمز التتبع',
        track: 'تتبع',
        scanBarcode: '📷 مسح الباركود',
        hint: 'أدخل رمز التتبع الخاص المقدم من المرسل',
        trackingDetails: 'تفاصيل تتبع الشحنة',
        trackingCode: 'رمز التتبع:',
        currentStatus: 'الحالة الحالية',
        sender: 'المرسل',
        receiver: 'المستلم',
        package: 'معلومات الطرد',
        timeline: 'الجدول الزمني للشحنة',
        customerCare: 'خدمة العملاء',
        online: 'متصل',
        typeMessage: 'اكتب رسالتك...',
        welcome: 'مرحبًا بك في خدمة عملاء SF Express. كيف يمكننا مساعدتك اليوم؟'
    }
};

let currentLanguage = 'en';

function changeLanguage(lang) {
    currentLanguage = lang;
    const t = translations[lang];
    
    // Update page elements
    document.querySelector('.hero-title').textContent = t.title;
    document.querySelector('.hero-subtitle').textContent = t.subtitle;
    document.querySelector('.tracking-input').placeholder = t.placeholder;
    document.querySelector('.tracking-button').textContent = t.track;
    document.querySelector('.barcode-scan-btn').textContent = t.scanBarcode;
    document.querySelector('.form-hint').textContent = t.hint;
    
    // Update tracking results if visible
    const resultsHeader = document.querySelector('.results-header h2');
    if (resultsHeader) resultsHeader.textContent = t.trackingDetails;
    
    const trackingLabel = document.querySelector('.tracking-number-display .label');
    if (trackingLabel) trackingLabel.textContent = t.trackingCode;
    
    // Update chat widget
    const chatTitle = document.querySelector('.chat-widget-title span:first-child');
    if (chatTitle) chatTitle.textContent = t.customerCare;
    
    const chatStatus = document.querySelector('.chat-widget-status');
    if (chatStatus) chatStatus.textContent = t.online;
    
    const chatInput = document.getElementById('chatInput');
    if (chatInput) chatInput.placeholder = t.typeMessage;
    
    // Update RTL for Arabic
    if (lang === 'ar') {
        document.body.style.direction = 'rtl';
        document.body.style.textAlign = 'right';
    } else {
        document.body.style.direction = 'ltr';
        document.body.style.textAlign = 'left';
    }
}

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
async function trackShipment() {
    const trackingCode = document.getElementById('trackingCode').value.trim();
    
    if (!trackingCode) {
        showNotification('Please enter a tracking code', 'error');
        return;
    }
    
    // Set current tracking code for chat
    currentTrackingCode = trackingCode;
    
    // Show loading state
    const button = document.querySelector('.tracking-button');
    const originalText = button.textContent;
    button.innerHTML = '<span class="loading"></span> Tracking...';
    button.disabled = true;
    
    // Load from Firebase
    const shipmentData = await getShipmentData(trackingCode);
    
    if (shipmentData) {
        displayTrackingResults(shipmentData);
        showNotification('Tracking information found!', 'success');
        // Load chat messages for this shipment
        loadChatMessages(trackingCode);
    } else {
        showNotification('Tracking code not found. Please check and try again.', 'error');
    }
    
    // Reset button
    button.textContent = originalText;
    button.disabled = false;
}

// Get shipment data from Firebase (priority for cross-device tracking)
async function getShipmentData(trackingCode) {
    console.log('Loading shipment data for:', trackingCode);
    
    // Try Firebase first
    try {
        const snapshot = await shipmentsRef.once('value');
        if (snapshot.exists()) {
            const firebaseShipments = snapshot.val();
            console.log('Shipments loaded from Firebase:', Object.keys(firebaseShipments));
            if (firebaseShipments[trackingCode]) {
                return firebaseShipments[trackingCode];
            }
        }
    } catch (e) {
        console.error('Error loading from Firebase:', e);
    }
    
    // Fallback to localStorage
    try {
        const localShipments = JSON.parse(localStorage.getItem('sfExpressShipments')) || {};
        if (localShipments[trackingCode]) {
            console.log('Shipment loaded from localStorage');
            return localShipments[trackingCode];
        }
    } catch (e) {
        console.error('Error loading from localStorage:', e);
    }
    
    console.log('Shipment not found');
    return null;
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

// Chat functions
function toggleChatWidget() {
    const popup = document.getElementById('chatWidgetPopup');
    const icon = document.getElementById('chatWidgetIcon');
    
    if (popup.style.display === 'none') {
        popup.style.display = 'flex';
        icon.textContent = '×';
    } else {
        popup.style.display = 'none';
        icon.textContent = '💬';
    }
}

function loadChatMessages(trackingCode) {
    // Remove existing listener if any
    if (chatListener) {
        chatsRef.child(trackingCode).off('value', chatListener);
    }
    
    // Listen for chat messages
    chatListener = chatsRef.child(trackingCode).on('value', (snapshot) => {
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.innerHTML = '';
        
        if (snapshot.exists()) {
            const messages = snapshot.val();
            Object.values(messages).forEach(msg => {
                const messageDiv = document.createElement('div');
                messageDiv.className = `chat-message ${msg.sender === 'customer' ? 'customer' : 'admin'}`;
                messageDiv.innerHTML = `
                    <div class="message-content">
                        <p>${msg.message}</p>
                        <span class="message-time">${msg.timestamp}</span>
                    </div>
                `;
                chatMessages.appendChild(messageDiv);
            });
        }
        
        // Add welcome message if no messages
        if (!snapshot.exists()) {
            const welcomeDiv = document.createElement('div');
            welcomeDiv.className = 'chat-message system';
            welcomeDiv.innerHTML = `
                <div class="message-content">
                    <p>Welcome to SF Express Customer Care. How can we help you today?</p>
                </div>
            `;
            chatMessages.appendChild(welcomeDiv);
        }
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });
}

function sendChatMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (!message || !currentTrackingCode) {
        return;
    }
    
    const newMessage = {
        message: message,
        sender: 'customer',
        timestamp: new Date().toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    };
    
    chatsRef.child(currentTrackingCode).push(newMessage);
    chatInput.value = '';
}

// Handle Enter key for chat
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }
});

// Barcode Scanner Functions
let html5QrcodeScanner = null;

function startBarcodeScanner() {
    const modal = document.getElementById('barcodeScannerModal');
    modal.style.display = 'block';
    
    if (html5QrcodeScanner) {
        html5QrcodeScanner.start(
            { facingMode: "environment" },
            {
                fps: 10,
                qrbox: { width: 250, height: 250 }
            },
            onBarcodeScanned,
            onScanFailure
        );
    } else {
        html5QrcodeScanner = new Html5Qrcode("reader");
        html5QrcodeScanner.start(
            { facingMode: "environment" },
            {
                fps: 10,
                qrbox: { width: 250, height: 250 }
            },
            onBarcodeScanned,
            onScanFailure
        );
    }
}

function onBarcodeScanned(decodedText, decodedResult) {
    // Stop scanning
    if (html5QrcodeScanner) {
        html5QrcodeScanner.stop();
    }
    
    // Close modal
    const modal = document.getElementById('barcodeScannerModal');
    modal.style.display = 'none';
    
    // Extract tracking code from URL if it's a full URL
    let trackingCode = decodedText;
    if (decodedText.includes('?code=')) {
        const urlParams = new URLSearchParams(decodedText.split('?')[1]);
        trackingCode = urlParams.get('code');
    }
    
    // Set tracking code and track
    document.getElementById('trackingCode').value = trackingCode;
    trackShipment();
}

function onScanFailure(error) {
    // Handle scan failure silently
}

function closeBarcodeScanner() {
    const modal = document.getElementById('barcodeScannerModal');
    modal.style.display = 'none';
    
    if (html5QrcodeScanner) {
        html5QrcodeScanner.stop();
    }
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

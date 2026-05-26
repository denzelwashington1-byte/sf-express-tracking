// Admin Panel JavaScript - Netlify Compatible Version
let adminMap;
let trackingData;
let editMode = false;
let currentUser = null;
let currentShipmentId = null;

// Activity Log and Notifications
let activityLog = JSON.parse(localStorage.getItem('sfExpressActivityLog')) || [];
let notifications = JSON.parse(localStorage.getItem('sfExpressNotifications')) || [];

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

// Initialize admin panel
document.addEventListener('DOMContentLoaded', async function() {
    initializeUserSystem();
    loadTrackingData();
    setupEventListeners();
    await loadShipmentList();
    loadCustomerList();
    await populateShipmentSelector();
    
    // Request notification permission
    if (Notification.permission === 'default') {
        Notification.requestPermission();
    }
});

// User Management System
function initializeUserSystem() {
    // Check if users exist in localStorage
    let users = JSON.parse(localStorage.getItem('sfExpressUsers')) || [];
    
    // No default admin - users must be created through signup
}

function getUsers() {
    return JSON.parse(localStorage.getItem('sfExpressUsers')) || [];
}

function saveUsers(users) {
    localStorage.setItem('sfExpressUsers', JSON.stringify(users));
}

function findUserByUsername(username) {
    const users = getUsers();
    return users.find(user => user.username.toLowerCase() === username.toLowerCase());
}

function findUserByEmail(email) {
    const users = getUsers();
    return users.find(user => user.email.toLowerCase() === email.toLowerCase());
}

function createUser(email, username, password) {
    const users = getUsers();
    
    // Check if username already exists
    if (findUserByUsername(username)) {
        return { success: false, message: 'Username already exists' };
    }
    
    // Check if email already exists
    if (findUserByEmail(email)) {
        return { success: false, message: 'Email already exists' };
    }
    
    const newUser = {
        id: Date.now(),
        email: email,
        username: username,
        password: password,
        role: 'admin',
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    saveUsers(users);
    
    return { success: true, message: 'Account created successfully' };
}

function authenticateUser(username, password) {
    const user = findUserByUsername(username);
    
    if (!user) {
        return { success: false, message: 'Invalid username or password' };
    }
    
    if (user.password !== password) {
        return { success: false, message: 'Invalid username or password' };
    }
    
    return { success: true, user: user };
}

function deleteUser(userId) {
    const users = getUsers();
    const filteredUsers = users.filter(user => user.id !== userId);
    
    if (filteredUsers.length === users.length) {
        return { success: false, message: 'User not found' };
    }
    
    saveUsers(filteredUsers);
    return { success: true, message: 'User deleted successfully' };
}

// Load tracking data from JSON file
async function loadTrackingData() {
    try {
        const response = await fetch('tracking-data.json');
        const data = await response.json();
        trackingData = data['SF2026UKTHAI'];
    } catch (e) {
        console.error('Error loading tracking data:', e);
        // Fallback to default data
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
    const loginForm = document.getElementById('loginForm');
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
    
    // Signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) signupForm.addEventListener('submit', handleSignup);
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
    
    // Save button
    const saveAllBtn = document.getElementById('saveAllBtn');
    if (saveAllBtn) saveAllBtn.addEventListener('click', saveToLocalStorage);
    
    // Generate JSON button
    const generateJsonBtn = document.getElementById('generateJsonBtn');
    if (generateJsonBtn) generateJsonBtn.addEventListener('click', generateJsonFile);
}

// Toggle between login and signup forms
function showSignupForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
}

function showLoginForm() {
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    const result = authenticateUser(username, password);
    
    if (result.success) {
        currentUser = result.user;
        showDashboard();
        showNotification(`Welcome back, ${currentUser.username}!`, 'success');
    } else {
        showNotification(result.message, 'error');
    }
}

// Handle signup
function handleSignup(e) {
    e.preventDefault();
    
    const email = document.getElementById('signupEmail').value;
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    // Password validation
    if (password.length < 6) {
        showNotification('Password must be at least 6 characters', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Invalid email format', 'error');
        return;
    }
    
    // Create user
    const result = createUser(email, username, password);
    
    if (result.success) {
        showNotification(result.message, 'success');
        document.getElementById('signupForm').reset();
        showLoginForm();
    } else {
        showNotification(result.message, 'error');
    }
}

// Show dashboard
function showDashboard() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'block';
    
    // Display current user
    document.getElementById('currentUserDisplay').textContent = currentUser.username;
    
    populateFormFields();
    initializeAdminMap();
    populateRouteList();
    populateTimelineList();
    populatePackageContents();
    loadUserList();
}

// Handle logout
function handleLogout() {
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
    
    // Clear forms
    document.getElementById('loginForm').reset();
    document.getElementById('signupForm').reset();
    
    // Clear current user
    currentUser = null;
    
    showNotification('Logged out successfully', 'info');
}

// User Management Functions
function loadUserList() {
    const users = getUsers();
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
    
    if (users.length === 0) {
        userList.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No users found</p>';
        return;
    }
    
    users.forEach(user => {
        const userItem = document.createElement('div');
        userItem.className = 'user-item';
        userItem.innerHTML = `
            <div class="user-info">
                <h4>${user.username}</h4>
                <p>Email: ${user.email}</p>
                <p>Created: ${new Date(user.createdAt).toLocaleDateString()}</p>
                <span class="user-role">${user.role}</span>
            </div>
            <div class="user-actions">
                ${user.id !== currentUser.id ? `
                    <button class="btn-delete-user" onclick="deleteUserById(${user.id})">Delete</button>
                ` : `
                    <span style="color: var(--text-secondary); font-size: 0.875rem;">Current User</span>
                `}
            </div>
        `;
        userList.appendChild(userItem);
    });
}

function showAddUserModal() {
    const email = prompt('Enter email:');
    if (!email) return;
    
    const username = prompt('Enter username:');
    if (!username) return;
    
    const password = prompt('Enter password (min 6 characters):');
    if (!password) return;
    
    const confirmPassword = prompt('Confirm password:');
    if (!confirmPassword) return;
    
    // Password validation
    if (password.length < 6) {
        showNotification('Password must be at least 6 characters', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Invalid email format', 'error');
        return;
    }
    
    // Create user
    const result = createUser(email, username, password);
    
    if (result.success) {
        showNotification(result.message, 'success');
        loadUserList();
    } else {
        showNotification(result.message, 'error');
    }
}

function deleteUserById(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        const result = deleteUser(userId);
        if (result.success) {
            showNotification(result.message, 'success');
            loadUserList();
        } else {
            showNotification(result.message, 'error');
        }
    }
}

// Shipment Management Functions
function generateTrackingCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'SF';
    for (let i = 0; i < 10; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

function getShipments() {
    return new Promise((resolve) => {
        // Try localStorage first for reliability
        const localData = localStorage.getItem('sfExpressShipments');
        if (localData) {
            try {
                const parsedData = JSON.parse(localData);
                console.log('Shipments loaded from localStorage:', Object.keys(parsedData));
                resolve(parsedData);
                return;
            } catch (e) {
                console.error('Error parsing localStorage data:', e);
            }
        }
        
        // Fallback to Firebase
        shipmentsRef.once('value', (snapshot) => {
            if (snapshot.exists()) {
                const firebaseData = snapshot.val();
                console.log('Shipments loaded from Firebase:', Object.keys(firebaseData));
                // Also save to localStorage for backup
                localStorage.setItem('sfExpressShipments', JSON.stringify(firebaseData));
                resolve(firebaseData);
            } else {
                console.log('No shipments found in Firebase or localStorage');
                resolve({});
            }
        }, (error) => {
            console.error('Firebase error:', error);
            resolve({});
        });
    });
}

function saveShipments(shipments) {
    console.log('Saving shipments...');
    console.log('Firebase initialized:', !!firebase);
    console.log('Database reference:', !!db);
    console.log('Shipments reference:', !!shipmentsRef);
    
    // Save to Firebase first for cross-device tracking
    shipmentsRef.set(shipments)
        .then(() => {
            console.log('Shipments saved to Firebase successfully:', Object.keys(shipments));
            // Also save to localStorage as backup
            localStorage.setItem('sfExpressShipments', JSON.stringify(shipments));
            console.log('Shipments also saved to localStorage as backup');
        })
        .catch((error) => {
            console.error('Firebase save error (using localStorage as fallback):', error);
            console.error('Error code:', error.code);
            console.error('Error message:', error.message);
            // Fallback to localStorage only if Firebase fails
            localStorage.setItem('sfExpressShipments', JSON.stringify(shipments));
            console.log('Shipments saved to localStorage as fallback');
        });
}

async function createShipment(senderName, senderAddress, senderPhone, senderEmail, receiverName, receiverAddress, receiverPhone, receiverEmail, packageContents, weight, currentCity, currentLat, currentLng, privateCode) {
    const shipments = await getShipments();
    
    // Check shipment limit (max 100)
    const shipmentCount = Object.keys(shipments).length;
    if (shipmentCount >= 100) {
        return { success: false, message: 'Maximum shipment limit (100) reached' };
    }
    
    const trackingCode = generateTrackingCode();
    const shipmentId = Date.now();
    
    const newShipment = {
        id: shipmentId,
        trackingCode: trackingCode,
        sender: {
            name: senderName,
            address: senderAddress,
            phone: senderPhone,
            email: senderEmail
        },
        receiver: {
            name: receiverName,
            address: receiverAddress,
            phone: receiverPhone,
            email: receiverEmail
        },
        packageDetails: {
            contents: packageContents,
            weight: weight
        },
        currentLocation: {
            city: currentCity,
            lat: currentLat,
            lng: currentLng
        },
        currentStatus: 'Pending',
        privateCode: privateCode,
        trackingUrl: `${window.location.origin}/track.html?code=${trackingCode}`,
        createdAt: new Date().toISOString(),
        lastUpdate: new Date().toLocaleString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        }),
        estimatedDelivery: '3-5 business days',
        timeline: [
            {
                status: 'Shipment Created',
                description: 'Shipment created and awaiting pickup',
                date: new Date().toLocaleString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric', 
                    hour: '2-digit', 
                    minute: '2-digit' 
                }),
                location: currentCity,
                completed: true,
                active: true
            }
        ]
    };
    
    shipments[trackingCode] = newShipment;
    saveShipments(shipments);
    
    // Log activity and add notification
    logActivity('Shipment Created', `Tracking code: ${trackingCode}, From: ${senderName} to ${receiverName}`);
    addNotification(`New shipment created: ${trackingCode}`, 'success', `From: ${senderName} to ${receiverName}`);
    
    return { success: true, shipment: newShipment };
}

async function loadShipmentList() {
    console.log('Loading shipment list...');
    const shipments = await getShipments();
    console.log('Shipments loaded:', Object.keys(shipments));
    const shipmentList = document.getElementById('shipmentList');
    shipmentList.innerHTML = '';
    
    const shipmentCodes = Object.keys(shipments);
    
    if (shipmentCodes.length === 0) {
        shipmentList.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No shipments found</p>';
        updateDashboardAnalytics();
        return;
    }
    
    shipmentCodes.forEach(code => {
        const shipment = shipments[code];
        const shipmentItem = document.createElement('div');
        shipmentItem.className = 'shipment-item';
        shipmentItem.setAttribute('data-tracking-code', shipment.trackingCode);
        shipmentItem.setAttribute('data-sender', shipment.sender.name.toLowerCase());
        shipmentItem.setAttribute('data-receiver', shipment.receiver.name.toLowerCase());
        shipmentItem.setAttribute('data-status', shipment.currentStatus.toLowerCase());
        shipmentItem.innerHTML = `
            <div class="shipment-info">
                <h4>${shipment.trackingCode}</h4>
                <p>From: ${shipment.sender.name}</p>
                <p>To: ${shipment.receiver.name}</p>
                <p>Status: ${shipment.currentStatus}</p>
                <p>Created: ${new Date(shipment.id).toLocaleDateString()}</p>
                <span class="tracking-code">${shipment.trackingCode}</span>
                <a href="${shipment.trackingUrl}" target="_blank" class="tracking-link">Track Shipment</a>
            </div>
            <div class="shipment-actions">
                <button class="btn-edit-shipment" onclick="editShipment('${shipment.trackingCode}')">Edit</button>
                <button class="btn-delete-shipment" onclick="deleteShipment('${shipment.trackingCode}')">Delete</button>
                <button class="btn-copy-link" onclick="copyTrackingLink('${shipment.trackingUrl}')">Copy Link</button>
                <button class="btn-qr-code" onclick="generateQRCode('${shipment.trackingCode}')">QR Code</button>
                <button class="btn-pdf" onclick="exportToPDF('${shipment.trackingCode}')">PDF</button>
                <button class="btn-email" onclick="sendEmailNotification('${shipment.trackingCode}')">Email</button>
                <button class="btn-sms" onclick="sendSMSNotification('${shipment.trackingCode}')">SMS</button>
                <button class="btn-confirm-delivery" onclick="confirmDelivery('${shipment.trackingCode}')">Confirm Delivery</button>
                ${shipment.currentStatus === 'On Hold'
                    ? `<button class="btn-release-shipment" onclick="releaseShipment('${shipment.trackingCode}')">Release</button>`
                    : `<button class="btn-hold-shipment" onclick="holdShipment('${shipment.trackingCode}')">Hold</button>`
                }
            </div>
        `;
        shipmentList.appendChild(shipmentItem);
    });
    
    updateDashboardAnalytics();
    populateShipmentSelector();
}

async function updateDashboardAnalytics() {
    const shipments = await getShipments();
    const shipmentCodes = Object.keys(shipments);
    
    let total = shipmentCodes.length;
    let inTransit = 0;
    let delivered = 0;
    let onHold = 0;
    
    shipmentCodes.forEach(code => {
        const status = shipments[code].currentStatus.toLowerCase();
        if (status === 'in transit' || status === 'processing') {
            inTransit++;
        } else if (status === 'delivered') {
            delivered++;
        } else if (status === 'on hold') {
            onHold++;
        }
    });
    
    document.getElementById('totalShipments').textContent = total;
    document.getElementById('inTransitShipments').textContent = inTransit;
    document.getElementById('deliveredShipments').textContent = delivered;
    document.getElementById('onHoldShipments').textContent = onHold;
}

async function populateShipmentSelector() {
    const shipments = await getShipments();
    const shipmentCodes = Object.keys(shipments);
    
    // Populate selector for Timeline, Package, Contact, Status, and Location editors
    const selectors = ['timelineShipmentSelector', 'packageShipmentSelector', 'contactShipmentSelector', 'statusShipmentSelector', 'locationShipmentSelector'];
    
    selectors.forEach(selectorId => {
        const selector = document.getElementById(selectorId);
        if (!selector) return;
        
        selector.innerHTML = '<option value="">Select a shipment...</option>';
        shipmentCodes.forEach(code => {
            const shipment = shipments[code];
            const option = document.createElement('option');
            option.value = code;
            option.textContent = `${code} - ${shipment.sender.name} to ${shipment.receiver.name}`;
            selector.appendChild(option);
        });
    });
}

async function selectShipmentForStatus() {
    const selector = document.getElementById('statusShipmentSelector');
    const trackingCode = selector.value;
    
    if (!trackingCode) {
        showNotification('Please select a shipment', 'error');
        return;
    }
    
    const shipments = await getShipments();
    const shipment = shipments[trackingCode];
    
    if (!shipment) {
        showNotification('Shipment not found', 'error');
        return;
    }
    
    currentShipmentId = trackingCode;
    trackingData = shipment;
    
    document.getElementById('editTrackingNumber').value = shipment.trackingNumber;
    document.getElementById('editCurrentStatus').value = shipment.currentStatus;
    document.getElementById('editLastUpdate').value = shipment.lastUpdate;
    document.getElementById('editEstimatedDelivery').value = shipment.estimatedDelivery;
    
    showNotification(`Editing shipment: ${trackingCode}`, 'success');
}

async function saveStatusChanges() {
    if (!currentShipmentId) {
        showNotification('No shipment selected', 'error');
        return;
    }
    
    const shipments = await getShipments();
    const shipment = shipments[currentShipmentId];
    
    if (!shipment) {
        showNotification('Shipment not found', 'error');
        return;
    }
    
    shipment.trackingNumber = document.getElementById('editTrackingNumber').value;
    shipment.currentStatus = document.getElementById('editCurrentStatus').value;
    shipment.lastUpdate = document.getElementById('editLastUpdate').value;
    shipment.estimatedDelivery = document.getElementById('editEstimatedDelivery').value;
    
    saveShipments(shipments);
    showNotification('Status changes saved successfully', 'success');
    loadShipmentList();
}

async function selectShipmentForEditor(editorType) {
    const selectorId = `${editorType}ShipmentSelector`;
    const selector = document.getElementById(selectorId);
    const trackingCode = selector.value;
    
    if (!trackingCode) {
        showNotification('Please select a shipment', 'error');
        return;
    }
    
    const shipments = await getShipments();
    const shipment = shipments[trackingCode];
    
    if (!shipment) {
        showNotification('Shipment not found', 'error');
        return;
    }
    
    currentShipmentId = trackingCode;
    trackingData = shipment;
    
    if (editorType === 'location') {
        initializeAdminMap();
        populateRouteList();
    } else {
        populateFormFields();
        initializeAdminMap();
        populateRouteList();
        populateTimelineList();
        populatePackageContents();
    }
    
    showNotification(`Editing shipment: ${trackingCode}`, 'success');
}

async function saveEditorChanges(editorType) {
    if (!currentShipmentId) {
        showNotification('No shipment selected', 'error');
        return;
    }
    
    const shipments = await getShipments();
    const shipment = shipments[currentShipmentId];
    
    if (!shipment) {
        showNotification('Shipment not found', 'error');
        return;
    }
    
    if (editorType === 'location') {
        // Save route changes from the route list
        const routeItems = document.querySelectorAll('.route-item');
        const newRoute = [];
        
        routeItems.forEach(item => {
            const latInput = item.querySelector('.route-lat');
            const lngInput = item.querySelector('.route-lng');
            const cityInput = item.querySelector('.route-city');
            const countryInput = item.querySelector('.route-country');
            const statusInput = item.querySelector('.route-status');
            
            if (!latInput || !lngInput || !cityInput || !countryInput || !statusInput) {
                console.error('Missing route input elements');
                return;
            }
            
            const lat = parseFloat(latInput.value);
            const lng = parseFloat(lngInput.value);
            const city = cityInput.value;
            const country = countryInput.value;
            const status = statusInput.value;
            
            newRoute.push({ lat, lng, city, country, status });
        });
        
        shipment.route = newRoute;
        
        // Update current location to the last route point
        if (newRoute.length > 0) {
            const lastPoint = newRoute[newRoute.length - 1];
            shipment.currentLocation = {
                lat: lastPoint.lat,
                lng: lastPoint.lng,
                city: lastPoint.city,
                country: lastPoint.country
            };
        }
    } else {
        // Update shipment with current form data
        shipment.trackingNumber = document.getElementById('editTrackingNumber').value;
        shipment.currentStatus = document.getElementById('editCurrentStatus').value;
        shipment.lastUpdate = document.getElementById('editLastUpdate').value;
        shipment.estimatedDelivery = document.getElementById('editEstimatedDelivery').value;
        
        shipment.packageDetails.weight = document.getElementById('editTotalWeight').value;
        shipment.packageDetails.serviceType = document.getElementById('editServiceType').value;
        shipment.packageDetails.departure = document.getElementById('editDeparture').value;
        shipment.packageDetails.destination = document.getElementById('editDestination').value;
        
        shipment.sender.name = document.getElementById('editSenderName').value;
        shipment.sender.address = document.getElementById('editSenderAddress').value;
        shipment.receiver.name = document.getElementById('editReceiverName').value;
        shipment.receiver.address = document.getElementById('editReceiverAddress').value;
    }
    
    saveShipments(shipments);
    showNotification('Changes saved successfully', 'success');
    loadShipmentList();
}

function filterShipments() {
    const searchTerm = document.getElementById('shipmentSearch').value.toLowerCase();
    const shipmentItems = document.querySelectorAll('.shipment-item');
    
    shipmentItems.forEach(item => {
        const trackingCode = item.getAttribute('data-tracking-code').toLowerCase();
        const sender = item.getAttribute('data-sender');
        const receiver = item.getAttribute('data-receiver');
        const status = item.getAttribute('data-status');
        
        const matches = trackingCode.includes(searchTerm) || 
                       sender.includes(searchTerm) || 
                       receiver.includes(searchTerm) || 
                       status.includes(searchTerm);
        
        item.style.display = matches ? 'block' : 'none';
    });
}

async function exportShipments() {
    const shipments = await getShipments();
    const shipmentCodes = Object.keys(shipments);
    
    if (shipmentCodes.length === 0) {
        showNotification('No shipments to export', 'error');
        return;
    }
    
    const exportData = shipmentCodes.map(code => ({
        trackingCode: shipments[code].trackingCode,
        sender: shipments[code].sender.name,
        receiver: shipments[code].receiver.name,
        status: shipments[code].currentStatus,
        created: new Date(shipments[code].id).toLocaleDateString(),
        trackingUrl: shipments[code].trackingUrl
    }));
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `shipments-export-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    showNotification('Shipments exported successfully', 'success');
}

async function exportToPDF(trackingCode) {
    const shipments = await getShipments();
    const shipment = shipments[trackingCode];
    
    if (!shipment) {
        showNotification('Shipment not found', 'error');
        return;
    }
    
    // Create a printable HTML content
    const printContent = `
        <html>
        <head>
            <title>Shipment Report - ${shipment.trackingCode}</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h1 { color: #0074d9; }
                .section { margin-bottom: 20px; }
                .label { font-weight: bold; }
            </style>
        </head>
        <body>
            <h1>Shipment Report</h1>
            <div class="section">
                <p><span class="label">Tracking Code:</span> ${shipment.trackingCode}</p>
                <p><span class="label">Status:</span> ${shipment.currentStatus}</p>
                <p><span class="label">Last Update:</span> ${shipment.lastUpdate}</p>
                <p><span class="label">Estimated Delivery:</span> ${shipment.estimatedDelivery}</p>
            </div>
            <div class="section">
                <h2>Sender Information</h2>
                <p><span class="label">Name:</span> ${shipment.sender.name}</p>
                <p><span class="label">Address:</span> ${shipment.sender.address}</p>
            </div>
            <div class="section">
                <h2>Receiver Information</h2>
                <p><span class="label">Name:</span> ${shipment.receiver.name}</p>
                <p><span class="label">Address:</span> ${shipment.receiver.address}</p>
            </div>
            <div class="section">
                <h2>Package Details</h2>
                <p><span class="label">Weight:</span> ${shipment.packageDetails.weight}</p>
                <p><span class="label">Service Type:</span> ${shipment.packageDetails.serviceType}</p>
                <p><span class="label">Contents:</span> ${Array.isArray(shipment.packageDetails.contents) ? shipment.packageDetails.contents.join(', ') : shipment.packageDetails.contents}</p>
            </div>
            <div class="section">
                <h2>Tracking URL</h2>
                <p><a href="${shipment.trackingUrl}">${shipment.trackingUrl}</a></p>
            </div>
        </body>
        </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
    
    showNotification('PDF report generated', 'success');
}

async function sendEmailNotification(trackingCode) {
    const shipments = await getShipments();
    const shipment = shipments[trackingCode];
    
    if (!shipment) {
        showNotification('Shipment not found', 'error');
        return;
    }
    
    const subject = encodeURIComponent(`Shipment Update: ${shipment.trackingCode} - ${shipment.currentStatus}`);
    const body = encodeURIComponent(
        `Dear Customer,\n\n` +
        `Your shipment ${shipment.trackingCode} status has been updated.\n\n` +
        `Current Status: ${shipment.currentStatus}\n` +
        `Last Update: ${shipment.lastUpdate}\n` +
        `Estimated Delivery: ${shipment.estimatedDelivery}\n\n` +
        `Track your shipment: ${shipment.trackingUrl}\n\n` +
        `Thank you for choosing SF Express International.\n\n` +
        `SF Express International Delivery`
    );
    
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    showNotification('Email client opened with tracking update', 'success');
}

async function sendSMSNotification(trackingCode) {
    const shipments = await getShipments();
    const shipment = shipments[trackingCode];
    
    if (!shipment) {
        showNotification('Shipment not found', 'error');
        return;
    }
    
    const message = encodeURIComponent(
        `SF Express: Shipment ${shipment.trackingCode} is ${shipment.currentStatus}. Track: ${shipment.trackingUrl}`
    );
    
    window.open(`sms:?body=${message}`, '_blank');
    showNotification('SMS app opened with tracking update', 'success');
}

async function confirmDelivery(trackingCode) {
    const shipments = await getShipments();
    const shipment = shipments[trackingCode];
    
    if (!shipment) {
        showNotification('Shipment not found', 'error');
        return;
    }
    
    const confirmationMethod = prompt('Select confirmation method:\n1. Digital Signature\n2. Photo Proof\n3. No Proof Required\n\nEnter number (1-3):');
    
    if (!confirmationMethod) return;
    
    let confirmationDetails = '';
    
    switch(confirmationMethod) {
        case '1':
            const signerName = prompt('Enter signer name:');
            if (!signerName) return;
            confirmationDetails = `Digital signature by: ${signerName}`;
            break;
        case '2':
            const photoNote = prompt('Enter photo proof note:');
            if (!photoNote) return;
            confirmationDetails = `Photo proof: ${photoNote}`;
            break;
        case '3':
            confirmationDetails = 'No proof required - delivered without confirmation';
            break;
        default:
            showNotification('Invalid selection', 'error');
            return;
    }
    
    // Update shipment status to Delivered
    shipment.currentStatus = 'Delivered';
    shipment.lastUpdate = new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    // Add delivery confirmation to timeline
    shipment.timeline.unshift({
        status: 'Delivered',
        description: `Package delivered successfully. ${confirmationDetails}`,
        date: new Date().toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }),
        location: shipment.currentLocation.city,
        completed: true,
        active: true,
        confirmation: confirmationDetails
    });
    
    saveShipments(shipments);
    loadShipmentList();
    showNotification(`Shipment ${trackingCode} confirmed as delivered`, 'success');
}

function convertWeight() {
    const weightValue = parseFloat(document.getElementById('weightValue').value);
    const fromUnit = document.getElementById('weightFrom').value;
    const toUnit = document.getElementById('weightTo').value;
    
    if (!weightValue || isNaN(weightValue)) {
        showNotification('Please enter a valid weight value', 'error');
        return;
    }
    
    // Convert to kg first
    const toKg = {
        'kg': 1,
        'lb': 0.453592,
        'oz': 0.0283495,
        'g': 0.001
    };
    
    const fromKg = {
        'kg': 1,
        'lb': 2.20462,
        'oz': 35.274,
        'g': 1000
    };
    
    const weightInKg = weightValue * toKg[fromUnit];
    const result = weightInKg * fromKg[toUnit];
    
    document.getElementById('weightResult').textContent = 
        `${weightValue} ${fromUnit} = ${result.toFixed(4)} ${toUnit}`;
}

async function holdShipment(trackingCode) {
    const shipments = await getShipments();
    const shipment = shipments[trackingCode];
    
    if (!shipment) {
        showNotification('Shipment not found', 'error');
        return;
    }
    
    const reason = prompt('Enter reason for hold (e.g., "Waiting for clearance"):');
    if (!reason) return;
    
    shipment.currentStatus = 'On Hold';
    shipment.lastUpdate = new Date().toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    // Add timeline event
    shipment.timeline.unshift({
        status: 'Shipment On Hold',
        description: reason,
        date: new Date().toLocaleString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        }),
        location: shipment.currentLocation.city,
        completed: true,
        active: true
    });
    
    saveShipments(shipments);
    loadShipmentList();
    showNotification(`Shipment ${trackingCode} placed on hold`, 'success');
}

async function releaseShipment(trackingCode) {
    const shipments = await getShipments();
    const shipment = shipments[trackingCode];
    
    if (!shipment) {
        showNotification('Shipment not found', 'error');
        return;
    }
    
    shipment.currentStatus = 'In Transit';
    shipment.lastUpdate = new Date().toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    // Add timeline event
    shipment.timeline.unshift({
        status: 'Shipment Released',
        description: 'Shipment released from hold and continuing transit',
        date: new Date().toLocaleString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        }),
        location: shipment.currentLocation.city,
        completed: true,
        active: true
    });
    
    saveShipments(shipments);
    loadShipmentList();
    showNotification(`Shipment ${trackingCode} released from hold`, 'success');
}

async function generateQRCode(trackingCode) {
    const shipments = await getShipments();
    const shipment = shipments[trackingCode];
    
    if (!shipment) {
        showNotification('Shipment not found', 'error');
        return;
    }
    
    // Use a QR code API to generate the QR code
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shipment.trackingUrl)}`;
    
    // Open in new window
    window.open(qrCodeUrl, '_blank');
    showNotification('QR Code generated', 'success');
}

async function showBulkOperations() {
    const action = prompt('Select bulk operation:\n1. Delete All\n2. Hold All\n3. Release All\n4. Export All\n\nEnter number (1-4):');
    
    if (!action) return;
    
    const shipments = await getShipments();
    const shipmentCodes = Object.keys(shipments);
    
    if (shipmentCodes.length === 0) {
        showNotification('No shipments to operate on', 'error');
        return;
    }
    
    switch(action) {
        case '1':
            if (confirm(`Are you sure you want to delete all ${shipmentCodes.length} shipments?`)) {
                localStorage.removeItem('sfExpressShipments');
                showNotification('All shipments deleted', 'success');
                loadShipmentList();
            }
            break;
        case '2':
            shipmentCodes.forEach(code => {
                shipments[code].currentStatus = 'On Hold';
                shipments[code].lastUpdate = new Date().toLocaleString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric', 
                    hour: '2-digit', 
                    minute: '2-digit' 
                });
            });
            saveShipments(shipments);
            showNotification('All shipments placed on hold', 'success');
            loadShipmentList();
            break;
        case '3':
            shipmentCodes.forEach(code => {
                shipments[code].currentStatus = 'In Transit';
                shipments[code].lastUpdate = new Date().toLocaleString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric', 
                    hour: '2-digit', 
                    minute: '2-digit' 
                });
            });
            saveShipments(shipments);
            showNotification('All shipments released from hold', 'success');
            loadShipmentList();
            break;
        case '4':
            exportShipments();
            break;
        default:
            showNotification('Invalid selection', 'error');
    }
}

function showTemplateModal() {
    const templates = JSON.parse(localStorage.getItem('sfExpressTemplates')) || [];
    
    if (templates.length === 0) {
        showNotification('No templates saved. Create a shipment to save as template.', 'info');
        return;
    }
    
    let templateList = 'Saved Templates:\n';
    templates.forEach((template, index) => {
        templateList += `${index + 1}. ${template.name} - ${template.senderName} to ${template.receiverName}\n`;
    });
    
    const selection = prompt(templateList + '\nEnter template number to use, or "cancel" to exit:');
    
    if (!selection || selection.toLowerCase() === 'cancel') return;
    
    const templateIndex = parseInt(selection) - 1;
    
    if (templateIndex < 0 || templateIndex >= templates.length) {
        showNotification('Invalid template selection', 'error');
        return;
    }
    
    const template = templates[templateIndex];
    
    // Create shipment from template
    const result = createShipment(
        template.senderName,
        template.senderAddress,
        template.receiverName,
        template.receiverAddress,
        template.packageContents,
        template.weight,
        template.currentCity,
        template.currentLat,
        template.currentLng
    );
    
    if (result.success) {
        showNotification(`Shipment created from template! Tracking Code: ${result.shipment.trackingCode}`, 'success');
        loadShipmentList();
    }
}

async function saveAsTemplate(trackingCode) {
    const shipments = await getShipments();
    const shipment = shipments[trackingCode];
    
    if (!shipment) {
        showNotification('Shipment not found', 'error');
        return;
    }
    
    const templateName = prompt('Enter template name:');
    if (!templateName) return;
    
    const template = {
        name: templateName,
        senderName: shipment.sender.name,
        senderAddress: shipment.sender.address,
        receiverName: shipment.receiver.name,
        receiverAddress: shipment.receiver.address,
        packageContents: shipment.packageDetails.contents,
        weight: shipment.packageDetails.weight,
        currentCity: shipment.currentLocation.city,
        currentLat: shipment.currentLocation.lat,
        currentLng: shipment.currentLocation.lng
    };
    
    const templates = JSON.parse(localStorage.getItem('sfExpressTemplates')) || [];
    templates.push(template);
    localStorage.setItem('sfExpressTemplates', JSON.stringify(templates));
    
    showNotification('Template saved successfully', 'success');
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    showNotification(isDarkMode ? 'Dark mode enabled' : 'Dark mode disabled', 'info');
}

// Initialize dark mode from localStorage
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Language Support
const translations = {
    en: {
        quickActions: 'Quick Actions',
        createShipment: 'Create Shipment',
        shipmentManagement: 'Shipment Management',
        dashboardAnalytics: 'Dashboard Analytics',
        totalShipments: 'Total Shipments',
        inTransit: 'In Transit',
        delivered: 'Delivered',
        onHold: 'On Hold',
        userManagement: 'User Management',
        customerDatabase: 'Customer Database',
        weightCalculator: 'Weight Calculator',
        timelineManagement: 'Timeline Management',
        packageInformation: 'Package Information',
        contactInformation: 'Contact Information'
    },
    es: {
        quickActions: 'Acciones Rápidas',
        createShipment: 'Crear Envío',
        shipmentManagement: 'Gestión de Envíos',
        dashboardAnalytics: 'Analítica del Panel',
        totalShipments: 'Total de Envíos',
        inTransit: 'En Tránsito',
        delivered: 'Entregado',
        onHold: 'En Espera',
        userManagement: 'Gestión de Usuarios',
        customerDatabase: 'Base de Datos de Clientes',
        weightCalculator: 'Calculadora de Peso',
        timelineManagement: 'Gestión de Cronología',
        packageInformation: 'Información del Paquete',
        contactInformation: 'Información de Contacto'
    },
    fr: {
        quickActions: 'Actions Rapides',
        createShipment: 'Créer Expédition',
        shipmentManagement: 'Gestion des Expéditions',
        dashboardAnalytics: 'Analytique du Tableau de Bord',
        totalShipments: 'Total des Expéditions',
        inTransit: 'En Transit',
        delivered: 'Livré',
        onHold: 'En Attente',
        userManagement: 'Gestion des Utilisateurs',
        customerDatabase: 'Base de Données Clients',
        weightCalculator: 'Calculateur de Poids',
        timelineManagement: 'Gestion de la Chronologie',
        packageInformation: 'Informations sur le Colis',
        contactInformation: 'Informations de Contact'
    },
    de: {
        quickActions: 'Schnellaktionen',
        createShipment: 'Sendung Erstellen',
        shipmentManagement: 'Sendungsverwaltung',
        dashboardAnalytics: 'Dashboard-Analysen',
        totalShipments: 'Gesamtsendungen',
        inTransit: 'Unterwegs',
        delivered: 'Zugestellt',
        onHold: 'Gehalten',
        userManagement: 'Benutzerverwaltung',
        customerDatabase: 'Kundendatenbank',
        weightCalculator: 'Gewichtsrechner',
        timelineManagement: 'Zeitstrahl-Verwaltung',
        packageInformation: 'Paketinformationen',
        contactInformation: 'Kontaktinformationen'
    },
    zh: {
        quickActions: '快速操作',
        createShipment: '创建货运',
        shipmentManagement: '货运管理',
        dashboardAnalytics: '仪表板分析',
        totalShipments: '总货运量',
        inTransit: '运输中',
        delivered: '已送达',
        onHold: '暂停',
        userManagement: '用户管理',
        customerDatabase: '客户数据库',
        weightCalculator: '重量计算器',
        timelineManagement: '时间线管理',
        packageInformation: '包裹信息',
        contactInformation: '联系信息'
    },
    ar: {
        quickActions: 'إجراءات سريعة',
        createShipment: 'إنشاء شحنة',
        shipmentManagement: 'إدارة الشحنات',
        dashboardAnalytics: 'تحليلات لوحة التحكم',
        totalShipments: 'إجمالي الشحنات',
        inTransit: 'قيد النقل',
        delivered: 'تم التسليم',
        onHold: 'معلقة',
        userManagement: 'إدارة المستخدمين',
        customerDatabase: 'قاعدة بيانات العملاء',
        weightCalculator: 'حاسبة الوزن',
        timelineManagement: 'إدارة الجدول الزمني',
        packageInformation: 'معلومات الحزمة',
        contactInformation: 'معلومات الاتصال'
    }
};

function changeLanguage() {
    const language = document.getElementById('languageSelect').value;
    localStorage.setItem('selectedLanguage', language);
    applyLanguage(language);
    showNotification(`Language changed to ${language.toUpperCase()}`, 'success');
}

function applyLanguage(language) {
    const lang = translations[language] || translations.en;
    
    // Update section headings
    const headings = document.querySelectorAll('section h2');
    headings.forEach(heading => {
        const text = heading.textContent;
        if (text.includes('Quick Actions')) heading.textContent = lang.quickActions;
        if (text.includes('Shipment Management')) heading.textContent = lang.shipmentManagement;
        if (text.includes('Dashboard Analytics')) heading.textContent = lang.dashboardAnalytics;
        if (text.includes('User Management')) heading.textContent = lang.userManagement;
        if (text.includes('Customer Database')) heading.textContent = lang.customerDatabase;
        if (text.includes('Weight Calculator')) heading.textContent = lang.weightCalculator;
        if (text.includes('Timeline Management')) heading.textContent = lang.timelineManagement;
        if (text.includes('Package Information')) heading.textContent = lang.packageInformation;
        if (text.includes('Contact Information')) heading.textContent = lang.contactInformation;
    });
}

// Initialize language from localStorage
const savedLanguage = localStorage.getItem('selectedLanguage');
if (savedLanguage) {
    document.getElementById('languageSelect').value = savedLanguage;
    applyLanguage(savedLanguage);
}

// Customer Database Functions
function getCustomers() {
    return JSON.parse(localStorage.getItem('sfExpressCustomers')) || [];
}

function saveCustomers(customers) {
    localStorage.setItem('sfExpressCustomers', JSON.stringify(customers));
}

function showAddCustomerModal() {
    console.log('showAddCustomerModal called');
    
    const name = prompt('Enter customer name:');
    if (!name) {
        console.log('No name entered');
        return;
    }
    
    const email = prompt('Enter customer email:');
    if (!email) {
        console.log('No email entered');
        return;
    }
    
    const phone = prompt('Enter customer phone:');
    if (!phone) {
        console.log('No phone entered');
        return;
    }
    
    const address = prompt('Enter customer address:');
    if (!address) {
        console.log('No address entered');
        return;
    }
    
    const customers = getCustomers();
    console.log('Current customers:', customers);
    
    const newCustomer = {
        id: Date.now(),
        name: name,
        email: email,
        phone: phone,
        address: address,
        createdAt: new Date().toISOString()
    };
    
    customers.push(newCustomer);
    saveCustomers(customers);
    
    console.log('Customer saved:', newCustomer);
    showNotification('Customer added successfully', 'success');
    loadCustomerList();
}

function loadCustomerList() {
    const customers = getCustomers();
    const customerList = document.getElementById('customerList');
    customerList.innerHTML = '';
    
    if (customers.length === 0) {
        customerList.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No customers found</p>';
        return;
    }
    
    customers.forEach(customer => {
        const customerItem = document.createElement('div');
        customerItem.className = 'customer-item';
        customerItem.innerHTML = `
            <div class="customer-info">
                <h4>${customer.name}</h4>
                <p>Email: ${customer.email}</p>
                <p>Phone: ${customer.phone}</p>
                <p>Address: ${customer.address}</p>
                <p>Added: ${new Date(customer.createdAt).toLocaleDateString()}</p>
            </div>
            <div class="customer-actions">
                <button class="btn-edit-shipment" onclick="useCustomerForShipment('${customer.id}')">Use for Shipment</button>
                <button class="btn-delete-shipment" onclick="deleteCustomer('${customer.id}')">Delete</button>
            </div>
        `;
        customerList.appendChild(customerItem);
    });
}

function deleteCustomer(customerId) {
    if (confirm('Are you sure you want to delete this customer?')) {
        const customers = getCustomers();
        const filteredCustomers = customers.filter(customer => customer.id != customerId);
        saveCustomers(filteredCustomers);
        showNotification('Customer deleted', 'success');
        loadCustomerList();
    }
}

function useCustomerForShipment(customerId) {
    const customers = getCustomers();
    const customer = customers.find(c => c.id == customerId);
    
    if (!customer) {
        showNotification('Customer not found', 'error');
        return;
    }
    
    // Pre-fill shipment creation with customer data
    showCreateShipmentModal(customer);
}

async function showCreateShipmentModal(customer = null) {
    console.log('showCreateShipmentModal called');
    const senderName = prompt('Enter sender name:', customer ? customer.name : '');
    if (!senderName) return;
    
    const senderAddress = prompt('Enter sender address:', customer ? customer.address : '');
    if (!senderAddress) return;
    
    const senderPhone = prompt('Enter sender phone:');
    if (!senderPhone) return;
    
    const senderEmail = prompt('Enter sender email:');
    if (!senderEmail) return;
    
    const receiverName = prompt('Enter receiver name:');
    if (!receiverName) return;
    
    const receiverAddress = prompt('Enter receiver address:');
    if (!receiverAddress) return;
    
    const receiverPhone = prompt('Enter receiver phone:');
    if (!receiverPhone) return;
    
    const receiverEmail = prompt('Enter receiver email:');
    if (!receiverEmail) return;
    
    const packageContents = prompt('Enter package contents (comma separated):');
    if (!packageContents) return;
    
    const weight = prompt('Enter package weight:');
    if (!weight) return;
    
    const currentCity = prompt('Enter current city/location:');
    if (!currentCity) return;
    
    const currentLat = prompt('Enter current latitude (for map, e.g., 51.5074 for London):');
    if (!currentLat) return;
    
    const currentLng = prompt('Enter current longitude (for map, e.g., -0.1278 for London):');
    if (!currentLng) return;
    
    const privateCode = prompt('Enter private access code (required for tracking):');
    if (!privateCode) return;
    
    console.log('Calling createShipment with data:', { senderName, receiverName });
    const result = await createShipment(
        senderName,
        senderAddress,
        senderPhone,
        senderEmail,
        receiverName,
        receiverAddress,
        receiverPhone,
        receiverEmail,
        packageContents.split(',').map(item => item.trim()),
        weight,
        currentCity,
        currentLat,
        currentLng,
        privateCode
    );
    
    console.log('createShipment result:', result);
    if (result.success) {
        showNotification(`Shipment created! Tracking Code: ${result.shipment.trackingCode}`, 'success');
        console.log('Calling loadShipmentList after creation');
        loadShipmentList();
        populateShipmentSelector();
    } else {
        console.error('Shipment creation failed:', result.message);
        showNotification(result.message || 'Failed to create shipment', 'error');
    }
}

async function editShipment(trackingCode) {
    const shipments = await getShipments();
    const shipment = shipments[trackingCode];
    
    if (!shipment) {
        showNotification('Shipment not found', 'error');
        return;
    }
    
    currentShipmentId = trackingCode;
    trackingData = shipment;
    
    // Log activity
    logActivity('Shipment Edit Started', `Tracking code: ${trackingCode}`);
    
    // Scroll to the Current Tracking Status section
    const statusSection = document.querySelector('.current-status');
    if (statusSection) {
        statusSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Update form fields with shipment data
    const editTrackingNumber = document.getElementById('editTrackingNumber');
    const editCurrentStatus = document.getElementById('editCurrentStatus');
    const editLastUpdate = document.getElementById('editLastUpdate');
    const editEstimatedDelivery = document.getElementById('editEstimatedDelivery');
    
    if (editTrackingNumber) editTrackingNumber.value = shipment.trackingNumber || shipment.trackingCode;
    if (editCurrentStatus) editCurrentStatus.value = shipment.currentStatus;
    if (editLastUpdate) editLastUpdate.value = shipment.lastUpdate;
    if (editEstimatedDelivery) editEstimatedDelivery.value = shipment.estimatedDelivery;
    
    // Package details
    const editTotalWeight = document.getElementById('editTotalWeight');
    const editLuggageWeight = document.getElementById('editLuggageWeight');
    const editBoxWeight = document.getElementById('editBoxWeight');
    const editDocumentsWeight = document.getElementById('editDocumentsWeight');
    const editServiceType = document.getElementById('editServiceType');
    const editDeparture = document.getElementById('editDeparture');
    const editDestination = document.getElementById('editDestination');
    
    if (editTotalWeight) editTotalWeight.value = shipment.packageDetails.weight;
    if (editLuggageWeight) editLuggageWeight.value = shipment.packageDetails.weightBreakdown?.luggage || 'N/A';
    if (editBoxWeight) editBoxWeight.value = shipment.packageDetails.weightBreakdown?.mentalBox || 'N/A';
    if (editDocumentsWeight) editDocumentsWeight.value = shipment.packageDetails.weightBreakdown?.documents || 'N/A';
    if (editServiceType) editServiceType.value = shipment.packageDetails.serviceType;
    if (editDeparture) editDeparture.value = shipment.packageDetails.departure;
    if (editDestination) editDestination.value = shipment.packageDetails.destination;
    
    // Contact information
    const editSenderName = document.getElementById('editSenderName');
    const editSenderAddress = document.getElementById('editSenderAddress');
    const editReceiverName = document.getElementById('editReceiverName');
    const editReceiverAddress = document.getElementById('editReceiverAddress');
    
    if (editSenderName) editSenderName.value = shipment.sender.name;
    if (editSenderAddress) editSenderAddress.value = shipment.sender.address;
    if (editReceiverName) editReceiverName.value = shipment.receiver.name;
    if (editReceiverAddress) editReceiverAddress.value = shipment.receiver.address;
    
    // Also populate the status selector
    const statusSelector = document.getElementById('statusShipmentSelector');
    if (statusSelector) {
        statusSelector.value = trackingCode;
    }
    
    // Also populate the location selector
    const locationSelector = document.getElementById('locationShipmentSelector');
    if (locationSelector) {
        locationSelector.value = trackingCode;
    }
    
    // Initialize map with current location
    if (shipment.currentLocation && shipment.currentLocation.lat && shipment.currentLocation.lng) {
        setTimeout(() => {
            initializeAdminMap();
        }, 100);
    }
    
    populateRouteList();
    populateTimelineList();
    populatePackageContents();
    
    showNotification(`Editing shipment: ${trackingCode}`, 'success');
}

async function deleteShipment(trackingCode) {
    if (confirm('Are you sure you want to delete this shipment?')) {
        const shipments = await getShipments();
        const shipment = shipments[trackingCode];
        delete shipments[trackingCode];
        saveShipments(shipments);
        
        // Log activity and add notification
        logActivity('Shipment Deleted', `Tracking code: ${trackingCode}`);
        addNotification(`Shipment deleted: ${trackingCode}`, 'warning');
        
        showNotification('Shipment deleted', 'success');
        loadShipmentList();
    }
}

function copyTrackingLink(url) {
    // Try modern clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Tracking link copied to clipboard', 'success');
        }).catch(() => {
            // Fallback to older method
            fallbackCopyTextToClipboard(url);
        });
    } else {
        // Fallback for older browsers
        fallbackCopyTextToClipboard(url);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification('Tracking link copied to clipboard', 'success');
    } catch (err) {
        showNotification('Failed to copy link', 'error');
    }
    
    document.body.removeChild(textArea);
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
    if (!trackingData || !trackingData.currentLocation) {
        console.log('No tracking data or current location available');
        return;
    }
    
    if (adminMap) {
        adminMap.remove();
    }
    
    const mapElement = document.getElementById('adminMap');
    if (!mapElement) {
        console.log('Admin map element not found');
        return;
    }
    
    adminMap = L.map('adminMap').setView([trackingData.currentLocation.lat, trackingData.currentLocation.lng], 3);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(adminMap);
    
    updateMapMarkers();
}

// Update map markers
function updateMapMarkers() {
    if (!trackingData || !trackingData.route) {
        console.log('No tracking data or route available for map markers');
        return;
    }
    
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
    if (!trackingData || !trackingData.route) {
        console.log('No tracking data or route available');
        return;
    }
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
    if (!trackingData || !trackingData.route) {
        showNotification('Please select a shipment first', 'error');
        return;
    }
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

function clearTimeline() {
    if (confirm('Are you sure you want to clear all timeline events?')) {
        trackingData.timeline = [];
        populateTimelineList();
        showNotification('Timeline cleared', 'success');
    }
}

function addPackageContent() {
    trackingData.packageDetails.contents.push('New Item');
    populatePackageContents();
    showNotification('Package item added', 'success');
}

// Delete functions
function deleteRoutePoint(index) {
    if (!trackingData || !trackingData.route) {
        showNotification('No route data available', 'error');
        return;
    }
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
    if (!currentShipmentId) {
        showNotification('Please select a shipment first using the shipment selector in Timeline, Package, or Contact editors', 'error');
        return;
    }
    
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
        location.reload();
    }
}

async function exportData() {
    const shipments = await getShipments();
    const dataStr = JSON.stringify(shipments, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sf-tracking-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showNotification('Data exported successfully', 'success');
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    
    input.onchange = function(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const importedData = JSON.parse(e.target.result);
                saveShipments(importedData);
                loadShipmentList();
                populateShipmentSelector();
                showNotification('Data imported successfully', 'success');
            } catch (error) {
                showNotification('Failed to import data. Please check the file format.', 'error');
                console.error('Import error:', error);
            }
        };
        reader.readAsText(file);
    };
    
    input.click();
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

// Save to localStorage
function saveToLocalStorage() {
    collectFormData();
    localStorage.setItem('sfTrackingData', JSON.stringify(trackingData));
    showNotification('Data saved to localStorage', 'success');
}

// Generate JSON file for Netlify deployment
function generateJsonFile() {
    collectFormData();
    
    // Create the complete JSON structure
    const jsonData = {
        "SF2026UKTHAI": trackingData
    };
    
    const dataStr = JSON.stringify(jsonData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'tracking-data.json';
    link.click();
    URL.revokeObjectURL(url);
    
    showNotification('JSON file generated! Replace tracking-data.json in your project and redeploy to Netlify.', 'success');
}

// Collect data from form fields
function collectFormData() {
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
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    const messageElement = document.getElementById('notificationMessage');
    
    messageElement.textContent = message;
    notification.className = `notification ${type} show`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
}

function hideNotification() {
    const notification = document.getElementById('notification');
    notification.classList.remove('show');
}

// Activity Log Functions
function logActivity(action, details) {
    const activity = {
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
        action: action,
        details: details,
        user: currentUser ? currentUser.username : 'Unknown'
    };
    
    activityLog.unshift(activity);
    // Keep only last 100 activities
    if (activityLog.length > 100) {
        activityLog = activityLog.slice(0, 100);
    }
    
    localStorage.setItem('sfExpressActivityLog', JSON.stringify(activityLog));
    console.log('Activity logged:', action, details);
}

function showActivityLog() {
    const modal = document.getElementById('activityLogModal');
    const list = document.getElementById('activityLogList');
    
    if (activityLog.length === 0) {
        list.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No activities recorded</p>';
    } else {
        list.innerHTML = activityLog.map(activity => `
            <div class="activity-item">
                <div class="activity-time">${activity.timestamp}</div>
                <div class="activity-action">${activity.action}</div>
                <div class="activity-details">${activity.details} - ${activity.user}</div>
            </div>
        `).join('');
    }
    
    modal.style.display = 'flex';
}

function closeActivityLog() {
    document.getElementById('activityLogModal').style.display = 'none';
}

function clearActivityLog() {
    if (confirm('Are you sure you want to clear the activity log?')) {
        activityLog = [];
        localStorage.setItem('sfExpressActivityLog', JSON.stringify(activityLog));
        showActivityLog();
        showNotification('Activity log cleared', 'success');
    }
}

// Notification Functions
function addNotification(message, type = 'info', details = '') {
    const notification = {
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
        message: message,
        type: type,
        details: details,
        read: false
    };
    
    notifications.unshift(notification);
    // Keep only last 50 notifications
    if (notifications.length > 50) {
        notifications = notifications.slice(0, 50);
    }
    
    localStorage.setItem('sfExpressNotifications', JSON.stringify(notifications));
    
    // Request browser notification permission
    if (Notification.permission === 'granted') {
        new Notification('SF Express', {
            body: message,
            icon: '/favicon.ico'
        });
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission();
    }
    
    console.log('Notification added:', message);
}

function showNotifications() {
    const modal = document.getElementById('notificationsModal');
    const list = document.getElementById('notificationsList');
    
    if (notifications.length === 0) {
        list.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No notifications</p>';
    } else {
        list.innerHTML = notifications.map(notification => `
            <div class="notification-item ${notification.read ? '' : 'unread'}">
                <div class="notification-time">${notification.timestamp}</div>
                <div class="notification-message">${notification.message}</div>
                <div class="notification-details">${notification.details || ''}</div>
            </div>
        `).join('');
        
        // Mark all as read
        notifications.forEach(n => n.read = true);
        localStorage.setItem('sfExpressNotifications', JSON.stringify(notifications));
    }
    
    modal.style.display = 'flex';
}

function closeNotifications() {
    document.getElementById('notificationsModal').style.display = 'none';
}

function clearNotifications() {
    if (confirm('Are you sure you want to clear all notifications?')) {
        notifications = [];
        localStorage.setItem('sfExpressNotifications', JSON.stringify(notifications));
        showNotifications();
        showNotification('Notifications cleared', 'success');
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl+S to save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveToLocalStorage();
    }
    
    // Ctrl+J to generate JSON
    if ((e.ctrlKey || e.metaKey) && e.key === 'j') {
        e.preventDefault();
        generateJsonFile();
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

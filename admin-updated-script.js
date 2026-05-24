// Admin Panel JavaScript - Netlify Compatible Version
let adminMap;
let trackingData;
let editMode = false;
let currentUser = null;
let currentShipmentId = null;

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    initializeUserSystem();
    loadTrackingData();
    setupEventListeners();
    loadShipmentList();
});

// User Management System
function initializeUserSystem() {
    // Check if users exist in localStorage
    let users = JSON.parse(localStorage.getItem('sfExpressUsers')) || [];
    
    // Add default admin if no users exist
    if (users.length === 0) {
        const defaultAdmin = {
            id: Date.now(),
            email: 'sfexpressdelivery@gmail.com',
            username: 'SFEXPRESS.om',
            password: 'SFEXPRESS.Pass',
            role: 'admin',
            createdAt: new Date().toISOString()
        };
        users.push(defaultAdmin);
        localStorage.setItem('sfExpressUsers', JSON.stringify(users));
    }
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
    
    // Fallback for default admin credentials
    if (!user && username === 'SFEXPRESS.om' && password === 'SFEXPRESS.Pass') {
        const defaultAdmin = {
            id: Date.now(),
            email: 'sfexpressdelivery@gmail.com',
            username: 'SFEXPRESS.om',
            password: 'SFEXPRESS.Pass',
            role: 'admin',
            createdAt: new Date().toISOString()
        };
        
        // Add to localStorage
        const users = getUsers();
        users.push(defaultAdmin);
        saveUsers(users);
        
        return { success: true, user: defaultAdmin };
    }
    
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
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Signup form
    document.getElementById('signupForm').addEventListener('submit', handleSignup);
    
    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    
    // Save button
    document.getElementById('saveAllBtn').addEventListener('click', saveToLocalStorage);
    
    // Generate JSON button
    document.getElementById('generateJsonBtn').addEventListener('click', generateJsonFile);
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
    try {
        const response = fetch('shipments.json');
        const data = response.json();
        return data;
    } catch (e) {
        return JSON.parse(localStorage.getItem('sfExpressShipments')) || {};
    }
}

function saveShipments(shipments) {
    localStorage.setItem('sfExpressShipments', JSON.stringify(shipments));
}

function createShipment(senderName, senderAddress, receiverName, receiverAddress, packageContents, weight, currentCity, currentLat, currentLng) {
    const shipments = getShipments();
    const trackingCode = generateTrackingCode();
    const shipmentId = Date.now();
    
    const newShipment = {
        id: shipmentId,
        trackingCode: trackingCode,
        currentStatus: 'Processing',
        lastUpdate: new Date().toLocaleString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        }),
        estimatedDelivery: 'TBD',
        currentLocation: {
            lat: parseFloat(currentLat) || 0,
            lng: parseFloat(currentLng) || 0,
            city: currentCity || 'Processing',
            country: 'Facility'
        },
        route: [{
            lat: parseFloat(currentLat) || 0,
            lng: parseFloat(currentLng) || 0,
            city: currentCity || 'Processing',
            country: 'Facility',
            status: 'In Transit'
        }],
        packageDetails: {
            contents: packageContents,
            weight: weight,
            serviceType: 'International Express',
            departure: currentCity || 'Processing',
            destination: 'Processing'
        },
        sender: {
            name: senderName,
            address: senderAddress
        },
        receiver: {
            name: receiverName,
            address: receiverAddress
        },
        timeline: [{
            status: 'Shipment Created',
            description: 'Shipment created and processing started',
            date: new Date().toLocaleString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
            }),
            location: currentCity || 'Processing Facility',
            completed: true,
            active: true
        }],
        trackingUrl: `${window.location.origin}/track.html?code=${trackingCode}`
    };
    
    shipments[trackingCode] = newShipment;
    saveShipments(shipments);
    
    return { success: true, shipment: newShipment };
}

function loadShipmentList() {
    const shipments = getShipments();
    const shipmentList = document.getElementById('shipmentList');
    shipmentList.innerHTML = '';
    
    const shipmentCodes = Object.keys(shipments);
    
    if (shipmentCodes.length === 0) {
        shipmentList.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No shipments found</p>';
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
                ${shipment.currentStatus === 'On Hold' 
                    ? `<button class="btn-release-shipment" onclick="releaseShipment('${shipment.trackingCode}')">Release</button>`
                    : `<button class="btn-hold-shipment" onclick="holdShipment('${shipment.trackingCode}')">Hold</button>`
                }
            </div>
        `;
        shipmentList.appendChild(shipmentItem);
    });
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

function exportShipments() {
    const shipments = getShipments();
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

function holdShipment(trackingCode) {
    const shipments = getShipments();
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

function releaseShipment(trackingCode) {
    const shipments = getShipments();
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

function showCreateShipmentModal() {
    const senderName = prompt('Enter sender name:');
    if (!senderName) return;
    
    const senderAddress = prompt('Enter sender address:');
    if (!senderAddress) return;
    
    const receiverName = prompt('Enter receiver name:');
    if (!receiverName) return;
    
    const receiverAddress = prompt('Enter receiver address:');
    if (!receiverAddress) return;
    
    const packageContents = prompt('Enter package contents (comma separated):');
    if (!packageContents) return;
    
    const weight = prompt('Enter package weight:');
    if (!weight) return;
    
    const currentCity = prompt('Enter current city/location:');
    if (!currentCity) return;
    
    const currentLat = prompt('Enter current latitude (for map):');
    if (!currentLat) return;
    
    const currentLng = prompt('Enter current longitude (for map):');
    if (!currentLng) return;
    
    const result = createShipment(
        senderName,
        senderAddress,
        receiverName,
        receiverAddress,
        packageContents.split(',').map(item => item.trim()),
        weight,
        currentCity,
        currentLat,
        currentLng
    );
    
    if (result.success) {
        showNotification(`Shipment created! Tracking Code: ${result.shipment.trackingCode}`, 'success');
        loadShipmentList();
    }
}

function editShipment(trackingCode) {
    const shipments = getShipments();
    const shipment = shipments[trackingCode];
    
    if (!shipment) {
        showNotification('Shipment not found', 'error');
        return;
    }
    
    currentShipmentId = trackingCode;
    trackingData = shipment;
    
    // Update form fields with shipment data
    document.getElementById('editTrackingNumber').value = shipment.trackingCode;
    document.getElementById('editCurrentStatus').value = shipment.currentStatus;
    document.getElementById('editLastUpdate').value = shipment.lastUpdate;
    document.getElementById('editEstimatedDelivery').value = shipment.estimatedDelivery;
    
    // Package details
    document.getElementById('editTotalWeight').value = shipment.packageDetails.weight;
    document.getElementById('editLuggageWeight').value = shipment.packageDetails.weightBreakdown?.luggage || 'N/A';
    document.getElementById('editBoxWeight').value = shipment.packageDetails.weightBreakdown?.mentalBox || 'N/A';
    document.getElementById('editDocumentsWeight').value = shipment.packageDetails.weightBreakdown?.documents || 'N/A';
    document.getElementById('editServiceType').value = shipment.packageDetails.serviceType;
    document.getElementById('editDeparture').value = shipment.packageDetails.departure;
    document.getElementById('editDestination').value = shipment.packageDetails.destination;
    
    // Contact information
    document.getElementById('editSenderName').value = shipment.sender.name;
    document.getElementById('editSenderAddress').value = shipment.sender.address;
    document.getElementById('editReceiverName').value = shipment.receiver.name;
    document.getElementById('editReceiverAddress').value = shipment.receiver.address;
    
    initializeAdminMap();
    populateRouteList();
    populateTimelineList();
    populatePackageContents();
    
    showNotification(`Editing shipment: ${trackingCode}`, 'info');
}

function deleteShipment(trackingCode) {
    if (confirm('Are you sure you want to delete this shipment?')) {
        const shipments = getShipments();
        delete shipments[trackingCode];
        saveShipments(shipments);
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

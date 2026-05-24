# SF Express 2062 - Futuristic Delivery Platform

A cutting-edge logistics platform designed for the year 2062, featuring AI-powered routing, autonomous drone delivery, AR tracking, and quantum-encrypted security.

## Features

### 🚀 Futuristic Technology
- **Holographic AR Map Overlays**: Real-time 3D package visualization
- **Autonomous Vehicle Tracking**: Drones, ground bots, and hyperloop tubes
- **Quantum-Encrypted Security**: Sub-centimeter location accuracy
- **AI-Powered Logistics**: Self-optimizing routing with swarm intelligence

### 👥 User Roles
- **Admin Dashboard**: Complete fleet management, customer oversight, analytics
- **Customer Portal**: Shipment creation, live tracking, carbon footprint monitoring
- **Receiver Interface**: Secure tracking link access with verification

### 🌱 Sustainability
- Carbon footprint tracking per shipment
- Eco-friendly routing optimization
- Green packaging recommendations
- Carbon offset program integration

### 🔐 Security
- Email/phone verification for all users
- Biometric authentication support
- Private tracking codes
- Quantum encryption simulation

## Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: TailwindCSS
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Deployment**: Netlify

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

This project is configured for Netlify deployment:

1. Push your code to a Git repository
2. Connect your repository to Netlify
3. Netlify will automatically build and deploy using the configuration in `netlify.toml`

## Project Structure

```
sf-express-2062/
├── src/
│   ├── components/
│   │   ├── admin/          # Admin dashboard components
│   │   ├── customer/       # Customer portal components
│   │   └── receiver/       # Receiver tracking component
│   ├── App.jsx             # Main app with routing
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies
├── tailwind.config.js      # Tailwind configuration
├── vite.config.js          # Vite configuration
└── netlify.toml            # Netlify deployment config
```

## Authentication

The application supports three user types with email/phone verification:

- **Admin**: Full system access
- **Customer**: Shipment management and tracking
- **Receiver**: Tracking link access with verification

Demo verification code: `123456`

## Features by Role

### Admin
- Customer management (People, Groups)
- Shipment management and monitoring
- Activity logging and reports
- Tracking link generation
- Drone fleet management
- Live global map with AR mode
- Carbon footprint analytics
- System settings and integrations

### Customer
- Create shipments with AI-optimized routing
- Live package tracking with AR visualization
- Shipment history and analytics
- Carbon footprint monitoring
- Address book management
- Billing and payment settings

### Receiver
- Secure tracking link access
- Email/phone verification
- Real-time package status
- Live sensor data (temperature, humidity, shock)
- Delivery timeline

## License

© 2062 SF Express. The Future of Logistics.

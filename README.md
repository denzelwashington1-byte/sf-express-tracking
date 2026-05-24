# SF Express International Delivery - Premium Courier Tracking

A luxury courier tracking website with real-time package monitoring, interactive maps, and premium 2026 design aesthetics.

## Features

### 🚀 Core Functionality
- **Real-time Package Tracking** - Live location updates with animated markers
- **Interactive Map** - Leaflet.js powered map with route visualization
- **Private Tracking System** - Secure tracking number validation
- **Responsive Design** - Optimized for all devices and screen sizes

### 🎨 Premium Design
- **2026 Design Trends** - Modern glassmorphism, gradients, and micro-interactions
- **Luxury Aesthetics** - Premium color schemes and typography
- **Smooth Animations** - CSS transitions and JavaScript animations
- **Dark/Light Elements** - Sophisticated contrast and visual hierarchy

### 📦 Package Management
- **Detailed Package Information** - Contents, weight, and dimensions
- **Sender/Receiver Details** - Complete contact information display
- **Shipment Timeline** - Visual history of package journey
- **Status Updates** - Real-time status changes and notifications

## Private Tracking Number

The system uses a private tracking number for security:

**Tracking Number: `SF2026UKTHAI`**

This tracking number provides access to:
- Live package location (currently in Warsaw, Poland)
- Complete shipment details
- Sender: Walter Mario Oliveira (Kyiv, Ukraine)
- Receiver: Nuchjaree Mee Bamrung (Bangkok, Thailand)
- Package contents: 3 big luggage's, mental box (black), documents
- Total weight: 87.5 kg

## Package Details

### Contents
- 3 Big Luggage's (25kg each)
- Mental Box (Black) (10kg)
- Documents (2.5kg)
- **Total Weight: 87.5 kg**

### Route Information
- **Departure:** Kyiv, Ukraine (March 2, 2026 - 08:00 AM)
- **Current Location:** Warsaw, Poland (In Transit)
- **Next Stop:** Dubai, UAE (Hub)
- **Final Destination:** Bangkok, Thailand (Estimated March 8, 2026)

## Technology Stack

### Frontend
- **HTML5** - Semantic markup and accessibility
- **CSS3** - Modern styling with animations and transitions
- **JavaScript (ES6+)** - Interactive functionality and API simulation
- **Leaflet.js** - Interactive mapping and real-time location tracking

### Design System
- **Typography:** Inter & Space Grotesk fonts
- **Colors:** Premium blue and red accent scheme
- **Animations:** CSS transitions and JavaScript micro-interactions
- **Responsive:** Mobile-first design approach

### External Services
- **CartoDB** - Dark theme map tiles
- **Google Fonts** - Premium typography
- **Font Awesome** - Icon system (inline SVG)

## Deployment

### Netlify Configuration
The project is optimized for Netlify deployment:

1. **Automatic Deployment** - Connect your Git repository to Netlify
2. **Build Settings** - No build process required (static site)
3. **Domain** - Custom domain configuration supported
4. **HTTPS** - Automatic SSL certificate
5. **CDN** - Global content delivery network

### Deployment Steps

1. **Push to Git**
   ```bash
   git add .
   git commit -m "Deploy SF Express tracking website"
   git push origin main
   ```

2. **Connect to Netlify**
   - Sign up/login to Netlify
   - Click "New site from Git"
   - Connect your repository
   - Deploy settings are pre-configured in `netlify.toml`

3. **Custom Domain (Optional)**
   - Go to Domain settings in Netlify
   - Add your custom domain
   - Update DNS records as instructed

## File Structure

```
├── index.html          # Main HTML structure
├── style.css           # Complete styling and animations
├── script.js           # Interactive functionality
├── netlify.toml        # Deployment configuration
└── README.md           # Project documentation
```

## Customization

### Adding New Tracking Numbers
Edit `script.js` and add to the `trackingDatabase` object:

```javascript
const trackingDatabase = {
    'SF2026UKTHAI': { /* existing data */ },
    'NEWTRACKING123': {
        trackingNumber: 'NEWTRACKING123',
        // ... shipment details
    }
};
```

### Modifying Design
- **Colors:** Update CSS variables in `style.css`
- **Fonts:** Change Google Fonts imports in `index.html`
- **Layout:** Modify grid and flexbox properties
- **Animations:** Adjust transition durations and keyframes

### Map Customization
- **Tile Style:** Change CartoDB URL in `script.js`
- **Markers:** Update custom icon HTML
- **Route:** Modify route coordinates and styling

## Performance Features

- **Optimized Images:** SVG icons and minimal external resources
- **Lazy Loading:** Map loads only when tracking is initiated
- **Caching:** Browser caching headers configured
- **Minified:** Production-ready code structure
- **CDN Ready:** Optimized for content delivery networks

## Security Features

- **XSS Protection:** Headers configured in `netlify.toml`
- **Frame Protection:** Clickjacking prevention
- **Content Type Protection:** MIME type sniffing prevention
- **Referrer Policy:** Privacy protection
- **Permissions Policy:** Device access restrictions

## Browser Support

- **Chrome/Edge:** Latest 2 versions
- **Firefox:** Latest 2 versions
- **Safari:** Latest 2 versions
- **Mobile:** iOS Safari, Android Chrome
- **Responsive:** All screen sizes supported

## Interactive Features

### Real-time Updates
- Location marker updates every 10 seconds
- Timestamp refreshes automatically
- Status changes with visual indicators

### User Experience
- Keyboard shortcuts (Ctrl+K for tracking, Escape to clear)
- Smooth scroll navigation
- Loading states and notifications
- Error handling and validation

### Accessibility
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast design

## Support

For issues or questions:
1. Check browser console for errors
2. Verify network connectivity for map tiles
3. Ensure tracking number is entered correctly
4. Test in different browsers if needed

---

**© 2026 SF Express International Delivery. Premium courier services with real-time tracking.**

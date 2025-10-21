# TM Educare Website

A modern, responsive, and bilingual website for TM Educare - providing education and healthcare consulting services.

## 🌐 Live Website
**Main Site**: https://tm-educare.vercel.app  
**Admin Panel**: https://tm-educare.vercel.app/admin  
**Test Page**: https://tm-educare.vercel.app/test

## Features

### 🌐 Bilingual Support
- **English** and **French** language support
- Easy language switching with EN/FR toggle buttons
- All content is fully translated and stored locally

### 📱 Mobile Responsive
- Optimized for all screen sizes (desktop, tablet, mobile)
- Improved mobile navigation with hamburger menu
- Touch-friendly interface elements
- Responsive grid layouts and typography

### 📋 Admin Panel
- Complete form submission management system
- Real-time statistics and analytics
- Export functionality (CSV format)
- Status tracking for inquiries
- Search and filter capabilities

### ✨ Modern Design
- Clean, professional interface
- Smooth animations and transitions
- Interactive elements and hover effects
- Gradient backgrounds and modern typography

## File Structure

```
tm educare/
├── index.html          # Main website
├── admin.html          # Admin panel for managing submissions
├── styles.css          # All styling and responsive design
├── script.js           # JavaScript functionality and translations
└── README.md          # This file
```

## Getting Started

### 1. Main Website
- Open `index.html` in a web browser
- Use the EN/FR buttons to switch languages
- Fill out the contact form to test submission functionality

### 2. Admin Panel
- Open `admin.html` in a web browser
- View dashboard statistics
- Manage form submissions in the "Form Submissions" section
- Export data as needed

## Admin Panel Features

### Dashboard
- **Total Submissions**: Count of all form submissions
- **New Submissions**: Unprocessed inquiries
- **Education Inquiries**: Education-related requests
- **Medical Inquiries**: Medical tourism requests

### Form Submissions Management
- **View All Submissions**: Complete list with details
- **Search & Filter**: Find specific submissions by name, email, service type, or status
- **Status Management**: Update inquiry status (New → Contacted → Completed)
- **Export Data**: Download submissions as CSV file
- **Delete Records**: Remove unwanted submissions

### Status Types
- 🟡 **New**: Fresh submission, not yet contacted
- 🔵 **Contacted**: Client has been reached out to
- 🟢 **Completed**: Inquiry fully processed

## Language Support

### Adding New Languages
To add support for additional languages:

1. Open `script.js`
2. Add new language object to the `translations` object
3. Include all translation keys with appropriate values
4. Add language button to the HTML navigation

### Translation Keys
All translatable content uses `data-translate` attributes. Key categories include:
- Navigation (`nav-*`)
- Hero section (`hero-*`)
- About section (`about-*`)
- Services (`service-*`)
- Contact form (`contact-form-*`)
- And more...

## Technical Details

### Data Storage
- Form submissions are stored in browser's `localStorage`
- Data persists between sessions
- No server-side database required
- Easy to migrate to server storage if needed

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design works on all screen sizes

### Performance
- Optimized CSS with efficient selectors
- Minimal JavaScript for fast loading
- Compressed and organized code structure

## Customization

### Colors & Branding
Main brand colors are defined in CSS:
- Primary: `#059669` (Green)
- Secondary: `#047857` (Dark Green)
- Accent colors for various UI elements

### Content Updates
1. **Text Content**: Update HTML directly or modify translation objects in `script.js`
2. **Images**: Replace placeholder content with actual images
3. **Contact Information**: Update phone numbers, email, and address in HTML

### Adding New Sections
1. Add HTML structure in `index.html`
2. Add corresponding CSS styles in `styles.css`
3. Add translation keys to `script.js` if needed
4. Update navigation menu if required

## Deployment

### Local Testing
1. Open `index.html` in a web browser
2. Test all functionality including form submission
3. Check admin panel at `admin.html`
4. Test on different screen sizes

### Web Hosting
1. Upload all files to web server
2. Ensure proper file permissions
3. Test functionality on live server
4. Configure any necessary server settings

## Support & Maintenance

### Regular Tasks
- Monitor form submissions through admin panel
- Export and backup submission data regularly
- Update content as needed
- Test functionality periodically

### Troubleshooting
- **Language not switching**: Check browser console for JavaScript errors
- **Form not submitting**: Verify all required fields are filled
- **Admin panel empty**: Check if localStorage is enabled in browser
- **Mobile display issues**: Clear browser cache and test again

## 🚀 Deployment

This website is deployed on **Vercel** with the following configuration:

### Quick Deployment
1. Visit [vercel.com](https://vercel.com) and sign up
2. Drag and drop the project folder
3. Vercel automatically deploys the site

### Files Included
- `vercel.json` - Vercel configuration
- `package.json` - Project metadata
- `VERCEL_DEPLOYMENT.md` - Detailed deployment guide

### Testing Deployment
Visit `https://tm-educare.vercel.app/test` to verify everything works correctly.

## Contact Information

For technical support or questions about this website:
- Email: tm.educare00@gmail.com
- Phone: +91 9205940911 / +243 840695390

---

**Last Updated**: September 2025  
**Version**: 2.0 (Vercel Deployment)  
**Developer**: Grace Media  
**Live Site**: https://tm-educare.vercel.app

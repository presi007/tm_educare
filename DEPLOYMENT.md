# TM Educare Website - Deployment Guide

## Quick Start

### Local Testing
1. **Download/Clone** all files to your computer
2. **Open** `index.html` in any modern web browser
3. **Test** all functionality:
   - Language switching (EN/FR)
   - Contact form submission
   - Mobile responsiveness
   - Admin panel (`admin.html`)

### Web Hosting Deployment

#### Option 1: Vercel (Recommended - Current Setup)
**Your site is configured for: https://tm-educare.vercel.app**

1. **Install Vercel CLI** (optional):
   ```bash
   npm install -g vercel
   ```

2. **Deploy via Vercel Dashboard**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub, GitLab, or Bitbucket
   - Click "New Project"
   - Import your repository or drag & drop files
   - Vercel will automatically detect the configuration

3. **Deploy via CLI** (if you have Vercel CLI):
   ```bash
   vercel --prod
   ```

4. **Your URLs will be**:
   - Main site: `https://tm-educare.vercel.app`
   - Admin panel: `https://tm-educare.vercel.app/admin`
   - Test page: `https://tm-educare.vercel.app/test`

#### Option 2: Netlify (Alternative)
1. Go to [netlify.com](https://netlify.com)
2. Sign up for a free account
3. Drag and drop your project folder to Netlify
4. Your site will be live instantly with a custom URL
5. Optional: Connect a custom domain

#### Option 3: GitHub Pages (Alternative)
1. Create a GitHub repository
2. Upload all files to the repository
3. Go to Settings > Pages
4. Select "Deploy from a branch" and choose "main"
5. Your site will be available at `username.github.io/repository-name`

## File Structure for Deployment

```
your-website/
├── index.html                    # Main website (required)
├── admin.html                    # Admin panel (required)
├── styles.css                    # All styling (required)
├── script.js                     # JavaScript functionality (required)
├── vercel.json                   # Vercel configuration (required for Vercel)
├── package.json                  # Project metadata (recommended)
├── test-deployment.html          # Deployment test page (recommended)
├── README.md                     # Documentation (optional)
├── DEPLOYMENT.md                 # This file (optional)
└── ADMIN_TROUBLESHOOTING.md      # Admin panel troubleshooting guide (recommended)
```

**CRITICAL**: All files must be uploaded to the same hosting provider and accessed via the same domain for the admin panel to work properly.

## Pre-Deployment Checklist

### ✅ Content Review
- [ ] Update contact information (phone, email, address)
- [ ] Review all text content for accuracy
- [ ] Test both English and French translations
- [ ] Verify all links work correctly

### ✅ Technical Testing
- [ ] Test on desktop browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices (iOS Safari, Chrome Mobile)
- [ ] Verify form submission works locally
- [ ] **CRITICAL**: Test form submission and admin panel on deployed site
- [ ] Verify admin panel shows submitted data when accessed via hosted URL
- [ ] Test real-time updates between main site and admin panel
- [ ] Check browser console for JavaScript errors
- [ ] Test language switching
- [ ] Verify connection status indicator in admin panel shows green

### ✅ SEO Optimization
- [ ] Update meta description if needed
- [ ] Verify page title is appropriate
- [ ] Check that all images have alt text (if you add images)
- [ ] Ensure proper heading structure (H1, H2, H3)

## Admin Panel Access

### Accessing the Admin Panel
After deployment, access your admin panel at:
- **Correct**: `https://tm-educare.vercel.app/admin`
- **Also works**: `https://tm-educare.vercel.app/admin.html`
- **Wrong**: Opening admin.html file directly from computer

### First-Time Setup
1. Visit your deployed website: `https://tm-educare.vercel.app`
2. Submit a test form to create sample data
3. Open admin panel: `https://tm-educare.vercel.app/admin`
4. Verify the connection status shows green: "✅ Connected - 1 submissions loaded"
5. If you see red status, check ADMIN_TROUBLESHOOTING.md

### Quick Test
1. Go to: `https://tm-educare.vercel.app/test`
2. Run all deployment tests
3. Verify everything shows green checkmarks

### Admin Panel Features
- **Real-time updates**: New submissions appear automatically
- **Data export**: Download submissions as CSV
- **Status management**: Update submission status (new/contacted/completed)
- **Search and filter**: Find specific submissions
- **Diagnostics**: Built-in troubleshooting tools

## Post-Deployment Tasks

### 1. Domain Setup (Optional)
If you want a custom domain like `tmeducare.com`:
1. Purchase domain from registrar (GoDaddy, Namecheap, etc.)
2. Point domain to your hosting provider
3. Update meta tags with new domain URL

### 2. Analytics Setup (Optional)
Add Google Analytics for visitor tracking:
1. Create Google Analytics account
2. Add tracking code before `</head>` in index.html
3. Monitor website traffic and user behavior

### 3. SSL Certificate
Most modern hosting providers include free SSL certificates:
- Netlify: Automatic HTTPS
- GitHub Pages: Automatic HTTPS
- Traditional hosting: Usually available in control panel

## Maintenance

### Regular Tasks
- **Weekly**: Check admin panel for new submissions
- **Monthly**: Export and backup form data
- **Quarterly**: Review and update content
- **Annually**: Renew domain and hosting

### Content Updates
To update website content:
1. Edit the HTML files directly, or
2. Modify translation objects in `script.js` for text changes
3. Re-upload files to hosting provider

### Adding New Features
The website is built with standard HTML, CSS, and JavaScript:
- Easy to modify and extend
- No complex build process required
- Compatible with most hosting providers

## Troubleshooting

### Common Issues

**Problem**: Form submissions not saving
**Solution**: Ensure JavaScript is enabled and localStorage is available

**Problem**: Language switching not working
**Solution**: Check browser console for JavaScript errors

**Problem**: Mobile layout issues
**Solution**: Clear browser cache and test again

**Problem**: Admin panel shows no data
**Solution**: 
1. Ensure admin.html is accessed from same domain as main site (not local file)
2. Submit a test form first, then check admin panel
3. Check browser console for JavaScript errors
4. Use the diagnostic tools in admin panel (click Refresh button)
5. See ADMIN_TROUBLESHOOTING.md for detailed solutions

### Support Resources
- **HTML/CSS Help**: [MDN Web Docs](https://developer.mozilla.org)
- **JavaScript Issues**: Browser developer console (F12)
- **Hosting Support**: Contact your hosting provider

## Security Considerations

### Data Protection
- Form data is stored locally in browser
- No sensitive data is transmitted to external servers
- Consider server-side storage for production use

### Best Practices
- Keep hosting account credentials secure
- Regularly backup website files
- Monitor for any suspicious activity
- Update contact information as needed

## Performance Optimization

### Already Implemented
- ✅ Optimized CSS and JavaScript
- ✅ Efficient animations and transitions
- ✅ Responsive images and layouts
- ✅ Minimal external dependencies

### Additional Optimizations (Optional)
- Compress images if you add them
- Enable gzip compression on server
- Use CDN for faster global loading
- Implement caching headers

## Cost Estimates

### Free Options
- **Netlify**: Free tier includes custom domain
- **GitHub Pages**: Completely free


### Paid Options
- **Traditional Hosting**: $3-10/month
- **Custom Domain**: $10-15/year
- **Premium Features**: Varies by provider

## Next Steps After Deployment

1. **Test Everything**: Thoroughly test all features on the live site
2. **Share the URL**: Distribute your website link
3. **Monitor Performance**: Check loading speeds and user experience
4. **Collect Feedback**: Ask users for suggestions and improvements
5. **Plan Updates**: Schedule regular content and feature updates

---

**Need Help?**
Contact: tm.educare00@gmail.com
Phone: +91 9205940911 / +243 840695390

# Vercel Deployment Guide for TM Educare

## 🚀 Quick Deployment Steps

### Method 1: Vercel Dashboard (Easiest)

1. **Go to Vercel**: Visit [vercel.com](https://vercel.com)
2. **Sign Up/Login**: Use GitHub, GitLab, or Bitbucket account
3. **Create New Project**: Click "New Project" button
4. **Upload Files**: 
   - Drag and drop your entire project folder, OR
   - Connect your Git repository
5. **Deploy**: Vercel will automatically deploy your site

### Method 2: Vercel CLI (Advanced)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from project directory**:
   ```bash
   cd /path/to/your/tm-educare-folder
   vercel --prod
   ```

## 📁 Required Files for Vercel

Make sure these files are in your project folder:

```
tm-educare/
├── index.html                    ✅ Main website
├── admin.html                    ✅ Admin panel
├── styles.css                    ✅ Styling
├── script.js                     ✅ JavaScript
├── vercel.json                   ✅ Vercel configuration
├── package.json                  ✅ Project metadata
├── test-deployment.html          ✅ Test page
├── ADMIN_TROUBLESHOOTING.md      📖 Troubleshooting guide
├── DEPLOYMENT.md                 📖 General deployment guide
└── README.md                     📖 Project documentation
```

## 🌐 Your Live URLs

After deployment, your site will be available at:

- **Main Website**: `https://tm-educare.vercel.app`
- **Admin Panel**: `https://tm-educare.vercel.app/admin`
- **Test Page**: `https://tm-educare.vercel.app/test`

## ✅ Post-Deployment Checklist

### 1. Verify Deployment
- [ ] Visit `https://tm-educare.vercel.app` - main site loads
- [ ] Check all sections work (navigation, forms, language toggle)
- [ ] Verify mobile responsiveness

### 2. Test Admin Panel
- [ ] Go to `https://tm-educare.vercel.app/test`
- [ ] Run all deployment tests
- [ ] Submit a test form on main site
- [ ] Check admin panel shows the submission
- [ ] Verify connection status is green

### 3. Test Form Functionality
- [ ] Fill out contact form on main site
- [ ] Check form validation works
- [ ] Verify success message appears
- [ ] Confirm data appears in admin panel

## 🔧 Vercel Configuration Explained

The `vercel.json` file includes:

### Routes
- `/` → `index.html` (main site)
- `/admin` → `admin.html` (admin panel)
- `/test` → `test-deployment.html` (test page)

### Security Headers
- Content security and XSS protection
- Frame protection
- Cache optimization

### Clean URLs
- `/admin` instead of `/admin.html`
- `/test` instead of `/test-deployment.html`

## 🚨 Troubleshooting

### Common Issues

**Issue**: Site deployed but admin panel shows no data
**Solution**: 
1. Ensure you submitted a form on the live site (not local)
2. Check `https://tm-educare.vercel.app/test` for diagnostics
3. See `ADMIN_TROUBLESHOOTING.md` for detailed solutions

**Issue**: Form submissions not working
**Solution**:
1. Check browser console for JavaScript errors
2. Verify all files uploaded correctly
3. Test with simple data first

**Issue**: 404 errors for admin panel
**Solution**:
1. Verify `vercel.json` is uploaded
2. Try `https://tm-educare.vercel.app/admin.html` instead
3. Redeploy if needed

### Getting Help

1. **Check the test page**: `https://tm-educare.vercel.app/test`
2. **Review troubleshooting guide**: `ADMIN_TROUBLESHOOTING.md`
3. **Contact support**: tm.educare00@gmail.com

## 🔄 Updating Your Site

### Via Vercel Dashboard
1. Go to your project in Vercel dashboard
2. Click "Deployments" tab
3. Upload new files or connect to Git for auto-deployment

### Via CLI
```bash
vercel --prod
```

### Via Git (if connected)
1. Push changes to your repository
2. Vercel automatically deploys the changes

## 📊 Monitoring

### Vercel Analytics
- View deployment logs in Vercel dashboard
- Monitor site performance and errors
- Track visitor analytics (if enabled)

### Admin Panel Monitoring
- Check connection status indicator
- Export data regularly
- Monitor form submissions

## 🎯 Next Steps

1. **Test everything**: Use the test page to verify deployment
2. **Share your site**: `https://tm-educare.vercel.app`
3. **Monitor submissions**: Check admin panel regularly
4. **Backup data**: Export CSV files periodically
5. **Update content**: Modify files and redeploy as needed

## 📞 Support

**Email**: tm.educare00@gmail.com  
**Phone**: +91 9205940911 / +243 840695390

**Live Site**: https://tm-educare.vercel.app  
**Admin Panel**: https://tm-educare.vercel.app/admin  
**Test Page**: https://tm-educare.vercel.app/test

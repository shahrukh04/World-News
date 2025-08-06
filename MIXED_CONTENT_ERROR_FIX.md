# Mixed Content Error Fix - HTTP Backend Solution

## Problem
The frontend is getting a "blocked:mixed-content" error when trying to access the backend API:
```
(blocked:mixed-content) xhr
Request URL: https://world-news-skvr.onrender.com/api/news
Referrer Policy: strict-origin-when-cross-origin
```

## Root Cause
This error occurs because:
1. **Frontend is served over HTTPS** (secure connection)
2. **Backend API is accessed over HTTP** (insecure connection)
3. **Browsers block mixed content** - HTTPS pages cannot make requests to HTTP endpoints for security reasons

## Current Configuration
- Frontend: HTTPS (Vercel automatically provides HTTPS)
- Backend: HTTP only (AWS Elastic Beanstalk without SSL)

## Solution Options

### Option 1: Enable HTTPS on AWS Elastic Beanstalk (Recommended)

#### Step 1: Configure SSL Certificate
1. **Go to AWS Elastic Beanstalk Console**
2. **Select your application environment**
3. **Go to Configuration → Load Balancer**
4. **Add HTTPS Listener:**
   - Port: 443
   - Protocol: HTTPS
   - SSL Certificate: Choose or create one

#### Step 2: Update Environment Configuration
1. **Update frontend API URL to HTTPS:**
   ```
   VITE_API_URL=https://world-news-skvr.onrender.com/api
   ```

2. **Update backend URL:**
   ```
   BACKEND_URL=https://world-news-skvr.onrender.com
   ```

### Option 2: Use Vercel Proxy (Alternative)

Create a proxy in your Vercel frontend to forward API requests:

#### Step 1: Create vercel.json
```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://world-news-skvr.onrender.com/api/$1"
    }
  ]
}
```

#### Step 2: Update Frontend API URL
```
VITE_API_URL=/api
```

### Option 3: Deploy Frontend over HTTP (Not Recommended)

This option is not recommended for production as it reduces security.

## Current Applied Solution

For now, I've reverted the configuration to use HTTP for consistency:

**Frontend (.env.production):**
```
VITE_API_URL=https://world-news-skvr.onrender.com/api
```

**Backend (.env.production):**
```
BACKEND_URL=https://world-news-skvr.onrender.com
```

## Implementing Option 1: Enable HTTPS on AWS Elastic Beanstalk

### Step-by-Step Guide

1. **Request SSL Certificate (if you don't have one):**
   - Go to AWS Certificate Manager
   - Request a public certificate
   - Add your domain: `world-news-skvr.onrender.com`
   - Validate the certificate

2. **Configure Load Balancer:**
   - Go to Elastic Beanstalk → Configuration → Load Balancer
   - Add Listener:
     - Port: 443
     - Protocol: HTTPS
     - SSL Certificate: Select your certificate
   - Apply changes

3. **Update Security Groups (if needed):**
   - Ensure port 443 is open in security groups

4. **Test HTTPS Access:**
   ```bash
   curl https://world-news-skvr.onrender.com/api/health
   ```

5. **Update Environment Variables:**
   - Frontend: Change `VITE_API_URL` to use `https://`
   - Backend: Change `BACKEND_URL` to use `https://`
   - Redeploy both applications

## Implementing Option 2: Vercel Proxy

### Step 1: Create vercel.json in frontend root
```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://world-news-skvr.onrender.com/api/$1"
    }
  ]
}
```

### Step 2: Update Frontend Environment
```
VITE_API_URL=/api
```

### Step 3: Redeploy Frontend
The proxy will handle the HTTP requests server-side, avoiding mixed content issues.

## Testing Solutions

### Test HTTPS Backend (Option 1)
```bash
# Test health endpoint
curl https://world-news-skvr.onrender.com/api/health

# Test news endpoint
curl https://world-news-skvr.onrender.com/api/news
```

### Test Proxy (Option 2)
```bash
# Test through Vercel proxy
curl https://your-frontend-domain.vercel.app/api/health
curl https://your-frontend-domain.vercel.app/api/news
```

## Recommendation

**Option 1 (HTTPS on AWS)** is the best long-term solution because:
- ✅ Provides end-to-end encryption
- ✅ Better security
- ✅ SEO benefits
- ✅ Modern web standards compliance
- ✅ No additional proxy complexity

**Option 2 (Vercel Proxy)** is a good temporary solution if:
- ⚠️ You can't enable HTTPS on AWS immediately
- ⚠️ You need a quick fix
- ⚠️ You want to avoid AWS SSL certificate setup

## Important Notes

1. **Security**: HTTPS is essential for production applications
2. **Browser Requirements**: Modern browsers enforce mixed content policies
3. **SEO Impact**: Search engines prefer HTTPS sites
4. **User Trust**: Users expect secure connections
5. **Compliance**: Many regulations require encrypted data transmission

## Next Steps

1. Choose your preferred solution (Option 1 recommended)
2. Follow the implementation guide
3. Test thoroughly
4. Update documentation
5. Monitor for any issues
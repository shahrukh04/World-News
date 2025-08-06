# CORS Troubleshooting Guide

## Issue
Frontend getting CORS error when accessing backend API endpoints (except /api/health):
```
Referrer Policy: strict-origin-when-cross-origin
```

## Root Cause
The ALLOWED_ORIGINS environment variable in the backend was not configured to include all necessary frontend domains.

## Solution Applied

### 1. Updated Backend CORS Configuration
Updated `backend/.env.production` to include all possible frontend origins:
```
ALLOWED_ORIGINS=https://www.worldnew.in,https://worldnew.in,https://world-news-frontend-seven.vercel.app,http://localhost:3000,http://127.0.0.1:3000
```

### 2. AWS Elastic Beanstalk Environment Variables
Make sure to set the environment variable in AWS Elastic Beanstalk:

1. Go to AWS Elastic Beanstalk Console
2. Select your application environment
3. Go to Configuration → Software
4. Add/Update environment variable:
   - **Name**: `ALLOWED_ORIGINS`
   - **Value**: `https://www.worldnew.in,https://worldnew.in,https://world-news-frontend-seven.vercel.app,http://localhost:3000,http://127.0.0.1:3000`

### 3. Restart Required
After updating environment variables:
1. Restart the Elastic Beanstalk environment
2. Wait for deployment to complete
3. Test the API endpoints

## Testing CORS

### Test 1: Browser Console
```javascript
fetch('https://world-news-skvr.onrender.com/api/news', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

### Test 2: cURL Command
```bash
curl -H "Origin: https://world-news-frontend-seven.vercel.app" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://world-news-skvr.onrender.com/api/news
```

## Additional Notes

1. **Environment Variable Priority**: AWS Elastic Beanstalk environment variables override .env files
2. **Deployment**: Changes to environment variables require application restart
3. **Security**: Only add trusted domains to ALLOWED_ORIGINS
4. **Debugging**: Check CloudWatch logs for CORS-related errors

## Common CORS Issues

1. **Missing Origin**: Frontend domain not in ALLOWED_ORIGINS
2. **Protocol Mismatch**: HTTP vs HTTPS
3. **Subdomain Issues**: www vs non-www domains
4. **Port Differences**: Different ports for development

## Verification Steps

1. ✅ Update ALLOWED_ORIGINS in .env.production
2. ⏳ Set environment variable in AWS Elastic Beanstalk
3. ⏳ Restart Elastic Beanstalk environment
4. ⏳ Test API endpoints from frontend
5. ⏳ Verify CORS headers in browser network tab
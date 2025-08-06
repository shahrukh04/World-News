# CORS Error Fix for AWS Elastic Beanstalk Deployment

## Problem
The backend API health endpoint works (`/api/health`) but other endpoints like `/api/news` return CORS errors when accessed from the frontend.

## Root Cause
The `ALLOWED_ORIGINS` environment variable in AWS Elastic Beanstalk doesn't include the actual frontend domain making the requests.

## Immediate Solution

### Step 1: Update AWS Elastic Beanstalk Environment Variables

1. **Login to AWS Console**
   - Go to AWS Elastic Beanstalk
   - Select your application: `backendenv`
   - Select your environment

2. **Update Environment Variables**
   - Go to **Configuration** → **Software**
   - Click **Edit**
   - Add or update the environment variable:

   ```
   Name: ALLOWED_ORIGINS
   Value: https://www.worldnew.in,https://worldnew.in,https://world-news-frontend-seven.vercel.app,http://localhost:3000,http://127.0.0.1:3000
   ```

3. **Apply Changes**
   - Click **Apply**
   - Wait for the environment to restart (this may take 2-5 minutes)

### Step 2: Verify the Fix

After the environment restarts, test the API:

```javascript
// Test in browser console from your frontend domain
fetch('https://world-news-skvr.onrender.com/api/news')
  .then(response => response.json())
  .then(data => console.log('Success:', data))
  .catch(error => console.error('Error:', error));
```

## Alternative Quick Fix (If you know the exact frontend URL)

If your frontend is deployed on a different URL than expected, update the ALLOWED_ORIGINS to include that specific URL:

```
ALLOWED_ORIGINS=https://your-actual-frontend-domain.com,https://www.worldnew.in,https://worldnew.in
```

## Debugging Steps

### 1. Check Current Environment Variables
In AWS Elastic Beanstalk:
- Go to Configuration → Software
- Verify `ALLOWED_ORIGINS` is set correctly

### 2. Check CloudWatch Logs
- Go to AWS Elastic Beanstalk → Logs
- Request logs to see CORS-related errors

### 3. Test CORS Headers
Use browser developer tools:
1. Open Network tab
2. Make a request to the API
3. Check response headers for:
   - `Access-Control-Allow-Origin`
   - `Access-Control-Allow-Methods`
   - `Access-Control-Allow-Headers`

## Important Notes

1. **Environment Variables Override .env Files**: AWS Elastic Beanstalk environment variables take precedence over .env files in your code.

2. **Restart Required**: Changes to environment variables require an environment restart.

3. **Security**: Only add trusted domains to ALLOWED_ORIGINS.

4. **Protocol Matching**: Ensure the protocol (http/https) matches between frontend and the allowed origins.

## Testing Commands

### Test CORS Preflight
```bash
curl -H "Origin: https://world-news-frontend-seven.vercel.app" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type,Authorization" \
     -X OPTIONS \
     https://world-news-skvr.onrender.com/api/news
```

### Test Actual Request
```bash
curl -H "Origin: https://world-news-frontend-seven.vercel.app" \
     -H "Content-Type: application/json" \
     https://world-news-skvr.onrender.com/api/news
```

## Expected Response Headers
After the fix, you should see these headers in the response:
```
Access-Control-Allow-Origin: https://world-news-frontend-seven.vercel.app
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
```

## If the Problem Persists

1. **Double-check the frontend URL**: Ensure you're using the correct deployed frontend URL
2. **Check for typos**: Verify there are no typos in the ALLOWED_ORIGINS value
3. **Clear browser cache**: Sometimes browsers cache CORS responses
4. **Check AWS logs**: Look for specific error messages in CloudWatch logs
5. **Contact support**: If the issue persists, check AWS Elastic Beanstalk documentation or contact support
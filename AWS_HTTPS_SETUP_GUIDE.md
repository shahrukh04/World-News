# AWS Elastic Beanstalk HTTPS Setup Guide

## Overview
This guide will help you enable HTTPS on your AWS Elastic Beanstalk application to resolve the mixed content error.

## Prerequisites
- AWS Elastic Beanstalk application running
- Access to AWS Console
- Domain name (optional, but recommended)

## Step-by-Step Instructions

### Step 1: Request SSL Certificate

#### Option A: Using AWS Certificate Manager (Recommended)
1. **Go to AWS Certificate Manager (ACM)**
   - Open AWS Console
   - Search for "Certificate Manager"
   - Select your region (same as Elastic Beanstalk)

2. **Request a Certificate**
   - Click "Request a certificate"
   - Choose "Request a public certificate"
   - Click "Next"

3. **Add Domain Names**
   - For Elastic Beanstalk default domain:
     ```
     world-news-skvr.onrender.com
     ```
   - Or your custom domain if you have one:
     ```
     api.yourdomain.com
     *.yourdomain.com
     ```
   - Click "Next"

4. **Choose Validation Method**
   - Select "DNS validation" (recommended)
   - Click "Next"

5. **Add Tags (Optional)**
   - Add any tags you want
   - Click "Next"

6. **Review and Request**
   - Review your settings
   - Click "Confirm and request"

7. **Complete DNS Validation**
   - Click on the certificate
   - Copy the CNAME record details
   - Add the CNAME record to your DNS provider
   - Wait for validation (can take a few minutes to hours)

### Step 2: Configure Load Balancer for HTTPS

1. **Go to Elastic Beanstalk Console**
   - Open AWS Console
   - Go to Elastic Beanstalk
   - Select your application
   - Select your environment

2. **Access Configuration**
   - Click "Configuration" in the left sidebar
   - Find "Load balancer" section
   - Click "Edit"

3. **Add HTTPS Listener**
   - Scroll down to "Listeners" section
   - Click "Add listener"
   - Configure the new listener:
     ```
     Port: 443
     Protocol: HTTPS
     SSL certificate: Select your certificate from ACM
     SSL policy: ELBSecurityPolicy-TLS-1-2-2017-01 (or latest)
     ```

4. **Configure HTTP to HTTPS Redirect (Optional)**
   - In the existing HTTP listener (port 80):
   - Change "Process" to "Redirect to HTTPS"
   - Or keep it as "Forward to" if you want both HTTP and HTTPS

5. **Apply Changes**
   - Click "Apply"
   - Wait for the environment to update (5-10 minutes)

### Step 3: Update Security Groups (If Needed)

1. **Check Security Groups**
   - Go to EC2 Console
   - Click "Security Groups"
   - Find your Elastic Beanstalk security group

2. **Add HTTPS Rule**
   - Click "Edit inbound rules"
   - Add rule:
     ```
     Type: HTTPS
     Protocol: TCP
     Port: 443
     Source: 0.0.0.0/0 (or your specific IPs)
     ```
   - Save rules

### Step 4: Test HTTPS Access

1. **Test Health Endpoint**
   ```bash
   curl https://world-news-skvr.onrender.com/api/health
   ```

2. **Test News Endpoint**
   ```bash
   curl https://world-news-skvr.onrender.com/api/news
   ```

3. **Test in Browser**
   - Open: `https://world-news-skvr.onrender.com/api/health`
   - Should show JSON response without security warnings

### Step 5: Update Application Configuration

1. **Update Frontend Environment Variables**
   - In Vercel Dashboard:
   - Go to Settings → Environment Variables
   - Update `VITE_API_URL` to:
     ```
     https://world-news-skvr.onrender.com/api
     ```
   - Redeploy frontend

2. **Update Backend Environment Variables**
   - In AWS Elastic Beanstalk:
   - Go to Configuration → Software
   - Update `BACKEND_URL` to:
     ```
     https://world-news-skvr.onrender.com
     ```
   - Apply changes

### Step 6: Update Local Configuration Files

1. **Update Frontend .env.production**
   ```
   VITE_API_URL=https://world-news-skvr.onrender.com/api
   ```

2. **Update Backend .env.production**
   ```
   BACKEND_URL=https://world-news-skvr.onrender.com
   ```

## Alternative: Using Custom Domain

### If You Have a Custom Domain

1. **Set Up Route 53 (Optional)**
   - Create hosted zone for your domain
   - Update nameservers at your domain registrar

2. **Create CNAME Record**
   - Point your subdomain to Elastic Beanstalk:
     ```
     api.yourdomain.com → world-news-skvr.onrender.com
     ```

3. **Request Certificate for Custom Domain**
   - Follow Step 1 but use your custom domain
   - Example: `api.yourdomain.com`

4. **Update Application URLs**
   - Use `https://api.yourdomain.com/api` instead

## Troubleshooting

### Certificate Issues
- **Pending Validation**: Check DNS records are correct
- **Failed Validation**: Verify domain ownership
- **Certificate Not Available**: Ensure it's in the same region

### Load Balancer Issues
- **502 Bad Gateway**: Check if application is running on correct port
- **Timeout**: Verify security groups allow traffic
- **SSL Handshake Failed**: Check SSL policy compatibility

### Application Issues
- **Mixed Content Still Occurring**: Clear browser cache
- **API Not Responding**: Check application logs in Elastic Beanstalk
- **CORS Errors**: Verify ALLOWED_ORIGINS includes HTTPS URLs

## Verification Checklist

- [ ] SSL certificate issued and validated
- [ ] HTTPS listener added to load balancer (port 443)
- [ ] Security groups allow HTTPS traffic (port 443)
- [ ] HTTPS endpoints accessible via browser
- [ ] Frontend environment variables updated to HTTPS
- [ ] Backend environment variables updated to HTTPS
- [ ] Frontend redeployed with new environment variables
- [ ] No mixed content errors in browser console
- [ ] All API calls working properly

## Cost Considerations

- **SSL Certificate**: Free with AWS Certificate Manager
- **Load Balancer**: No additional cost for HTTPS listener
- **Data Transfer**: Standard AWS data transfer rates apply

## Security Benefits

- ✅ **Data Encryption**: All API communication encrypted
- ✅ **Authentication Security**: Tokens protected in transit
- ✅ **Browser Compliance**: Meets modern security standards
- ✅ **SEO Benefits**: Search engines prefer HTTPS
- ✅ **User Trust**: Users see secure connection indicator

## Next Steps After Setup

1. **Test thoroughly** with your frontend application
2. **Monitor** CloudWatch logs for any issues
3. **Update documentation** with new HTTPS URLs
4. **Consider** setting up HTTP to HTTPS redirect
5. **Plan** for certificate renewal (automatic with ACM)

## Support Resources

- [AWS Certificate Manager Documentation](https://docs.aws.amazon.com/acm/)
- [Elastic Beanstalk HTTPS Configuration](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/configuring-https.html)
- [AWS Support](https://aws.amazon.com/support/) for technical issues
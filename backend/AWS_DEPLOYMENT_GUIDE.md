# AWS Elastic Beanstalk Deployment Guide

## Prerequisites
1. AWS CLI installed and configured
2. EB CLI installed (`pip install awsebcli`)
3. AWS account with appropriate permissions

## Step 1: Prepare Your Backend for Deployment

The following files have been created/configured for AWS deployment:
- `Procfile` - Tells AWS how to start your application
- `.ebextensions/nodecommand.config` - AWS-specific configuration
- `package.json` - Updated with engines specification
- `.gitignore` - Excludes unnecessary files from deployment

## Step 2: Initialize Elastic Beanstalk

```bash
cd backend
eb init
```

Follow the prompts:
- Select your AWS region (e.g., eu-north-1)
- Choose "Node.js" as platform
- Select Node.js version (18.x recommended)
- Choose whether to use CodeCommit (usually No)
- Choose whether to set up SSH (recommended: Yes)

## Step 3: Create Environment

```bash
eb create production-backend
```

Or specify environment name:
```bash
eb create your-app-name-env
```

## Step 4: Set Environment Variables

Set your environment variables in AWS console or via CLI:

```bash
eb setenv MONGODB_URI=your_mongodb_connection_string
eb setenv JWT_SECRET=your_jwt_secret
eb setenv NEWS_API_KEY=your_news_api_key
eb setenv NODE_ENV=production
```

## Step 5: Deploy

```bash
eb deploy
```

## Step 6: Open Your Application

```bash
eb open
```

## Common Issues and Solutions

### Issue: "Failed to generate Procfile"
**Solution**: Ensure `Procfile` exists in root directory with content: `web: node server.js`

### Issue: "Invalid option specification" or "Unknown configuration setting"
**Solution**: 
1. Check `.ebextensions/nodecommand.config` for invalid configurations
2. Remove deprecated or unsupported option settings
3. Use only supported namespaces for your platform version

### Issue: "Unknown or duplicate parameter: NodeVersion"
**Solution**: 
1. Remove `NodeVersion` from `.ebextensions` configuration
2. Specify Node.js version in `package.json` engines field instead
3. Use AWS platform version that supports your Node.js version

### Issue: Environment variables not working
**Solution**: Set them via AWS console or EB CLI as shown above

### Issue: MongoDB connection fails
**Solution**: 
1. Ensure MongoDB Atlas allows connections from AWS IP ranges
2. Update connection string in environment variables
3. Check security groups in AWS console

### Issue: Port binding errors
**Solution**: Ensure your server.js uses `process.env.PORT || 5000`

### Issue: "Engine execution has encountered an error"
**Solution**:
1. Check application logs: `eb logs`
2. Verify all required files are present (Procfile, package.json, server.js)
3. Ensure Node.js version compatibility
4. Check for syntax errors in configuration files

## Monitoring and Logs

```bash
# View logs
eb logs

# View application status
eb status

# View health
eb health
```

## Alternative: ZIP Upload Method

1. Create a ZIP file of your backend folder (exclude node_modules)
2. Go to AWS Elastic Beanstalk console
3. Create new application
4. Upload ZIP file
5. Configure environment variables in console

## Environment Variables Required

- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NEWS_API_KEY` - Your news API key
- `NODE_ENV` - Set to 'production'
- `PORT` - AWS will set this automatically

## Post-Deployment

1. Test all API endpoints
2. Verify database connectivity
3. Check logs for any errors
4. Set up monitoring and alerts
5. Configure custom domain if needed
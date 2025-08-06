# World News Application

A full-stack news application optimized for SEO and monetization through Google AdSense and affiliate marketing. Built with React, Node.js, and MongoDB, this application provides advanced content management, analytics, and automated news fetching.

## 🌐 Live Application

- **Frontend**: https://www.worldnew.in
- **Backend API**: https://world-news-skvr.onrender.com

## 🏃‍♂️ Quick Start

For detailed environment setup instructions, see [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md)

### Local Development
```bash
# Backend
cd backend && npm run dev

# Frontend (new terminal)
cd frontend && npm run dev:local
```

### Production Mode Testing
```bash
# Backend
cd backend && npm run dev:prod

# Frontend (new terminal)
cd frontend && npm run dev:prod
```

## 🚀 Features

### Core Functionality
- **Content Management System**: Rich text editor with image upload, auto-save, and SEO optimization
- **User Management**: Role-based authentication (Admin, Editor, Subscriber)
- **Advanced SEO**: Automated SEO analysis, meta tags, sitemaps, and structured data
- **Responsive Design**: Mobile-first approach with modern UI using Shadcn/ui and Tailwind CSS

### Monetization Features
- **Google AdSense Integration**: Strategic ad placement with performance tracking
- **Affiliate Marketing**: Link cloaking, click tracking, and commission management
- **Newsletter System**: Automated email marketing with subscriber management
- **Analytics Dashboard**: Comprehensive insights for traffic and revenue optimization

### SEO Optimization
- **Technical SEO**: XML sitemaps, robots.txt, canonical URLs, and meta tags
- **Content Analysis**: SEO score analyzer, keyword density checker, and readability analysis
- **Performance Tracking**: Page speed insights and search ranking monitoring
- **Structured Data**: Automatic schema.org markup for better search visibility

### Advanced Features
- **Real-time Analytics**: Live traffic monitoring and user engagement tracking
- **Social Media Integration**: Share buttons, social login, and auto-posting
- **Email Automation**: Welcome series, post notifications, and drip campaigns
- **Image Optimization**: Automatic WebP conversion and lazy loading

## 🛠️ Tech Stack

### Frontend
- **React 18+** with Vite bundler
- **Shadcn/ui** components
- **Tailwind CSS** for styling
- **React Router DOM** for navigation
- **React Helmet Async** for SEO
- **React Query** for data fetching

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** authentication with refresh tokens
- **Redis** for caching
- **Cloudinary** for image storage
- **Nodemailer** for email functionality

### DevOps & Deployment
- **Docker** containerization
- **GitHub Actions** for CI/CD
- **Environment-specific** configurations
- **SSL** certificate support

## 📦 Installation

### Prerequisites
- Node.js 18+
- MongoDB 5+
- Redis (optional, for caching)
- Git

### Backend Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd monetized-blog-app
```

2. **Install dependencies**
```bash
npm run install:all
```

3. **Configure environment variables**
```bash
cd backend
cp .env.example .env
```

Edit `.env` with your configuration:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/monetized-blog

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_REFRESH_SECRET=your-super-secret-refresh-key-here

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Google Services
GA_TRACKING_ID=G-XXXXXXXXXX
ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

4. **Start the backend server**
```bash
npm run server:dev
```

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
VITE_API_URL=http://localhost:5000/api
VITE_SITE_NAME=Your Blog Name
VITE_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

4. **Start the development server**
```bash
npm run dev
```

### Quick Start (Both servers)
```bash
npm run dev
```

## 🗄️ Database Schema

### User Model
- Authentication and profile management
- Role-based permissions (admin, editor, subscriber)
- Newsletter subscription preferences
- Analytics tracking

### Post Model
- Rich content with SEO optimization
- Category and tag associations
- Performance metrics and analytics
- Affiliate link management
- Monetization settings

### Category Model
- Hierarchical structure support
- SEO optimization fields
- Display customization options

### Tag Model
- Post associations
- Usage analytics
- SEO optimization

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Token refresh
- `GET /api/auth/me` - Get current user

### Posts Management
- `GET /api/posts` - Get posts with filtering
- `GET /api/posts/:slug` - Get single post
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### SEO Tools
- `GET /api/seo/sitemap.xml` - Generate sitemap
- `POST /api/seo/analyze` - SEO analysis
- `GET /api/seo/analytics` - SEO performance data

### Affiliate Marketing
- `POST /api/affiliate/links` - Add affiliate link
- `GET /api/affiliate/analytics` - Revenue analytics
- `GET /api/affiliate/:postId/:linkIndex` - Redirect and track

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `POST /api/newsletter/send` - Send newsletter
- `GET /api/newsletter/subscribers` - Manage subscribers

## 📊 Monetization Setup

### Google AdSense Integration
1. Apply for Google AdSense approval
2. Add your AdSense client ID to environment variables
3. Configure ad placements in the frontend
4. Monitor performance through the analytics dashboard

### Affiliate Marketing
1. Join affiliate programs (Amazon Associates, etc.)
2. Create affiliate links through the admin panel
3. Track clicks and conversions
4. Monitor revenue through analytics

### Email Marketing
1. Configure SMTP settings for email sending
2. Create newsletter templates
3. Set up automated email sequences
4. Monitor subscriber growth and engagement

## 🚀 Deployment

### Using Docker

1. **Build and run with Docker Compose**
```bash
docker-compose up -d
```

### Manual Deployment

1. **Build the frontend**
```bash
cd frontend
npm run build
```

2. **Deploy to your hosting provider**
- Backend: Deploy to services like Heroku, DigitalOcean, or AWS
- Frontend: Deploy to Vercel, Netlify, or serve statically
- Database: Use MongoDB Atlas or self-hosted MongoDB

3. **Configure production environment variables**

4. **Set up SSL certificates**

5. **Configure domain and DNS**

## 📈 SEO Best Practices

### Content Optimization
- Use the built-in SEO analyzer for each post
- Optimize titles and meta descriptions
- Include relevant keywords naturally
- Add internal and external links
- Use proper heading structure (H1, H2, H3)

### Technical SEO
- Ensure fast loading times
- Optimize images with alt text
- Use semantic HTML structure
- Implement structured data
- Create XML sitemaps

### Performance Monitoring
- Monitor Core Web Vitals
- Track search rankings
- Analyze user engagement metrics
- Optimize based on analytics data

## 🔍 Analytics & Monitoring

The application includes comprehensive analytics:
- **Traffic Analytics**: Page views, unique visitors, bounce rate
- **Content Performance**: Top performing posts, engagement metrics
- **Revenue Tracking**: AdSense earnings, affiliate commissions
- **SEO Metrics**: Search rankings, click-through rates
- **User Behavior**: Session duration, page flow

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Check the [Issues](../../issues) page
- Review the documentation
- Contact the development team

## 🎯 Roadmap

- [ ] Advanced A/B testing for ad placements
- [ ] Integration with more affiliate networks
- [ ] Advanced email automation workflows
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] Advanced caching strategies
- [ ] Social media auto-posting
- [ ] Advanced user segmentation

---

Built with ❤️ for content creators and digital marketers looking to maximize their blog's potential.
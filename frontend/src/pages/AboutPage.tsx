import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'John Doe',
      role: 'Founder & CEO',
      bio: 'Passionate about creating valuable content and helping others succeed in the digital world.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      social: {
        twitter: 'https://twitter.com/johndoe',
        linkedin: 'https://linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe'
      }
    },
    {
      name: 'Jane Smith',
      role: 'Content Director',
      bio: 'Expert in content strategy and SEO optimization with over 8 years of experience.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      social: {
        twitter: 'https://twitter.com/janesmith',
        linkedin: 'https://linkedin.com/in/janesmith'
      }
    },
    {
      name: 'Mike Johnson',
      role: 'Lead Developer',
      bio: 'Full-stack developer specializing in modern web technologies and performance optimization.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      social: {
        twitter: 'https://twitter.com/mikejohnson',
        linkedin: 'https://linkedin.com/in/mikejohnson',
        github: 'https://github.com/mikejohnson'
      }
    }
  ]

  const stats = [
    { label: 'Articles Published', value: '500+' },
    { label: 'Monthly Readers', value: '50K+' },
    { label: 'Years of Experience', value: '5+' },
    { label: 'Team Members', value: '10+' }
  ]

  const values = [
    {
      title: 'Quality Content',
      description: 'We believe in creating high-quality, well-researched content that provides real value to our readers.',
      icon: '📝'
    },
    {
      title: 'Transparency',
      description: 'We maintain complete transparency in our content creation process and monetization strategies.',
      icon: '🔍'
    },
    {
      title: 'Community',
      description: 'Building a strong community of readers and creators who support and learn from each other.',
      icon: '🤝'
    },
    {
      title: 'Innovation',
      description: 'Constantly exploring new technologies and strategies to stay ahead of the curve.',
      icon: '🚀'
    }
  ]

  return (
    <>
      <Helmet>
        <title>About Us - Blog Platform | Our Story, Mission & Team</title>
        <meta 
          name="description" 
          content="Learn about our blog platform's mission to provide high-quality content, our dedicated team, and our commitment to helping readers succeed in the digital world." 
        />
        <meta name="keywords" content="about us, blog platform, team, mission, values, digital content" />
        <link rel="canonical" href="/about" />
        
        {/* Open Graph */}
        <meta property="og:title" content="About Us - Blog Platform" />
        <meta property="og:description" content="Learn about our blog platform's mission to provide high-quality content and our dedicated team." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/about" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="About Us - Blog Platform" />
        <meta name="twitter:description" content="Learn about our blog platform's mission to provide high-quality content and our dedicated team." />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-12 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                About Our Blog Platform
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 lg:mb-8 leading-relaxed">
                We're passionate about creating valuable content that helps people succeed in the digital world. 
                Our mission is to provide high-quality, well-researched articles that educate, inspire, and empower our readers.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-8 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1 lg:mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm sm:text-base text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-8 lg:py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8 lg:mb-12">
                <h2 className="text-2xl lg:text-3xl font-bold mb-3 lg:mb-4">Our Mission</h2>
                <p className="text-base lg:text-lg text-muted-foreground">
                  To create a platform where knowledge meets opportunity, helping readers and creators thrive in the digital age.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                <div>
                  <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">What We Do</h3>
                  <p className="text-muted-foreground mb-4">
                    We publish high-quality articles on web development, SEO, digital marketing, and technology trends. 
                    Our content is designed to be both educational and practical, providing real value to our readers.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Through our platform, we connect creators with audiences, share knowledge, and build a community 
                    of people passionate about technology and digital success.
                  </p>
                  <Button asChild>
                    <Link to="/posts">Explore Our Content</Link>
                  </Button>
                </div>

                <div>
                  <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">Our Approach</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start space-x-3">
                      <span className="text-primary font-bold">✓</span>
                      <span>Thorough research and fact-checking for every article</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-primary font-bold">✓</span>
                      <span>Practical, actionable advice that readers can implement</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-primary font-bold">✓</span>
                      <span>Regular updates to keep content current and relevant</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-primary font-bold">✓</span>
                      <span>Community engagement and reader feedback integration</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-8 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 lg:mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold mb-3 lg:mb-4">Our Values</h2>
              <p className="text-base lg:text-lg text-muted-foreground">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="text-4xl mb-4">{value.icon}</div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-8 lg:py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 lg:mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold mb-3 lg:mb-4">Meet Our Team</h2>
              <p className="text-base lg:text-lg text-muted-foreground">
                The passionate people behind our content
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {teamMembers.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-24 h-24 mx-auto mb-4">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription className="text-primary font-medium">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {member.bio}
                    </p>
                    <div className="flex justify-center space-x-3">
                      {Object.entries(member.social).map(([platform, url]) => (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <span className="capitalize">{platform}</span>
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-8 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8 lg:mb-12">
                <h2 className="text-2xl lg:text-3xl font-bold mb-3 lg:mb-4">Our Story</h2>
                <p className="text-base lg:text-lg text-muted-foreground">
                  How we started and where we're going
                </p>
              </div>

              <div className="prose prose-lg max-w-none">
                <p>
                  Our journey began in 2019 when we recognized a gap in the market for high-quality, 
                  practical content about web development and digital marketing. What started as a 
                  small blog has grown into a comprehensive platform serving thousands of readers monthly.
                </p>
                
                <p>
                  Over the years, we've evolved from a simple blog to a full-featured content platform, 
                  incorporating advanced SEO strategies, monetization techniques, and community features. 
                  Our commitment to quality and reader value has remained constant throughout this growth.
                </p>

                <p>
                  Today, we're proud to serve a diverse community of developers, marketers, entrepreneurs, 
                  and digital enthusiasts. Our platform continues to grow, and we're excited about the 
                  future opportunities to serve our readers even better.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-8 lg:py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold mb-3 lg:mb-4">Join Our Community</h2>
              <p className="text-base lg:text-lg mb-6 lg:mb-8 opacity-90">
                Subscribe to our newsletter and stay updated with the latest articles, tips, and insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center">
                <Button variant="secondary" size="lg" asChild>
                  <Link to="/posts">Explore Articles</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/contact">Get in Touch</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default AboutPage

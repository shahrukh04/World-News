import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { User, Globe, Newspaper, Target } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About World News</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your trusted source for global news and current affairs
          </p>
        </div>

        {/* Mission Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6 text-blue-600" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              World News is dedicated to providing accurate, timely, and comprehensive news coverage 
              from around the globe. We believe in the power of informed citizens and strive to deliver 
              unbiased reporting that helps our readers understand the world around them.
            </p>
          </CardContent>
        </Card>

        {/* What We Offer */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Newspaper className="h-6 w-6 text-green-600" />
              What We Offer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Breaking News</h3>
                <p className="text-gray-600">
                  Real-time updates on major events happening worldwide
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Category Coverage</h3>
                <p className="text-gray-600">
                  Business, Technology, Sports, Entertainment, Health, and more
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Global Perspective</h3>
                <p className="text-gray-600">
                  News from multiple international sources and viewpoints
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">User-Friendly Interface</h3>
                <p className="text-gray-600">
                  Clean, modern design for easy reading and navigation
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About the Founder */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-6 w-6 text-purple-600" />
              About the Founder
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h3 className="font-semibold text-xl mb-3">Shahrukh</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  World News was founded by Shahrukh, a passionate developer and news enthusiast 
                  who recognized the need for a reliable, user-friendly platform to access global news. 
                  With a background in technology and a keen interest in current affairs, Shahrukh 
                  created this platform to bridge the gap between complex news sources and everyday readers.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The vision behind World News is to democratize access to information and create 
                  an informed global community that can make better decisions based on accurate, 
                  timely news coverage.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Our Values */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-6 w-6 text-orange-600" />
              Our Values
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="font-semibold text-lg mb-2">Accuracy</h3>
                <p className="text-gray-600">
                  We prioritize factual reporting and verify information from multiple sources
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg mb-2">Transparency</h3>
                <p className="text-gray-600">
                  Clear sourcing and honest reporting without hidden agendas
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg mb-2">Accessibility</h3>
                <p className="text-gray-600">
                  Making news accessible to everyone, regardless of background or location
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Get in Touch</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              We value your feedback and suggestions. If you have any questions, comments, 
              or would like to contribute to our platform, please don't hesitate to reach out.
            </p>
            <div className="space-y-2">
              <p className="text-gray-600">
                <strong>Website:</strong> <span className="text-blue-600">www.worldnew.in</span>
              </p>
              <p className="text-gray-600">
                <strong>Founded:</strong> 2024
              </p>
              <p className="text-gray-600">
                <strong>Headquarters:</strong> India
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
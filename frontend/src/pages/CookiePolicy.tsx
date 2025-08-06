import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Cookie, Settings, Eye, Shield, Info } from 'lucide-react';

const CookiePolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
          <p className="text-lg text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* What Are Cookies */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cookie className="h-6 w-6 text-orange-600" />
              What Are Cookies?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed mb-3">
              Cookies are small text files that are placed on your computer or mobile device when you visit 
              a website. They are widely used to make websites work more efficiently and to provide information 
              to website owners about how users interact with their sites.
            </p>
            <p className="text-gray-700 leading-relaxed">
              World News uses cookies to enhance your browsing experience, analyze site traffic, personalize 
              content, and serve relevant advertisements. This Cookie Policy explains what cookies are, how 
              we use them, and how you can manage your cookie preferences.
            </p>
          </CardContent>
        </Card>

        {/* Types of Cookies */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-6 w-6 text-blue-600" />
              Types of Cookies We Use
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2 text-green-700">1. Essential Cookies</h3>
              <p className="text-gray-700 mb-2">
                These cookies are necessary for the website to function properly. They enable basic functions 
                like page navigation, access to secure areas, and remembering your preferences.
              </p>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>Examples:</strong> Session management, security tokens, user authentication
                </p>
                <p className="text-sm text-green-800">
                  <strong>Duration:</strong> Session cookies (deleted when you close your browser)
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2 text-blue-700">2. Analytics Cookies</h3>
              <p className="text-gray-700 mb-2">
                These cookies help us understand how visitors interact with our website by collecting and 
                reporting information anonymously. We use Google Analytics to analyze website traffic and usage patterns.
              </p>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Examples:</strong> Page views, time spent on site, bounce rate, traffic sources
                </p>
                <p className="text-sm text-blue-800">
                  <strong>Duration:</strong> Up to 2 years
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2 text-purple-700">3. Advertising Cookies</h3>
              <p className="text-gray-700 mb-2">
                These cookies are used to deliver advertisements that are relevant to you and your interests. 
                They also help measure the effectiveness of advertising campaigns.
              </p>
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="text-sm text-purple-800">
                  <strong>Examples:</strong> Google AdSense, personalized ads, ad frequency capping
                </p>
                <p className="text-sm text-purple-800">
                  <strong>Duration:</strong> Up to 2 years
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2 text-orange-700">4. Functional Cookies</h3>
              <p className="text-gray-700 mb-2">
                These cookies enable enhanced functionality and personalization, such as remembering your 
                preferences, language settings, and customized content.
              </p>
              <div className="bg-orange-50 p-3 rounded-lg">
                <p className="text-sm text-orange-800">
                  <strong>Examples:</strong> Language preferences, theme settings, personalized content
                </p>
                <p className="text-sm text-orange-800">
                  <strong>Duration:</strong> Up to 1 year
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Third-Party Cookies */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-6 w-6 text-red-600" />
              Third-Party Cookies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Google Analytics</h3>
              <p className="text-gray-700 mb-2">
                We use Google Analytics to analyze website traffic and user behavior. Google Analytics uses 
                cookies to collect information about how you use our website.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Tracks page views, sessions, and user interactions</li>
                <li>Provides insights into website performance and user preferences</li>
                <li>Helps us improve our content and user experience</li>
              </ul>
              <p className="text-sm text-gray-600 mt-2">
                Learn more: <a href="https://policies.google.com/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Google AdSense</h3>
              <p className="text-gray-700 mb-2">
                We use Google AdSense to display advertisements on our website. AdSense uses cookies to 
                serve ads based on your interests and previous visits to our site and other websites.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Delivers personalized advertisements</li>
                <li>Measures ad performance and effectiveness</li>
                <li>Prevents the same ad from being shown too frequently</li>
              </ul>
              <p className="text-sm text-gray-600 mt-2">
                Learn more: <a href="https://policies.google.com/technologies/ads" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google Ads Privacy</a>
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Social Media Cookies</h3>
              <p className="text-gray-700">
                If you share content from our website on social media platforms, these platforms may set 
                their own cookies. We do not control these cookies.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Managing Cookies */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-6 w-6 text-gray-600" />
              Managing Your Cookie Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Browser Settings</h3>
              <p className="text-gray-700 mb-3">
                You can control and manage cookies through your browser settings. Most browsers allow you to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>View what cookies are stored on your device</li>
                <li>Delete cookies individually or all at once</li>
                <li>Block cookies from specific websites</li>
                <li>Block all cookies from being set</li>
                <li>Set preferences for cookie acceptance</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Browser-Specific Instructions</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium mb-1">Google Chrome</h4>
                  <p className="text-sm text-gray-600">Settings → Privacy and Security → Cookies and other site data</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium mb-1">Mozilla Firefox</h4>
                  <p className="text-sm text-gray-600">Options → Privacy & Security → Cookies and Site Data</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium mb-1">Safari</h4>
                  <p className="text-sm text-gray-600">Preferences → Privacy → Manage Website Data</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium mb-1">Microsoft Edge</h4>
                  <p className="text-sm text-gray-600">Settings → Cookies and site permissions → Cookies and site data</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Opt-Out Options</h3>
              <p className="text-gray-700 mb-2">
                You can opt out of personalized advertising from Google and other advertising networks:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>
                  <a href="https://adssettings.google.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    Google Ads Settings
                  </a> - Manage your Google ad preferences
                </li>
                <li>
                  <a href="https://optout.networkadvertising.org" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    NAI Opt-Out
                  </a> - Opt out of network advertising
                </li>
                <li>
                  <a href="https://optout.aboutads.info" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    DAA Opt-Out
                  </a> - Digital Advertising Alliance opt-out
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Impact of Disabling Cookies */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-yellow-600" />
              Impact of Disabling Cookies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-3">
              While you can disable cookies, please note that doing so may affect your experience on our website:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Some features may not work properly or at all</li>
              <li>You may need to re-enter information more frequently</li>
              <li>Personalized content and recommendations may not be available</li>
              <li>Advertisements may be less relevant to your interests</li>
              <li>Website analytics may be less accurate</li>
            </ul>
            <p className="text-gray-700 mt-3">
              Essential cookies cannot be disabled as they are necessary for the website to function properly.
            </p>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Your Rights and Choices</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-3">
              Under applicable privacy laws, you may have the following rights regarding cookies:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Right to be informed about cookie usage</li>
              <li>Right to consent to non-essential cookies</li>
              <li>Right to withdraw consent at any time</li>
              <li>Right to access information about cookies stored on your device</li>
              <li>Right to request deletion of cookies</li>
            </ul>
            <p className="text-gray-700 mt-3">
              To exercise these rights or if you have questions about our cookie practices, please contact us 
              using the information provided below.
            </p>
          </CardContent>
        </Card>

        {/* Updates to Cookie Policy */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Updates to This Cookie Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              We may update this Cookie Policy from time to time to reflect changes in our practices, 
              technology, legal requirements, or other factors. We will notify you of any material changes 
              by posting the updated policy on our website and updating the "Last updated" date.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Cookie Policy or our use of cookies, please contact us:
            </p>
            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> privacy@worldnew.in</p>
              <p><strong>Website:</strong> www.worldnew.in</p>
              <p><strong>Address:</strong> World News, India</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CookiePolicy;
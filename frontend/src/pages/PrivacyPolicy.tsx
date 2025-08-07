import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';                       
import { Shield, Eye, Cookie, Database, Mail } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-blue-600" />
              Introduction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              World News ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
              explains how we collect, use, disclose, and safeguard your information when you visit our website 
              www.worldnew.in (the "Service"). Please read this privacy policy carefully. If you do not agree 
              with the terms of this privacy policy, please do not access the site.
            </p>
          </CardContent>
        </Card>

        {/* Information We Collect */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-6 w-6 text-green-600" />
              Information We Collect
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Personal Information</h3>
              <p className="text-gray-700 mb-2">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Register for an account</li>
                <li>Subscribe to our newsletter</li>
                <li>Contact us through our contact form</li>
                <li>Participate in surveys or promotions</li>
                <li>Leave comments or feedback</li>
              </ul>
              <p className="text-gray-700 mt-2">
                This information may include: name, email address, phone number, and any other information you choose to provide.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Automatically Collected Information</h3>
              <p className="text-gray-700 mb-2">
                When you visit our website, we automatically collect certain information about your device, including:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Referring website</li>
                <li>Pages viewed and time spent on pages</li>
                <li>Date and time of visit</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* How We Use Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-6 w-6 text-purple-600" />
              How We Use Your Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-3">
              We use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Providing and maintaining our service</li>
              <li>Improving user experience and website functionality</li>
              <li>Sending newsletters and updates (with your consent)</li>
              <li>Responding to your inquiries and customer service requests</li>
              <li>Analyzing website usage and trends</li>
              <li>Preventing fraud and ensuring website security</li>
              <li>Complying with legal obligations</li>
              <li>Displaying personalized advertisements</li>
            </ul>
          </CardContent>
        </Card>

        {/* Cookies and Tracking */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cookie className="h-6 w-6 text-orange-600" />
              Cookies and Tracking Technologies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">What Are Cookies</h3>
              <p className="text-gray-700">
                Cookies are small data files stored on your device when you visit our website. We use cookies 
                to enhance your browsing experience, analyze site traffic, and serve personalized content and advertisements.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Types of Cookies We Use</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                <li><strong>Advertising Cookies:</strong> Used to display relevant advertisements</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Managing Cookies</h3>
              <p className="text-gray-700">
                You can control cookies through your browser settings. However, disabling certain cookies 
                may affect the functionality of our website.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Third-Party Services */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Third-Party Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Google AdSense</h3>
              <p className="text-gray-700">
                We use Google AdSense to display advertisements on our website. Google may use cookies 
                and other tracking technologies to serve ads based on your interests. You can opt out of 
                personalized advertising by visiting Google's Ads Settings.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Google Analytics</h3>
              <p className="text-gray-700">
                We use Google Analytics to analyze website traffic and user behavior. Google Analytics 
                collects information anonymously and reports website trends without identifying individual visitors.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Social Media</h3>
              <p className="text-gray-700">
                Our website may contain links to social media platforms. These platforms have their own 
                privacy policies, and we are not responsible for their practices.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Data Security */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Data Security</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              We implement appropriate technical and organizational security measures to protect your personal 
              information against unauthorized access, alteration, disclosure, or destruction. However, no 
              method of transmission over the internet or electronic storage is 100% secure, and we cannot 
              guarantee absolute security.
            </p>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Your Privacy Rights</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-3">
              Depending on your location, you may have the following rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Right to access your personal information</li>
              <li>Right to correct inaccurate information</li>
              <li>Right to delete your personal information</li>
              <li>Right to restrict processing of your information</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
              <li>Right to withdraw consent</li>
            </ul>
            <p className="text-gray-700 mt-3">
              To exercise these rights, please contact us using the information provided below.
            </p>
          </CardContent>
        </Card>

        {/* Children's Privacy */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Children's Privacy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Our service is not intended for children under the age of 13. We do not knowingly collect 
              personal information from children under 13. If you are a parent or guardian and believe 
              your child has provided us with personal information, please contact us immediately.
            </p>
          </CardContent>
        </Card>

        {/* Changes to Privacy Policy */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Changes to This Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time. We will notify you of any changes by 
              posting the new Privacy Policy on this page and updating the "Last updated" date. You are 
              advised to review this Privacy Policy periodically for any changes.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-6 w-6 text-blue-600" />
              Contact Us
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy or our privacy practices, please contact us:
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

export default PrivacyPolicy;
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { FileText, Scale, AlertTriangle, Users, Shield } from 'lucide-react';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-600" />
              Agreement to Terms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              These Terms of Service ("Terms") govern your use of the World News website located at 
              www.worldnew.in (the "Service") operated by Shahrukh ("us", "we", or "our"). By accessing 
              or using our Service, you agree to be bound by these Terms. If you disagree with any part 
              of these terms, then you may not access the Service.
            </p>
          </CardContent>
        </Card>

        {/* Acceptance of Terms */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-6 w-6 text-green-600" />
              Acceptance of Terms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed mb-3">
              By accessing and using this website, you accept and agree to be bound by the terms and 
              provision of this agreement. Additionally, when using this website's particular services, 
              you shall be subject to any posted guidelines or rules applicable to such services.
            </p>
            <p className="text-gray-700 leading-relaxed">
              If you do not agree to abide by the above, please do not use this service.
            </p>
          </CardContent>
        </Card>

        {/* Use License */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Use License</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Permission is granted to temporarily download one copy of the materials on World News for personal, non-commercial transitory viewing only.</h3>
              <p className="text-gray-700 mb-3">This is the grant of a license, not a transfer of title, and under this license you may not:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>modify or copy the materials</li>
                <li>use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
                <li>attempt to decompile or reverse engineer any software contained on the website</li>
                <li>remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </div>
            <p className="text-gray-700">
              This license shall automatically terminate if you violate any of these restrictions and may be 
              terminated by us at any time. Upon terminating your viewing of these materials or upon the 
              termination of this license, you must destroy any downloaded materials in your possession 
              whether in electronic or printed format.
            </p>
          </CardContent>
        </Card>

        {/* User Accounts */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6 text-purple-600" />
              User Accounts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Account Creation</h3>
              <p className="text-gray-700">
                When you create an account with us, you must provide information that is accurate, complete, 
                and current at all times. You are responsible for safeguarding the password and for all 
                activities that occur under your account.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Account Responsibilities</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>You must be at least 13 years old to create an account</li>
                <li>You are responsible for maintaining the confidentiality of your account</li>
                <li>You agree to notify us immediately of any unauthorized use of your account</li>
                <li>We reserve the right to terminate accounts that violate these terms</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Prohibited Uses */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              Prohibited Uses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-3">
              You may not use our Service:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
              <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>To submit false or misleading information</li>
              <li>To upload or transmit viruses or any other type of malicious code</li>
              <li>To collect or track the personal information of others</li>
              <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
              <li>For any obscene or immoral purpose</li>
              <li>To interfere with or circumvent the security features of the Service</li>
            </ul>
          </CardContent>
        </Card>

        {/* Content */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Our Content</h3>
              <p className="text-gray-700">
                The Service and its original content, features, and functionality are and will remain the 
                exclusive property of World News and its licensors. The Service is protected by copyright, 
                trademark, and other laws.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">User Content</h3>
              <p className="text-gray-700">
                Our Service may allow you to post, link, store, share and otherwise make available certain 
                information, text, graphics, videos, or other material ("Content"). You are responsible for 
                Content that you post to the Service, including its legality, reliability, and appropriateness.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Content Guidelines</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Content must not be illegal, harmful, threatening, abusive, or offensive</li>
                <li>Content must not infringe on intellectual property rights</li>
                <li>Content must not contain spam or unauthorized advertising</li>
                <li>We reserve the right to remove any content that violates these guidelines</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Policy */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-blue-600" />
              Privacy Policy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Your privacy is important to us. Please review our Privacy Policy, which also governs your 
              use of the Service, to understand our practices. By using our Service, you agree to the 
              collection and use of information in accordance with our Privacy Policy.
            </p>
          </CardContent>
        </Card>

        {/* Advertising */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Advertising</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              World News may display advertisements and promotions from third parties. We are not responsible 
              for the availability, accuracy, or content of such advertisements. Your interactions with 
              advertisers are solely between you and the advertiser.
            </p>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Disclaimer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-3">
              The information on this website is provided on an "as is" basis. To the fullest extent 
              permitted by law, this Company:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>excludes all representations and warranties relating to this website and its contents</li>
              <li>excludes all liability for damages arising out of or in connection with your use of this website</li>
            </ul>
          </CardContent>
        </Card>

        {/* Limitations */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Limitations of Liability</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              In no event shall World News, nor its directors, employees, partners, agents, suppliers, 
              or affiliates, be liable for any indirect, incidental, special, consequential, or punitive 
              damages, including without limitation, loss of profits, data, use, goodwill, or other 
              intangible losses, resulting from your use of the Service.
            </p>
          </CardContent>
        </Card>

        {/* Termination */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Termination</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              We may terminate or suspend your account and bar access to the Service immediately, without 
              prior notice or liability, under our sole discretion, for any reason whatsoever and without 
              limitation, including but not limited to a breach of the Terms.
            </p>
          </CardContent>
        </Card>

        {/* Governing Law */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Governing Law</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              These Terms shall be interpreted and governed by the laws of India, without regard to its 
              conflict of law provisions. Our failure to enforce any right or provision of these Terms 
              will not be considered a waiver of those rights.
            </p>
          </CardContent>
        </Card>

        {/* Changes to Terms */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
              If a revision is material, we will provide at least 30 days notice prior to any new terms 
              taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> legal@worldnew.in</p>
              <p><strong>Website:</strong> www.worldnew.in</p>
              <p><strong>Address:</strong> World News, India</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfService;
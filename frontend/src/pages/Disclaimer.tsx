import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { AlertTriangle, Info, ExternalLink, Shield, FileText } from 'lucide-react';

const Disclaimer: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Disclaimer</h1>
          <p className="text-lg text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* General Disclaimer */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              General Disclaimer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              The information contained on World News website (www.worldnew.in) is for general information 
              purposes only. The information is provided by World News and while we endeavor to keep the 
              information up to date and correct, we make no representations or warranties of any kind, 
              express or implied, about the completeness, accuracy, reliability, suitability or availability 
              with respect to the website or the information, products, services, or related graphics contained 
              on the website for any purpose. Any reliance you place on such information is therefore strictly 
              at your own risk.
            </p>
          </CardContent>
        </Card>

        {/* News Content Disclaimer */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-600" />
              News Content Disclaimer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Third-Party Content</h3>
              <p className="text-gray-700">
                World News aggregates news content from various third-party sources and news agencies. 
                We do not create, edit, or verify the accuracy of the original news content. The views, 
                opinions, and factual claims expressed in the news articles are those of the original 
                authors and news organizations, not World News.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Accuracy and Timeliness</h3>
              <p className="text-gray-700">
                While we strive to provide current and accurate news information, we cannot guarantee 
                the accuracy, completeness, or timeliness of any news content displayed on our website. 
                News situations are dynamic and information may change rapidly. We recommend verifying 
                important information through multiple reliable sources.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Editorial Independence</h3>
              <p className="text-gray-700">
                World News maintains editorial independence and does not endorse any particular political 
                viewpoint, organization, or individual mentioned in the news content. Our role is to 
                provide access to diverse news sources and perspectives.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* External Links Disclaimer */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="h-6 w-6 text-green-600" />
              External Links Disclaimer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed mb-3">
              Through this website, you are able to link to other websites which are not under the control 
              of World News. We have no control over the nature, content, and availability of those sites. 
              The inclusion of any links does not necessarily imply a recommendation or endorse the views 
              expressed within them.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Every effort is made to keep the website up and running smoothly. However, World News takes 
              no responsibility for, and will not be liable for, the website being temporarily unavailable 
              due to technical issues beyond our control.
            </p>
          </CardContent>
        </Card>

        {/* Professional Advice Disclaimer */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-6 w-6 text-purple-600" />
              Professional Advice Disclaimer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Not Professional Advice</h3>
              <p className="text-gray-700">
                The information on this website is not intended as professional advice of any kind, including 
                but not limited to legal, financial, medical, or investment advice. You should not rely on 
                the information on this website as an alternative to professional advice from your attorney, 
                accountant, doctor, or other professional service provider.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Consult Professionals</h3>
              <p className="text-gray-700">
                If you have specific questions about any matter, you should consult your attorney or other 
                professional service provider. You should never delay seeking professional advice, disregard 
                professional advice, or discontinue treatment based on information on this website.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Limitation of Liability */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-orange-600" />
              Limitation of Liability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed mb-3">
              In no event will World News be liable for any loss or damage including without limitation, 
              indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss 
              of data or profits arising out of, or in connection with, the use of this website.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This includes but is not limited to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2">
              <li>Any direct, indirect, special, or consequential damages</li>
              <li>Loss of profits, revenue, or business opportunities</li>
              <li>Loss of data or information</li>
              <li>Personal injury or property damage</li>
              <li>Any damages arising from reliance on information provided</li>
            </ul>
          </CardContent>
        </Card>

        {/* Copyright Disclaimer */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Copyright and Fair Use</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Copyright Notice</h3>
              <p className="text-gray-700">
                All news content displayed on World News is the property of their respective copyright 
                holders. We respect intellectual property rights and operate under fair use principles 
                for news aggregation and commentary purposes.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">DMCA Compliance</h3>
              <p className="text-gray-700">
                If you believe that any content on our website infringes your copyright, please contact 
                us immediately with details of the alleged infringement. We will investigate and take 
                appropriate action in accordance with the Digital Millennium Copyright Act (DMCA).
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Advertising Disclaimer */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Advertising Disclaimer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Third-Party Advertisements</h3>
              <p className="text-gray-700">
                World News displays advertisements from third-party advertising networks, including Google 
                AdSense. These advertisements are not endorsements by World News. We are not responsible 
                for the content, accuracy, or opinions expressed in any advertisements.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Advertiser Responsibility</h3>
              <p className="text-gray-700">
                Advertisers are solely responsible for the content of their advertisements and any claims 
                made therein. Any interactions between you and advertisers are strictly between you and 
                the advertiser. World News is not liable for any loss or damage resulting from such interactions.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Technical Disclaimer */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Technical Disclaimer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              World News strives to ensure that the website functions properly at all times. However, 
              we cannot guarantee uninterrupted access or error-free operation. The website may experience 
              downtime, technical difficulties, or other issues beyond our control. We are not liable for 
              any inconvenience or loss resulting from such technical issues.
            </p>
          </CardContent>
        </Card>

        {/* Changes to Disclaimer */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Changes to This Disclaimer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              World News reserves the right to modify this disclaimer at any time without prior notice. 
              Changes will be effective immediately upon posting on the website. Your continued use of 
              the website after any changes constitutes acceptance of the modified disclaimer.
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
              If you have any questions about this disclaimer or need to report any issues, please contact us:
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

export default Disclaimer;
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import type { ContactForm } from '@/types'

const ContactPage = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Mock API call - replace with actual contact form submission
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simulate success
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      title: 'Email Us',
      description: 'Send us an email and we\'ll get back to you as soon as possible.',
      value: 'hello@blogplatform.com',
      icon: '📧',
      action: 'mailto:hello@blogplatform.com'
    },
    {
      title: 'Follow Us',
      description: 'Stay connected with us on social media for updates and insights.',
      value: '@blogplatform',
      icon: '📱',
      action: 'https://twitter.com/blogplatform'
    },
    {
      title: 'Office Hours',
      description: 'We\'re available Monday to Friday, 9 AM to 6 PM EST.',
      value: 'Mon-Fri, 9AM-6PM EST',
      icon: '🕒',
      action: null
    }
  ]

  const faqs = [
    {
      question: 'How can I contribute to the blog?',
      answer: 'We welcome guest contributions! Please email us with your article idea and we\'ll review it for publication.'
    },
    {
      question: 'Do you accept sponsored content?',
      answer: 'Yes, we do accept sponsored content that provides value to our readers. Please contact us for our editorial guidelines.'
    },
    {
      question: 'How can I advertise on your platform?',
      answer: 'We offer various advertising opportunities including display ads, sponsored posts, and newsletter sponsorships.'
    },
    {
      question: 'Can I republish your content?',
      answer: 'Our content is protected by copyright. Please contact us for permission to republish any of our articles.'
    }
  ]

  return (
    <>
      <Helmet>
        <title>Contact Us - Blog Platform | Get in Touch</title>
        <meta 
          name="description" 
          content="Get in touch with our team. We're here to help with questions, collaborations, advertising opportunities, and more." 
        />
        <meta name="keywords" content="contact, get in touch, support, collaboration, advertising" />
        <link rel="canonical" href="/contact" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Contact Us - Blog Platform" />
        <meta property="og:description" content="Get in touch with our team. We're here to help with questions, collaborations, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/contact" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Contact Us - Blog Platform" />
        <meta name="twitter:description" content="Get in touch with our team. We're here to help with questions, collaborations, and more." />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Get in Touch
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Have a question, suggestion, or want to collaborate? We'd love to hear from you. 
                Our team is here to help and we typically respond within 24 hours.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Send us a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-2">
                            Name *
                          </label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Email *
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-2">
                          Subject *
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          placeholder="What's this about?"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={6}
                          className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Tell us more about your inquiry..."
                        />
                      </div>

                      {submitStatus === 'success' && (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                          <p className="text-green-800">
                            Thank you for your message! We'll get back to you within 24 hours.
                          </p>
                        </div>
                      )}

                      {submitStatus === 'error' && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                          <p className="text-red-800">
                            Sorry, there was an error sending your message. Please try again or email us directly.
                          </p>
                        </div>
                      )}

                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full"
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Other Ways to Reach Us</h2>
                  <div className="space-y-4">
                    {contactInfo.map((info, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="text-2xl">{info.icon}</div>
                            <div className="flex-1">
                              <h3 className="font-semibold mb-2">{info.title}</h3>
                              <p className="text-muted-foreground mb-2">{info.description}</p>
                              {info.action ? (
                                <a
                                  href={info.action}
                                  className="text-primary hover:underline font-medium"
                                  target={info.action.startsWith('http') ? '_blank' : undefined}
                                  rel={info.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                                >
                                  {info.value}
                                </a>
                              ) : (
                                <span className="text-foreground font-medium">{info.value}</span>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Response Time */}
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="text-3xl mb-2">⏱️</div>
                      <h3 className="font-semibold mb-2">Quick Response</h3>
                      <p className="text-muted-foreground">
                        We typically respond to all inquiries within 24 hours during business days.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                <p className="text-lg text-muted-foreground">
                  Quick answers to common questions
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {faqs.map((faq, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {faq.answer}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-lg mb-8 opacity-90">
                Whether you want to contribute, advertise, or just say hello, we're here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" asChild>
                  <a href="mailto:hello@blogplatform.com">Email Us Now</a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="https://twitter.com/blogplatform" target="_blank" rel="noopener noreferrer">
                    Follow on Twitter
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default ContactPage
import { Link } from 'react-router-dom'
 import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react'
 
 const Footer = () => {
   const currentYear = new Date().getFullYear()
 
   const footerLinks = {
     company: [
       { label: 'About', href: '/about' },
       { label: 'Contact', href: '/contact' },
       { label: 'Privacy Policy', href: '/privacy-policy' },
       { label: 'Terms of Service', href: '/terms-of-service' },
       { label: 'Disclaimer', href: '/disclaimer' },
       { label: 'Cookie Policy', href: '/cookie-policy' },
     ],
     content: [
       { label: 'India News', href: '/india-news' },
       { label: 'World News', href: '/world-news' },
       { label: 'Technology', href: '/technology-news' },
       { label: 'Sports', href: '/sports-news' },
       { label: 'Health', href: '/health-news' },
       { label: 'Jobs', href: '/jobs-news' },
     ],
     social: [
       { label: 'Facebook', href: '#', icon: Facebook },
       { label: 'Twitter', href: '#', icon: Twitter },
       { label: 'Instagram', href: '#', icon: Instagram },
       { label: 'LinkedIn', href: '#', icon: Linkedin },
       { label: 'GitHub', href: '#', icon: Github },
     ],
   }
 
   return (
     <footer className="bg-secondary/10 border-t">
       <div className="container mx-auto px-4 py-12">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
           {/* Brand */}
           <div className="md:col-span-1">
             <Link to="/" className="text-2xl font-bold text-primary">
               World News
             </Link>
             <p className="mt-4 text-sm text-muted-foreground">
               Your trusted source for global news and current affairs. 
               Stay informed with breaking news, analysis, and insights from around the world.
             </p>
           </div>
 
           {/* Company Links */}
           <div>
             <h3 className="font-semibold mb-4">Company</h3>
             <ul className="space-y-2">
               {footerLinks.company.map((link) => (
                 <li key={link.href}>
                   <Link
                     to={link.href}
                     className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                   >
                     {link.label}
                   </Link>
                 </li>
               ))}
             </ul>
           </div>
 
           {/* Content Links */}
           <div>
             <h3 className="font-semibold mb-4">Content</h3>
             <ul className="space-y-2">
               {footerLinks.content.map((link) => (
                 <li key={link.href}>
                   <Link
                     to={link.href}
                     className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                   >
                     {link.label}
                   </Link>
                 </li>
               ))}
             </ul>
           </div>
 
           {/* Social Links */}
           <div>
             <h3 className="font-semibold mb-4">Follow Us</h3>
             <div className="flex space-x-4">
               {footerLinks.social.map((social) => {
                 const Icon = social.icon
                 return (
                   <a
                     key={social.label}
                     href={social.href}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-muted-foreground hover:text-foreground transition-colors"
                     aria-label={social.label}
                   >
                     <Icon className="h-5 w-5" />
                   </a>
                 )
               })}
             </div>
           </div>
         </div>
 
         {/* Bottom Bar */}
         <div className="mt-8 pt-8 border-t border-border">
           <div className="flex flex-col md:flex-row justify-between items-center">
             <p className="text-sm text-muted-foreground">
               © {currentYear} World News. All rights reserved.
             </p>
             <div className="flex items-center space-x-4 mt-4 md:mt-0">
               <span className="text-sm text-muted-foreground">
                 Built with ❤️ by Shahrukh
               </span>
             </div>
           </div>
         </div>
       </div>
     </footer>
   )
 }
 
 export default Footer
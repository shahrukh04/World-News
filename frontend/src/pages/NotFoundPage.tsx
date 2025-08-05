 import { Link } from 'react-router-dom'
 import { Helmet } from 'react-helmet-async'
 import { Button } from '@/components/ui/Button'
 
 const NotFoundPage = () => {
   return (
     <>
       <Helmet>
         <title>404 - Page Not Found | Blog Platform</title>
         <meta name="description" content="The page you're looking for doesn't exist." />
       </Helmet>
 
       <div className="min-h-screen flex items-center justify-center">
         <div className="text-center">
           <h1 className="text-6xl font-bold text-muted-foreground mb-4">404</h1>
           <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
           <p className="text-muted-foreground mb-8 max-w-md">
             The page you're looking for doesn't exist or has been moved.
           </p>
           <Button asChild>
             <Link to="/">Go Home</Link>
           </Button>
         </div>
       </div>
     </>
   )
 }
 
 export default NotFoundPage
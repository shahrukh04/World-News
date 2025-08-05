import React from 'react'
 import ReactDOM from 'react-dom/client'
 import { BrowserRouter } from 'react-router-dom'
 import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
 import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
 import { HelmetProvider } from 'react-helmet-async'
 import { Toaster } from 'sonner'
 
 import App from './App.tsx'
 import './index.css'
 import { AuthProvider } from './context/AuthContext'
 
 // Create a query client with default options
 const queryClient = new QueryClient({
   defaultOptions: {
     queries: {
       staleTime: 5 * 60 * 1000, // 5 minutes
       retry: (failureCount, error) => {
         // Don't retry on 404s or authentication errors
         if (error?.response?.status === 404 || error?.response?.status === 401) {
           return false
         }
         return failureCount < 3
       },
     },
     mutations: {
       retry: 1,
     },
   },
 })
 
 ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
     <BrowserRouter>
       <QueryClientProvider client={queryClient}>
         <HelmetProvider>
           <AuthProvider>
             <App />
           </AuthProvider>
           <Toaster 
             position="top-right"
             expand={true}
             richColors
             closeButton
           />
           <ReactQueryDevtools initialIsOpen={false} />
         </HelmetProvider>
       </QueryClientProvider>
     </BrowserRouter>
   </React.StrictMode>,
 )
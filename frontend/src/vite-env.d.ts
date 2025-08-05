 /// <reference types="vite/client" />
 
 interface ImportMetaEnv {
   readonly VITE_API_URL: string
   readonly VITE_GOOGLE_ADSENSE_CLIENT_ID: string
   readonly VITE_GOOGLE_ANALYTICS_ID: string
   readonly VITE_FACEBOOK_APP_ID: string
   readonly VITE_TWITTER_API_KEY: string
   readonly VITE_SITE_URL: string
   readonly VITE_SITE_NAME: string
   readonly VITE_CLOUDINARY_CLOUD_NAME: string
   readonly VITE_CLOUDINARY_UPLOAD_PRESET: string
 }
 
 interface ImportMeta {
   readonly env: ImportMetaEnv
 }
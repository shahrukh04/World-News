import { useState } from 'react'
 import { Link, useNavigate, useLocation } from 'react-router-dom'
 import { Search, Menu, User, Sun, Moon, Settings, Globe, MapPin, Heart, Briefcase, TrendingUp, Zap } from 'lucide-react'
 import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
 import { useAuthStore } from '../../stores/authStore'
import { useThemeStore } from '../../stores/themeStore'
import { useUIStore } from '../../stores/uiStore'
 
 const Header = () => {
   const [searchQuery, setSearchQuery] = useState('')
   const navigate = useNavigate()
   const { user, isAuthenticated, logout } = useAuthStore()
   const { theme, setTheme } = useThemeStore()
   const { toggleSidebar } = useUIStore()
 
   const handleSearch = (e: React.FormEvent) => {
     e.preventDefault()
     if (searchQuery.trim()) {
       navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
       setSearchQuery('')
     }
   }
 
   const toggleTheme = () => {
     if (theme === 'light') {
       setTheme('dark')
     } else if (theme === 'dark') {
       setTheme('system')
     } else {
       setTheme('light')
     }
   }
 
   const location = useLocation()

   const mainNavItems = [
     { label: 'Home', href: '/', icon: null },
     { label: 'World', href: '/world-news', icon: Globe },
     { label: 'India', href: '/india-news', icon: MapPin },
     { label: 'Health', href: '/health-news', icon: Heart },
     { label: 'Jobs', href: '/jobs-news', icon: Briefcase },
     { label: 'Sports', href: '/sports-news', icon: TrendingUp },
     { label: 'Technology', href: '/technology-news', icon: Zap },
   ]
 
   return (
     <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
       <div className="container mx-auto px-4">
         <div className="flex items-center justify-between h-16">
           {/* Logo and Mobile Menu */}
           <div className="flex items-center space-x-4">
             <Button
               variant="ghost"
               size="icon"
               className="md:hidden"
               onClick={toggleSidebar}
             >
               <Menu className="h-5 w-5" />
             </Button>
             
             <Link to="/" className="flex items-center space-x-1 sm:space-x-2">
               <div className="bg-red-600 text-white px-2 sm:px-3 py-1 rounded font-bold text-lg sm:text-xl">
                 World
               </div>
               <span className="text-lg sm:text-xl font-bold text-gray-800">News</span>
             </Link>
           </div>
 
           {/* Desktop Navigation */}
           <nav className="hidden lg:flex items-center space-x-1">
             {mainNavItems.map((item) => {
               const isActive = location.pathname === item.href
               const Icon = item.icon
               return (
                 <Link
                   key={item.href}
                   to={item.href}
                   className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                     isActive 
                       ? 'bg-red-600 text-white' 
                       : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                   }`}
                 >
                   {Icon && <Icon className="h-4 w-4" />}
                   <span>{item.label}</span>
                 </Link>
               )
             })}
           </nav>
 
           {/* Search Bar */}
           <div className="hidden lg:block flex-1 max-w-md mx-8">
             <form onSubmit={handleSearch} className="relative">
               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
               <Input
                 type="search"
                 placeholder="Search news..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="pl-10 pr-4 border-gray-300 focus:border-red-500 focus:ring-red-500"
               />
             </form>
           </div>
 
           {/* Right Side Actions */}
           <div className="flex items-center space-x-2">
             {/* Mobile Search */}
             <Button variant="ghost" size="icon" className="lg:hidden">
               <Search className="h-5 w-5" />
             </Button>
 
             {/* Theme Toggle */}
             <Button variant="ghost" size="icon" onClick={toggleTheme}>
               {theme === 'dark' ? (
                 <Sun className="h-5 w-5" />
               ) : (
                 <Moon className="h-5 w-5" />
               )}
             </Button>
 
             {/* User Menu */}
             {isAuthenticated ? (
               <div className="flex items-center space-x-2">
                 {user?.role === 'admin' || user?.role === 'editor' ? (
                   <Button variant="ghost" size="sm" asChild>
                     <Link to="/admin">Dashboard</Link>
                   </Button>
                 ) : null}
                 
                 <div className="relative group">
                   <Button variant="ghost" size="icon">
                     {user?.avatar ? (
                       <img
                         src={user.avatar}
                         alt={user.firstName}
                         className="h-8 w-8 rounded-full"
                       />
                     ) : (
                       <User className="h-5 w-5" />
                     )}
                   </Button>
                   
                   {/* Dropdown Menu */}
                   <div className="absolute right-0 top-full mt-2 w-48 bg-popover border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                     <div className="p-2">
                       <div className="px-2 py-1 text-sm font-medium">
                         {user?.firstName} {user?.lastName}
                       </div>
                       <div className="px-2 py-1 text-xs text-muted-foreground">
                         {user?.email}
                       </div>
                     </div>
                     <div className="border-t">
                       <Link
                         to="/profile"
                         className="block px-4 py-2 text-sm hover:bg-accent"
                       >
                         Profile
                       </Link>
                       <Link
                         to="/settings"
                         className="block px-4 py-2 text-sm hover:bg-accent"
                       >
                         Settings
                       </Link>
                       <button
                         onClick={logout}
                         className="block w-full text-left px-4 py-2 text-sm hover:bg-accent"
                       >
                         Sign Out
                       </button>
                     </div>
                   </div>
                 </div>
               </div>
             ) : (
               <div className="flex items-center space-x-1 sm:space-x-2">
                 <Button variant="ghost" size="sm" asChild className="text-xs sm:text-sm px-2 sm:px-3">
                   <Link to="/login">Sign In</Link>
                 </Button>
                 <Button size="sm" asChild className="text-xs sm:text-sm px-2 sm:px-3">
                   <Link to="/register">Sign Up</Link>
                 </Button>
               </div>
             )}
           </div>
         </div>
 
         {/* Mobile Navigation */}
         <div className="lg:hidden border-t border-gray-200 mt-4 pt-4">
           <nav className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
             {mainNavItems.map((item) => {
               const isActive = location.pathname === item.href
               const Icon = item.icon
               return (
                 <Link
                   key={item.href}
                   to={item.href}
                   className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                     isActive 
                       ? 'bg-red-600 text-white' 
                       : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                   }`}
                 >
                   {Icon && <Icon className="h-4 w-4" />}
                   <span>{item.label}</span>
                 </Link>
               )
             })}
           </nav>
           
           {/* Mobile Search Bar */}
           <form onSubmit={handleSearch} className="relative">
             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
             <Input
               type="search"
               placeholder="Search news..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="pl-10 pr-4 border-gray-300 focus:border-red-500 focus:ring-red-500"
             />
           </form>
         </div>
       </div>
     </header>
   )
 }
 
 export default Header
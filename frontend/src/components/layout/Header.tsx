import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Search, Menu, Sun, Moon, User, X } from 'lucide-react'
import { useAuthStore } from '../../stores/authStore'
import { useThemeStore } from '../../stores/themeStore'

const NAV_ITEMS = [
  { label: 'World', href: '/world-news' },
  { label: 'India', href: '/india-news' },
  { label: 'Health', href: '/health-news' },
  { label: 'Sports', href: '/sports-news' },
  { label: 'Technology', href: '/technology-news' },
  { label: 'Business', href: '/ipo-news' },
]

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const { user, isAuthenticated, logout } = useAuthStore()
  const { theme, setTheme } = useThemeStore()

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  const onSearch = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setSearchOpen(false)
    }
  }

  const isActive = (href: string) => location.pathname === href

  return (
    <>
      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top row: Logo + Search + Theme */}
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-1 flex-shrink-0">
              <div className="bg-red-600 text-white px-2 py-1 rounded font-black text-xl">W</div>
              <span className="font-black text-xl text-gray-900">WORLD NEWS</span>
            </Link>

            {/* Center: Search (desktop) */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <form onSubmit={onSearch} className="w-full relative">
                <input
                  type="text"
                  placeholder="Search news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-600"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Search className="h-4 w-4 text-gray-500" />
                </button>
              </form>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
              <button
                aria-label="Search mobile"
                onClick={() => setSearchOpen(!searchOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded"
              >
                <Search className="h-5 w-5 text-gray-700" />
              </button>

              <button aria-label="Toggle theme" onClick={toggleTheme} className="p-2 hover:bg-gray-100 rounded">
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5 text-gray-700" />}
              </button>

              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <Link to="/admin" className="hidden sm:inline-block text-xs font-semibold px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700">
                    Dashboard
                  </Link>
                  <button onClick={() => setMenuOpen(true)} className="lg:hidden p-2 hover:bg-gray-100 rounded">
                    <Menu className="h-5 w-5 text-gray-700" />
                  </button>
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user?.firstName || 'User'} className="h-8 w-8 rounded-full object-cover" />
                  ) : (
                    <User className="h-5 w-5 text-gray-700" />
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button onClick={() => setMenuOpen(true)} className="lg:hidden p-2 hover:bg-gray-100 rounded">
                    <Menu className="h-5 w-5 text-gray-700" />
                  </button>
                  <Link to="/login" className="hidden sm:inline-block text-xs font-semibold text-gray-700 hover:text-red-600">
                    Sign in
                  </Link>
                  <Link to="/register" className="hidden sm:inline-block text-xs font-semibold px-4 py-1.5 bg-red-600 text-white rounded hover:bg-red-700">
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Bar */}
          <nav className="hidden lg:flex items-center gap-0.5 border-t border-gray-200 h-12">
            <Link
              to="/"
              className={`px-4 h-full flex items-center border-b-2 text-sm font-semibold whitespace-nowrap transition-colors ${
                location.pathname === '/'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-600 hover:text-red-600 hover:border-red-200'
              }`}
            >
              Home
            </Link>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`px-4 h-full flex items-center border-b-2 text-sm font-semibold whitespace-nowrap transition-colors ${
                  isActive(item.href)
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-600 hover:text-red-600 hover:border-red-200'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Search (if searchOpen) */}
      {searchOpen && (
        <div className="md:hidden bg-gray-50 border-b border-gray-200 p-4">
          <form onSubmit={onSearch} className="relative">
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-white rounded-lg text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600"
              autoFocus
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
              <Search className="h-4 w-4 text-gray-500" />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/40" onClick={() => setMenuOpen(false)} />

          {/* Menu Panel */}
          <div className="fixed right-0 top-0 bottom-0 w-64 bg-white shadow-lg overflow-y-auto">
            <div className="p-4">
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="mt-8 space-y-1">
                <Link
                  to="/"
                  className="block px-4 py-2 text-gray-900 font-semibold hover:bg-gray-100 rounded"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`block px-4 py-2 font-semibold rounded transition-colors ${
                      isActive(item.href)
                        ? 'bg-red-100 text-red-600'
                        : 'text-gray-900 hover:bg-gray-100'
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                {!isAuthenticated && (
                  <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-center text-gray-900 font-semibold hover:bg-gray-100 rounded"
                      onClick={() => setMenuOpen(false)}
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-2 text-center bg-red-600 text-white font-semibold rounded hover:bg-red-700"
                      onClick={() => setMenuOpen(false)}
                    >
                      Sign up
                    </Link>
                  </div>
                )}

                {isAuthenticated && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-center bg-red-600 text-white font-semibold rounded hover:bg-red-700"
                      onClick={() => setMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        logout()
                        setMenuOpen(false)
                      }}
                      className="w-full mt-2 px-4 py-2 text-center text-gray-900 font-semibold hover:bg-gray-100 rounded"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
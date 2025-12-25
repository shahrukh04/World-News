import { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  FolderOpen, 
  Tag, 
  Users, 
  BarChart3, 
  Search, 
  Mail, 
  DollarSign, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell,
  ChevronDown,
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { toast } from 'sonner';

// Reusable navigation link component
const NavLink = ({ item }: { item: any }) => (
  <Link
    to={item.href}
    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
      item.current
        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-white'
        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700/50 dark:hover:text-white'
    }`}
  >
    <item.icon
      className={`mr-3 h-5 w-5 transition-colors ${
        item.current
          ? 'text-blue-600 dark:text-blue-400'
          : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300'
      }`}
    />
    <span className="flex-1">{item.name}</span>
    {item.badge && (
      <Badge variant={item.current ? 'default' : 'secondary'} className="ml-auto text-xs">
        {item.badge}
      </Badge>
    )}
  </Link>
);

// Main Layout Component
const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Define navigation items
  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Posts', href: '/admin/posts', icon: FileText, badge: '156' },
    { name: 'Categories', href: '/admin/categories', icon: FolderOpen, badge: '12' },
    { name: 'Tags', href: '/admin/tags', icon: Tag, badge: '45' },
    { name: 'Users', href: '/admin/users', icon: Users, badge: '2.5k' },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'SEO Tools', href: '/admin/seo', icon: Search },
    { name: 'Newsletter', href: '/admin/newsletter', icon: Mail, badge: '1.2k' },
    { name: 'Affiliate Marketing', href: '/admin/affiliate', icon: DollarSign },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ].map(item => ({
    ...item,
    current: location.pathname === item.href || (item.href !== '/admin' && location.pathname.startsWith(item.href)),
  }));

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Successfully logged out');
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Sidebar Header */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 px-6 dark:border-gray-700">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
            <span className="text-sm font-bold text-white">B</span>
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">Blog Admin</span>
        </Link>
        <button
          onClick={() => setSidebarOpen(false)}
          className="rounded-md p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 lg:hidden"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-1">
          {navigation.map((item) => <NavLink key={item.name} item={item} />)}
        </div>
      </nav>

      {/* User section */}
      <div className="border-t border-gray-200 p-4 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
            <span className="text-sm font-medium text-white">
              {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="truncate text-xs capitalize text-gray-500 dark:text-gray-400">
              {user?.role}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
            <LogOut className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Static Sidebar for Desktop */}
      <div className="hidden w-64 bg-white dark:bg-gray-800 lg:block">
        <SidebarContent />
      </div>
      
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 ease-in-out lg:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white/75 px-4 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/75 sm:px-6 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-md p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          {/* Breadcrumb or other header content can go here */}
          <div className="flex-1" />

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <ChevronDown className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Stethoscope, 
  FileText, 
  Settings, 
  LogOut,
  Home,
  Mail,
  Menu,
  X,
  Pill
} from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { useState } from 'react';

export function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard' },
    { path: '/admin/home', icon: <Home className="w-5 h-5" />, label: 'Home Page' },
    { path: '/admin/doctors', icon: <Users className="w-5 h-5" />, label: 'Doctors' },
    { path: '/admin/services', icon: <Stethoscope className="w-5 h-5" />, label: 'Services' },
    { path: '/admin/pharmacy', icon: <Pill className="w-5 h-5" />, label: 'Pharmacy' },
    { path: '/admin/blog', icon: <FileText className="w-5 h-5" />, label: 'Blog Posts' },
    { path: '/admin/contacts', icon: <Mail className="w-5 h-5" />, label: 'Contact Submissions' },
    { path: '/admin/settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white p-2 rounded-lg shadow-lg border border-gray-200"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-40
        transform transition-transform duration-300 lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-bold">AH</span>
            </div>
            <div>
              <div className="font-semibold text-gray-900">Admin Panel</div>
              <div className="text-xs text-gray-500">Al Hayat Medical</div>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                ${isActive(item.path) 
                  ? 'bg-green-50 text-brand' 
                  : 'text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

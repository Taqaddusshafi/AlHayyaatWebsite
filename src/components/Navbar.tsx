import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/doctors', label: 'Doctors' },
    { path: '/medicine', label: 'Pharmacy' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="border-b border-gray-100 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6 text-sm">
              <a href="tel:+1234567890" className="flex items-center gap-2 text-gray-600 hover:text-brand transition-colors">
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">+123 456 7890</span>
              </a>
              <a href="mailto:info@alhayatmedical.com" className="flex items-center gap-2 text-gray-600 hover:text-brand transition-colors">
                <Mail className="w-4 h-4" />
                <span className="hidden md:inline">info@alhayatmedical.com</span>
              </a>
              <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-brand transition-colors">
                <MapPin className="w-4 h-4" />
                <span className="hidden lg:inline">123 Medical Street, Healthcare City</span>
              </a>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-brand rounded-full animate-pulse"></div>
              <span className="text-gray-700">24/7 Emergency Services</span>
            </div>
          </div>
        </div>

        {/* Main navigation */}
        <div className="flex justify-between items-center py-5">
          <Link to="/" className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center shadow-lg" style={{ boxShadow: '0 10px 40px rgba(22, 163, 74, 0.2)' }}>
                <span className="text-white text-xl">AH</span>
              </div>
            </div>
            <div>
              <div className="text-xl text-gray-900">Al Hayat Medical</div>
              <div className="text-xs text-brand tracking-wide">HEALTHCARE COMPLEX</div>
            </div>
          </Link>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg transition-all ${
                  isActive(link.path)
                    ? 'text-brand bg-green-50'
                    : 'text-gray-700 hover:text-brand hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/contact"
              className="bg-brand text-white px-6 py-2.5 rounded-lg hover:opacity-90 transition-all shadow-lg"
              style={{ boxShadow: '0 10px 40px rgba(22, 163, 74, 0.2)' }}
            >
              Book Appointment
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-3 px-4 rounded-lg mb-1 ${
                  isActive(link.path)
                    ? 'text-brand bg-green-50'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block bg-brand text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all mt-4 text-center"
            >
              Book Appointment
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
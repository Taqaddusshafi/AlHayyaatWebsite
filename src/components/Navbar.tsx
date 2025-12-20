import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  // Dynamic data state with fallback values
  const [clinicData, setClinicData] = useState({
    name: 'Al Hayyaat Medical',
    email: 'info@alhayatmedical.com',
    phone: '+123 456 7890',
    address: '123 Medical Street, Healthcare City',
    logo_initials: 'AH'
  });

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/doctors', label: 'Doctors' },
    { path: '/medicine', label: 'Pharmacy' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Fetch clinic settings from Supabase
  useEffect(() => {
    async function fetchClinicSettings() {
      try {
        const { data, error } = await supabase
          .from('clinic_settings')
          .select('name, email, phone, address, logo_initials')
          .eq('id', 1)
          .single();

        if (error) {
          console.error('Error fetching clinic settings:', error);
          return;
        }

        if (data) {
          setClinicData({
            name: data.name || 'Al Hayyaat Medical',
            email: data.email || 'info@alhayatmedical.com',
            phone: data.phone || '+123 456 7890',
            address: data.address || '123 Medical Street, Healthcare City',
            logo_initials: data.logo_initials || 'AH'
          });
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      }
    }

    fetchClinicSettings();
  }, []);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="border-b border-gray-100 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6 text-sm">
              <a href={`tel:${clinicData.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-gray-600 hover:text-brand transition-colors">
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">{clinicData.phone}</span>
              </a>
              <a href={`mailto:${clinicData.email}`} className="flex items-center gap-2 text-gray-600 hover:text-brand transition-colors">
                <Mail className="w-4 h-4" />
                <span className="hidden md:inline">{clinicData.email}</span>
              </a>
              <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-brand transition-colors">
                <MapPin className="w-4 h-4" />
                <span className="hidden lg:inline">{clinicData.address}</span>
              </a>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-brand rounded-full animate-pulse"></div>
                <span className="text-gray-700">24/7 Emergency Services</span>
              </div>
              {/* Developer Credit - Subtle */}
              <a 
                href="https://hitechglobals.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-gray-400 hover:text-brand transition-colors hidden xl:block"
                title="Designed & Developed by HiTech Globals"
              >
                by HiTech Globals
              </a>
            </div>
          </div>
        </div>

        {/* Main navigation */}
        <div className="flex justify-between items-center py-5">
          <Link to="/" className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center shadow-lg" style={{ boxShadow: '0 10px 40px rgba(22, 163, 74, 0.2)' }}>
                <span className="text-white text-xl">{clinicData.logo_initials}</span>
              </div>
            </div>
            <div>
              <div className="text-xl text-gray-900">{clinicData.name}</div>
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
            {/* Developer Credit - Mobile */}
            <div className="text-center mt-4 pt-4 border-t border-gray-100">
              <a 
                href="https://hitechglobals.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-gray-400 hover:text-brand transition-colors"
              >
                Designed & Developed by HiTech Globals
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

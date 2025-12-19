import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export function Footer() {
  const [footerData, setFooterData] = useState({
    // Clinic Info
    name: 'Al Hayat Medical',
    logo_initials: 'AH',
    description: 'Providing comprehensive healthcare services with state-of-the-art facilities and experienced medical professionals.',
    
    // Contact Info
    address: '123 Medical Street, Healthcare City, HC 12345',
    phone: '+123 456 7890',
    email: 'info@alhayatmedical.com',
    
    // Working Hours
    weekday_hours: 'Mon - Fri: 8:00 AM - 8:00 PM',
    weekend_hours: 'Sat - Sun: 9:00 AM - 5:00 PM',
    emergency_text: 'Emergency: 24/7',
    
    // Social Media Links
    facebook_url: '#',
    twitter_url: '#',
    instagram_url: '#',
    linkedin_url: '#',
    
    // Copyright
    copyright_text: '2025 Al Hayat Medical Complex. All rights reserved.',
  });

  useEffect(() => {
    async function fetchFooterData() {
      try {
        const { data, error } = await supabase
          .from('clinic_settings')
          .select('*')
          .eq('id', 1)
          .single();

        if (error) {
          console.error('Error fetching footer data:', error);
          return;
        }

        if (data) {
          setFooterData({
            name: data.name || 'Al Hayat Medical',
            logo_initials: data.logo_initials || 'AH',
            description: data.description || footerData.description,
            address: data.address || footerData.address,
            phone: data.phone || footerData.phone,
            email: data.email || footerData.email,
            weekday_hours: data.weekday_hours || footerData.weekday_hours,
            weekend_hours: data.weekend_hours || footerData.weekend_hours,
            emergency_text: data.emergency_text || footerData.emergency_text,
            facebook_url: data.facebook_url || '#',
            twitter_url: data.twitter_url || '#',
            instagram_url: data.instagram_url || '#',
            linkedin_url: data.linkedin_url || '#',
            copyright_text: data.copyright_text || footerData.copyright_text,
          });
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      }
    }

    fetchFooterData();
  }, []);

  return (
    <footer className="bg-brand text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-brand text-xl">{footerData.logo_initials}</span>
              </div>
              <div>
                <div className="text-white text-lg">{footerData.name}</div>
                <div className="text-xs text-white tracking-wide">HEALTHCARE COMPLEX</div>
              </div>
            </div>
            <p className="text-white/80 mb-6 leading-relaxed">
              {footerData.description}
            </p>
            <div className="flex gap-4">
              {footerData.facebook_url && footerData.facebook_url !== '#' && (
                <a 
                  href={footerData.facebook_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {footerData.twitter_url && footerData.twitter_url !== '#' && (
                <a 
                  href={footerData.twitter_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {footerData.instagram_url && footerData.instagram_url !== '#' && (
                <a 
                  href={footerData.instagram_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {footerData.linkedin_url && footerData.linkedin_url !== '#' && (
                <a 
                  href={footerData.linkedin_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-green-100 hover:text-white transition-colors inline-flex items-center group">
                  <span className="w-1.5 h-1.5 bg-green-100 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-green-100 hover:text-white transition-colors inline-flex items-center group">
                  <span className="w-1.5 h-1.5 bg-green-100 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                  Services
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="text-green-100 hover:text-white transition-colors inline-flex items-center group">
                  <span className="w-1.5 h-1.5 bg-green-100 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                  Doctors
                </Link>
              </li>
              <li>
                <Link to="/medicine" className="text-green-100 hover:text-white transition-colors inline-flex items-center group">
                  <span className="w-1.5 h-1.5 bg-green-100 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                  Pharmacy
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-green-100 hover:text-white transition-colors inline-flex items-center group">
                  <span className="w-1.5 h-1.5 bg-green-100 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-green-100 hover:text-white transition-colors inline-flex items-center group">
                  <span className="w-1.5 h-1.5 bg-green-100 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white text-lg mb-6">Our Services</h3>
            <ul className="space-y-3">
              <li className="text-green-100 hover:text-white transition-colors inline-flex items-center group cursor-pointer">
                <span className="w-1.5 h-1.5 bg-green-100 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                Emergency Care
              </li>
              <li className="text-green-100 hover:text-white transition-colors inline-flex items-center group cursor-pointer">
                <span className="w-1.5 h-1.5 bg-green-100 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                Cardiology
              </li>
              <li className="text-green-100 hover:text-white transition-colors inline-flex items-center group cursor-pointer">
                <span className="w-1.5 h-1.5 bg-green-100 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                Pediatrics
              </li>
              <li className="text-green-100 hover:text-white transition-colors inline-flex items-center group cursor-pointer">
                <span className="w-1.5 h-1.5 bg-green-100 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                Surgery
              </li>
              <li className="text-green-100 hover:text-white transition-colors inline-flex items-center group cursor-pointer">
                <span className="w-1.5 h-1.5 bg-green-100 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                Laboratory
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-green-100">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{footerData.address}</span>
              </li>
              <li className="flex items-center gap-3 text-green-100 hover:text-white transition-colors">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <a href={`tel:${footerData.phone.replace(/\s/g, '')}`}>{footerData.phone}</a>
              </li>
              <li className="flex items-center gap-3 text-green-100 hover:text-white transition-colors">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a href={`mailto:${footerData.email}`}>{footerData.email}</a>
              </li>
              <li className="flex items-start gap-3 text-green-100">
                <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <div>{footerData.weekday_hours}</div>
                  <div>{footerData.weekend_hours}</div>
                  <div className="text-white mt-1">{footerData.emergency_text}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-green-100">
            <p>&copy; {footerData.copyright_text}</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

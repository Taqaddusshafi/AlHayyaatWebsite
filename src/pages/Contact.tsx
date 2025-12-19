import { Phone, Mail, MapPin, Clock, Send, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

interface ContactInfo {
  phone_primary: string;
  phone_secondary: string;
  email_primary: string;
  email_secondary: string;
  address_line1: string;
  address_line2: string;
  weekday_hours: string;
  saturday_hours: string;
  sunday_hours: string;
  emergency_number: string;
  maps_url: string;
}


export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    message: ''
  });

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone_primary: '+123 456 7890',
    phone_secondary: '+123 456 7891',
    email_primary: 'info@alhayatmedical.com',
    email_secondary: 'appointments@alhayatmedical.com',
    address_line1: '123 Medical Street',
    address_line2: 'Healthcare City, HC 12345',
    weekday_hours: '8:00 AM - 8:00 PM',
    saturday_hours: '9:00 AM - 5:00 PM',
    sunday_hours: '9:00 AM - 5:00 PM',
    emergency_number: '911',
    maps_url: 'https://maps.google.com'
  });

  const [departments, setDepartments] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Fetch contact info
        const { data: settingsData, error: settingsError } = await supabase
          .from('clinic_settings')
          .select('*')
          .eq('id', 1)
          .single();

        if (settingsError) {
          console.error('Error fetching contact info:', settingsError);
        } else if (settingsData) {
          setContactInfo({
            phone_primary: settingsData.phone || '+123 456 7890',
            phone_secondary: settingsData.phone_secondary || '+123 456 7891',
            email_primary: settingsData.email || 'info@alhayatmedical.com',
            email_secondary: settingsData.email_secondary || 'appointments@alhayatmedical.com',
            address_line1: settingsData.address || '123 Medical Street',
            address_line2: settingsData.address_line2 || 'Healthcare City, HC 12345',
            weekday_hours: settingsData.weekday_hours || '8:00 AM - 8:00 PM',
            saturday_hours: settingsData.saturday_hours || '9:00 AM - 5:00 PM',
            sunday_hours: settingsData.sunday_hours || '9:00 AM - 5:00 PM',
            emergency_number: settingsData.emergency_number || '911',
            maps_url: settingsData.maps_url || 'https://maps.google.com'
          });
        }

        // Fetch departments/services
        const { data: servicesData, error: servicesError } = await supabase
          .from('services')
          .select('title, display_order')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (servicesError) {
          console.error('Error fetching departments:', servicesError);
        } else if (servicesData) {
          setDepartments(servicesData.map(service => service.title));
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            service: formData.service,
            preferred_date: formData.date || null,
            message: formData.message,
            status: 'pending'
          }
        ]);

      if (error) {
        console.error('Error submitting form:', error);
        alert('There was an error submitting your request. Please try again or call us directly.');
      } else {
        alert('Thank you! Your appointment request has been submitted. We will contact you shortly.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          date: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('There was an error submitting your request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading contact information...</p>
        </div>
      </div>
    );
  }

  const contactCards = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      details: [contactInfo.phone_primary, contactInfo.phone_secondary],
      description: `Mon-Fri ${contactInfo.weekday_hours}`
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      details: [contactInfo.email_primary, contactInfo.email_secondary],
      description: 'We\'ll respond within 24 hours'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Location',
      details: [contactInfo.address_line1, contactInfo.address_line2],
      description: 'Free parking available'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Working Hours',
      details: [`Mon-Fri: ${contactInfo.weekday_hours}`, `Sat-Sun: ${contactInfo.saturday_hours}`],
      description: '24/7 Emergency services'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-green-50/30 py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-white text-brand px-4 py-2 rounded-full text-sm mb-6 border-2 border-brand">
              <MessageSquare className="w-4 h-4" />
              <span>We're Here to Help</span>
            </div>
            <h1 className="text-5xl lg:text-6xl mb-6 text-gray-900">Get in Touch</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Have questions or need to schedule an appointment? Our team is ready to assist you with compassionate care and professional service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactCards.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-white text-brand rounded-lg flex items-center justify-center mb-4 border-2 border-brand">
                  {info.icon}
                </div>
                <h3 className="text-lg mb-3 text-gray-900">{info.title}</h3>
                <div className="space-y-1 mb-3">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-700">{detail}</p>
                  ))}
                </div>
                <p className="text-sm text-gray-500">{info.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 lg:p-10">
                <div className="mb-8">
                  <h2 className="text-3xl mb-2 text-gray-900">Book an Appointment</h2>
                  <p className="text-gray-600">Fill out the form below and we'll get back to you shortly</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="+123 456 7890"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Preferred Date</label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Department / Service *</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select a department</option>
                      {departments.map((dept, idx) => (
                        <option key={idx} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                      placeholder="Tell us about your medical concerns or any specific requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-brand text-white px-8 py-4 rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ boxShadow: '0 10px 40px rgba(22, 163, 74, 0.2)' }}
                  >
                    <Send className="w-5 h-5" />
                    {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Sidebar Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Quick Contact */}
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-8 text-white shadow-xl shadow-green-600/20">
                <h3 className="text-2xl mb-6">Need Immediate Assistance?</h3>
                <div className="space-y-4">
                  <a href={`tel:${contactInfo.phone_primary.replace(/\s/g, '')}`} className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors">
                    <Phone className="w-5 h-5" />
                    <div>
                      <div className="text-sm opacity-90">Call Us Now</div>
                      <div className="text-lg">{contactInfo.phone_primary}</div>
                    </div>
                  </a>
                  <a href={`mailto:${contactInfo.email_primary}`} className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors">
                    <Mail className="w-5 h-5" />
                    <div>
                      <div className="text-sm opacity-90">Email Us</div>
                      <div className="text-lg">{contactInfo.email_primary}</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Emergency Notice */}
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg mb-2 text-red-900">Emergency Services</h4>
                    <p className="text-sm text-red-700 mb-3">
                      For life-threatening emergencies, please call our emergency hotline or visit our emergency department immediately.
                    </p>
                    <a href={`tel:${contactInfo.emergency_number}`} className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm">
                      <Phone className="w-4 h-4" />
                      Emergency: {contactInfo.emergency_number}
                    </a>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg text-gray-900">Business Hours</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="text-gray-900">{contactInfo.weekday_hours}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Saturday</span>
                    <span className="text-gray-900">{contactInfo.saturday_hours}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Sunday</span>
                    <span className="text-gray-900">{contactInfo.sunday_hours}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Emergency</span>
                    <span className="text-brand">24/7 Available</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-gray-900">Visit Our Facility</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Conveniently located in the heart of Healthcare City with ample parking and easy access
            </p>
          </div>
          
          <div className="bg-gray-100 rounded-2xl overflow-hidden h-96 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-brand" />
              <p className="text-lg">{contactInfo.address_line1}</p>
              <p>{contactInfo.address_line2}</p>
              <a 
                href={contactInfo.maps_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block mt-4 text-brand hover:opacity-80"
              >
                Get Directions →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

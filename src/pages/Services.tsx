import { Heart, Stethoscope, Baby, Bone, Brain, Eye, Ear, TestTube, Pill, Ambulance, Activity, Building2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect, type JSX } from 'react';
import { supabase } from '../lib/supabaseClient';

interface Service {
  id: number;
  icon_name: string;
  title: string;
  description: string;
  features: string[];
  is_active: boolean;
  display_order: number;
}

// Icon mapping object
const iconMap: { [key: string]: JSX.Element } = {
  'stethoscope': <Stethoscope className="w-8 h-8" />,
  'baby': <Baby className="w-8 h-8" />,
  'bone': <Bone className="w-8 h-8" />,
  'brain': <Brain className="w-8 h-8" />,
  'eye': <Eye className="w-8 h-8" />,
  'ear': <Ear className="w-8 h-8" />,
  'test-tube': <TestTube className="w-8 h-8" />,
  'activity': <Activity className="w-8 h-8" />,
  'pill': <Pill className="w-8 h-8" />,
  'ambulance': <Ambulance className="w-8 h-8" />,
  'heart': <Heart className="w-8 h-8" />,
  'building2': <Building2 className="w-8 h-8" />
};

export function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [contactInfo, setContactInfo] = useState({
    phone: '+123 456 7890',
    email: 'info@alhayatmedical.com'
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        // Fetch services
        const { data: servicesData, error: servicesError } = await supabase
          .from('services')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (servicesError) {
          console.error('Error fetching services:', servicesError);
        } else if (servicesData) {
          setServices(servicesData);
        }

        // Fetch contact info from clinic_settings
        const { data: settingsData, error: settingsError } = await supabase
          .from('clinic_settings')
          .select('phone, email')
          .eq('id', 1)
          .single();

        if (settingsError) {
          console.error('Error fetching contact info:', settingsError);
        } else if (settingsData) {
          setContactInfo({
            phone: settingsData.phone || '+123 456 7890',
            email: settingsData.email || 'info@alhayatmedical.com'
          });
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading our services...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="text-sm text-brand mb-4">OUR SERVICES</div>
            <h1 className="text-5xl mb-6 text-gray-900">Comprehensive Medical Services</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Our medical complex offers specialized healthcare services across multiple disciplines, delivered by experienced professionals using advanced medical technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {services.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No services available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="w-16 h-16 bg-white text-brand rounded-lg flex items-center justify-center mb-6 border-2 border-brand">
                    {iconMap[service.icon_name] || <Stethoscope className="w-8 h-8" />}
                  </div>
                  <h3 className="text-2xl mb-3 text-gray-900">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <div className="pt-6 border-t border-gray-100">
                    <div className="text-sm text-gray-500 mb-3">Services Include:</div>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-brand rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl mb-4 text-gray-900">Need Medical Assistance?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Contact us to schedule an appointment or learn more about our services
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
              className="bg-brand text-white px-8 py-4 rounded-md hover:opacity-90 transition-all"
            >
              Call: {contactInfo.phone}
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-md hover:border-gray-400 transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

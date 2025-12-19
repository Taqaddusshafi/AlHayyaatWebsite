import { Pill, ShoppingCart, Clock, Shield, Truck, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { motion } from 'motion/react';
import { useState, useEffect, type JSX } from 'react';
import { supabase } from '../lib/supabaseClient';

interface PharmacySettings {
  hero_title: string;
  hero_description: string;
  services_image_url: string;
  phone: string;
  email: string;
}

interface PharmacyFeature {
  id: number;
  icon_name: string;
  title: string;
  description: string;
  display_order: number;
}

interface MedicineCategory {
  id: number;
  icon_name: string;
  name: string;
  description: string;
  display_order: number;
}

interface PopularMedicine {
  id: number;
  category_name: string;
  items: string[];
  display_order: number;
}

interface PharmacyService {
  id: number;
  icon_name: string;
  title: string;
  description: string;
  display_order: number;
}

const iconMap: { [key: string]: JSX.Element } = {
  'clock': <Clock className="w-8 h-8" />,
  'shield': <Shield className="w-8 h-8" />,
  'truck': <Truck className="w-8 h-8" />,
  'check-circle': <CheckCircle className="w-8 h-8" />,
  'pill': <Pill className="w-6 h-6" />,
  'shopping-cart': <ShoppingCart className="w-6 h-6" />,
};

export function Medicine() {
  const [settings, setSettings] = useState<PharmacySettings>({
    hero_title: 'Pharmacy & Medicine',
    hero_description: 'Your trusted pharmacy providing quality medications and healthcare products with professional pharmaceutical care available 24/7.',
    services_image_url: 'https://images.unsplash.com/photo-1596522016734-8e6136fe5cfa?w=1080',
    phone: '+123 456 7890',
    email: 'pharmacy@alhayatmedical.com'
  });

  const [features, setFeatures] = useState<PharmacyFeature[]>([]);
  const [categories, setCategories] = useState<MedicineCategory[]>([]);
  const [popularMedicines, setPopularMedicines] = useState<PopularMedicine[]>([]);
  const [services, setServices] = useState<PharmacyService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [settingsData, featuresData, categoriesData, medicinesData, servicesData] = await Promise.all([
        supabase.from('pharmacy_settings').select('*').eq('id', 1).single(),
        supabase.from('pharmacy_features').select('*').eq('is_active', true).order('display_order'),
        supabase.from('medicine_categories').select('*').eq('is_active', true).order('display_order'),
        supabase.from('popular_medicines').select('*').eq('is_active', true).order('display_order'),
        supabase.from('pharmacy_services').select('*').eq('is_active', true).order('display_order')
      ]);

      if (settingsData.data) setSettings(settingsData.data);
      if (featuresData.data) setFeatures(featuresData.data);
      if (categoriesData.data) setCategories(categoriesData.data);
      if (medicinesData.data) setPopularMedicines(medicinesData.data);
      if (servicesData.data) setServices(servicesData.data);
    } catch (error) {
      console.error('Error fetching pharmacy data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading pharmacy...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="text-sm text-brand mb-4">PHARMACY SERVICES</div>
            <h1 className="text-5xl mb-6 text-gray-900">{settings.hero_title}</h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {settings.hero_description}
            </p>
            <div className="inline-flex items-center gap-2 bg-white text-brand px-4 py-2 rounded-full border-2 border-brand">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Open 24 Hours Daily</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white text-brand rounded-lg flex items-center justify-center mx-auto mb-4 border-2 border-brand">
                  {iconMap[feature.icon_name] || <Pill className="w-8 h-8" />}
                </div>
                <h3 className="text-lg mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-gray-900">Medication Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse our comprehensive range of medications and healthcare products
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-white text-brand rounded-lg flex items-center justify-center mb-4 border-2 border-brand">
                  {iconMap[category.icon_name] || <Pill className="w-6 h-6" />}
                </div>
                <h3 className="text-lg mb-2 text-gray-900">{category.name}</h3>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Medicines Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-gray-900">Popular Medications</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Commonly prescribed and over-the-counter medications available at our pharmacy
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularMedicines.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border border-gray-200 rounded-lg p-6"
              >
                <h3 className="text-lg mb-4 text-brand">{category.category_name}</h3>
                <ul className="space-y-2">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-600 text-sm">
                      <div className="w-1.5 h-1.5 bg-brand rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-sm text-brand mb-2">PHARMACY SERVICES</div>
              <h2 className="text-4xl mb-6 text-gray-900">Professional Pharmaceutical Care</h2>
              <div className="space-y-6">
                {services.map((service) => (
                  <div key={service.id} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white text-brand rounded-lg flex items-center justify-center flex-shrink-0 border-2 border-brand">
                      {iconMap[service.icon_name] || <Pill className="w-6 h-6" />}
                    </div>
                    <div>
                      <h3 className="text-lg mb-1 text-gray-900">{service.title}</h3>
                      <p className="text-gray-600 text-sm">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <ImageWithFallback
                src={settings.services_image_url}
                alt="Pharmacy Services"
                className="rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl mb-4 text-gray-900">Need Medication Assistance?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Contact our pharmacy for prescription refills, medication counseling, or inquiries
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={`tel:${settings.phone.replace(/\s/g, '')}`}
              className="bg-brand text-white px-8 py-4 rounded-md hover:opacity-90 transition-all"
            >
              Call Pharmacy: {settings.phone}
            </a>
            <a
              href={`mailto:${settings.email}`}
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-md hover:border-gray-400 transition-colors"
            >
              Email Pharmacy
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

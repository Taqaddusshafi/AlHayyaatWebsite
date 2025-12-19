import { Link } from 'react-router-dom';
import { Heart, Users, Clock, Award, Stethoscope, Building2, Microscope, Ambulance, ArrowRight, Phone, Shield, Star } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { motion } from 'motion/react';
import { useState, useEffect, type JSX } from 'react';
import { supabase } from '../lib/supabaseClient';

interface HomePageData {
  hero_title: string;
  hero_subtitle: string;
  hero_description: string;
  hero_image_url: string;
  about_title: string;
  about_description1: string;
  about_description2: string;
  cta_title: string;
  cta_description: string;
  stat_doctors: string;
  stat_specializations: string;
  stat_patients: string;
  stat_emergency: string;
  phone: string;
}

interface Feature {
  id: number;
  icon_name: string;
  title: string;
  description: string;
  display_order: number;
}

interface Specialization {
  id: number;
  icon_name: string;
  name: string;
  count: string;
  color: string;
  display_order: number;
}

// Icon mapping
const iconMap: { [key: string]: JSX.Element } = {
  'award': <Award className="w-6 h-6" />,
  'users': <Users className="w-6 h-6" />,
  'shield': <Shield className="w-6 h-6" />,
  'heart': <Heart className="w-6 h-6" />,
  'stethoscope': <Stethoscope className="w-8 h-8" />,
  'building2': <Building2 className="w-8 h-8" />,
  'microscope': <Microscope className="w-8 h-8" />,
  'ambulance': <Ambulance className="w-8 h-8" />
};

export function Home() {
  const [pageData, setPageData] = useState<HomePageData>({
    hero_title: 'Your Health,',
    hero_subtitle: 'Our Priority',
    hero_description: 'Experience comprehensive healthcare services delivered with compassion, expertise, and cutting-edge medical technology.',
    hero_image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1080',
    about_title: 'Trusted Healthcare Partner',
    about_description1: 'Al Hayat Medical Complex has been serving our community for over 15 years, providing comprehensive healthcare services with a commitment to excellence and compassion.',
    about_description2: 'Our state-of-the-art facility combines advanced medical technology with the expertise of our board-certified physicians to deliver exceptional patient care across all specializations.',
    cta_title: 'Ready to Take Control of Your Health?',
    cta_description: 'Schedule an appointment with our experienced medical professionals today',
    stat_doctors: '50+',
    stat_specializations: '15+',
    stat_patients: '10K+',
    stat_emergency: '24/7',
    phone: '+123 456 7890'
  });

  const [features, setFeatures] = useState<Feature[]>([]);
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHomeData() {
      try {
        setLoading(true);

        // Fetch home page settings
        const { data: homeData, error: homeError } = await supabase
          .from('home_page_settings')
          .select('*')
          .eq('id', 1)
          .single();

        if (homeError && homeError.code !== 'PGRST116') {
          console.error('Error fetching home page data:', homeError);
        } else if (homeData) {
          setPageData({
            hero_title: homeData.hero_title || pageData.hero_title,
            hero_subtitle: homeData.hero_subtitle || pageData.hero_subtitle,
            hero_description: homeData.hero_description || pageData.hero_description,
            hero_image_url: homeData.hero_image_url || pageData.hero_image_url,
            about_title: homeData.about_title || pageData.about_title,
            about_description1: homeData.about_description1 || pageData.about_description1,
            about_description2: homeData.about_description2 || pageData.about_description2,
            cta_title: homeData.cta_title || pageData.cta_title,
            cta_description: homeData.cta_description || pageData.cta_description,
            stat_doctors: homeData.stat_doctors || pageData.stat_doctors,
            stat_specializations: homeData.stat_specializations || pageData.stat_specializations,
            stat_patients: homeData.stat_patients || pageData.stat_patients,
            stat_emergency: homeData.stat_emergency || pageData.stat_emergency,
            phone: homeData.phone || pageData.phone
          });
        }

        // Fetch features
        const { data: featuresData, error: featuresError } = await supabase
          .from('home_features')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (featuresError) {
          console.error('Error fetching features:', featuresError);
        } else if (featuresData) {
          setFeatures(featuresData);
        }

        // Fetch specializations
        const { data: specsData, error: specsError } = await supabase
          .from('home_specializations')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (specsError) {
          console.error('Error fetching specializations:', specsError);
        } else if (specsData) {
          setSpecializations(specsData);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchHomeData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const stats = [
    { value: pageData.stat_doctors, label: 'Medical Experts', icon: <Users className="w-5 h-5" /> },
    { value: pageData.stat_specializations, label: 'Specializations', icon: <Stethoscope className="w-5 h-5" /> },
    { value: pageData.stat_patients, label: 'Patients Served', icon: <Heart className="w-5 h-5" /> },
    { value: pageData.stat_emergency, label: 'Emergency Care', icon: <Clock className="w-5 h-5" /> }
  ];

  const aboutBenefits = [
    'State-of-the-art medical equipment and facilities',
    'Board-certified specialists in multiple fields',
    'Comprehensive diagnostic and treatment services',
    'Patient-centered approach to healthcare'
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-green-50/30 overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-120px)] py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10"
            >
              <div className="inline-flex items-center gap-2 bg-white text-brand px-4 py-2 rounded-full text-sm mb-6 border-2 border-brand">
                <Star className="w-4 h-4" style={{ fill: '#16a34a' }} />
                <span>Leading Healthcare Provider Since 2010</span>
              </div>
              
              <h1 className="text-6xl lg:text-7xl mb-6 text-gray-900 leading-tight">
                {pageData.hero_title}<br />
                <span className="text-brand">{pageData.hero_subtitle}</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                {pageData.hero_description}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-12">
                <Link
                  to="/doctors"
                  className="bg-brand text-white px-8 py-4 rounded-xl hover:opacity-90 transition-all inline-flex items-center gap-2 shadow-lg"
                  style={{ boxShadow: '0 10px 40px rgba(22, 163, 74, 0.2)' }}
                >
                  Book Appointment
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:border-brand hover:text-brand transition-all inline-flex items-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Contact Us
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="bg-white rounded-xl p-4 border border-gray-200"
                  >
                    <div className="flex items-center gap-2 text-brand mb-2">
                      {stat.icon}
                      <div className="text-2xl">{stat.value}</div>
                    </div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src={pageData.hero_image_url}
                  alt="Medical Excellence"
                  className="w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/50 to-transparent"></div>
              </div>
              
              {/* Floating Card */}
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-2xl max-w-xs border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center flex-shrink-0 border-2 border-brand">
                    <Shield className="w-7 h-7 text-brand" />
                  </div>
                  <div>
                    <div className="text-2xl text-gray-900 mb-1">Certified</div>
                    <div className="text-sm text-gray-600">International Accreditation</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-sm text-brand mb-3 tracking-wide">WHY CHOOSE US</div>
            <h2 className="text-4xl lg:text-5xl mb-4 text-gray-900">Excellence in Healthcare</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Committed to providing exceptional medical care with advanced technology and compassionate service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 hover:border-brand hover:shadow-xl transition-all">
                  <div className="w-14 h-14 bg-white text-brand rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border-2 border-brand">
                    {iconMap[feature.icon_name] || <Award className="w-6 h-6" />}
                  </div>
                  <h3 className="text-xl mb-3 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-square rounded-2xl overflow-hidden">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1565647946321-a146ac24a220?w=1080"
                      alt="Medical Team"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-brand rounded-2xl p-6 text-white">
                    <div className="text-4xl mb-2">15+</div>
                    <div className="text-white/90">Years of Excellence</div>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-white rounded-2xl p-6 border-2 border-brand">
                    <div className="text-4xl text-brand mb-2">{pageData.stat_emergency}</div>
                    <div className="text-gray-700">Emergency Care</div>
                  </div>
                  <div className="aspect-square rounded-2xl overflow-hidden">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1080"
                      alt="Medical Care"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-sm text-brand mb-3 tracking-wide">ABOUT AL HAYAT MEDICAL</div>
              <h2 className="text-4xl lg:text-5xl mb-6 text-gray-900">{pageData.about_title}</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {pageData.about_description1}
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {pageData.about_description2}
              </p>
              
              <div className="space-y-4 mb-8">
                {aboutBenefits.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border-2 border-brand">
                      <div className="w-2 h-2 bg-brand rounded-full"></div>
                    </div>
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>

              <Link
                to="/services"
                className="text-brand hover:opacity-80 inline-flex items-center gap-2 group"
              >
                Explore Our Services
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specializations */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-sm text-brand mb-3 tracking-wide">MEDICAL SPECIALIZATIONS</div>
            <h2 className="text-4xl lg:text-5xl mb-4 text-gray-900">Comprehensive Care Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Expert medical care across multiple specializations, all under one roof
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specializations.map((spec, index) => (
              <motion.div
                key={spec.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all">
                  <div className={`w-16 h-16 bg-gradient-to-br ${spec.color} rounded-xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform`}>
                    {iconMap[spec.icon_name] || <Stethoscope className="w-8 h-8" />}
                  </div>
                  <h3 className="text-xl mb-2 text-gray-900">{spec.name}</h3>
                  <p className="text-sm text-gray-600">{spec.count}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-brand hover:opacity-80 group"
            >
              View All Specializations
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gray-50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-50 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-5xl mb-6 text-gray-900">{pageData.cta_title}</h2>
            <p className="text-xl text-gray-600 mb-10">
              {pageData.cta_description}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-brand text-white px-8 py-4 rounded-xl hover:opacity-90 transition-all shadow-xl"
                style={{ boxShadow: '0 10px 40px rgba(22, 163, 74, 0.3)' }}
              >
                Book Appointment
              </Link>
              <a
                href={`tel:${pageData.phone.replace(/\s/g, '')}`}
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:border-brand hover:text-brand transition-all"
              >
                Call: {pageData.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

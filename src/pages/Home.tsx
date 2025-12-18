import { Link } from 'react-router-dom';
import { Heart, Users, Clock, Award, Stethoscope, Building2, Microscope, Ambulance, ArrowRight, Phone, Shield, Star } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { motion } from 'motion/react';

export function Home() {
  const stats = [
    { value: '50+', label: 'Medical Experts', icon: <Users className="w-5 h-5" /> },
    { value: '15+', label: 'Specializations', icon: <Stethoscope className="w-5 h-5" /> },
    { value: '10K+', label: 'Patients Served', icon: <Heart className="w-5 h-5" /> },
    { value: '24/7', label: 'Emergency Care', icon: <Clock className="w-5 h-5" /> }
  ];

  const features = [
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Accredited Excellence',
      description: 'Internationally accredited facility meeting the highest standards of medical care and patient safety.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Expert Medical Team',
      description: 'Board-certified physicians with extensive experience across multiple medical specializations.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Advanced Technology',
      description: 'State-of-the-art medical equipment and cutting-edge diagnostic capabilities.'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Patient-Centered Care',
      description: 'Personalized treatment plans focused on your individual health needs and wellbeing.'
    }
  ];

  const specializations = [
    { 
      icon: <Stethoscope className="w-8 h-8" />, 
      name: 'Cardiology', 
      count: '8 Specialists',
      color: 'from-red-500 to-rose-600'
    },
    { 
      icon: <Building2 className="w-8 h-8" />, 
      name: 'Orthopedics', 
      count: '6 Specialists',
      color: 'from-green-500 to-emerald-600'
    },
    { 
      icon: <Microscope className="w-8 h-8" />, 
      name: 'Laboratory', 
      count: 'Advanced Diagnostics',
      color: 'from-purple-500 to-violet-600'
    },
    { 
      icon: <Ambulance className="w-8 h-8" />, 
      name: 'Emergency', 
      count: '24/7 Service',
      color: 'from-orange-500 to-amber-600'
    }
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
                Your Health,<br />
                <span className="text-brand">Our Priority</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Experience comprehensive healthcare services delivered with compassion, expertise, and cutting-edge medical technology.
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
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjU2ODg0Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
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
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 hover:border-brand hover:shadow-xl transition-all">
                  <div className="w-14 h-14 bg-white text-brand rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border-2 border-brand">
                    {feature.icon}
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
                      src="https://images.unsplash.com/photo-1565647946321-a146ac24a220?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZG9jdG9yJTIwdGVhbXxlbnwxfHx8fDE3NjU2OTc0ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
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
                    <div className="text-4xl text-brand mb-2">24/7</div>
                    <div className="text-gray-700">Emergency Care</div>
                  </div>
                  <div className="aspect-square rounded-2xl overflow-hidden">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY29uc3VsdGF0aW9ufGVufDF8fHx8MTc2NTYyMzc2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
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
              <h2 className="text-4xl lg:text-5xl mb-6 text-gray-900">Trusted Healthcare Partner</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Al Hayat Medical Complex has been serving our community for over 15 years, providing comprehensive healthcare services with a commitment to excellence and compassion.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our state-of-the-art facility combines advanced medical technology with the expertise of our board-certified physicians to deliver exceptional patient care across all specializations.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  'State-of-the-art medical equipment and facilities',
                  'Board-certified specialists in multiple fields',
                  'Comprehensive diagnostic and treatment services',
                  'Patient-centered approach to healthcare'
                ].map((item, index) => (
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
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all">
                  <div className={`w-16 h-16 bg-gradient-to-br ${spec.color} rounded-xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform`}>
                    {spec.icon}
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
            <h2 className="text-4xl lg:text-5xl mb-6 text-gray-900">Ready to Take Control of Your Health?</h2>
            <p className="text-xl text-gray-600 mb-10">
              Schedule an appointment with our experienced medical professionals today
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
                href="tel:+1234567890"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:border-brand hover:text-brand transition-all"
              >
                Call: +123 456 7890
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
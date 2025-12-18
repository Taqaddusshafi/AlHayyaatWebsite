import { Pill, ShoppingCart, Clock, Shield, Truck, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { motion } from 'motion/react';

export function Medicine() {
  const categories = [
    {
      name: 'Prescription Medicines',
      description: 'Wide range of prescribed medications available with doctor\'s prescription',
      icon: <Pill className="w-6 h-6" />
    },
    {
      name: 'Over-the-Counter',
      description: 'Common medicines for everyday health needs without prescription',
      icon: <ShoppingCart className="w-6 h-6" />
    },
    {
      name: 'Vitamins & Supplements',
      description: 'Quality vitamins, minerals, and dietary supplements',
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      name: 'First Aid & Care',
      description: 'Essential first aid supplies and personal care products',
      icon: <Shield className="w-6 h-6" />
    }
  ];

  const features = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Open 24/7',
      description: 'Our pharmacy is open round the clock for your convenience'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Quality Assured',
      description: 'All medications sourced from certified manufacturers'
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Home Delivery',
      description: 'Free delivery for orders above minimum value'
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: 'Expert Consultation',
      description: 'Qualified pharmacists for medication counseling'
    }
  ];

  const popularMedicines = [
    { name: 'Pain Relief', items: ['Paracetamol', 'Ibuprofen', 'Aspirin', 'Naproxen'] },
    { name: 'Cold & Flu', items: ['Antihistamines', 'Decongestants', 'Cough Syrups', 'Throat Lozenges'] },
    { name: 'Digestive Health', items: ['Antacids', 'Probiotics', 'Anti-diarrheal', 'Laxatives'] },
    { name: 'Vitamins', items: ['Multivitamins', 'Vitamin D', 'Vitamin C', 'B-Complex'] },
    { name: 'Heart Health', items: ['Blood Pressure', 'Cholesterol', 'Anticoagulants', 'Beta Blockers'] },
    { name: 'Diabetes Care', items: ['Insulin', 'Metformin', 'Glucose Monitors', 'Test Strips'] }
  ];

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
            <h1 className="text-5xl mb-6 text-gray-900">Pharmacy & Medicine</h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Your trusted pharmacy providing quality medications and healthcare products with professional pharmaceutical care available 24/7.
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
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white text-brand rounded-lg flex items-center justify-center mx-auto mb-4 border-2 border-brand">
                  {feature.icon}
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
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-white text-brand rounded-lg flex items-center justify-center mb-4 border-2 border-brand">
                  {category.icon}
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
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border border-gray-200 rounded-lg p-6"
              >
                <h3 className="text-lg mb-4 text-brand">{category.name}</h3>
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
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white text-brand rounded-lg flex items-center justify-center flex-shrink-0 border-2 border-brand">
                    <Pill className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg mb-1 text-gray-900">Prescription Filling</h3>
                    <p className="text-gray-600 text-sm">
                      Quick and accurate prescription filling with quality medications
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white text-brand rounded-lg flex items-center justify-center flex-shrink-0 border-2 border-brand">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg mb-1 text-gray-900">Medication Counseling</h3>
                    <p className="text-gray-600 text-sm">
                      Professional advice on proper medication usage and interactions
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white text-brand rounded-lg flex items-center justify-center flex-shrink-0 border-2 border-brand">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg mb-1 text-gray-900">Home Delivery</h3>
                    <p className="text-gray-600 text-sm">
                      Convenient home delivery service for your medications
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white text-brand rounded-lg flex items-center justify-center flex-shrink-0 border-2 border-brand">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg mb-1 text-gray-900">Health Screening</h3>
                    <p className="text-gray-600 text-sm">
                      Blood pressure, glucose monitoring, and basic health checks
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1596522016734-8e6136fe5cfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjeSUyMG1lZGljaW5lfGVufDF8fHx8MTc2NTU4MzM1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
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
              href="tel:+1234567890"
              className="bg-brand text-white px-8 py-4 rounded-md hover:opacity-90 transition-all"
            >
              Call Pharmacy: +123 456 7890
            </a>
            <a
              href="mailto:pharmacy@alhayatmedical.com"
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
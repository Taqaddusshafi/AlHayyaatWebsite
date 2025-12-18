import { Heart, Stethoscope, Baby, Bone, Brain, Eye, Ear, TestTube, Pill, Ambulance, Activity, Building2 } from 'lucide-react';
import { motion } from 'motion/react';

export function Services() {
  const services = [
    {
      icon: <Stethoscope className="w-8 h-8" />,
      title: 'Cardiology',
      description: 'Comprehensive cardiovascular care including diagnosis, treatment, and prevention of heart diseases.',
      features: ['ECG & Echocardiography', 'Cardiac Catheterization', 'Heart Surgery', 'Cardiac Rehabilitation']
    },
    {
      icon: <Baby className="w-8 h-8" />,
      title: 'Pediatrics',
      description: 'Specialized healthcare for infants, children, and adolescents with experienced pediatricians.',
      features: ['Newborn Care', 'Vaccinations', 'Growth Monitoring', 'Pediatric Surgery']
    },
    {
      icon: <Bone className="w-8 h-8" />,
      title: 'Orthopedics',
      description: 'Treatment of musculoskeletal conditions including bones, joints, ligaments, and tendons.',
      features: ['Joint Replacement', 'Sports Medicine', 'Fracture Care', 'Spine Surgery']
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'Neurology',
      description: 'Expert care for disorders of the nervous system including brain and spinal cord conditions.',
      features: ['Stroke Care', 'Epilepsy Treatment', 'Neurosurgery', 'Pain Management']
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: 'Ophthalmology',
      description: 'Complete eye care services including diagnosis and treatment of eye diseases and vision problems.',
      features: ['Cataract Surgery', 'LASIK', 'Retina Care', 'Glaucoma Treatment']
    },
    {
      icon: <Ear className="w-8 h-8" />,
      title: 'ENT',
      description: 'Ear, nose, and throat care for a wide range of conditions affecting these vital areas.',
      features: ['Hearing Tests', 'Sinus Treatment', 'Throat Surgery', 'Allergy Care']
    },
    {
      icon: <TestTube className="w-8 h-8" />,
      title: 'Laboratory Services',
      description: 'State-of-the-art diagnostic laboratory with accurate and timely test results.',
      features: ['Blood Tests', 'Pathology', 'Microbiology', 'Genetic Testing']
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: 'Radiology',
      description: 'Advanced imaging services for accurate diagnosis using the latest technology.',
      features: ['X-Ray', 'CT Scan', 'MRI', 'Ultrasound']
    },
    {
      icon: <Pill className="w-8 h-8" />,
      title: 'Pharmacy',
      description: 'Well-stocked pharmacy with qualified pharmacists providing medication and health advice.',
      features: ['Prescription Medicines', 'OTC Products', 'Health Supplements', 'Medication Counseling']
    },
    {
      icon: <Ambulance className="w-8 h-8" />,
      title: 'Emergency Care',
      description: '24/7 emergency services with a dedicated team for immediate medical attention.',
      features: ['Trauma Care', 'Critical Care', 'Ambulance Service', 'Emergency Surgery']
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'General Surgery',
      description: 'Comprehensive surgical services with experienced surgeons and modern operating theaters.',
      features: ['Laparoscopic Surgery', 'General Operations', 'Day Surgery', 'Post-operative Care']
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: 'Obstetrics & Gynecology',
      description: "Women's health services including maternity care and gynecological treatments.",
      features: ['Prenatal Care', 'Delivery Services', 'Gynecology', 'Family Planning']
    }
  ];

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-white text-brand rounded-lg flex items-center justify-center mb-6 border-2 border-brand">
                  {service.icon}
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
              href="tel:+1234567890"
              className="bg-brand text-white px-8 py-4 rounded-md hover:opacity-90 transition-all"
            >
              Call: +123 456 7890
            </a>
            <a
              href="mailto:info@alhayatmedical.com"
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
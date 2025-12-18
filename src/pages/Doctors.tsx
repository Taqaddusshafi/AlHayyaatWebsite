import { Mail, Phone, Award, Clock } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { motion } from 'motion/react';

export function Doctors() {
  const doctors = [
    {
      name: 'Dr. Ahmed Al-Hassan',
      specialty: 'Cardiologist',
      qualifications: 'MD, FACC, FESC',
      experience: '15+ years',
      description: 'Specialized in interventional cardiology and heart disease management.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjU2ODg0Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      email: 'ahmed.alhassan@alhayatmedical.com',
      phone: '+123 456 7891'
    },
    {
      name: 'Dr. Sarah Johnson',
      specialty: 'Pediatrician',
      qualifications: 'MD, FAAP',
      experience: '12+ years',
      description: 'Expert in child healthcare, vaccinations, and developmental assessments.',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY29uc3VsdGF0aW9ufGVufDF8fHx8MTc2NTYyMzc2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      email: 'sarah.johnson@alhayatmedical.com',
      phone: '+123 456 7892'
    },
    {
      name: 'Dr. Mohammed Ali',
      specialty: 'Orthopedic Surgeon',
      qualifications: 'MD, MS (Ortho), FRCS',
      experience: '18+ years',
      description: 'Specialist in joint replacement and sports medicine.',
      image: 'https://images.unsplash.com/photo-1565647946321-a146ac24a220?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZG9jdG9yJTIwdGVhbXxlbnwxfHx8fDE3NjU2OTc0ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      email: 'mohammed.ali@alhayatmedical.com',
      phone: '+123 456 7893'
    },
    {
      name: 'Dr. Emily Chen',
      specialty: 'Neurologist',
      qualifications: 'MD, PhD, FAAN',
      experience: '14+ years',
      description: 'Expertise in stroke care, epilepsy, and neurodegenerative diseases.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjU2ODg0Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      email: 'emily.chen@alhayatmedical.com',
      phone: '+123 456 7894'
    },
    {
      name: 'Dr. Omar Khalid',
      specialty: 'General Surgeon',
      qualifications: 'MBBS, MS, FICS',
      experience: '16+ years',
      description: 'Specialized in minimally invasive and laparoscopic surgery.',
      image: 'https://images.unsplash.com/photo-1565647946321-a146ac24a220?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZG9jdG9yJTIwdGVhbXxlbnwxfHx8fDE3NjU2OTc0ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      email: 'omar.khalid@alhayatmedical.com',
      phone: '+123 456 7895'
    },
    {
      name: 'Dr. Lisa Martinez',
      specialty: 'Ophthalmologist',
      qualifications: 'MD, FACS',
      experience: '11+ years',
      description: 'Expert in cataract surgery, LASIK, and retinal diseases.',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY29uc3VsdGF0aW9ufGVufDF8fHx8MTc2NTYyMzc2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      email: 'lisa.martinez@alhayatmedical.com',
      phone: '+123 456 7896'
    },
    {
      name: 'Dr. Fatima Abbas',
      specialty: 'Obstetrician & Gynecologist',
      qualifications: 'MD, FACOG',
      experience: '13+ years',
      description: 'Comprehensive women\'s health and maternity care specialist.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjU2ODg0Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      email: 'fatima.abbas@alhayatmedical.com',
      phone: '+123 456 7897'
    },
    {
      name: 'Dr. David Kumar',
      specialty: 'ENT Specialist',
      qualifications: 'MBBS, DLO, DNB',
      experience: '10+ years',
      description: 'Expert in ear, nose, throat disorders and head and neck surgery.',
      image: 'https://images.unsplash.com/photo-1565647946321-a146ac24a220?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZG9jdG9yJTIwdGVhbXxlbnwxfHx8fDE3NjU2OTc0ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      email: 'david.kumar@alhayatmedical.com',
      phone: '+123 456 7898'
    },
    {
      name: 'Dr. Aisha Rahman',
      specialty: 'Dermatologist',
      qualifications: 'MD, DDV, FAAD',
      experience: '9+ years',
      description: 'Specialist in skin diseases, cosmetic dermatology, and laser treatments.',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY29uc3VsdGF0aW9ufGVufDF8fHx8MTc2NTYyMzc2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      email: 'aisha.rahman@alhayatmedical.com',
      phone: '+123 456 7899'
    }
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
            <div className="text-sm text-brand mb-4">OUR MEDICAL TEAM</div>
            <h1 className="text-5xl mb-6 text-gray-900">Expert Physicians & Specialists</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Our team of board-certified doctors brings years of experience and expertise to provide you with the highest quality medical care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[4/3] bg-gray-100">
                  <ImageWithFallback
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-brand mb-1">{doctor.specialty}</div>
                  <h3 className="text-2xl mb-2 text-gray-900">{doctor.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Award className="w-4 h-4" />
                    <span>{doctor.qualifications}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <Clock className="w-4 h-4" />
                    <span>{doctor.experience} Experience</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-6">{doctor.description}</p>
                  <div className="space-y-2 pt-6 border-t border-gray-100">
                    <a
                      href={`mailto:${doctor.email}`}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{doctor.email}</span>
                    </a>
                    <a
                      href={`tel:${doctor.phone}`}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{doctor.phone}</span>
                    </a>
                  </div>
                  <button className="w-full mt-6 bg-brand text-white py-3 rounded-md hover:opacity-90 transition-all">
                    Book Appointment
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-gray-900">Why Choose Our Doctors?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our physicians are committed to providing personalized, compassionate care using the latest medical advancements
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-white text-brand rounded-lg flex items-center justify-center mx-auto mb-4 border-2 border-brand">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl mb-3 text-gray-900">Board Certified</h3>
              <p className="text-gray-600">
                All our doctors are board-certified specialists with extensive training and credentials
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-white text-brand rounded-lg flex items-center justify-center mx-auto mb-4 border-2 border-brand">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl mb-3 text-gray-900">Experienced</h3>
              <p className="text-gray-600">
                Years of practical experience in their specialties ensuring quality care
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-white text-brand rounded-lg flex items-center justify-center mx-auto mb-4 border-2 border-brand">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-xl mb-3 text-gray-900">Accessible</h3>
              <p className="text-gray-600">
                Easy appointment scheduling and direct communication with our medical team
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
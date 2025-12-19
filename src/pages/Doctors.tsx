import { Mail, Phone, Award, Clock } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  qualifications: string;
  experience: string;
  description: string;
  image_url: string;
  email: string;
  phone: string;
  is_active: boolean;
  display_order: number;
}

export function Doctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDoctors() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('doctors')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (error) {
          console.error('Error fetching doctors:', error);
          return;
        }

        if (data) {
          setDoctors(data);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading our medical team...</p>
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
          {doctors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No doctors available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctors.map((doctor, index) => (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-[4/3] bg-gray-100">
                    <ImageWithFallback
                      src={doctor.image_url}
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
                        href={`tel:${doctor.phone.replace(/\s/g, '')}`}
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
          )}
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

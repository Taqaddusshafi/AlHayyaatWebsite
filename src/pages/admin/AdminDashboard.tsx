import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Users, Stethoscope, FileText, Mail, Pill } from 'lucide-react';

export function AdminDashboard() {
  const [stats, setStats] = useState({
    doctors: 0,
    services: 0,
    pharmacy: 0,
    blogPosts: 0,
    contacts: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [doctors, services, pharmacy, blogPosts, contacts] = await Promise.all([
        supabase.from('doctors').select('id', { count: 'exact', head: true }),
        supabase.from('services').select('id', { count: 'exact', head: true }),
        supabase.from('popular_medicines').select('id', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
        supabase.from('contact_submissions').select('id', { count: 'exact', head: true })
      ]);

      setStats({
        doctors: doctors.count || 0,
        services: services.count || 0,
        pharmacy: pharmacy.count || 0,
        blogPosts: blogPosts.count || 0,
        contacts: contacts.count || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const statCards = [
    { label: 'Total Doctors', value: stats.doctors, icon: <Users className="w-8 h-8" />, color: 'bg-blue-500' },
    { label: 'Total Services', value: stats.services, icon: <Stethoscope className="w-8 h-8" />, color: 'bg-green-500' },
    { label: 'Medicine Categories', value: stats.pharmacy, icon: <Pill className="w-8 h-8" />, color: 'bg-teal-500' },
    { label: 'Blog Posts', value: stats.blogPosts, icon: <FileText className="w-8 h-8" />, color: 'bg-purple-500' },
    { label: 'Contact Submissions', value: stats.contacts, icon: <Mail className="w-8 h-8" />, color: 'bg-orange-500' }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to your admin panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} text-white p-3 rounded-lg`}>
                {stat.icon}
              </div>
            </div>
            <div className="text-3xl text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a href="/admin/doctors" className="p-4 border-2 border-gray-200 rounded-lg hover:border-brand transition-colors">
            <Users className="w-6 h-6 text-brand mb-2" />
            <div className="font-semibold text-gray-900">Manage Doctors</div>
            <div className="text-sm text-gray-600">Add or edit doctor profiles</div>
          </a>
          <a href="/admin/pharmacy" className="p-4 border-2 border-gray-200 rounded-lg hover:border-brand transition-colors">
            <Pill className="w-6 h-6 text-brand mb-2" />
            <div className="font-semibold text-gray-900">Manage Pharmacy</div>
            <div className="text-sm text-gray-600">Update pharmacy content</div>
          </a>
          <a href="/admin/blog" className="p-4 border-2 border-gray-200 rounded-lg hover:border-brand transition-colors">
            <FileText className="w-6 h-6 text-brand mb-2" />
            <div className="font-semibold text-gray-900">Create Blog Post</div>
            <div className="text-sm text-gray-600">Write a new article</div>
          </a>
          <a href="/admin/contacts" className="p-4 border-2 border-gray-200 rounded-lg hover:border-brand transition-colors">
            <Mail className="w-6 h-6 text-brand mb-2" />
            <div className="font-semibold text-gray-900">View Contacts</div>
            <div className="text-sm text-gray-600">Check appointment requests</div>
          </a>
        </div>
      </div>
    </div>
  );
}

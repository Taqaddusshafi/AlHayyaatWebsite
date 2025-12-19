import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

interface Doctor {
  id?: number;
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

export function AdminDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    const { data, error } = await supabase
      .from('doctors')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error:', error);
    } else {
      setDoctors(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDoctor) return;

    setLoading(true);
    try {
      if (editingDoctor.id) {
        // Update
        const { error } = await supabase
          .from('doctors')
          .update(editingDoctor)
          .eq('id', editingDoctor.id);

        if (error) throw error;
      } else {
        // Insert
        const { error } = await supabase
          .from('doctors')
          .insert([editingDoctor]);

        if (error) throw error;
      }

      await fetchDoctors();
      setShowForm(false);
      setEditingDoctor(null);
      alert('Doctor saved successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving doctor');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this doctor?')) return;

    const { error } = await supabase
      .from('doctors')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error:', error);
      alert('Error deleting doctor');
    } else {
      await fetchDoctors();
      alert('Doctor deleted successfully!');
    }
  };

  const newDoctor = (): Doctor => ({
    name: '',
    specialty: '',
    qualifications: '',
    experience: '',
    description: '',
    image_url: '',
    email: '',
    phone: '',
    is_active: true,
    display_order: doctors.length + 1
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl text-gray-900 mb-2">Doctors Management</h1>
          <p className="text-gray-600">Add, edit, or remove doctor profiles</p>
        </div>
        <button
          onClick={() => {
            setEditingDoctor(newDoctor());
            setShowForm(true);
          }}
          className="bg-brand text-white px-6 py-3 rounded-lg hover:opacity-90 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Doctor
        </button>
      </div>

      {/* Form Modal */}
      {showForm && editingDoctor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl text-gray-900">
                {editingDoctor.id ? 'Edit Doctor' : 'Add New Doctor'}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingDoctor(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={editingDoctor.name}
                    onChange={(e) => setEditingDoctor({ ...editingDoctor, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Specialty *</label>
                  <input
                    type="text"
                    value={editingDoctor.specialty}
                    onChange={(e) => setEditingDoctor({ ...editingDoctor, specialty: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Qualifications *</label>
                  <input
                    type="text"
                    value={editingDoctor.qualifications}
                    onChange={(e) => setEditingDoctor({ ...editingDoctor, qualifications: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Experience *</label>
                  <input
                    type="text"
                    value={editingDoctor.experience}
                    onChange={(e) => setEditingDoctor({ ...editingDoctor, experience: e.target.value })}
                    required
                    placeholder="e.g., 15+ years"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Description *</label>
                <textarea
                  value={editingDoctor.description}
                  onChange={(e) => setEditingDoctor({ ...editingDoctor, description: e.target.value })}
                  required
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    value={editingDoctor.email}
                    onChange={(e) => setEditingDoctor({ ...editingDoctor, email: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    value={editingDoctor.phone}
                    onChange={(e) => setEditingDoctor({ ...editingDoctor, phone: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Image URL *</label>
                <input
                  type="url"
                  value={editingDoctor.image_url}
                  onChange={(e) => setEditingDoctor({ ...editingDoctor, image_url: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={editingDoctor.display_order}
                    onChange={(e) => setEditingDoctor({ ...editingDoctor, display_order: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    checked={editingDoctor.is_active}
                    onChange={(e) => setEditingDoctor({ ...editingDoctor, is_active: e.target.checked })}
                    className="w-4 h-4 text-brand"
                  />
                  <label className="text-sm text-gray-700">Active</label>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-brand text-white py-3 rounded-lg hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {loading ? 'Saving...' : 'Save Doctor'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingDoctor(null);
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Doctors List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Specialty</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {doctors.map((doctor) => (
              <tr key={doctor.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={doctor.image_url} alt={doctor.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <div className="font-medium text-gray-900">{doctor.name}</div>
                      <div className="text-sm text-gray-500">{doctor.qualifications}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{doctor.specialty}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <div>{doctor.email}</div>
                  <div>{doctor.phone}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs rounded-full ${doctor.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {doctor.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingDoctor(doctor);
                        setShowForm(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => doctor.id && handleDelete(doctor.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

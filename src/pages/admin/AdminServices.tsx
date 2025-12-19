import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

interface Service {
  id?: number;
  icon_name: string;
  title: string;
  description: string;
  features: string[];
  is_active: boolean;
  display_order: number;
}

export function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [featuresInput, setFeaturesInput] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error:', error);
    } else {
      setServices(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    // Convert features input to array
    const featuresArray = featuresInput.split('\n').filter(f => f.trim());
    const serviceToSave = { ...editingService, features: featuresArray };

    setLoading(true);
    try {
      if (editingService.id) {
        const { error } = await supabase
          .from('services')
          .update(serviceToSave)
          .eq('id', editingService.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('services')
          .insert([serviceToSave]);

        if (error) throw error;
      }

      await fetchServices();
      setShowForm(false);
      setEditingService(null);
      setFeaturesInput('');
      alert('Service saved successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving service');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error:', error);
      alert('Error deleting service');
    } else {
      await fetchServices();
      alert('Service deleted successfully!');
    }
  };

  const newService = (): Service => ({
    icon_name: 'stethoscope',
    title: '',
    description: '',
    features: [],
    is_active: true,
    display_order: services.length + 1
  });

  const iconOptions = [
    'stethoscope', 'baby', 'bone', 'brain', 'eye', 'ear', 
    'test-tube', 'activity', 'pill', 'ambulance', 'heart', 'building2'
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl text-gray-900 mb-2">Services Management</h1>
          <p className="text-gray-600">Add, edit, or remove medical services</p>
        </div>
        <button
          onClick={() => {
            setEditingService(newService());
            setFeaturesInput('');
            setShowForm(true);
          }}
          className="bg-brand text-white px-6 py-3 rounded-lg hover:opacity-90 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Service
        </button>
      </div>

      {/* Form Modal */}
      {showForm && editingService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl text-gray-900">
                {editingService.id ? 'Edit Service' : 'Add New Service'}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingService(null);
                  setFeaturesInput('');
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Icon Name *</label>
                <select
                  value={editingService.icon_name}
                  onChange={(e) => setEditingService({ ...editingService, icon_name: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  {iconOptions.map((icon) => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  value={editingService.title}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Description *</label>
                <textarea
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  required
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Features (one per line) *</label>
                <textarea
                  value={featuresInput || editingService.features.join('\n')}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  required
                  rows={5}
                  placeholder="ECG & Echocardiography&#10;Cardiac Catheterization&#10;Heart Surgery"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Display Order</label>
                  <input
                    type="number"
                    value={editingService.display_order}
                    onChange={(e) => setEditingService({ ...editingService, display_order: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    checked={editingService.is_active}
                    onChange={(e) => setEditingService({ ...editingService, is_active: e.target.checked })}
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
                  {loading ? 'Saving...' : 'Save Service'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingService(null);
                    setFeaturesInput('');
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

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{service.description.substring(0, 80)}...</p>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs rounded-full ${service.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {service.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="mb-4">
              <div className="text-sm text-gray-500 mb-2">Features:</div>
              <ul className="text-sm text-gray-700 space-y-1">
                {service.features.slice(0, 3).map((feature, idx) => (
                  <li key={idx}>• {feature}</li>
                ))}
              </ul>
            </div>
            <div className="flex gap-2 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setEditingService(service);
                  setFeaturesInput(service.features.join('\n'));
                  setShowForm(true);
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => service.id && handleDelete(service.id)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

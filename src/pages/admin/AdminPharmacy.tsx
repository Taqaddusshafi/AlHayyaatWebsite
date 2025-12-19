import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Save, Plus, Edit, Trash2, X } from 'lucide-react';

interface PharmacySettings {
  hero_title: string;
  hero_description: string;
  services_image_url: string;
  phone: string;
  email: string;
}

interface PharmacyFeature {
  id?: number;
  icon_name: string;
  title: string;
  description: string;
  is_active: boolean;
  display_order: number;
}

interface MedicineCategory {
  id?: number;
  icon_name: string;
  name: string;
  description: string;
  is_active: boolean;
  display_order: number;
}

interface PopularMedicine {
  id?: number;
  category_name: string;
  items: string[];
  is_active: boolean;
  display_order: number;
}

interface PharmacyService {
  id?: number;
  icon_name: string;
  title: string;
  description: string;
  is_active: boolean;
  display_order: number;
}

export function AdminPharmacy() {
  const [settings, setSettings] = useState<PharmacySettings | null>(null);
  const [features, setFeatures] = useState<PharmacyFeature[]>([]);
  const [categories, setCategories] = useState<MedicineCategory[]>([]);
  const [medicines, setMedicines] = useState<PopularMedicine[]>([]);
  const [services, setServices] = useState<PharmacyService[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [editingFeature, setEditingFeature] = useState<PharmacyFeature | null>(null);
  const [editingCategory, setEditingCategory] = useState<MedicineCategory | null>(null);
  const [editingMedicine, setEditingMedicine] = useState<PopularMedicine | null>(null);
  const [editingService, setEditingService] = useState<PharmacyService | null>(null);
  const [itemsInput, setItemsInput] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [settingsData, featuresData, categoriesData, medicinesData, servicesData] = await Promise.all([
        supabase.from('pharmacy_settings').select('*').eq('id', 1).single(),
        supabase.from('pharmacy_features').select('*').order('display_order'),
        supabase.from('medicine_categories').select('*').order('display_order'),
        supabase.from('popular_medicines').select('*').order('display_order'),
        supabase.from('pharmacy_services').select('*').order('display_order')
      ]);

      if (settingsData.data) setSettings(settingsData.data);
      if (featuresData.data) setFeatures(featuresData.data);
      if (categoriesData.data) setCategories(categoriesData.data);
      if (medicinesData.data) setMedicines(medicinesData.data);
      if (servicesData.data) setServices(servicesData.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    if (!settings) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from('pharmacy_settings')
        .update(settings)
        .eq('id', 1);

      if (error) throw error;
      alert('Settings saved!');
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  const saveFeature = async (feature: PharmacyFeature) => {
    try {
      if (feature.id) {
        await supabase.from('pharmacy_features').update(feature).eq('id', feature.id);
      } else {
        await supabase.from('pharmacy_features').insert([feature]);
      }
      await fetchData();
      setEditingFeature(null);
      alert('Feature saved!');
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving feature');
    }
  };

  const deleteFeature = async (id: number) => {
    if (!confirm('Delete this feature?')) return;
    try {
      await supabase.from('pharmacy_features').delete().eq('id', id);
      await fetchData();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const saveCategory = async (category: MedicineCategory) => {
    try {
      if (category.id) {
        await supabase.from('medicine_categories').update(category).eq('id', category.id);
      } else {
        await supabase.from('medicine_categories').insert([category]);
      }
      await fetchData();
      setEditingCategory(null);
      alert('Category saved!');
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving category');
    }
  };

  const deleteCategory = async (id: number) => {
    if (!confirm('Delete this category?')) return;
    try {
      await supabase.from('medicine_categories').delete().eq('id', id);
      await fetchData();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const saveMedicine = async (medicine: PopularMedicine) => {
    try {
      const itemsArray = itemsInput.split('\n').filter(i => i.trim());
      const medicineToSave = { ...medicine, items: itemsArray };

      if (medicine.id) {
        await supabase.from('popular_medicines').update(medicineToSave).eq('id', medicine.id);
      } else {
        await supabase.from('popular_medicines').insert([medicineToSave]);
      }
      await fetchData();
      setEditingMedicine(null);
      setItemsInput('');
      alert('Medicine category saved!');
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving medicine category');
    }
  };

  const deleteMedicine = async (id: number) => {
    if (!confirm('Delete this medicine category?')) return;
    try {
      await supabase.from('popular_medicines').delete().eq('id', id);
      await fetchData();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const saveService = async (service: PharmacyService) => {
    try {
      if (service.id) {
        await supabase.from('pharmacy_services').update(service).eq('id', service.id);
      } else {
        await supabase.from('pharmacy_services').insert([service]);
      }
      await fetchData();
      setEditingService(null);
      alert('Service saved!');
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving service');
    }
  };

  const deleteService = async (id: number) => {
    if (!confirm('Delete this service?')) return;
    try {
      await supabase.from('pharmacy_services').delete().eq('id', id);
      await fetchData();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const iconOptions = ['clock', 'shield', 'truck', 'check-circle', 'pill', 'shopping-cart'];

  if (loading || !settings) {
    return <div className="flex justify-center py-12"><div className="w-16 h-16 border-4 border-brand border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl text-gray-900 mb-2">Pharmacy Management</h1>
        <p className="text-gray-600">Manage pharmacy page content</p>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl text-gray-900 mb-4">Pharmacy Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Hero Title</label>
            <input
              type="text"
              value={settings.hero_title}
              onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Hero Description</label>
            <textarea
              value={settings.hero_description}
              onChange={(e) => setSettings({ ...settings, hero_description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Services Image URL</label>
            <input
              type="url"
              value={settings.services_image_url}
              onChange={(e) => setSettings({ ...settings, services_image_url: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={saveSettings}
            disabled={saving}
            className="bg-brand text-white px-8 py-3 rounded-lg hover:opacity-90 disabled:opacity-50 flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-gray-900">Features</h2>
          <button
            onClick={() => setEditingFeature({ icon_name: 'clock', title: '', description: '', is_active: true, display_order: features.length + 1 })}
            className="bg-brand text-white px-4 py-2 rounded-lg hover:opacity-90 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Feature
          </button>
        </div>
        <div className="space-y-2">
          {features.map((feature) => (
            <div key={feature.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">{feature.title}</div>
                <div className="text-sm text-gray-600">{feature.description}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditingFeature(feature)} className="text-blue-600 hover:text-blue-800">
                  <Edit className="w-5 h-5" />
                </button>
                <button onClick={() => feature.id && deleteFeature(feature.id)} className="text-red-600 hover:text-red-800">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Modal */}
      {editingFeature && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl text-gray-900">Edit Feature</h3>
              <button onClick={() => setEditingFeature(null)}><X className="w-6 h-6" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Icon</label>
                <select
                  value={editingFeature.icon_name}
                  onChange={(e) => setEditingFeature({ ...editingFeature, icon_name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  {iconOptions.map((icon) => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={editingFeature.title}
                  onChange={(e) => setEditingFeature({ ...editingFeature, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Description</label>
                <textarea
                  value={editingFeature.description}
                  onChange={(e) => setEditingFeature({ ...editingFeature, description: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editingFeature.is_active}
                  onChange={(e) => setEditingFeature({ ...editingFeature, is_active: e.target.checked })}
                  className="w-4 h-4"
                />
                <label className="text-sm text-gray-700">Active</label>
              </div>
              <button
                onClick={() => saveFeature(editingFeature)}
                className="w-full bg-brand text-white py-3 rounded-lg hover:opacity-90"
              >
                Save Feature
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Categories - Similar structure */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-gray-900">Medicine Categories</h2>
          <button
            onClick={() => setEditingCategory({ icon_name: 'pill', name: '', description: '', is_active: true, display_order: categories.length + 1 })}
            className="bg-brand text-white px-4 py-2 rounded-lg hover:opacity-90 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Category
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">{category.name}</div>
                <div className="text-sm text-gray-600">{category.description.substring(0, 50)}...</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditingCategory(category)} className="text-blue-600 hover:text-blue-800">
                  <Edit className="w-5 h-5" />
                </button>
                <button onClick={() => category.id && deleteCategory(category.id)} className="text-red-600 hover:text-red-800">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Modal */}
      {editingCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl text-gray-900">Edit Category</h3>
              <button onClick={() => setEditingCategory(null)}><X className="w-6 h-6" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Icon</label>
                <select
                  value={editingCategory.icon_name}
                  onChange={(e) => setEditingCategory({ ...editingCategory, icon_name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  {iconOptions.map((icon) => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Description</label>
                <textarea
                  value={editingCategory.description}
                  onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editingCategory.is_active}
                  onChange={(e) => setEditingCategory({ ...editingCategory, is_active: e.target.checked })}
                  className="w-4 h-4"
                />
                <label className="text-sm text-gray-700">Active</label>
              </div>
              <button
                onClick={() => saveCategory(editingCategory)}
                className="w-full bg-brand text-white py-3 rounded-lg hover:opacity-90"
              >
                Save Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popular Medicines */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-gray-900">Popular Medicines</h2>
          <button
            onClick={() => {
              setEditingMedicine({ category_name: '', items: [], is_active: true, display_order: medicines.length + 1 });
              setItemsInput('');
            }}
            className="bg-brand text-white px-4 py-2 rounded-lg hover:opacity-90 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Category
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {medicines.map((medicine) => (
            <div key={medicine.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-900">{medicine.category_name}</h3>
                <div className="flex gap-2">
                  <button onClick={() => {
                    setEditingMedicine(medicine);
                    setItemsInput(medicine.items.join('\n'));
                  }} className="text-blue-600 hover:text-blue-800">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => medicine.id && deleteMedicine(medicine.id)} className="text-red-600 hover:text-red-800">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                {medicine.items.length} items
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Medicine Modal */}
      {editingMedicine && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl text-gray-900">Edit Medicine Category</h3>
              <button onClick={() => {
                setEditingMedicine(null);
                setItemsInput('');
              }}><X className="w-6 h-6" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Category Name</label>
                <input
                  type="text"
                  value={editingMedicine.category_name}
                  onChange={(e) => setEditingMedicine({ ...editingMedicine, category_name: e.target.value })}
                  placeholder="e.g., Pain Relief"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Items (one per line)</label>
                <textarea
                  value={itemsInput || editingMedicine.items.join('\n')}
                  onChange={(e) => setItemsInput(e.target.value)}
                  rows={6}
                  placeholder="Paracetamol&#10;Ibuprofen&#10;Aspirin"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editingMedicine.is_active}
                  onChange={(e) => setEditingMedicine({ ...editingMedicine, is_active: e.target.checked })}
                  className="w-4 h-4"
                />
                <label className="text-sm text-gray-700">Active</label>
              </div>
              <button
                onClick={() => saveMedicine(editingMedicine)}
                className="w-full bg-brand text-white py-3 rounded-lg hover:opacity-90"
              >
                Save Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Services */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-gray-900">Pharmacy Services</h2>
          <button
            onClick={() => setEditingService({ icon_name: 'pill', title: '', description: '', is_active: true, display_order: services.length + 1 })}
            className="bg-brand text-white px-4 py-2 rounded-lg hover:opacity-90 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Service
          </button>
        </div>
        <div className="space-y-2">
          {services.map((service) => (
            <div key={service.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">{service.title}</div>
                <div className="text-sm text-gray-600">{service.description}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditingService(service)} className="text-blue-600 hover:text-blue-800">
                  <Edit className="w-5 h-5" />
                </button>
                <button onClick={() => service.id && deleteService(service.id)} className="text-red-600 hover:text-red-800">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Modal */}
      {editingService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl text-gray-900">Edit Service</h3>
              <button onClick={() => setEditingService(null)}><X className="w-6 h-6" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Icon</label>
                <select
                  value={editingService.icon_name}
                  onChange={(e) => setEditingService({ ...editingService, icon_name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  {iconOptions.map((icon) => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={editingService.title}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Description</label>
                <textarea
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editingService.is_active}
                  onChange={(e) => setEditingService({ ...editingService, is_active: e.target.checked })}
                  className="w-4 h-4"
                />
                <label className="text-sm text-gray-700">Active</label>
              </div>
              <button
                onClick={() => saveService(editingService)}
                className="w-full bg-brand text-white py-3 rounded-lg hover:opacity-90"
              >
                Save Service
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

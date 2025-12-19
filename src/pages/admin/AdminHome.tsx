import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Save, Plus, Edit, Trash2, X } from 'lucide-react';

interface HomeSettings {
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
  id?: number;
  icon_name: string;
  title: string;
  description: string;
  is_active: boolean;
  display_order: number;
}

interface Specialization {
  id?: number;
  icon_name: string;
  name: string;
  count: string;
  color: string;
  is_active: boolean;
  display_order: number;
}

export function AdminHome() {
  const [homeSettings, setHomeSettings] = useState<HomeSettings | null>(null);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null);
  const [editingSpec, setEditingSpec] = useState<Specialization | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [homeData, featuresData, specsData] = await Promise.all([
        supabase.from('home_page_settings').select('*').eq('id', 1).single(),
        supabase.from('home_features').select('*').order('display_order'),
        supabase.from('home_specializations').select('*').order('display_order')
      ]);

      if (homeData.data) setHomeSettings(homeData.data);
      if (featuresData.data) setFeatures(featuresData.data);
      if (specsData.data) setSpecializations(specsData.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveHomeSettings = async () => {
    if (!homeSettings) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from('home_page_settings')
        .update(homeSettings)
        .eq('id', 1);

      if (error) throw error;
      alert('Home page settings saved!');
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  const saveFeature = async (feature: Feature) => {
    try {
      if (feature.id) {
        await supabase.from('home_features').update(feature).eq('id', feature.id);
      } else {
        await supabase.from('home_features').insert([feature]);
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
      await supabase.from('home_features').delete().eq('id', id);
      await fetchData();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const saveSpecialization = async (spec: Specialization) => {
    try {
      if (spec.id) {
        await supabase.from('home_specializations').update(spec).eq('id', spec.id);
      } else {
        await supabase.from('home_specializations').insert([spec]);
      }
      await fetchData();
      setEditingSpec(null);
      alert('Specialization saved!');
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving specialization');
    }
  };

  const deleteSpec = async (id: number) => {
    if (!confirm('Delete this specialization?')) return;
    try {
      await supabase.from('home_specializations').delete().eq('id', id);
      await fetchData();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading || !homeSettings) {
    return <div className="flex justify-center py-12"><div className="w-16 h-16 border-4 border-brand border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl text-gray-900 mb-2">Home Page Management</h1>
        <p className="text-gray-600">Customize your homepage content</p>
      </div>

      {/* Hero Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl text-gray-900 mb-4">Hero Section</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={homeSettings.hero_title}
                onChange={(e) => setHomeSettings({ ...homeSettings, hero_title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Subtitle</label>
              <input
                type="text"
                value={homeSettings.hero_subtitle}
                onChange={(e) => setHomeSettings({ ...homeSettings, hero_subtitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Description</label>
            <textarea
              value={homeSettings.hero_description}
              onChange={(e) => setHomeSettings({ ...homeSettings, hero_description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Hero Image URL</label>
            <input
              type="url"
              value={homeSettings.hero_image_url}
              onChange={(e) => setHomeSettings({ ...homeSettings, hero_image_url: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl text-gray-900 mb-4">Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Doctors</label>
            <input
              type="text"
              value={homeSettings.stat_doctors}
              onChange={(e) => setHomeSettings({ ...homeSettings, stat_doctors: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Specializations</label>
            <input
              type="text"
              value={homeSettings.stat_specializations}
              onChange={(e) => setHomeSettings({ ...homeSettings, stat_specializations: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Patients</label>
            <input
              type="text"
              value={homeSettings.stat_patients}
              onChange={(e) => setHomeSettings({ ...homeSettings, stat_patients: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Emergency</label>
            <input
              type="text"
              value={homeSettings.stat_emergency}
              onChange={(e) => setHomeSettings({ ...homeSettings, stat_emergency: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl text-gray-900 mb-4">About Section</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={homeSettings.about_title}
              onChange={(e) => setHomeSettings({ ...homeSettings, about_title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Description 1</label>
            <textarea
              value={homeSettings.about_description1}
              onChange={(e) => setHomeSettings({ ...homeSettings, about_description1: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Description 2</label>
            <textarea
              value={homeSettings.about_description2}
              onChange={(e) => setHomeSettings({ ...homeSettings, about_description2: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl text-gray-900 mb-4">Call to Action</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={homeSettings.cta_title}
              onChange={(e) => setHomeSettings({ ...homeSettings, cta_title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Description</label>
            <input
              type="text"
              value={homeSettings.cta_description}
              onChange={(e) => setHomeSettings({ ...homeSettings, cta_description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={homeSettings.phone}
              onChange={(e) => setHomeSettings({ ...homeSettings, phone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={saveHomeSettings}
          disabled={saving}
          className="bg-brand text-white px-8 py-3 rounded-lg hover:opacity-90 disabled:opacity-50 flex items-center gap-2"
        >
          <Save className="w-5 h-5" />
          {saving ? 'Saving...' : 'Save Home Settings'}
        </button>
      </div>

      {/* Features Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-gray-900">Features</h2>
          <button
            onClick={() => setEditingFeature({ icon_name: 'award', title: '', description: '', is_active: true, display_order: features.length + 1 })}
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
                <div className="text-sm text-gray-600">{feature.description.substring(0, 60)}...</div>
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

      {/* Feature Form Modal */}
      {editingFeature && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl text-gray-900">Edit Feature</h3>
              <button onClick={() => setEditingFeature(null)}><X className="w-6 h-6" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Icon Name</label>
                <select
                  value={editingFeature.icon_name}
                  onChange={(e) => setEditingFeature({ ...editingFeature, icon_name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="award">Award</option>
                  <option value="users">Users</option>
                  <option value="shield">Shield</option>
                  <option value="heart">Heart</option>
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
                  rows={3}
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

      {/* Specializations - Similar structure to Features */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-gray-900">Specializations</h2>
          <button
            onClick={() => setEditingSpec({ icon_name: 'stethoscope', name: '', count: '', color: 'from-green-500 to-emerald-600', is_active: true, display_order: specializations.length + 1 })}
            className="bg-brand text-white px-4 py-2 rounded-lg hover:opacity-90 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Specialization
          </button>
        </div>
        <div className="space-y-2">
          {specializations.map((spec) => (
            <div key={spec.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">{spec.name}</div>
                <div className="text-sm text-gray-600">{spec.count}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditingSpec(spec)} className="text-blue-600 hover:text-blue-800">
                  <Edit className="w-5 h-5" />
                </button>
                <button onClick={() => spec.id && deleteSpec(spec.id)} className="text-red-600 hover:text-red-800">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Specialization Form Modal */}
      {editingSpec && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl text-gray-900">Edit Specialization</h3>
              <button onClick={() => setEditingSpec(null)}><X className="w-6 h-6" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Icon Name</label>
                <select
                  value={editingSpec.icon_name}
                  onChange={(e) => setEditingSpec({ ...editingSpec, icon_name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="stethoscope">Stethoscope</option>
                  <option value="building2">Building</option>
                  <option value="microscope">Microscope</option>
                  <option value="ambulance">Ambulance</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={editingSpec.name}
                  onChange={(e) => setEditingSpec({ ...editingSpec, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Count</label>
                <input
                  type="text"
                  value={editingSpec.count}
                  onChange={(e) => setEditingSpec({ ...editingSpec, count: e.target.value })}
                  placeholder="8 Specialists"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Color (Tailwind gradient)</label>
                <input
                  type="text"
                  value={editingSpec.color}
                  onChange={(e) => setEditingSpec({ ...editingSpec, color: e.target.value })}
                  placeholder="from-red-500 to-rose-600"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editingSpec.is_active}
                  onChange={(e) => setEditingSpec({ ...editingSpec, is_active: e.target.checked })}
                  className="w-4 h-4"
                />
                <label className="text-sm text-gray-700">Active</label>
              </div>
              <button
                onClick={() => saveSpecialization(editingSpec)}
                className="w-full bg-brand text-white py-3 rounded-lg hover:opacity-90"
              >
                Save Specialization
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

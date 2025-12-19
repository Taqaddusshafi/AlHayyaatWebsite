import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Save, Loader } from 'lucide-react';

interface ClinicSettings {
  id: number;
  name: string;
  logo_initials: string;
  email: string;
  phone: string;
  phone_secondary: string;
  email_secondary: string;
  address: string;
  address_line2: string;
  description: string;
  weekday_hours: string;
  saturday_hours: string;
  sunday_hours: string;
  weekend_hours: string;
  emergency_text: string;
  emergency_number: string;
  facebook_url: string;
  twitter_url: string;
  instagram_url: string;
  linkedin_url: string;
  copyright_text: string;
  maps_url: string;
}

export function AdminSettings() {
  const [settings, setSettings] = useState<ClinicSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('clinic_settings')
        .select('*')
        .eq('id', 1)
        .single();

      if (error) throw error;
      setSettings(data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('clinic_settings')
        .update(settings)
        .eq('id', 1);

      if (error) throw error;
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: keyof ClinicSettings, value: string) => {
    if (settings) {
      setSettings({ ...settings, [field]: value });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="w-8 h-8 animate-spin text-brand" />
      </div>
    );
  }

  if (!settings) return null;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl text-gray-900 mb-2">Clinic Settings</h1>
        <p className="text-gray-600">Manage your clinic information and contact details</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl text-gray-900 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Clinic Name</label>
              <input
                type="text"
                value={settings.name}
                onChange={(e) => updateField('name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Logo Initials</label>
              <input
                type="text"
                value={settings.logo_initials}
                onChange={(e) => updateField('logo_initials', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm text-gray-700 mb-2">Description</label>
            <textarea
              value={settings.description}
              onChange={(e) => updateField('description', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl text-gray-900 mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Primary Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => updateField('email', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Secondary Email</label>
              <input
                type="email"
                value={settings.email_secondary}
                onChange={(e) => updateField('email_secondary', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Primary Phone</label>
              <input
                type="tel"
                value={settings.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Secondary Phone</label>
              <input
                type="tel"
                value={settings.phone_secondary}
                onChange={(e) => updateField('phone_secondary', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl text-gray-900 mb-4">Address</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Address Line 1</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => updateField('address', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Address Line 2</label>
              <input
                type="text"
                value={settings.address_line2}
                onChange={(e) => updateField('address_line2', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Google Maps URL</label>
              <input
                type="url"
                value={settings.maps_url}
                onChange={(e) => updateField('maps_url', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        {/* Working Hours */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl text-gray-900 mb-4">Working Hours</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Weekday Hours</label>
              <input
                type="text"
                value={settings.weekday_hours}
                onChange={(e) => updateField('weekday_hours', e.target.value)}
                placeholder="Mon-Fri: 8:00 AM - 8:00 PM"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Saturday Hours</label>
              <input
                type="text"
                value={settings.saturday_hours}
                onChange={(e) => updateField('saturday_hours', e.target.value)}
                placeholder="9:00 AM - 5:00 PM"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Sunday Hours</label>
              <input
                type="text"
                value={settings.sunday_hours}
                onChange={(e) => updateField('sunday_hours', e.target.value)}
                placeholder="9:00 AM - 5:00 PM"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Weekend Hours (Footer)</label>
              <input
                type="text"
                value={settings.weekend_hours}
                onChange={(e) => updateField('weekend_hours', e.target.value)}
                placeholder="Sat-Sun: 9:00 AM - 5:00 PM"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        {/* Emergency */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl text-gray-900 mb-4">Emergency Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Emergency Number</label>
              <input
                type="tel"
                value={settings.emergency_number}
                onChange={(e) => updateField('emergency_number', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Emergency Text</label>
              <input
                type="text"
                value={settings.emergency_text}
                onChange={(e) => updateField('emergency_text', e.target.value)}
                placeholder="Emergency: 24/7"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl text-gray-900 mb-4">Social Media Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Facebook URL</label>
              <input
                type="url"
                value={settings.facebook_url}
                onChange={(e) => updateField('facebook_url', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Twitter URL</label>
              <input
                type="url"
                value={settings.twitter_url}
                onChange={(e) => updateField('twitter_url', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Instagram URL</label>
              <input
                type="url"
                value={settings.instagram_url}
                onChange={(e) => updateField('instagram_url', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">LinkedIn URL</label>
              <input
                type="url"
                value={settings.linkedin_url}
                onChange={(e) => updateField('linkedin_url', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl text-gray-900 mb-4">Footer</h2>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Copyright Text</label>
            <input
              type="text"
              value={settings.copyright_text}
              onChange={(e) => updateField('copyright_text', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-brand text-white px-8 py-3 rounded-lg hover:opacity-90 disabled:opacity-50 flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}

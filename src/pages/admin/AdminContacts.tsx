import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Mail, Phone, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';

interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  preferred_date: string | null;
  message: string;
  status: string;
  created_at: string;
}

export function AdminContacts() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, [filter]);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      await fetchSubmissions();
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating status');
    }
  };

  const deleteSubmission = async (id: number) => {
    if (!confirm('Delete this submission?')) return;

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchSubmissions();
    } catch (error) {
      console.error('Error:', error);
      alert('Error deleting submission');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'contacted':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-16 h-16 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl text-gray-900 mb-2">Contact Submissions</h1>
        <p className="text-gray-600">View and manage appointment requests</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-2">
        {['all', 'pending', 'contacted', 'completed', 'cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg transition-colors capitalize ${
              filter === status
                ? 'bg-brand text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {submissions.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-600">No submissions found</p>
          </div>
        ) : (
          submissions.map((submission) => (
            <div key={submission.id} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="text-xl text-gray-900 mb-1">{submission.name}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <a href={`mailto:${submission.email}`} className="hover:text-brand">
                        {submission.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <a href={`tel:${submission.phone}`} className="hover:text-brand">
                        {submission.phone}
                      </a>
                    </div>
                    {submission.preferred_date && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(submission.preferred_date).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
                <span className={`inline-flex px-3 py-1 text-sm rounded-full capitalize ${getStatusColor(submission.status)}`}>
                  {submission.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Service</div>
                  <div className="text-gray-900">{submission.service}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Submitted</div>
                  <div className="text-gray-900 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {new Date(submission.created_at).toLocaleString()}
                  </div>
                </div>
              </div>

              {submission.message && (
                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-1">Message</div>
                  <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">{submission.message}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                <button
                  onClick={() => updateStatus(submission.id, 'pending')}
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 text-sm"
                >
                  <Clock className="w-4 h-4" />
                  Pending
                </button>
                <button
                  onClick={() => updateStatus(submission.id, 'contacted')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-sm"
                >
                  <Phone className="w-4 h-4" />
                  Contacted
                </button>
                <button
                  onClick={() => updateStatus(submission.id, 'completed')}
                  className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-sm"
                >
                  <CheckCircle className="w-4 h-4" />
                  Completed
                </button>
                <button
                  onClick={() => updateStatus(submission.id, 'cancelled')}
                  className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 text-sm"
                >
                  <XCircle className="w-4 h-4" />
                  Cancelled
                </button>
                <button
                  onClick={() => deleteSubmission(submission.id)}
                  className="ml-auto flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

interface BlogPost {
  id?: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  published_date: string;
  category: string;
  read_time: string;
  image_url: string;
  is_featured: boolean;
  is_published: boolean;
}

export function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('published_date', { ascending: false });

    if (error) {
      console.error('Error:', error);
    } else {
      setPosts(data || []);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    // Auto-generate slug if not provided
    if (!editingPost.slug) {
      editingPost.slug = generateSlug(editingPost.title);
    }

    setLoading(true);
    try {
      if (editingPost.id) {
        const { error } = await supabase
          .from('blog_posts')
          .update(editingPost)
          .eq('id', editingPost.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([editingPost]);

        if (error) throw error;
      }

      await fetchPosts();
      setShowForm(false);
      setEditingPost(null);
      alert('Blog post saved successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving blog post');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error:', error);
      alert('Error deleting post');
    } else {
      await fetchPosts();
      alert('Post deleted successfully!');
    }
  };

  const newPost = (): BlogPost => ({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: '',
    published_date: new Date().toISOString().split('T')[0],
    category: 'General Health',
    read_time: '5 min read',
    image_url: '',
    is_featured: false,
    is_published: true
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl text-gray-900 mb-2">Blog Posts Management</h1>
          <p className="text-gray-600">Create and manage blog articles</p>
        </div>
        <button
          onClick={() => {
            setEditingPost(newPost());
            setShowForm(true);
          }}
          className="bg-brand text-white px-6 py-3 rounded-lg hover:opacity-90 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          New Post
        </button>
      </div>

      {/* Form Modal */}
      {showForm && editingPost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl text-gray-900">
                {editingPost.id ? 'Edit Post' : 'New Blog Post'}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingPost(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-700 mb-2">Title *</label>
                  <input
                    type="text"
                    value={editingPost.title}
                    onChange={(e) => {
                      setEditingPost({ 
                        ...editingPost, 
                        title: e.target.value,
                        slug: generateSlug(e.target.value)
                      });
                    }}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-700 mb-2">Slug *</label>
                  <input
                    type="text"
                    value={editingPost.slug}
                    onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-700 mb-2">Excerpt *</label>
                  <textarea
                    value={editingPost.excerpt}
                    onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                    required
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-700 mb-2">Content (HTML) *</label>
                  <textarea
                    value={editingPost.content}
                    onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                    required
                    rows={10}
                    placeholder="<p>Your content here...</p>"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Author *</label>
                  <input
                    type="text"
                    value={editingPost.author}
                    onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })}
                    required
                    placeholder="Dr. John Doe"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Category *</label>
                  <input
                    type="text"
                    value={editingPost.category}
                    onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Published Date *</label>
                  <input
                    type="date"
                    value={editingPost.published_date}
                    onChange={(e) => setEditingPost({ ...editingPost, published_date: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Read Time *</label>
                  <input
                    type="text"
                    value={editingPost.read_time}
                    onChange={(e) => setEditingPost({ ...editingPost, read_time: e.target.value })}
                    required
                    placeholder="5 min read"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-700 mb-2">Image URL *</label>
                  <input
                    type="url"
                    value={editingPost.image_url}
                    onChange={(e) => setEditingPost({ ...editingPost, image_url: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editingPost.is_featured}
                    onChange={(e) => setEditingPost({ ...editingPost, is_featured: e.target.checked })}
                    className="w-4 h-4 text-brand"
                  />
                  <label className="text-sm text-gray-700">Featured</label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editingPost.is_published}
                    onChange={(e) => setEditingPost({ ...editingPost, is_published: e.target.checked })}
                    className="w-4 h-4 text-brand"
                  />
                  <label className="text-sm text-gray-700">Published</label>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-brand text-white py-3 rounded-lg hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {loading ? 'Saving...' : 'Save Post'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingPost(null);
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

      {/* Posts List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Post</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={post.image_url} alt={post.title} className="w-16 h-16 rounded object-cover" />
                    <div className="max-w-md">
                      <div className="font-medium text-gray-900">{post.title}</div>
                      <div className="text-sm text-gray-500 truncate">{post.excerpt.substring(0, 60)}...</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{post.author}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{post.category}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{new Date(post.published_date).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${post.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {post.is_published ? 'Published' : 'Draft'}
                    </span>
                    {post.is_featured && (
                      <span className="inline-flex px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 ml-1">
                        Featured
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingPost(post);
                        setShowForm(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => post.id && handleDelete(post.id)}
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

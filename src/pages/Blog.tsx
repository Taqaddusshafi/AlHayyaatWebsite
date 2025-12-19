import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  published_date: string;
  category: string;
  read_time: string;
  image_url: string;
  is_featured: boolean;
  is_published: boolean;
  slug: string;
}

export function Blog() {
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>(['All Posts']);
  const [selectedCategory, setSelectedCategory] = useState('All Posts');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogData() {
      try {
        setLoading(true);

        // Fetch featured post
        const { data: featured, error: featuredError } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('is_featured', true)
          .eq('is_published', true)
          .order('published_date', { ascending: false })
          .limit(1)
          .single();

        if (featuredError && featuredError.code !== 'PGRST116') {
          console.error('Error fetching featured post:', featuredError);
        } else if (featured) {
          setFeaturedPost(featured);
        }

        // Fetch all published posts
        const { data: posts, error: postsError } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('is_published', true)
          .order('published_date', { ascending: false });

        if (postsError) {
          console.error('Error fetching blog posts:', postsError);
        } else if (posts) {
          // Filter out featured post from regular posts
          const regularPosts = posts.filter(post => !post.is_featured);
          setBlogPosts(regularPosts);

          // Extract unique categories
          const uniqueCategories = ['All Posts', ...new Set(posts.map(post => post.category))];
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogData();
  }, []);

  const filteredPosts = selectedCategory === 'All Posts'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog posts...</p>
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
            <div className="text-sm text-brand mb-4">HEALTH INSIGHTS</div>
            <h1 className="text-5xl mb-6 text-gray-900">Health & Wellness Blog</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Expert medical advice, health tips, and wellness information from our team of healthcare specialists
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <span className="inline-block bg-white text-brand px-3 py-1 rounded-full text-sm border-2 border-brand">Featured Article</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <ImageWithFallback
                  src={featuredPost.image_url}
                  alt={featuredPost.title}
                  className="rounded-lg shadow-lg"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="text-sm text-brand mb-2">{featuredPost.category}</div>
                <h2 className="text-4xl mb-4 text-gray-900">{featuredPost.title}</h2>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(featuredPost.published_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{featuredPost.read_time}</span>
                  </div>
                </div>
                <Link 
                  to={`/blog/${featuredPost.slug}`}
                  className="bg-brand text-white px-8 py-3 rounded-md hover:opacity-90 transition-all inline-flex items-center gap-2"
                >
                  Read Article <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="py-8 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md transition-colors text-sm ${
                  selectedCategory === category
                    ? 'bg-brand text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl text-gray-900">Recent Articles</h2>
          </div>
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No articles found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-video bg-gray-100">
                    <ImageWithFallback
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-brand mb-2">{post.category}</div>
                    <h3 className="text-xl mb-2 text-gray-900">{post.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 pb-4 border-b border-gray-100">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.read_time}</span>
                      </div>
                    </div>
                    <Link 
                      to={`/blog/${post.slug}`}
                      className="text-brand hover:opacity-80 text-sm inline-flex items-center gap-1"
                    >
                      Read More <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl mb-4 text-gray-900">Subscribe to Our Newsletter</h2>
          <p className="text-xl text-gray-600 mb-8">
            Get the latest health tips and medical news delivered to your inbox
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <button className="bg-brand text-white px-8 py-3 rounded-md hover:opacity-90 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { motion } from 'motion/react';

export function Blog() {
  const featuredPost = {
    title: 'Understanding Heart Health: Prevention and Care',
    excerpt: 'Learn about the importance of cardiovascular health and practical steps you can take to maintain a healthy heart throughout your life.',
    author: 'Dr. Ahmed Al-Hassan',
    date: 'December 10, 2025',
    category: 'Cardiology',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjU2ODg0Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  };

  const blogPosts = [
    {
      title: 'The Importance of Regular Health Checkups',
      excerpt: 'Discover why routine medical examinations are crucial for early detection and prevention of diseases.',
      author: 'Dr. Sarah Johnson',
      date: 'December 8, 2025',
      category: 'General Health',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY29uc3VsdGF0aW9ufGVufDF8fHx8MTc2NTYyMzc2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      title: 'Managing Diabetes: Diet and Lifestyle Tips',
      excerpt: 'Expert advice on controlling blood sugar levels through proper nutrition and healthy habits.',
      author: 'Dr. Emily Chen',
      date: 'December 5, 2025',
      category: 'Diabetes',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1764885449345-d0d6629bf7bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMHNlcnZpY2VzJTIwbWVkaWNhbHxlbnwxfHx8fDE3NjU2OTc0ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      title: 'Pediatric Care: Your Child\'s Health Journey',
      excerpt: 'A comprehensive guide to understanding your child\'s developmental milestones and health needs.',
      author: 'Dr. Sarah Johnson',
      date: 'December 3, 2025',
      category: 'Pediatrics',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1565647946321-a146ac24a220?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZG9jdG9yJTIwdGVhbXxlbnwxfHx8fDE3NjU2OTc0ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      title: 'Orthopedic Health: Joint Care and Prevention',
      excerpt: 'Learn how to maintain healthy joints and prevent common orthopedic problems as you age.',
      author: 'Dr. Mohammed Ali',
      date: 'December 1, 2025',
      category: 'Orthopedics',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjU2ODg0Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      title: 'Mental Health Matters: Stress Management',
      excerpt: 'Practical strategies for managing stress and maintaining good mental health in today\'s fast-paced world.',
      author: 'Dr. Emily Chen',
      date: 'November 28, 2025',
      category: 'Mental Health',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY29uc3VsdGF0aW9ufGVufDF8fHx8MTc2NTYyMzc2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      title: 'Women\'s Health: Preventive Care Guide',
      excerpt: 'Essential information about women\'s health screenings and preventive care at different life stages.',
      author: 'Dr. Fatima Abbas',
      date: 'November 25, 2025',
      category: 'Women\'s Health',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1764885449345-d0d6629bf7bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMHNlcnZpY2VzJTIwbWVkaWNhbHxlbnwxfHx8fDE3NjU2OTc0ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      title: 'Nutrition and Wellness: Eating for Health',
      excerpt: 'Evidence-based nutritional advice for maintaining optimal health and preventing chronic diseases.',
      author: 'Dr. Omar Khalid',
      date: 'November 22, 2025',
      category: 'Nutrition',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1565647946321-a146ac24a220?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZG9jdG9yJTIwdGVhbXxlbnwxfHx8fDE3NjU2OTc0ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      title: 'Eye Care Essentials: Protecting Your Vision',
      excerpt: 'Important tips for maintaining good eye health and preventing vision problems.',
      author: 'Dr. Lisa Martinez',
      date: 'November 20, 2025',
      category: 'Ophthalmology',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjU2ODg0Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      title: 'Understanding Allergies: Causes and Treatment',
      excerpt: 'Learn about common allergies, their triggers, and effective treatment options available.',
      author: 'Dr. David Kumar',
      date: 'November 18, 2025',
      category: 'Allergies',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY29uc3VsdGF0aW9ufGVufDF8fHx8MTc2NTYyMzc2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  const categories = [
    'All Posts',
    'Cardiology',
    'General Health',
    'Diabetes',
    'Pediatrics',
    'Orthopedics',
    'Mental Health',
    'Women\'s Health',
    'Nutrition'
  ];

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
                src={featuredPost.image}
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
                  <span>{featuredPost.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{featuredPost.readTime}</span>
                </div>
              </div>
              <button className="bg-brand text-white px-8 py-3 rounded-md hover:opacity-90 transition-all inline-flex items-center gap-2">
                Read Article <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-md transition-colors text-sm ${
                  index === 0
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video bg-gray-100">
                  <ImageWithFallback
                    src={post.image}
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
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <button className="text-brand hover:opacity-80 text-sm inline-flex items-center gap-1">
                    Read More <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-md hover:border-gray-400 transition-colors">
              Load More Articles
            </button>
          </div>
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
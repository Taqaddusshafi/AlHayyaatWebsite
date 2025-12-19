import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { Doctors } from './pages/Doctors';
import { Medicine } from './pages/Medicine';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { Contact } from './pages/Contact';

// Admin imports
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminDoctors } from './pages/admin/AdminDoctors';
import { AdminServices } from './pages/admin/AdminServices';
import { AdminPharmacy } from './pages/admin/AdminPharmacy';
import { AdminBlog } from './pages/admin/AdminBlog';
import { AdminContacts } from './pages/admin/AdminContacts';
import { AdminSettings } from './pages/admin/AdminSettings';
import { AdminHome } from './pages/admin/AdminHome';
import { ProtectedRoute } from './components/ProtectedRoute';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1"><Home /></main>
            <Footer />
          </div>
        } />
        <Route path="/services" element={
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1"><Services /></main>
            <Footer />
          </div>
        } />
        <Route path="/doctors" element={
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1"><Doctors /></main>
            <Footer />
          </div>
        } />
        <Route path="/medicine" element={
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1"><Medicine /></main>
            <Footer />
          </div>
        } />
        <Route path="/blog" element={
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1"><Blog /></main>
            <Footer />
          </div>
        } />
        <Route path="/blog/:slug" element={
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1"><BlogPost /></main>
            <Footer />
          </div>
        } />
        <Route path="/contact" element={
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1"><Contact /></main>
            <Footer />
          </div>
        } />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="home" element={<AdminHome />} />
          <Route path="doctors" element={<AdminDoctors />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="pharmacy" element={<AdminPharmacy />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </Router>
  );
}

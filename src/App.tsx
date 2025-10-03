import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import AdminLayout from "./components/admin/AdminLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LocationsPage from "./pages/LocationsPage";
import LocationIbadanPage from "./pages/LocationIbadanPage";
import LocationOgbomoshoPage from "./pages/LocationOgbomoshoPage";
import LocationAbujaPage from "./pages/LocationAbujaPage";
import FacilitiesPage from "./pages/FacilitiesPage";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import HotelPoliciesPage from "./pages/HotelPoliciesPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPages from "./pages/admin/AdminPages";
import AdminRooms from "./pages/admin/AdminRooms";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminContent from "./pages/admin/AdminContent";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin') && location.pathname !== '/admin/login';
  const isLoginRoute = location.pathname === '/admin/login';

  if (isAdminRoute) {
    return (
      <AdminLayout>
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/pages" element={<AdminPages />} />
          <Route path="/admin/content" element={<AdminContent />} />
          <Route path="/admin/rooms" element={<AdminRooms />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Routes>
      </AdminLayout>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {!isLoginRoute && <Navigation />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/locations/ibadan" element={<LocationIbadanPage />} />
          <Route path="/locations/ogbomosho" element={<LocationOgbomoshoPage />} />
          <Route path="/locations/abuja" element={<LocationAbujaPage />} />
          <Route path="/facilities" element={<FacilitiesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/hotel-policies" element={<HotelPoliciesPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isLoginRoute && <Footer />}
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

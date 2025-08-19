import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navigation from "@/components/Navigation";
import Home from "./pages/Home";

// Lazy load non-critical pages
const Shop = lazy(() => import("./pages/Shop"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const Quiz = lazy(() => import("./pages/Quiz"));
const Commission = lazy(() => import("./pages/Commission"));
const Cart = lazy(() => import("./pages/Cart"));
const Payment = lazy(() => import("./pages/Payment"));
const StudentGallery = lazy(() => import("./pages/StudentGallery"));
const CollectorsWall = lazy(() => import("./pages/CollectorsWall"));
const ArtClasses = lazy(() => import("./pages/ArtClasses"));
const NotFound = lazy(() => import("./pages/NotFound"));
const EnhancedShop = lazy(() => import("./pages/EnhancedShop"));
const Auth = lazy(() => import("./pages/Auth"));
const StudentDashboard = lazy(() => import("./pages/StudentDashboard"));
const ClassScheduler = lazy(() => import("./pages/ClassScheduler"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="arteza-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Navigation />
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
              <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<EnhancedShop />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/commission" element={<Commission />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/student-gallery" element={<StudentGallery />} />
              <Route path="/collectors-wall" element={<CollectorsWall />} />
              <Route path="/art-classes" element={<ArtClasses />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/student-dashboard" element={<StudentDashboard />} />
              <Route path="/class-scheduler" element={<ClassScheduler />} />
              <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PersonalityTest from "./pages/PersonalityTest";
import TripPlanner from "./pages/TripPlanner";
import GeneratedTrip from "./pages/GeneratedTrip";
import Reviews from "./pages/Reviews";
import CourseBrowser from "./pages/CourseBrowser";
import CourseDetail from "./pages/CourseDetail";
import CourseCreate from "./pages/CourseCreate";
import MyPage from "./pages/MyPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/personality-test" element={<PersonalityTest />} />
          <Route path="/trip-planner" element={<TripPlanner />} />
          <Route path="/generated-trip" element={<GeneratedTrip />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/courses" element={<CourseBrowser />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/course/create" element={<CourseCreate />} />
          <Route path="/my-page" element={<MyPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

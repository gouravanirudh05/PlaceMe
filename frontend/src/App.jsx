import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./pages/Hero";
import { ToastContainer } from "react-toastify";
import Chatbot from "./components/Chatbot";
import About from "./pages/About";
import CodingPlatform from "./pages/CodingPlatform";
// import  MeetingRoom from "./pages/MeetingRoom";
// import StudentDashboard from "./pages/StudentDashboard";
import PracticeQuestions from "./pages/PracticeQuestions";
import Blogs from "./pages/Blog";
const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="flex-grow">
          <Routes>  
                 
            {/* <Route path="/" element={<LandingPage />} />      */}
            {/* <Route path="/news" element={<HealthBlog />} /> */}
            {/* <Route path="/blog" element={<Blog />} /> */}
            <Route path="/" element={<Hero />} />
            <Route path="/practice-questions" element={<PracticeQuestions />} />
            <Route path="/about" element={<About />} />
            <Route path="/coding-platform" element={<CodingPlatform />} />
            <Route path="/blogs" element={<Blogs />} />
            {/* <Route path="/login" element={<LoginForm />} /> */}
            {/* {/* <Route path="/patient-dashboard" element={<PatientDashboard />} /> */}
            {/* <Route path="/profile" element={<Profile />} />
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/scheduleappointment" element={<ScheduleAppointment />} />
            <Route path="/schedule-appointment" element={<AppointmentForm />} />
            <Route path="/register-patient" element={<RegisterPatient />} />
            <Route path="/register-doctor" element={<RegisterDoctor />} />
            <Route path="/reports" element={<Reports />} /> */}
            {/* <Route path="/meeting-room/*" element={<MeetingRoom />} />  */}
          </Routes>
        </div>

        {/* Chatbot */}
        <Chatbot />

        {/* Footer */}
        <ToastContainer />
        <Footer />
      </div>
    </Router>
  );
};

export default App;

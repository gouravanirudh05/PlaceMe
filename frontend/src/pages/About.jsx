import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100">
      <header className="bg-blue-700 text-white shadow-lg p-6">
        <h1 className="text-4xl font-bold text-center">About Our Platform</h1>
      </header>
      <main className="p-8 max-w-7xl mx-auto">
        <section className="grid md:grid-cols-2 gap-8 my-12 items-center">
          <div>
            <h2 className="text-4xl font-semibold text-blue-800 mb-6">
              Welcome to PlacementConnect
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              PlacementConnect revolutionizes campus recruitment by offering a centralized
              platform for colleges, students, and recruiters. Our mission is to simplify and
              streamline the placement process, ensuring a seamless experience for all stakeholders.
            </p>
          </div>
          <img
            src="/assets/applicationManagement.png"
            alt="Placement process illustration"
            className="rounded-lg shadow-lg"
          />
        </section>

        <section className="grid gap-8 lg:grid-cols-2 mb-12">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              We aim to bridge the gap between students and recruiters by providing tools for
              application management, real-time communication, and insightful analytics to improve
              recruitment outcomes.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Key Features</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Centralized management for placement activities across multiple colleges.</li>
              <li>Seamless communication between students, recruiters, and placement officers.</li>
              <li>Automated scheduling and interview tracking.</li>
              <li>Detailed analytics to measure recruitment performance.</li>
              <li>Customizable workflows tailored to individual institutions.</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 shadow-md rounded-lg p-6 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">Why Choose PlacementConnect?</h2>
              <p className="text-gray-700 leading-relaxed">
                Our platform is built with scalability, reliability, and user-friendliness in mind.
                Whether you're a college placement officer, a student preparing for interviews, or
                a recruiter looking for top talent, PlacementConnect provides the tools you need to
                succeed.
              </p>
            </div>
            <img
              src="/assets/recruiterCoordination.png"
              alt="Benefits illustration"
              className="rounded-lg shadow-lg"
            />
          </div>
        </section>

        <section className="bg-white shadow-md rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Get in Touch</h2>
          <p className="text-gray-700">
            Have questions or need support? Our team is here to help you get the most out of
            PlacementConnect.
          </p>
          <div className="mt-4 space-y-2">
            <p className="text-gray-800">
              <strong>Email:</strong> support@placementconnect.com
            </p>
            <p className="text-gray-800">
              <strong>Phone:</strong> +1-800-PLACEMENT
            </p>
          </div>
        </section>

        <div className="flex justify-center">
          <button
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </button>
        </div>
      </main>
    </div>
  );
};

export default About;

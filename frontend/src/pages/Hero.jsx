import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import applicationManagement from "../assets/applicationManagement.png";
import recruiterCoordination from "../assets/recruiterCoordination.png";
import placementAnalytics from "../assets/placementAnalytics.png";

const Hero = () => {
  const navigate = useNavigate();
  const testimonialsRef = useRef(null);
  const typedTextRef = useRef(null);

  const handleGetStarted = () => {
    navigate("/signup"); // Redirect to signup page
  };

  const handleLearnMore = () => {
    testimonialsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const typed = new Typed(typedTextRef.current, {
      strings: ["Simplify Campus Placements Effortlessly"],
      typeSpeed: 60,
      backSpeed: 40,
      startDelay: 300,
      loop: false,
      onComplete: () => {
        const cursor = typedTextRef.current.querySelector(".typed-cursor");
        if (cursor) cursor.style.display = "none";
      },
    });

    return () => typed.destroy();
  }, []);

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto text-center px-4 md:px-8">
        {/* Hero Section */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
          <span ref={typedTextRef}></span>
        </h1>
        <p className="text-gray-600 mt-6 text-lg md:text-xl max-w-2xl mx-auto">
          Revolutionize your campus placement process with an all-in-one platform. 
          Manage applications, coordinate recruiters, and gain insights seamlessly.
        </p>

        {/* GIF */}
        <div className="mt-8">
          <img
            src="https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif?cid=790b7611l1nzk3m0j1pngn8gf3qjj9xytumgrr1swhjb54xz&ep=v1_gifs_search&rid=giphy.gif&ct=g"
            alt="Hero GIF"
            className="mx-auto mt-6"
          />
        </div>

        <div className="mt-8">
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 mx-2"
            onClick={handleGetStarted}
          >
            Get Started
          </button>
          <button
            className="bg-gray-100 text-blue-500 px-6 py-3 rounded hover:bg-gray-200 mx-2"
            onClick={handleLearnMore}
          >
            Learn More
          </button>
        </div>

        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Feature 1 */}
          <div className="bg-white shadow-lg rounded p-8 text-center">
            <img
              src={applicationManagement}
              alt="Application Management"
              className="w-20 h-20 mx-auto"
            />
            <h2 className="text-xl font-semibold text-gray-800 mt-6">
              Application Management
            </h2>
            <p className="text-gray-600 mt-4">
              Centralize and streamline student applications for recruiters.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white shadow-lg rounded p-8 text-center">
            <img
              src={recruiterCoordination}
              alt="Recruiter Coordination"
              className="w-20 h-20 mx-auto"
            />
            <h2 className="text-xl font-semibold text-gray-800 mt-6">
              Recruiter Coordination
            </h2>
            <p className="text-gray-600 mt-4">
              Efficiently manage schedules and communication with recruiters.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white shadow-lg rounded p-8 text-center">
            <img
              src={placementAnalytics}
              alt="Placement Analytics"
              className="w-20 h-20 mx-auto"
            />
            <h2 className="text-xl font-semibold text-gray-800 mt-6">
              Placement Analytics
            </h2>
            <p className="text-gray-600 mt-4">
              Gain insights and metrics to enhance placement outcomes.
            </p>
          </div>
        </div>

        {/* Testimonials Section */}
        <div ref={testimonialsRef} className="mt-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">
            What Our Users Say
          </h2>
          <div className="flex space-x-8 overflow-x-auto">
            {/* Testimonial 1 */}
            <div className="bg-white shadow-lg rounded p-6 w-80 flex-shrink-0">
              <p className="text-gray-600">
                "This platform transformed our placement process. Highly recommend!"
              </p>
              <p className="mt-4 text-gray-800 font-semibold">- Dr. Smith, Placement Officer</p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white shadow-lg rounded p-6 w-80 flex-shrink-0">
              <p className="text-gray-600">
                "The coordination features are a game-changer for our recruiters."
              </p>
              <p className="mt-4 text-gray-800 font-semibold">- Jane D., Recruiter</p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white shadow-lg rounded p-6 w-80 flex-shrink-0">
              <p className="text-gray-600">
                "Simple, intuitive, and incredibly effective for students."
              </p>
              <p className="mt-4 text-gray-800 font-semibold">- Alex R., Student</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 bg-blue-500 text-white py-12 px-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold">
            Ready to Revolutionize Campus Placements?
          </h2>
          <p className="mt-6 text-lg max-w-2xl mx-auto">
            Join colleges nationwide and experience a new level of efficiency in placement management.
          </p>
          <button
            className="bg-white text-blue-500 px-6 py-3 mt-6 rounded hover:bg-gray-100"
            onClick={handleGetStarted}
          >
            Sign Up Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

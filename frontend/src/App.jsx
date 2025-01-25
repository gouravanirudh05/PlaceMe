import React from "react";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {/* Header */}
      <header className="w-full bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold">Welcome to Tailwind CSS Demo Page</h1>
          <p className="text-sm">Experience the power of utility-first styling!</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/300"
              alt="Placeholder"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Responsive Design
              </h2>
              <p className="text-gray-600 mt-2">
                Tailwind makes it easy to create responsive layouts with its
                utility classes.
              </p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                Learn More
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/300"
              alt="Placeholder"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">Customizable</h2>
              <p className="text-gray-600 mt-2">
                Easily extend Tailwind's default styles to match your design
                needs.
              </p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                Learn More
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/300"
              alt="Placeholder"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Developer Friendly
              </h2>
              <p className="text-gray-600 mt-2">
                Write clean, maintainable code using utility-first classes.
              </p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">&copy; 2025 Demo Page. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";

// Temporary page component
function PlaceholderPage({ title }) {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6 pt-24">
      <div className="text-center">
        <p className="text-primary uppercase tracking-[0.3em] text-sm mb-5">
          LuxStay Collection
        </p>

        <h1 className="font-display text-5xl md:text-7xl mb-6">
          {title}
        </h1>

        <p className="text-text-secondary">
          Something extraordinary is coming soon.
        </p>
      </div>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={<PlaceholderPage title="Welcome to LuxStay" />}
          />

          <Route
            path="/hotels"
            element={<PlaceholderPage title="Explore Hotels" />}
          />

          <Route
            path="/destinations"
            element={<PlaceholderPage title="Our Destinations" />}
          />

          <Route
            path="/about"
            element={<PlaceholderPage title="Our Story" />}
          />

          <Route
            path="/contact"
            element={<PlaceholderPage title="Contact Us" />}
          />

          <Route
            path="/wishlist"
            element={<PlaceholderPage title="Your Wishlist" />}
          />

          <Route
            path="/login"
            element={<PlaceholderPage title="Welcome Back" />}
          />

          <Route
            path="*"
            element={<PlaceholderPage title="Page Not Found" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
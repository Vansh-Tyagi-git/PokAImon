import { Routes, Route } from "react-router-dom";

import { lazy, Suspense } from "react";

import ErrorBoundary from "./components/ErrorBoundary.jsx";

import Header from "./components/Header.jsx";
import Spinner from "./components/Spinner.jsx";
import { ApiKeyProvider } from "./context/ApiKeyContext.jsx";

// Regular imports (will be replaced with lazy in Step 8)
// import GeneratorPage from "./pages/GeneratorPage.jsx";
// import GalleryPage from "./pages/GalleryPage.jsx";

// ⏸️ WORKSHOP STEP 7: Replace above with lazy loading
const GeneratorPage = lazy(() => import('./pages/GeneratorPage.jsx'))
const GalleryPage = lazy(() => import('./pages/GalleryPage.jsx'))
const ChatBotPage = lazy(() => import('./pages/ChatBotPage.jsx'))

export default function App() {
  return (
  <ErrorBoundary>
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors">
      <ApiKeyProvider>
      {/* ⏸️ WORKSHOP STEP 8: Wrap in ErrorBoundary */}
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors">
        <Header />
        <main className="flex-1 container mx-auto p-4 lg:p-8">
          <Suspense fallback={<Spinner label="Loading page..." />}>
            <Routes>
              <Route path="/" element={<GeneratorPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/Philos" element={<ChatBotPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </ApiKeyProvider>
    </div>
  </ErrorBoundary>
);
}

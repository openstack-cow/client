import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/home/home';
import Register  from './pages/auth';
import WebsitePage from './pages/weblist/[id]';
import WebsiteList from './pages/weblist';
import Navbar from './pages/home/nav';
import ProtectedRoute from './pages/security/protectedAuth';
import { GlobalMessageProvider } from './components/GlobalMessageContext';
import Plan from './pages/plan/plan';

const App = () => {
  const location = useLocation();

  return (
    <GlobalMessageProvider>
        {location.pathname !== "/auth" && <Navbar />} {/* Render Navbar only if not on auth page */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/websites/:id"
            element={
              <ProtectedRoute>
                <WebsitePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/weblist"
            element={
              <ProtectedRoute>
                <WebsiteList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/plans/setup/:planId"
            element={
              <ProtectedRoute>
                < Plan/>
              </ProtectedRoute>
            }
          />
        </Routes>
    </GlobalMessageProvider>
  );
};

export default App;

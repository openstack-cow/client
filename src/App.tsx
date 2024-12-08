import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
// @ts-ignore
import Register from './pages/auth';
import WebsitePage from './pages/websites/[id]';

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/auth" element={<Register />} />
    <Route path="/websites/:id" element={<WebsitePage />} />s
  </Routes>
);

export default App;

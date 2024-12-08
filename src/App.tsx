import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
// @ts-ignore
import Register from './pages/auth';
import WebsitePage from './pages/websites/[id]';
import WebsiteList from './pages/weblist';

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/auth" element={<Register />} />
    <Route path="/websites/:id" element={<WebsitePage />} />s
    <Route path="/weblist" element={<WebsiteList />} />
  </Routes>
);

export default App;

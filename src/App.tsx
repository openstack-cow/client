import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
// @ts-ignore
import Register from './pages/auth';
import WebsitePage from './pages/weblist/[id]';
import WebsiteList from './pages/weblist';

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/auth" element={<Register />} />
    <Route path="/weblist/:id" element={<WebsitePage />} />
    <Route path="/weblist" element={<WebsiteList />} />
  </Routes>
);

export default App;
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
// @ts-ignore
import Register from './pages/auth';

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/auth" element={<Register />} />
  </Routes>
);

export default App;

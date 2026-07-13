import { Routes, Route } from 'react-router-dom';
import './index.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Brands from './pages/Brands';
import Discover from './pages/Discover';
import Impact from './pages/Impact';
import Careers from './pages/Careers';
import ScrollCokeBottle from './components/common/ScrollCokeBottle';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/careers" element={<Careers />} />
        </Routes>
      </main>
      <ScrollCokeBottle />
      <Footer />
    </>
  );
}

export default App;

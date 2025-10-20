import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Ofertas from './components/Ofertas';
import Infaltables from './components/Infaltables';
import Login from './components/Login'; 
import Footer from './components/Footer';
import Carousel from './components/Carousel';

function App() {

  return (
     <Router>
      <Header />
      <Routes>
        <Route path="/administracion" element={<Login />} />
        <Route path="/carousel" element={<Carousel />} />
        <Route path="/" element={<Home/>} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/infaltables" element={<Infaltables />} />
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App

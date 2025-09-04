import './App.css';
import Header from './components/Header';
import { useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home.jsx';
import About from './Pages/About.jsx';
import Contacts from './Pages/Contacts.jsx';
import Products from './Pages/Products.jsx';
import Footer from './components/Footer';
import ProductDetails from './components/ProductDetails.jsx';
import UserDashboard from './Pages/UserDashboard';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ChangePassword from './Pages/ChangePassword';
import SearchResults from './Pages/SearchResults';
import Checkout from './Pages/Checkout';
import AdminLogin from './Pages/AdminLogin';
import AdminDashboard from './Pages/AdminDashboard';

function App() {
  const searchInputRef = useRef(null);

  const focusSearchInput = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <>
      <div className="mobile-message">
        <h1>This website is best viewed on a Laptop or Desktop</h1>
        <p>Please switch to a larger screen for the best experience.</p>
      </div>

      <div className="app-content">
        <Header searchInputRef={searchInputRef} />
        <Routes>
          <Route index element={<Home />} />
          <Route exact path='/Home' element={<Home />} />
          <Route exact path='/About' element={<About />} />
          <Route exact path='/Contacts' element={<Contacts />} />
          <Route exact path='/Products' element={<Products />} />
          <Route exact path='/Products/:id' element={<ProductDetails />} />
          <Route exact path='/search/:query' element={<SearchResults onRefocusSearch={focusSearchInput} />} />
          <Route exact path='/UserDashboard' element={<UserDashboard />} />
          <Route exact path='/Login' element={<Login />} />
          <Route exact path='/Register' element={<Register />} />
          <Route exact path='/ChangePassword' element={<ChangePassword />} />
          <Route exact path='/checkout' element={<Checkout />} />
          <Route exact path='/admin-login' element={<AdminLogin />} />
          <Route exact path='/admin-dashboard' element={<AdminDashboard />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;

import React from 'react'
import Header from './components/Header'
import SidebarFilters from './components/SidebarFilters'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetail from './pages/ProductDetail';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
           <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </Router>
        
      
    
    </div>
  )
}

export default App
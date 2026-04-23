import {  Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
   <Routes>

    <Route path="/" element={<Navigate to="/login" />} />

     <Route path="/login" element={<Login />} />

     <Route path="/dashboard" element={<Dashboard />} />

     <Route path="/product/:id" element={<ProductDetail />} />

   </Routes>
  )
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
   <BrowserRouter>
   <Routes>

     <Route path="/login" element={<Login />} />

     <Route path="/dashboard" element={<Dashboard />} />

     <Route path="/product/:id" element={<ProductDetail />} />

   </Routes>
   </BrowserRouter>
  )
}

export default App;

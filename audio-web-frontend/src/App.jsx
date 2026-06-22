import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/admin/AdminPage";
import HomePage from "./pages/home/homePage";
import MainLayout from "./pages/home/MainLayout";
import ProductsPage from "./pages/home/ProductsPage";
import RentalsPage from "./pages/home/RentalsPage";
import ContactPage from "./pages/home/contactPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="rentals" element={<RentalsPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
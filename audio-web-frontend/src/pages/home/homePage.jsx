import Header from "../../components/header";
import { Routes, Route } from "react-router-dom";
import HomeContent from "./HomeContent";
import ProductsPage from "./ProductsPage";
import RentalsPage from "./RentalsPage";
import ContactPage from "./contactPage";
import LoginPage from "../login/login";
import RegisterPage from "../register/register";
import EditProfilePage from "../profile/EditProfilePage";
import ItemDetailsPage from "./ItemDetailsPage";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-[#F7F5F0] text-[#10131F] font-sans antialiased">
      <Header />
      <Routes>
        <Route index element={<HomeContent />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="rentals" element={<RentalsPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="edit-profile" element={<EditProfilePage />} />
        <Route path="item/:key" element={<ItemDetailsPage />} />
      </Routes>
    </div>
  );
}
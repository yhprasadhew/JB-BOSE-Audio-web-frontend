import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/admin/AdminPage";
import HomePage from "./pages/home/homePage";
import LoginPage from "./pages/login/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/*" element={<HomePage />} />
        <Route path="/login" element={<LoginPage/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
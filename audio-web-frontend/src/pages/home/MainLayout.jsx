import Header from "../../components/header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="w-full min-h-screen bg-[#F7F5F0] text-[#10131F] font-sans antialiased">
      <Header />
      <Outlet />
    </div>
  );
}

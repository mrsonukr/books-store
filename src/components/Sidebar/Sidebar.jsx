import { useState, useEffect, useMemo } from "react"; // Added useMemo
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";
import {
  LayoutDashboard,
  Upload,
  BookOpen,
  Users,
  Package,
  LogOut,
  HelpCircle,
} from "lucide-react";

export default function Sidebar({ children }) {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const navigate = useNavigate();
  const location = useLocation();

  // Memoize navigationMap to prevent re-creation on every render
  const navigationMap = useMemo(
    () => ({
      Dashboard: "/admin/dashboard",
      "Upload Books": "/admin/uploadbooks",
      "Manage Books": "/admin/managebook",
      Users: "/admin/user",
      Product: "/admin/product",
      Help: "/admin/help",
      Logout: "/login",
    }),
    [] // Empty dependency array since it’s static
  );

  useEffect(() => {
    const currentPath = location.pathname;

    // Find the navigation item that matches the current path or its parent
    const matchedItem = Object.entries(navigationMap).find(([_, path]) =>
      currentPath.startsWith(path)
    );

    // Set activeItem to the matched item or default to "Dashboard"
    const currentItem = matchedItem ? matchedItem[0] : "Dashboard";
    setActiveItem(currentItem);
  }, [location.pathname, navigationMap]);

  const handleNavigation = (item) => {
    setActiveItem(item);
    navigate(navigationMap[item]);
  };

  return (
    <div className="flex h-screen">
      <aside className="w-52">
        <nav className="h-full flex flex-col bg-zinc-50 border-r shadow-sm">
          <div className="p-4 pb-0 flex items-center">
            <h1 className="text-zinc-900 flex m-0 text-[1.5rem]">Books</h1>
          </div>
          <ul className="flex-1 px-3 text-[14px]">
            <SidebarItem
              icon={<LayoutDashboard size={28} />}
              text="Dashboard"
              active={activeItem === "Dashboard"}
              onClick={() => handleNavigation("Dashboard")}
            />
            <SidebarItem
              icon={<Upload size={28} />}
              text="Upload Books"
              active={activeItem === "Upload Books"}
              onClick={() => handleNavigation("Upload Books")}
            />
            <SidebarItem
              icon={<BookOpen size={28} />}
              text="Manage Books"
              active={activeItem === "Manage Books"}
              onClick={() => handleNavigation("Manage Books")}
            />
            <SidebarItem
              icon={<Users size={28} />}
              text="Users"
              active={activeItem === "Users"}
              onClick={() => handleNavigation("Users")}
            />
            <SidebarItem
              icon={<Package size={28} />}
              text="Product"
              active={activeItem === "Product"}
              onClick={() => handleNavigation("Product")}
            />
            <SidebarItem
              icon={<LogOut size={28} />}
              text="Logout"
            />
            <SidebarItem
              icon={<HelpCircle size={28} />}
              text="Help"
              active={activeItem === "Help"}
              onClick={() => handleNavigation("Help")}
            />
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}

export function SidebarItem({ icon, text, active, onClick }) {
  return (
    <li
      onClick={onClick}
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors
        ${
          active
            ? "bg-indigo-100 text-zinc-800"
            : "text-zinc-600 hover:bg-indigo-100"
        }
      `}
    >
      {icon}
      <span className="w-52 ml-3">{text}</span>
    </li>
  );
}
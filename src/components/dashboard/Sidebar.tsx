"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiMessageSquare,
  FiFolder,
  FiEdit,
  FiSettings,
  FiUser,
} from "react-icons/fi";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Messages",
      href: "/dashboard/messages",
      icon: <FiMessageSquare className="w-5 h-5" />,
    },
    {
      name: "Projects",
      href: "/dashboard/projects",
      icon: <FiFolder className="w-5 h-5" />,
    },
    {
      name: "Blogs",
      href: "/dashboard/blogs",
      icon: <FiEdit className="w-5 h-5" />,
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: <FiUser className="w-5 h-5" />,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: <FiSettings className="w-5 h-5" />,
    },
  ];

  return (
    <div className="w-64 h-screen bg-gray-900 text-white border-r border-gray-800 fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-1 text-purple-400">Dashboard</h2>
        <p className="text-sm text-gray-400 mb-8">Welcome back, Admin</p>

        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                    pathname.startsWith(item.href)
                      ? "bg-purple-600/20 text-purple-400 border-l-4 border-purple-400"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <span
                    className={`mr-3 ${
                      pathname.startsWith(item.href)
                        ? "text-purple-400"
                        : "text-gray-400"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12 pt-6 border-t border-gray-800">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center mr-3">
              <span className="font-bold">A</span>
            </div>
            <div>
              <p className="font-medium">Admin User</p>
              <p className="text-xs text-gray-400">admin@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

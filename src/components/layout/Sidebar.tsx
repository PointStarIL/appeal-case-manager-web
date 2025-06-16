
import { cn } from "@/lib/utils";
import { Home, FolderOpen, BarChart3, CheckSquare, Settings } from "lucide-react";

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export const Sidebar = ({ currentPage, onPageChange }: SidebarProps) => {
  const menuItems = [
    { id: "dashboard", label: "דף הבית", icon: Home },
    { id: "cases", label: "תיקים", icon: FolderOpen },
    { id: "reports", label: "דוחות", icon: BarChart3 },
    { id: "tasks", label: "משימות", icon: CheckSquare },
    { id: "settings", label: "הגדרות", icon: Settings },
  ];

  return (
    <aside className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg border-l border-gray-200 z-10">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">מערכת ועדת ערר</h1>
        <p className="text-sm text-gray-600 mt-1">ניהול תיקי ערר</p>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={cn(
                "w-full flex items-center px-6 py-3 text-right hover:bg-gray-100 transition-colors",
                currentPage === item.id 
                  ? "bg-blue-50 text-blue-700 border-l-4 border-blue-700" 
                  : "text-gray-700"
              )}
            >
              <span className="mr-3">{item.label}</span>
              <Icon className="w-5 h-5" />
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

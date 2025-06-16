
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { CasesPage } from "@/components/cases/CasesPage";
import { ReportsPage } from "@/components/reports/ReportsPage";
import { TasksPage } from "@/components/tasks/TasksPage";
import { SettingsPage } from "@/components/settings/SettingsPage";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "cases":
        return <CasesPage />;
      case "reports":
        return <ReportsPage />;
      case "tasks":
        return <TasksPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 rtl" dir="rtl">
      <div className="flex">
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        <main className="flex-1 mr-64">
          <div className="p-6">
            {renderCurrentPage()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;


import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, FileText, Download, BarChart3, PieChart, TrendingUp } from "lucide-react";

export const ReportsPage = () => {
  const [selectedReport, setSelectedReport] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("all");

  const handleGenerateReport = (reportType: string) => {
    console.log(`Generating ${reportType} report`);
    // Here you would implement the actual report generation
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">דוחות</h1>
        <div className="text-sm text-gray-500">
          מערכת דוחות מתקדמת
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Hearings Report */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              דוח דיונים יומי
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hearingDate">תאריך דיון</Label>
              <Input
                id="hearingDate"
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            <Button 
              className="w-full" 
              onClick={() => handleGenerateReport('daily-hearings')}
            >
              <Download className="h-4 w-4 ml-2" />
              הפק דוח
            </Button>
          </CardContent>
        </Card>

        {/* Status Report */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-600" />
              דוח לפי סטטוס
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="statusSelect">סטטוס</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="בחר סטטוס" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">כל הסטטוסים</SelectItem>
                  <SelectItem value="פתוח">פתוח</SelectItem>
                  <SelectItem value="פעיל">פעיל</SelectItem>
                  <SelectItem value="מוקפא">מוקפא</SelectItem>
                  <SelectItem value="נסגר">נסגר</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="statusDateFrom">מתאריך</Label>
                <Input
                  id="statusDateFrom"
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="statusDateTo">עד תאריך</Label>
                <Input
                  id="statusDateTo"
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </div>
            </div>
            <Button 
              className="w-full" 
              onClick={() => handleGenerateReport('status')}
            >
              <Download className="h-4 w-4 ml-2" />
              הפק דוח
            </Button>
          </CardContent>
        </Card>

        {/* Appeal Type Report */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-purple-600" />
              דוח לפי סוג ערר
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="typeSelect">סוג ערר</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="בחר סוג ערר" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">כל הסוגים</SelectItem>
                  <SelectItem value="רישוי">ערר רישוי</SelectItem>
                  <SelectItem value="היטל השבחה">ערר היטל השבחה</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="typeDateFrom">מתאריך</Label>
                <Input
                  id="typeDateFrom"
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="typeDateTo">עד תאריך</Label>
                <Input
                  id="typeDateTo"
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </div>
            </div>
            <Button 
              className="w-full" 
              onClick={() => handleGenerateReport('appeal-type')}
            >
              <Download className="h-4 w-4 ml-2" />
              הפק דוח
            </Button>
          </CardContent>
        </Card>

        {/* Active Cases Report */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              דוח תיקים פעילים
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              דוח מקיף של כל התיקים הפעילים במערכת, כולל דיונים קרובים ומשימות ממתינות.
            </p>
            <Button 
              className="w-full" 
              onClick={() => handleGenerateReport('active-cases')}
            >
              <Download className="h-4 w-4 ml-2" />
              הפק דוח
            </Button>
          </CardContent>
        </Card>

        {/* Tasks Report */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-red-600" />
              דוח משימות
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="userSelect">משתמש</Label>
                <Select value={userFilter} onValueChange={setUserFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="בחר משתמש" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">כל המשתמשים</SelectItem>
                    <SelectItem value="user1">משתמש 1</SelectItem>
                    <SelectItem value="user2">משתמש 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="taskStatusSelect">סטטוס משימה</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="בחר סטטוס" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">כל הסטטוסים</SelectItem>
                    <SelectItem value="פתוחה">פתוחה</SelectItem>
                    <SelectItem value="בטיפול">בטיפול</SelectItem>
                    <SelectItem value="הושלמה">הושלמה</SelectItem>
                    <SelectItem value="פגה">פגה</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button 
              className="w-full" 
              onClick={() => handleGenerateReport('tasks')}
            >
              <Download className="h-4 w-4 ml-2" />
              הפק דוח משימות
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle>סטטיסטיקות מהירות</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">45</div>
              <div className="text-sm text-gray-600">תיקים פעילים</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">23</div>
              <div className="text-sm text-gray-600">ערר רישוי</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">22</div>
              <div className="text-sm text-gray-600">ערר היטל השבחה</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">12</div>
              <div className="text-sm text-gray-600">משימות פתוחות</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

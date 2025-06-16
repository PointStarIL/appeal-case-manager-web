
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, AlertTriangle, FileText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchStats, fetchHearings, fetchUrgentTasks } from "@/api";

export const Dashboard = () => {
  const { data: stats } = useQuery({ queryKey: ['stats'], queryFn: fetchStats });
  const { data: upcomingHearings = [] } = useQuery({ queryKey: ['hearings'], queryFn: fetchHearings });
  const { data: urgentTasks = [] } = useQuery({ queryKey: ['urgentTasks'], queryFn: fetchUrgentTasks });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "destructive";
      case "high": return "default";
      case "medium": return "secondary";
      default: return "outline";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "urgent": return "⚡";
      case "high": return "🔶";
      case "medium": return "🔸";
      default: return "⚪";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">דף הבית</h1>
        <div className="text-sm text-gray-500">
          עדכון אחרון: {new Date().toLocaleDateString('he-IL')}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">תיקים פעילים</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{stats.activeCases}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">דיונים השבוע</CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{stats.weeklyHearings}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">משימות פתוחות</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">{stats.openTasks}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-700">תיקים מוקפאים</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900">{stats.frozenCases}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Hearings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              דיונים קרובים
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingHearings.map((hearing, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex flex-col">
                    <span className="font-medium">{hearing.subject}</span>
                    <span className="text-sm text-gray-600">תיק מס' {hearing.caseNumber}</span>
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium">
                      {new Date(hearing.date).toLocaleDateString('he-IL')}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      מתוכנן
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              צפה בכל הדיונים
            </Button>
          </CardContent>
        </Card>

        {/* Urgent Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              משימות דחופות
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {urgentTasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{getPriorityIcon(task.priority)}</span>
                    <div className="flex flex-col">
                      <span className="font-medium">{task.title}</span>
                      <span className="text-sm text-gray-600">תיק מס' {task.caseNumber}</span>
                    </div>
                  </div>
                  <Badge variant={getPriorityColor(task.priority) as any} className="text-xs">
                    דחוף
                  </Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              צפה בכל המשימות
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>פעולות מהירות</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-16 flex flex-col gap-2" variant="outline">
              <FileText className="h-6 w-6" />
              <span>תיק חדש</span>
            </Button>
            <Button className="h-16 flex flex-col gap-2" variant="outline">
              <Calendar className="h-6 w-6" />
              <span>קבע דיון</span>
            </Button>
            <Button className="h-16 flex flex-col gap-2" variant="outline">
              <Clock className="h-6 w-6" />
              <span>משימה חדשה</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

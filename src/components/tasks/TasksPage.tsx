
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "@/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Clock, CheckCircle } from "lucide-react";
import { NewTaskDialog } from "./NewTaskDialog";

export const TasksPage = () => {
  const [showNewTaskDialog, setShowNewTaskDialog] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: tasks = [] } = useQuery({ queryKey: ['tasks'], queryFn: fetchTasks });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "destructive";
      case "high": return "default";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "outline";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "פתוחה": return "default";
      case "בטיפול": return "secondary";
      case "הושלמה": return "outline";
      default: return "outline";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "urgent": return "⚡";
      case "high": return "🔶";
      case "medium": return "🔸";
      case "low": return "⚪";
      default: return "⚪";
    }
  };

  const isOverdue = (dueDate: string, status: string) => {
    if (status === "הושלמה") return false;
    return new Date(dueDate) < new Date();
  };

  const filteredTasks = tasks.filter(task => {
    if (statusFilter === "all") return true;
    return task.status === statusFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">משימות</h1>
        <Button onClick={() => setShowNewTaskDialog(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          משימה חדשה
        </Button>
      </div>

      {/* Filter Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex gap-2">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                onClick={() => setStatusFilter("all")}
                size="sm"
              >
                הכל
              </Button>
              <Button
                variant={statusFilter === "פתוחה" ? "default" : "outline"}
                onClick={() => setStatusFilter("פתוחה")}
                size="sm"
              >
                פתוחות
              </Button>
              <Button
                variant={statusFilter === "בטיפול" ? "default" : "outline"}
                onClick={() => setStatusFilter("בטיפול")}
                size="sm"
              >
                בטיפול
              </Button>
              <Button
                variant={statusFilter === "הושלמה" ? "default" : "outline"}
                onClick={() => setStatusFilter("הושלמה")}
                size="sm"
              >
                הושלמו
              </Button>
            </div>
            <div className="text-sm text-gray-600 mr-auto">
              סה"כ {filteredTasks.length} משימות
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <Card key={task.id} className={`${isOverdue(task.dueDate, task.status) ? 'border-red-200 bg-red-50' : ''}`}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg">{getPriorityIcon(task.priority)}</span>
                    <h3 className="font-semibold text-lg">{task.title}</h3>
                    <Badge variant={getPriorityColor(task.priority) as any} className="text-xs">
                      {task.priority === "urgent" ? "דחוף" : 
                       task.priority === "high" ? "גבוה" :
                       task.priority === "medium" ? "בינוני" : "נמוך"}
                    </Badge>
                    <Badge variant={getStatusColor(task.status) as any} className="text-xs">
                      {task.status}
                    </Badge>
                    {isOverdue(task.dueDate, task.status) && (
                      <Badge variant="destructive" className="text-xs">
                        פגה
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-3">{task.description}</p>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <span>תיק:</span>
                      <span className="font-medium">{task.caseNumber}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>משוטח ל:</span>
                      <span className="font-medium">{task.assignedTo}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>תאריך יעד:</span>
                      <span className="font-medium">
                        {new Date(task.dueDate).toLocaleDateString('he-IL')}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  {task.status !== "הושלמה" && (
                    <Button variant="ghost" size="sm" className="text-green-600">
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-gray-500">
              <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">אין משימות להצגה</h3>
              <p>לא נמצאו משימות בהתאם לסינון שנבחר</p>
            </div>
          </CardContent>
        </Card>
      )}

      <NewTaskDialog 
        open={showNewTaskDialog} 
        onOpenChange={setShowNewTaskDialog}
      />
    </div>
  );
};

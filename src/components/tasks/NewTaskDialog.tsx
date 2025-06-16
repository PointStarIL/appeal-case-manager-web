
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createTask } from "@/api";

interface NewTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewTaskDialog = ({ open, onOpenChange }: NewTaskDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    caseNumber: "",
    assignedTo: "",
    priority: "medium",
    dueDate: "",
  });

  // Mock data for dropdowns
  const users = ["משתמש 1", "משתמש 2", "משתמש 3"];
  const cases = ["1033/25", "8034/23", "8075/24", "2156/24"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createTask(formData);
    
    toast({
      title: "משימה נוצרה בהצלחה",
      description: `המשימה "${formData.title}" נוצרה במערכת`,
    });
    
    // Reset form
    setFormData({
      title: "",
      description: "",
      caseNumber: "",
      assignedTo: "",
      priority: "medium",
      dueDate: "",
    });
    
    onOpenChange(false);
  };

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      caseNumber: "",
      assignedTo: "",
      priority: "medium",
      dueDate: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">משימה חדשה</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">כותרת המשימה *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="כותרת המשימה"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">תיאור המשימה</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="תיאור מפורט של המשימה"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="caseNumber">תיק קשור</Label>
                <Select value={formData.caseNumber} onValueChange={(value) => setFormData({...formData, caseNumber: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="בחר תיק" />
                  </SelectTrigger>
                  <SelectContent>
                    {cases.map((caseNum) => (
                      <SelectItem key={caseNum} value={caseNum}>{caseNum}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="assignedTo">משוטח ל *</Label>
                <Select value={formData.assignedTo} onValueChange={(value) => setFormData({...formData, assignedTo: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="בחר משתמש" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user} value={user}>{user}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority">עדיפות</Label>
                <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">נמוכה</SelectItem>
                    <SelectItem value="medium">בינונית</SelectItem>
                    <SelectItem value="high">גבוהה</SelectItem>
                    <SelectItem value="urgent">דחופה</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueDate">תאריך יעד</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              <X className="h-4 w-4 ml-2" />
              ביטול
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 ml-2" />
              שמור משימה
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};


import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const SettingsPage = () => {
  const { toast } = useToast();
  const [newRequestType, setNewRequestType] = useState("");
  const [newRealizationType, setNewRealizationType] = useState("");

  // Mock data - in real app this would come from API
  const [requestTypes, setRequestTypes] = useState([
    "הרחבת בניין קיים",
    "תוספת קומה",
    "חלוקת יחידה",
    "שינוי ייעוד",
    "בניין חדש",
    "שינוי בחזית",
    "הוספת מרפסת"
  ]);

  const [realizationTypes, setRealizationTypes] = useState([
    "מימוש בהיתר",
    "מימוש במכר",
    "מימוש בהסכם",
    "מימוש בחלוקה"
  ]);

  const addRequestType = () => {
    if (newRequestType.trim() && !requestTypes.includes(newRequestType.trim())) {
      setRequestTypes([...requestTypes, newRequestType.trim()]);
      setNewRequestType("");
      toast({
        title: "סוג בקשה נוסף",
        description: `סוג הבקשה "${newRequestType}" נוסף בהצלחה`,
      });
    }
  };

  const removeRequestType = (type: string) => {
    setRequestTypes(requestTypes.filter(t => t !== type));
    toast({
      title: "סוג בקשה הוסר",
      description: `סוג הבקשה "${type}" הוסר מהמערכת`,
    });
  };

  const addRealizationType = () => {
    if (newRealizationType.trim() && !realizationTypes.includes(newRealizationType.trim())) {
      setRealizationTypes([...realizationTypes, newRealizationType.trim()]);
      setNewRealizationType("");
      toast({
        title: "סוג מימוש נוסף",
        description: `סוג המימוש "${newRealizationType}" נוסף בהצלחה`,
      });
    }
  };

  const removeRealizationType = (type: string) => {
    setRealizationTypes(realizationTypes.filter(t => t !== type));
    toast({
      title: "סוג מימוש הוסר",
      description: `סוג המימוש "${type}" הוסר מהמערכת`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">הגדרות מערכת</h1>
        <div className="text-sm text-gray-500">
          ניהול רשימות מערכת
        </div>
      </div>

      {/* Request Types Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📋 סוגי בקשות (לערר רישוי)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="הוסף סוג בקשה חדש..."
              value={newRequestType}
              onChange={(e) => setNewRequestType(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addRequestType()}
              className="flex-1"
            />
            <Button onClick={addRequestType} disabled={!newRequestType.trim()}>
              <Plus className="h-4 w-4 ml-2" />
              הוסף
            </Button>
          </div>

          <div className="space-y-2">
            {requestTypes.map((type, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">{type}</span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeRequestType(type)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Realization Types Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            💰 סוגי מימוש (לערר היטל השבחה)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="הוסף סוג מימוש חדש..."
              value={newRealizationType}
              onChange={(e) => setNewRealizationType(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addRealizationType()}
              className="flex-1"
            />
            <Button onClick={addRealizationType} disabled={!newRealizationType.trim()}>
              <Plus className="h-4 w-4 ml-2" />
              הוסף
            </Button>
          </div>

          <div className="space-y-2">
            {realizationTypes.map((type, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">{type}</span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeRealizationType(type)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card>
        <CardHeader>
          <CardTitle>הגדרות כלליות</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="systemName">שם המערכת</Label>
              <Input
                id="systemName"
                defaultValue="מערכת ועדת ערר"
                placeholder="שם המערכת"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="organizationName">שם הארגון</Label>
              <Input
                id="organizationName"
                defaultValue="עיריית דוגמה"
                placeholder="שם הארגון"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reminderDays">ימים להתרעה על דיון קרוב</Label>
            <Input
              id="reminderDays"
              type="number"
              defaultValue="7"
              placeholder="מספר ימים"
              min="1"
              max="30"
            />
          </div>

          <Button className="w-full md:w-auto">
            <Save className="h-4 w-4 ml-2" />
            שמור הגדרות
          </Button>
        </CardContent>
      </Card>

      {/* User Management */}
      <Card>
        <CardHeader>
          <CardTitle>ניהול משתמשים</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">משתמש 1</div>
                <div className="text-sm text-gray-600">admin@example.com</div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="default">עורך</Badge>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">משתמש 2</div>
                <div className="text-sm text-gray-600">viewer@example.com</div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">צופה</Badge>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 ml-2" />
              הוסף משתמש חדש
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createCase } from "@/api";

interface BettermentTaxAppealFormProps {
  onClose: () => void;
}

export const BettermentTaxAppealForm = ({ onClose }: BettermentTaxAppealFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    appealNumber: "",
    caseNumber: "",
    subject: "",
    planningScheme: "",
    gushChalka: "",
    address: "",
    realizationDate: "",
    realizationType: "",
    status: "פתוח",
    notes: ""
  });

  const [assessors, setAssessors] = useState([
    { type: "ועדה", name: "", company: "", amount: "", appointmentDate: "" },
    { type: "מכריע", name: "", company: "", amount: "", appointmentDate: "" },
    { type: "עורר", name: "", company: "", amount: "", appointmentDate: "" },
    { type: "משיב", name: "", company: "", amount: "", appointmentDate: "" }
  ]);

  const [appellants, setAppellants] = useState([{ name: "", lawyer: "", phone: "", email: "" }]);
  const [respondents, setRespondents] = useState([{ name: "", type: "", lawyer: "", phone: "", email: "" }]);

  const realizationTypes = [
    "מימוש בהיתר",
    "מימוש במכר",
    "מימוש בהסכם",
    "מימוש בחלוקה"
  ];

  const addAppellant = () => {
    setAppellants([...appellants, { name: "", lawyer: "", phone: "", email: "" }]);
  };

  const removeAppellant = (index: number) => {
    setAppellants(appellants.filter((_, i) => i !== index));
  };

  const addRespondent = () => {
    setRespondents([...respondents, { name: "", type: "", lawyer: "", phone: "", email: "" }]);
  };

  const removeRespondent = (index: number) => {
    setRespondents(respondents.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createCase({
      ...formData,
      assessors: JSON.stringify(assessors),
      appellants: JSON.stringify(appellants),
      respondents: JSON.stringify(respondents)
    });
    
    toast({
      title: "תיק נשמר בהצלחה",
      description: `תיק ערר היטל השבחה מספר ${formData.appealNumber} נוצר במערכת`,
    });
    
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>פרטים בסיסיים</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="appealNumber">מספר ערר *</Label>
              <Input
                id="appealNumber"
                value={formData.appealNumber}
                onChange={(e) => setFormData({...formData, appealNumber: e.target.value})}
                placeholder="לדוגמה: 8034/23"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="caseNumber">מספר בקשה</Label>
              <Input
                id="caseNumber"
                value={formData.caseNumber}
                onChange={(e) => setFormData({...formData, caseNumber: e.target.value})}
                placeholder="מספר בקשה"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">נושא *</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              placeholder="נושא הערר"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="planningScheme">תוכנית</Label>
              <Input
                id="planningScheme"
                value={formData.planningScheme}
                onChange={(e) => setFormData({...formData, planningScheme: e.target.value})}
                placeholder="תוכנית"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gushChalka">גוש וחלקה</Label>
              <Input
                id="gushChalka"
                value={formData.gushChalka}
                onChange={(e) => setFormData({...formData, gushChalka: e.target.value})}
                placeholder="גוש וחלקה"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">כתובת</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              placeholder="כתובת הנכס"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="realizationDate">תאריך מימוש</Label>
              <Input
                id="realizationDate"
                type="date"
                value={formData.realizationDate}
                onChange={(e) => setFormData({...formData, realizationDate: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="realizationType">סוג מימוש</Label>
              <Select value={formData.realizationType} onValueChange={(value) => setFormData({...formData, realizationType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="בחר סוג מימוש" />
                </SelectTrigger>
                <SelectContent>
                  {realizationTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">סטטוס</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="פתוח">פתוח</SelectItem>
                  <SelectItem value="פעיל">פעיל</SelectItem>
                  <SelectItem value="מוקפא">מוקפא</SelectItem>
                  <SelectItem value="נסגר">נסגר</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assessors */}
      <Card>
        <CardHeader>
          <CardTitle>שמאים</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {assessors.map((assessor, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-4">
              <h4 className="font-medium">שמאי {assessor.type}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>שם השמאי</Label>
                  <Input
                    placeholder="שם השמאי"
                    value={assessor.name}
                    onChange={(e) => {
                      const newAssessors = [...assessors];
                      newAssessors[index].name = e.target.value;
                      setAssessors(newAssessors);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>חברת שמאות</Label>
                  <Input
                    placeholder="חברת שמאות"
                    value={assessor.company}
                    onChange={(e) => {
                      const newAssessors = [...assessors];
                      newAssessors[index].company = e.target.value;
                      setAssessors(newAssessors);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>שומה (₪)</Label>
                  <Input
                    placeholder="סכום שומה"
                    type="number"
                    value={assessor.amount}
                    onChange={(e) => {
                      const newAssessors = [...assessors];
                      newAssessors[index].amount = e.target.value;
                      setAssessors(newAssessors);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>תאריך מינוי</Label>
                  <Input
                    type="date"
                    value={assessor.appointmentDate}
                    onChange={(e) => {
                      const newAssessors = [...assessors];
                      newAssessors[index].appointmentDate = e.target.value;
                      setAssessors(newAssessors);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Appellants */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>עוררים</CardTitle>
            <Button type="button" variant="outline" size="sm" onClick={addAppellant}>
              <Plus className="h-4 w-4 ml-2" />
              הוסף עורר
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {appellants.map((appellant, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">עורר {index + 1}</h4>
                {appellants.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAppellant(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="שם העורר"
                  value={appellant.name}
                  onChange={(e) => {
                    const newAppellants = [...appellants];
                    newAppellants[index].name = e.target.value;
                    setAppellants(newAppellants);
                  }}
                />
                <Input
                  placeholder="עורך דין"
                  value={appellant.lawyer}
                  onChange={(e) => {
                    const newAppellants = [...appellants];
                    newAppellants[index].lawyer = e.target.value;
                    setAppellants(newAppellants);
                  }}
                />
                <Input
                  placeholder="טלפון"
                  value={appellant.phone}
                  onChange={(e) => {
                    const newAppellants = [...appellants];
                    newAppellants[index].phone = e.target.value;
                    setAppellants(newAppellants);
                  }}
                />
                <Input
                  placeholder="אימייל"
                  type="email"
                  value={appellant.email}
                  onChange={(e) => {
                    const newAppellants = [...appellants];
                    newAppellants[index].email = e.target.value;
                    setAppellants(newAppellants);
                  }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Respondents */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>משיבים</CardTitle>
            <Button type="button" variant="outline" size="sm" onClick={addRespondent}>
              <Plus className="h-4 w-4 ml-2" />
              הוסף משיב
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {respondents.map((respondent, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">משיב {index + 1}</h4>
                {respondents.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeRespondent(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="שם המשיב"
                  value={respondent.name}
                  onChange={(e) => {
                    const newRespondents = [...respondents];
                    newRespondents[index].name = e.target.value;
                    setRespondents(newRespondents);
                  }}
                />
                <Input
                  placeholder="סוג משיב"
                  value={respondent.type}
                  onChange={(e) => {
                    const newRespondents = [...respondents];
                    newRespondents[index].type = e.target.value;
                    setRespondents(newRespondents);
                  }}
                />
                <Input
                  placeholder="עורך דין"
                  value={respondent.lawyer}
                  onChange={(e) => {
                    const newRespondents = [...respondents];
                    newRespondents[index].lawyer = e.target.value;
                    setRespondents(newRespondents);
                  }}
                />
                <Input
                  placeholder="טלפון"
                  value={respondent.phone}
                  onChange={(e) => {
                    const newRespondents = [...respondents];
                    newRespondents[index].phone = e.target.value;
                    setRespondents(newRespondents);
                  }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Notes */}
      <Card>
        <CardHeader>
          <CardTitle>הערות</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="הערות כלליות לתיק..."
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            rows={4}
          />
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-4 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          <X className="h-4 w-4 ml-2" />
          ביטול
        </Button>
        <Button type="submit">
          <Save className="h-4 w-4 ml-2" />
          שמור תיק
        </Button>
      </div>
    </form>
  );
};

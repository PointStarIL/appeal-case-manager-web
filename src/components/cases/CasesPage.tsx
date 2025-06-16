
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCases } from "@/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Eye, Edit, Filter } from "lucide-react";
import { NewCaseDialog } from "./NewCaseDialog";

export const CasesPage = () => {
  const [showNewCaseDialog, setShowNewCaseDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: cases = [] } = useQuery({ queryKey: ['cases'], queryFn: fetchCases });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "פעיל": return "default";
      case "מוקפא": return "secondary";
      case "נסגר": return "outline";
      default: return "outline";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "רישוי": return "bg-blue-100 text-blue-800";
      case "היטל השבחה": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredCases = cases.filter(caseItem => {
    const matchesSearch = caseItem.appealNumber.includes(searchTerm) || 
                         caseItem.appellants.includes(searchTerm) ||
                         caseItem.subject.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || caseItem.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">תיקי ערר</h1>
        <Button onClick={() => setShowNewCaseDialog(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          תיק חדש
        </Button>
      </div>

      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="חיפוש לפי מספר ערר, עורר או נושא..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 ml-2" />
                <SelectValue placeholder="סנן לפי סטטוס" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">כל הסטטוסים</SelectItem>
                <SelectItem value="פעיל">פעיל</SelectItem>
                <SelectItem value="מוקפא">מוקפא</SelectItem>
                <SelectItem value="נסגר">נסגר</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Cases Table */}
      <Card>
        <CardHeader>
          <CardTitle>רשימת תיקים ({filteredCases.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-right py-3 px-4 font-medium">מספר ערר</th>
                  <th className="text-right py-3 px-4 font-medium">סוג ערר</th>
                  <th className="text-right py-3 px-4 font-medium">עוררים</th>
                  <th className="text-right py-3 px-4 font-medium">נושא</th>
                  <th className="text-right py-3 px-4 font-medium">סטטוס</th>
                  <th className="text-right py-3 px-4 font-medium">דיון הבא</th>
                  <th className="text-right py-3 px-4 font-medium">פעולות</th>
                </tr>
              </thead>
              <tbody>
                {filteredCases.map((caseItem) => (
                  <tr key={caseItem.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{caseItem.appealNumber}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(caseItem.type)}`}>
                        {caseItem.type}
                      </span>
                    </td>
                    <td className="py-3 px-4">{caseItem.appellants}</td>
                    <td className="py-3 px-4">{caseItem.subject}</td>
                    <td className="py-3 px-4">
                      <Badge variant={getStatusColor(caseItem.status) as any}>
                        {caseItem.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      {caseItem.nextHearing !== "טרם נקבע" && caseItem.nextHearing !== "הושלם" 
                        ? new Date(caseItem.nextHearing).toLocaleDateString('he-IL')
                        : caseItem.nextHearing
                      }
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <NewCaseDialog 
        open={showNewCaseDialog} 
        onOpenChange={setShowNewCaseDialog}
      />
    </div>
  );
};

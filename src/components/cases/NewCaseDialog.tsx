
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building, DollarSign, X } from "lucide-react";
import { LicensingAppealForm } from "./LicensingAppealForm";
import { BettermentTaxAppealForm } from "./BettermentTaxAppealForm";

interface NewCaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewCaseDialog = ({ open, onOpenChange }: NewCaseDialogProps) => {
  const [selectedType, setSelectedType] = useState<"licensing" | "betterment" | null>(null);

  const handleClose = () => {
    setSelectedType(null);
    onOpenChange(false);
  };

  const renderContent = () => {
    if (!selectedType) {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-medium mb-4">אנא בחר סוג ערר:</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-blue-300"
              onClick={() => setSelectedType("licensing")}
            >
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <Building className="h-12 w-12 text-blue-600 mb-4" />
                <h4 className="text-lg font-medium mb-2">ערר רישוי</h4>
                <p className="text-sm text-gray-600">ערר על החלטות ועדת תכנון ותכנון</p>
                <Button className="mt-4" variant="outline">
                  בחר
                </Button>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-green-300"
              onClick={() => setSelectedType("betterment")}
            >
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <DollarSign className="h-12 w-12 text-green-600 mb-4" />
                <h4 className="text-lg font-medium mb-2">ערר היטל השבחה</h4>
                <p className="text-sm text-gray-600">ערר על שומת היטל השבחה</p>
                <Button className="mt-4" variant="outline">
                  בחר
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center pt-4">
            <Button variant="ghost" onClick={handleClose}>
              <X className="h-4 w-4 ml-2" />
              ביטול
            </Button>
          </div>
        </div>
      );
    }

    return selectedType === "licensing" 
      ? <LicensingAppealForm onClose={handleClose} />
      : <BettermentTaxAppealForm onClose={handleClose} />;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {!selectedType 
              ? "תיק ערר חדש" 
              : selectedType === "licensing" 
                ? "פרטי ערר רישוי" 
                : "פרטי ערר היטל השבחה"
            }
          </DialogTitle>
        </DialogHeader>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};

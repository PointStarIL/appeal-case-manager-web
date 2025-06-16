# מערכת ועדת ערר - Appeal Case Manager Web Application

## מטרת הפרויקט (Project Purpose)

מערכת ועדת ערר היא אפליקציית ווב לניהול תיקי ערר עבור ועדות תכנון ובנייה. המערכת מאפשרת ניהול מקיף של תיקי ערר בתחומי רישוי ובנייה והיטלי השבחה, כולל:

1. **ניהול תיקים** - יצירה וניהול של תיקי ערר מסוגים שונים (רישוי והיטל השבחה), כולל מעקב אחר סטטוס התיקים, פרטי העוררים והמשיבים.
2. **ניהול משימות** - יצירה ומעקב אחר משימות הקשורות לתיקים, כולל הקצאת משימות למשתמשים, קביעת תאריכי יעד ועדיפויות.
3. **ניהול דיונים** - תזמון וניהול דיונים עבור תיקי הערר.
4. **הפקת דוחות** - יצירת דוחות שונים לניתוח נתוני המערכת, כגון דוחות לפי סטטוס, סוג ערר, משימות ועוד.
5. **הגדרות מערכת** - ניהול הגדרות המערכת, כולל סוגי בקשות, סוגי מימוש, ניהול משתמשים ועוד.

האפליקציה מיועדת לשימוש בשפה העברית (RTL) ומותאמת לצרכים הספציפיים של ועדות ערר בישראל.

## מבנה הקבצים (File Structure)

הפרויקט בנוי באמצעות React עם TypeScript, Vite כמערכת בנייה, ו-Tailwind CSS עם Shadcn UI לעיצוב הממשק. להלן מבנה הקבצים העיקרי:

### קבצי תצורה (Configuration Files)
- `package.json` - הגדרות הפרויקט והתלויות
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` - הגדרות TypeScript
- `vite.config.ts` - הגדרות Vite
- `tailwind.config.ts` - הגדרות Tailwind CSS
- `postcss.config.js` - הגדרות PostCSS
- `eslint.config.js` - הגדרות ESLint
- `components.json` - הגדרות רכיבי Shadcn UI

### קבצי מקור (Source Files)
- `src/main.tsx` - נקודת הכניסה לאפליקציה
- `src/App.tsx` - הרכיב הראשי של האפליקציה, מגדיר את ניתוב הדפים
- `src/index.css`, `src/App.css` - קבצי CSS גלובליים

### דפים (Pages)
- `src/pages/Index.tsx` - הדף הראשי המכיל את הניווט בין המסכים השונים
- `src/pages/NotFound.tsx` - דף שגיאה 404

### רכיבים (Components)
- `src/components/Dashboard.tsx` - דף הבית עם סיכום נתונים ופעולות מהירות
- `src/components/layout/Sidebar.tsx` - סרגל צד לניווט בין המסכים

#### ניהול תיקים (Cases)
- `src/components/cases/CasesPage.tsx` - עמוד ניהול התיקים
- `src/components/cases/NewCaseDialog.tsx` - דיאלוג ליצירת תיק חדש
- `src/components/cases/LicensingAppealForm.tsx` - טופס ליצירת ערר רישוי
- `src/components/cases/BettermentTaxAppealForm.tsx` - טופס ליצירת ערר היטל השבחה

#### ניהול משימות (Tasks)
- `src/components/tasks/TasksPage.tsx` - עמוד ניהול המשימות
- `src/components/tasks/NewTaskDialog.tsx` - דיאלוג ליצירת משימה חדשה

#### דוחות (Reports)
- `src/components/reports/ReportsPage.tsx` - עמוד הפקת דוחות

#### הגדרות (Settings)
- `src/components/settings/SettingsPage.tsx` - עמוד הגדרות המערכת

#### רכיבי ממשק (UI Components)
- `src/components/ui/` - ספריית רכיבי UI מבוססי Shadcn UI (כפתורים, תיבות טקסט, דיאלוגים וכו')

### הוקים (Hooks)
- `src/hooks/use-toast.ts` - הוק להצגת הודעות למשתמש
- `src/hooks/use-mobile.tsx` - הוק לזיהוי תצוגה במכשירים ניידים

### ספריות עזר (Utilities)
- `src/lib/utils.ts` - פונקציות עזר שימושיות

### קבצים ציבוריים (Public Files)
- `public/favicon.ico` - אייקון האתר
- `public/placeholder.svg` - תמונת ממלא מקום
- `public/robots.txt` - הגדרות עבור מנועי חיפוש

## טכנולוגיות (Technologies)

- **React** - ספריית JavaScript לבניית ממשקי משתמש
- **TypeScript** - הרחבה של JavaScript עם תמיכה בטיפוסים
- **Vite** - כלי בנייה מהיר לפיתוח פרונט-אנד
- **Tailwind CSS** - מסגרת CSS מבוססת utility classes
- **Shadcn UI** - ספריית רכיבי UI מבוססת Radix UI ו-Tailwind
- **React Router** - ספריית ניתוב עבור React
- **React Query** - ספריה לניהול מצב שרת ב-React
- **React Hook Form** - ספריה לניהול טפסים ב-React
- **Zod** - ספריית ולידציה לטפסים
- **Lucide React** - ספריית אייקונים
- **Recharts** - ספריית גרפים ותרשימים

המערכת מתוכננת לתמוך בניהול מלא של תהליכי ערר, מהגשת הערר ועד לסגירתו, עם דגש על ממשק משתמש נוח ויעיל בעברית.

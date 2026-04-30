import { Flame, Target, Clock, BookOpen } from "lucide-react";

export function BadgesCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" dir="rtl">
      
      {/* البطاقة الأولى: أيام متتالية */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-between shadow-sm hover:shadow-md transition">
        <div className="bg-red-50 p-3 rounded-full">
          <Flame className="text-red-400 w-6 h-6" />
        </div>
        <div className="text-left">
          <h3 className="text-2xl font-bold text-gray-800">7 أيام</h3>
          <p className="text-sm text-gray-500">أيام متتالية</p>
        </div>
      </div>

      {/* البطاقة الثانية: مهام مكتملة */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-between shadow-sm hover:shadow-md transition">
        <div className="bg-purple-50 p-3 rounded-full">
          <Target className="text-purple-400 w-6 h-6" />
        </div>
        <div className="text-left">
          <h3 className="text-2xl font-bold text-gray-800">42</h3>
          <p className="text-sm text-gray-500">مهام مكتملة</p>
        </div>
      </div>

      {/* البطاقة الثالثة: ساعات التعلم */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-between shadow-sm hover:shadow-md transition">
        <div className="bg-teal-50 p-3 rounded-full">
          <Clock className="text-teal-400 w-6 h-6" />
        </div>
        <div className="text-left">
          <h3 className="text-2xl font-bold text-gray-800">18.5 س</h3>
          <p className="text-sm text-gray-500">ساعات التعلم</p>
        </div>
      </div>

      {/* البطاقة الرابعة: صفحات محفوظة */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-between shadow-sm hover:shadow-md transition">
        <div className="bg-green-50 p-3 rounded-full">
          <BookOpen className="text-green-500 w-6 h-6" />
        </div>
        <div className="text-left">
          <h3 className="text-2xl font-bold text-gray-800">12</h3>
          <p className="text-sm text-gray-500">صفحات محفوظة</p>
        </div>
      </div>

    </div>
  );
}

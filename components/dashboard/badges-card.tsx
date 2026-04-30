<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>لوحة المتابعة القرآني</title>
    <!-- استخدام Tailwind CSS للتصميم -->
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap');
        body {
            font-family: 'Tajawal', sans-serif;
            background-color: #f9fafb;
        }
    </style>
</head>
<body class="p-6">

    <div class="max-w-6xl mx-auto space-y-8">

        <!-- القسم الأول: البطاقات العلوية -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <!-- بطاقة 1: الجملة الحماسية -->
            <div class="bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-center text-center shadow-sm hover:shadow-md transition">
                <h3 class="text-xl font-bold text-green-700">✨ رحلة مختلفة مع القرآن</h3>
            </div>

            <!-- بطاقة 2: المهام المكتملة -->
            <div class="bg-white rounded-xl border border-gray-200 p-6 flex justify-between items-center shadow-sm hover:shadow-md transition">
                <div>
                    <p class="text-3xl font-bold text-gray-800">42</p>
                    <p class="text-sm text-gray-500 mt-1">مهام مكتملة</p>
                </div>
                <div class="w-12 h-12 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center text-2xl">
                    🎯
                </div>
            </div>

            <!-- بطاقة 3: الصفحات المحفوظة -->
            <div class="bg-white rounded-xl border border-gray-200 p-6 flex justify-between items-center shadow-sm hover:shadow-md transition">
                <div>
                    <p class="text-3xl font-bold text-gray-800">12</p>
                    <p class="text-sm text-gray-500 mt-1">صفحات محفوظة</p>
                </div>
                <div class="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-2xl">
                    📖
                </div>
            </div>

            <!-- بطاقة 4: نظام النقاط -->
            <div class="bg-white rounded-xl border border-gray-200 p-4 flex flex-col justify-center shadow-sm hover:shadow-md transition">
                <h4 class="text-md font-bold text-gray-700 mb-2 border-b pb-2">كيف تجمع النقاط؟</h4>
                <ul class="text-sm text-gray-600 space-y-1">
                    <li>✔️ أي مهمة عادية = <span class="font-bold text-green-600">5 نقاط</span></li>
                    <li>📖 حفظ صفحة كاملة = <span class="font-bold text-green-600">10 نقاط</span></li>
                </ul>
            </div>

        </div>

        <!-- القسم الثاني: لوحة المتصدرين (التنافس) -->
        <div class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm max-w-3xl mx-auto">
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
                    🏆 لوحة المتصدرين
                </h2>
                <span class="text-sm text-gray-500">تنافس مع زملائك واصعد للقمة!</span>
            </div>

            <!-- قائمة المتصدرين -->
            <div class="space-y-3">
                
                <!-- المستخدم الحالي (أنت) -->
                <div class="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-4">
                    <div class="flex items-center gap-4">
                        <div class="w-8 text-center font-bold text-green-700">1</div>
                        <div class="w-12 h-12 rounded-full bg-green-200 text-green-700 flex items-center justify-center font-bold text-lg">
                            أ
                        </div>
                        <div>
                            <p class="font-bold text-green-800 text-lg">أنت</p>
                            <p class="text-xs text-green-600">المستوى 1</p>
                        </div>
                    </div>
                    <div class="text-left">
                        <p class="font-bold text-gray-800 text-lg">0</p>
                        <p class="text-xs text-gray-500">نقطة</p>
                    </div>
                </div>

                <!-- مساحة فارغة في انتظار تسجيل باقي المشتركين -->
                <div class="flex flex-col items-center justify-center p-8 text-gray-400 border-2 border-dashed border-gray-100 rounded-lg">
                    <span class="text-3xl mb-2">👥</span>
                    <p class="text-sm">أنت أول المنضمين للرحلة!</p>
                    <p class="text-xs mt-1">عند انضمام مشتركين آخرين ستظهر إحصائياتهم هنا للمنافسة.</p>
                </div>

            </div>
        </div>

    </div>

</body>
</html>

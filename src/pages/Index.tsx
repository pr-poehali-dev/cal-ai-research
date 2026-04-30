import { useState } from "react";
import Icon from "@/components/ui/icon";

const FOOD_IMG = "https://cdn.poehali.dev/projects/fd7164bc-7766-4bf8-8ed9-af19c7e10c8c/files/4ed21ec9-4825-47cf-a709-7f1edeae0f12.jpg";
const CHEF_IMG = "https://cdn.poehali.dev/projects/fd7164bc-7766-4bf8-8ed9-af19c7e10c8c/files/3b98ec06-6ce0-4bad-9669-4c5ae50a33ee.jpg";
const DRINKS_IMG = "https://cdn.poehali.dev/projects/fd7164bc-7766-4bf8-8ed9-af19c7e10c8c/files/0174e433-415b-42ff-9832-1388fdaba7be.jpg";

type Tab = "profile" | "stats" | "camera" | "recipes" | "drinks";
type MealType = "breakfast" | "lunch" | "dinner";

const notifications = [
  { id: 1, icon: "Bell", text: "Время обеда! Не забудьте про белок", time: "12:00", read: false },
  { id: 2, icon: "TrendingUp", text: "Вы достигли цели по калориям 🎉", time: "09:30", read: false },
  { id: 3, icon: "Droplets", text: "Выпейте стакан воды", time: "11:15", read: true },
  { id: 4, icon: "Star", text: "Новый рецепт от Гордона Рамзи", time: "Вчера", read: true },
];

const history = [
  { id: 1, name: "Греческий салат", cal: 180, time: "08:20", img: FOOD_IMG, macros: { p: 6, c: 12, f: 11 } },
  { id: 2, name: "Куриная грудка", cal: 310, time: "13:05", img: FOOD_IMG, macros: { p: 58, c: 2, f: 6 } },
  { id: 3, name: "Смузи манго", cal: 145, time: "10:40", img: DRINKS_IMG, macros: { p: 2, c: 34, f: 0 } },
  { id: 4, name: "Лосось с овощами", cal: 420, time: "19:30", img: FOOD_IMG, macros: { p: 42, c: 18, f: 22 } },
];

const recipes: Record<MealType, { id: number; name: string; author: string; cal: number; time: string; diff: string; img: string }[]> = {
  breakfast: [
    { id: 1, name: "Яйца Бенедикт", author: "Гордон Рамзи", cal: 380, time: "20 мин", diff: "Средне", img: FOOD_IMG },
    { id: 2, name: "Авокадо тост", author: "Джейми Оливер", cal: 290, time: "10 мин", diff: "Легко", img: FOOD_IMG },
    { id: 3, name: "Французские блины", author: "Пьер Эрме", cal: 450, time: "30 мин", diff: "Средне", img: FOOD_IMG },
  ],
  lunch: [
    { id: 4, name: "Цезарь с лососем", author: "Гордон Рамзи", cal: 520, time: "25 мин", diff: "Легко", img: FOOD_IMG },
    { id: 5, name: "Паста карбонара", author: "Массимо Боттура", cal: 680, time: "35 мин", diff: "Средне", img: FOOD_IMG },
    { id: 6, name: "Том Ям суп", author: "Дэвид Томпсон", cal: 310, time: "40 мин", diff: "Сложно", img: FOOD_IMG },
  ],
  dinner: [
    { id: 7, name: "Стейк Рибай", author: "Гордон Рамзи", cal: 750, time: "30 мин", diff: "Средне", img: FOOD_IMG },
    { id: 8, name: "Лосось мисо", author: "Нобу Мацухиса", cal: 580, time: "45 мин", diff: "Средне", img: FOOD_IMG },
    { id: 9, name: "Ризотто с трюфелем", author: "Массимо Боттура", cal: 620, time: "50 мин", diff: "Сложно", img: FOOD_IMG },
  ],
};

const drinks = [
  { id: 1, name: "Манго Ласси", cal: 145, type: "Безалкогольный", time: "5 мин", ingredients: ["Манго 150г", "Йогурт 200мл", "Молоко 100мл", "Мёд 1 ч.л.", "Кардамон"], img: DRINKS_IMG },
  { id: 2, name: "Зелёный Детокс", cal: 85, type: "Смузи", time: "5 мин", ingredients: ["Шпинат 50г", "Огурец 1 шт", "Лимон 1/2", "Имбирь", "Вода 300мл"], img: DRINKS_IMG },
  { id: 3, name: "Голубая Лагуна", cal: 220, type: "Коктейль", time: "10 мин", ingredients: ["Блю Кюрасао 30мл", "Водка 45мл", "Лимонный сок", "Сироп", "Лёд"], img: DRINKS_IMG },
  { id: 4, name: "Матча Латте", cal: 120, type: "Горячий", time: "5 мин", ingredients: ["Матча 2 ч.л.", "Молоко 300мл", "Сироп агавы", "Горячая вода"], img: DRINKS_IMG },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("camera");
  const [mealType, setMealType] = useState<MealType>("breakfast");
  const [scanning, setScanning] = useState(false);
  const [scanDone, setScanDone] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [expandedDrink, setExpandedDrink] = useState<number | null>(null);
  const [notifCount] = useState(notifications.filter(n => !n.read).length);

  const handleScan = () => {
    if (scanning) return;
    setScanning(true);
    setScanDone(false);
    setTimeout(() => {
      setScanning(false);
      setScanDone(true);
    }, 2500);
  };

  return (
    <div className="mobile-frame">
      {/* Status bar */}
      <div className="flex justify-between items-center px-6 pt-4 pb-2">
        <span className="text-white text-sm font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>9:41</span>
        <div className="flex items-center gap-1.5">
          <Icon name="Signal" size={16} className="text-white" />
          <Icon name="Wifi" size={16} className="text-white" />
          <Icon name="Battery" size={16} className="text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="overflow-y-auto" style={{ height: 'calc(100dvh - 50px - 88px)', paddingBottom: 8 }}>

        {/* ===== PROFILE TAB ===== */}
        {activeTab === "profile" && (
          <div className="px-5 pb-8 animate-fade-in">
            <div className="flex justify-between items-center mb-6 mt-2">
              <div>
                <p className="text-sm text-white/40" style={{ fontFamily: 'Golos Text, sans-serif' }}>Добро пожаловать</p>
                <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>Алексей</h1>
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowNotif(!showNotif)}
                  className="w-11 h-11 rounded-full glass flex items-center justify-center"
                >
                  <Icon name="Bell" size={20} className="text-white/80" />
                  {notifCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold">
                      {notifCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Avatar card */}
            <div className="glass rounded-3xl p-5 mb-4 animate-fade-in delay-1">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl gradient-bg p-0.5">
                    <div className="w-full h-full rounded-2xl bg-[#0A0A0F] flex items-center justify-center">
                      <span className="text-3xl">👨</span>
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full gradient-bg flex items-center justify-center">
                    <Icon name="Check" size={12} className="text-white" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>Алексей К.</h2>
                  <p className="text-white/50 text-sm">Premium • 78 дней подряд 🔥</p>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: 'rgba(59,130,246,0.2)', color: '#3B82F6' }}>Похудение</span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: 'rgba(139,92,246,0.2)', color: '#8B5CF6' }}>Без глютена</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats mini */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: "Возраст", value: "28", unit: "лет" },
                { label: "Вес", value: "74", unit: "кг" },
                { label: "Цель", value: "68", unit: "кг" },
              ].map((s, i) => (
                <div key={i} className={`glass rounded-2xl p-4 text-center animate-fade-in delay-${i + 2}`}>
                  <p className="text-2xl font-bold gradient-text" style={{ fontFamily: 'Montserrat, sans-serif' }}>{s.value}</p>
                  <p className="text-white/30 text-xs mt-0.5">{s.unit}</p>
                  <p className="text-white/60 text-xs mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Today goal */}
            <div className="glass rounded-3xl p-5 mb-4 animate-fade-in delay-3">
              <div className="flex justify-between items-center mb-4">
                <span className="text-white font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>Цель дня</span>
                <span className="text-white/40 text-sm">1 580 / 2 000 ккал</span>
              </div>
              <div className="w-full h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <div className="progress-bar h-2 rounded-full" style={{ width: '79%' }} />
              </div>
              <div className="flex justify-between mt-4 text-center">
                {[
                  { label: "Белки", val: "82г", color: "#3B82F6" },
                  { label: "Углев.", val: "145г", color: "#8B5CF6" },
                  { label: "Жиры", val: "48г", color: "#06B6D4" },
                ].map((m, i) => (
                  <div key={i}>
                    <p className="text-lg font-bold" style={{ color: m.color, fontFamily: 'Montserrat, sans-serif' }}>{m.val}</p>
                    <p className="text-white/40 text-xs">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* History button */}
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="w-full glass rounded-2xl p-4 flex items-center justify-between mb-3 animate-fade-in delay-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(59,130,246,0.15)' }}>
                  <Icon name="History" size={18} className="text-blue-400" />
                </div>
                <span className="text-white font-medium">История приёмов пищи</span>
              </div>
              <Icon name={showHistory ? "ChevronUp" : "ChevronDown"} size={18} className="text-white/40" />
            </button>

            {showHistory && (
              <div className="space-y-3 animate-fade-in">
                {history.map((item) => (
                  <div key={item.id} className="glass rounded-2xl p-4 flex items-center gap-4">
                    <img src={item.img} className="w-14 h-14 rounded-xl object-cover" alt={item.name} />
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm truncate">{item.name}</p>
                      <p className="text-white/40 text-xs mt-0.5">{item.time}</p>
                      <div className="flex gap-2 mt-1.5">
                        <span className="text-xs" style={{ color: '#3B82F6' }}>Б: {item.macros.p}г</span>
                        <span className="text-xs" style={{ color: '#8B5CF6' }}>У: {item.macros.c}г</span>
                        <span className="text-xs" style={{ color: '#06B6D4' }}>Ж: {item.macros.f}г</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>{item.cal}</p>
                      <p className="text-white/30 text-xs">ккал</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Notification panel */}
            {showNotif && (
              <div className="fixed inset-0 z-50 flex items-end" onClick={() => setShowNotif(false)}>
                <div className="w-full max-w-[430px] mx-auto glass-dark rounded-t-3xl p-6 pb-10 animate-slide-up" onClick={e => e.stopPropagation()}>
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="text-white text-lg font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>Уведомления</h3>
                    <button onClick={() => setShowNotif(false)} className="w-8 h-8 rounded-full glass flex items-center justify-center">
                      <Icon name="X" size={16} className="text-white/60" />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {notifications.map(n => (
                      <div key={n.id} className={`flex items-start gap-3 p-3 rounded-2xl ${!n.read ? 'glass' : ''}`}>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: !n.read ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.05)' }}>
                          <Icon name={n.icon} size={18} className={!n.read ? "text-blue-400" : "text-white/40"} />
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm ${!n.read ? 'text-white font-medium' : 'text-white/50'}`}>{n.text}</p>
                          <p className="text-white/30 text-xs mt-1">{n.time}</p>
                        </div>
                        {!n.read && <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: '#3B82F6' }} />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===== STATS TAB ===== */}
        {activeTab === "stats" && (
          <div className="px-5 pb-8 animate-fade-in">
            <div className="flex justify-between items-center mb-6 mt-2">
              <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>Статистика</h1>
              <span className="text-white/40 text-sm">Апрель 2026</span>
            </div>

            {/* Calories card */}
            <div className="rounded-3xl p-5 mb-4 animate-fade-in delay-1 overflow-hidden relative" style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2))', border: '1px solid rgba(59,130,246,0.3)' }}>
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #8B5CF6, transparent)', transform: 'translate(30%, -30%)' }} />
              <p className="text-white/60 text-sm mb-1">Калории сегодня</p>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-bold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>1 580</span>
                <span className="text-white/40 mb-2">/ 2 000 ккал</span>
              </div>
              <div className="w-full h-2 rounded-full mt-4" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <div className="progress-bar h-2 rounded-full" style={{ width: '79%' }} />
              </div>
            </div>

            {/* Weekly bars */}
            <div className="glass rounded-3xl p-5 mb-4 animate-fade-in delay-2">
              <p className="text-white font-semibold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>Неделя</p>
              <div className="flex items-end justify-between gap-2" style={{ height: 100 }}>
                {[
                  { day: "Пн", val: 65 },
                  { day: "Вт", val: 80 },
                  { day: "Ср", val: 55 },
                  { day: "Чт", val: 90 },
                  { day: "Пт", val: 70 },
                  { day: "Сб", val: 79, active: true },
                  { day: "Вс", val: 30 },
                ].map((d, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 flex-1">
                    <div
                      className="w-full rounded-xl"
                      style={{
                        height: `${d.val}%`,
                        background: d.active
                          ? 'linear-gradient(to top, #3B82F6, #8B5CF6)'
                          : 'rgba(255,255,255,0.08)'
                      }}
                    />
                    <span className={`text-xs ${d.active ? 'text-blue-400 font-bold' : 'text-white/30'}`}>{d.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Macros circles */}
            <div className="grid grid-cols-3 gap-3 mb-4 animate-fade-in delay-3">
              {[
                { label: "Белки", val: 82, max: 120, unit: "г", color: "#3B82F6" },
                { label: "Углев.", val: 145, max: 200, unit: "г", color: "#8B5CF6" },
                { label: "Жиры", val: 48, max: 65, unit: "г", color: "#06B6D4" },
              ].map((m, i) => (
                <div key={i} className="glass rounded-2xl p-4">
                  <div className="flex items-center justify-center mb-3">
                    <div className="relative w-14 h-14">
                      <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                        <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
                        <circle
                          cx="28" cy="28" r="22" fill="none" stroke={m.color} strokeWidth="4"
                          strokeDasharray={`${(m.val / m.max) * 138} 138`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>{Math.round(m.val / m.max * 100)}%</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-white font-bold text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>{m.val}{m.unit}</p>
                  <p className="text-center text-white/40 text-xs">{m.label}</p>
                </div>
              ))}
            </div>

            {/* Achievements */}
            <div className="glass rounded-3xl p-5 animate-fade-in delay-4">
              <p className="text-white font-semibold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>Достижения</p>
              <div className="space-y-3">
                {[
                  { icon: "🔥", label: "78 дней подряд", desc: "Личный рекорд!", color: "#F97316" },
                  { icon: "💧", label: "Норма воды", desc: "8 стаканов сегодня", color: "#3B82F6" },
                  { icon: "🥗", label: "Овощной день", desc: "5 порций овощей", color: "#22C55E" },
                ].map((a, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: `${a.color}22` }}>
                      {a.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{a.label}</p>
                      <p className="text-white/40 text-xs">{a.desc}</p>
                    </div>
                    <Icon name="ChevronRight" size={16} className="text-white/20" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== CAMERA TAB ===== */}
        {activeTab === "camera" && (
          <div className="flex flex-col animate-fade-in">
            {/* Camera viewfinder */}
            <div className="relative mx-5 mt-2 rounded-3xl overflow-hidden" style={{ height: 310 }}>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #0F1629 0%, #1A0A2E 100%)' }} />

              {/* Corner marks */}
              {[
                "top-4 left-4 border-t-2 border-l-2",
                "top-4 right-4 border-t-2 border-r-2",
                "bottom-4 left-4 border-b-2 border-l-2",
                "bottom-4 right-4 border-b-2 border-r-2",
              ].map((cls, i) => (
                <div key={i} className={`absolute w-6 h-6 ${cls}`} style={{ borderColor: '#3B82F6', borderRadius: 3 }} />
              ))}

              {scanDone ? (
                <div className="absolute inset-0 flex items-center justify-center animate-scale-in">
                  <img src={FOOD_IMG} className="w-full h-full object-cover opacity-60" alt="food" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center mb-3 animate-float">
                      <Icon name="Check" size={28} className="text-white" />
                    </div>
                    <p className="text-white font-bold text-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>Распознано!</p>
                    <p className="text-white/60 text-sm">Греческий салат</p>
                  </div>
                </div>
              ) : scanning ? (
                <>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full animate-pulse-ring" style={{ border: '2px solid rgba(59,130,246,0.5)' }} />
                    <div className="absolute w-16 h-16 rounded-full animate-pulse-ring" style={{ border: '2px solid rgba(139,92,246,0.5)', animationDelay: '0.3s' }} />
                  </div>
                  <div className="absolute left-8 right-8 h-0.5 animate-scan" style={{ background: 'linear-gradient(90deg, transparent, #3B82F6, transparent)' }} />
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center animate-float" style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)' }}>
                    <Icon name="Scan" size={32} className="text-blue-400" />
                  </div>
                  <p className="text-white/60 text-sm">Наведите камеру на блюдо</p>
                </div>
              )}

              <div className="absolute top-3 right-3 flex gap-2">
                <button className="w-8 h-8 rounded-full glass flex items-center justify-center">
                  <Icon name="Zap" size={14} className="text-yellow-400" />
                </button>
                <button className="w-8 h-8 rounded-full glass flex items-center justify-center">
                  <Icon name="RefreshCcw" size={14} className="text-white/60" />
                </button>
              </div>
            </div>

            {/* Scan button */}
            <div className="flex items-center justify-center mt-5">
              <button onClick={handleScan} className="camera-btn w-20 h-20 rounded-full flex items-center justify-center" disabled={scanning}>
                <Icon name={scanning ? "Loader" : "Camera"} size={30} className={`text-white ${scanning ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {/* Result or meal selector */}
            {scanDone ? (
              <div className="mx-5 mt-5 glass rounded-3xl p-5 animate-slide-up">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-white font-bold text-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>Греческий салат</h3>
                    <p className="text-white/40 text-sm">100г • 1 порция</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold gradient-text" style={{ fontFamily: 'Montserrat, sans-serif' }}>180</p>
                    <p className="text-white/40 text-xs">ккал</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Белки", val: "6г", color: "#3B82F6" },
                    { label: "Углев.", val: "12г", color: "#8B5CF6" },
                    { label: "Жиры", val: "11г", color: "#06B6D4" },
                  ].map((m, i) => (
                    <div key={i} className="rounded-xl p-2 text-center" style={{ background: `${m.color}18` }}>
                      <p className="font-bold text-sm" style={{ color: m.color, fontFamily: 'Montserrat, sans-serif' }}>{m.val}</p>
                      <p className="text-white/40 text-xs">{m.label}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-3 rounded-2xl gradient-bg text-white font-semibold text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Добавить в дневник
                </button>
              </div>
            ) : (
              <div className="mx-5 mt-4 glass rounded-3xl p-4 animate-fade-in delay-3">
                <p className="text-white/50 text-xs text-center mb-3">Быстрое добавление</p>
                <div className="flex gap-2">
                  {["Завтрак", "Обед", "Ужин", "Перекус"].map((t, i) => (
                    <button key={i} className="flex-1 py-2 rounded-xl text-xs font-medium transition-all" style={{ background: i === 0 ? 'rgba(59,130,246,0.25)' : 'rgba(255,255,255,0.05)', color: i === 0 ? '#3B82F6' : 'rgba(255,255,255,0.4)' }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===== RECIPES TAB ===== */}
        {activeTab === "recipes" && (
          <div className="px-5 pb-8 animate-fade-in">
            <div className="flex justify-between items-center mb-5 mt-2">
              <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>Рецепты</h1>
              <div className="w-10 h-10 rounded-full glass flex items-center justify-center">
                <Icon name="Search" size={18} className="text-white/60" />
              </div>
            </div>

            {/* Chef feature */}
            <div className="relative rounded-3xl overflow-hidden mb-5 animate-fade-in delay-1" style={{ height: 130 }}>
              <img src={CHEF_IMG} className="w-full h-full object-cover" alt="chef" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(10,10,15,0.9) 0%, rgba(10,10,15,0.3) 100%)' }} />
              <div className="absolute inset-0 p-5 flex flex-col justify-center">
                <p className="text-white/60 text-xs mb-1">Шеф-повар недели</p>
                <h3 className="text-white font-bold text-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>Гордон Рамзи</h3>
                <p className="text-white/40 text-xs">12 эксклюзивных рецептов</p>
              </div>
            </div>

            {/* Meal type selector */}
            <div className="flex gap-2 mb-5 animate-fade-in delay-2">
              {([
                { key: "breakfast" as MealType, label: "Завтрак", icon: "☀️" },
                { key: "lunch" as MealType, label: "Обед", icon: "🌤️" },
                { key: "dinner" as MealType, label: "Ужин", icon: "🌙" },
              ]).map(({ key, label, icon }) => (
                <button
                  key={key}
                  onClick={() => setMealType(key)}
                  className="flex-1 py-2.5 rounded-2xl text-sm font-medium flex items-center justify-center gap-1.5"
                  style={{
                    background: mealType === key ? 'linear-gradient(135deg, rgba(59,130,246,0.3), rgba(139,92,246,0.3))' : 'rgba(255,255,255,0.05)',
                    color: mealType === key ? 'white' : 'rgba(255,255,255,0.4)',
                    border: mealType === key ? '1px solid rgba(59,130,246,0.4)' : '1px solid transparent',
                    fontFamily: 'Golos Text, sans-serif',
                  }}
                >
                  <span>{icon}</span>
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* Recipes list */}
            <div className="space-y-4 animate-fade-in delay-3">
              {recipes[mealType].map((r) => (
                <div key={r.id} className="recipe-card glass">
                  <div className="relative" style={{ height: 155 }}>
                    <img src={r.img} className="w-full h-full object-cover" alt={r.name} />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,15,0.95) 0%, transparent 60%)' }} />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bold text-base" style={{ fontFamily: 'Montserrat, sans-serif' }}>{r.name}</h3>
                      <p className="text-white/50 text-xs">{r.author}</p>
                    </div>
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(10,10,15,0.7)', color: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)' }}>
                      {r.diff}
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex gap-3">
                      <div className="flex items-center gap-1">
                        <Icon name="Flame" size={14} className="text-orange-400" />
                        <span className="text-white/60 text-xs">{r.cal} ккал</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Clock" size={14} className="text-blue-400" />
                        <span className="text-white/60 text-xs">{r.time}</span>
                      </div>
                    </div>
                    <button className="px-4 py-1.5 rounded-xl text-xs font-semibold gradient-bg text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Смотреть
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== DRINKS TAB ===== */}
        {activeTab === "drinks" && (
          <div className="px-5 pb-8 animate-fade-in">
            <div className="flex justify-between items-center mb-5 mt-2">
              <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>Напитки</h1>
              <div className="w-10 h-10 rounded-full glass flex items-center justify-center">
                <Icon name="Filter" size={18} className="text-white/60" />
              </div>
            </div>

            {/* Banner */}
            <div className="relative rounded-3xl overflow-hidden mb-5 animate-fade-in delay-1" style={{ height: 130 }}>
              <img src={DRINKS_IMG} className="w-full h-full object-cover" alt="drinks" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.65) 0%, rgba(139,92,246,0.65) 100%)' }} />
              <div className="absolute inset-0 p-5 flex flex-col justify-center">
                <p className="text-white/80 text-xs mb-1">Коллекция</p>
                <h3 className="text-white font-bold text-xl" style={{ fontFamily: 'Montserrat, sans-serif' }}>Авторские напитки</h3>
                <p className="text-white/60 text-sm">с подробными рецептами</p>
              </div>
            </div>

            {/* Drinks list */}
            <div className="space-y-3 animate-fade-in delay-2">
              {drinks.map((drink) => (
                <div key={drink.id} className="glass rounded-2xl overflow-hidden">
                  <button
                    className="w-full p-4 flex items-center gap-4"
                    onClick={() => setExpandedDrink(expandedDrink === drink.id ? null : drink.id)}
                  >
                    <img src={drink.img} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" alt={drink.name} />
                    <div className="flex-1 text-left">
                      <h3 className="text-white font-semibold text-base" style={{ fontFamily: 'Montserrat, sans-serif' }}>{drink.name}</h3>
                      <div className="flex gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(139,92,246,0.2)', color: '#A78BFA' }}>{drink.type}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(59,130,246,0.2)', color: '#60A5FA' }}>{drink.cal} ккал</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Icon name="Clock" size={12} className="text-white/30" />
                        <span className="text-white/30 text-xs">{drink.time}</span>
                      </div>
                    </div>
                    <Icon name={expandedDrink === drink.id ? "ChevronUp" : "ChevronDown"} size={18} className="text-white/30" />
                  </button>

                  {expandedDrink === drink.id && (
                    <div className="px-4 pb-4 animate-fade-in">
                      <div className="h-px mb-4" style={{ background: 'rgba(255,255,255,0.06)' }} />
                      <p className="text-white/60 text-xs font-semibold mb-3 uppercase tracking-wider">Ингредиенты</p>
                      <div className="space-y-2 mb-4">
                        {drink.ingredients.map((ing, i) => (
                          <div key={i} className="flex items-center gap-2.5">
                            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)' }} />
                            <span className="text-white/70 text-sm">{ing}</span>
                          </div>
                        ))}
                      </div>
                      <button className="w-full py-3 rounded-xl gradient-bg text-white text-sm font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Полный рецепт
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ===== TAB BAR ===== */}
      <div className="tab-bar fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] flex items-center justify-around px-4 pt-3 pb-6" style={{ zIndex: 40 }}>

        <button onClick={() => setActiveTab("profile")} className="flex flex-col items-center gap-1 min-w-[48px]">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${activeTab === "profile" ? "gradient-bg" : ""}`}>
            <Icon name="User" size={20} className={activeTab === "profile" ? "text-white" : "text-white/30"} />
          </div>
          <span className={`text-xs ${activeTab === "profile" ? "text-blue-400 font-medium" : "text-white/30"}`} style={{ fontFamily: 'Golos Text, sans-serif' }}>Профиль</span>
        </button>

        <button onClick={() => setActiveTab("stats")} className="flex flex-col items-center gap-1 min-w-[48px]">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${activeTab === "stats" ? "gradient-bg" : ""}`}>
            <Icon name="BarChart3" size={20} className={activeTab === "stats" ? "text-white" : "text-white/30"} />
          </div>
          <span className={`text-xs ${activeTab === "stats" ? "text-blue-400 font-medium" : "text-white/30"}`} style={{ fontFamily: 'Golos Text, sans-serif' }}>Статистика</span>
        </button>

        {/* Camera center button */}
        <button onClick={() => setActiveTab("camera")} className="flex flex-col items-center gap-1 -mt-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
              boxShadow: activeTab === "camera"
                ? '0 8px 32px rgba(59,130,246,0.5), 0 4px 16px rgba(139,92,246,0.4)'
                : '0 4px 16px rgba(0,0,0,0.5)',
            }}
          >
            <Icon name="Camera" size={26} className="text-white" />
          </div>
          <span className={`text-xs mt-0.5 ${activeTab === "camera" ? "text-blue-400 font-medium" : "text-white/30"}`} style={{ fontFamily: 'Golos Text, sans-serif' }}>Камера</span>
        </button>

        <button onClick={() => setActiveTab("recipes")} className="flex flex-col items-center gap-1 min-w-[48px]">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${activeTab === "recipes" ? "gradient-bg" : ""}`}>
            <Icon name="ChefHat" size={20} className={activeTab === "recipes" ? "text-white" : "text-white/30"} />
          </div>
          <span className={`text-xs ${activeTab === "recipes" ? "text-blue-400 font-medium" : "text-white/30"}`} style={{ fontFamily: 'Golos Text, sans-serif' }}>Рецепты</span>
        </button>

        <button onClick={() => setActiveTab("drinks")} className="flex flex-col items-center gap-1 min-w-[48px]">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${activeTab === "drinks" ? "gradient-bg" : ""}`}>
            <Icon name="GlassWater" size={20} className={activeTab === "drinks" ? "text-white" : "text-white/30"} />
          </div>
          <span className={`text-xs ${activeTab === "drinks" ? "text-blue-400 font-medium" : "text-white/30"}`} style={{ fontFamily: 'Golos Text, sans-serif' }}>Напитки</span>
        </button>

      </div>
    </div>
  );
}
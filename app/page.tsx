"use client";
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { 
  Target, Zap, BarChart2, ShieldCheck, Mail, Phone, Activity, 
  Radar, Gift, CheckCircle2, Loader2, AlertCircle, TrendingUp, 
  UserCircle2, Quote, ArrowUpRight, Eye
} from 'lucide-react';

export default function ShieldUpPro() {
  const { scrollYProgress } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({
    type: null,
    message: ''
  });

  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const smoothY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -200]), springConfig);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get('fullName'),
      phone: formData.get('phone'),
      email: formData.get('email'),
    };

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus({ 
          type: 'success', 
          message: 'היעד נעול. מחלקת הגיוס תיצור קשר לתיאום הפיילוט.' 
        });
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error();
      }
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: 'שגיאה בשליחת הטופס. אנא נסה שנית או צור קשר טלפוני.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#010103] text-white selection:bg-purple-500 selection:text-white overflow-x-hidden font-['Assistant',sans-serif]" dir="rtl">
      
      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.05),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:64px_64px]" />
        <motion.div style={{ y: smoothY }} className="absolute inset-0 opacity-20">
          <Radar size={800} strokeWidth={0.1} className="absolute -top-40 -right-40 text-purple-500 animate-pulse" />
        </motion.div>
      </div>

      <nav className="fixed top-0 w-full z-[100] p-6 transition-all duration-500">
        <div className={`container mx-auto flex justify-between items-center px-8 py-5 rounded-2xl transition-all duration-500 border border-white/5 ${
          isScrolled 
          ? 'bg-black/60 backdrop-blur-2xl shadow-2xl border-white/10' 
          : 'bg-transparent'
        }`}>
          <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <ShieldCheck className="text-purple-500 w-8 h-8" />
            <span className="text-2xl font-black tracking-tighter uppercase">Shield<span className="text-purple-600">Up</span></span>
          </div>

          <div className="hidden lg:flex gap-10 items-center text-sm font-bold tracking-tight text-white/40">
            <button onClick={() => scrollToSection('why-us')} className="hover:text-purple-400 transition-all">למה אנחנו</button>
            <button onClick={() => scrollToSection('analytics')} className="hover:text-purple-400 transition-all">ניתוח ביצועים</button>
            <button onClick={() => scrollToSection('reviews')} className="hover:text-purple-400 transition-all">לקוחות ממליצים</button>
            <button onClick={() => scrollToSection('contact')} className="bg-purple-600 text-white px-7 py-3 rounded-full hover:bg-white hover:text-black transition-all font-black text-xs uppercase">
              הפעל חדירה לשוק
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center justify-center px-6 z-10 pt-20">
        <motion.div style={{ scale, opacity }} className="text-center max-w-5xl">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5, type: 'spring' }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 border border-white/20 px-6 py-2 rounded-full mb-10 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
            <Gift className="w-5 h-5 text-white animate-bounce" />
            <span className="text-xs font-black tracking-widest uppercase text-white">פיילוט לזמן מוגבל: חודש שלם של שיווק ללא עלות תפעול</span>
          </motion.div>

          <h1 className="text-6xl md:text-[140px] font-black leading-[0.85] tracking-tighter italic mb-10">
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">דומיננטיות בענף</span>
            <span className="block text-purple-600">המיגון והאבטחה.</span>
          </h1>

          <p className="text-lg md:text-2xl text-white/40 max-w-3xl mx-auto font-light leading-relaxed mb-16">
            אנחנו בונים עבורכם מערך חדירה דיגיטלי מבוסס מודיעין שוק המאתר ומטרגט מקבלי החלטות. תנו לנו להוכיח לכם תוצאות — <span className="text-white font-bold underline decoration-purple-500 underline-offset-4">החודש הראשון עלינו.</span>
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <button onClick={() => scrollToSection('contact')} className="group relative bg-white text-black px-12 py-6 rounded-2xl overflow-hidden shadow-2xl transition-transform active:scale-95">
              <span className="relative text-xl font-black italic flex items-center gap-3">
                חודש נסיון ללא עלות תפעול! <Zap size={20} className="fill-current" />
              </span>
            </button>
            <button onClick={() => scrollToSection('analytics')} className="text-lg font-bold text-white/60 hover:text-white transition-colors">נתוני חדירה לשוק</button>
          </div>
        </motion.div>
      </section>

      {/* --- SECTION 1: WHY US --- */}
      <section id="why-us" className="py-24 relative z-10 container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black italic mb-6">למה דווקא <span className="text-purple-600">SHIELDUP?</span></h2>
          <p className="text-white/40 max-w-2xl mx-auto text-lg font-medium">אנחנו לא חברת שיווק רגילה. אנחנו יחידת עילית שנבנתה עבור מטרה אחת: שליטה בשוק האבטחה.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "דאטה מפולחת לקב\"טים",
              desc: "אנחנו מחזיקים בגישה ישירה למקבלי ההחלטות הגדולים בישראל - מקב\"טים של רשתות קמעונאות, מנהלי תפעול וגופי ביטחון.",
              icon: <Radar className="w-10 h-10" />
            },
            {
              title: "אוטומציה של מכירות",
              desc: "המערכת שלנו יודעת לסנן לידים קרים ולהגיש לכם רק עסקאות בשלות, מה שחוסך לאנשי המכירות שלכם שעות של טלפונים מיותרים.",
              icon: <Zap className="w-10 h-10" />
            },
            {
              title: "מומחיות במיגון וביטחון",
              desc: "אנחנו מבינים מה זה NVR, גדרות חכמות ובקרות כניסה. לא צריך להסביר לנו את המוצר - אנחנו יודעים למכור אותו.",
              icon: <ShieldCheck className="w-10 h-10" />
            },
            {
              title: "קריאייטיב חודר שוק",
              desc: "אנחנו יודעים בדיוק אילו פרסומות עובדות בענף. אנחנו מפתחים תוכן ויזואלי ומסרים מניעים לפעולה שמביאים לידים איכותיים בלבד.",
              icon: <Eye className="w-10 h-10" />
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 rounded-[40px] hover:border-purple-500/30 transition-all group shadow-2xl"
            >
              <div className="bg-purple-600/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-purple-600 transition-colors">
                <div className="text-purple-500 group-hover:text-white transition-colors">{item.icon}</div>
              </div>
              <h3 className="text-xl font-black mb-4 italic">{item.title}</h3>
              <p className="text-white/40 leading-relaxed font-medium text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- SECTION 2: PERFORMANCE ANALYTICS (GRAPHS) --- */}
      <section id="analytics" className="py-24 relative z-10 bg-white/[0.01] border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl text-right">
              <h2 className="text-4xl md:text-7xl font-black italic mb-4">מדדי <span className="text-purple-600">צמיחה.</span></h2>
              <p className="text-white/40 text-xl font-medium tracking-tight italic">ניתוח מגמות וגידול לידים לפי פלחי שוק:</p>
            </div>
            <div className="bg-white/5 px-6 py-3 rounded-full border border-white/10 text-xs font-mono text-purple-400 tracking-widest uppercase">
              // DATA_VISUALIZATION_V2
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { label: "מגזר תעשייתי", value: "240%+", data: [20, 35, 30, 70, 90], color: "from-purple-600 to-fuchsia-500" },
              { label: "מוסדות ורשויות", value: "185%+", data: [15, 25, 50, 45, 80], color: "from-blue-600 to-purple-500" },
              { label: "קמעונאות ופרטי", value: "310%+", data: [10, 40, 35, 85, 100], color: "from-fuchsia-600 to-pink-500" }
            ].map((chart, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8 group hover:bg-white/[0.05] transition-all"
              >
                <div className="flex justify-between items-center mb-10">
                  <span className="text-white/40 font-bold uppercase tracking-widest text-xs italic">{chart.label}</span>
                  <ArrowUpRight className="text-purple-500" size={20} />
                </div>
                <div className="text-6xl font-black mb-8 italic tracking-tighter">{chart.value}</div>
                
                <div className="flex items-end gap-3 h-32 px-2">
                  {chart.data.map((val, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${val}%` }}
                      transition={{ delay: 0.3 + (idx * 0.1), duration: 0.8 }}
                      className={`flex-1 bg-gradient-to-t ${chart.color} rounded-t-lg opacity-40 group-hover:opacity-100 transition-opacity`}
                    />
                  ))}
                </div>
                <div className="mt-4 flex justify-between text-[10px] font-mono text-white/20 uppercase tracking-widest">
                  <span>Start Pilot</span>
                  <span>Month 1 Complete</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-32 relative z-10 container mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black italic mb-6 uppercase">מהשטח <span className="text-purple-600">לתוצאות.</span></h2>
          <p className="text-white/40 max-w-xl mx-auto font-medium">המנהלים שהחליטו להפסיק לנחש ולהתחיל לשלוט בשוק:</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {[
            {
              name: "רוני אברהם",
              role: "מנכ\"ל מערכות מיגון",
              quote: "לא האמנתי שדיגיטל יכול להביא לקוחות בסדר גודל כזה. סגרנו 3 פרויקטים של מוסדות חינוך בשבוע אחד לאחר הפעלת המערך.",
              image: "RA"
            },
            {
              name: "דניאל לוי",
              role: "סמנכ\"ל תפעול פרויקטים ביטחוניים",
              quote: "הדאטה שלהם על מקב\"טים היא נכס צאן ברזל. במקום לרדוף אחרי לידים קרים, אנחנו מקבלים פניות של 'בואו לתת הצעה'.",
              image: "DL"
            },
            {
              name: "יוסי כהן",
              role: "מנהל שיווק ומוקד ארצי",
              quote: "החודש הראשון ללא עלות תפעול היה ההוכחה שהיינו צריכים. המערכת סיננה עבורנו את כל הרעש והשאירה רק עסקאות בשלות.",
              image: "YC"
            },
            {
              name: "מאיר דורון",
              role: "בעלים של חברת מערכות אבטחה",
              quote: "ההבנה שלהם בתחום המיגון (NVR, בקרות, גלאים) עושה את כל ההבדל. הם מדברים בשפה של הלקוחות שלי.",
              image: "MD"
            }
          ].map((review, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative p-10 bg-white/[0.02] border border-white/5 rounded-[48px] backdrop-blur-3xl flex flex-col md:flex-row gap-8 items-start group hover:border-purple-600/30 transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-purple-600/20 flex items-center justify-center text-purple-500 font-black shrink-0 border border-purple-500/20 group-hover:bg-purple-600 group-hover:text-white transition-all">
                {review.image}
              </div>
              <div className="flex-1">
                <Quote className="text-purple-600 mb-4 opacity-50" size={32} />
                <p className="text-xl text-white/80 font-medium mb-8 leading-relaxed italic">"{review.quote}"</p>
                <div className="pt-6 border-t border-white/5">
                  <div className="text-white font-black text-lg">{review.name}</div>
                  <div className="text-purple-400 text-xs font-bold uppercase tracking-widest">{review.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- STATS BAR --- */}
      <section className="py-20 relative z-10 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Activity />, label: "דיוק המרת לידים", value: "14.2%", desc: "אופטימיזציית אלגוריתם ייעודית" },
            { icon: <Target />, label: "בסיס נתוני רכש", value: "85K+", desc: "גישה ישירה לקב'טים ומנהלים" },
            { icon: <BarChart2 />, label: "תקציבים מנוהלים", value: "₪4M+", desc: "החזר השקעה (ROI) מקסימלי" },
            { icon: <ShieldCheck />, label: "מותגי מיגון מובילים", value: "30+", desc: "חברות שבחרו לשלוט בשוק" }
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="p-8 bg-white/[0.03] border border-white/10 rounded-[32px] backdrop-blur-xl group hover:border-purple-500/50 transition-all text-right">
              <div className="text-purple-500 mb-6 group-hover:scale-110 transition-transform">{stat.icon}</div>
              <div className="text-4xl font-black mb-2 tracking-tight">{stat.value}</div>
              <div className="text-white font-bold text-sm mb-2 uppercase tracking-wider">{stat.label}</div>
              <div className="text-white/30 text-xs leading-relaxed">{stat.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- CONTACT FORM --- */}
      <section id="contact" className="py-40 relative z-10 px-6">
        <div className="container mx-auto max-w-6xl flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2 text-right">
            <h2 className="text-6xl md:text-8xl font-black italic mb-10 text-white">תפוס<br/><span className="text-purple-600 font-black">פיקוד.</span></h2>
            <p className="text-white/30 text-xl mb-12 font-bold underline underline-offset-8 decoration-purple-500">בחודש הראשון - העלות תפעול היא עלינו!</p>
            <div className="space-y-6">
              <div className="flex items-center justify-end gap-5 text-xl font-bold text-white/40 hover:text-white transition-colors cursor-pointer group">
                gald12123434@gmail.com <div className="p-3 bg-white/5 rounded-xl group-hover:bg-purple-600 transition-all"><Mail size={24} /></div>
              </div>
              <div className="flex items-center justify-end gap-5 text-xl font-bold text-white/40 hover:text-white transition-colors cursor-pointer group">
                050-6525235 <div className="p-3 bg-white/5 rounded-xl group-hover:bg-purple-600 transition-all"><Phone size={24} /></div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <form onSubmit={handleSubmit} className="relative p-12 bg-white/[0.02] border border-white/10 rounded-[48px] backdrop-blur-xl shadow-2xl">
              <div className="absolute top-0 right-12 -translate-y-1/2 bg-purple-600 text-[10px] font-black tracking-widest px-4 py-1 rounded-full uppercase italic">חודש נסיון ללא עלות תפעול!</div>
              
              <div className="space-y-6">
                <input name="fullName" type="text" required placeholder="שם מלא / חברת אבטחה" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-purple-500 outline-none text-right transition-all" />
                <input name="phone" type="tel" required placeholder="מס' טלפון" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-purple-500 outline-none text-right transition-all" />
                <input name="email" type="email" required placeholder="אימייל" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-purple-500 outline-none text-right transition-all" />
                
                <AnimatePresence>
                  {status.type && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }} 
                      animate={{ opacity: 1, height: 'auto' }} 
                      exit={{ opacity: 0, height: 0 }}
                      className={`flex items-center gap-2 text-sm font-bold p-4 rounded-xl ${
                        status.type === 'success' ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'
                      }`}
                    >
                      {status.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                      {status.message}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-white text-black py-6 rounded-2xl text-xl font-black hover:bg-purple-600 hover:text-white transition-all shadow-2xl active:scale-95 disabled:opacity-50 flex justify-center items-center gap-3"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" /> : 'שריין חודש ניסיון חינם!'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-20 relative z-10 border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-xl font-black italic">SHIELDUP<span className="text-purple-600 font-black">PRO</span></div>
          <p className="text-white/20 text-xs font-bold">המומחים לשיווק חדירה בענף המיגון והאבטחה</p>
          <div className="text-[10px] font-mono text-white/10 tracking-[0.5em] uppercase">// encrypted // secure_marketing // 2026</div>
        </div>
      </footer>
    </div>
  );
}
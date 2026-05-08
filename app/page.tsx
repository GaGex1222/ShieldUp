"use client";
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Target, Zap, BarChart2, ShieldCheck, Mail, Phone, Activity, 
  Cpu, Video, Crosshair, Fingerprint, Globe, Radar, 
  ChevronDown, CheckCircle2, XCircle, Terminal, Eye, Lock, Layers, Gift
} from 'lucide-react';

export default function ShieldUpPro() {
  const { scrollYProgress } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

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
          
          {/* לוגו - נשאר בגודל קבוע */}
          <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <ShieldCheck className="text-purple-500 w-8 h-8" />
            <span className="text-2xl font-black tracking-tighter uppercase">Shield<span className="text-purple-600">Up</span></span>
          </div>

          {/* תפריט בעברית - נשאר בגובה קבוע */}
          <div className="hidden lg:flex gap-10 items-center text-sm font-bold tracking-tight text-white/40">
            <button onClick={() => scrollToSection('stats')} className="hover:text-purple-400 transition-all">מדדי עוצמה</button>
            <button onClick={() => scrollToSection('strategy')} className="hover:text-purple-400 transition-all">מודל עבודה</button>
            <button onClick={() => scrollToSection('offer')} className="hover:text-purple-400 transition-all">הצעה מבצעית</button>
            
            <button 
              onClick={() => scrollToSection('contact')} 
              className="bg-purple-600 text-white px-7 py-3 rounded-full hover:bg-white hover:text-black transition-all font-black text-xs uppercase"
            >
              הפעל חדירה לשוק
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center justify-center px-6 z-10 pt-20">
        <motion.div style={{ scale, opacity }} className="text-center max-w-5xl">
          {/* FREE MONTH BADGE */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 border border-white/20 px-6 py-2 rounded-full mb-10 shadow-[0_0_30px_rgba(168,85,247,0.3)]"
          >
            <Gift className="w-5 h-5 text-white animate-bounce" />
            <span className="text-xs font-black tracking-widest uppercase text-white">פיילוט לזמן מוגבל: חודש שלם של שיווק ללא עלות</span>
          </motion.div>

          <h1 className="text-6xl md:text-[140px] font-black leading-[0.85] tracking-tighter italic mb-10">
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">דומיננטיות בענף</span>
            <span className="block text-purple-600">המיגון והאבטחה.</span>
          </h1>

          <p className="text-lg md:text-2xl text-white/40 max-w-3xl mx-auto font-light leading-relaxed mb-16">
            אנחנו בונים עבורכם מערך חדירה דיגיטלי מבוסס מודיעין שוק, המאתר ומטרגט מקבלי החלטות בתחומי האבטחה. בעזרת סינון לידים אוטומטי, אנחנו הופכים את המותג שלכם לסמכות הבלעדית בשטח. תנו לנו להוכיח לכם תוצאות — <span className="text-white font-bold underline decoration-purple-500 underline-offset-4 font-['Assistant']">החודש הראשון עלינו.</span>
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <button onClick={() => scrollToSection('contact')} className="group relative bg-white text-black px-12 py-6 rounded-2xl overflow-hidden shadow-2xl transition-transform active:scale-95">
              <span className="relative text-xl font-black italic flex items-center gap-3">
                הפעל חודש ניסיון חינם <Zap size={20} className="fill-current" />
              </span>
            </button>
            <button onClick={() => scrollToSection('stats')} className="text-lg font-bold text-white/60 hover:text-white transition-colors">נתוני חדירה לשוק</button>
          </div>
        </motion.div>
      </section>

      {/* --- NEW STATS SECTION --- */}
{/* --- NEW STATS SECTION --- */}
      <section id="stats" className="py-32 relative z-10 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Activity />, label: "דיוק המרת לידים", value: "14.2%", desc: "אופטימיזציית אלגוריתם ייעודית לתחום המיגון" },
            { icon: <Target />, label: "בסיס נתוני רכש", value: "85K+", desc: "גישה ישירה לקב'טים ומנהלי תפעול מפולחים" },
            { icon: <BarChart2 />, label: "תקציבים מנוהלים", value: "₪4M+", desc: "החזר השקעה (ROI) הגבוה ביותר בענף האבטחה" },
            { icon: <ShieldCheck />, label: "מותגי מיגון מובילים", value: "120+", desc: "חברות שבחרו לשלוט בשוק בעזרת ShieldUp" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-white/[0.03] border border-white/10 rounded-[32px] backdrop-blur-xl group hover:border-purple-500/50 transition-all"
            >
              <div className="text-purple-500 mb-6 group-hover:scale-110 transition-transform">{stat.icon}</div>
              <div className="text-4xl font-black mb-2 tracking-tight">{stat.value}</div>
              <div className="text-white font-bold text-sm mb-2 uppercase tracking-wider">{stat.label}</div>
              <div className="text-white/30 text-xs leading-relaxed">{stat.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- NO-RISK OFFER SECTION (NEW) --- */}
      <section id="offer" className="py-40 relative z-10">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-br from-purple-900/20 to-transparent border border-purple-500/30 rounded-[48px] p-12 md:p-24 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-10">
              <Gift size={300} />
            </div>
            
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic">0% סיכון. מקסימום אבטחה עסקי.</h2>
            <p className="max-w-3xl mx-auto text-xl text-white/60 mb-12">
              אנחנו כל כך בטוחים בשיטה שלנו לענף המיגון, שאנחנו נותנים לכם חודש מלא של עבודה מבצעית. <br />
              <span className="text-white font-bold">ראיתם זרם של עסקאות חדשות? ממשיכים. לא ראיתם? לא שילמתם.</span>
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 text-right max-w-4xl mx-auto">
              <div className="flex gap-4">
                <CheckCircle2 className="text-purple-500 shrink-0" />
                <span>הקמת תשתית שיווק ייעודית לאבטחה</span>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="text-purple-500 shrink-0" />
                <span>ללא התחייבות וללא דמי הקמה</span>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="text-purple-500 shrink-0" />
                <span>שקיפות מלאה בניהול התקציב</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- STRATEGY SECTION --- */}
      <section id="strategy" className="py-40 relative z-10 container mx-auto px-6">
        <h2 className="text-center text-4xl font-black mb-20 uppercase tracking-[0.2em]">פרוטוקול העבודה</h2>
        <div className="max-w-4xl mx-auto space-y-4">
          {[
            { step: "01", title: "מודיעין תחרותי", desc: "מיפוי המתחרים שלכם בענף המיגון ואיתור פרצות שיווקיות לחדירה מהירה." },
            { step: "02", title: "פריסת מערך", desc: "הטמעת משפכי סינון מבוססי AI שמעבירים לאנשי המכירות שלכם רק לידים חמים וסגורים." },
            { step: "03", title: "השתלטות על הגזרה", desc: "דומיננטיות מלאה במדיה הדיגיטלית שהופכת את המותג שלכם לבחירה הראשונה של הלקוח." }
          ].map((step, i) => (
            <motion.div 
              key={i}
              whileHover={{ x: -10 }}
              className="p-8 bg-white/[0.01] border border-white/5 rounded-2xl flex items-start gap-8 group hover:bg-white/[0.03] transition-all"
            >
              <span className="text-4xl font-black text-purple-600/30 group-hover:text-purple-600">{step.step}</span>
              <div>
                <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                <p className="text-white/40 font-light italic">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- CONTACT --- */}
      <section id="contact" className="py-40 relative z-10 px-6">
        <div className="container mx-auto max-w-6xl flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2 text-right">
            <h2 className="text-6xl md:text-8xl font-black italic mb-10 text-white">תפוס<br/><span className="text-purple-600 font-black">פיקוד.</span></h2>
            <p className="text-white/30 text-xl mb-12 font-bold underline underline-offset-8 decoration-purple-500">החודש הראשון הוא פיילוט על חשבוננו - ללא סיכון.</p>
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
            <form 
              onSubmit={(e) => { e.preventDefault(); alert('היעד נעול. מחלקת הגיוס תיצור קשר לתיאום הפיילוט.'); }}
              className="relative p-12 bg-white/[0.02] border border-white/10 rounded-[48px] backdrop-blur-xl shadow-2xl"
            >
              <div className="absolute top-0 right-12 -translate-y-1/2 bg-purple-600 text-[10px] font-black tracking-widest px-4 py-1 rounded-full uppercase italic">בקשת פיילוט ללא עלות</div>
              <div className="space-y-6">
                <input type="text" required placeholder="שם מלא / חברת אבטחה" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-purple-500 outline-none text-right transition-all" />
                <input type="tel" required placeholder="טלפון ישיר למקבלי החלטות" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-purple-500 outline-none text-right transition-all" />
                <input type="email" placeholder="אימייל ארגוני" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-purple-500 outline-none text-right transition-all" />
                <button type="submit" className="w-full bg-white text-black py-6 rounded-2xl text-xl font-black hover:bg-purple-600 hover:text-white transition-all shadow-2xl active:scale-95">
                   שריין חודש ניסיון חינם
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-20 relative z-10 border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-xl font-black italic">SHIELDUP<span className="text-purple-600 font-black">PRO</span></div>
          <p className="text-white/20 text-xs font-bold">המומחים לשיווק חדירה בענף המיגון והאבטחה</p>
          <div className="text-[10px] font-mono text-white/10 tracking-[0.5em] uppercase">
             // encrypted // secure_marketing // 2026
          </div>
        </div>
      </footer>

    </div>
  );
}
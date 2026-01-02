import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import {
    ShieldCheck,
    Coins,
    Briefcase,
    Cpu,
    TrendingUp,
    Users,
    Zap,
    Layers,
    ArrowRight,
    CheckCircle2,
    Globe,
    Hammer,
    Banknote,
    Lightbulb,
    MousePointer2,
    Share2,
    Lock,
    PieChart,
    Sparkles,
    Loader2,
    X,
    MessageSquare,
    Rocket,
    User,
    Mail,
    ChevronDown,
    Activity,
    ShieldAlert,
    HelpCircle,
    Plus,
    Minus,
    Award,
    BarChart3,
    Scale,
    Network,
    Heart
} from 'lucide-react';

/**
 * --- SPARK EQUITY: THE ECONOMIC OPERATING SYSTEM ---
 * Direct WhatsApp: +233551389510
 * Founder Image: https://iili.io/fjHhAeS.jpg
 */

// --- API Utility ---
// Always set const apiKey = "" (empty string). 
// The execution environment provides the key at runtime.
// For Vercel hosting: Replace "" with import.meta.env.VITE_GEMINI_API_KEY
const apiKey = "";

async function callGemini(prompt, systemInstruction = "") {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: systemInstruction ? { parts: [{ text: systemInstruction }] } : undefined,
    };

    const maxRetries = 5;
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!response.ok) throw new Error("API request failed");
            const data = await response.json();
            return data.candidates?.[0]?.content?.parts?.[0]?.text;
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            const delay = Math.pow(2, i) * 1000;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

// --- Reusable Components ---

const FadeIn = ({ children, delay = 0, direction = "up", className = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{
                opacity: 0,
                y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
                x: direction === "left" ? 40 : direction === "right" ? -40 : 0
            }}
            animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
            transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-white/5 py-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left group"
            >
                <span className="text-lg font-bold group-hover:text-indigo-400 transition-colors uppercase italic">{question}</span>
                {isOpen ? <Minus className="text-indigo-500" /> : <Plus className="text-slate-500 group-hover:text-white" />}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="text-slate-400 mt-4 leading-relaxed font-light">{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- Main App ---

const App = () => {
    const [scrolled, setScrolled] = useState(false);
    const [aiModal, setAiModal] = useState({ open: false, type: null, content: null });
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userInput, setUserInput] = useState("");

    // Calculator State
    const [calcHours, setCalcHours] = useState(20);
    const [calcInvestment, setCalcInvestment] = useState(500);

    // Registration Form State
    const [regForm, setRegForm] = useState({
        name: '',
        email: '',
        contributionType: 'skill',
        description: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleForecaster = async () => {
        if (!userInput) return;
        setIsLoading(true);
        const systemPrompt = "You are the Master Oracle of Spark Equity. A user will describe their skills, time, or assets. Analyze their input and suggest: 1. A Reputation Tier (out of 1000), 2. Potential ownership percentage in a typical venture, 3. The best business role for them. Tone: Visionary and professional.";
        try {
            const result = await callGemini(`I want to contribute: ${userInput}`, systemPrompt);
            setAiModal({ open: true, type: 'forecaster', content: result || "Unable to generate forecast." });
        } catch (err) {
            setAiModal({ open: true, type: 'error', content: "Oracle is temporarily offline. Please try again soon." });
        } finally {
            setIsLoading(false);
        }
    };

    const handleArchitect = async () => {
        if (!userInput) return;
        setIsLoading(true);
        const systemPrompt = "You are a Venture Architect for Spark Equity. A user pitches a business idea. Provide: 1. Core Logic (Value -> Ownership), 2. Contribution Categories, 3. Dividend Structure, 4. Failure Protection plan.";
        try {
            const result = await callGemini(`My business idea is: ${userInput}`, systemPrompt);
            setAiModal({ open: true, type: 'architect', content: result || "Unable to architect venture." });
        } catch (err) {
            setAiModal({ open: true, type: 'error', content: "The Architect is working on other blueprints." });
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // WhatsApp Integration for Membership
        const phone = "233551389510";
        const text = `Spark Equity Membership Form:
    
Name: ${regForm.name}
Email: ${regForm.email}
Contribution: ${regForm.contributionType.toUpperCase()}
Description: ${regForm.description}`;

        const encodedText = encodeURIComponent(text);

        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
            window.open(`https://wa.me/${phone}?text=${encodedText}`, '_blank');
        }, 1200);
    };

    const handleProposeVenture = () => {
        const phone = "233551389510";
        const message = encodeURIComponent("Hello, I have a venture proposal for the Spark Equity network.");
        window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-[#020205] text-white font-sans selection:bg-indigo-500/30 overflow-x-hidden">

            {/* Registration Modal */}
            <AnimatePresence>
                {isRegisterOpen && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 overflow-y-auto pt-20 pb-10">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsRegisterOpen(false)} className="fixed inset-0 bg-black/90 backdrop-blur-xl" />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative w-full max-w-xl bg-slate-900 border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-[0_0_100px_rgba(79,70,229,0.2)]"
                        >
                            <button onClick={() => setIsRegisterOpen(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors"><X /></button>

                            {!isSubmitted ? (
                                <>
                                    <div className="mb-10 text-center">
                                        <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-600/30"><Share2 className="text-white w-8 h-8" /></div>
                                        <h3 className="text-3xl font-black uppercase italic tracking-tighter">Become a Member</h3>
                                        <p className="text-slate-400 mt-2 font-light">Join the Spark Equity ecosystem today.</p>
                                    </div>
                                    <form onSubmit={handleRegister} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Name</label>
                                                <div className="relative"><User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" /><input required type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-indigo-500 transition-all font-medium text-sm text-white" placeholder="Name" value={regForm.name} onChange={(e) => setRegForm({ ...regForm, name: e.target.value })} /></div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Email</label>
                                                <div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" /><input required type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-indigo-500 transition-all font-medium text-sm text-white" placeholder="Email" value={regForm.email} onChange={(e) => setRegForm({ ...regForm, email: e.target.value })} /></div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Primary Value Input</label>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                                {[
                                                    { id: 'skill', label: 'Skill', icon: <Lightbulb className="w-4 h-4" /> },
                                                    { id: 'work', label: 'Work', icon: <Hammer className="w-4 h-4" /> },
                                                    { id: 'money', label: 'Money', icon: <Banknote className="w-4 h-4" /> },
                                                    { id: 'asset', label: 'Asset', icon: <Globe className="w-4 h-4" /> }
                                                ].map(type => (
                                                    <button key={type.id} type="button" onClick={() => setRegForm({ ...regForm, contributionType: type.id })} className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all gap-1 ${regForm.contributionType === type.id ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-white/5 border-white/5 text-slate-500 hover:bg-white/10'}`}>
                                                        {type.icon}<span className="text-[10px] font-bold uppercase">{type.label}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Your Proposition</label>
                                            <textarea required className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 focus:outline-none focus:border-indigo-500 transition-all font-medium text-sm h-24 resize-none text-white" placeholder="Describe what you bring..." value={regForm.description} onChange={(e) => setRegForm({ ...regForm, description: e.target.value })} />
                                        </div>
                                        <button type="submit" disabled={isLoading} className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-black text-xl uppercase italic tracking-tighter transition-all shadow-lg flex items-center justify-center gap-2">
                                            {isLoading ? <Loader2 className="animate-spin" /> : <>Join Network & Send WhatsApp <ArrowRight className="w-5 h-5" /></>}
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <div className="py-10 text-center">
                                    <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8"><CheckCircle2 className="text-white w-10 h-10" /></motion.div>
                                    <h3 className="text-3xl font-black uppercase italic mb-4">Redirecting...</h3>
                                    <p className="text-slate-400 text-lg mb-8 font-light leading-relaxed">Welcome to Spark Equity, <span className="text-white font-bold">{regForm.name}</span>. Please complete your registration on WhatsApp.</p>
                                    <button onClick={() => { setIsRegisterOpen(false); setIsSubmitted(false); }} className="px-10 py-4 bg-white/5 border border-white/10 rounded-2xl font-black uppercase italic hover:bg-white/10 transition-all text-white">Back to Dashboard</button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* AI Oracle Modal */}
            <AnimatePresence>
                {aiModal.open && (
                    <div className="fixed inset-0 z-[120] flex items-center justify-center px-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setAiModal({ ...aiModal, open: false })} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
                        <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl max-h-[80vh] overflow-y-auto" >
                            <button onClick={() => setAiModal({ ...aiModal, open: false })} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"><X /></button>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-indigo-500 rounded-lg">{aiModal.type === 'forecaster' ? <Sparkles className="text-white" /> : <Rocket className="text-white" />}</div>
                                <h3 className="text-2xl font-black uppercase italic">{aiModal.type === 'forecaster' ? 'Value Prediction' : 'Venture Blueprint'}</h3>
                            </div>
                            <div className="prose prose-invert max-w-none text-slate-300 whitespace-pre-wrap leading-relaxed italic">{aiModal.content}</div>
                            <button onClick={() => setAiModal({ ...aiModal, open: false })} className="mt-8 w-full py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold transition-all text-white">Confirm Insights</button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Navbar */}
            <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/40"><Share2 className="text-white w-6 h-6" /></div>
                        <span className="font-black text-2xl tracking-tighter uppercase italic text-white">Spark Equity</span>
                    </div>
                    <div className="hidden lg:flex items-center gap-8 text-[10px] font-black tracking-widest uppercase text-slate-500">
                        <a href="#how" className="hover:text-white transition-colors">Logic</a>
                        <a href="#oracle" className="hover:text-white transition-colors">AI Oracle</a>
                        <a href="#calculator" className="hover:text-white transition-colors">Calculator</a>
                        <a href="#governance" className="hover:text-white transition-colors">Governance</a>
                    </div>
                    <button onClick={() => setIsRegisterOpen(true)} className="px-6 py-2.5 bg-indigo-600 text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-lg">Join Network</button>
                </div>
            </nav>

            {/* Hero */}
            <section className="relative pt-48 pb-20 px-6 z-10 text-center">
                <div className="max-w-6xl mx-auto">
                    <FadeIn direction="up"><span className="text-indigo-400 font-black tracking-[0.3em] text-[10px] uppercase mb-6 block">The Future of Communal Capital</span></FadeIn>
                    <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="text-6xl md:text-[8rem] font-black tracking-tighter leading-[0.85] mb-12 uppercase italic text-white" >
                        OWN THE <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-600">PROFITS</span> <br /> YOU MAKE.
                    </motion.h1>
                    <FadeIn delay={0.3}><p className="text-xl md:text-3xl text-slate-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed">Turn effort, money, or assets into <span className="text-white font-bold italic underline decoration-indigo-500">permanent equity</span> across a network of real businesses through Spark Equity.</p></FadeIn>
                    <FadeIn delay={0.5}>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <button onClick={() => setIsRegisterOpen(true)} className="px-12 py-6 bg-white text-black rounded-2xl font-black text-xl flex items-center gap-3 hover:scale-105 transition-transform shadow-2xl">Join Now <ArrowRight /></button>
                            <button onClick={handleProposeVenture} className="px-12 py-6 bg-indigo-600/10 border border-indigo-500/30 text-indigo-400 rounded-2xl font-black text-xl hover:bg-indigo-600 hover:text-white transition-all">Propose a Venture</button>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Founder Manifesto */}
            <section className="py-24 px-6 relative overflow-hidden bg-indigo-600/10 border-y border-indigo-500/10">
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-20">
                        <FadeIn direction="right" className="shrink-0">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
                                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-[3rem] overflow-hidden border-2 border-white/10 shadow-2xl bg-slate-800">
                                    <img
                                        src="https://iili.io/fjHhAeS.jpg"
                                        alt="Founder"
                                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                                        onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=800&h=800"; }}
                                    />
                                </div>
                                <div className="absolute -bottom-6 -right-6 p-6 bg-indigo-600 rounded-3xl border border-white/10 shadow-xl">
                                    <p className="text-xs font-black uppercase tracking-widest text-white mb-1">Founder & Visionary</p>
                                    <p className="text-sm font-bold italic text-indigo-100 opacity-80 underline decoration-indigo-300">Verified Identity</p>
                                </div>
                            </div>
                        </FadeIn>
                        <div className="flex-1 text-center lg:text-left">
                            <FadeIn delay={0.2}>
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-8">
                                    <Heart className="text-indigo-400 w-4 h-4 fill-indigo-400/20" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Our Core Mission</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-black italic uppercase leading-tight tracking-tight mb-8 text-white">Making ownership accessible to <span className="text-indigo-400">everyone.</span></h2>
                                <p className="text-2xl md:text-4xl text-white font-light italic leading-snug">
                                    "A community-powered way for people to <span className="text-indigo-400 font-bold">pool small amounts of money</span>, fund real businesses, and share profits transparently—making business ownership <span className="underline decoration-indigo-500 underline-offset-8 decoration-4">accessible to everyone</span>."
                                </p>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            {/* Network Feed */}
            <section className="py-12 bg-white/5 border-b border-white/5 overflow-hidden whitespace-nowrap">
                <motion.div animate={{ x: [0, -1000] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="flex gap-16 items-center">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="flex items-center gap-4 shrink-0">
                            <Activity className="w-4 h-4 text-indigo-500" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">#{(14200 + i).toLocaleString()} verified <span className="text-white font-bold">Value-Input</span> • <span className="text-indigo-400">+0.012% Payout Tier</span></span>
                            <div className="w-1 h-1 bg-slate-700 rounded-full" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Profit Pool increased by <span className="text-green-500">+$1,240 USD</span> from Digital Sales</span>
                        </div>
                    ))}
                </motion.div>
            </section>

            {/* AI Oracle */}
            <section id="oracle" className="py-32 px-6 relative overflow-hidden">
                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="bg-slate-900 border border-white/10 rounded-[3rem] p-8 md:p-16 shadow-2xl">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500 rounded-full text-[10px] font-black uppercase mb-4 text-white"><Sparkles className="w-3 h-3" /> Spark Oracle AI</div>
                            <h2 className="text-4xl md:text-5xl font-black italic uppercase mb-6 text-white">The Spark Oracle.</h2>
                            <p className="text-slate-400 text-lg font-light italic">Define your input. The Oracle will define your future ownership.</p>
                        </div>
                        <div className="space-y-6">
                            <textarea value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="Describe your skills, capital, or business ideas..." className="w-full h-32 bg-black/50 border border-white/10 rounded-2xl p-6 text-slate-200 focus:outline-none focus:border-indigo-500 transition-all resize-none font-medium text-white" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button onClick={handleForecaster} disabled={isLoading || !userInput} className="px-8 py-5 bg-indigo-600 rounded-2xl font-black uppercase tracking-tighter text-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-white shadow-lg">
                                    {isLoading ? <Loader2 className="animate-spin" /> : <><Sparkles className="w-5 h-5" /> Ownership Forecast</>}
                                </button>
                                <button onClick={handleArchitect} disabled={isLoading || !userInput} className="px-8 py-5 bg-white/5 border border-white/10 rounded-2xl font-black uppercase tracking-tighter text-xl hover:bg-white/10 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-white">
                                    {isLoading ? <Loader2 className="animate-spin" /> : <><Rocket className="w-5 h-5" /> Architect Venture</>}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Calculator */}
            <section id="calculator" className="py-32 px-6 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <FadeIn direction="right">
                        <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mb-8 text-white">Trust <br /><span className="text-indigo-500 underline">Mathematics.</span></h2>
                        <p className="text-xl text-slate-400 mb-12 font-light italic">No secret deals. No Dilution. Just fair, community-backed value conversion.</p>
                        <div className="space-y-12">
                            <div className="space-y-4">
                                <div className="flex justify-between font-black uppercase text-[10px] tracking-widest text-slate-500">
                                    <span>Weekly Work Commitment</span>
                                    <span className="text-indigo-400">{calcHours} Hours</span>
                                </div>
                                <input type="range" min="1" max="80" value={calcHours} onChange={(e) => setCalcHours(parseInt(e.target.value))} className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between font-black uppercase text-[10px] tracking-widest text-slate-500">
                                    <span>Pooled Capital Injection</span>
                                    <span className="text-green-400">${calcInvestment}</span>
                                </div>
                                <input type="range" min="0" max="10000" step="100" value={calcInvestment} onChange={(e) => setCalcInvestment(parseInt(e.target.value))} className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-green-500" />
                            </div>
                        </div>
                    </FadeIn>
                    <FadeIn direction="left">
                        <div className="bg-slate-900 border border-white/10 rounded-[4rem] p-12 text-center relative overflow-hidden group shadow-2xl">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-100 transition-opacity"><Coins className="w-20 h-20 text-indigo-500" /></div>
                            <div className="relative z-10">
                                <h3 className="text-xl font-black uppercase tracking-widest text-slate-500 mb-8 italic">Impact Projection</h3>
                                <div className="space-y-8">
                                    <div>
                                        <div className="text-[10px] font-black uppercase text-indigo-400 mb-1 tracking-widest">Share Allocation</div>
                                        <div className="text-7xl font-black italic text-white">{((calcHours * 0.05) + (calcInvestment / 5000)).toFixed(3)}%</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                                            <div className="text-[10px] font-black uppercase text-slate-500 mb-1 tracking-widest">Reputation Lvl</div>
                                            <div className="text-2xl font-black text-indigo-300 italic">+{Math.round(calcHours * 2.5)}</div>
                                        </div>
                                        <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                                            <div className="text-[10px] font-black uppercase text-slate-500 mb-1 tracking-widest">Dividend Tier</div>
                                            <div className="text-2xl font-black text-green-500 italic">Alpha</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Governance */}
            <section id="governance" className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-4 text-white">Democratic <span className="text-indigo-500 italic">Control.</span></h2>
                        <p className="text-slate-400 max-w-2xl mx-auto font-light italic">Decentralized decision making powered by merit and proof of value.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { title: "Network Proposals", desc: "Propose new physical or digital businesses. Proposals are analyzed for scalability and risk.", icon: <Rocket className="text-indigo-500" /> },
                            { title: "Merit Vetting", desc: "Active members vote on venture launches. The higher your reputation, the more weight your vote carries.", icon: <Scale className="text-purple-500" /> },
                            { title: "Profit Waterfall", desc: "Earnings flow back through the pool. Shares are transparently distributed via the network ledger.", icon: <Zap className="text-orange-500" /> }
                        ].map((step, i) => (
                            <div key={i} className="relative p-10 bg-slate-900 border border-white/5 rounded-[3rem] hover:border-indigo-500/30 transition-all shadow-xl group">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">{step.icon}</div>
                                <h4 className="text-2xl font-black uppercase italic mb-4 text-white">{step.title}</h4>
                                <p className="text-slate-400 leading-relaxed font-light italic">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Failure Clause */}
            <section className="py-32 px-6 bg-indigo-600">
                <div className="max-w-5xl mx-auto text-center">
                    <ShieldAlert className="w-20 h-20 text-white mx-auto mb-8 animate-pulse" />
                    <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-8 leading-none">Failure is a <br /> Recycled Asset.</h2>
                    <p className="text-2xl text-indigo-100 font-light italic mb-12">"We contain failure. We never discard the builders."</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        {[
                            { t: "Asset Re-Injection", d: "If a business fails, the physical tools and digital code are injected into new network launches immediately." },
                            { t: "Reputation Buff", d: "Trying to build a venture earns you permanent reputation points, regardless of that specific outcome." },
                            { t: "The Priority Net", d: "Failed venture contributors move to the top of the list for the next available network launch." }
                        ].map((item, i) => (
                            <div key={i} className="bg-white/10 p-8 rounded-3xl backdrop-blur-md border border-white/10 group hover:bg-indigo-700 transition-colors">
                                <h4 className="text-xl font-black text-white uppercase italic mb-2 tracking-tight">{item.t}</h4>
                                <p className="text-indigo-100 text-sm leading-relaxed font-light italic">{item.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer / FAQ */}
            <section className="py-32 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-16">
                        <HelpCircle className="text-indigo-500 w-8 h-8" />
                        <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white">Queries & Logic.</h2>
                    </div>
                    <div className="space-y-4">
                        <FAQItem question="What is 'Spark'?" answer="Spark represents the moment value is contributed. Every hour of labor or dollar invested acts as a 'Spark' that ignites your permanent equity stake." />
                        <FAQItem question="Is this a legal corporation?" answer="Spark Equity operates as a decentralized holding structure. Individual ventures are localized legal entities, but the ownership layer is network-wide." />
                        <FAQItem question="How do I withdraw profits?" answer="Profits are distributed monthly via digital transfer (or localized payment methods) based on your verified equity tier in the ledger." />
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-48 px-6 text-center bg-white/5 border-t border-white/5">
                <FadeIn>
                    <h2 className="text-6xl md:text-[8rem] font-black uppercase italic tracking-tighter mb-12 leading-[0.8] text-white">Ignite your <br /> <span className="text-indigo-500 italic">Equity.</span></h2>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button onClick={() => setIsRegisterOpen(true)} className="px-12 py-6 bg-white text-black rounded-3xl font-black text-2xl uppercase tracking-tighter hover:bg-indigo-50 shadow-2xl transition-all">Join Network</button>
                        <button onClick={handleProposeVenture} className="px-12 py-6 bg-indigo-600 text-white rounded-3xl font-black text-2xl uppercase tracking-tighter hover:bg-indigo-500 transition-all">Propose Venture</button>
                    </div>
                    <div className="mt-16 flex items-center justify-center gap-12 text-[10px] font-black uppercase tracking-widest text-slate-700 italic">
                        <span>Verified Value Protocol</span>
                        <span>Zero Dilution Guarantee</span>
                        <span>Profit Recirculation</span>
                    </div>
                </FadeIn>
            </section>

            <footer className="py-12 border-t border-white/5 text-center px-6 text-slate-600 font-black uppercase text-[10px] tracking-widest bg-black">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3">
                        <Share2 className="text-indigo-500 w-5 h-5" />
                        <span className="font-black text-sm uppercase tracking-widest italic text-white">Spark Equity</span>
                    </div>
                    <div>© {new Date().getFullYear()} Spark Equity • Merit-Based Economic OS</div>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-white transition-colors">Manifesto</a>
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                    </div>
                </div>
            </footer>

            <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #020205; }
        ::-webkit-scrollbar-thumb { background: #1e1b4b; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #312e81; }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 15px rgba(79,70,229,0.5);
        }
      `}</style>
        </div>
    );
};

export default App;
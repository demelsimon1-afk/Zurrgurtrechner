import React, { useState, useEffect, useRef } from 'react';
import { 
  Scale, AlertTriangle, CheckCircle, Info, Box, Truck, ShieldCheck, 
  ShieldAlert, Trees, Ruler, Clock, CheckSquare, Settings, ChevronRight, ChevronDown, ChevronUp, ChevronLeft,
  Droplets, Weight, Gavel, User, Briefcase, FileText, X, Edit3, 
  Calculator, Smartphone, RotateCw, Lock, MapPin, Gauge, Car, Zap, Wand2,
  Copyright, Caravan, Calendar, UserPlus, Eye, EyeOff, Globe, Server, Cookie, UserCheck, Printer,
  List, Heart, Coffee, BookOpen, AlertCircle, Syringe, Fingerprint, Scale as ScaleLaw, Key, Download,
  Menu, Sun, Moon, Home, Search, Shield, Users, CreditCard, CircleDashed, Baby, Bike, CigaretteOff
} from 'lucide-react';

// --- THEME CONTEXT & STYLES ---
const ThemeContext = React.createContext({ isDarkMode: false, toggleDarkMode: () => {} });

const darkThemeCSS = `
  .dark { background-color: #0f172a; min-height: 100vh; }
  .dark .bg-slate-50 { background-color: #0f172a !important; }
  .dark .bg-white { background-color: #1e293b !important; border-color: #334155 !important; }
  .dark .text-slate-800, .dark .text-slate-700, .dark .text-slate-900 { color: #f1f5f9 !important; }
  .dark .text-slate-600, .dark .text-slate-500, .dark .text-slate-400 { color: #94a3b8 !important; }
  .dark .border-slate-100, .dark .border-slate-200 { border-color: #334155 !important; }
  .dark input, .dark select { background-color: #1e293b !important; color: #f8fafc !important; border-color: #334155 !important; color-scheme: dark; }
  .dark .bg-slate-800, .dark .bg-slate-700 { background-color: #0f172a !important; border-color: #334155 !important; }
  .dark .shadow-sm, .dark .shadow-md, .dark .shadow-xl { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3) !important; }
  
  /* Preserve specific colored boxes but dim them for dark mode */
  .dark .bg-red-50 { background-color: rgba(239, 68, 68, 0.15) !important; border-color: rgba(239, 68, 68, 0.2) !important; }
  .dark .bg-indigo-50 { background-color: rgba(99, 102, 241, 0.15) !important; border-color: rgba(99, 102, 241, 0.2) !important; }
  .dark .bg-amber-50 { background-color: rgba(245, 158, 11, 0.15) !important; border-color: rgba(245, 158, 11, 0.2) !important; }
  .dark .bg-blue-50 { background-color: rgba(59, 130, 246, 0.15) !important; border-color: rgba(59, 130, 246, 0.2) !important; }
  .dark .bg-emerald-50, .dark .bg-green-50 { background-color: rgba(16, 185, 129, 0.15) !important; border-color: rgba(16, 185, 129, 0.2) !important; }
  .dark .bg-teal-50 { background-color: rgba(20, 184, 166, 0.15) !important; border-color: rgba(20, 184, 166, 0.2) !important; }
  .dark .bg-purple-50 { background-color: rgba(168, 85, 247, 0.15) !important; border-color: rgba(168, 85, 247, 0.2) !important; }
  .dark .bg-cyan-50 { background-color: rgba(6, 182, 212, 0.15) !important; border-color: rgba(6, 182, 212, 0.2) !important; }
  .dark .bg-rose-50 { background-color: rgba(244, 63, 94, 0.15) !important; border-color: rgba(244, 63, 94, 0.2) !important; }

  /* Bottom Nav dark mode */
  .dark .fixed.bottom-0.bg-white\\/95 { background-color: rgba(15, 23, 42, 0.95) !important; border-color: #334155 !important; }
  .dark .bg-slate-100 { background-color: #1e293b !important; }

  /* Custom Scrollbar for better UX */
  .custom-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
  .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
  .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #475569; }
`;

// --- GLOBAL STYLES FOR PRINTING ---
const PrintStyles = () => (
  <style>{`
    @media print {
      @page {
        size: A4;
        margin: 1.5cm;
      }
      body {
        background-color: white !important;
        color: #000 !important;
        font-family: Arial, Helvetica, sans-serif !important;
        font-size: 11pt !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      
      /* HIDE SCREEN ELEMENTS */
      .no-print, nav, footer, button, .screen-only, .fixed, .sticky {
        display: none !important;
      }

      /* SHOW PRINT ELEMENTS */
      .print-only {
        display: block !important;
      }

      /* GENERAL PRINT LAYOUT */
      .print-container {
        width: 100%;
        max-width: 100%;
        margin: 0;
        padding: 0;
      }

      h1.print-title {
        font-size: 18pt;
        font-weight: bold;
        margin-bottom: 10px;
        border-bottom: 2px solid #000;
        padding-bottom: 5px;
        text-transform: uppercase;
      }

      h2.print-section {
        font-size: 14pt;
        font-weight: bold;
        margin-top: 20px;
        margin-bottom: 10px;
        background-color: #f0f0f0;
        padding: 5px;
        border-left: 5px solid #666;
      }

      .print-meta {
        font-size: 9pt;
        color: #666;
        margin-bottom: 20px;
        font-style: italic;
      }

      /* PRINT TABLES */
      table.print-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 15px;
        font-size: 10pt;
        page-break-inside: avoid;
      }
      
      table.print-table th, table.print-table td {
        border: 1px solid #ccc;
        padding: 6px 8px;
        text-align: left;
        vertical-align: top;
      }

      table.print-table th {
        background-color: #e5e5e5;
        font-weight: bold;
        width: 40%;
      }

      /* RESULT BOX IN PRINT */
      .print-result-box {
        border: 2px solid #000;
        padding: 10px;
        margin-top: 15px;
        page-break-inside: avoid;
        background-color: #fafafa;
      }
      
      .print-result-header {
        font-weight: bold;
        font-size: 12pt;
        margin-bottom: 5px;
        text-transform: uppercase;
      }

      .print-warning {
        color: #d00;
        font-weight: bold;
      }

      /* HIDE ICONS GLOBALLY IN PRINT */
      svg:not(.print-safe) {
        display: none !important;
      }
    }

    /* SCREEN ONLY STYLES */
    .print-only {
      display: none;
    }
  `}</style>
);

// --- HELPER COMPONENTS ---
const LashingStrapIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 12h20" />
    <rect x="8" y="7" width="8" height="10" rx="2" fill="currentColor" fillOpacity="0.1" />
    <path d="M8 12h8" />
    <path d="M2 12l2 2" />
    <path d="M22 12l-2 2" />
  </svg>
);

const DiagonalLashingIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="6" y="6" width="12" height="12" rx="1" />
    <path d="M2 2l4 4" />
    <path d="M22 2l-4 4" />
    <path d="M2 22l4-4" />
    <path d="M22 22l-4-4" />
  </svg>
);

const ConstructionConeIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M11.3 3.6c.3-.8 1.4-.8 1.7 0l8.4 16.8c.4.8-.2 1.6-1 1.6H3.6c-.8 0-1.4-.8-1-1.6l8.7-16.8z" fill="currentColor" fillOpacity="0.2" />
    <path d="M11.3 3.6c.3-.8 1.4-.8 1.7 0l8.4 16.8c.4.8-.2 1.6-1 1.6H3.6c-.8 0-1.4-.8-1-1.6l8.7-16.8z" />
    <path d="M7 14h10" />
    <path d="M9 10h6" />
  </svg>
);

const SpiritLevelIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="8" width="20" height="8" rx="2" />
      <line x1="7" y1="8" x2="7" y2="16" />
      <line x1="17" y1="8" x2="17" y2="16" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" fillOpacity="0.5" />
    </svg>
);

const TruckTrailerIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M1 17V9a1 1 0 0 1 1-1h2l2 3v6" /> 
    <rect x="6.5" y="8" width="4.5" height="9" rx="1" /> 
    <circle cx="3.5" cy="18" r="1.5" /> 
    <circle cx="9" cy="18" r="1.5" /> 
    <line x1="11" y1="16" x2="15.5" y2="16" strokeWidth="1.5" />
    <circle cx="15.5" cy="16" r="0.5" fill="currentColor" /> 
    <rect x="16" y="8" width="7" height="9" rx="1" /> 
    <circle cx="18" cy="18" r="1.5" /> 
    <circle cx="21" cy="18" r="1.5" /> 
    <path d="M1 18h10" strokeOpacity="0.2" />
    <path d="M16 18h7" strokeOpacity="0.2" />
  </svg>
);

const WoodTruckIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 17V9a2 2 0 0 1 2-2h3l2 4v6" />
      <circle cx="5" cy="18" r="2" />
      <circle cx="16" cy="18" r="2" />
      <circle cx="20" cy="18" r="2" />
      <path d="M2 17h10" />
      <path d="M12 17h10" />
      <g stroke="#8B4513" opacity="0.9">
        <line x1="12" y1="14" x2="22" y2="14" strokeWidth="2.5" />
        <line x1="12" y1="11" x2="22" y2="11" strokeWidth="2.5" />
        <line x1="13" y1="8" x2="21" y2="8" strokeWidth="2.5" />
      </g>
    </svg>
);

const WoodTrainIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M1 17V9a1 1 0 0 1 1-1h2v9" /> 
      <path d="M4 17h6" /> 
      <circle cx="3" cy="18" r="1.5" />
      <circle cx="8" cy="18" r="1.5" />
      <g stroke="#8B4513">
         <line x1="4.5" y1="13" x2="9.5" y2="13" strokeWidth="2.5" />
         <line x1="4.5" y1="10" x2="9.5" y2="10" strokeWidth="2.5" />
      </g>
      <line x1="10" y1="16" x2="15" y2="16" strokeWidth="1.5" />
      <circle cx="15" cy="16" r="0.5" fill="currentColor" />
      <path d="M15 17h8" /> 
      <circle cx="17" cy="18" r="1.5" />
      <circle cx="21" cy="18" r="1.5" />
      <g stroke="#8B4513">
        <line x1="15.5" y1="13" x2="22" y2="13" strokeWidth="2.5" />
        <line x1="15.5" y1="10" x2="22" y2="10" strokeWidth="2.5" />
      </g>
    </svg>
);

const CarWithTrailerIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M9 10H8" /> 
        <path d="M2 10H1a1 1 0 0 0-1 1v3" />
        <path d="M8 15H1" />
        <circle cx="3.5" cy="16" r="1.5" />
        <path d="M2 10l1.2-2.4A1 1 0 0 1 4 7h3a1 1 0 0 1 .9.6l.7 1.4" />
        <line x1="9" y1="14" x2="15" y2="14" strokeWidth="1.5" />
        <circle cx="15" cy="14" r="0.5" fill="currentColor" />
        <rect x="15" y="9" width="8" height="6" rx="1" />
        <circle cx="19" cy="16" r="1.5" />
    </svg>
);

const AutobahnIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 22 10 2" />
        <path d="M20 22 14 2" />
        <path d="M6 12h12" />
        <path d="M5 16h14" />
    </svg>
);

const TrafficSign = ({ value, selected, onClick }) => {
    if (value === 'VB') {
        return (
            <button 
                onClick={onClick}
                title="Verkehrsberuhigter Bereich (intern 10 km/h)"
                className={`traffic-sign relative flex items-center justify-center w-12 h-12 rounded-lg bg-blue-600 border-2 border-white shadow-md transition-all duration-200 ${selected ? 'scale-110 ring-2 ring-blue-300 z-10' : 'scale-100 opacity-80 hover:opacity-100 hover:scale-105'}`}
            >
                <div className="relative w-full h-full">
                    <Home className="w-[18px] h-[18px] text-white absolute top-0.5 left-0.5" strokeWidth={2.5} />
                    <User className="w-3.5 h-3.5 text-white absolute top-1.5 right-1" strokeWidth={2.5} />
                    <Car className="w-[18px] h-[18px] text-white absolute bottom-1 right-0.5" strokeWidth={2.5} />
                    <div className="w-2.5 h-2.5 bg-white rounded-full absolute bottom-1.5 left-1.5 flex items-center justify-center">
                        <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                    </div>
                </div>
            </button>
        );
    }
    
    return (
        <button 
            onClick={onClick}
            className={`traffic-sign relative flex items-center justify-center w-12 h-12 rounded-full border-4 bg-white shadow-md transition-all duration-200 ${selected ? 'border-red-600 scale-110 ring-2 ring-red-200 z-10' : 'border-red-600/80 scale-100 opacity-70 hover:opacity-100 hover:scale-105'}`}
        >
            <span className="font-black text-slate-900 text-sm tracking-tighter">{value}</span>
        </button>
    );
};

const HeaderLogo = () => {
  const { isDarkMode, toggleDarkMode } = React.useContext(ThemeContext);
  return (
    <div className="flex items-center gap-3 no-print">
        <button 
            onClick={toggleDarkMode}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors border border-white/10 shadow-sm"
            title="Nachtmodus"
        >
            {isDarkMode ? <Sun className="w-4 h-4 text-yellow-300" /> : <Moon className="w-4 h-4 text-white" />}
        </button>
        <span className="text-base font-black text-white/50 tracking-wider italic select-none border border-white/20 px-3 py-1 rounded-md backdrop-blur-sm">
            Demel
        </span>
    </div>
  );
};

const AppVersionFooter = () => (
    <div className="text-center text-[10px] text-slate-300 font-mono py-2 select-none no-print">
        RoadTool v. 3.0
    </div>
);

const PrintButton = () => (
    <button 
        onClick={() => window.print()} 
        className="w-full mt-8 mb-4 py-3 bg-slate-800 text-white rounded-xl font-bold uppercase tracking-widest hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 no-print shadow-lg"
    >
        <Printer className="w-5 h-5" />
        Druckprotokoll erstellen
    </button>
);

const FormulaFraction = ({ numerator, denominator, label, equals, className = "" }) => (
  <div className={`flex items-center justify-center gap-2 font-mono text-sm ${className}`}>
    {label && <span className="font-bold mr-1">{label}</span>}
    {equals && <span className="mr-1">{equals}</span>}
    <div className="flex flex-col items-center text-center">
      <div className="border-b border-slate-400 pb-1 px-1 whitespace-nowrap">{numerator}</div>
      <div className="pt-1 px-1 whitespace-nowrap">{denominator}</div>
    </div>
  </div>
);

const LashingDetailTable = ({ data }) => (
  <div className="mt-4 border-t border-slate-200 pt-3">
    <div className="mb-2 text-[10px] text-slate-400 font-bold uppercase tracking-wide">Detaillierte Berechnungswerte</div>
    <table className="w-full text-xs text-left">
      <thead>
        <tr className="text-slate-400 border-b border-slate-100">
          <th className="pb-1 font-bold">Richtung</th>
          <th className="pb-1 font-bold hidden sm:table-cell">Gleit-Reib. μ</th>
          <th className="pb-1 font-bold">Beschl. c</th>
          <th className="pb-1 font-bold hidden sm:table-cell">Winkel α</th>
          <th className="pb-1 font-bold">Formschluss</th>
          <th className="pb-1 font-bold">F<sub>Form</sub> (daN)</th>
          <th className="pb-1 text-right font-black">Ergebnis</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-5">
        {data.map((row, i) => (
            <tr key={i} className="text-slate-700">
                <td className="py-1.5 font-bold">{row.label}</td>
                <td className="py-1.5 hidden sm:table-cell">{row.mu.toFixed(2).replace('.', ',')}</td>
                <td className="py-1.5">{row.c} g</td>
                <td className="py-1.5 hidden sm:table-cell">{row.angle}°</td>
                <td className="py-1.5">{row.hasFit ? <span className="text-emerald-600 font-bold flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Ja</span> : <span className="text-slate-400 text-[10px]">Nein</span>}</td>
                <td className="py-1.5">{row.force}</td>
                <td className="py-1.5 text-right font-black">{row.result} Gurte</td>
            </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const CalculationToggle = ({ children, label = "Rechenweg anzeigen", forceOpen = false }) => {
    const [isOpen, setIsOpen] = useState(forceOpen);
    return (
        <div className="mt-4">
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="flex items-center gap-2 text-xs font-bold uppercase text-slate-400 hover:text-indigo-600 transition-colors mx-auto no-print"
            >
                {isOpen ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {label}
            </button>
            {isOpen && <div className="animate-in fade-in slide-in-from-top-2 duration-300">{children}</div>}
        </div>
    );
};

const LashingFormulaDisplay = ({ values, details, weightClass }) => {
  if (!values) return null;
  const { weightForceN, c, formForceN, mu, alphaRad, stfNewton } = values;
  const factor = (!weightClass || weightClass <= 3500) ? "1,8" : "2";

  return (
    <CalculationToggle>
        <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
            <div className="flex items-center gap-2 mb-2 font-bold text-slate-500 uppercase text-[10px]"><Calculator className="w-3 h-3" /><span>Berechnungsformel (Niederzurren)</span></div>
            <div className="mb-2 pb-3">
                <div className="text-[10px] text-slate-400 font-bold mb-1 text-center uppercase">
                    {(!weightClass || weightClass <= 3500) ? 'Berechnung nach Spezialformel (< 3,5t)' : 'Berechnung nach VDI 2700 / DIN EN 12195-1'}
                </div>
                <FormulaFraction label={<span className="italic">n</span>} equals="≥" numerator={<span>(F<sub>G</sub> · c) - F<sub>Form</sub> - (F<sub>G</sub> · μ)</span>} denominator={<span>{factor} · μ · sin(α) · STF</span>} />
            </div>
            {details && <LashingDetailTable data={details} />}
        </div>
    </CalculationToggle>
  );
};

const WoodFormulaDisplay = ({ values }) => {
    if (!values) return null;
    const { totalVol, factor, solidVol, density, weight } = values;
    return (
    <CalculationToggle>
        <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
            <div className="flex items-center gap-2 mb-2 font-bold text-slate-500 uppercase text-[10px]"><Calculator className="w-3 h-3" /><span>Berechnungsformel (Holzgewicht)</span></div>
            <div className="grid grid-cols-1 gap-3">
                <div><div className="flex justify-between text-[10px] uppercase font-bold text-slate-400"><span>1. Raummaß (Gesamt)</span><span>V1 + V2</span></div><div className="font-mono bg-white border border-slate-100 p-1.5 rounded mt-0.5 text-center text-emerald-800">Summe = <strong>{totalVol} m³</strong></div></div>
                <div><div className="flex justify-between text-[10px] uppercase font-bold text-slate-400"><span>2. Festmeter</span><span>Raummaß · Faktor</span></div><div className="font-mono bg-white border border-slate-100 p-1.5 rounded mt-0.5 text-center text-emerald-800">{totalVol} m³ · {factor} = <strong>{solidVol} m³</strong></div></div>
                <div><div className="flex justify-between text-[10px] uppercase font-bold text-slate-400"><span>3. Gewicht</span><span>Festmeter · Dichte</span></div><div className="font-mono bg-white border border-slate-100 p-1.5 rounded mt-0.5 text-center font-bold text-emerald-700 text-sm">{solidVol} m³ · {density} kg/m³ ≈ {weight.toLocaleString()} kg</div></div>
            </div>
        </div>
    </CalculationToggle>
    );
};

const OverloadFormulaDisplay = ({ values, isTotal = false }) => {
    if (!values) return null;
    const { actual, tolerance, net, allowed, diff, percent } = values;
    return (
    <CalculationToggle>
        <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
            <div className="flex items-center gap-2 mb-2 font-bold text-slate-500 uppercase text-[10px]"><Calculator className="w-3 h-3" /><span>Berechnungsformel ({isTotal ? 'Gesamtzug' : 'Fahrzeug'})</span></div>
            <div className="space-y-3 font-mono text-[11px]">
                {isTotal ? (
                    <div><div className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">1. Nettogewicht (Summe der Einzel-Nettos)</div><div className="pl-2 border-l-2 border-blue-200">Netto1 + Netto2 = {net.toLocaleString()} kg</div></div>
                ) : (
                    <div><div className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">1. Nettogewicht (Vorwerfbar)</div><div className="pl-2 border-l-2 border-blue-200">{actual.toLocaleString()} - {tolerance} = {net.toLocaleString()} kg</div></div>
                )}
                <div><div className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">2. Differenz zum zGM</div><div className="pl-2 border-l-2 border-blue-200">{net.toLocaleString()} - {allowed.toLocaleString()} = {diff.toLocaleString()} kg</div></div>
                <div><div className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">3. Prozentuale Überladung</div><div className="pl-2 border-l-2 border-blue-200">({diff.toLocaleString()} / {allowed.toLocaleString()}) · 100 = {percent.toFixed(2)} %</div></div>
            </div>
        </div>
    </CalculationToggle>
    );
};

const InputWithIcon = ({ icon: Icon, label, value, onChange, placeholder, type="number", disabled=false, onBlur }) => (
  <div className="relative group">
    <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1 transition-colors group-focus-within:text-indigo-500">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors"><Icon className="h-5 w-5" /></div>
      <input type={type} inputMode={type === 'number' ? 'decimal' : 'text'} className={`block w-full pl-10 pr-3 py-2.5 text-base border rounded-xl transition-all shadow-sm ${disabled ? 'bg-slate-100 border-slate-200 text-slate-400' : 'bg-white border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-700 font-medium'}`} placeholder={placeholder} value={value} onChange={onChange} onBlur={onBlur} disabled={disabled} />
    </div>
  </div>
);

// Einheitliches Design für BKat-Einträge & Tatbestände
const BkatRow = ({ title, fines }) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2.5 border-b border-slate-200/60 last:border-0 gap-2">
        <span className="text-xs font-bold text-slate-700 leading-tight flex-1">{title}</span>
        <div className="flex flex-row flex-wrap gap-1.5 shrink-0">
            {fines.map((fine, idx) => (
                <div key={idx} className="flex flex-col bg-white border border-slate-200 text-slate-600 rounded shadow-sm overflow-hidden">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono px-2 py-1">
                        {fine.role && <span className="font-bold text-slate-400 uppercase">{fine.role}</span>}
                        <span>{fine.tbnr}</span>
                        <span>➔ <strong className={`${fine.cost === 'Straftat' ? 'text-purple-600' : 'text-red-600'}`}>{fine.cost}</strong></span>
                        {fine.points && fine.points !== '' && fine.points !== '-' && (
                            <span className="text-[9px] font-bold text-amber-500 uppercase ml-0.5">{fine.points}</span>
                        )}
                    </div>
                    {fine.note && (
                        <div className="bg-slate-50 px-2 py-1 text-[9px] text-slate-500 border-t border-slate-100 leading-tight max-w-[200px] whitespace-normal">
                            {fine.note}
                        </div>
                    )}
                </div>
            ))}
        </div>
    </div>
);

const useDateTime = () => {
  const [dateTime, setDateTime] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setDateTime(now.toLocaleString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' Uhr');
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);
  return dateTime;
};

const AnglePictogram = ({ highlight }) => (
    <svg viewBox="0 0 100 120" className="w-full h-32 mt-2 bg-white rounded-lg border border-indigo-100 p-2 shadow-inner print-safe">
        <defs>
            <marker id={`arrow-${highlight}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <polygon points="0 0, 6 3, 0 6" fill="#ef4444" />
            </marker>
            <marker id={`arrowRev-${highlight}`} markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto">
                <polygon points="6 0, 0 3, 6 6" fill="#ef4444" />
            </marker>
        </defs>
        <line x1="85" y1="10" x2="85" y2="110" stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" />
        <text x="94" y="60" transform="rotate(90 94 60)" textAnchor="middle" className="text-[6px] fill-slate-400 font-bold uppercase">Fahrzeugseite</text>

        <rect x="10" y="20" width="35" height="40" rx="2" fill="#fcd34d" stroke="#f59e0b" strokeWidth="2" />
        <text x="27" y="42" textAnchor="middle" className="text-[7px] fill-amber-800 font-bold">LADUNG</text>

        <circle cx="45" cy="60" r="2.5" fill="#f59e0b" />
        <circle cx="85" cy="100" r="2.5" fill="#94a3b8" />

        <line x1="45" y1="60" x2="85" y2="100" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" />

        <line x1="45" y1="60" x2="85" y2="60" stroke={highlight === 'Y' ? '#ef4444' : '#cbd5e1'} strokeWidth={highlight === 'Y' ? 2 : 1} strokeDasharray={highlight === 'Y' ? "none" : "2 2"} markerEnd={highlight === 'Y' ? `url(#arrow-${highlight})` : "none"} markerStart={highlight === 'Y' ? `url(#arrowRev-${highlight})` : "none"} />
        <line x1="85" y1="60" x2="85" y2="100" stroke={highlight === 'X' ? '#ef4444' : '#cbd5e1'} strokeWidth={highlight === 'X' ? 2 : 1} strokeDasharray={highlight === 'X' ? "none" : "2 2"} markerEnd={highlight === 'X' ? `url(#arrow-${highlight})` : "none"} markerStart={highlight === 'X' ? `url(#arrowRev-${highlight})` : "none"} />

        <path d="M85 85 A 15 15 0 0 0 74 89" fill="none" stroke="#4f46e5" strokeWidth="1" />
        <text x="79" y="83" className="text-[8px] fill-indigo-600 font-bold">β</text>

        {highlight === 'Y' && <text x="65" y="55" textAnchor="middle" className="text-[8px] fill-red-600 font-black">Y (Gegenkathete)</text>}
        {highlight === 'X' && <text x="78" y="80" transform="rotate(-90 78 80)" textAnchor="middle" className="text-[8px] fill-red-600 font-black">X (Ankathete)</text>}
    </svg>
);

// --- PKW TRANSPORTER HELPER COMPONENTS ---

const getRecommendedCarConfig = (car) => {
    const rec = { ...car, wheels: JSON.parse(JSON.stringify(car.wheels)) };
    const w = rec.weightClass;
    const a = rec.angle;
    
    const setWheels = (fl, fr, rl, rr) => {
        rec.wheels = { fl, fr, rl, rr };
    };

    if (rec.noChocks) {
        setWheels({ strap: true, chock: 'none' }, { strap: true, chock: 'none' }, { strap: true, chock: 'none' }, { strap: true, chock: 'none' });
        return rec;
    }

    if (rec.isLast || (w === '4500' && a === '10')) {
        // VB 5
        setWheels({ strap: true, chock: 'both' }, { strap: false, chock: 'none' }, { strap: true, chock: 'both' }, { strap: true, chock: 'both' });
        if (rec.orientation === 'backward') {
            setWheels({ strap: false, chock: 'none' }, { strap: true, chock: 'both' }, { strap: true, chock: 'both' }, { strap: true, chock: 'both' });
        }
        return rec;
    }

    if (w === '3000') {
        // Grundsätzlich VB 6 empfehlen für Fahrzeuge > 2.000 - 3.000 kg, unabhängig vom Winkel
        setWheels({ strap: true, chock: 'front' }, { strap: false, chock: 'none' }, { strap: true, chock: 'both' }, { strap: true, chock: 'both' });
        if (rec.orientation === 'backward') {
            // Spiegelverkehrt: 1 Rad in FR mit 1 Keil, BEIDE Räder gegen FR mit Gurt & 2 Keilen
            setWheels({ strap: false, chock: 'none' }, { strap: true, chock: 'front' }, { strap: true, chock: 'both' }, { strap: true, chock: 'both' });
        }
        return rec;
    }

    // 2000 kg - Default
    // Grundsätzlich VB 1 empfehlen für Fahrzeuge bis 2.000 kg, unabhängig vom Winkel
    setWheels({ strap: true, chock: 'front' }, { strap: false, chock: 'none' }, { strap: false, chock: 'none' }, { strap: true, chock: 'both' });
    if (rec.orientation === 'backward') {
        // VB 1 spiegelverkehrt (1 Rad in FR mit 1 Keil, 1 Rad diag. gegen FR mit 2 Keilen)
        setWheels({ strap: false, chock: 'none' }, { strap: true, chock: 'front' }, { strap: true, chock: 'both' }, { strap: false, chock: 'none' });
    }

    return rec;
};

const validateCarSecuring = (car) => {
    if (car.exactAngle != null && car.exactAngle > 25) {
        return { valid: false, msg: `Winkel zu steil (${car.exactAngle}°). Maximal ±25° zulässig.` };
    }

    const { fl, fr, rl, rr } = car.wheels;
    const w_fl = { strap: fl.strap, c: (fl.chock === 'both' || fl.chock === 'mulde') ? 2 : fl.chock === 'none' ? 0 : 1 };
    const w_fr = { strap: fr.strap, c: (fr.chock === 'both' || fr.chock === 'mulde') ? 2 : fr.chock === 'none' ? 0 : 1 };
    const w_rl = { strap: rl.strap, c: (rl.chock === 'both' || rl.chock === 'mulde') ? 2 : rl.chock === 'none' ? 0 : 1 };
    const w_rr = { strap: rr.strap, c: (rr.chock === 'both' || rr.chock === 'mulde') ? 2 : rr.chock === 'none' ? 0 : 1 };

    // Orientierungsunabhängige Prüfung: Wir definieren Achse 1 und Achse 2 anhand der Position auf dem LKW
    let axleDir = [w_fl, w_fr]; // Achse in Fahrtrichtung (vorne auf dem LKW)
    let axleOpp = [w_rl, w_rr]; // Achse gegen Fahrtrichtung (hinten auf dem LKW)

    // VB 1: 1 Gurt+Keil in FR, 1 Gurt+2 Keile (diagonal) gegen FR
    const isVB1 = (
        (axleDir[0].strap && axleDir[0].c >= 1 && axleOpp[1].strap && axleOpp[1].c >= 2) ||
        (axleDir[1].strap && axleDir[1].c >= 1 && axleOpp[0].strap && axleOpp[0].c >= 2)
    );

    // VB 2: Achse in FR (1 Keil). Achse gegen FR (2 Gurte + 1 Reifen beidseitig gekeilt).
    const isVB2 = (
        (axleDir[0].c >= 1 || axleDir[1].c >= 1) &&
        (axleOpp[0].strap && axleOpp[1].strap) &&
        (axleOpp[0].c >= 2 || axleOpp[1].c >= 2)
    );

    // VB 3: Achsweise gegen FR (beide Räder Gurt+2 Keile gegen FR)
    const isVB3 = (axleOpp[0].strap && axleOpp[0].c >= 2 && axleOpp[1].strap && axleOpp[1].c >= 2);

    // VB 4: Flacher Winkel (Alle 4 Räder mit Gurt gesichert, Keile nicht zwingend)
    const isVB4 = (axleDir[0].strap && axleDir[1].strap && axleOpp[0].strap && axleOpp[1].strap);

    // VB 5: Maximale Sicherung (An 3 Rädern jeweils Gurt + 2 Keile beidseitig)
    const wheelsVB5Count = [w_fl, w_fr, w_rl, w_rr].filter(w => w.strap && w.c >= 2).length;
    const isVB5 = wheelsVB5Count >= 3;

    // VB 6: Schwere PKW (1 Gurt+Keil in FR, beide Räder Gurt+2 Keile gegen FR)
    const isVB6 = ((axleDir[0].strap && axleDir[0].c >= 1) || (axleDir[1].strap && axleDir[1].c >= 1)) &&
                   (axleOpp[0].strap && axleOpp[0].c >= 2 && axleOpp[1].strap && axleOpp[1].c >= 2);

    const activeVBs = [];
    if (isVB1) activeVBs.push(1);
    if (isVB2) activeVBs.push(2);
    if (isVB3) activeVBs.push(3);
    if (isVB4) activeVBs.push(4);
    if (isVB5) activeVBs.push(5);
    if (isVB6) activeVBs.push(6);

    const allStrapped = w_fl.strap && w_fr.strap && w_rl.strap && w_rr.strap;

    if (car.noChocks) {
        if (car.weightClass === '2000') {
            if (allStrapped) return { valid: true, msg: "Sonderregel (Fußnote *): Keile durch weitere Gurte ersetzt (4 Gurte)." };
            return { valid: false, msg: "Ohne Keile müssen zwingend alle 4 Räder mit Gurten gesichert sein." };
        }
        return { valid: false, msg: "Sicherung gänzlich ohne Keile ist nur bei Fahrzeugen bis 2.000 kg zulässig." };
    }

    if (car.isLast) {
        if (car.weightClass === '4500') return { valid: false, msg: "Fahrzeuge > 3.000 kg am Ende des Zuges (Schwerpunkt hinten) laut Tabelle nicht definiert!" };
        if (isVB5) return { valid: true, msg: "Korrekt: Max. Sicherung (Schwerpunkt hinten) erfüllt (VB 5)." };
        return { valid: false, msg: "Schwerpunkt hinter letzter Achse: Zwingend mind. 3 Räder mit Gurt & 2 Keilen sichern (VB 5)!" };
    }

    const angle = car.angle || '25';
    
    const isVBAllowed = (vb) => {
        if (vb === 3 && car.orientation !== 'forward') return false;
        if (car.weightClass === '4500') {
            if (angle !== '10') return false;
            return vb === 5;
        }
        if (car.weightClass === '3000') {
            if (angle === '25') return vb === 6 || vb === 5;
            if (angle === '10_25') return vb === 3 || vb === 6 || vb === 5;
            if (angle === '10') return vb === 3 || vb === 6 || vb === 5; // Flacher Winkel = gleiche VBs wie 10_25 zulässig
        }
        if (car.weightClass === '2000') {
            // Ein stärkeres Verladebild deckt auch immer flachere Winkel ab
            if (angle === '25') return vb === 1 || vb === 5;
            if (angle === '10_25') return vb === 2 || vb === 3 || vb === 1 || vb === 5;
            if (angle === '10') return vb === 4 || vb === 2 || vb === 3 || vb === 1 || vb === 5;
        }
        return false;
    };

    const validVBs = activeVBs.filter(isVBAllowed);

    if (validVBs.length > 0) {
        const bestVb = Math.min(...validVBs); 
        return { valid: true, msg: `Korrekt gesichert (Anforderungen für VB ${bestVb} erfüllt).` };
    }

    if (activeVBs.includes(3) && car.orientation === 'backward') {
        return { valid: false, msg: "Verladebild 3 darf nicht bei rückwärts verladenen Fahrzeugen angewendet werden!" };
    }

    if (car.weightClass === '4500' && angle !== '10') return { valid: false, msg: "Gewicht >3.000kg: Anstellwinkel über/unter 10° unzulässig!" };
    
    if (allStrapped && !car.noChocks) {
        return { valid: true, msg: "Übersicherung (4 Gurte) erkannt. Grundsätzlich okay." };
    }

    return { valid: false, msg: "Sicherung unzureichend für Gewicht/Winkel (Kein zulässiges Verladebild erreicht)." };
};

const PkwWheelConfig = ({ label, wheelData, onChange }) => (
    <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-200 flex flex-col gap-1.5">
        <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider text-center">{label}</span>
        
        <div className="flex gap-1">
            <button 
                onClick={() => onChange({ ...wheelData, strap: !wheelData.strap })}
                className={`flex-1 py-1 rounded-md text-[9px] font-bold transition-all border ${wheelData.strap ? 'bg-blue-500 text-white border-blue-600 shadow-sm' : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-100'}`}
            >
                {wheelData.strap ? 'Gurt aktiv' : 'Kein Gurt'}
            </button>

            <select 
                value={wheelData.chock}
                onChange={(e) => onChange({ ...wheelData, chock: e.target.value })}
                className={`flex-1 w-full text-[9px] font-bold py-1 px-0.5 rounded-md border focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors appearance-none text-center ${wheelData.chock !== 'none' ? 'bg-yellow-200 border-yellow-400 text-yellow-900 shadow-sm' : 'bg-white border-slate-200 text-slate-500'}`}
            >
                <option value="none">Kein Keil</option>
                <option value="front">Vorne</option>
                <option value="back">Hinten</option>
                <option value="both">Beidseitig</option>
                <option value="mulde">Mulde</option>
            </select>
        </div>
    </div>
);

const PkwCarEditor = ({ car, index, onUpdate, onRemove, onMeasureAngle }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const updateWheel = (wheelId, data) => {
        onUpdate({ ...car, wheels: { ...car.wheels, [wheelId]: data } });
    };

    const isConfigComplete = car.weightClass !== '' && car.angle !== '' && car.orientation !== '';
    
    const validation = isConfigComplete 
        ? validateCarSecuring(car) 
        : { valid: false, msg: "Bitte Gewicht, Winkel und Richtung angeben." };

    return (
        <div className={`bg-white rounded-xl shadow-sm border-2 mb-2 transition-all duration-300 ${!isConfigComplete ? 'border-slate-200' : validation.valid ? 'border-emerald-300' : 'border-red-200'} ${isExpanded ? 'p-2.5' : 'p-0'}`}>
            
            {/* HEADER (Clickable) */}
            <div 
                className={`flex justify-between items-center cursor-pointer select-none transition-colors ${isExpanded ? 'mb-2 pb-1.5 border-b border-slate-100' : 'p-2.5 rounded-xl hover:bg-slate-50'}`}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-2 overflow-hidden">
                    {/* Einklappsymbol jetzt ganz links, weit weg vom Löschen-Button */}
                    <div className="text-slate-400 shrink-0">
                        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </div>
                    <div className={`w-6 h-6 shrink-0 rounded-full text-white flex items-center justify-center text-xs font-black transition-colors ${!isConfigComplete ? 'bg-slate-400 shadow-slate-200' : validation.valid ? 'bg-emerald-500 shadow-emerald-200' : 'bg-red-500 shadow-red-200'} shadow-sm`}>
                        {!isConfigComplete ? index + 1 : validation.valid ? <CheckCircle className="w-4 h-4" /> : index + 1}
                    </div>
                    <div className="flex flex-col truncate">
                        <span className="font-bold text-slate-700 uppercase tracking-wide text-[11px] truncate">
                            PKW {index + 1} {isExpanded ? '' : <span className="text-slate-400 font-medium ml-1">• {!isConfigComplete ? 'Eingaben unvollständig' : `${car.weightClass === '2000' ? '≤ 2t' : car.weightClass === '3000' ? '> 2-3t' : '> 3-4,5t'} • ${car.exactAngle != null ? car.exactAngle + '°' : (car.angle === '25' ? '±25°' : car.angle === '10_25' ? '+10°/-25°' : '±10°')} • ${car.orientation === 'forward' ? 'Vorwärts' : 'Rückwärts'}`}</span>}
                        </span>
                        {!isExpanded && isConfigComplete && !validation.valid && <span className="text-[9px] text-red-500 font-bold truncate">Fehlerhafte Sicherung!</span>}
                    </div>
                </div>
                
                {/* Löschen-Button bleibt ganz rechts isoliert */}
                <div className="flex items-center shrink-0 ml-2">
                    <button 
                        onClick={(e) => { e.stopPropagation(); onRemove(); }} 
                        className="text-red-400 hover:text-red-600 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-colors"
                        title="Fahrzeug löschen"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* CONTENT (Collapsible) */}
            {isExpanded && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-200">

                    {/* Compact Toolbar */}
                    <div className="flex flex-col gap-1.5 mb-2">
                        <div className="grid grid-cols-3 gap-1">
                            <select 
                                value={car.weightClass} 
                                onChange={(e) => onUpdate({ ...car, weightClass: e.target.value })}
                                className={`w-full border rounded-md py-1.5 text-[9px] font-bold focus:ring-1 focus:ring-indigo-500 outline-none text-center appearance-none truncate ${car.weightClass === '' ? 'bg-amber-50 border-amber-300 text-amber-800' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
                            >
                                <option value="" disabled>Gewicht?</option>
                                <option value="2000">0 - 2.000 kg</option>
                                <option value="3000">&gt; 2.000 - 3.000 kg</option>
                                <option value="4500">&gt; 3.000 - 4.500 kg</option>
                            </select>
                            <div className="flex gap-0.5">
                                <select 
                                    value={car.angle} 
                                    onChange={(e) => onUpdate({ ...car, angle: e.target.value, exactAngle: null })}
                                    className={`w-full border rounded-md py-1.5 text-[9px] font-bold focus:ring-1 focus:ring-indigo-500 outline-none text-center appearance-none truncate ${car.angle === '' ? 'bg-amber-50 border-amber-300 text-amber-800' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
                                >
                                    <option value="" disabled>Winkel?</option>
                                    <option value="25">Winkel ±25°</option>
                                    <option value="10_25">Winkel +10°/-25°</option>
                                    <option value="10">Winkel ±10°</option>
                                </select>
                                <button 
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); onMeasureAngle(); }}
                                    className={`rounded-md px-1.5 flex items-center justify-center active:scale-95 transition-all border shrink-0 ${car.exactAngle != null ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm' : 'bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-100'}`}
                                    title="Winkel über Sensor messen"
                                >
                                    {car.exactAngle != null ? (
                                        <span className="text-[9px] font-black w-4 text-center">{car.exactAngle}°</span>
                                    ) : (
                                        <SpiritLevelIcon className="w-3.5 h-3.5" />
                                    )}
                                </button>
                            </div>
                            <select
                                value={car.orientation}
                                onChange={(e) => onUpdate({ ...car, orientation: e.target.value })}
                                className={`w-full border rounded-md py-1.5 text-[9px] font-bold focus:ring-1 focus:ring-indigo-500 outline-none text-center appearance-none truncate ${car.orientation === '' ? 'bg-amber-50 border-amber-300 text-amber-800' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
                            >
                                <option value="" disabled>Richtung?</option>
                                <option value="forward">Vorwärts</option>
                                <option value="backward">Rückwärts</option>
                            </select>
                        </div>
                        {isConfigComplete && (
                            <div className="grid grid-cols-2 gap-1 animate-in fade-in slide-in-from-top-2 duration-300">
                                <button
                                    onClick={() => onUpdate({ ...car, isLast: !car.isLast })}
                                    className={`w-full py-1.5 px-0.5 flex items-center justify-center text-[9px] font-bold rounded-md transition-all border truncate ${car.isLast ? 'bg-amber-100 text-amber-800 border-amber-300 shadow-sm' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
                                    title="Masseschwerpunkt hinter der letzten Achse des Transportfahrzeugs/Anhängers"
                                >
                                    Letztes Fahrzeug auf Ladefläche
                                </button>
                                <button
                                    onClick={() => onUpdate({ ...car, noChocks: !car.noChocks })}
                                    className={`w-full py-1.5 px-0.5 flex items-center justify-center text-[9px] font-bold rounded-md transition-all border truncate ${car.noChocks ? 'bg-red-100 text-red-800 border-red-300 shadow-sm' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
                                >
                                    Keine Keile möglich
                                </button>
                            </div>
                        )}
                    </div>

                    {isConfigComplete ? (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                            {/* Wheels 2x2 Grid */}
                            <div className="grid grid-cols-2 gap-1.5 mb-2">
                                <PkwWheelConfig label="Vorne Links" wheelData={car.wheels.fl} onChange={(d) => updateWheel('fl', d)} />
                                <PkwWheelConfig label="Vorne Rechts" wheelData={car.wheels.fr} onChange={(d) => updateWheel('fr', d)} />
                                <PkwWheelConfig label="Hinten Links" wheelData={car.wheels.rl} onChange={(d) => updateWheel('rl', d)} />
                                <PkwWheelConfig label="Hinten Rechts" wheelData={car.wheels.rr} onChange={(d) => updateWheel('rr', d)} />
                            </div>

                            {/* Validation */}
                            <div className={`p-1.5 rounded-lg text-[9px] leading-tight font-bold flex items-center gap-1.5 ${validation.valid ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                                {validation.valid ? <CheckCircle className="w-3.5 h-3.5 shrink-0" /> : <AlertTriangle className="w-3.5 h-3.5 shrink-0" />}
                                <span>{validation.msg}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg text-center mt-2 animate-in fade-in duration-300">
                            <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wide">
                                Bitte Gewicht, Winkel und Richtung wählen, um die Sicherung einzugeben.
                            </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const SvgPkwTransporter = ({ deckName, cars, showOrientation = false }) => {
    const carHeight = 130;
    const padding = 20;
    const svgHeight = Math.max(200, cars.length * carHeight + 80);

    return (
        <div 
            className="flex justify-center bg-white p-4 rounded-xl border border-slate-200 shadow-inner mb-6"
            style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
        >
            <svg viewBox={`0 0 130 ${svgHeight}`} className="w-full max-w-[220px] h-auto font-sans print-safe" style={{ overflow: 'visible' }}>
                {/* Deck Title */}
                <text x="65" y="15" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#334155" className="uppercase tracking-widest">{deckName}</text>
                
                {/* Fahrtrichtung Indicator */}
                <g transform="translate(5, 25)">
                    <rect x="0" y="0" width="120" height="30" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" rx="2" strokeDasharray="2 2" />
                    <path d="M55 18 L60 8 L65 18" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <line x1="60" y1="8" x2="60" y2="22" stroke="#64748b" strokeWidth="2" />
                    <text x="60" y="27" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#64748b" className="uppercase tracking-widest">Fahrtrichtung</text>
                </g>

                {/* Truck Bed Outline */}
                <rect x="5" y="60" width="120" height={Math.max(100, cars.length * carHeight + 10)} fill="#ffffff" stroke="#1e293b" strokeWidth="1.5" />

                {/* Render Cars */}
                {cars.map((car, idx) => {
                    const yOffset = 70 + (idx * carHeight);

                    const renderWheelFeatures = (x, y, data, noChocks) => (
                        <g transform={`translate(${x}, ${y})`}>
                            <rect x="0" y="0" width="10" height="25" fill="#0f172a" rx="1" />
                            {!noChocks && data.chock === 'mulde' && <path d="M-4 -2 L-4 27 L14 27 L14 -2" fill="none" stroke="#94a3b8" strokeWidth="2" />}
                            {!noChocks && (data.chock === 'front' || data.chock === 'both') && <line x1="-6" y1="-2" x2="16" y2="-2" stroke="#fde047" strokeWidth="2.5" />}
                            {!noChocks && (data.chock === 'back' || data.chock === 'both') && <line x1="-6" y1="27" x2="16" y2="27" stroke="#fde047" strokeWidth="2.5" />}
                            {data.strap && <line x1="5" y1="-10" x2="5" y2="35" stroke="#3b82f6" strokeWidth="3" opacity="0.9" />}
                        </g>
                    );

                    return (
                        <g key={car.id} transform={`translate(15, ${yOffset})`}>
                            {/* Schwarzer Kasten ohne Windschutzscheibe / Richtungspfeile */}
                            <rect x="25" y="10" width="50" height="90" fill="#1e293b" rx="2" />

                            {/* Optionale Fahrtrichtungsanzeige auf dem PKW */}
                            {showOrientation && car.orientation === 'forward' && (
                                <path d="M50 75 L50 35 M42 45 L50 35 L58 45" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            )}
                            {showOrientation && car.orientation === 'backward' && (
                                <path d="M50 35 L50 75 M42 65 L50 75 L58 65" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            )}

                            {/* Wheels */}
                            {renderWheelFeatures(8, 10, car.wheels.fl, car.noChocks)}
                            {renderWheelFeatures(82, 10, car.wheels.fr, car.noChocks)}
                            {renderWheelFeatures(8, 65, car.wheels.rl, car.noChocks)}
                            {renderWheelFeatures(82, 65, car.wheels.rr, car.noChocks)}
                        </g>
                    );
                })}

                {/* Empty State Message */}
                {cars.length === 0 && (
                     <text x="65" y="110" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#cbd5e1">Keine Fahrzeuge</text>
                )}
            </svg>
        </div>
    );
};

// --- ANGLE MEASUREMENT MODAL ---
const AngleMeasureModal = ({ isOpen, onClose, onApply, activeField }) => {
    const [step, setStep] = useState(1); 
    const referenceBetaRef = useRef(null); 
    const [currentBeta, setCurrentBeta] = useState(0);
    const [measuredAngle, setMeasuredAngle] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        if (isOpen) { setStep(1); referenceBetaRef.current = null; setMeasuredAngle(0); setErrorMsg(''); }
    }, [isOpen]);

    const handleOrientation = (event) => {
        const beta = event.beta; 
        if (beta !== null) {
            setCurrentBeta(beta);
            if (referenceBetaRef.current !== null) {
                 let diff = Math.abs(beta - referenceBetaRef.current);
                 if (diff > 90) diff = 90;
                 setMeasuredAngle(Math.round(diff));
            }
        }
    };

    const requestAccess = async () => {
        if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
            try {
                const response = await DeviceOrientationEvent.requestPermission();
                if (response === 'granted') { window.addEventListener('deviceorientation', handleOrientation); setStep(2); }
                else { setErrorMsg('Zugriff auf Sensoren verweigert.'); }
            } catch (e) { setErrorMsg('Fehler beim Anfordern der Sensoren: ' + e.message); }
        } else { window.addEventListener('deviceorientation', handleOrientation); setStep(2); }
    };

    const handleZero = () => { referenceBetaRef.current = currentBeta; setMeasuredAngle(0); setStep(3); };
    const stopSensors = () => { window.removeEventListener('deviceorientation', handleOrientation); };
    const handleClose = () => { stopSensors(); onClose(); };
    const handleApply = () => { stopSensors(); onApply(measuredAngle); };

    const isPkwMode = activeField && activeField.startsWith('pkw_');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-sm rounded-2xl p-5 shadow-2xl">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
                     <h3 className="font-black text-slate-800 flex items-center gap-2"><SpiritLevelIcon className="w-5 h-5 text-indigo-600" />Winkelmesser</h3>
                     <button onClick={handleClose} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"><X className="w-4 h-4 text-slate-500" /></button>
                </div>
                {errorMsg && <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-bold mb-4 flex items-start gap-2"><AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />{errorMsg}</div>}
                <div className="min-h-[200px] flex flex-col justify-center">
                    {step === 1 && (
                        <div className="text-center space-y-4">
                            <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-indigo-600"><SpiritLevelIcon className="w-8 h-8" /></div>
                            <div><h4 className="font-bold text-slate-700 text-lg">Kalibrierung starten</h4><p className="text-slate-500 text-sm mt-1">Nutzung der Smartphone-Sensoren zur Messung.</p></div>
                            <button onClick={requestAccess} className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 active:scale-95 transition-all">Messung starten</button>
                        </div>
                    )}
                    {step === 2 && (
                          <div className="text-center space-y-6">
                             <div className="relative">
                                 <div className="w-full h-1 bg-slate-200 rounded absolute top-1/2 -translate-y-1/2"></div>
                                 <div className="w-full h-1 bg-indigo-500 rounded absolute top-1/2 -translate-y-1/2 transition-transform duration-300" style={{ transform: `rotate(${currentBeta}deg)` }}></div>
                                 <Smartphone className="w-12 h-12 text-slate-800 mx-auto relative z-10 bg-white p-1 rounded-lg border-2 border-slate-100" />
                             </div>
                             <div>
                                 <div className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wide mb-2">Wichtig: {isPkwMode ? 'Fahrbahn nullen' : 'Ladefläche nullen'}</div>
                                 <h4 className="font-bold text-slate-700 text-lg">Sensor Nullen</h4>
                                 <p className="text-slate-500 text-sm mt-2 leading-relaxed">Gerät flach auf den <strong>{isPkwMode ? 'Fahrbahnuntergrund' : 'Ladeboden'}</strong> bzw. waagerecht ausrichten, um die Neigung auszugleichen.</p>
                             </div>
                             <button onClick={handleZero} className="w-full py-3 bg-slate-800 text-white font-bold rounded-xl shadow-lg hover:bg-slate-700 active:scale-95 transition-all">Jetzt Nullen (Referenz)</button>
                          </div>
                    )}
                    {step === 3 && (
                        <div className="text-center space-y-6">
                            <div className="py-4"><span className="text-6xl font-black text-indigo-600 tracking-tighter tabular-nums">{measuredAngle}°</span><p className="text-xs font-bold text-slate-400 uppercase mt-1 tracking-wide">Echtzeit (Genau)</p></div>
                            <div><p className="text-slate-500 text-sm leading-relaxed">Gerät nun {isPkwMode ? <strong>auf die Ladefläche</strong> : <strong>entlang des Zurrgurts</strong>} auflegen.</p></div>
                            <button onClick={handleApply} className="w-full py-3 bg-emerald-500 text-white font-bold rounded-xl shadow-lg hover:bg-emerald-600 active:scale-95 transition-all flex items-center justify-center gap-2"><CheckCircle className="w-5 h-5" />Wert übernehmen</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};



function AgeCalculator() {
    const [birthDate, setBirthDate] = useState('');
    const [ageInfo, setAgeInfo] = useState(null);
    const dateTime = useDateTime();

    useEffect(() => {
        if (!birthDate) { setAgeInfo(null); return; }
        const today = new Date();
        const birth = new Date(birthDate);
        if (isNaN(birth.getTime())) return;
        let years = today.getFullYear() - birth.getFullYear();
        let months = today.getMonth() - birth.getMonth();
        let days = today.getDate() - birth.getDate();
        if (days < 0) { months--; const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0); days += prevMonth.getDate(); }
        if (months < 0) { years--; months += 12; }
        setAgeInfo({ years, months, days, birthDate: birth });
    }, [birthDate]);

    return (
        <div className="max-w-md mx-auto bg-slate-50 min-h-screen">
             <div className="bg-purple-600/95 backdrop-blur-md p-4 text-white flex items-center justify-between sticky top-0 z-20 shadow-lg shadow-purple-900/10 no-print">
                <div><h1 className="text-xl font-bold flex items-center gap-2 leading-tight tracking-tight"><Calendar className="w-6 h-6 shrink-0" />Altersrechner</h1><p className="text-purple-100 text-xs opacity-90 mt-0.5 font-mono flex items-center gap-1.5 ml-8"><Clock className="w-3 h-3" />{dateTime}</p></div>
                <HeaderLogo />
            </div>
            <div className="p-2 space-y-2 mt-4 no-print">
                 <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
                     <div className="flex items-center gap-2 mb-2 text-purple-700"><UserPlus className="w-5 h-5" /><span className="text-sm font-black uppercase tracking-wide">Personendaten</span></div>
                     <InputWithIcon icon={Calendar} label="Geburtsdatum" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
                 </div>
                 {ageInfo && (
                     <div className="space-y-3">
                         <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-4 text-center text-white shadow-xl">
                             <p className="text-sm font-bold opacity-70 uppercase tracking-wider mb-1">Berechnetes Alter</p>
                             <div className="text-6xl font-black tracking-tighter">{ageInfo.years} <span className="text-2xl font-medium opacity-80">Jahre</span></div>
                         </div>
                         <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center text-sm font-mono text-slate-600">
                             <span>Detailgenau:</span>
                             <span className="font-bold text-purple-700">{ageInfo.years} Jahre, {ageInfo.months} Monate, {ageInfo.days} Tage</span>
                         </div>
                     </div>
                 )}
            </div>
            <AppVersionFooter />
        </div>
    );
}

function SpeedCalculator() {
    const [mode, setMode] = useState('laser'); 
    const [location, setLocation] = useState('autobahn'); // NEU: 'igo' (Innerorts), 'ago' (Außerorts) oder 'autobahn' (Autobahn)
    const [vehicleType, setVehicleType] = useState('pkw'); 
    const [allowedSpeed, setAllowedSpeed] = useState('');
    const [measuredSpeedRaw, setMeasuredSpeedRaw] = useState('');
    const [followDistance, setFollowDistance] = useState('');
    const [followGap, setFollowGap] = useState('');
    const [result, setResult] = useState(null);
    const dateTime = useDateTime();

    const getViolation = (exceedance, type, loc, allowedSpeedVal) => {
        if (exceedance <= 0) return null;

        if (loc === 'igo') {
            if (allowedSpeedVal === '10') { // Verkehrsberuhigter Bereich
                if (exceedance <= 10) return { cost: '30 €', points: '-', ban: '-', id: '142130' };
                if (exceedance <= 15) return { cost: '50 €', points: '-', ban: '-', id: '142131' };
                if (exceedance <= 20) return { cost: '70 €', points: '-', ban: '-', id: '142629' };
                if (exceedance <= 25) return { cost: '115 €', points: '1', ban: '-', id: '142630'};
                if (exceedance <= 30) return { cost: '180 €', points: '1', ban: '-', id: '142631'};
                if (exceedance <= 40) return { cost: '260 €', points: '2', ban: '1 M', id: '142632'};
                if (exceedance <= 50) return { cost: '400 €', points: '2', ban: '1 M', id: '142633'};
                if (exceedance <= 60) return { cost: '560 €', points: '2', ban: '2 M', id: '142634'};
                if (exceedance <= 70) return { cost: '700 €', points: '2', ban: '3 M', id: '142635'};
                return { cost: '800 €', points: '2', ban: '3 M', id: '142636', };
            }
            
            // Normal innerorts
            if (exceedance <= 10) return { cost: '30 €', points: '-', ban: '-', id: '141236' };
            if (exceedance <= 15) return { cost: '50 €', points: '-', ban: '-', id: '141237' };
            if (exceedance <= 20) return { cost: '70 €', points: '-', ban: '-', id: '141711' };
            if (exceedance <= 25) return { cost: '115 €', points: '1', ban: '-', id: '141712'};
            if (exceedance <= 30) return { cost: '180 €', points: '1', ban: '-', id: '141713'};
            if (exceedance <= 40) return { cost: '260 €', points: '2', ban: '1 M', id: '141714'};
            if (exceedance <= 50) return { cost: '400 €', points: '2', ban: '1 M', id: '141715'};
            if (exceedance <= 60) return { cost: '560 €', points: '2', ban: '2 M', id: '141716'};
            if (exceedance <= 70) return { cost: '700 €', points: '2', ban: '3 M', id: '141717'};
            return { cost: '800 €', points: '2', ban: '3 M', id: '141718'};
        }

        if (exceedance < 16) return null;
        if (type === 'pkw_trailer') {
            if (loc !== 'autobahn') return null; // NEU: PKW mit Anhänger nur auf Autobahn
            if (exceedance <= 20) return { cost: '140 €', points: '1', ban: '-', id: '118632'};
            if (exceedance <= 25) return { cost: '150 €', points: '1', ban: '-', id: '118633'};
            if (exceedance <= 30) return { cost: '175 €', points: '1', ban: '-', id: '118634'};
            if (exceedance <= 40) return { cost: '255 €', points: '2', ban: '1 M', id: '118635'};
            if (exceedance <= 50) return { cost: '480 €', points: '2', ban: '1 M', id: '118636'};
            if (exceedance <= 60) return { cost: '600 €', points: '2', ban: '2 M', id: '118637'}; 
            if (exceedance <= 70) return { cost: '700 €', points: '2', ban: '3 M', id: '118638'}; 
            return { cost: '800 €', points: '2', ban: '3 M', id: '118639'}; 
        }
        
        // Für PKW (loc ist hier 'ago' oder 'autobahn')
        if (exceedance <= 20) return { cost: '60 €', points: '-', ban: '-', id: '141720' };
        if (exceedance <= 25) return { cost: '100 €', points: '1', ban: '-', id: '141721'};
        if (exceedance <= 30) return { cost: '150 €', points: '1', ban: '-', id: '141722'};
        if (exceedance <= 40) return { cost: '200 €', points: '1', ban: '-', id: '141723'};
        if (exceedance <= 50) return { cost: '320 €', points: '2', ban: '1 M', id: '141724'};
        if (exceedance <= 60) return { cost: '480 €', points: '2', ban: '1 M', id: '141725'};
        if (exceedance <= 70) return { cost: '600 €', points: '2', ban: '2 M', id: '141726'};
        return { cost: '700 €', points: '2', ban: '3 M', id: '141727'};
    };

    useEffect(() => {
        const measured = parseFloat(measuredSpeedRaw);
        const allowed = parseFloat(allowedSpeed);
        if (!measured || !allowed) { setResult(null); return; }
        let netSpeed = 0, tolerance = 0, formula = '';
        if (mode === 'laser') {
            if (measured <= 100) tolerance = 3; else if (measured <= 133) tolerance = 4; else if (measured <= 166) tolerance = 5; else if (measured <= 206) tolerance = 6; else tolerance = 7;
            netSpeed = measured - tolerance;
            formula = `${measured} - ${tolerance} (Tol.) = ${netSpeed}`;
        } else {
            const step1 = measured - (measured * 0.10); const step2 = step1 - 4; const step3 = step2 - (step2 * 0.03);
            netSpeed = Math.floor(step3); tolerance = measured - netSpeed; 
            formula = `((${measured} - 10%) - 4) - 3% = ${netSpeed.toFixed(0)}`;
        }
        const exceedance = Math.max(0, netSpeed - allowed);
        const violation = getViolation(exceedance, vehicleType, location, allowedSpeed);
        
        // Gauge Logik (Für den visuellen Tacho)
        const gaugeMax = allowed * 1.6; // Skala geht bis 160% der erlaubten Geschwindigkeit
        const gaugePercentNet = Math.min(100, (netSpeed / gaugeMax) * 100);
        const gaugePercentAllowed = Math.min(100, (allowed / gaugeMax) * 100);
        
        setResult({ netSpeed: Math.round(netSpeed), tolerance: tolerance, exceedance: Math.round(exceedance), violation: violation, formula: formula, gaugePercentNet, gaugePercentAllowed });
    }, [mode, location, allowedSpeed, measuredSpeedRaw, vehicleType]);

    return (
        <div className="max-w-md mx-auto bg-slate-50 min-h-screen">
            <div className="bg-amber-600/95 backdrop-blur-md p-4 text-white flex items-center justify-between sticky top-0 z-20 shadow-lg shadow-amber-900/10 no-print">
                <div><h1 className="text-xl font-bold flex items-center gap-2 leading-tight tracking-tight"><Gauge className="w-6 h-6 shrink-0" />Geschwindigkeitsrechner</h1><p className="text-amber-100 text-xs opacity-90 mt-0.5 font-mono flex items-center gap-1.5 ml-8"><Clock className="w-3 h-3" />{dateTime}</p></div>
                <HeaderLogo />
            </div>

            <div className="p-2 space-y-2 no-print">
                <div className="bg-white p-1 rounded-xl flex shadow-sm border border-slate-100 mb-2">
                    <button onClick={() => setMode('laser')} className={`flex-1 py-2 text-xs font-bold uppercase rounded-lg transition-all ${mode === 'laser' ? 'bg-amber-100 text-amber-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>Laser</button>
                    <button onClick={() => { setMode('follow'); setVehicleType('pkw'); }} className={`flex-1 py-2 text-xs font-bold uppercase rounded-lg transition-all ${mode === 'follow' ? 'bg-amber-100 text-amber-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>Hinterherfahren</button>
                </div>

                <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
                    {mode === 'laser' && (
                        <div className="mb-4">
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Ort der Messung</label>
                            <div className="flex gap-2">
                                <button onClick={() => { setLocation('igo'); setAllowedSpeed(''); setVehicleType('pkw'); }} className={`flex-1 p-2 rounded-xl border-2 flex items-center justify-center gap-1 transition-all ${location === 'igo' ? 'border-amber-500 bg-amber-50 text-amber-700 shadow-sm' : 'border-slate-100 text-slate-400 hover:bg-slate-50'}`}><Home className="w-4 h-4" /><span className="text-[10px] font-bold">Innerorts</span></button>
                                <button onClick={() => { setLocation('ago'); setAllowedSpeed(''); setVehicleType('pkw'); }} className={`flex-1 p-2 rounded-xl border-2 flex items-center justify-center gap-1 transition-all ${location === 'ago' ? 'border-amber-500 bg-amber-50 text-amber-700 shadow-sm' : 'border-slate-100 text-slate-400 hover:bg-slate-50'}`}><Trees className="w-4 h-4" /><span className="text-[10px] font-bold">Außerorts</span></button>
                                <button onClick={() => { setLocation('autobahn'); setAllowedSpeed(''); }} className={`flex-1 p-2 rounded-xl border-2 flex items-center justify-center gap-1 transition-all ${location === 'autobahn' ? 'border-amber-500 bg-amber-50 text-amber-700 shadow-sm' : 'border-slate-100 text-slate-400 hover:bg-slate-50'}`}><AutobahnIcon className="w-4 h-4" /><span className="text-[10px] font-bold">Autobahn</span></button>
                            </div>
                        </div>
                    )}
                    
                    {location === 'autobahn' && mode !== 'follow' && (
                        <div className="mb-4">
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Fahrzeugtyp</label>
                            <div className="flex gap-2">
                                <button onClick={() => { setVehicleType('pkw'); if (allowedSpeed && !['60', '70', '80', '100', '120'].includes(allowedSpeed)) setAllowedSpeed(''); }} className={`flex-1 p-2 rounded-xl border-2 flex flex-col items-center gap-1 transition-all ${vehicleType === 'pkw' ? 'border-amber-500 bg-amber-50 text-amber-700 shadow-sm' : 'border-slate-100 text-slate-400 hover:bg-slate-50'}`}><Car className="w-6 h-6" /><span className="text-[10px] font-bold">PKW</span></button>
                                <button onClick={() => { setVehicleType('pkw_trailer'); if (allowedSpeed && !['80', '100'].includes(allowedSpeed)) setAllowedSpeed(''); }} className={`flex-1 p-2 rounded-xl border-2 flex flex-col items-center gap-1 transition-all ${vehicleType === 'pkw_trailer' ? 'border-amber-500 bg-amber-50 text-amber-700 shadow-sm' : 'border-slate-100 text-slate-400 hover:bg-slate-50'}`}><CarWithTrailerIcon className="w-8 h-8" /><span className="text-[10px] font-bold text-center">PKW mit<br/>Anhänger</span></button>
                            </div>
                        </div>
                    )}
                    <div className="space-y-4 mb-4">
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-0.5 ml-1">Zulässige Höchstgeschwindigkeit</label>
                        <div className="flex flex-wrap justify-center gap-2 px-1">
                            {(location === 'igo' ? ['VB', 20, 30, 40, 50] : location === 'ago' ? [30, 50, 60, 70, 80, 100] : (vehicleType === 'pkw_trailer' ? [80, 100] : [60, 70, 80, 100, 120])).map(v => (<TrafficSign key={v} value={v} selected={allowedSpeed == (v === 'VB' ? '10' : v)} onClick={() => setAllowedSpeed(v === 'VB' ? '10' : v.toString())} />))}
                        </div>
                    </div>
                    <div className="space-y-3">
                        <InputWithIcon icon={Gauge} label={mode === 'laser' ? "Gemessener Wert (Brutto)" : "Abgelesener Tacho-Wert"} value={measuredSpeedRaw} onChange={(e) => setMeasuredSpeedRaw(e.target.value)} placeholder="0" />
                        {mode === 'follow' && (
                            <>
                                <InputWithIcon icon={Ruler} label="Nachfahrstrecke (ca. Meter)" value={followDistance} onChange={(e) => setFollowDistance(e.target.value)} placeholder="z.B. 500" />
                                <InputWithIcon icon={Car} label="Abstand zum Betroffenen (von - bis in m)" type="text" value={followGap} onChange={(e) => setFollowGap(e.target.value)} placeholder="z.B. 50 - 80" />
                            </>
                        )}
                    </div>
                </div>

                {result && (
                    <div className="space-y-3">
                        <div className="bg-white border-2 border-amber-100 rounded-2xl p-4 shadow-xl relative overflow-hidden">
                            
                            {/* DYNAMISCHER TACHO (UX Upgrade) */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100">
                                <div className="absolute top-0 left-0 h-full bg-amber-500 transition-all duration-1000 ease-out" style={{ width: `${result.gaugePercentNet}%` }}></div>
                                <div className="absolute top-0 h-full w-1 bg-red-600 shadow-[0_0_5px_rgba(220,38,38,0.8)] z-10" style={{ left: `${result.gaugePercentAllowed}%` }}></div>
                            </div>

                            <div className="flex justify-between items-center mb-2 border-b border-slate-50 pb-2 mt-1">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Vorwerfbar</span>
                                <span className="text-3xl font-black text-amber-600">{result.netSpeed} <span className="text-sm text-slate-400">km/h</span></span>
                            </div>
                            <div className="bg-slate-50 rounded-lg p-2 mb-3 text-xs font-mono text-center text-slate-500 border border-slate-100">{result.formula}</div>
                            <div className="flex items-center justify-between bg-red-50 p-3 rounded-xl border border-red-100 mt-2">
                                <span className="text-xs font-bold text-red-400 uppercase">Überschreitung</span>
                                <span className="text-xl font-black text-red-600">+{result.exceedance} km/h</span>
                            </div>
                        </div>
                        {result.violation ? (
                            <div className="bg-slate-800 text-white p-4 rounded-2xl shadow-lg">
                                <div className="flex items-center gap-2 mb-4 border-b border-slate-700 pb-2"><Gavel className="w-5 h-5 text-amber-400" /><h3 className="font-bold uppercase tracking-wide text-sm">Folgen des Verstoßes</h3></div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><div className="text-[10px] text-slate-400 uppercase font-bold">Bußgeld</div><div className="text-2xl font-black text-amber-400">{result.violation.cost}</div></div>
                                    <div><div className="text-[10px] text-slate-400 uppercase font-bold">Punkte</div><div className="text-xl font-bold flex items-center gap-1.5">{result.violation.points} {result.violation.fap && <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded uppercase tracking-widest shadow-sm">FaP {result.violation.fap}</span>}</div></div>
                                    <div><div className="text-[10px] text-slate-400 uppercase font-bold">Fahrverbot</div><div className="text-xl font-bold">{result.violation.ban}</div></div>
                                    <div><div className="text-[10px] text-slate-400 uppercase font-bold">TBNR</div><div className="text-sm font-mono bg-slate-700 px-2 py-0.5 rounded inline-block mt-0.5">{result.violation.id}</div></div>
                                </div>
                            </div>
                        ) : (<div className="bg-green-50 text-green-700 p-3 rounded-xl text-center text-xs font-bold border border-green-200">{vehicleType === 'pkw_trailer' && location !== 'autobahn' ? 'Tatbestände für PKW mit Anhänger nur für Autobahn verfügbar' : (location === 'igo' ? 'Keine Maßnahmen im hinterlegten Bereich' : 'Keine Maßnahmen im hinterlegten Bereich (< 16 km/h)')}</div>)}
                    </div>
                )}
            </div>
            <AppVersionFooter />
        </div>
    );
}

function WoodCalculator({ onSwitch }) {
  const [vehicleType, setVehicleType] = useState('semi'); 
  const [allowedWeight, setAllowedWeight] = useState('');
  const [emptyWeight, setEmptyWeight] = useState('');
  const [tractorWeight, setTractorWeight] = useState('');
  const [trailerWeight, setTrailerWeight] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [length2, setLength2] = useState('');
  const [width2, setWidth2] = useState('');
  const [height2, setHeight2] = useState('');
  const [woodType, setWoodType] = useState('Akazie ganz frisch'); 
  const dateTime = useDateTime();

  useEffect(() => {
    const tractor = parseFloat(tractorWeight) || 0;
    const trailer = parseFloat(trailerWeight) || 0;
    const total = tractor + trailer;
    if (tractor > 0 || trailer > 0) setEmptyWeight(total > 0 ? total.toString() : '');
  }, [tractorWeight, trailerWeight]);

  const woodTypes = [
    { name: 'Akazie ganz frisch', density: 950 },
    { name: 'Akazie waldtrocken', density: 800 },
    { name: 'Akazie lufttrocken', density: 750 },
    { name: 'Akazie Darr-Gewicht', density: 700 },
    { name: 'Apfelbaum ganz frisch', density: 980 },
    { name: 'Apfelbaum waldtrocken', density: 830 },
    { name: 'Apfelbaum lufttrocken', density: 750 },
    { name: 'Apfelbaum Darr-Gewicht', density: 700 },
    { name: 'Aspe ganz frisch', density: 800 },
    { name: 'Aspe waldtrocken', density: 650 },
    { name: 'Aspe lufttrocken', density: 500 },
    { name: 'Aspe Darr-Gewicht', density: 400 },
    { name: 'Bergahorn ganz frisch', density: 950 },
    { name: 'Bergahorn waldtrocken', density: 800 },
    { name: 'Bergahorn lufttrocken', density: 660 },
    { name: 'Bergahorn Darr-Gewicht', density: 600 },
    { name: 'Birke ganz frisch', density: 900 },
    { name: 'Birke waldtrocken', density: 800 },
    { name: 'Birke lufttrocken', density: 650 },
    { name: 'Birke Darr-Gewicht', density: 575 },
    { name: 'Birnbaum ganz frisch', density: 950 },
    { name: 'Birnbaum waldtrocken', density: 820 },
    { name: 'Birnbaum lufttrocken', density: 750 },
    { name: 'Birnbaum Darr-Gewicht', density: 700 },
    { name: 'Edelkastanie ganz frisch', density: 850 },
    { name: 'Edelkastanie waldtrocken', density: 700 },
    { name: 'Edelkastanie lufttrocken', density: 625 },
    { name: 'Edelkastanie Darr-Gewicht', density: 575 },
    { name: 'Eibe ganz frisch', density: 1000 },
    { name: 'Eibe waldtrocken', density: 850 },
    { name: 'Eibe lufttrocken', density: 750 },
    { name: 'Eibe Darr-Gewicht', density: 650 },
    { name: 'Eiche ganz frisch', density: 1150 },
    { name: 'Eiche waldtrocken', density: 1000 },
    { name: 'Eiche lufttrocken', density: 800 },
    { name: 'Eiche Darr-Gewicht', density: 680 },
    { name: 'Esche ganz frisch', density: 900 },
    { name: 'Esche waldtrocken', density: 800 },
    { name: 'Esche lufttrocken', density: 725 },
    { name: 'Esche Darr-Gewicht', density: 650 },
    { name: 'Feldahorn ganz frisch', density: 1000 },
    { name: 'Feldahorn waldtrocken', density: 850 },
    { name: 'Feldahorn lufttrocken', density: 725 },
    { name: 'Feldahorn Darr-Gewicht', density: 650 },
    { name: 'Fichte ganz frisch', density: 800 },
    { name: 'Fichte waldtrocken', density: 675 },
    { name: 'Fichte lufttrocken', density: 500 },
    { name: 'Fichte Darr-Gewicht', density: 420 },
    { name: 'Gemeine Kiefer ganz frisch', density: 800 },
    { name: 'Gemeine Kiefer waldtrocken', density: 680 },
    { name: 'Gemeine Kiefer lufttrocken', density: 575 },
    { name: 'Gemeine Kiefer Darr-Gewicht', density: 500 },
    { name: 'Kirsche ganz frisch', density: 800 },
    { name: 'Kirsche waldtrocken', density: 675 },
    { name: 'Kirsche lufttrocken', density: 600 },
    { name: 'Kirsche Darr-Gewicht', density: 560 },
    { name: 'Lärche ganz frisch', density: 875 },
    { name: 'Lärche waldtrocken', density: 750 },
    { name: 'Lärche lufttrocken', density: 600 },
    { name: 'Lärche Darr-Gewicht', density: 560 },
    { name: 'Linde ganz frisch', density: 750 },
    { name: 'Linde waldtrocken', density: 600 },
    { name: 'Linde lufttrocken', density: 450 },
    { name: 'Linde Darr-Gewicht', density: 400 },
    { name: 'Nussbaum ganz frisch', density: 850 },
    { name: 'Nussbaum waldtrocken', density: 700 },
    { name: 'Nussbaum lufttrocken', density: 675 },
    { name: 'Nussbaum Darr-Gewicht', density: 625 },
    { name: 'Pappel ganz frisch', density: 750 },
    { name: 'Pappel waldtrocken', density: 600 },
    { name: 'Pappel lufttrocken', density: 475 },
    { name: 'Pappel Darr-Gewicht', density: 400 },
    { name: 'Platane ganz frisch', density: 850 },
    { name: 'Platane waldtrocken', density: 680 },
    { name: 'Platane lufttrocken', density: 625 },
    { name: 'Platane Darr-Gewicht', density: 550 },
    { name: 'Rosskastanie ganz frisch', density: 750 },
    { name: 'Rosskastanie waldtrocken', density: 600 },
    { name: 'Rosskastanie lufttrocken', density: 550 },
    { name: 'Rosskastanie Darr-Gewicht', density: 500 },
    { name: 'Rotbuche ganz frisch', density: 1100 },
    { name: 'Rotbuche waldtrocken', density: 900 },
    { name: 'Rotbuche lufttrocken', density: 750 },
    { name: 'Rotbuche Darr-Gewicht', density: 700 },
    { name: 'Roterle ganz frisch', density: 850 },
    { name: 'Roterle waldtrocken', density: 700 },
    { name: 'Roterle lufttrocken', density: 550 },
    { name: 'Roterle Darr-Gewicht', density: 475 },
    { name: 'Schwarzkiefer ganz frisch', density: 1000 },
    { name: 'Schwarzkiefer waldtrocken', density: 750 },
    { name: 'Schwarzkiefer lufttrocken', density: 650 },
    { name: 'Schwarzkiefer Darr-Gewicht', density: 600 },
    { name: 'Spitzahorn ganz frisch', density: 950 },
    { name: 'Spitzahorn waldtrocken', density: 820 },
    { name: 'Spitzahorn lufttrocken', density: 670 },
    { name: 'Spitzahorn Darr-Gewicht', density: 625 },
    { name: 'Tanne ganz frisch', density: 900 },
    { name: 'Tanne waldtrocken', density: 700 },
    { name: 'Tanne lufttrocken', density: 490 },
    { name: 'Tanne Darr-Gewicht', density: 410 },
    { name: 'Ulme ganz frisch', density: 900 },
    { name: 'Ulme waldtrocken', density: 750 },
    { name: 'Ulme lufttrocken', density: 675 },
    { name: 'Ulme Darr-Gewicht', density: 600 },
    { name: 'Weide ganz frisch', density: 800 },
    { name: 'Weide waldtrocken', density: 650 },
    { name: 'Weide lufttrocken', density: 475 },
    { name: 'Weide Darr-Gewicht', density: 400 },
    { name: 'Weym.-Kiefer ganz frisch', density: 720 },
    { name: 'Weym.-Kiefer waldtrocken', density: 475 },
    { name: 'Weym.-Kiefer lufttrocken', density: 400 },
    { name: 'Weym.-Kiefer Darr-Gewicht', density: 375 },
    { name: 'Weißbuche ganz frisch', density: 1000 },
    { name: 'Weißbuche waldtrocken', density: 850 },
    { name: 'Weißbuche lufttrocken', density: 820 },
    { name: 'Weißbuche Darr-Gewicht', density: 750 },
    { name: 'Weißerle ganz frisch', density: 900 },
    { name: 'Weißerle waldtrocken', density: 700 },
    { name: 'Weißerle lufttrocken', density: 550 },
    { name: 'Weißerle Darr-Gewicht', density: 500 }
  ];

  const vol1 = (parseFloat(length) || 0) * (parseFloat(width) || 0) * (parseFloat(height) || 0);
  const vol2 = vehicleType === 'train' ? (parseFloat(length2) || 0) * (parseFloat(width2) || 0) * (parseFloat(height2) || 0) : 0;
  const totalVol = vol1 + vol2;
  const solidFactor = 0.70;
  const solidVolume = totalVol * solidFactor;
  const selectedWood = woodTypes.find(w => w.name === woodType);
  const currentDensity = selectedWood ? selectedWood.density : 800;
  const rawWeight = solidVolume * currentDensity;
  const maxWeight = parseFloat(allowedWeight) || 0;
  const calculatedLoadWeight = (!maxWeight || maxWeight <= 3500) ? Math.floor(rawWeight) : Math.ceil(rawWeight);
  const totalWeight = (parseFloat(emptyWeight) || 0) + calculatedLoadWeight;
  const difference = totalWeight - maxWeight;
  const isOverloaded = maxWeight > 0 && difference > 0;

  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen">
      
      {/* PRINT VIEW ONLY */}
      <div className="print-only print-container">
        <h1 className="print-title">Holzgewichts-Protokoll</h1>
        <div className="print-meta">Erstellt am: {dateTime}</div>

        <h2 className="print-section">Eingabeparameter</h2>
        <table className="print-table">
            <tbody>
                <tr><th>Fahrzeugtyp</th><td>{vehicleType === 'semi' ? 'Sattelzug' : 'LKW + Anhänger'}</td></tr>
                <tr><th>Holzart</th><td>{woodType}</td></tr>
                <tr><th>Dichte</th><td>{currentDensity} kg/m³</td></tr>
                <tr><th>Leergewicht (Zugm./LKW)</th><td>{tractorWeight || '0'} kg</td></tr>
                <tr><th>Leergewicht (Aufl./Anh.)</th><td>{trailerWeight || '0'} kg</td></tr>
                <tr><th>Zul. Gesamtgewicht</th><td>{allowedWeight || '0'} kg</td></tr>
            </tbody>
        </table>

        <h2 className="print-section">Abmessungen Ladung</h2>
        <table className="print-table">
            <thead>
                <tr><th>Einheit</th><th>Länge</th><th>Breite</th><th>Höhe</th><th>Volumen</th></tr>
            </thead>
            <tbody>
                <tr>
                    <td>Ladeeinheit 1</td>
                    <td>{length || 0} m</td>
                    <td>{width || 0} m</td>
                    <td>{height || 0} m</td>
                    <td>{vol1.toFixed(2)} m³</td>
                </tr>
                {vehicleType === 'train' && (
                <tr>
                    <td>Ladeeinheit 2</td>
                    <td>{length2 || 0} m</td>
                    <td>{width2 || 0} m</td>
                    <td>{height2 || 0} m</td>
                    <td>{vol2.toFixed(2)} m³</td>
                </tr>
                )}
            </tbody>
        </table>

        <h2 className="print-section">Berechnungsergebnisse</h2>
        <table className="print-table">
            <tbody>
                <tr><th>Raummaß Gesamt</th><td>{totalVol.toFixed(2)} m³</td></tr>
                <tr><th>Umrechnungsfaktor</th><td>{solidFactor.toFixed(2)}</td></tr>
                <tr><th>Festmeter</th><td>{solidVolume.toFixed(2)} m³</td></tr>
                <tr><th>Berechnetes Holzgewicht</th><td><strong>{calculatedLoadWeight.toLocaleString()} kg</strong></td></tr>
                <tr><th>Berechnetes Gesamtgewicht</th><td>{totalWeight.toLocaleString()} kg</td></tr>
                <tr><th>Differenz zu zGM</th><td>{difference > 0 ? <span className="print-warning">+{difference.toLocaleString()} kg (Verdacht auf Überladung)</span> : `${difference.toLocaleString()} kg (OK)`}</td></tr>
            </tbody>
        </table>
      </div>
      {/* END PRINT VIEW */}

      <div className="bg-emerald-600/95 backdrop-blur-md p-4 text-white flex items-center justify-between sticky top-0 z-20 shadow-lg shadow-emerald-900/10 no-print">
        <div><h1 className="text-xl font-bold flex items-center gap-2 leading-tight tracking-tight"><Trees className="w-6 h-6 shrink-0" />Holzgewichtsrechner</h1><p className="text-emerald-100 text-xs opacity-90 mt-0.5 font-mono flex items-center gap-1.5 ml-8"><Clock className="w-3 h-3" />{dateTime}</p></div>
        <HeaderLogo />
      </div>
      <div className="p-2 space-y-2 no-print">
        
        {/* Haupt-Reiter Toggle (Gewicht) */}
        {onSwitch && (
            <div className="bg-white p-1 rounded-xl flex shadow-sm border border-slate-100 mb-2">
                <button onClick={onSwitch} className="flex-1 py-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all rounded-lg flex flex-col items-center gap-1">
                    <Scale className="w-5 h-5" /> <span className="text-[10px] font-bold uppercase">Überladung</span>
                </button>
                <button className="flex-1 py-2 bg-emerald-50 text-emerald-800 shadow-sm ring-1 ring-emerald-200 rounded-lg flex flex-col items-center gap-1 cursor-default">
                    <Trees className="w-5 h-5" /> <span className="text-[10px] font-bold uppercase">Holzgewicht</span>
                </button>
            </div>
        )}

        {/* Screen Content (Inputs etc.) */}
        <div className="bg-white p-1 rounded-xl flex shadow-sm border border-slate-100 mb-2">
            <button onClick={() => setVehicleType('semi')} className={`flex-1 py-2 rounded-lg transition-all flex flex-col items-center gap-1 ${vehicleType === 'semi' ? 'bg-emerald-50 text-emerald-800 shadow-sm ring-1 ring-emerald-200' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}>
                <WoodTruckIcon className="w-8 h-8" />
                <span className="text-[10px] font-bold uppercase">Sattelzug</span>
            </button>
            <button onClick={() => setVehicleType('train')} className={`flex-1 py-2 rounded-lg transition-all flex flex-col items-center gap-1 ${vehicleType === 'train' ? 'bg-emerald-50 text-emerald-800 shadow-sm ring-1 ring-emerald-200' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}>
                <WoodTrainIcon className="w-8 h-8" />
                <span className="text-[10px] font-bold uppercase">LKW + Anhänger</span>
            </button>
        </div>

        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
           <div className="grid grid-cols-2 gap-2 mb-2">
               <InputWithIcon icon={Truck} label={vehicleType === 'semi' ? "Leergewicht Zugm. (kg)" : "Leergewicht LKW (kg)"} value={tractorWeight} onChange={(e) => setTractorWeight(e.target.value)} placeholder="0" />
               <InputWithIcon icon={Box} label={vehicleType === 'semi' ? "Leergewicht Aufl. (kg)" : "Leergewicht Anhänger (kg)"} value={trailerWeight} onChange={(e) => setTrailerWeight(e.target.value)} placeholder="0" />
           </div>
           <InputWithIcon icon={Scale} label="zGM (kg)" value={allowedWeight} onChange={(e) => setAllowedWeight(e.target.value)} placeholder="0" />
           <div className="flex gap-2 mt-2">
               <button onClick={() => setAllowedWeight('40000')} className="flex-1 py-2 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 border border-transparent transition-all">Standard 40t</button>
               <button onClick={() => setAllowedWeight('44000')} className="flex-1 py-2 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 border border-transparent transition-all">Ausnahme 44t</button>
           </div>
        </div>
        
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
           <div className="text-xs font-bold text-slate-400 uppercase mb-2 pl-1 flex items-center gap-2"><Ruler className="w-4 h-4" />{vehicleType === 'train' ? 'Maße Ladung LKW' : 'Maße Ladung'}</div>
           <div className="grid grid-cols-3 gap-2"><InputWithIcon icon={Ruler} label="L (m)" value={length} onChange={(e) => setLength(e.target.value)} /><InputWithIcon icon={Ruler} label="B (m)" value={width} onChange={(e) => setWidth(e.target.value)} /><InputWithIcon icon={Ruler} label="H (m)" value={height} onChange={(e) => setHeight(e.target.value)} /></div>
        </div>

        {vehicleType === 'train' && (
             <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 animate-in slide-in-from-top-2">
                <div className="text-xs font-bold text-slate-400 uppercase mb-2 pl-1 flex items-center gap-2"><Ruler className="w-4 h-4" />Maße Ladung Anhänger</div>
                <div className="grid grid-cols-3 gap-2"><InputWithIcon icon={Ruler} label="L (m)" value={length2} onChange={(e) => setLength2(e.target.value)} /><InputWithIcon icon={Ruler} label="B (m)" value={width2} onChange={(e) => setWidth2(e.target.value)} /><InputWithIcon icon={Ruler} label="H (m)" value={height2} onChange={(e) => setHeight2(e.target.value)} /></div>
             </div>
        )}

        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
            <label className="flex items-center gap-1.5 text-sm font-black text-emerald-700 uppercase tracking-wide mb-2"><Trees className="w-5 h-5" />Art des Holzes</label>
            <select value={woodType} onChange={(e) => setWoodType(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none font-medium text-slate-700 shadow-sm">{woodTypes.map((wood) => (<option key={wood.name} value={wood.name}>{wood.name} ({wood.density} kg/m³)</option>))}</select>
            <div className="mt-3 bg-emerald-50/50 border border-emerald-100 rounded-xl p-2.5 text-xs text-slate-600">
                <div className="flex items-center gap-1.5 mb-1.5 font-bold text-emerald-700"><Droplets className="w-4 h-4"/> Feuchtigkeitsinfos:</div>
                <div className="grid grid-cols-2 gap-1">
                    <div>Ganz frisch: &gt; 30%</div>
                    <div>Waldtrocken: 25-30%</div>
                    <div>Lufttrocken: 15%</div>
                    <div>Darr-Gewicht: 0%</div>
                </div>
            </div>
        </div>
        {calculatedLoadWeight > 0 && (
            <div className="space-y-3 animate-in slide-in-from-bottom-4 duration-500">
                <div className={`rounded-2xl p-4 text-white shadow-xl transition-colors duration-500 ${isOverloaded ? 'bg-gradient-to-br from-red-600 to-red-700' : 'bg-gradient-to-br from-emerald-600 to-teal-700'}`}>
                    <div className="space-y-4 text-center">
                        <div>
                            <p className="text-xs font-bold opacity-80 uppercase tracking-wider mb-1">Berechnetes Holzgewicht</p>
                            <div className="text-5xl font-black tracking-tighter">{calculatedLoadWeight.toLocaleString('de-DE')} kg</div>
                        </div>
                        
                        <div className="w-full h-px bg-white/20"></div>

                        <div>
                            <p className="text-xs font-bold opacity-80 uppercase tracking-wider mb-1">Fahrzeuggewicht (Gesamt)</p>
                            <div className="text-4xl font-black tracking-tighter">{totalWeight.toLocaleString('de-DE')} kg</div>
                        </div>
                    </div>

                    {isOverloaded && (
                        <div className="mt-4 bg-white/20 rounded-xl py-2 px-3 text-sm font-bold flex items-center justify-center gap-2 animate-pulse border border-white/30 shadow-sm">
                            <AlertTriangle className="w-5 h-5" />
                            <span>Verdacht auf Überladung</span>
                        </div>
                    )}
                </div>

                <WoodFormulaDisplay values={{ totalVol: totalVol.toFixed(2), factor: solidFactor, solidVol: solidVolume.toFixed(2), density: currentDensity, weight: calculatedLoadWeight }} />
            </div>
        )}
        
        <PrintButton />
      </div>
      <AppVersionFooter />
    </div>
  );
}

// --- OVERLOAD CALCULATOR ---
const getOverloadFineData = (percentage, allowed, isTrailer, isCombination, role) => {
    if (percentage < 2) return null; // Toleranzbereich
    const p = percentage;
    if (isCombination) {
        if (role === 'driver') {
            if (allowed > 7500) {
                 if (p > 30) return { cost: '380 €', points: '1', ban: '', tbnr: '334725' };
                 if (p > 25) return { cost: '285 €', points: '1', ban: '', tbnr: '334724' };
                 if (p > 20) return { cost: '190 €', points: '1', ban: '', tbnr: '334723' };
                 if (p > 15) return { cost: '140 €', points: '1', ban: '', tbnr: '334722' };
                 if (p > 10) return { cost: '110 €', points: '1', ban: '', tbnr: '334721' };
                 if (p > 5)  return { cost: '80 €', points: '1', ban: '', tbnr: '334720' };
                 if (p >= 2) return { cost: '30 €', points: '0', ban: '', tbnr: '334220' };
                 return null;
            } else {
                 if (p > 30) return { cost: '235 €', points: '1', ban: '', tbnr: '334746' };
                 if (p > 25) return { cost: '140 €', points: '1', ban: '', tbnr: '334745' };
                 if (p > 20) return { cost: '95 €', points: '1', ban: '', tbnr: '334744' };
                 if (p > 15) return { cost: '35 €', points: '0', ban: '', tbnr: '334246' };
                 if (p > 10) return { cost: '30 €', points: '0', ban: '', tbnr: '334245' };
                 if (p > 5)  return { cost: '10 €', points: '0', ban: '', tbnr: '334244' };
                 return null;
            }
        } 
        else if (role === 'owner') {
             if (allowed > 7500) {
                 if (p > 30) return { cost: '425 €', points: '1', ban: '', tbnr: '331896' };
                 if (p > 25) return { cost: '425 €', points: '1', ban: '', tbnr: '331896' };
                 if (p > 20) return { cost: '380 €', points: '1', ban: '', tbnr: '331895' };
                 if (p > 15) return { cost: '285 €', points: '1', ban: '', tbnr: '331894' };
                 if (p > 10) return { cost: '235 €', points: '1', ban: '', tbnr: '331893' };
                 if (p > 5)  return { cost: '140 €', points: '1', ban: '', tbnr: '331892' };
                 if (p >= 2) return { cost: '35 €', points: '0', ban: '', tbnr: '331248' };
                 return null;
             } else {
                 if (p > 30) return { cost: '235 €', points: '1', ban: '', tbnr: '331918' };
                 if (p > 25) return { cost: '140 €', points: '1', ban: '', tbnr: '331917' };
                 if (p > 20) return { cost: '95 €', points: '1', ban: '', tbnr: '331916' };
                 if (p > 15) return { cost: '35 €', points: '0', ban: '', tbnr: '331274' };
                 if (p > 10) return { cost: '30 €', points: '0', ban: '', tbnr: '331273' };
                 if (p > 5)  return { cost: '10 €', points: '0', ban: '', tbnr: '331272' };
                 return null;
             }
        }
        return null;
    }
    if (role === 'driver') {
        if (isTrailer && allowed <= 2000) {
            if (p > 30) return { cost: '235 €', points: '1', ban: '', tbnr: '334698' };
            if (p > 25) return { cost: '140 €', points: '1', ban: '', tbnr: '334697' };
            if (p > 20) return { cost: '95 €', points: '1', ban: '', tbnr: '334696' };
            if (p > 15) return { cost: '35 €', points: '0', ban: '', tbnr: '334198' };
            if (p > 10) return { cost: '30 €', points: '0', ban: '', tbnr: '334197' };
            if (p > 5)  return { cost: '10 €', points: '0', ban: '', tbnr: '334196' };
            return null;
        }
        if (isTrailer && allowed > 2000)  {
            if (p > 30) return { cost: '380 €', points: '1', ban: '', tbnr: '334641' }; 
            if (p > 25) return { cost: '285 €', points: '1', ban: '', tbnr: '334640' };
            if (p > 20) return { cost: '190 €', points: '1', ban: '', tbnr: '334639' };
            if (p > 15) return { cost: '140 €', points: '1', ban: '', tbnr: '334638' };
            if (p > 10) return { cost: '110 €', points: '1', ban: '', tbnr: '334637' };
            if (p > 5)  return { cost: '80 €', points: '1', ban: '', tbnr: '334636' };
            if (p >= 2) return { cost: '30 €', points: '0', ban: '', tbnr: '334136' };
            return null;
        }
        if ((!isTrailer && allowed <= 7500)) {
            if (p > 30) return { cost: '235 €', points: '1', ban: '', tbnr: '334662' };
            if (p > 25) return { cost: '140 €', points: '1', ban: '', tbnr: '334661' };
            if (p > 20) return { cost: '95 €', points: '1', ban: '', tbnr: '334660' };
            if (p > 15) return { cost: '35 €', points: '0', ban: '', tbnr: '334162' };
            if (p > 10) return { cost: '30 €', points: '0', ban: '', tbnr: '334161' };
            if (p > 5)  return { cost: '10 €', points: '0', ban: '', tbnr: '334160' };
            return null;
        }
        if ((!isTrailer && allowed > 7500)) {
            if (p > 30) return { cost: '380 €', points: '1', ban: '', tbnr: '334605' };
            if (p > 25) return { cost: '285 €', points: '1', ban: '', tbnr: '334604' };
            if (p > 20) return { cost: '190 €', points: '1', ban: '', tbnr: '334603' };
            if (p > 15) return { cost: '140 €', points: '1', ban: '', tbnr: '334602' };
            if (p > 10) return { cost: '110 €', points: '1', ban: '', tbnr: '334601' };
            if (p > 5)  return { cost: '80 €', points: '1', ban: '', tbnr: '334600' };
            if (p >= 2) return { cost: '30 €', points: '0', ban: '', tbnr: '334100' };
            return null;
        }
    }
    
    if (role === 'owner') {
        if (isTrailer) {
            if (allowed > 2000) {
                 if (p > 30) return { cost: '425 €', points: '1', ban: '', tbnr: '331824' }; 
                 if (p > 25) return { cost: '425 €', points: '1', ban: '', tbnr: '331824' };
                 if (p > 20) return { cost: '380 €', points: '1', ban: '', tbnr: '331823' };
                 if (p > 15) return { cost: '285 €', points: '1', ban: '', tbnr: '331822' };
                 if (p > 10) return { cost: '235 €', points: '1', ban: '', tbnr: '331821' };
                 if (p > 5)  return { cost: '140 €', points: '1', ban: '', tbnr: '331820' };
                 if (p >= 2) return { cost: '35 €', points: '0', ban: '', tbnr: '331166' };
                 return null;
            } else {
                 if (p > 30) return { cost: '235 €', points: '1', ban: '', tbnr: '331870' };
                 if (p > 25) return { cost: '140 €', points: '1', ban: '', tbnr: '331869' };
                 if (p > 20) return { cost: '95 €', points: '1', ban: '', tbnr: '331868' };
                 if (p > 15) return { cost: '35 €', points: '0', ban: '', tbnr: '331228' };
                 if (p > 10) return { cost: '30 €', points: '0', ban: '', tbnr: '331227' };
                 if (p > 5)  return { cost: '10 €', points: '0', ban: '', tbnr: '331226' };
                 return null;
            }
        } 
        else {
             if (allowed > 7500) {
                 if (p > 30) return { cost: '425 €', points: '1', ban: '', tbnr: '331788' };
                 if (p > 25) return { cost: '425 €', points: '1', ban: '', tbnr: '331788' };
                 if (p > 20) return { cost: '380 €', points: '1', ban: '', tbnr: '331787' };
                 if (p > 15) return { cost: '285 €', points: '1', ban: '', tbnr: '331786' };
                 if (p > 10) return { cost: '235 €', points: '1', ban: '', tbnr: '331785' };
                 if (p > 5)  return { cost: '140 €', points: '1', ban: '', tbnr: '331784' };
                 if (p >= 2) return { cost: '35 €', points: '0', ban: '', tbnr: '331130' };
                 return null;
             } else {
                 if (p > 30) return { cost: '235 €', points: '1', ban: '', tbnr: '331846' };
                 if (p > 25) return { cost: '140 €', points: '1', ban: '', tbnr: '331845' };
                 if (p > 20) return { cost: '95 €', points: '1', ban: '', tbnr: '331844' };
                 if (p > 15) return { cost: '35 €', points: '0', ban: '', tbnr: '331192' };
                 if (p > 10) return { cost: '30 €', points: '0', ban: '', tbnr: '331191' };
                 if (p > 5)  return { cost: '10 €', points: '0', ban: '', tbnr: '331190' };
                 return null;
             }
        }
    }
    
    return null;
};

// Komponente für den Ausdruck des Rechenwegs (robust gegen fehlende Daten)
const PrintFormulaDisplay = ({ result }) => {
    if (!result || typeof result.actual === 'undefined' || isNaN(result.actual)) return null;
    
    const isOk = !result.isOverloaded;
    const diffColor = isOk ? '#16a34a' : '#dc2626'; 
    const diffText = isOk ? (result.difference < 0 ? 'Unterladung' : 'Differenz') : 'Überladung';
    const diffSign = result.difference > 0 ? '+' : '';

    return (
        <div style={{ 
            marginTop: '10px', 
            marginBottom: '10px', 
            paddingLeft: '10px', 
            borderLeft: `3px solid ${diffColor}`, 
            fontSize: '12px',
            fontFamily: 'monospace'
        }}>
            <strong style={{ fontFamily: 'sans-serif', fontSize: '13px' }}>Rechenweg:</strong><br />
            <table style={{ borderCollapse: 'collapse', marginTop: '4px' }}>
                <tbody>
                    <tr>
                        <td style={{ paddingRight: '15px' }}>Gewogen (Ist):</td>
                        <td style={{ textAlign: 'right' }}>{Number(result.actual || 0).toLocaleString()} kg</td>
                    </tr>
                    <tr>
                        <td style={{ paddingRight: '15px', borderBottom: '1px solid #000' }}>- Toleranz:</td>
                        <td style={{ textAlign: 'right', borderBottom: '1px solid #000' }}>{Number(result.tolerance || 0).toLocaleString()} kg</td>
                    </tr>
                    <tr>
                        <td style={{ paddingRight: '15px', fontWeight: 'bold' }}>= Vorwerfbar (Netto):</td>
                        <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{Number(result.netWeight || 0).toLocaleString()} kg</td>
                    </tr>
                    <tr>
                        <td style={{ paddingRight: '15px', borderBottom: '1px solid #000' }}>- Zulässiges Gewicht (zGM):</td>
                        <td style={{ textAlign: 'right', borderBottom: '1px solid #000' }}>{Number(result.allowed || 0).toLocaleString()} kg</td>
                    </tr>
                    <tr>
                        <td style={{ paddingRight: '15px', fontWeight: 'bold', color: diffColor }}>= {diffText}:</td>
                        <td style={{ textAlign: 'right', fontWeight: 'bold', color: diffColor }}>{diffSign}{Number(result.difference || 0).toLocaleString()} kg</td>
                    </tr>
                </tbody>
            </table>
            {result.isOverloaded && result.allowed > 0 && (
                <div style={{ marginTop: '6px', fontSize: '11px' }}>
                    <strong>Prozentuale Formel:</strong><br />
                    ({Number(result.difference || 0).toLocaleString()} kg / {Number(result.allowed || 0).toLocaleString()} kg) × 100 = <strong>{Number(result.percentage || 0).toFixed(2)} %</strong>
                </div>
            )}
        </div>
    );
};

// Simple display component for print (non-interactive)
const PrintFineDisplay = ({ result, isTrailer, isCombination }) => {
    if (!result || !result.isOverloaded || result.percentage < 2) return null;
    const driverFine = getOverloadFineData(result.percentage, result.allowed, isTrailer, isCombination, 'driver');
    const ownerFine = getOverloadFineData(result.percentage, result.allowed, isTrailer, isCombination, 'owner');
 
    return (
        <div style={{ marginTop: '10px' }}>
            {driverFine && (
               <div style={{ marginBottom: '5px' }}>
                   <strong>Fahrer:</strong> {driverFine.cost}, {driverFine.points} Pkt (TBNR: {driverFine.tbnr})
               </div>
            )}
            {ownerFine && (
                <div>
                   <strong>Halter:</strong> {ownerFine.cost}, {ownerFine.points} Pkt (TBNR: {ownerFine.tbnr})
               </div>
            )}
        </div>
    );
};
 
const FineDisplay = ({ result, isTrailer, isCombination }) => {
    const [showDriver, setShowDriver] = useState(false);
    const [showOwner, setShowOwner] = useState(false);
 
    if (!result || !result.isOverloaded || result.percentage < 2) return null;
 
    const driverFine = getOverloadFineData(result.percentage, result.allowed, isTrailer, isCombination, 'driver');
    const ownerFine = getOverloadFineData(result.percentage, result.allowed, isTrailer, isCombination, 'owner');
 
    return (
        <div className="mt-4 space-y-2 no-print">
            <button onClick={() => setShowDriver(!showDriver)} className="w-full flex justify-between items-center px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold uppercase transition-colors">
               <span>Tatbestand Fahrer</span>
               {showDriver ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
           </button>
           {showDriver && driverFine && (
               <div className="bg-slate-800 text-white p-3 rounded-lg text-xs">
                    <div className="grid grid-cols-2 gap-2">
                       <div><div className="text-[10px] text-slate-400 uppercase font-bold">Bußgeld (Fahrer)</div><div className="text-xl font-black text-amber-400">{driverFine.cost}</div></div>
                       <div><div className="text-[10px] text-slate-400 uppercase font-bold">Punkte</div><div className="text-lg font-bold">{driverFine.points}</div></div>
                       <div><div className="text-[10px] text-slate-400 uppercase font-bold">TBNR</div><div className="text-xs font-mono bg-slate-700 px-1 py-0.5 rounded inline-block">{driverFine.tbnr}</div></div>
                    </div>
               </div>
            )}
            <button onClick={() => setShowOwner(!showOwner)} className="w-full flex justify-between items-center px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold uppercase transition-colors">
               <span>Tatbestand Halter</span>
                {showOwner ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
           </button>
            {showOwner && ownerFine && (
               <div className="bg-slate-700 text-white p-3 rounded-lg text-xs">
                    <div className="grid grid-cols-2 gap-2">
                       <div><div className="text-[10px] text-slate-400 uppercase font-bold">Bußgeld (Halter)</div><div className="text-xl font-black text-amber-400">{ownerFine.cost}</div></div>
                       <div><div className="text-[10px] text-slate-400 uppercase font-bold">Punkte</div><div className="text-lg font-bold">{ownerFine.points}</div></div>
                        <div><div className="text-[10px] text-slate-400 uppercase font-bold">TBNR</div><div className="text-xs font-mono bg-slate-600 px-1 py-0.5 rounded inline-block">{ownerFine.tbnr}</div></div>
                    </div>
                </div>
            )}
        </div>
    );
}
 
function OverloadCalculator({ onSwitch }) {
  const [mode, setMode] = useState('single'); 
  const [isCommercial, setIsCommercial] = useState(false);
  const [useCustomTolerance, setUseCustomTolerance] = useState(false); 
  
  const [allowedWeight1, setAllowedWeight1] = useState('');
  const [actualWeight1, setActualWeight1] = useState('');
  const [customTol1, setCustomTol1] = useState(''); 
 
  const [allowedWeight2, setAllowedWeight2] = useState('');
  const [actualWeight2, setActualWeight2] = useState('');
  const [customTol2, setCustomTol2] = useState(''); 
  
  const [totalAllowed, setTotalAllowed] = useState('');
  const [result, setResult] = useState(null);
  
  const dateTime = typeof useDateTime === 'function' ? useDateTime() : new Date().toLocaleDateString();
 
  const standardTotalWeights = [
      { group: 'Allgemeine Kombinationen (§ 34 StVZO)', label: 'Leichte Fahrzeugkombination (z.B. PKW)', val: '7500', detail: '7,5 t' },
      { group: 'Allgemeine Kombinationen (§ 34 StVZO)', label: 'Fahrzeugkombination unter 4 Achsen', val: '28000', detail: '28,0 t' },
      { group: 'Allgemeine Kombinationen (§ 34 StVZO)', label: '4 Achsen (Zugmaschine bis 25 t)', val: '35000', detail: '35,0 t' },
      { group: 'Allgemeine Kombinationen (§ 34 StVZO)', label: '4 Achsen (Regelfall)', val: '36000', detail: '36,0 t' },
      { group: 'Allgemeine Kombinationen (§ 34 StVZO)', label: 'Fahrzeugkombination ab 5 Achsen', val: '40000', detail: '40,0 t' },
      { group: 'Kombinierter Verkehr', label: '2-Achs-Zugm. + 3-Achs-Anhänger', val: '42000', detail: '42,0 t' },
      { group: 'Kombinierter Verkehr', label: '3-Achs-Zugm. + 2/3-Achs-Anhänger', val: '44000', detail: '44,0 t' }
  ];
 
  useEffect(() => {
    setResult(null); setAllowedWeight2(''); setActualWeight2(''); setTotalAllowed('');
    setCustomTol2(''); 
  }, [mode]);
 
  useEffect(() => {
    if (mode === 'single') { if (!actualWeight1) { setResult(null); return; } } 
    else { if (!actualWeight1 || !actualWeight2) { setResult(null); return; } }
 
    const calculateForVehicle = (allowedStr, actualStr, customTolStr) => {
        const allowed = parseFloat(allowedStr);
        const actual = parseFloat(actualStr);
        if (isNaN(actual)) return null;
 
        let tolerance = 0;
        if (useCustomTolerance) {
             tolerance = parseFloat(customTolStr) || 0;
        } else {
             if (actual <= 10000) tolerance = 20;
             else if (actual <= 40000) tolerance = 40;
             else tolerance = 60;
        }
 
        let netWeightRaw = actual - tolerance;
        let netWeight = (allowed > 0 && allowed <= 3500) ? Math.floor(netWeightRaw) : Math.ceil(netWeightRaw);
        if (isNaN(allowed) || allowed === 0) netWeight = Math.ceil(netWeightRaw);
        
        let difference = isNaN(allowed) || allowed === 0 ? 0 : netWeight - allowed;
        let percentage = (difference > 0 && allowed > 0) ? (difference / allowed) * 100 : 0;
        
        return {
            actual, allowed, tolerance, netWeight, difference, percentage, 
            isOverloaded: allowed > 0 && difference > 0, isValidInput: !isNaN(actual) 
        };
    };
 
    const res1 = calculateForVehicle(allowedWeight1, actualWeight1, customTol1);
    let res2 = null;
    let resTotal = null;
 
    if (mode === 'combination') {
        res2 = calculateForVehicle(allowedWeight2, actualWeight2, customTol2);
        
        if (res1 && res2) {
            const sumNet = res1.netWeight + res2.netWeight;
            const limit = parseFloat(totalAllowed);
 
            let diff = (!isNaN(limit) && limit > 0) ? sumNet - limit : 0;
            let perc = (diff > 0 && limit > 0) ? (diff / limit) * 100 : 0;
 
            resTotal = {
               actual: res1.actual + res2.actual, 
               allowed: limit,
               tolerance: res1.tolerance + res2.tolerance,
               netWeight: sumNet,
               difference: diff,
               percentage: perc,
               isOverloaded: limit > 0 && diff > 0,
               isValidInput: !isNaN(limit) && limit > 0
            };
        }
    }
    setResult({ vehicle1: res1, vehicle2: res2, total: resTotal });
  }, [allowedWeight1, actualWeight1, allowedWeight2, actualWeight2, totalAllowed, mode, customTol1, customTol2, useCustomTolerance]);
 
  const resetForm = () => { 
      setAllowedWeight1(''); setActualWeight1(''); setAllowedWeight2('');
      setActualWeight2(''); setTotalAllowed(''); setCustomTol1('');
      setCustomTol2(''); setUseCustomTolerance(false); setResult(null); 
  };
 
  const checkConfiscation = (res) => {
      if (!res || !isCommercial || !res.isOverloaded) return false;
      if (res.allowed > 3500 && res.percentage >= 15) return true;
      if (res.allowed > 0 && res.allowed <= 3500 && res.percentage >= 20) return true;
      return false;
  };
 
  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen">
      
      {/* PRINT VIEW ONLY */}
      <style>
        {`
          @media print {
            @page { 
              size: A4; 
              margin: 1.2cm; 
            }
            .print-container {
              zoom: 0.9; 
            }
            .print-section { 
              page-break-after: avoid !important; 
              break-after: avoid !important; 
              margin-bottom: 5px !important;
            }
            .print-result-box { 
              page-break-inside: avoid !important; 
              break-inside: avoid !important; 
            }
            .print-table th, .print-table td {
              padding: 4px 6px !important;
              font-size: 11px !important;
            }
          }
        `}
      </style>
      <div className="print-only print-container">
        <h1 className="print-title">Gewichts-Protokoll</h1>
        <div className="print-meta">Erstellt am: {dateTime}</div>
 
        <h2 className="print-section">Fahrzeugdaten & Messwerte</h2>
        <table className="print-table">
           <thead>
               <tr>
                   <th>Fahrzeugteil</th>
                   <th>Zul. Gesamt (zGM)</th>
                   <th>Gewogen (Ist)</th>
                   <th>Toleranz{useCustomTolerance && ' (Manuell)'}</th>
                   <th>Vorwerfbar (Netto)</th>
              </tr>
           </thead>
           <tbody>
               <tr>
                   <td>{mode === 'single' ? 'Einzelfahrzeug' : 'Zugmaschine'}</td>
                   <td>{allowedWeight1 || 0} kg</td>
                   <td>{actualWeight1 || 0} kg</td>
                   <td>-{result?.vehicle1?.tolerance || 0} kg</td>
                   <td><strong>{result?.vehicle1?.netWeight?.toLocaleString() || 0} kg</strong></td>
               </tr>
                {mode === 'combination' && (
              <tr>
                   <td>Anhänger</td>
                   <td>{allowedWeight2 || 0} kg</td>
                   <td>{actualWeight2 || 0} kg</td>
                   <td>-{result?.vehicle2?.tolerance || 0} kg</td>
                   <td><strong>{result?.vehicle2?.netWeight?.toLocaleString() || 0} kg</strong></td>
               </tr>
                )}
           </tbody>
        </table>
 
        <h2 className="print-section">Ergebnis & Auswertung</h2>
        {result && (
        <>
            {/* RESULTS VEHICLE 1 */}
            <div className="print-result-box">
               <div className="print-result-header">{mode === 'single' ? 'Fahrzeug' : 'Zugmaschine'}</div>
               <div>Status: {result.vehicle1?.isOverloaded ? <span className="print-warning">ÜBERLADEN ({result.vehicle1?.percentage?.toFixed(2)}%)</span> : 'In Ordnung'}</div>
                
               <PrintFormulaDisplay result={result.vehicle1} />
 
               {checkConfiscation(result.vehicle1) && <div className="print-warning" style={{marginTop: '5px'}}>⚠️ Einziehung möglich!</div>}
               <PrintFineDisplay result={result.vehicle1} isTrailer={false} isCombination={false} />
           </div>
 
            {/* RESULTS VEHICLE 2 */}
            {mode === 'combination' && result.vehicle2 && (
            <div className="print-result-box">
               <div className="print-result-header">Anhänger</div>
               <div>Status: {result.vehicle2?.isOverloaded ? <span className="print-warning">ÜBERLADEN ({result.vehicle2?.percentage?.toFixed(2)}%)</span> : 'In Ordnung'}</div>
                
               <PrintFormulaDisplay result={result.vehicle2} />
 
               {checkConfiscation(result.vehicle2) && <div className="print-warning" style={{marginTop: '5px'}}>⚠️ Einziehung möglich!</div>}
               <PrintFineDisplay result={result.vehicle2} isTrailer={true} isCombination={false} />
           </div>
            )}
 
            {/* RESULTS TOTAL */}
            {mode === 'combination' && result.total && (
            <div className="print-result-box">
               <div className="print-result-header">Gesamtzug</div>
               <table className="print-table" style={{marginBottom: 5}}>
                    <tbody>
                       <tr><th>Zul. Gesamtgewicht Zug</th><td>{totalAllowed || 0} kg</td></tr>
                       <tr><th>Summe Netto-Gewichte</th><td>{result.total?.netWeight?.toLocaleString()} kg</td></tr>
                   </tbody>
               </table>
               <div>Status: {result.total?.isOverloaded ? <span className="print-warning">ÜBERLADEN ({result.total?.percentage?.toFixed(2)}%)</span> : 'In Ordnung'}</div>
                
               <PrintFormulaDisplay result={result.total} />
 
               {checkConfiscation(result.total) && <div className="print-warning" style={{marginTop: '5px'}}>⚠️ Einziehung möglich!</div>}
               <PrintFineDisplay result={result.total} isTrailer={false} isCombination={true} />
           </div>
            )}
        </>
        )}
      </div>
      {/* END PRINT VIEW */}
 
      <div className="bg-blue-600/95 backdrop-blur-md p-4 text-white flex items-center justify-between sticky top-0 z-20 shadow-lg shadow-blue-900/10 no-print">
       <div><h1 className="text-xl font-bold flex items-center gap-2 leading-tight tracking-tight"><Scale className="w-6 h-6 shrink-0" />Überladungsrechner</h1><p className="text-blue-100 text-xs opacity-90 mt-0.5 font-mono flex items-center gap-1.5 ml-8"><Clock className="w-3 h-3" />{dateTime}</p></div>
        {typeof HeaderLogo !== 'undefined' && <HeaderLogo />}
      </div>
      
      <div className="p-2 space-y-2 no-print">
        
        {/* Haupt-Reiter Toggle (Gewicht) */}
        {onSwitch && (
            <div className="bg-white p-1 rounded-xl flex shadow-sm border border-slate-100 mb-2">
               <button className="flex-1 py-2 bg-blue-50 text-blue-800 shadow-sm ring-1 ring-blue-200 rounded-lg flex flex-col items-center gap-1 cursor-default">
                   <Scale className="w-5 h-5" /> <span className="text-[10px] font-bold uppercase">Überladung</span>
               </button>
               <button onClick={onSwitch} className="flex-1 py-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all rounded-lg flex flex-col items-center gap-1">
                   <Trees className="w-5 h-5" /> <span className="text-[10px] font-bold uppercase">Holzgewicht</span>
               </button>
           </div>
        )}
 
        <label className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-slate-100 mb-2 cursor-pointer group">
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${isCommercial ? 'bg-blue-600 border-blue-600' : 'border-slate-300 bg-slate-50'}`}>
               {isCommercial && <CheckSquare className="w-4 h-4 text-white" />}
           </div>
            <input type="checkbox" checked={isCommercial} onChange={(e) => setIsCommercial(e.target.checked)} className="hidden" />
            <div className="flex flex-col">
               <span className={`text-sm font-bold uppercase tracking-wide transition-colors ${isCommercial ? 'text-blue-800' : 'text-slate-600'}`}>Gewerblicher Transport</span>
               <span className="text-[10px] text-slate-400">Prüfung auf Einziehung der Taterträge</span>
           </div>
        </label>
 
        {/* Dezente Checkbox für manuelle Toleranz */}
        <div className="px-2 mb-3 flex items-center justify-end">
             <label className="flex items-center gap-1.5 cursor-pointer group">
               <input type="checkbox" checked={useCustomTolerance} onChange={(e) => setUseCustomTolerance(e.target.checked)} className="w-3.5 h-3.5 rounded border-slate-300 text-slate-600 focus:ring-slate-500 transition-colors" />
               <span className="text-[10px] font-bold uppercase text-slate-400 group-hover:text-slate-600 transition-colors">Eigene Wiegetoleranz (kg) eingeben, sonst Toleranzen der GZA</span>
            </label>
        </div>
 
        <div className="bg-white p-1 rounded-xl flex shadow-sm border border-slate-100 mb-2">
            <button onClick={() => setMode('single')} className={`flex-1 py-2 rounded-lg transition-all flex flex-col items-center gap-1 ${mode === 'single' ? 'bg-blue-50 text-blue-800 shadow-sm ring-1 ring-blue-200' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}>
               <Truck className="w-6 h-6" />
               <span className="text-[10px] font-bold uppercase">Einzelfahrzeug</span>
            </button>
            <button onClick={() => setMode('combination')} className={`flex-1 py-2 rounded-lg transition-all flex flex-col items-center gap-1 ${mode === 'combination' ? 'bg-blue-50 text-blue-800 shadow-sm ring-1 ring-blue-200' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}>
               <Truck className="w-8 h-8" />
               <span className="text-[10px] font-bold uppercase">Fahrzeugkombination</span>
           </button>
        </div>
 
        <div className="grid grid-cols-2 gap-2">
            <div className={`bg-white p-3 rounded-2xl shadow-sm border border-slate-100 ${mode === 'single' ? 'col-span-2' : 'col-span-1'}`}>
               <div className="flex items-center gap-2 mb-2 text-blue-700">
                  <Truck className="w-4 h-4" />
                   <span className="text-xs font-black uppercase tracking-wide">
                       {mode === 'single' ? "Fahrzeug" : "Zugmaschine"}
                   </span>
               </div>
              <div className="space-y-2">
                   {typeof InputWithIcon !== 'undefined' ? <InputWithIcon icon={ShieldCheck} label="zGM (kg)" value={allowedWeight1} onChange={(e) => setAllowedWeight1(e.target.value)} /> : <input className="w-full border rounded p-2 text-sm" placeholder="zGM (kg)" value={allowedWeight1} onChange={(e) => setAllowedWeight1(e.target.value)} />}
                   {typeof InputWithIcon !== 'undefined' ? <InputWithIcon icon={Scale} label="Ist (kg)" value={actualWeight1} onChange={(e) => setActualWeight1(e.target.value)} /> : <input className="w-full border rounded p-2 text-sm" placeholder="Ist (kg)" value={actualWeight1} onChange={(e) => setActualWeight1(e.target.value)} />}
                   
                   {useCustomTolerance && (
                       <div className="pt-2 border-t border-slate-50 mt-2 animate-in fade-in">
                           {typeof InputWithIcon !== 'undefined' ? <InputWithIcon icon={Edit3} label="Toleranzabzug (kg)" value={customTol1} onChange={(e) => setCustomTol1(e.target.value)} placeholder="0" /> : <input className="w-full border rounded p-2 text-sm" placeholder="Toleranz (kg)" value={customTol1} onChange={(e) => setCustomTol1(e.target.value)} />}
                       </div>
                    )}
               </div>
           </div>
 
            {mode === 'combination' && (
               <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 col-span-1 animate-in slide-in-from-right-2">
                   <div className="flex items-center gap-2 mb-2 text-blue-700">
                       <Box className="w-4 h-4" />
                       <span className="text-xs font-black uppercase tracking-wide">Anhänger</span>
                   </div>
                   <div className="space-y-2">
                       {typeof InputWithIcon !== 'undefined' ? <InputWithIcon icon={ShieldCheck} label="zGM (kg)" value={allowedWeight2} onChange={(e) => setAllowedWeight2(e.target.value)} /> : <input className="w-full border rounded p-2 text-sm" placeholder="zGM (kg)" value={allowedWeight2} onChange={(e) => setAllowedWeight2(e.target.value)} />}
                       {typeof InputWithIcon !== 'undefined' ? <InputWithIcon icon={Scale} label="Ist (kg)" value={actualWeight2} onChange={(e) => setActualWeight2(e.target.value)} /> : <input className="w-full border rounded p-2 text-sm" placeholder="Ist (kg)" value={actualWeight2} onChange={(e) => setActualWeight2(e.target.value)} />}
                       
                       {useCustomTolerance && (
                           <div className="pt-2 border-t border-slate-50 mt-2 animate-in fade-in">
                               {typeof InputWithIcon !== 'undefined' ? <InputWithIcon icon={Edit3} label="Toleranzabzug (kg)" value={customTol2} onChange={(e) => setCustomTol2(e.target.value)} placeholder="0" /> : <input className="w-full border rounded p-2 text-sm" placeholder="Toleranz (kg)" value={customTol2} onChange={(e) => setCustomTol2(e.target.value)} />}
                           </div>
                       )}
                   </div>
               </div>
            )}
        </div>
 
        {mode === 'combination' && (
             <div className="bg-slate-50 p-3 rounded-2xl shadow-inner border border-slate-200 animate-in slide-in-from-top-2">
               <div className="flex items-center gap-2 mb-2 text-slate-600">
                   <Weight className="w-5 h-5" />
                   <span className="text-sm font-black uppercase tracking-wide">Gesamter Zug</span>
               </div>
                
               <div className="mb-3">
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1">Gesetzliche Normwerte (zGM Gesamtzug)</label>
                  <select 
                       className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-700"
                       onChange={(e) => {
                           if (e.target.value !== 'custom') setTotalAllowed(e.target.value);
                      }}
                       value={standardTotalWeights.find(opt => opt.val === totalAllowed) ? totalAllowed : (totalAllowed ? "custom" : "")}
                  >
                      <option value="" disabled>Bitte gesetzlichen Wert wählen...</option>
                      <optgroup label="Allgemeine Kombinationen (§ 34 StVZO)">
                          {standardTotalWeights.filter(opt => opt.group.includes('Allgemein')).map((opt) => (
                               <option key={opt.val} value={opt.val}>{opt.detail} - {opt.label}</option>
                          ))}
                      </optgroup>
                      <optgroup label="Kombinierter Verkehr">
                          {standardTotalWeights.filter(opt => opt.group.includes('Kombiniert')).map((opt) => (
                               <option key={opt.val} value={opt.val}>{opt.detail} - {opt.label}</option>
                          ))}
                      </optgroup>
                      <optgroup label="Abweichende Gewichte">
                          <option value="custom">Eigener Wert (manuell unten eingegeben)</option>
                      </optgroup>
                  </select>
               </div>
 
               <div className="space-y-2">
                    {typeof InputWithIcon !== 'undefined' ? <InputWithIcon icon={ShieldCheck} label="zGM Gesamtzug Manuell (kg)" value={totalAllowed} onChange={(e) => setTotalAllowed(e.target.value)}/> : <input className="w-full border rounded p-2 text-sm" placeholder="Manuell zGM (kg)" value={totalAllowed} onChange={(e) => setTotalAllowed(e.target.value)} />}
               </div>
           </div>
        )}
      </div>
 
      {result && (
        <div className="bg-slate-100 border-t border-slate-200 p-2 animate-in slide-in-from-bottom-4 duration-500 pb-20 no-print">
          <div className={`grid gap-2 ${mode === 'combination' ? 'grid-cols-2' : 'grid-cols-1'}`}>
             
             {result.vehicle1 && result.vehicle1.isValidInput && (
                <div className={`p-3 rounded-2xl border-2 shadow-sm transition-all flex flex-col justify-between ${result.vehicle1.isOverloaded ? 'bg-white border-red-200' : 'bg-white border-slate-200'}`}>
                   <div>
                       <div className="flex justify-between items-center mb-1.5">
                           <span className="font-bold text-slate-700 flex items-center gap-1.5 text-xs">
                                <Truck className="w-3 h-3 text-slate-400"/> {mode === 'single' ? 'Fahrzeug' : 'Zugm.'}
                           </span>
                           <span className={`px-1.5 py-0.5 rounded text-[10px] font-black uppercase ${result.vehicle1.isOverloaded ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{result.vehicle1.isOverloaded ? 'Überladen' : 'OK'}</span>
                       </div>
                       {result.vehicle1.isOverloaded ? (
                           <div className="text-center py-2">
                                <div className="text-2xl font-black text-red-600 tracking-tighter">
                                   {result.vehicle1.percentage.toFixed(2)} <span className="text-sm">%</span>
                                </div>
                                <div className="inline-block bg-red-50 text-red-700 px-1.5 py-0.5 rounded text-xs font-bold border border-red-100 mt-1">
                                    + {result.vehicle1.difference.toLocaleString()} kg
                                </div>
                           </div>
                       ) : (
                           <div className="flex justify-between items-end mb-1"><span className="text-[10px] text-slate-500">Netto:</span><span className="text-sm font-black text-slate-800">{result.vehicle1.netWeight.toLocaleString()} kg</span></div>
                       )}
                   </div>
 
                    <div>
                        {checkConfiscation(result.vehicle1) && (
                            <div className="mt-2 bg-red-100 border border-red-300 text-red-800 px-2 py-1.5 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1.5 animate-pulse uppercase tracking-wide shadow-sm">
                                <AlertTriangle className="w-4 h-4 shrink-0" />
                                 <span>⚠️ Einziehung möglich!</span>
                            </div>
                        )}
 
                        {typeof OverloadFormulaDisplay !== 'undefined' && <OverloadFormulaDisplay values={{ actual: result.vehicle1.actual, tolerance: result.vehicle1.tolerance, net: result.vehicle1.netWeight, allowed: result.vehicle1.allowed, diff: result.vehicle1.difference, percent: result.vehicle1.percentage }} />}
                        <FineDisplay result={result.vehicle1} isTrailer={false} isCombination={false} />
                    </div>
                </div>
             )}
             
            {result.vehicle2 && result.vehicle2.isValidInput && (
                <div className={`p-3 rounded-2xl border-2 shadow-sm transition-all flex flex-col justify-between ${result.vehicle2.isOverloaded ? 'bg-white border-red-200' : 'bg-white border-slate-200'}`}>
                   <div>
                       <div className="flex justify-between items-center mb-1.5"><span className="font-bold text-slate-700 flex items-center gap-1.5 text-xs"><Box className="w-3 h-3 text-slate-400"/> Anhänger</span><span className={`px-1.5 py-0.5 rounded text-[10px] font-black uppercase ${result.vehicle2.isOverloaded ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{result.vehicle2.isOverloaded ? 'Überladen' : 'OK'}</span></div>
                       {result.vehicle2.isOverloaded ? (
                           <div className="text-center py-2">
                                <div className="text-2xl font-black text-red-600 tracking-tighter">
                                   {result.vehicle2.percentage.toFixed(2)} <span className="text-sm">%</span>
                                </div>
                                <div className="inline-block bg-red-50 text-red-700 px-1.5 py-0.5 rounded text-xs font-bold border border-red-100 mt-1">
                                    + {result.vehicle2.difference.toLocaleString()} kg
                                </div>
                           </div>
                       ) : (
                           <div className="flex justify-between items-end mb-1"><span className="text-[10px] text-slate-500">Netto:</span><span className="text-sm font-black text-slate-800">{result.vehicle2.netWeight.toLocaleString()} kg</span></div>
                    )}
                   </div>
                     
                    <div>
                        {checkConfiscation(result.vehicle2) && (
                            <div className="mt-2 bg-red-100 border border-red-300 text-red-800 px-2 py-1.5 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1.5 animate-pulse uppercase tracking-wide shadow-sm">
                                <AlertTriangle className="w-4 h-4 shrink-0" />
                                 <span>⚠️ Einziehung möglich!</span>
                            </div>
                        )}
 
                        {typeof OverloadFormulaDisplay !== 'undefined' && <OverloadFormulaDisplay values={{ actual: result.vehicle2.actual, tolerance: result.vehicle2.tolerance, net: result.vehicle2.netWeight, allowed: result.vehicle2.allowed, diff: result.vehicle2.difference, percent: result.vehicle2.percentage }} />}
                        <FineDisplay result={result.vehicle2} isTrailer={true} isCombination={false} />
                    </div>
                 </div>
             )}
          </div>
 
         {result.total && result.total.isValidInput && (
              <div className={`mt-2 p-3 rounded-2xl border-4 shadow-xl transition-all ${result.total.isOverloaded ? 'bg-red-50 border-red-600' : 'bg-slate-50 border-slate-400'}`}>
               <div className="flex justify-between items-center mb-1.5">
                   <span className="font-black text-slate-800 flex items-center gap-1.5 text-base uppercase tracking-wider">
                       <Truck className="w-6 h-6"/> Gesamter Zug
                   </span>
                   <span className={`px-3 py-1 rounded-lg text-sm font-black uppercase ${result.total.isOverloaded ? 'bg-red-600 text-white' : 'bg-slate-600 text-white'}`}>{result.total.isOverloaded ? 'ZUG ÜBERLADEN' : 'ZUG OK'}</span>
               </div>
                   {result.total.isOverloaded ? (
                   <div className="text-center py-4">
                       <div className="text-5xl font-black text-red-600 tracking-tighter drop-shadow-sm">
                           {result.total.percentage.toFixed(2)} <span className="text-2xl">%</span>
                       </div>
                        <div className="text-sm font-bold uppercase text-red-400 mb-2">Gesamt-Überladung</div>
                       <div className="inline-block bg-white text-red-700 px-3 py-1 rounded-lg text-base font-black border border-red-100 shadow-sm">
                            + {result.total.difference.toLocaleString()} kg
                       </div>
                   </div>
                    ) : (
                       <>
                       <div className="flex justify-between items-end mb-2 mt-2">
                           <span className="text-xs font-bold text-slate-500 uppercase">Gewicht (Vorwerfbar):</span>
                           <span className="text-2xl font-black text-slate-900">{result.total.netWeight.toLocaleString()} kg</span>
                          </div>
                       <div className="relative h-4 bg-white rounded-full overflow-hidden border border-slate-300">
                           <div className={`h-full transition-all duration-500 ${result.total.isOverloaded ? 'bg-red-600' : 'bg-slate-600'}`} style={{ width: `${Math.min(100, (result.total.netWeight / result.total.allowed) * 100)}%` }}></div>
                       </div>
                       <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-1 uppercase">
                           <span>0 kg</span>
                           <span>Max: {parseFloat(result.total.allowed).toLocaleString()} kg</span>
                       </div>
                       </>
                    )}
 
                    {checkConfiscation(result.total) && (
                        <div className="mt-4 bg-red-100 border border-red-400 text-red-800 px-3 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 animate-pulse uppercase tracking-widest shadow-inner">
                            <AlertTriangle className="w-5 h-5 shrink-0" />
                            <span>⚠️ Einziehung möglich!</span>
                        </div>
                    )}
 
                   {typeof OverloadFormulaDisplay !== 'undefined' && <OverloadFormulaDisplay values={{ actual: result.total.actual, tolerance: result.total.tolerance, net: result.total.netWeight, allowed: result.total.allowed, diff: result.total.difference, percent: result.total.percentage }} isTotal={true} />}
                   <FineDisplay result={result.total} isTrailer={false} isCombination={true} />
               </div>
            )}
          <button onClick={resetForm} className="mt-6 w-full py-2.5 text-slate-400 text-sm hover:text-slate-600 font-bold tracking-wide uppercase transition-colors">Alle Eingaben löschen</button>
          
         {typeof PrintButton !== 'undefined' && <PrintButton />}
        </div>
      )}
     {typeof AppVersionFooter !== 'undefined' && <AppVersionFooter />}
    </div>
  );
}
 
// --- WEIGHT MODULE (COMBINED) ---
function WeightModule() {
  const [subTab, setSubTab] = useState('overload');
  return subTab === 'overload' ? (
      <OverloadCalculator onSwitch={() => setSubTab('wood')} />
  ) : (
      typeof WoodCalculator !== 'undefined' ? <WoodCalculator onSwitch={() => setSubTab('overload')} /> : <div>WoodCalculator nicht geladen</div>
  );
}
// --- LASHING CALCULATOR ---
function LashingCalculator({ onOpenKnowledge }) {
  const [lashingType, setLashingType] = useState('nieder'); // Toggle zwischen 'nieder', 'diagonal', 'pkw'
  
  const [allowedWeight, setAllowedWeight] = useState('');
  const [emptyWeight, setEmptyWeight] = useState('');
  const [loadWeight, setLoadWeight] = useState('');
  const FRICTION_OPTIONS = [
    { id: '0.20_dirty', val: 0.20, label: '0,20 μ - Nicht besenrein (verschmutzt)' },
    { id: '0.20_metal', val: 0.20, label: '0,20 μ - Metall auf Metall' },
    { id: '0.25_gitter', val: 0.25, label: '0,25 μ - Gitterbox auf Siebdruckboden' },
    { id: '0.25_kunststoff', val: 0.25, label: '0,25 μ - Kunststoffpalette auf Siebdruckboden' },
    { id: '0.25_papier', val: 0.25, label: '0,25 μ - Papierrolle auf Siebdruckboden' },
    { id: '0.30_holz_mehrweg', val: 0.30, label: '0,30 μ - Holzpalette Mehrweg auf Siebdruckboden' },
    { id: '0.35_papier_joloda', val: 0.35, label: '0,35 μ - Papierrolle Siebdruckboden mit Joloda' },
    { id: '0.35_stroh', val: 0.35, label: '0,35 μ - Strohballen auf Siebdruckboden' },
    { id: '0.40_kantholz', val: 0.40, label: '0,40 μ - Kantholz auf Siebdruckboden' },
    { id: '0.45_holz_einweg', val: 0.45, label: '0,45 μ - Holzpalette Einweg auf Siebdruckboden' },
    { id: '0.45_stahlkiste', val: 0.45, label: '0,45 μ - Stahlkiste auf Siebdruckboden' },
    { id: '0.45_gummireifen', val: 0.45, label: '0,45 μ - Gummireifen auf Siebdruckboden' },
    { id: '0.55_betonware', val: 0.55, label: '0,55 μ - Betonware auf Siebdruckboden' },
    { id: '0.60_antirutsch', val: 0.60, label: '0,60 μ - Antirutschmatte' },
  ];
  
  const [selectedFrictionId, setSelectedFrictionId] = useState('0.30_holz_mehrweg');
  const [customFrictionVal, setCustomFrictionVal] = useState(''); 
  const [friction, setFriction] = useState(0.30);
  
  useEffect(() => {
    if (selectedFrictionId === 'CUSTOM') {
       const val = parseFloat(customFrictionVal);
       setFriction(isNaN(val) ? 0 : val);
    } else {
       const option = FRICTION_OPTIONS.find(o => o.id === selectedFrictionId);
       if (option) setFriction(option.val);
    }
  }, [selectedFrictionId, customFrictionVal]);
  
  const [stf, setStf] = useState('500');
  const [angle, setAngle] = useState('90');
  const [angleBeta, setAngleBeta] = useState('45');
  const [wallFront, setWallFront] = useState(''); 
  const [wallSide, setWallSide] = useState('');    
  const [wallRear, setWallRear] = useState('');    
  const [fitFront, setFitFront] = useState(false);
  const [fitSide, setFitSide] = useState(false);
  const [fitRear, setFitRear] = useState(false);
  const [bodyCert, setBodyCert] = useState('NONE'); 
  const [lashingResult, setLashingResult] = useState(null);
  const [fineGroups, setFineGroups] = useState([]);
  
  // State für die mathematische Berechnung von Winkel Beta
  const [distX, setDistX] = useState('');
  const [distY, setDistY] = useState('');
  const [showInfoX, setShowInfoX] = useState(false);
  const [showInfoY, setShowInfoY] = useState(false);
  
  // State für die Handy-Winkelmessung
  const [isMeasureModalOpen, setIsMeasureModalOpen] = useState(false);
  const [activeAngleField, setActiveAngleField] = useState(null); // 'alpha' oder 'beta'
  
  // State für PKW-Transporter
  const [carsTop, setCarsTop] = useState([]);
  const [carsBottom, setCarsBottom] = useState([]);
  
  const createNewCar = () => ({
      id: Date.now() + Math.random(),
      weightClass: '',
      angle: '',
      exactAngle: null,
      orientation: '',
      isLast: false,
      noChocks: false,
      wheels: {
          fl: { strap: false, chock: 'none' },
          fr: { strap: false, chock: 'none' },
          rl: { strap: false, chock: 'none' },
          rr: { strap: false, chock: 'none' }
      }
  });
  
  const [showFines, setShowFines] = useState(false);
  const dateTime = useDateTime();
  
  const handleBlur = (type, val, setter) => {
    let num = parseFloat(val);
    if (isNaN(num)) setter('0');
  };
  
  // Automatische Berechnung von Beta über Tangens
  useEffect(() => {
    const x = parseFloat(distX);
    const y = parseFloat(distY);
    if (!isNaN(x) && !isNaN(y)) {
        if (x === 0 && y > 0) {
           setAngleBeta('90');
        } else if (x > 0) {
           const betaRad = Math.atan(y / x);
           const betaDeg = Math.round(betaRad * (180 / Math.PI));
           setAngleBeta(betaDeg.toString());
        }
    }
  }, [distX, distY]);
  
  const getStandardForces = () => {
    const total = parseFloat(allowedWeight) || 0;
    const empty = parseFloat(emptyWeight) || 0;
    const payload = Math.max(0, total - empty);
    if (bodyCert === 'L') return { front: 5000, side: Math.round(payload * 0.15), rear: 3100 };
    if (bodyCert === 'XL') return { front: Math.round(payload * 0.50), side: Math.round(payload * 0.30), rear: Math.round(payload * 0.40) };
    return { front: 0, side: 0, rear: 0 };
  };
  
  useEffect(() => {
    const standards = getStandardForces();
    if (bodyCert === 'NONE' || bodyCert === null) {
       setWallFront('0'); setWallSide('0'); setWallRear('0');
    } else {
       setWallFront(standards.front.toString()); setWallSide(standards.side.toString()); setWallRear(standards.rear.toString());
    }
  }, [bodyCert, allowedWeight, emptyWeight]);
  
  useEffect(() => {
    setFineGroups([]);
    const m = parseFloat(loadWeight);
    const mu = parseFloat(friction);
    const s_tf = parseFloat(stf);
    const alpha = parseFloat(angle);
    const beta = parseFloat(angleBeta);
    const maxWeight = parseFloat(allowedWeight);
  
    if (isNaN(m) || m <= 0) {
      setLashingResult(null); return;
    }
    
    let groups = [];
    if (maxWeight > 0) {
        if (maxWeight > 3500) {
           groups.push({ title: 'LKW bzw. dessen Anhänger (> 3,5t)', items: [{ role: 'Fahrer', code: '122600', cost: '60 €', points: '1 Pkt' }, { role: 'Halter', code: '331618', cost: '270 €', points: '1 Pkt', note: 'Nur wenn nicht genug Zurrmittel bereitgestellt' }] });
        } else {
           if (bodyCert === 'L' || bodyCert === 'XL') {
               groups.push({ title: 'LKW bzw. dessen Anhänger', items: [{ role: 'Fahrer', code: '122600', cost: '60 €', points: '1 Pkt' }, { role: 'Halter', code: '331618', cost: '270 €', points: '1 Pkt', note: 'Nur wenn nicht genug Zurrmittel bereitgestellt' }] });
           } else {
               groups.push({ title: 'PKW bzw. dessen Anhänger', items: [{ role: 'Fahrer', code: '122100', cost: '35 €', points: '' }, { role: 'Halter', code: '331630', cost: '135 €', points: '1 Pkt', note: 'Nur wenn nicht genug Zurrmittel bereitgestellt' }] });
               groups.push({ title: 'LKW bzw. dessen Anhänger', items: [{ role: 'Fahrer', code: '122600', cost: '60 €', points: '1 Pkt' }, { role: 'Halter', code: '331618', cost: '270 €', points: '1 Pkt', note: 'Nur wenn nicht genug Zurrmittel bereitgestellt' }] });
           }
        }
    }
    setFineGroups(groups);
  
    const g = 9.81; 
    const alphaRad = (alpha * Math.PI) / 180; 
    const betaRad = (beta * Math.PI) / 180;
    const stfInNewton = s_tf * 10; 
  
    // ACCELERATION FACTOR SELECTION
    let accFwd, accSide, accRear;
    if (!maxWeight || maxWeight <= 1999) {
        accFwd = 0.90; accSide = 0.70; accRear = 0.50;
    } else if (maxWeight <= 3500) {
        accFwd = 0.80; accSide = 0.60; accRear = 0.50;
    } else {
        accFwd = 0.80; accSide = 0.50; accRear = 0.50;
    }
  
    // --- NIEDERZURREN CALCULATION ---
    const calculateN = (acc, blockingDaN, direction) => {
       const weightForce = m * g;
       const blockingForce = (parseFloat(blockingDaN) || 0) * 10; 
       let n = 0;
       if (!maxWeight || maxWeight <= 3500) {
           const numerator = (weightForce * acc) - blockingForce - (weightForce * mu);
           if (numerator <= 0) return 0;
           const denominator = 1.8 * Math.sin(alphaRad) * mu * stfInNewton;
           if (denominator <= 0) return 0; 
           n = numerator / denominator;
           return Math.floor(n); 
       } else {
           let safetyFactor = (direction === 'forward') ? 1.25 : 1.1; 
           const numerator = (weightForce * acc) - blockingForce - (weightForce * mu);
           if (numerator <= 0) return 0;
           const denominator = stfInNewton * 2 * mu * Math.sin(alphaRad); 
           if (denominator <= 0) return 0; 
           n = (numerator / denominator) * safetyFactor;
           return Math.ceil(n);
       }
    };
  
    const nForward = calculateN(accFwd, fitFront ? wallFront : 0, 'forward');
    const nSide = calculateN(accSide, fitSide ? wallSide : 0, 'side');
    const nRear = calculateN(accRear, fitRear ? wallRear : 0, 'rear');
  
    // --- DIAGONALZURREN CALCULATION ---
    const calcDiagLC = (c, isSide) => {
        const f_mu = mu * 0.75; // Anpassung: Reibbeiwert * 0.75
        const num = (m * g) * (c - f_mu); // Kraft in Newton
        if (num <= 0) return 0;
        
        // isSide -> sin(beta) (Querbeschleunigung), ansonsten cos(beta) (Längsbeschleunigung)
        const trigBeta = isSide ? Math.sin(betaRad) : Math.cos(betaRad);
        
        const geo = (Math.cos(alphaRad) * trigBeta) + (f_mu * Math.sin(alphaRad));
        if (geo <= 0) return 0;
        return (num / (2 * geo)) / 10; // Division durch 10 rechnet Newton in daN um
    };
  
    const lcDiagFwd = calcDiagLC(accFwd, false);
    const lcDiagSide = calcDiagLC(accSide, true);
    const lcDiagRear = calcDiagLC(accRear, false);
    
    // Die benötigte LC ist der Maximalwert aus allen Richtungen
    const diagLC = Math.ceil(Math.max(lcDiagFwd, lcDiagSide, lcDiagRear));
  
    setLashingResult({
      forward: nForward, side: nSide, rear: nRear,
      factorForward: accFwd, factorSide: accSide, factorRear: accRear,
      weightClassInfo: !maxWeight ? '< 2000 kg (Standard)' : maxWeight <= 1999 ? '< 2000 kg' : maxWeight <= 3500 ? '2000 - 3500 kg' : '> 3500 kg',
      displayValues: { weightForceN: m * g, c: accFwd, formForceN: (parseFloat(fitFront ? wallFront : 0) * 10), mu, alphaRad, stfNewton: stfInNewton },
      weightClass: maxWeight,
      lcDiagFwd, lcDiagSide, lcDiagRear,
      diagonalLC: diagLC,
      detailRows: [
        { label: 'Vorne', mu: mu, c: accFwd, angle: angle, hasFit: fitFront, force: fitFront ? wallFront : 0, result: nForward },
        { label: 'Seite', mu: mu, c: accSide, angle: angle, hasFit: fitSide, force: fitSide ? wallSide : 0, result: nSide },
        { label: 'Hinten', mu: mu, c: accRear, angle: angle, hasFit: fitRear, force: fitRear ? wallRear : 0, result: nRear },
      ]
    });
  }, [loadWeight, friction, stf, angle, angleBeta, allowedWeight, emptyWeight, fitFront, fitSide, fitRear, wallFront, wallSide, wallRear, bodyCert]);
  
  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen">
      
      {/* PRINT VIEW ONLY (Niederzurren) */}
      {lashingType === 'nieder' && (
      <div className="print-only print-container">
        <h1 className="print-title">LaSi-Protokoll (Niederzurren)</h1>
        <div className="print-meta">Erstellt am: {dateTime}</div>
  
        <h2 className="print-section">Eingabedaten</h2>
        <table className="print-table">
           <tbody>
              <tr><th>Ladungsgewicht</th><td>{loadWeight || 0} kg</td></tr>
              <tr><th>Reibbeiwert (μ)</th><td>{friction.toFixed(2)}</td></tr>
              <tr><th>Vertikalwinkel (α)</th><td>{angle}°</td></tr>
              <tr><th>Vorspannkraft (STF)</th><td>{stf} daN</td></tr>
              <tr><th>Fahrzeugaufbau</th><td>{bodyCert === 'NONE' ? 'Kein geprüfter Aufbau' : `Code ${bodyCert}`}</td></tr>
           </tbody>
        </table>
  
        <h2 className="print-section">Formschluss & Blockierkräfte</h2>
        <table className="print-table">
           <thead><tr><th>Richtung</th><th>Formschluss aktiv</th><th>Kraft (daN)</th></tr></thead>
           <tbody>
               <tr><td>Stirnwand</td><td>{fitFront ? 'Ja' : 'Nein'}</td><td>{fitFront ? wallFront : 0} daN</td></tr>
               <tr><td>Seite</td><td>{fitSide ? 'Ja' : 'Nein'}</td><td>{fitSide ? wallSide : 0} daN</td></tr>
               <tr><td>Heck</td><td>{fitRear ? 'Ja' : 'Nein'}</td><td>{fitRear ? wallRear : 0} daN</td></tr>
           </tbody>
        </table>
  
        {lashingResult && (
        <>
            <h2 className="print-section">Ergebnis: Erforderliche Gurte</h2>
            <table className="print-table">
               <thead><tr><th>Richtung</th><th>Berechnungsfaktor (c)</th><th>Winkel (α)</th><th>Mindestanzahl Gurte</th></tr></thead>
               <tbody>
                   <tr><td>Sicherung nach Vorne</td><td>{lashingResult.factorForward}g</td><td>{angle}°</td><td><strong>{lashingResult.forward}</strong></td></tr>
                   <tr><td>Sicherung zur Seite</td><td>{lashingResult.factorSide}g</td><td>{angle}°</td><td><strong>{lashingResult.side}</strong></td></tr>
                   <tr><td>Sicherung nach Hinten</td><td>{lashingResult.factorRear}g</td><td>{angle}°</td><td><strong>{lashingResult.rear}</strong></td></tr>
               </tbody>
           </table>
            <div className="print-result-box">
               <div className="print-result-header">Gesamtempfehlung</div>
               <div>Es sind mindestens <strong>{Math.max(lashingResult.forward, lashingResult.side, lashingResult.rear)}</strong> Zurrgurte (Niederzurren) bei einem Vertikalwinkel von <strong>{angle}°</strong> zu verwenden, um die Ladung in alle Richtungen zu sichern.</div>
           </div>

           {/* --- START: NEUER BERECHNUNGSNACHWEIS FÜR AUSDRUCK (NIEDERZURREN) --- */}
           <div className="mt-6 p-4 border-2 border-slate-300 rounded-xl bg-white text-black">
             <h3 className="text-md font-bold mb-3 border-b-2 border-black pb-1">
               Berechnungsnachweis nach VDI 2700
             </h3>
             <div className="space-y-3">
               <p className="font-semibold">Verfahren: Kraftschlüssige Ladungssicherung (Niederzurren)</p>
               <div className="font-mono text-sm p-4 bg-slate-50 rounded border border-slate-200">
                 <p className="font-bold mb-1 text-slate-500">Angewandte Formel:</p>
                 <p className="text-base mb-4">n = ((m · g · c) - F_Form - (m · g · μ)) / (k · μ · STF · sin(α))</p>
                 
                 <div className="pt-4 border-t border-slate-300">
                   <p className="font-bold mb-1 text-slate-500">Eingesetzte Werte (z.B. Sicherung nach vorn, Winkel α = {angle}°):</p>
                   <p>n = (({loadWeight || 0} · 9,81 · {lashingResult.factorForward}) - {fitFront ? wallFront * 10 : 0} - ({loadWeight || 0} · 9,81 · {friction.toFixed(2)})) / ({(!allowedWeight || allowedWeight <= 3500) ? '1,8' : '2'} · {friction.toFixed(2)} · {(stf || 0) * 10} · sin({angle || 0}°))</p>
                 </div>
               </div>
             </div>
           </div>
           {/* --- ENDE: NEUER BERECHNUNGSNACHWEIS --- */}
        </>
        )}
      </div>
      )}
  
      {/* PRINT VIEW ONLY (Diagonalzurren) */}
      {lashingType === 'diagonal' && (
      <div className="print-only print-container">
          <h1 className="print-title">LaSi-Protokoll (Diagonalzurren)</h1>
          <div className="print-meta">Erstellt am: {dateTime}</div>
  
          <h2 className="print-section">Eingabedaten</h2>
          <table className="print-table">
            <tbody>
                 <tr><th>Ladungsgewicht</th><td>{loadWeight || 0} kg</td></tr>
                 <tr><th>Reibbeiwert (μ)</th><td>{friction.toFixed(2)}</td></tr>
                 <tr><th>Vertikalwinkel (α)</th><td>{angle}°</td></tr>
                  <tr><th>Längswinkel (β)</th><td>{angleBeta}°</td></tr>
             </tbody>
         </table>
          
         {lashingResult && (
         <>
          <div className="print-result-box">
              <div className="print-result-header">Benötigte LC Werte je Gurt</div>
             <div>Gurte vorne (Sicherung nach hinten/seitlich): <strong>{Math.max(Math.ceil(lashingResult.lcDiagSide), Math.ceil(lashingResult.lcDiagRear))} daN</strong></div>
             <div>Gurte hinten (Sicherung nach vorne/seitlich): <strong>{Math.max(Math.ceil(lashingResult.lcDiagSide), Math.ceil(lashingResult.lcDiagFwd))} daN</strong></div>
          </div>

          {/* --- START: NEUER BERECHNUNGSNACHWEIS FÜR AUSDRUCK (DIAGONALZURREN) --- */}
          <div className="mt-6 p-4 border-2 border-slate-300 rounded-xl bg-white text-black">
            <h3 className="text-md font-bold mb-3 border-b-2 border-black pb-1">
              Berechnungsnachweis nach VDI 2700
            </h3>
            <div className="space-y-3">
              <p className="font-semibold">Verfahren: Formschlüssige Ladungssicherung (Diagonalzurren)</p>
              <div className="font-mono text-sm p-4 bg-slate-50 rounded border border-slate-200">
                <p className="font-bold mb-1 text-slate-500">Angewandte Formel:</p>
                <p className="text-base mb-4">LC = (m · g · (c_x - μ_D)) / (2 · (μ_D · cos(α) · cos(β) + sin(α)))</p>
                
                <div className="pt-4 border-t border-slate-300">
                  <p className="font-bold mb-1 text-slate-500">Eingesetzte Werte (z.B. Längsrichtung, Winkel α = {angle}°, Winkel β = {angleBeta}°):</p>
                  <p>LC = ({loadWeight || 0} · 9,81 · ({lashingResult.factorForward} - {friction.toFixed(2)})) / (2 · ({friction.toFixed(2)} · cos({angle || 0}°) · cos({angleBeta || 0}°) + sin({angle || 0}°)))</p>
                </div>
              </div>
            </div>
          </div>
          {/* --- ENDE: NEUER BERECHNUNGSNACHWEIS --- */}
         </>
         )}
      </div>
      )}
  
      {/* PRINT VIEW ONLY (PKW Transporter) */}
      {lashingType === 'pkw' && (
      <div className="print-only print-container" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
          <h1 className="print-title">LaSi-Protokoll (PKW-Transporter)</h1>
          <div className="print-meta">Erstellt am: {dateTime}</div>
  
          <h2 className="print-section">Ihre Eingabe (Ist-Zustand)</h2>
          
          <table className="print-table" style={{ marginTop: '15px' }}>
              <thead>
                  <tr><th>Ebene / Pos.</th><th>Gewicht</th><th>Winkel</th><th>Richtung</th><th>Besonderheiten</th></tr>
              </thead>
              <tbody>
                  {carsTop.map((car, idx) => (
                      <tr key={car.id}>
                          <td>Oben - PKW {idx + 1}</td>
                          <td>{car.weightClass === '2000' ? '≤ 2.000 kg' : car.weightClass === '3000' ? '> 2.000 - 3.000 kg' : car.weightClass === '4500' ? '> 3.000 - 4.500 kg' : '-'}</td>
                          <td>{car.exactAngle != null ? `${car.exactAngle}°` : (car.angle === '25' ? '±25°' : car.angle === '10_25' ? '+10° / -25°' : car.angle === '10' ? '±10°' : '-')}</td>
                          <td>{car.orientation === 'forward' ? 'Vorwärts' : car.orientation === 'backward' ? 'Rückwärts' : '-'}</td>
                          <td>{[car.isLast ? 'Letztes Fzg.' : '', car.noChocks ? 'Keine Keile' : ''].filter(Boolean).join(', ') || '-'}</td>
                      </tr>
                  ))}
                  {carsBottom.map((car, idx) => (
                      <tr key={car.id}>
                          <td>Unten - PKW {idx + 1}</td>
                          <td>{car.weightClass === '2000' ? '≤ 2.000 kg' : car.weightClass === '3000' ? '> 2.000 - 3.000 kg' : car.weightClass === '4500' ? '> 3.000 - 4.500 kg' : '-'}</td>
                          <td>{car.exactAngle != null ? `${car.exactAngle}°` : (car.angle === '25' ? '±25°' : car.angle === '10_25' ? '+10° / -25°' : car.angle === '10' ? '±10°' : '-')}</td>
                          <td>{car.orientation === 'forward' ? 'Vorwärts' : car.orientation === 'backward' ? 'Rückwärts' : '-'}</td>
                          <td>{[car.isLast ? 'Letztes Fzg.' : '', car.noChocks ? 'Keine Keile' : ''].filter(Boolean).join(', ') || '-'}</td>
                      </tr>
                  ))}
                  {carsTop.length === 0 && carsBottom.length === 0 && (
                      <tr><td colSpan="5" style={{ textAlign: 'center', fontStyle: 'italic', color: '#666' }}>Keine Fahrzeuge erfasst</td></tr>
                  )}
              </tbody>
          </table>
          
          <div style={{ display: 'flex', width: '100%', gap: '15px', justifyContent: 'center', marginTop: '20px', pageBreakInside: 'avoid' }}>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                 <SvgPkwTransporter deckName="Obere Ebene" cars={carsTop} showOrientation={true} />
             </div>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                 <SvgPkwTransporter deckName="Untere Ebene" cars={carsBottom} showOrientation={true} />
             </div>
          </div>
  
          <h2 className="print-section" style={{ marginTop: '30px' }}>Empfehlung nach VDI 2700 (Soll-Zustand)</h2>
          
          <div style={{ display: 'flex', width: '100%', gap: '15px', justifyContent: 'center', marginTop: '20px', pageBreakInside: 'avoid' }}>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                 <SvgPkwTransporter deckName="Obere Ebene" cars={carsTop.map(getRecommendedCarConfig)} />
             </div>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                 <SvgPkwTransporter deckName="Untere Ebene" cars={carsBottom.map(getRecommendedCarConfig)} />
             </div>
          </div>

          <div className="print-result-box" style={{ pageBreakInside: 'avoid', marginTop: '30px' }}>
             <div className="print-result-header">Legende</div>
             <table className="print-table" style={{ border: 'none', fontSize: '9pt' }}>
                <tbody>
                    <tr>
                        <td style={{ border: 'none', padding: '2px' }}><div style={{ width: '20px', height: '4px', backgroundColor: '#fde047', border: '1px solid #ca8a04' }}></div></td>
                         <td style={{ border: 'none', padding: '2px' }}>Radkeil</td>
                        <td style={{ border: 'none', padding: '2px' }}><div style={{ width: '20px', height: '4px', backgroundColor: '#3b82f6', border: '1px solid #1d4ed8' }}></div></td>
                        <td style={{ border: 'none', padding: '2px' }}>Autotransportgurt</td>
                        <td style={{ border: 'none', padding: '2px' }}><div style={{ width: '20px', height: '10px', border: '2px solid #94a3b8', borderTop: 'none' }}></div></td>
                        <td style={{ border: 'none', padding: '2px' }}>Mulde / Brille</td>
                        <td style={{ border: 'none', padding: '2px' }}><div style={{ width: '10px', height: '20px', backgroundColor: '#0f172a', borderRadius: '2px' }}></div></td>
                        <td style={{ border: 'none', padding: '2px' }}>Rad</td>
                    </tr>
                </tbody>
            </table>
          </div>
      </div>
      )}
      {/* END PRINT VIEW */}
  
      <div className={`${lashingType === 'nieder' ? 'bg-indigo-600/95 shadow-indigo-900/10' : lashingType === 'diagonal' ? 'bg-cyan-600/95 shadow-cyan-900/10' : 'bg-rose-600/95 shadow-rose-900/10'} backdrop-blur-md p-4 text-white flex items-center justify-between sticky top-0 z-20 shadow-lg no-print transition-colors duration-300`}>
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2 leading-tight tracking-tight">
           {lashingType === 'nieder' ? <LashingStrapIcon className="w-5 h-5 shrink-0" /> : lashingType === 'diagonal' ? <DiagonalLashingIcon className="w-5 h-5 shrink-0" /> : <Car className="w-5 h-5 shrink-0" />}
           LaSi-Rechner
          </h1>
          <p className={`${lashingType === 'nieder' ? 'text-indigo-100' : lashingType === 'diagonal' ? 'text-cyan-100' : 'text-rose-100'} text-xs opacity-90 mt-0.5 font-mono flex items-center gap-1.5 ml-7 transition-colors duration-300`}>
             <Clock className="w-3 h-3" />
            {dateTime}
          </p>
        </div>
        <HeaderLogo />
      </div>
  
     <AngleMeasureModal 
         isOpen={isMeasureModalOpen} 
         activeField={activeAngleField}
         onClose={() => {
            setIsMeasureModalOpen(false);
            setActiveAngleField(null);
         }} 
         onApply={(a) => {
             if (activeAngleField === 'alpha') setAngle(a.toString());
             else if (activeAngleField === 'beta') setAngleBeta(a.toString());
             else if (activeAngleField && activeAngleField.startsWith('pkw_')) {
                 const parts = activeAngleField.split('_');
                 const deck = parts[1]; // 'top' oder 'bottom'
                 const carId = parseFloat(parts[2]);

                 let mappedAngle = a <= 10 ? '10' : '25';

                 if (deck === 'top') {
                     setCarsTop(prev => prev.map(c => c.id === carId ? { ...c, angle: mappedAngle, exactAngle: a } : c));
                 } else if (deck === 'bottom') {
                     setCarsBottom(prev => prev.map(c => c.id === carId ? { ...c, angle: mappedAngle, exactAngle: a } : c));
                 }
             }
            setIsMeasureModalOpen(false);
            setActiveAngleField(null);
         }} 
    />
  
      <div className="p-2 space-y-2 no-print">
        
        {/* Toggle Niederzurren / Diagonalzurren / PKW */}
        <div className="bg-white p-1 rounded-xl flex shadow-sm border border-slate-100 mb-2 gap-1 overflow-x-auto custom-scrollbar" style={{ WebkitOverflowScrolling: 'touch' }}>
           <button onClick={() => setLashingType('nieder')} className={`flex-1 min-w-[100px] py-2 rounded-lg transition-all flex flex-col items-center gap-1 ${lashingType === 'nieder' ? 'bg-indigo-50 text-indigo-800 shadow-sm ring-1 ring-indigo-200' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}>
               <LashingStrapIcon className="w-6 h-6" />
               <span className="text-[10px] font-bold uppercase">Niederzurren</span>
           </button>
           <button onClick={() => setLashingType('diagonal')} className={`flex-1 min-w-[100px] py-2 rounded-lg transition-all flex flex-col items-center gap-1 ${lashingType === 'diagonal' ? 'bg-cyan-50 text-cyan-800 shadow-sm ring-1 ring-cyan-200' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}>
               <DiagonalLashingIcon className="w-6 h-6" />
               <span className="text-[10px] font-bold uppercase">Diagonalzurren</span>
           </button>
           <button onClick={() => setLashingType('pkw')} className={`flex-1 min-w-[100px] py-2 rounded-lg transition-all flex flex-col items-center gap-1 ${lashingType === 'pkw' ? 'bg-rose-50 text-rose-800 shadow-sm ring-1 ring-rose-200' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}>
               <Car className="w-6 h-6" />
               <span className="text-[10px] font-bold uppercase">PKW-Transp.</span>
           </button>
        </div>
  
        {/* --- WISSEN-LINK --- */}
       {onOpenKnowledge && (
            <button
               onClick={() => onOpenKnowledge(lashingType === 'pkw' ? 'pkw' : 'lasi')}
                className={`w-full flex items-center justify-center gap-2 p-2.5 rounded-xl mb-2 text-xs font-bold transition-all border shadow-sm ${
                   lashingType === 'pkw' 
                    ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200 hover:border-rose-300' 
                    : lashingType === 'diagonal'
                    ? 'bg-cyan-50 hover:bg-cyan-100 text-cyan-800 border-cyan-200 hover:border-cyan-300'
                    : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200 hover:border-indigo-300'
                }`}
            >
               <BookOpen className="w-4 h-4" />
               {lashingType === 'pkw' ? 'Wissensdatenbank: PKW-Transporter öffnen' : 'Wissensdatenbank: Ladungssicherung öffnen'}
           </button>
        )}
  
        {lashingType === 'nieder' ? (
        <>
           {/* AUFBAU CARD */}
          <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 break-inside-avoid">
               <div className="mb-2 text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
                   <ShieldCheck className="w-3.5 h-3.5" /> Fahrzeugaufbau wählen
               </div>
               <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => setBodyCert('NONE')} className={`col-span-2 py-2.5 rounded-xl font-bold text-xs sm:text-sm border-2 flex items-center justify-center gap-1.5 transition-all ${bodyCert === 'NONE' ? 'bg-slate-700 text-white border-slate-700 shadow-md transform scale-[1.02]' : 'bg-white text-slate-500 border-slate-100 hover:border-indigo-200'}`}>
                         <span>Kein geprüfter Aufbau</span>
                   </button>
                   <button onClick={() => setBodyCert('L')} className={`py-2.5 rounded-xl font-bold text-xs sm:text-sm border-2 flex items-center justify-center gap-1.5 transition-all ${bodyCert === 'L' ? 'bg-indigo-600 text-white border-indigo-600 shadow-md transform scale-[1.02]' : 'bg-white text-slate-500 border-slate-100 hover:border-indigo-200'}`}>
                       <span>Code L</span>
                   </button>
                    <button onClick={() => setBodyCert('XL')} className={`py-2.5 rounded-xl font-bold text-xs sm:text-sm border-2 flex items-center justify-center gap-1.5 transition-all ${bodyCert === 'XL' ? 'bg-indigo-600 text-white border-indigo-600 shadow-md transform scale-[1.02]' : 'bg-white text-slate-500 border-slate-100 hover:border-indigo-200'}`}>
                       <span>Code XL</span>
                   </button>
               </div>
           </div>
  
           {/* GEWICHTE CARD */}
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 break-inside-avoid">
               <div className="flex items-center gap-1.5 mb-2 text-indigo-700">
                 <Scale className="w-5 h-5" />
                 <span className="text-sm font-black uppercase tracking-wide">Gewicht</span>
              </div>
               <div className="grid grid-cols-2 gap-2 mb-2">
                <InputWithIcon icon={Truck} label="Leergewicht (kg)" value={emptyWeight} onChange={(e) => setEmptyWeight(e.target.value)} placeholder="0" />
                <InputWithIcon icon={ShieldCheck} label="Zul. Gesamt (kg)" value={allowedWeight} onChange={(e) => setAllowedWeight(e.target.value)} placeholder="0" />
              </div>
              <InputWithIcon icon={Box} label="Ladungsgewicht (kg)" value={loadWeight} onChange={(e) => setLoadWeight(e.target.value)} placeholder="0" />
           </div>
  
           {/* SETTINGS CARD */}
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 break-inside-avoid">
              <div className="flex items-center gap-1.5 mb-2 text-indigo-700">
                 <Settings className="w-5 h-5" />
                  <span className="text-sm font-black uppercase tracking-wide">Parameter</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
               <div className="relative col-span-2 sm:col-span-1">
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-0.5 ml-1">Reibbeiwert (μ)</label>
                   {selectedFrictionId === 'CUSTOM' ? (
                     <div className="flex gap-1">
                       <div className="relative w-full">
                           <input type="number" step="0.01" value={customFrictionVal} onChange={(e) => setCustomFrictionVal(e.target.value)} className="w-full bg-white border-2 border-indigo-500 rounded-xl px-3 py-2.5 text-base focus:outline-none focus:ring-0 font-medium text-slate-800" placeholder="z.B. 0.33" autoFocus />
                           <span className="absolute right-3 top-2.5 text-slate-400 font-bold pointer-events-none">μ</span>
                       </div>
                        <button onClick={() => { setSelectedFrictionId('0.30_holz_mehrweg'); setFriction(0.3); }} className="bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-xl px-3 flex items-center justify-center transition-colors no-print" title="Zurück zur Liste"><X className="w-5 h-5" /></button>
                     </div>
                    ) : (
                     <select value={selectedFrictionId} onChange={(e) => setSelectedFrictionId(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none font-medium truncate pr-8">
                       {FRICTION_OPTIONS.map((opt) => (<option key={opt.id} value={opt.id}>{opt.label}</option>))}
                       <option disabled>──────────</option>
                       <option value="CUSTOM">Eigener Wert...</option>
                      </select>
                    )}
               </div>
  
               <div className="relative col-span-2 sm:col-span-1">
                   <label className="block text-xs font-bold text-slate-400 uppercase mb-0.5 ml-1">Winkel α (°)</label>
                   <div className="flex gap-1.5">
                       <div className="relative w-full">
                            <input type="number" min="0" max="90" value={angle} onChange={(e) => setAngle(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium" placeholder="90" />
                            <span className="absolute right-3 top-2.5 text-slate-400 font-bold pointer-events-none">°</span>
                       </div>
                       <button onClick={() => { setActiveAngleField('alpha'); setIsMeasureModalOpen(true); }} className="bg-indigo-600 text-white rounded-xl px-3.5 flex items-center justify-center hover:bg-indigo-700 active:scale-95 transition-all shadow-md shadow-indigo-200 no-print" title="Winkel messen"><SpiritLevelIcon className="w-5 h-5" /></button>
                   </div>
               </div>
  
               <div className="col-span-2 relative">
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-0.5 ml-1">Vorspannkraft STF (daN)</label>
                    <select value={stf} onChange={(e) => setStf(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none font-medium">
                       {[100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1100, 1200, 1300, 1400, 1500].map((val) => (<option key={val} value={val}>{val} daN</option>))}
                   </select>
               </div>
             </div>
           </div>
  
           {/* FORMSCHLUSS CARD */}
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 break-inside-avoid">
               <div className="flex items-center gap-1.5 mb-2 text-indigo-700">
                 <Box className="w-5 h-5" />
                 <span className="text-sm font-black uppercase tracking-wide">Aufbau Belastbarkeit (daN)</span>
              </div>
               
               <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 mb-1">
                    <input type="checkbox" checked={fitFront} onChange={(e) => setFitFront(e.target.checked)} id="cb_front" className="w-3.5 h-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" />
                    <label htmlFor="cb_front" className="text-xs font-bold text-slate-600 uppercase cursor-pointer select-none">Formschluss</label>
                  </div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-0.5">Stirnwand</label>
                  <input type="number" inputMode="numeric" disabled={!fitFront} value={wallFront} onChange={(e) => setWallFront(e.target.value)} onBlur={(e) => handleBlur('front', e.target.value, setWallFront)} placeholder="0" className={`w-full border rounded px-1.5 py-2 text-sm text-center focus:outline-none focus:ring-2 transition-all ${fitFront ? 'bg-white border-indigo-300 focus:ring-indigo-500 text-slate-800' : 'bg-slate-100 border-slate-200 text-slate-400'}`} />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 mb-1">
                    <input type="checkbox" checked={fitSide} onChange={(e) => setFitSide(e.target.checked)} id="cb_side" className="w-3.5 h-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" />
                    <label htmlFor="cb_side" className="text-xs font-bold text-slate-600 uppercase cursor-pointer select-none">Formschluss</label>
                  </div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-0.5">Seite</label>
                  <input type="number" inputMode="numeric" disabled={!fitSide} value={wallSide} onChange={(e) => setWallSide(e.target.value)} onBlur={(e) => handleBlur('side', e.target.value, setWallSide)} placeholder="0" className={`w-full border rounded px-1.5 py-2 text-sm text-center focus:outline-none focus:ring-2 transition-all ${fitSide ? 'bg-white border-indigo-300 focus:ring-indigo-500 text-slate-800' : 'bg-slate-100 border-slate-200 text-slate-400'}`} />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 mb-1">
                    <input type="checkbox" checked={fitRear} onChange={(e) => setFitRear(e.target.checked)} id="cb_rear" className="w-3.5 h-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" />
                     <label htmlFor="cb_rear" className="text-xs font-bold text-slate-600 uppercase cursor-pointer select-none">Formschluss</label>
                  </div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-0.5">Heck</label>
                  <input type="number" inputMode="numeric" disabled={!fitRear} value={wallRear} onChange={(e) => setWallRear(e.target.value)} onBlur={(e) => handleBlur('rear', e.target.value, setWallRear)} placeholder="0" className={`w-full border rounded px-1.5 py-2 text-sm text-center focus:outline-none focus:ring-2 transition-all ${fitRear ? 'bg-white border-indigo-300 focus:ring-indigo-500 text-slate-800' : 'bg-slate-100 border-slate-200 text-slate-400'}`} />
                </div>
              </div>
               
               <div className="mt-2 flex gap-2 items-start text-xs text-slate-500 bg-slate-50 p-2 rounded-xl">
                 <Info className="w-4 h-4 shrink-0 mt-0.5 text-indigo-400" />
                  <p>Formschluss gilt bis 5 cm Abstand (hinten max. 30 cm).</p>
              </div>
           </div>
  
           {/* RESULTAT NIEDERZURREN */}
           {lashingResult !== null && (
              <div className="space-y-3 pb-20 break-inside-avoid print-full-width">
               <div className="border-2 rounded-2xl p-4 mt-4 shadow-xl bg-white border-indigo-100 shadow-indigo-100">
                 
                 <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
                   <h3 className="text-sm font-black uppercase tracking-wider text-slate-400">Erforderliche Gurte</h3>
                   <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-500">
                      {lashingResult.weightClassInfo}
                   </span>
                 </div>
                  
                 <div className="grid grid-cols-3 gap-3">
                    {[
                       { label: 'Vorne', count: lashingResult.forward, factor: lashingResult.factorForward, hasFit: fitFront },
                       { label: 'Seite', count: lashingResult.side, factor: lashingResult.factorSide, hasFit: fitSide },
                       { label: 'Hinten', count: lashingResult.rear, factor: lashingResult.factorRear, hasFit: fitRear }
                   ].map((res, idx) => (
                       <div key={idx} className="flex flex-col items-center p-2 rounded-xl bg-slate-50">
                           <span className="text-4xl font-black text-indigo-600">{res.count}</span>
                           <span className="text-xs font-bold uppercase text-slate-400 mt-0.5">{res.label}</span>
                           <div className="flex flex-col items-center gap-0.5">
                                <span className="text-[10px] text-slate-300">({res.factor}g)</span>
                                <span className={`text-[10px] font-bold ${res.hasFit ? 'text-emerald-600' : 'text-slate-300'}`}>
                                    {res.hasFit ? (
                                        <span className="flex items-center gap-0.5"><CheckCircle className="w-2.5 h-2.5" /> Formschl.</span>
                                    ) : 'Kein Formschl.'}
                                </span>
                           </div>
                        </div>
                   ))}
                 </div>
  
                  <div className="mt-4 p-3 rounded-xl flex items-center justify-between bg-indigo-50 text-indigo-900">
                    <span className="text-xs font-bold uppercase tracking-wide opacity-70">Minimum:</span>
                    <div className="text-3xl font-black">
                       {Math.max(lashingResult.forward, lashingResult.side, lashingResult.rear)} <span className="text-base font-bold opacity-60">Gurte</span>
                     </div>
                  </div>
                   
                  <LashingFormulaDisplay values={lashingResult.displayValues} details={lashingResult.detailRows} weightClass={lashingResult.weightClass} />
               </div>
            </div>
            )}
        </>
        ) : lashingType === 'diagonal' ? (
            <>
               {/* HINWEIS FREISTEHENDE LADUNG */}
               <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-xl flex gap-2.5 items-center mb-2 shadow-sm break-inside-avoid animate-in fade-in">
                   <Info className="w-5 h-5 shrink-0 text-indigo-500" />
                   <span className="text-xs font-bold text-indigo-800 leading-tight">
                       Wichtig: Diagonalzurren ist nur bei <span className="underline decoration-indigo-300 decoration-2 underline-offset-2">freistehender Ladung</span> anwendbar!
                   </span>
               </div>
  
               {/* GEWICHTE CARD (Diagonalzurren) */}
               <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 break-inside-avoid">
                  <div className="flex items-center gap-1.5 mb-2 text-indigo-700">
                     <Scale className="w-5 h-5" />
                     <span className="text-sm font-black uppercase tracking-wide">Gewicht</span>
                  </div>
                  <InputWithIcon icon={Box} label="Ladungsgewicht (kg)" value={loadWeight} onChange={(e) => setLoadWeight(e.target.value)} placeholder="0" />
               </div>
  
               {/* SETTINGS CARD (Diagonalzurren) */}
               <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 break-inside-avoid">
                 <div className="flex items-center gap-1.5 mb-2 text-indigo-700">
                     <Settings className="w-5 h-5" />
                     <span className="text-sm font-black uppercase tracking-wide">Parameter</span>
                  </div>
                 <div className="grid grid-cols-2 gap-2">
                   <div className="relative col-span-2">
                       <label className="block text-xs font-bold text-slate-400 uppercase mb-0.5 ml-1">Reibbeiwert (μ)</label>
                       {selectedFrictionId === 'CUSTOM' ? (
                         <div className="flex gap-1">
                           <div className="relative w-full">
                                <input type="number" step="0.01" value={customFrictionVal} onChange={(e) => setCustomFrictionVal(e.target.value)} className="w-full bg-white border-2 border-indigo-500 rounded-xl px-3 py-2.5 text-base focus:outline-none focus:ring-0 font-medium text-slate-800" placeholder="z.B. 0.33" autoFocus />
                                <span className="absolute right-3 top-2.5 text-slate-400 font-bold pointer-events-none">μ</span>
                           </div>
                           <button onClick={() => { setSelectedFrictionId('0.30_holz_mehrweg'); setFriction(0.3); }} className="bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-xl px-3 flex items-center justify-center transition-colors no-print" title="Zurück zur Liste"><X className="w-5 h-5" /></button>
                         </div>
                       ) : (
                         <select value={selectedFrictionId} onChange={(e) => setSelectedFrictionId(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none font-medium truncate pr-8">
                           {FRICTION_OPTIONS.map((opt) => (<option key={opt.id} value={opt.id}>{opt.label}</option>))}
                           <option disabled>──────────</option>
                           <option value="CUSTOM">Eigener Wert...</option>
                         </select>
                      )}
                   </div>
  
                   <div className="relative col-span-2">
                       <label className="block text-xs font-bold text-slate-400 uppercase mb-0.5 ml-1">Vertikalwinkel α</label>
                       <div className="flex gap-1.5">
                           <div className="relative w-full">
                                 <input type="number" min="0" max="90" value={angle} onChange={(e) => setAngle(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium" placeholder="z.B. 30" />
                                 <span className="absolute right-3 top-2.5 text-slate-400 font-bold pointer-events-none">°</span>
                           </div>
                           <button onClick={() => { setActiveAngleField('alpha'); setIsMeasureModalOpen(true); }} className="bg-indigo-600 text-white rounded-xl px-3.5 flex items-center justify-center hover:bg-indigo-700 active:scale-95 transition-all shadow-md shadow-indigo-200 no-print" title="Winkel messen"><SpiritLevelIcon className="w-5 h-5" /></button>
                       </div>
                   </div>
  
                   <div className="relative col-span-2 bg-slate-50 p-3 rounded-xl border border-slate-200 mt-1">
                       <label className="block text-xs font-bold text-slate-700 uppercase mb-3 flex items-center gap-1.5"><Calculator className="w-4 h-4 text-indigo-500"/> Längswinkel β (Tangens-Berechnung)</label>
                       
                       <div className="grid grid-cols-2 gap-3 mb-3 items-start">
                           <div className="flex flex-col h-full">
                                <div className="flex justify-between items-center mb-1">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase" title="Abstand vom Zurrpunkt der Ladung zum Zurrpunkt am Fahrzeug, parallel zur Seite">Längsabstand X</label>
                                    <button onClick={() => setShowInfoX(!showInfoX)} className="text-indigo-400 hover:text-indigo-600 p-0.5 rounded-full hover:bg-indigo-50 transition-colors"><Info className="w-3.5 h-3.5"/></button>
                                </div>
                               <div className="relative mb-auto">
                                    <input type="number" step="0.1" value={distX} onChange={(e) => setDistX(e.target.value)} className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium shadow-sm" placeholder="z.B. 2.5" />
                                    <span className="absolute right-3 top-2 text-slate-400 font-bold text-xs pointer-events-none">m</span>
                               </div>
                                {showInfoX && (
                                    <div className="mt-1.5 p-2 bg-indigo-50 border border-indigo-100 rounded-lg text-[9px] leading-relaxed text-indigo-800 animate-in fade-in slide-in-from-top-1">
                                       <strong>Ankathete:</strong> Der Abstand in Längsrichtung (Abstand vom Zurrpunkt der Ladung zum Zurrpunkt am Fahrzeug, parallel zur Seite).
                                       <AnglePictogram highlight="X" />
                                    </div>
                                )}
                           </div>
                           <div className="flex flex-col h-full">
                                <div className="flex justify-between items-center mb-1">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase" title="Seitlicher Abstand vom Anschlagpunkt der Ladung zur Befestigungsschiene">Querabstand Y</label>
                                    <button onClick={() => setShowInfoY(!showInfoY)} className="text-indigo-400 hover:text-indigo-600 p-0.5 rounded-full hover:bg-indigo-50 transition-colors"><Info className="w-3.5 h-3.5"/></button>
                                </div>
                               <div className="relative mb-auto">
                                    <input type="number" step="0.1" value={distY} onChange={(e) => setDistY(e.target.value)} className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium shadow-sm" placeholder="z.B. 1.2" />
                                    <span className="absolute right-3 top-2 text-slate-400 font-bold text-xs pointer-events-none">m</span>
                               </div>
                                {showInfoY && (
                                    <div className="mt-1.5 p-2 bg-indigo-50 border border-indigo-100 rounded-lg text-[9px] leading-relaxed text-indigo-800 animate-in fade-in slide-in-from-top-1">
                                       <strong>Gegenkathete:</strong> Der seitliche Abstand vom Anschlagpunkt der Ladung zur Befestigungsschiene am Fahrzeug.
                                       <AnglePictogram highlight="Y" />
                                   </div>
                                )}
                           </div>
                       </div>
                       
                       <div className="flex gap-2 items-center bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
                           <label className="text-xs font-bold text-slate-500 uppercase ml-1 shrink-0 flex-1">Resultierender Winkel β:</label>
                           <div className="relative w-24 shrink-0">
                                 <input type="number" min="0" max="90" value={angleBeta} onChange={(e) => { setAngleBeta(e.target.value); setDistX(''); setDistY(''); }} className="w-full bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-lg px-2 py-1.5 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 font-black text-center" placeholder="45" />
                                 <span className="absolute right-2 top-1.5 text-indigo-400 font-bold pointer-events-none">°</span>
                           </div>
                       </div>
                   </div>
                 </div>
               </div>
  
               {/* RESULTAT DIAGONALZURREN */}
               {lashingResult !== null && (
                 <div className="space-y-3 pb-20 break-inside-avoid print-full-width">
                   <div className="border-2 rounded-2xl p-4 mt-4 shadow-xl bg-white border-indigo-100 shadow-indigo-100">
                     <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
                       <h3 className="text-sm font-black uppercase tracking-wider text-slate-400">Erforderliche Zugkraft (LC)</h3>
                      </div>
                      
                     <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex justify-center">
                        <svg viewBox="0 0 300 360" className="w-full max-w-[280px] h-auto drop-shadow-sm print-safe">
                           {/* Arrow Fahrtrichtung */}
                           <path d="M150 15 L150 45 M135 30 L150 15 L165 30" stroke="#94a3b8" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                            <text x="150" y="60" textAnchor="middle" className="text-[11px] font-black fill-slate-400 uppercase tracking-widest">Fahrtrichtung</text>
  
                           {/* Truck bed */}
                           <rect x="30" y="80" width="240" height="260" rx="12" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="4" />
                           <rect x="40" y="90" width="220" height="240" rx="8" fill="#f8fafc" stroke="none" />
                            
                           {/* Straps (Lines) */}
                           <line x1="100" y1="160" x2="40" y2="100" stroke="#4f46e5" strokeWidth="6" strokeLinecap="round"/>
                           <line x1="200" y1="160" x2="260" y2="100" stroke="#4f46e5" strokeWidth="6" strokeLinecap="round"/>
                           <line x1="100" y1="280" x2="40" y2="320" stroke="#4f46e5" strokeWidth="6" strokeLinecap="round"/>
                           <line x1="200" y1="280" x2="260" y2="320" stroke="#4f46e5" strokeWidth="6" strokeLinecap="round"/>
  
                           {/* Cargo */}
                           <rect x="100" y="160" width="100" height="120" rx="4" fill="#fcd34d" stroke="#f59e0b" strokeWidth="4" />
                          <text x="150" y="225" textAnchor="middle" className="text-sm font-black fill-amber-700 tracking-widest">LADUNG</text>
  
                           {/* Badges Front Straps */}
                           <g transform="translate(10, 115)">
                                <rect x="0" y="0" width="70" height="24" rx="6" fill="#fff" stroke="#c7d2fe" strokeWidth="2" />
                                <text x="35" y="16" textAnchor="middle" className="text-[10px] font-black fill-indigo-700">{Math.max(Math.ceil(lashingResult.lcDiagSide), Math.ceil(lashingResult.lcDiagRear))} daN</text>
                           </g>
                           <g transform="translate(220, 115)">
                                <rect x="0" y="0" width="70" height="24" rx="6" fill="#fff" stroke="#c7d2fe" strokeWidth="2" />
                                <text x="35" y="16" textAnchor="middle" className="text-[10px] font-black fill-indigo-700">{Math.max(Math.ceil(lashingResult.lcDiagSide), Math.ceil(lashingResult.lcDiagRear))} daN</text>
                           </g>
  
                           {/* Badges Rear Straps */}
                           <g transform="translate(10, 290)">
                                <rect x="0" y="0" width="70" height="24" rx="6" fill="#fff" stroke="#c7d2fe" strokeWidth="2" />
                                <text x="35" y="16" textAnchor="middle" className="text-[10px] font-black fill-indigo-700">{Math.max(Math.ceil(lashingResult.lcDiagSide), Math.ceil(lashingResult.lcDiagFwd))} daN</text>
                           </g>
                           <g transform="translate(220, 290)">
                                <rect x="0" y="0" width="70" height="24" rx="6" fill="#fff" stroke="#c7d2fe" strokeWidth="2" />
                                <text x="35" y="16" textAnchor="middle" className="text-[10px] font-black fill-indigo-700">{Math.max(Math.ceil(lashingResult.lcDiagSide), Math.ceil(lashingResult.lcDiagFwd))} daN</text>
                           </g>
                        </svg>
                     </div>
                   </div>
                 </div>
                )}
           </>
        ) : lashingType === 'pkw' ? (
            <div className="animate-in fade-in duration-300 pb-20">
               {/* OBERE EBENE */}
               <div className="mb-6">
                   <div className="flex items-center justify-between bg-slate-800 text-white p-3 rounded-xl mb-3 shadow-md">
                       <span className="font-black uppercase tracking-widest text-sm flex items-center gap-2">
                           <Truck className="w-5 h-5" /> Obere Ebene
                        </span>
                       <span className="bg-slate-700 px-2 py-0.5 rounded text-xs font-mono font-bold">{carsTop.length} PKW</span>
                   </div>
                   
                   {carsTop.map((car, idx) => (
                    <PkwCarEditor 
                           key={car.id} 
                           car={car} 
                           index={idx} 
                           onUpdate={(updatedCar) => setCarsTop(carsTop.map(c => c.id === car.id ? updatedCar : c))}
                           onRemove={() => setCarsTop(carsTop.filter(c => c.id !== car.id))}
                           onMeasureAngle={() => {
                               setActiveAngleField(`pkw_top_${car.id}`);
                               setIsMeasureModalOpen(true);
                           }}
                       />
                   ))}
  
                   <button 
                       onClick={() => setCarsTop([...carsTop, createNewCar()])}
                       className="w-full py-3 bg-white border-2 border-dashed border-slate-300 hover:border-indigo-400 text-slate-500 hover:text-indigo-600 rounded-2xl font-bold uppercase tracking-wide text-xs transition-colors flex items-center justify-center gap-2"
                   >
                       <Car className="w-4 h-4" /> PKW Hinzufügen (Oben)
                   </button>
               </div>
  
                {/* UNTERE EBENE */}
               <div className="mb-6">
                   <div className="flex items-center justify-between bg-slate-700 text-white p-3 rounded-xl mb-3 shadow-md">
                       <span className="font-black uppercase tracking-widest text-sm flex items-center gap-2">
                           <Truck className="w-5 h-5 opacity-70" /> Untere Ebene
                       </span>
                       <span className="bg-slate-600 px-2 py-0.5 rounded text-xs font-mono font-bold">{carsBottom.length} PKW</span>
                   </div>
                   
                   {carsBottom.map((car, idx) => (
                       <PkwCarEditor 
                           key={car.id} 
                           car={car} 
                           index={idx} 
                           onUpdate={(updatedCar) => setCarsBottom(carsBottom.map(c => c.id === car.id ? updatedCar : c))}
                           onRemove={() => setCarsBottom(carsBottom.filter(c => c.id !== car.id))}
                           onMeasureAngle={() => {
                               setActiveAngleField(`pkw_bottom_${car.id}`);
                               setIsMeasureModalOpen(true);
                           }}
                       />
                   ))}
  
                   <button 
                       onClick={() => setCarsBottom([...carsBottom, createNewCar()])}
                       className="w-full py-3 bg-white border-2 border-dashed border-slate-300 hover:border-indigo-400 text-slate-500 hover:text-indigo-600 rounded-2xl font-bold uppercase tracking-wide text-xs transition-colors flex items-center justify-center gap-2"
                   >
                       <Car className="w-4 h-4" /> PKW Hinzufügen (Unten)
                   </button>
               </div>
  
                {/* LIVE PREVIEW & EMPFEHLUNG (SCREEN ONLY) */}
               {(carsTop.length > 0 || carsBottom.length > 0) && (
                   <div className="mt-8 pt-6 border-t border-slate-200 animate-in fade-in">
                       <div className="flex items-center justify-center gap-2 mb-4 text-indigo-700">
                           <Eye className="w-5 h-5" />
                           <h3 className="font-black uppercase tracking-wide text-sm">Ist-Zustand vs. Empfehlung</h3>
                       </div>
                       
                       <div className="flex flex-row gap-2 sm:gap-4 justify-center items-stretch w-full">
                           {/* IST-Zustand */}
                           <div className="flex-1 bg-slate-50 p-2 sm:p-4 rounded-xl border border-slate-200 flex flex-col items-center shadow-sm w-1/2 overflow-hidden">
                               <div className="flex flex-col items-center gap-1 mb-4 text-slate-500 text-center">
                                    <AlertTriangle className="w-4 h-4" />
                                    <h4 className="font-bold uppercase tracking-tight text-[10px] sm:text-xs">Ihre Eingabe</h4>
                               </div>
                               <div className="flex flex-col gap-4 justify-center w-full">
                                   {carsTop.length > 0 && (
                                        <div className="flex justify-center w-full">
                                            <SvgPkwTransporter deckName="Oben" cars={carsTop} showOrientation={true} />
                                        </div>
                                   )}
                                   {carsBottom.length > 0 && (
                                        <div className="flex justify-center w-full">
                                           <SvgPkwTransporter deckName="Unten" cars={carsBottom} showOrientation={true} />
                                        </div>
                                   )}
                               </div>
                           </div>

                           {/* SOLL-Zustand */}
                           <div className="flex-1 bg-emerald-50 p-2 sm:p-4 rounded-xl border border-emerald-200 flex flex-col items-center shadow-sm w-1/2 overflow-hidden">
                               <div className="flex flex-col items-center gap-1 mb-4 text-emerald-700 text-center">
                                    <CheckCircle className="w-4 h-4" />
                                    <h4 className="font-bold uppercase tracking-tight text-[10px] sm:text-xs">Empfehlung</h4>
                               </div>
                               <div className="flex flex-col gap-4 justify-center w-full">
                                   {carsTop.length > 0 && (
                                        <div className="flex justify-center w-full">
                                            <SvgPkwTransporter deckName="Oben" cars={carsTop.map(getRecommendedCarConfig)} />
                                        </div>
                                   )}
                                   {carsBottom.length > 0 && (
                                        <div className="flex justify-center w-full">
                                           <SvgPkwTransporter deckName="Unten" cars={carsBottom.map(getRecommendedCarConfig)} />
                                        </div>
                                   )}
                               </div>
                           </div>
                       </div>
                   </div>
                )}
           </div>
        ) : null}
        
        {/* STRAFTATBESTÄNDE - SICHTBAR FÜR BEIDE RECHNERARTEN */}
        {lashingType !== 'pkw' && lashingResult !== null && fineGroups.length > 0 && (
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex flex-col gap-3 shadow-sm mt-3 pb-20 break-inside-avoid print-full-width">
            <button onClick={() => setShowFines(!showFines)} className="flex items-center justify-between w-full no-print">
               <div className="flex items-center gap-2">
                   <Gavel className="w-5 h-5 text-slate-400" />
                   <h4 className="font-bold text-slate-600 text-xs uppercase">Mögliches Bußgeld (bei Verstoß)</h4>
               </div>
               {showFines ? <EyeOff className="w-4 h-4 text-slate-400"/> : <Eye className="w-4 h-4 text-slate-400"/>}
           </button>
            
            <div className={showFines ? 'block' : 'hidden print-visible'}>
               <div className="bg-white p-2 sm:p-3 rounded-xl border border-slate-200">
                   {fineGroups.map((group, gIdx) => (
                      <BkatRow 
                           key={gIdx} 
                           title={group.title} 
                           fines={group.items.map(item => ({ 
                                role: item.role, 
                                tbnr: item.code,
                                cost: item.cost, 
                                points: item.points, 
                                note: item.note
                           }))} 
                       />
                   ))}
              </div>
           </div>
          </div>
        )}
        
        {/* Print-Button für alle Reiter */}
        {((lashingType === 'nieder' && lashingResult !== null) || (lashingType === 'diagonal' && lashingResult !== null) || (lashingType === 'pkw' && (carsTop.length > 0 || carsBottom.length > 0))) && (
            <PrintButton />
        )}
  
      </div>
     <AppVersionFooter />
    </div>
  );
}

const StaticCarDiagram = ({ carConfig }) => {
    const renderWheelFeatures = (x, y, data) => (
        <g transform={`translate(${x}, ${y})`}>
            <rect x="0" y="0" width="10" height="25" fill="#0f172a" rx="1" />
            {data.chock === 'mulde' && <path d="M-4 -2 L-4 27 L14 27 L14 -2" fill="none" stroke="#94a3b8" strokeWidth="2" />}
            {(data.chock === 'front' || data.chock === 'both') && <line x1="-6" y1="-2" x2="16" y2="-2" stroke="#fde047" strokeWidth="2.5" />}
            {(data.chock === 'back' || data.chock === 'both') && <line x1="-6" y1="27" x2="16" y2="27" stroke="#fde047" strokeWidth="2.5" />}
            {data.strap && <line x1="5" y1="-10" x2="5" y2="35" stroke="#3b82f6" strokeWidth="3" opacity="0.9" />}
        </g>
    );

    return (
        <div className="flex justify-center bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-inner mb-4">
            <svg viewBox="0 0 130 160" className="w-full max-w-[160px] h-auto font-sans drop-shadow-sm print-safe">
                <g transform="translate(5, 5)">
                    <rect x="0" y="0" width="120" height="20" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" rx="2" />
                    <path d="M55 14 L60 6 L65 14" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <line x1="60" y1="6" x2="60" y2="18" stroke="#ef4444" strokeWidth="2" />
                </g>
                <g transform="translate(15, 35)">
                    {/* Schwarzer Kasten ohne Windschutzscheibe / Richtungspfeile */}
                    <rect x="25" y="10" width="50" height="90" fill="#1e293b" rx="2" />
                    
                    {renderWheelFeatures(8, 10, carConfig.fl)}
                    {renderWheelFeatures(82, 10, carConfig.fr)}
                    {renderWheelFeatures(8, 65, carConfig.rl)}
                    {renderWheelFeatures(82, 65, carConfig.rr)}
                </g>
            </svg>
        </div>
    );
};

const FahrtzweckeDropdown = ({ purposes }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <div className="bg-slate-50 border border-slate-200 p-2 sm:p-3 rounded-xl flex flex-col gap-3 shadow-sm mb-4">
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-between w-full text-left px-1">
                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center shrink-0">
                        <Info className="w-4 h-4 text-teal-600" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-700 text-xs uppercase">Erlaubte Fahrtzwecke</h4>
                        <div className="text-[10px] text-slate-500 font-medium mt-0.5">{isOpen ? 'Details ausblenden' : 'Details einblenden'}</div>
                    </div>
                </div>
                <div className="bg-white p-1.5 rounded-full shadow-sm border border-slate-200">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400"/> : <ChevronDown className="w-4 h-4 text-slate-400"/>}
                </div>
            </button>
            
            {isOpen && (
                <div className="space-y-4 pt-3 border-t border-slate-200 animate-in fade-in">
                    {purposes.includes('probe') && (
                        <div className="space-y-2">
                            <h5 className="font-black text-slate-800 text-sm">Probefahrt</h5>
                            <ul className="space-y-1.5 text-xs text-slate-700 font-medium pl-1">
                                <li className="flex gap-2 items-start"><div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0"></div><span>Es muss ein <strong>wirkliches Kaufinteresse</strong> bestehen. Der Fokus muss immer auf der Erprobung des Fahrzeugs liegen.</span></li>
                                <li className="flex gap-2 items-start"><div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0"></div><span>Eine Probefahrt kann <strong>mehrere Tage</strong> dauern (z.B. bei Wohnmobilen oder LKW). Ein PKW darf in der Regel <strong>nur 1 Tag</strong> ausgeliehen werden (VGH München).</span></li>
                                <li className="flex gap-2 items-start"><div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></div><span className="text-red-800"><strong>NICHT erlaubt:</strong> Reine Alltagsfahrten, wie z.B. eine bloße Essensabholung!</span></li>
                            </ul>
                        </div>
                    )}
                    {purposes.includes('ueberfuehrung') && (
                        <div className="space-y-2">
                            <h5 className="font-black text-slate-800 text-sm">Überführungsfahrt</h5>
                            <ul className="space-y-1.5 text-xs text-slate-700 font-medium pl-1">
                                <li className="flex gap-2 items-start"><div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0"></div><span>Fahrt des Käufers nach dem Kauf an einen Wohnort (auch Fahrten ins Ausland).</span></li>
                                <li className="flex gap-2 items-start"><div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0"></div><span>Fahrten zwischen verschiedenen Autohäusern.</span></li>
                                <li className="flex gap-2 items-start"><div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0"></div><span>Fahrten zum Tanken und zur Außenreinigung, sofern sie <strong>anlässlich</strong> von Probe-/Überführungsfahrten stattfinden.</span></li>
                            </ul>
                        </div>
                    )}
                    {purposes.includes('reparatur') && (
                        <div className="space-y-2">
                            <h5 className="font-black text-slate-800 text-sm">Reparatur- oder Wartungsfahrt</h5>
                            <ul className="space-y-1.5 text-xs text-slate-700 font-medium pl-1">
                                <li className="flex gap-2 items-start"><div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0"></div><span>Fahrten zur Beibehaltung der technischen Einsatzfähigkeit (Beseitigung von technischen Mängeln).</span></li>
                                <li className="flex gap-2 items-start"><div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0"></div><span>Die generelle Instandhaltung des Fahrzeugs.</span></li>
                            </ul>
                        </div>
                    )}
                    {purposes.includes('brauchtum') && (
                        <div className="space-y-2">
                            <h5 className="font-black text-slate-800 text-sm">Brauchtumspflege</h5>
                            <ul className="space-y-1.5 text-xs text-slate-700 font-medium pl-1">
                                <li className="flex gap-2 items-start"><div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0"></div><span>Teilnahme an Veranstaltungen, die der Darstellung von Oldtimer-Fahrzeugen und der Pflege des kraftfahrzeugtechnischen Kulturgutes dienen.</span></li>
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

function KnowledgeBaseView({ initialView = 'overview', onBack }) {
  const dateTime = useDateTime();
  const [view, setView] = useState(initialView); // Startet jetzt standardmäßig mit der Übersicht
  const [kzView, setKzView] = useState('kurzzeit'); // State für die Sonderkennzeichen
  const [alkDroView, setAlkDroView] = useState('ph1'); // State für Alkohol/Drogen Untermenü
  const [kcangView, setKcangView] = useState('besitz'); // State für KCanG Untermenü
  const [lasiAblegereife, setLasiAblegereife] = useState('gurte'); // State für LaSi Ablegereife Auswahl
  const [escooterSpeed, setEscooterSpeed] = useState('bis22'); // State für E-Scooter bbH
  const [escooterOrigin, setEscooterOrigin] = useState('de'); // State für E-Scooter Herkunft
  const [kindersitzView, setKindersitzView] = useState('sitz'); // State für Kindersitze Untermenü
  const [ebikeView, setEbikeView] = useState('pedelec25'); // State für E-Bike Untermenü
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [reifenExpanded, setReifenExpanded] = useState({ profil: true, winter: false, spikes: false }); // State für Reifen-Tatbestände

  useEffect(() => {
      if (initialView) setView(initialView);
  }, [initialView]);

  // Automatisches Scrollen nach ganz oben, wenn das Register gewechselt wird
  useEffect(() => {
      window.scrollTo(0, 0);
  }, [view, kzView, alkDroView, kcangView, lasiAblegereife, escooterSpeed, escooterOrigin, kindersitzView, ebikeView]);

  const tabs = [
      { id: 'blut', label: 'Blutentnahme', icon: Syringe, color: 'text-red-500', bg: 'bg-red-50' },
      { id: 'btm', label: 'BtM-Mengen', icon: AlertCircle, color: 'text-purple-500', bg: 'bg-purple-50' },
      { id: 'einziehung', label: 'Einziehung', icon: ScaleLaw, color: 'text-amber-500', bg: 'bg-amber-50' },
      { id: 'escooter', label: 'E-Scooter', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-50' },
      { id: 'alk_dro', label: 'Fahren u. Alkohol/Drogen', icon: AlertTriangle, color: 'text-rose-500', bg: 'bg-rose-50' },
      { id: 'hu', label: 'Hauptuntersuchung', icon: Search, color: 'text-teal-500', bg: 'bg-teal-50' },
      { id: 'juschg', label: 'Jugendschutz', icon: Users, color: 'text-amber-600', bg: 'bg-amber-50' },
      { id: 'kcang', label: 'KCanG (Cannabis)', icon: Trees, color: 'text-emerald-500', bg: 'bg-emerald-50' },
      { id: 'kindersitz', label: 'Sitz, Gurt & Helm', icon: Shield, color: 'text-pink-500', bg: 'bg-pink-50' },
      { id: 'kz', label: 'Kennzeichen', icon: FileText, color: 'text-cyan-500', bg: 'bg-cyan-50' },
      { id: 'lasi', label: 'Ladungssicherung', icon: LashingStrapIcon, color: 'text-indigo-500', bg: 'bg-indigo-50' },
      { id: 'ebike', label: 'Pedelec & E-Bike', icon: Bike, color: 'text-green-500', bg: 'bg-green-50' },
      { id: 'pkw', label: 'PKW-Transporter', icon: Car, color: 'text-blue-500', bg: 'bg-blue-50' },
      { id: 'rauchverbot', label: 'Rauchverbot', icon: CigaretteOff, color: 'text-slate-500', bg: 'bg-slate-100' },
      { id: 'reifen', label: 'Reifen', icon: CircleDashed, color: 'text-slate-600', bg: 'bg-slate-100' }
  ];

  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen relative">
      <div className="bg-teal-600/95 backdrop-blur-md p-4 text-white flex items-center justify-between sticky top-0 z-30 shadow-lg shadow-teal-900/10 no-print">
        <div className="flex items-center gap-3">
            {view !== 'overview' && (
                <button onClick={() => setIsMenuOpen(true)} className="p-2 -ml-2 bg-teal-700/50 hover:bg-teal-700 rounded-xl transition-colors border border-teal-500/30 flex items-center justify-center shadow-sm">
                    <Menu className="w-6 h-6" />
                </button>
            )}
            <div>
                <h1 className="text-xl font-bold flex items-center gap-2 leading-tight tracking-tight">Handbuch</h1>
                <p className="text-teal-100 text-xs opacity-90 mt-0.5 font-mono flex items-center gap-1.5"><Clock className="w-3 h-3" />{dateTime}</p>
            </div>
        </div>
        <HeaderLogo />
      </div>

      {/* SLIDE-IN MENU OVERLAY */}
      {isMenuOpen && (
         <div className="fixed inset-0 z-[100] flex no-print">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setIsMenuOpen(false)}></div>
            <div className="relative w-[260px] max-w-[85%] bg-slate-50 h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
               <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-white shadow-sm z-10 shrink-0">
                  <span className="font-black text-slate-700 uppercase tracking-wide flex items-center gap-2"><BookOpen className="w-5 h-5 text-teal-600"/> Kategorien</span>
                  <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-slate-200 hover:text-red-500 transition-colors"><X className="w-4 h-4"/></button>
               </div>
               <div className="flex-1 overflow-y-auto overscroll-contain p-3 space-y-2 pb-24 custom-scrollbar" style={{ WebkitOverflowScrolling: 'touch' }}>
                   
                   <button
                       onClick={() => { setView('overview'); setIsMenuOpen(false); }}
                       className={`w-full text-left px-4 py-3 text-sm font-bold rounded-xl transition-all flex items-center gap-3 ${view === 'overview' ? 'bg-slate-800 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}
                   >
                       <div className={`p-1.5 rounded-lg ${view === 'overview' ? 'bg-white/20' : 'bg-slate-100 text-slate-500'}`}><Home className="w-4 h-4" /></div>
                       Übersicht
                   </button>
                   
                   <div className="h-px bg-slate-200 w-full my-2"></div>
                   
                   {tabs.map(tab => (
                      <button
                         key={tab.id}
                         onClick={() => { setView(tab.id); setIsMenuOpen(false); }}
                         className={`w-full text-left px-4 py-3.5 text-sm font-bold rounded-xl transition-all flex items-center justify-between ${view === tab.id ? 'bg-teal-600 text-white shadow-md transform scale-[1.02]' : 'bg-white border border-slate-200 text-slate-600 hover:border-teal-300 hover:bg-teal-50'}`}
                      >
                         <div className="flex items-center gap-3">
                             <tab.icon className={`w-4 h-4 ${view === tab.id ? 'text-teal-200' : tab.color}`} />
                             {tab.label}
                         </div>
                         {view === tab.id && <ChevronRight className="w-4 h-4 text-teal-200" />}
                      </button>
                   ))}
               </div>
            </div>
         </div>
      )}

      {/* ZURÜCK BUTTON WENN AUS RECHNER GEÖFFNET */}
      {onBack && (
          <div className="p-2 pb-0 mt-2 no-print animate-in fade-in slide-in-from-top-2">
              <button
                  onClick={onBack}
                  className="w-full flex items-center justify-center gap-2 bg-slate-800 text-white p-3 rounded-xl text-sm font-bold shadow-md hover:bg-slate-700 active:scale-95 transition-all"
              >
                  <ChevronLeft className="w-5 h-5" />
                  Zurück zum vorherigen Rechner
              </button>
          </div>
      )}

      <div className={`p-2 animate-in fade-in duration-300 pb-20 no-print ${onBack ? 'mt-0' : 'mt-2'}`}>
            
            {/* ÜBERSICHT (Home-STYLE) */}
            {view === 'overview' && (
                <div className="grid grid-cols-2 gap-3 pt-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setView(tab.id)}
                            className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md hover:border-teal-200 transition-all active:scale-95 group"
                        >
                            <div className={`p-3 rounded-2xl ${tab.bg} mb-3 shadow-inner group-hover:scale-110 transition-transform`}>
                                <tab.icon className={`w-7 h-7 ${tab.color}`} />
                            </div>
                            <h3 className="font-bold text-slate-800 text-[13px] leading-tight">{tab.label}</h3>
                        </button>
                    ))}
                </div>
            )}

            {/* FAHREN UNTER ALKOHOL/DROGEN (Zusammengefasster Reiter) */}
            {view === 'alk_dro' && (
                <div className="space-y-4">
                    {/* Sub-Navigation */}
                    <div className="flex overflow-x-auto gap-2 pb-3 mb-1 custom-scrollbar" style={{ WebkitOverflowScrolling: 'touch' }}>
                        {[
                            { id: 'ph1', label: '§ 24a StVG' },
                            { id: 'ph2', label: '§ 24c StVG' },
                            { id: 'ph3', label: 'Medikamentenprivileg' }
                        ].map(sub => (
                            <button
                                key={sub.id}
                                onClick={() => setAlkDroView(sub.id)}
                                className={`whitespace-nowrap px-3 py-2 rounded-xl text-xs font-bold transition-all border ${alkDroView === sub.id ? 'bg-teal-600 text-white border-teal-600 shadow-md' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
                            >
                                {sub.label}
                            </button>
                        ))}
                    </div>

                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                        
                        {/* § 24a StVG */}
                        {alkDroView === 'ph1' && (
                            <div className="animate-in fade-in">
                                <div className="flex items-center gap-2 mb-4 text-teal-700 pb-2 border-b border-slate-50">
                                    <ScaleLaw className="w-5 h-5" />
                                    <h3 className="font-black uppercase tracking-wide text-xs">§ 24a StVG (0,5 Promille / Drogen)</h3>
                                </div>
                                <p className="text-xs text-slate-400 font-bold uppercase mb-3">Tatvarianten:</p>
                                <ul className="space-y-3 text-sm text-slate-700 font-medium">
                                    <li className="flex gap-3">
                                        <div className="w-6 h-6 rounded bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 font-black text-[10px] mt-0.5">(1)</div>
                                        <div className="pt-1">mind. <strong>0,25 mg/l</strong> Alkohol im Atem oder mind. <strong>0,5 ‰</strong> Alkohol im Blut</div>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="w-6 h-6 rounded bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 font-black text-[10px] mt-0.5">(1a)</div>
                                        <div className="pt-1"><strong>3,5 ng/ml</strong> oder mehr THC im Blutserum</div>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="w-6 h-6 rounded bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 font-black text-[10px] mt-0.5">(2)</div>
                                        <div className="pt-1">
                                            Wirkung einer <strong>Anlagensubstanz</strong>:
                                            <ul className="mt-2 space-y-1 ml-1 border-l-2 border-teal-100 pl-3">
                                                <li>Heroin = 10 ng/ml</li>
                                                <li>Morphin = 10 ng/ml</li>
                                                <li>Cocain = 75 ng/ml</li>
                                                <li>Amphetamin = 25 ng/ml</li>
                                                <li>Methamphetamin = 25 ng/ml</li>
                                            </ul>
                                            <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-xl text-xs mt-3 flex gap-2 shadow-sm">
                                                <Info className="w-5 h-5 shrink-0 text-amber-500" />
                                                <span>Die Wirkung kann jedoch auch schon <strong>unterhalb des Grenzwerts</strong> vorliegen, wenn eine Ausfallerscheinung hinzukommt.<br/><span className="text-[10px] opacity-70 block mt-1">(OLG Celle, Beschluss v. 30. 3. 2009 – 322 Ss Bs 57/09)</span></span>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="w-6 h-6 rounded bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 font-black text-[10px] mt-0.5">(2a)</div>
                                        <div className="pt-1"><strong>3,5 ng/ml THC + Alkoholische Getränke</strong> während der Fahrt konsumieren oder vor der Fahrt konsumieren (mind. jedoch 0,1 mg/l oder 0,2 ‰)</div>
                                    </li>
                                </ul>
                            </div>
                        )}

                        {/* § 24c StVG */}
                        {alkDroView === 'ph2' && (
                            <div className="animate-in fade-in">
                                <div className="flex items-center gap-2 mb-4 text-teal-700 pb-2 border-b border-slate-50">
                                    <ScaleLaw className="w-5 h-5" />
                                    <h3 className="font-black uppercase tracking-wide text-xs">§ 24c StVG (Alkoholverbot Fahranfänger)</h3>
                                </div>
                                <p className="text-xs text-slate-400 font-bold uppercase mb-3">Tatvarianten / Voraussetzungen:</p>
                                <div className="space-y-3 text-sm text-slate-700 font-medium bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center shrink-0 font-black text-xs mt-0.5">A</div>
                                        <div className="pt-0.5">In der <strong>Probezeit</strong> bzw. <strong>vor Vollendung des 21. Lebensjahrs</strong></div>
                                    </div>
                                    <div className="flex justify-center"><div className="w-px h-4 bg-slate-300"></div></div>
                                    <div className="flex justify-center text-teal-600 font-black text-xs uppercase tracking-widest">+ UND +</div>
                                    <div className="flex justify-center"><div className="w-px h-4 bg-slate-300"></div></div>
                                    <div className="flex items-start gap-3 w-full">
                                        <div className="w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center shrink-0 font-black text-xs mt-0.5">B</div>
                                        <div className="flex-1">
                                            <div className="space-y-2.5 w-full">
                                                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm leading-snug">
                                                    Unter der Wirkung von <strong>Alkohol</strong> <span className="text-xs text-slate-500 font-normal">(mind. 0,1 mg/l / 0,2 ‰)</span><br/>
                                                    oder <strong>THC</strong> <span className="text-xs text-slate-500 font-normal">(mind. 1,0 ng/ml)</span> stehen.
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="h-px bg-slate-200 flex-1"></div>
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-teal-600">ODER</span>
                                                    <div className="h-px bg-slate-200 flex-1"></div>
                                                </div>
                                                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm leading-snug">
                                                    Während der Fahrt alkoholische Getränke oder THC <strong>konsumieren</strong>.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Medikamentenprivileg */}
                        {alkDroView === 'ph3' && (
                            <div className="animate-in fade-in">
                                <div className="flex items-center gap-2 mb-4 text-teal-700 pb-2 border-b border-slate-50">
                                    <Syringe className="w-5 h-5" />
                                    <h3 className="font-black uppercase tracking-wide text-xs">Medikamentenprivileg</h3>
                                </div>
                                
                                <div className="bg-teal-50 border border-teal-200 text-teal-900 p-4 rounded-xl text-sm mb-5 leading-relaxed">
                                    <strong>§ 24a und 24c StVG greifen nicht</strong>, wenn die Anlagesubstanz ärztlich verordnet wurde und <strong>bestimmungsgemäß</strong> eingenommen wurde.
                                </div>

                                <h4 className="font-black text-slate-800 text-sm mb-3 text-red-600">Keine bestimmungsgemäße Einnahme bei:</h4>
                                <ul className="space-y-3 text-sm text-slate-700 font-medium mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <li className="flex gap-3 items-start"><div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></div><span><strong>Falsche Dosierung:</strong> Dosierung wird nicht eingehalten oder Konsumvariante ist anders vorgegeben.</span></li>
                                    <li className="flex gap-3 items-start"><div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></div><span><strong>Beikonsum:</strong> Sobald Beikonsum mit anderen Betäubungsmitteln vorliegt.</span></li>
                                    <li className="flex gap-3 items-start"><div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></div><span><strong>Alkohol:</strong> Sobald Alkohol konsumiert wird. <em className="text-xs text-slate-500 block">(gilt nur bei Anlagensubstanzen, nicht THC)</em></span></li>
                                </ul>

                                <div className="bg-slate-800 text-white p-4 rounded-xl text-sm font-bold flex gap-3 items-center shadow-sm">
                                    <AlertTriangle className="w-8 h-8 shrink-0 text-amber-400"/>
                                    <span>Wichtig: Das Medikamentenprivileg befreit <u>nicht</u> von den Strafvorschriften der §§ 316, 315c StGB!</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* BLUTENTNAHME */}
            {view === 'blut' && (
                <div className="space-y-4">
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center gap-2 mb-4 text-teal-700 pb-2 border-b border-slate-50">
                            <Syringe className="w-5 h-5" />
                            <h3 className="font-black uppercase tracking-wide text-xs">Hinweise zur Blutentnahme</h3>
                        </div>
                        
                        <div className="mb-6">
                            <h4 className="font-black text-slate-800 text-sm mb-3">Alkohol</h4>
                            <p className="text-xs text-slate-400 font-bold uppercase mb-2">Eine <u>zweite</u> Blutentnahme ist erforderlich, wenn:</p>
                            <ul className="space-y-1.5 text-sm text-slate-700 font-medium mb-3">
                                <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0"></div>Nachtrunk geltend gemacht wird</li>
                                <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0"></div>Innerhalb 1 Stunde vor der ersten BE Alkohol getrunken wurde</li>
                                <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0"></div>Keine oder falsche Angaben zum Alkoholkonsum vorliegen</li>
                            </ul>
                            <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-xl text-sm font-bold flex gap-2 items-start mt-4">
                                <Clock className="w-4 h-4 shrink-0 mt-0.5 text-amber-500"/>
                                <span>Zweite BE frühestens nach 30 und spätestens nach 40 Minuten nach der ersten BE!</span>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-black text-slate-800 text-sm mb-3">Berauschende Mittel</h4>
                            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex gap-3 items-center">
                                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                                    <span className="font-black text-slate-500">2x</span>
                                </div>
                                <span className="text-sm font-bold text-slate-700">Zwei Röhrchen zwingend bei Kokain und Opiaten (z.B. Morphin).</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* KCANG (Cannabis) */}
            {view === 'kcang' && (
                 <div className="space-y-4 animate-in fade-in">
                    
                    {/* Sub-Navigation */}
                    <div className="flex overflow-x-auto gap-2 pb-3 mb-1 custom-scrollbar" style={{ WebkitOverflowScrolling: 'touch' }}>
                        {[
                            { id: 'besitz', label: 'Besitz (Erlaubt)' },
                            { id: 'strafbar', label: 'Strafbarer Besitz' },
                            { id: 'anbau', label: 'Privater Anbau' },
                            { id: 'konsum', label: 'Konsumverbote' },
                        ].map(sub => (
                            <button
                                key={sub.id}
                                onClick={() => setKcangView(sub.id)}
                                className={`whitespace-nowrap px-3 py-2 rounded-xl text-xs font-bold transition-all border ${kcangView === sub.id ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
                            >
                                {sub.label}
                            </button>
                        ))}
                    </div>

                    <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-slate-100">
                        
                        {/* 1. BESITZ (Allgemein) */}
                        {kcangView === 'besitz' && (
                            <div className="animate-in fade-in">
                                <div className="flex items-center gap-2 mb-4 text-emerald-700 pb-2 border-b border-slate-50">
                                    <Trees className="w-5 h-5" />
                                    <h3 className="font-black uppercase tracking-wide text-xs">Grundsätzliche Besitzregelungen (§ 3 KCanG)</h3>
                                </div>
                                
                                <div className="bg-red-50 border border-red-200 p-3 rounded-xl mb-5 flex gap-3 shadow-sm items-start">
                                    <ShieldAlert className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
                                    <p className="text-xs font-medium text-red-900 leading-relaxed">
                                        <strong className="text-red-700">Achtung:</strong> Der Besitz, Anbau, die Herstellung sowie der Erwerb von Cannabis bleiben nach § 2 KCanG <strong className="text-red-700 uppercase">grundsätzlich verboten</strong>.
                                    </p>
                                </div>

                                <p className="text-xs text-slate-600 font-bold mb-3">Hiervon gelten für Erwachsene (ab 18 Jahren) folgende <span className="text-emerald-600 uppercase tracking-wide">streng reglementierte Ausnahmen</span> für den reinen Eigenkonsum:</p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col items-center text-center">
                                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm mb-2"><MapPin className="w-5 h-5 text-slate-400" /></div>
                                        <h4 className="font-black text-slate-700 text-sm mb-1">Im öffentlichen Raum</h4>
                                        <span className="text-[10px] text-slate-500 mb-3">(Mitführen unterwegs)</span>
                                        <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-lg font-black text-sm border border-emerald-200 w-full">
                                            Besitz bis zu 25 Gramm
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col items-center text-center">
                                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm mb-2"><Home className="w-5 h-5 text-slate-400" /></div>
                                        <h4 className="font-black text-slate-700 text-sm mb-1">Am Wohnsitz</h4>
                                        <span className="text-[10px] text-slate-500 mb-3">(bzw. gewöhnlicher Aufenthalt)</span>
                                        <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-lg font-black text-sm border border-emerald-200 w-full flex flex-col gap-1">
                                            <span>Besitz von bis zu 3 Pflanzen</span>
                                            <span className="text-xs font-bold text-emerald-600">und</span>
                                            <span>bis zu 50 Gramm</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 2. STRAFBARER BESITZ */}
                        {kcangView === 'strafbar' && (
                            <div className="animate-in fade-in">
                                <div className="flex items-center gap-2 mb-4 text-emerald-700 pb-2 border-b border-slate-50">
                                    <AlertTriangle className="w-5 h-5" />
                                    <h3 className="font-black uppercase tracking-wide text-xs">Mengenüberschreitung (Besitz)</h3>
                                </div>
                                
                                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-4 bg-slate-50 inline-block px-2 py-1 rounded">Rechtliche Einstufung bei Erwachsenen</p>

                                <div className="space-y-4">
                                    {/* Strafmaß Info */}
                                    <div className="bg-slate-800 text-white p-3 rounded-xl text-xs font-medium leading-relaxed shadow-sm">
                                        Wird die zulässige Höchstmenge überschritten, greifen gestaffelte Sanktionen. Ab <strong className="text-red-400">30g</strong> (öffentlich) bzw. <strong className="text-red-400">60g</strong> (privat) handelt es sich um eine Straftat (Freiheitsstrafe bis zu 3 Jahre oder Geldstrafe).
                                    </div>

                                    {/* Unterwegs */}
                                    <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-sm">
                                        <div className="font-black text-slate-700 text-sm mb-2 flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-400"/> Unterwegs (Draußen)</div>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between bg-amber-50 border border-amber-200 p-2.5 rounded-lg">
                                                <div className="flex flex-col"><span className="text-amber-800 font-bold text-xs uppercase">Ordnungswidrigkeit</span><span className="text-[10px] text-amber-600 font-mono font-bold">§ 36 (1) Nr. 1a KCanG</span></div>
                                                <span className="font-black text-amber-700 text-sm">25,01 g - 30 g</span>
                                            </div>
                                            <div className="flex items-center justify-between bg-red-50 border border-red-200 p-2.5 rounded-lg">
                                                <div className="flex flex-col"><span className="text-red-800 font-bold text-xs uppercase">Straftat</span><span className="text-[10px] text-red-600 font-mono font-bold">§ 34 (1) Nr. 1a KCanG</span></div>
                                                <span className="font-black text-red-700 text-sm">über 30 Gramm</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Zuhause */}
                                    <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-sm">
                                        <div className="font-black text-slate-700 text-sm mb-2 flex items-center gap-2"><Home className="w-4 h-4 text-slate-400"/> Am Wohnsitz</div>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between bg-amber-50 border border-amber-200 p-2.5 rounded-lg">
                                                <div className="flex flex-col"><span className="text-amber-800 font-bold text-xs uppercase">Ordnungswidrigkeit</span><span className="text-[10px] text-amber-600 font-mono font-bold">§ 36 (1) Nr. 1b KCanG</span></div>
                                                <span className="font-black text-amber-700 text-sm">50,01 g - 60 g</span>
                                            </div>
                                            <div className="flex items-center justify-between bg-red-50 border border-red-200 p-2.5 rounded-lg">
                                                <div className="flex flex-col"><span className="text-red-800 font-bold text-xs uppercase">Straftat</span><span className="text-[10px] text-red-600 font-mono font-bold">§ 34 (1) Nr. 1b KCanG</span></div>
                                                <span className="font-black text-red-700 text-sm">über 60 Gramm</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Pflanzen */}
                                    <div className="bg-red-50 border border-red-200 p-3 rounded-xl flex justify-between items-center shadow-sm">
                                        <div className="flex flex-col"><span className="text-red-800 font-black uppercase text-xs">Pflanzenbestand (Straftat)</span><span className="text-[10px] text-red-600 font-mono font-bold mt-0.5">§ 34 (1) Nr. 1c KCanG</span></div>
                                        <span className="font-black text-red-700 text-sm text-right">mehr als 3 Pflanzen</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 3. PRIVATER ANBAU */}
                        {kcangView === 'anbau' && (
                            <div className="animate-in fade-in">
                                <div className="flex items-center gap-2 mb-4 text-emerald-700 pb-2 border-b border-slate-50">
                                    <Trees className="w-5 h-5" />
                                    <h3 className="font-black uppercase tracking-wide text-xs">Privater Eigenanbau (§ 9 KCanG)</h3>
                                </div>

                                <div className="bg-red-50 border border-red-200 p-3 rounded-xl mb-4 flex gap-3 shadow-sm items-start">
                                    <ShieldAlert className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
                                    <p className="text-[11px] font-medium text-red-900 leading-relaxed">
                                        <strong className="text-red-700">Achtung:</strong> Der Anbau, die Herstellung und die Weitergabe von Cannabis sind <strong className="text-red-700 uppercase">grundsätzlich untersagt</strong>. Für den privaten Bereich gibt es jedoch strikte Ausnahmen.
                                    </p>
                                </div>

                                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl mb-4 text-sm">
                                    <div className="font-black text-slate-800 mb-3 text-xs uppercase tracking-wide">Regelungen für Erwachsene am eigenen Wohnsitz:</div>
                                    <ul className="space-y-2 font-medium text-slate-700">
                                        <li className="flex justify-between items-center bg-white p-2 rounded border border-slate-100"><span className="text-xs">Lebende Pflanzen:</span> <strong className="text-emerald-700">bis zu 3 Pflanzen</strong></li>
                                        <li className="flex justify-between items-center bg-white p-2 rounded border border-slate-100"><span className="text-xs">Ertrag (getrocknet):</span> <strong className="text-emerald-700">bis zu 50 Gramm</strong></li>
                                    </ul>
                                    <div className="text-center mt-3 font-black text-emerald-600 uppercase tracking-widest text-xs">... Ausschließlich zum Eigenkonsum bestimmt!</div>
                                </div>

                                <div className="bg-yellow-50 border border-yellow-300 p-3 rounded-xl mb-4 text-[11px] text-yellow-900 font-medium leading-relaxed shadow-sm flex gap-2">
                                    <Info className="w-4 h-4 shrink-0 text-yellow-600 mt-0.5" />
                                    <p>
                                        <strong>Schutzmaßnahmen:</strong> Das geerntete Cannabis darf keinesfalls an Dritte weitergegeben werden (auch nicht unentgeltlich). Zudem sind Pflanzen und Ertrag zwingend <span className="underline decoration-yellow-400">vor dem Zugriff durch Kinder, Jugendliche und unbefugte Dritte zu schützen</span>.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="font-black text-slate-700 text-sm mb-2 mt-4 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-slate-400"/> Strafen bei Überschreitung</h4>
                                    
                                    {/* Pflanzen */}
                                    <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-sm">
                                        <div className="font-black text-slate-700 text-sm mb-2 flex items-center gap-2"><Trees className="w-4 h-4 text-slate-400"/> Pflanzenbestand</div>
                                        <div className="flex items-center justify-between bg-red-50 border border-red-200 p-2.5 rounded-lg">
                                            <div className="flex flex-col"><span className="text-red-800 font-bold text-xs uppercase">Straftat</span><span className="text-[10px] text-red-600 font-mono font-bold mt-0.5">§ 34 (1) Nr. 1c KCanG</span></div>
                                            <span className="font-black text-red-700 text-sm text-right">mehr als 3 Pflanzen</span>
                                        </div>
                                    </div>

                                    {/* Lagerung / Ertrag (entspricht Wohnsitz) */}
                                    <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-sm">
                                        <div className="font-black text-slate-700 text-sm mb-2 flex items-center gap-2"><Home className="w-4 h-4 text-slate-400"/> Ertrag / Lagerung am Wohnsitz</div>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between bg-amber-50 border border-amber-200 p-2.5 rounded-lg">
                                                <div className="flex flex-col"><span className="text-amber-800 font-bold text-xs uppercase">Ordnungswidrigkeit</span><span className="text-[10px] text-amber-600 font-mono font-bold">§ 36 (1) Nr. 1b KCanG</span></div>
                                                <span className="font-black text-amber-700 text-sm">50,01 g - 60 g</span>
                                            </div>
                                            <div className="flex items-center justify-between bg-red-50 border border-red-200 p-2.5 rounded-lg">
                                                <div className="flex flex-col"><span className="text-red-800 font-bold text-xs uppercase">Straftat</span><span className="text-[10px] text-red-600 font-mono font-bold">§ 34 (1) Nr. 1b KCanG</span></div>
                                                <span className="font-black text-red-700 text-sm">über 60 Gramm</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 4. KONSUMVERBOTE */}
                        {kcangView === 'konsum' && (
                            <div className="animate-in fade-in">
                                <div className="flex items-center gap-2 mb-4 text-emerald-700 pb-2 border-b border-slate-50">
                                    <ShieldCheck className="w-5 h-5" />
                                    <h3 className="font-black uppercase tracking-wide text-xs">Öffentlicher Konsum & Jugendschutz</h3>
                                </div>

                                <div className="space-y-4 text-sm text-slate-700 font-medium">
                                    
                                    {/* Gegenwart */}
                                    <div className="flex gap-3 items-start bg-slate-50 p-3 rounded-xl border border-slate-200">
                                        <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5"><X className="w-4 h-4"/></div>
                                        <div className="w-full">
                                            <div>Der Konsum in unmittelbarer Gegenwart von <strong>Personen unter 18 Jahren</strong> ist strikt <span className="text-red-600 font-bold uppercase">untersagt</span>.</div>
                                            <div className="mt-2 pt-2 border-t border-slate-200 flex justify-between items-center">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase">Ordnungswidrigkeit</span>
                                                <span className="text-[10px] text-red-600 font-mono font-bold">§ 36 (1) Nr. 4 KCanG</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 100m Regel */}
                                    <div className="flex gap-3 items-start bg-slate-50 p-3 rounded-xl border border-slate-200">
                                        <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5"><X className="w-4 h-4"/></div>
                                        <div className="w-full">
                                            <div>Zudem ist der Konsum in und an <strong>folgenden Orten</strong> <span className="text-red-600 font-bold uppercase">verboten</span>:</div>
                                            <ul className="list-disc list-inside mt-2 space-y-1 text-xs">
                                                <li>in Schulen und auf Kinderspielplätzen</li>
                                                <li>in Kinder- und Jugendeinrichtungen</li>
                                                <li>in öffentlich zugänglichen Sportstätten</li>
                                            </ul>
                                            <div className="mt-3 bg-red-50 border border-red-200 text-red-800 p-2.5 rounded-lg text-xs font-bold flex items-center gap-2">
                                                <MapPin className="w-4 h-4 shrink-0" />
                                                Das Verbot erstreckt sich auch auf die Sichtweite dieser Einrichtungen (in der Regel bis zu 100 Meter Abstand vom Eingangsbereich).
                                            </div>
                                            <div className="mt-3 pt-2 border-t border-slate-200 flex justify-between items-center">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase">Ordnungswidrigkeit</span>
                                                <span className="text-[10px] text-red-600 font-mono font-bold">§ 36 (1) Nr. 4 KCanG</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Fußgängerzonen */}
                                    <div className="flex gap-3 items-start bg-slate-50 p-3 rounded-xl border border-slate-200">
                                        <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5"><Clock className="w-4 h-4"/></div>
                                        <div className="w-full">
                                            <div className="text-xs pt-1">In Fußgängerzonen ist der Cannabis-Konsum <strong>zwischen 07:00 und 20:00 Uhr</strong> nicht gestattet!</div>
                                            <div className="mt-2.5 pt-2 border-t border-slate-200 flex justify-between items-center">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase">Ordnungswidrigkeit</span>
                                                <span className="text-[10px] text-red-600 font-mono font-bold">§ 36 (1) Nr. 4 KCanG</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Allgemeines Rauchverbot */}
                                    <div className="bg-slate-800 text-white p-3.5 rounded-xl text-center text-xs font-bold shadow-sm mt-2">
                                        Darüber hinaus gelten die allgemeinen Nichtraucherschutzgesetze der Länder unverändert fort.
                                    </div>

                                </div>
                            </div>
                        )}
                        
                    </div>
                 </div>
            )}

            {/* PEDELEC / E-BIKE */}
            {view === 'ebike' && (
                 <div className="space-y-4 animate-in fade-in">
                    
                    {/* Sub-Navigation */}
                    <div className="flex overflow-x-auto gap-2 pb-3 mb-1 custom-scrollbar" style={{ WebkitOverflowScrolling: 'touch' }}>
                        {[
                            { id: 'pedelec25', label: 'Pedelec (25 km/h)' },
                            { id: 'spedelec45', label: 'S-Pedelec (45 km/h)' },
                            { id: 'ebike25', label: 'E-Bike (ohne Treten bis 25 km/h)' }
                        ].map(sub => (
                            <button
                                key={sub.id}
                                onClick={() => setEbikeView(sub.id)}
                                className={`whitespace-nowrap px-3 py-2 rounded-xl text-xs font-bold transition-all border ${ebikeView === sub.id ? 'bg-green-600 text-white border-green-600 shadow-md' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
                            >
                                {sub.label}
                            </button>
                        ))}
                    </div>

                    <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-slate-100">
                        
                        {/* 1. PEDELEC 25 KM/H */}
                        {ebikeView === 'pedelec25' && (
                            <div className="animate-in fade-in">
                                <div className="flex items-center gap-2 mb-4 text-green-700 pb-2 border-b border-slate-50">
                                    <Bike className="w-5 h-5" />
                                    <h3 className="font-black uppercase tracking-wide text-xs">Pedelec (bis 25 km/h)</h3>
                                </div>
                                
                                <div className="bg-slate-800 text-white p-4 rounded-xl mb-5 flex gap-3 items-start shadow-sm">
                                    <Info className="w-5 h-5 shrink-0 text-green-400 mt-0.5" />
                                    <p className="text-xs font-medium leading-relaxed">
                                        <strong>Definition:</strong> Der Motor (max. 250 Watt Nenndauerleistung) unterstützt <strong>nur, wenn man gleichzeitig in die Pedale tritt</strong>. Bei 25 km/h schaltet der Motor ab. Eine Schiebehilfe bis 6 km/h (ohne Treten) ist erlaubt.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl shadow-sm flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0"><ShieldCheck className="w-4 h-4"/></div>
                                        <div>
                                            <h4 className="font-bold text-emerald-900 text-sm">Rechtliche Einstufung: Fahrrad</h4>
                                            <p className="text-xs text-emerald-800 mt-0.5">Es ist rechtlich einem herkömmlichen Fahrrad gleichgestellt (§ 1 Abs. 3 StVG).</p>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl flex items-start gap-3">
                                            <FileText className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                                            <div className="flex-1">
                                                <h4 className="font-bold text-slate-700 text-xs uppercase mb-1">Zulassung & Versicherung</h4>
                                                <p className="text-xs text-slate-600"><strong>Kein</strong> Versicherungskennzeichen und <strong>keine</strong> Betriebserlaubnis erforderlich.</p>
                                            </div>
                                        </div>
                                        <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl flex items-start gap-3">
                                            <CreditCard className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                                            <div className="flex-1">
                                                <h4 className="font-bold text-slate-700 text-xs uppercase mb-1">Fahrerlaubnis</h4>
                                                <p className="text-xs text-slate-600"><strong>Kein</strong> Führerschein und <strong>keine</strong> Mofaprüfbescheinigung erforderlich. Kein Mindestalter.</p>
                                            </div>
                                        </div>
                                        <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl flex items-start gap-3">
                                            <Shield className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                                            <div className="flex-1">
                                                <h4 className="font-bold text-slate-700 text-xs uppercase mb-1">Helmpflicht</h4>
                                                <p className="text-xs text-slate-600">Es besteht <strong>keine Helmpflicht</strong> (freiwilliges Tragen wird empfohlen).</p>
                                            </div>
                                        </div>
                                        <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl flex items-start gap-3">
                                            <MapPin className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                                            <div className="flex-1">
                                                <h4 className="font-bold text-slate-700 text-xs uppercase mb-1">Radwegebenutzung</h4>
                                                <p className="text-xs text-slate-600">Gekennzeichnete Radwege <strong>müssen</strong> genutzt werden (wie beim Fahrrad).</p>
                                                <div className="mt-2 bg-red-50 border border-red-100 p-2 rounded text-xs text-red-800">
                                                    <span className="font-bold">TBNR 102100:</span> Gehweg vorschriftswidrig benutzt (55 €)
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 2. S-PEDELEC 45 KM/H */}
                        {ebikeView === 'spedelec45' && (
                            <div className="animate-in fade-in">
                                <div className="flex items-center gap-2 mb-4 text-green-700 pb-2 border-b border-slate-50">
                                    <Zap className="w-5 h-5" />
                                    <h3 className="font-black uppercase tracking-wide text-xs">S-Pedelec (bis 45 km/h)</h3>
                                </div>
                                
                                <div className="bg-slate-800 text-white p-4 rounded-xl mb-5 flex gap-3 items-start shadow-sm">
                                    <Info className="w-5 h-5 shrink-0 text-yellow-400 mt-0.5" />
                                    <p className="text-xs font-medium leading-relaxed">
                                        <strong>Definition:</strong> Der Motor (max. 4.000 Watt) unterstützt das Treten <strong>bis zu 45 km/h</strong>. Sie sehen optisch oft wie normale Fahrräder aus, sind aber deutlich leistungsstärker.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <div className="bg-red-50 border border-red-200 p-3.5 rounded-xl shadow-sm flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-red-100 text-red-700 flex items-center justify-center shrink-0"><AlertTriangle className="w-4 h-4"/></div>
                                        <div>
                                            <h4 className="font-bold text-red-900 text-sm">Rechtliche Einstufung: Kraftfahrzeug</h4>
                                            <p className="text-xs text-red-800 mt-0.5">Es ist ein Kraftfahrzeug (Leichtkraftrad/Kleinkraftrad der Klasse L1e-B).</p>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl flex items-start gap-3">
                                            <FileText className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                                            <div className="flex-1">
                                                <h4 className="font-bold text-slate-700 text-xs uppercase mb-1">Zulassung & Versicherung</h4>
                                                <p className="text-xs text-slate-600"><strong>Versicherungskennzeichen</strong> und eine <strong>Betriebserlaubnis</strong> sind zwingend erforderlich! (Ansonsten Straftat § 6 PflVG / § 21 StVG iVm § 4 FZV).</p>
                                                <div className="mt-2 bg-red-50 border border-red-100 p-2 rounded text-xs text-red-800">
                                                    <span className="font-bold">TBNR 804600:</span> Ohne Betriebserlaubnis gefahren (70 €, 1 Pkt.)
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl flex items-start gap-3">
                                            <CreditCard className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                                            <div className="flex-1">
                                                <h4 className="font-bold text-slate-700 text-xs uppercase mb-1">Fahrerlaubnis</h4>
                                                <p className="text-xs text-slate-600">Führerschein der <strong>Klasse AM</strong> zwingend erforderlich (inkludiert im Autoführerschein B). (Ansonsten Straftat § 21 StVG).</p>
                                            </div>
                                        </div>
                                        <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl flex items-start gap-3">
                                            <Shield className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                                            <div className="flex-1">
                                                <h4 className="font-bold text-slate-700 text-xs uppercase mb-1">Helmpflicht</h4>
                                                <p className="text-xs text-slate-600"><strong>Es besteht Helmpflicht</strong> (§ 21a StVO). Es muss ein "geeigneter Kraftradschutzhelm" (ECE-Norm) getragen werden. Normale Fahrradhelme genügen in der Regel rechtlich nicht.</p>
                                                <div className="mt-2 bg-red-50 border border-red-100 p-2 rounded text-xs text-red-800">
                                                    <span className="font-bold">TBNR 121178:</span> Während der Fahrt keinen Helm getragen (15 €)
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl flex items-start gap-3">
                                            <MapPin className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                                            <div className="flex-1">
                                                <h4 className="font-bold text-slate-700 text-xs uppercase mb-1">Radwegebenutzung</h4>
                                                <p className="text-xs text-slate-600 text-red-600 font-bold">Verboten!</p>
                                                <p className="text-xs text-slate-600">Radwege dürfen <strong>nicht</strong> befahren werden, auch nicht außerorts und auch nicht, wenn sie für "Mofas frei" gekennzeichnet sind. Sie müssen die Fahrbahn nutzen.</p>
                                                <div className="mt-2 bg-red-50 border border-red-100 p-2 rounded text-xs text-red-800">
                                                    <span className="font-bold">TBNR 102100:</span> Gehweg/Radweg vorschriftswidrig benutzt (55 €)
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

{/* 3. E-BIKE (Mofa) */}
                        {ebikeView === 'ebike25' && (
                            <div className="animate-in fade-in">
                                <div className="flex items-center gap-2 mb-4 text-green-700 pb-2 border-b border-slate-50">
                                    <Car className="w-5 h-5" />
                                    <h3 className="font-black uppercase tracking-wide text-xs">E-Bike (ohne Treten bis 25 km/h)</h3>
                                </div>
                                
                                <div className="bg-slate-800 text-white p-4 rounded-xl mb-5 flex gap-3 items-start shadow-sm">
                                    <Info className="w-5 h-5 shrink-0 text-blue-400 mt-0.5" />
                                    <p className="text-xs font-medium leading-relaxed">
                                        <strong>Definition:</strong> Der Motor treibt das Zweirad <strong>auch ohne gleichzeitiges Treten</strong> an (z.B. per Gasgriff/Knopfdruck), bis zu einer bbH von max. 25 km/h. <br/><br/><em>(Hinweis: Bis max. 20 km/h spricht man vom Leichtmofa, rechtlich jedoch weitestgehend identisch zu behandeln).</em>
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl shadow-sm flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0"><AlertTriangle className="w-4 h-4"/></div>
                                        <div>
                                            <h4 className="font-bold text-amber-900 text-sm">Rechtliche Einstufung: Kraftfahrzeug</h4>
                                            <p className="text-xs text-amber-800 mt-0.5">Es handelt sich um ein Kleinkraftrad (Mofa).</p>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl flex items-start gap-3">
                                            <FileText className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                                            <div className="flex-1">
                                                <h4 className="font-bold text-slate-700 text-xs uppercase mb-1">Zulassung & Versicherung</h4>
                                                <p className="text-xs text-slate-600"><strong>Versicherungskennzeichen</strong> und eine <strong>Betriebserlaubnis</strong> sind zwingend erforderlich! (Ansonsten Straftat § 6 PflVG).</p>
                                                <div className="mt-2 bg-red-50 border border-red-100 p-2 rounded text-xs text-red-800">
                                                    <span className="font-bold">TBNR 804600:</span> Ohne Betriebserlaubnis gefahren (70 €, 1 Pkt.)
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl flex items-start gap-3">
                                            <CreditCard className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                                            <div className="flex-1">
                                                <h4 className="font-bold text-slate-700 text-xs uppercase mb-1">Fahrerlaubnis</h4>
                                                <p className="text-xs text-slate-600">Mindestens <strong>Mofaprüfbescheinigung</strong> erforderlich (kein Führerschein im rechtl. Sinne). Fahren ohne Mofaprüfbescheinigung ist eine Owi (§ 5 FeV), keine Straftat.<br/><br/><span className="italic">Ausnahme: Vor 01.04.1965 Geborene benötigen nur einen Ausweis.</span></p>
                                                {/* Hier ist der reparierte Block für die TBNR 205000 */}
                                                <div className="mt-2 bg-red-50 border border-red-100 p-2 rounded text-xs text-red-800">
                                                    <span className="font-bold">TBNR 205000:</span> Fahren ohne Mofaprüfbescheinigung (20 €)
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl flex items-start gap-3">
                                            <Shield className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                                            <div className="flex-1">
                                                <h4 className="font-bold text-slate-700 text-xs uppercase mb-1">Helmpflicht</h4>
                                                <p className="text-xs text-slate-600"><strong>Es besteht Helmpflicht</strong> (§ 21a StVO). Geeigneter Kraftradschutzhelm erforderlich (ein reiner Fahrradhelm reicht i.d.R. nicht).</p>
                                                <div className="mt-2 bg-red-50 border border-red-100 p-2 rounded text-xs text-red-800">
                                                    <span className="font-bold">TBNR 121178:</span> Während der Fahrt keinen Helm getragen (15 €)
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl flex items-start gap-3">
                                            <MapPin className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                                            <div className="flex-1">
                                                <h4 className="font-bold text-slate-700 text-xs uppercase mb-1">Radwegebenutzung</h4>
                                                <p className="text-xs text-slate-600"><strong>Innerorts:</strong> Radwege dürfen nur benutzt werden, wenn diese durch Zusatzschild "Mofas frei" oder "E-Bikes frei" freigegeben sind.<br/><strong>Außerorts:</strong> Radwege dürfen/sollten benutzt werden.</p>
                                                <div className="mt-2 space-y-1">
                                                    <div className="bg-red-50 border border-red-100 p-2 rounded text-xs text-red-800">
                                                        <span className="font-bold">TBNR 102018:</span> Radweg i.g.O. unzulässig befahren (20 €)
                                                    </div>
                                                    <div className="bg-red-50 border border-red-100 p-2 rounded text-xs text-red-800">
                                                        <span className="font-bold">TBNR 102100:</span> Gehweg vorschriftswidrig benutzt (55 €)
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                 </div>
            )}

            {/* BTM MENGEN */}
            {view === 'btm' && (
                 <div className="space-y-4 animate-in fade-in">
                     <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center gap-2 mb-4 text-teal-700 pb-2 border-b border-slate-50">
                            <AlertCircle className="w-5 h-5" />
                            <h3 className="font-black uppercase tracking-wide text-xs">Nicht geringe Mengen (BtM)</h3>
                        </div>
                        <ul className="space-y-3 text-sm text-slate-700 mb-5">
                            <li className="flex justify-between items-center border-b border-slate-50 pb-2">
                                <span className="font-bold">Marihuana</span>
                                <div className="text-right"><span className="font-black text-teal-600 block">ab 30 g</span><span className="text-[10px] text-slate-400">bis 2024: 150 - 600 g</span></div>
                            </li>
                            <li className="flex justify-between items-center border-b border-slate-50 pb-2">
                                <span className="font-bold">Haschisch</span>
                                <div className="text-right"><span className="font-black text-teal-600 block">ab 20 g</span><span className="text-[10px] text-slate-400">bis 2024: 100 g</span></div>
                            </li>
                            <li className="flex justify-between items-center border-b border-slate-50 pb-2">
                                <span className="font-bold">Ecstasy</span>
                                <div className="text-right"><span className="font-black text-teal-600 block">ab 125 Tab. (~55 g)</span><span className="text-[10px] text-slate-400">bis 2024: 200 KE</span></div>
                            </li>
                            <li className="flex justify-between items-center border-b border-slate-50 pb-2">
                                <span className="font-bold">Amphetamin</span>
                                <div className="text-right"><span className="font-black text-teal-600 block">ab 15 g</span><span className="text-[10px] text-slate-400">bis 2024: 180 g</span></div>
                            </li>
                            <li className="flex justify-between items-center border-b border-slate-50 pb-2">
                                <span className="font-bold">Kokain</span>
                                <div className="text-right"><span className="font-black text-teal-600 block">ab 6 g</span><span className="text-[10px] text-slate-400">bis 2024: 10 g</span></div>
                            </li>
                            <li className="flex justify-between items-center pb-2">
                                <span className="font-bold">Heroin</span>
                                <div className="text-right"><span className="font-black text-teal-600 block">ab 3 g</span><span className="text-[10px] text-slate-400">bis 2024: 10 g</span></div>
                            </li>
                        </ul>
                     </div>
                 </div>
            )}

            {/* EINZIEHUNG */}
            {view === 'einziehung' && (
                <div className="space-y-4">
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center gap-2 mb-4 text-teal-700 pb-2 border-b border-slate-50">
                            <ScaleLaw className="w-5 h-5" />
                            <h3 className="font-black uppercase tracking-wide text-xs">Voraussetzungen Einziehung</h3>
                        </div>
                        <p className="text-xs text-slate-400 font-bold uppercase mb-3">Folgende Kriterien rechtfertigen eine Einziehung:</p>
                        <ul className="space-y-2.5 text-sm text-slate-700 font-medium">
                            <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0"></div><span><strong>Überladung ab 15 %</strong> (LKW) bzw. bei Fahrzeugen bis 3,5 t zGM ab 20 %</span></li>
                            <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0"></div><span><strong>Überhöhe</strong> ab 4,20 m</span></li>
                            <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0"></div><span><strong>Überbreite</strong> ab 4,20 m</span></li>
                            <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0"></div><span>Fahrzeuge <strong>ohne Zulassung</strong></span></li>
                            <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0"></div><span>Mehr als <strong>30 % der Ladung ungesichert</strong> <br/><span className="text-xs text-slate-500 font-normal">(nur wenn kein rutschhemmendes Material mitgeführt wird)</span></span></li>
                            <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0"></div><span>Verstoß gegen das <strong>Sonntags-/Feiertagsfahrverbot</strong></span></li>
                        </ul>
                    </div>
                </div>
            )}

            {/* E-SCOOTER */}
            {view === 'escooter' && (
                <div className="space-y-3 animate-in fade-in">
                    
                    {/* Speed Navigation */}
                    <div className="flex gap-2">
                        {[
                            { id: 'bis22', label: 'bbH bis 22 km/h' },
                            { id: 'ab23', label: 'bbH ab 23 km/h' }
                        ].map(sub => (
                            <button
                                key={sub.id}
                                onClick={() => setEscooterSpeed(sub.id)}
                                className={`flex-1 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${escooterSpeed === sub.id ? 'bg-yellow-500 text-white border-yellow-500 shadow-md' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
                            >
                                {sub.label}
                            </button>
                        ))}
                    </div>

                    {/* Origin Navigation */}
                    <div className="flex gap-2 mb-2">
                        {[
                            { id: 'de', label: 'Deutschland' },
                            { id: 'aus', label: 'Ausland' }
                        ].map(sub => (
                            <button
                                key={sub.id}
                                onClick={() => setEscooterOrigin(sub.id)}
                                className={`flex-1 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all border ${escooterOrigin === sub.id ? 'bg-slate-700 text-white border-slate-700 shadow-sm' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
                            >
                                {sub.label}
                            </button>
                        ))}
                    </div>

                    <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-slate-100">
                        
                        {/* 1. bis 22 km/h (DE) */}
                        {escooterSpeed === 'bis22' && escooterOrigin === 'de' && (
                            <div className="animate-in fade-in">
                                <div className="flex items-center gap-2 mb-4 text-yellow-600 pb-2 border-b border-slate-50">
                                    <Zap className="w-5 h-5" />
                                    <h3 className="font-black uppercase tracking-wide text-xs">E-Scooter bis 22 km/h (Deutsche Zulassung)</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl flex items-center gap-3 shadow-sm">
                                        <User className="w-5 h-5 text-blue-500 shrink-0" />
                                        <span className="text-sm text-blue-900"><strong>Mindestalter: 14 Jahre</strong> (§ 3 eKFZ)</span>
                                    </div>

                                    <div className="bg-red-50 border border-red-200 p-3 rounded-xl flex items-start gap-3 shadow-sm">
                                        <AlertTriangle className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />
                                        <div>
                                            <span className="font-bold text-red-800 text-sm">Straftat</span>
                                            <p className="text-xs text-red-900 mt-1">Kein Versicherungsschutz nach §§ 1, 6, 30 PflVG</p>
                                        </div>
                                    </div>
                                    
                                    <h4 className="font-bold text-xs uppercase text-slate-500 mb-2 mt-4">Ordnungswidrigkeiten (BKat)</h4>
                                    <div className="bg-slate-50 p-2 sm:p-3 rounded-xl border border-slate-200 space-y-1">
                                        <BkatRow title="Versicherungsplakette nicht angebracht" fines={[{ role: 'Fahrer', tbnr: '602118', cost: '40 €' }, { role: 'Halter', tbnr: '602124', cost: '40 €' }]} />
                                        <BkatRow title="Allgemeine Betriebserlaubnis liegt nicht vor" fines={[{ role: 'Fahrer', tbnr: '602606', cost: '70 €' }, { role: 'Halter', tbnr: '602612', cost: '70 €' }]} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 2. bis 22 km/h (Ausland) */}
                        {escooterSpeed === 'bis22' && escooterOrigin === 'aus' && (
                            <div className="animate-in fade-in">
                                <div className="flex items-center gap-2 mb-4 text-yellow-600 pb-2 border-b border-slate-50">
                                    <Zap className="w-5 h-5" />
                                    <h3 className="font-black uppercase tracking-wide text-xs">E-Scooter bis 22 km/h (Ausländische Zulassung)</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl flex items-center gap-3 shadow-sm">
                                        <User className="w-5 h-5 text-blue-500 shrink-0" />
                                        <span className="text-sm text-blue-900"><strong>Mindestalter: 14 Jahre</strong> (§ 3 eKFZ)</span>
                                    </div>

                                    <div className="bg-red-50 border border-red-200 p-3 rounded-xl flex items-start gap-3 shadow-sm">
                                        <AlertTriangle className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />
                                        <div>
                                            <span className="font-bold text-red-800 text-sm">Straftat (Fehlende Versicherung)</span>
                                            <p className="text-xs text-red-900 mt-1">Strafbarkeit ergibt sich aus <strong>§ 3 AuslPflVG</strong> und nicht aus dem PflVG!</p>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl flex items-start gap-3 shadow-sm text-xs text-amber-900 font-medium">
                                        <Info className="w-5 h-5 shrink-0 text-amber-500 mt-0.5" />
                                        <p>Versicherungsschutz muss <strong>nachgewiesen, mitgeführt und ausgehändigt</strong> werden. Führt der Fahrer keinen Nachweis mit, ergibt sich die Owi aus <strong>§ 12 AuslPflVG</strong> (vgl. Kommentierung Hentschel).</p>
                                    </div>

                                    <h4 className="font-bold text-xs uppercase text-slate-500 mb-2 mt-4">Ordnungswidrigkeiten (BKat)</h4>
                                    <div className="bg-slate-50 p-2 sm:p-3 rounded-xl border border-slate-200">
                                        <BkatRow title="Versicherungsplakette nicht angebracht" fines={[{ role: 'Fahrer', tbnr: '602118', cost: '40 €' }, { role: 'Halter', tbnr: '602124', cost: '40 €' }]} />
                                        <p className="text-[10px] text-slate-600 leading-relaxed mt-2.5 px-1 pb-1">
                                            <strong>Hinweis zur Ahndung:</strong> Auch wenn die Ahndung bei Ausländern fraglich erscheint, begründet die fehlende Kennzeichnung nach eKFV die <strong>Untersagung der Weiterfahrt</strong>, da in diesem Zustand keine Ermittlung des Halters möglich ist. <strong>Beachte allerdings die Verhältnismäßigkeit!</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 3. ab 23 km/h (DE) */}
                        {escooterSpeed === 'ab23' && escooterOrigin === 'de' && (
                            <div className="animate-in fade-in">
                                <div className="flex items-center gap-2 mb-4 text-yellow-600 pb-2 border-b border-slate-50">
                                    <Zap className="w-5 h-5" />
                                    <h3 className="font-black uppercase tracking-wide text-xs">E-Scooter ab 23 km/h (Deutsche Zulassung)</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="bg-slate-800 text-white p-3.5 rounded-xl shadow-sm text-xs flex items-start gap-3">
                                        <Gauge className="w-6 h-6 shrink-0 text-yellow-400 mt-0.5" />
                                        <div>
                                            <span className="font-bold text-sm">eKFV gilt nicht mehr!</span>
                                            <p className="font-normal opacity-90 mt-1">20 km/h bbH + 10 % Messtoleranz = eKFV gilt nur bis max. 22 km/h. Ab 23 km/h handelt es sich um ein reguläres Kfz.</p>
                                        </div>
                                    </div>

                                    <div className="bg-red-50 border border-red-200 p-3 rounded-xl flex items-start gap-3 shadow-sm">
                                        <AlertTriangle className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />
                                        <div>
                                            <span className="font-bold text-red-800 text-sm">Straftat</span>
                                            <p className="text-xs text-red-900 mt-1">Kein Versicherungsschutz nach §§ 1, 6, 30 PflVG</p>
                                        </div>
                                    </div>

                                    <div className="bg-indigo-50 border border-indigo-200 p-3 rounded-xl flex items-start gap-3 shadow-sm text-xs text-indigo-900 font-medium">
                                        <CreditCard className="w-5 h-5 shrink-0 text-indigo-500 mt-0.5" />
                                        <p><strong>Fahrerlaubnis Klasse B</strong> zwingend vonnöten, da nach der VO (EG) 168/2013 die FE-Klassen A, A1, A2, AM einen Sitzplatz aufweisen müssen. Auch ein Mofa muss einen Sitzplatz aufweisen (siehe VO (EG) 168/2013 ) somit scheidet auch die Mofaprüfbescheinigung aus.</p>
                                    </div>

                                    <div className="bg-orange-50 border border-orange-200 p-3.5 rounded-xl shadow-sm">
                                        <div className="flex items-center gap-2 mb-2 text-orange-800">
                                            <AlertCircle className="w-4 h-4" />
                                            <strong className="text-xs">Sonderfall: Tuning & § 23 StVO</strong>
                                        </div>
                                        <p className="text-[11px] text-orange-900 leading-relaxed">
                                            Wird ein versicherter E-Scooter z.B. per Chip auf 35 km/h getunt, erlischt der Versicherungsvertrag <strong>nicht automatisch</strong> (die Versicherung kann nach AKB nur Leistung kürzen bzw. den Halter in Regress nehmen). Straftaten nach dem PflVG entfallen ggf. <br/><br/>
                                            <strong>Es greift jedoch § 23 StVO:</strong> Da die kleinen Reifen und Bremsen nicht für hohe Geschwindigkeiten ausgelegt sind, ist die Verkehrssicherheit wesentlich beeinträchtigt! (Ggf. Vorsatz prüfen).
                                        </p>
                                    </div>

                                    <h4 className="font-bold text-xs uppercase text-slate-500 mb-2 mt-4">Tatbestände (BKat)</h4>
                                    <div className="bg-slate-50 p-2 sm:p-3 rounded-xl border border-slate-200 space-y-2">
                                        <div>
                                            <div className="mb-1.5 px-1 text-xs font-bold text-slate-700">Zulassung nach § 3 FZV nötig:</div>
                                            <BkatRow title="Fahren ohne Zulassung" fines={[{ role: 'Fahrer', tbnr: '803600', cost: '70 €', points: '1 Pkt.' }, { role: 'Halter', tbnr: '803500', cost: '70 €', points: '1 Pkt.' }]} />
                                        </div>
                                        <div className="pt-2 border-t border-slate-200">
                                            <div className="mb-1.5 px-1 text-xs font-bold text-slate-700">Verkehrssicherheit durch Tuning beeinträchtigt (§ 23 StVO):</div>
                                            <BkatRow title="Wesentliche Beeinträchtigung d. Verkehrssicherheit" fines={[{ role: 'Fahrer', tbnr: '123600', cost: '80 €', points: '1 Pkt.' }]} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 4. ab 23 km/h (Ausland) */}
                        {escooterSpeed === 'ab23' && escooterOrigin === 'aus' && (
                            <div className="animate-in fade-in">
                                <div className="flex items-center gap-2 mb-4 text-yellow-600 pb-2 border-b border-slate-50">
                                    <Zap className="w-5 h-5" />
                                    <h3 className="font-black uppercase tracking-wide text-xs">E-Scooter ab 23 km/h (Schweizer Zulassung)</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="bg-slate-800 text-white p-3.5 rounded-xl shadow-sm text-xs flex items-start gap-3">
                                        <Gauge className="w-6 h-6 shrink-0 text-yellow-400 mt-0.5" />
                                        <div>
                                            <span className="font-bold text-sm">eKFV gilt nicht mehr!</span>
                                            <p className="font-normal opacity-90 mt-1">20 km/h bbH + 10 % Messtoleranz = eKFV gilt nur bis 22 km/h.</p>
                                        </div>
                                    </div>

                                    <div className="bg-red-50 border border-red-200 p-3 rounded-xl flex items-start gap-3 shadow-sm">
                                        <AlertTriangle className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />
                                        <div>
                                            <span className="font-bold text-red-800 text-sm">Straftat (Fehlende Versicherung)</span>
                                            <p className="text-xs text-red-900 mt-1">Strafbarkeit aus <strong>§ 3 AuslPflVG</strong>.</p>
                                        </div>
                                    </div>

                                    <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl flex items-start gap-3 shadow-sm text-xs text-amber-900 font-medium">
                                        <Info className="w-5 h-5 shrink-0 text-amber-500 mt-0.5" />
                                        <p>Versicherungsschutz muss nach <strong>§ 12 AuslPflVG</strong> mitgeführt werden.</p>
                                    </div>

                                    <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-xl shadow-sm text-xs text-indigo-900 font-medium">
                                        <div className="flex items-center gap-2 mb-2">
                                            <CreditCard className="w-5 h-5 text-indigo-500" />
                                            <span className="font-black text-sm">Fahrerlaubnis Klasse B zwingend erforderlich</span>
                                        </div>
                                        <p className="mb-2">Da nach der VO (EG) 168/2013 die FE-Klassen A, A1, A2, AM einen Sitzplatz aufweisen müssen, scheiden diese aus. Auch ein Mofa muss nach dieser VO (EG) einen Sitzplatz aufweisen. Somit genügt eine Mofaprüfbescheinigung nicht</p>
                                        
                                        <div className="mt-3 bg-white p-3.5 rounded-xl border border-indigo-100 text-[11px] leading-relaxed text-slate-700 shadow-sm">
                                            <strong className="text-indigo-800 block mb-1">Besonderheit bei Schweizer Fahrern:</strong>
                                            Bei ausländischen Führerscheininhabern wird grundsätzlich das Führerscheinrecht des Herkunftsstaats anerkannt (§ 28 FeV). In der Schweiz sind E-Scooter einem "Motorfahrrad" gleichgestellt und daher führerscheinfrei (unter 16 Jahren Fahrberechtigung M = dt. Mofaprüfbescheinigung). 
                                            <br/><br/>
                                            <strong>ABER:</strong> Die Anerkennung nach § 28 FeV bezieht sich nur auf ausländische <i>Fahrerlaubnisse</i>. Andere Bescheinigungen sind nicht enthalten. Deutschland hat zudem als Sonderregelung zum Wiener Übereinkommen (1968) die Einstufung als führerscheinfreies "Motorfahrrad" nicht anerkannt und verlangt eine Fahrerlaubnis.
                                        </div>
                                    </div>

                                    <div className="bg-orange-50 border border-orange-200 p-3.5 rounded-xl shadow-sm">
                                        <div className="flex items-center gap-2 mb-2 text-orange-800">
                                            <AlertCircle className="w-4 h-4" />
                                            <strong className="text-xs">Tuning & Verkehrssicherheit (§ 23 StVO)</strong>
                                        </div>
                                        <p className="text-[11px] text-orange-900 leading-relaxed">
                                            Wird ein ausländischer Scooter getunt, erlischt eine ggf. bestehende Haftpflicht nicht automatisch (Straftat PflVG fällt aus). Es bleibt jedoch der Verstoß gegen § 23 StVO, da die Verkehrssicherheit (Bremsen/Reifen) durch die bauliche Veränderung und höhere Geschwindigkeit wesentlich beeinträchtigt ist.
                                        </p>
                                    </div>

                                    <h4 className="font-bold text-xs uppercase text-slate-500 mb-2 mt-4">Tatbestände (BKat)</h4>
                                    <div className="bg-slate-50 p-2 sm:p-3 rounded-xl border border-slate-200 space-y-2">
                                        <div>
                                            <div className="mb-1.5 px-1 text-xs font-bold text-slate-700">Zulassung nach § 20 FZV nötig <br/><span className="font-normal text-[10px] text-slate-500">(Tatbestand nach § 3 FZV als Auffangtatbestand):</span></div>
                                            <BkatRow title="Fahren ohne Zulassung" fines={[{ role: 'Fahrer', tbnr: '803600', cost: '70 €', points: '1 Pkt.' }, { role: 'Halter', tbnr: '803500', cost: '70 €', points: '1 Pkt.' }]} />
                                        </div>
                                        <div className="pt-2 border-t border-slate-200">
                                            <div className="mb-1.5 px-1 text-xs font-bold text-slate-700">Verkehrssicherheit durch Tuning beeinträchtigt (§ 23 StVO):</div>
                                            <BkatRow title="Wesentliche Beeinträchtigung d. Verkehrssicherheit" fines={[{ role: 'Fahrer', tbnr: '123600', cost: '80 €', points: '1 Pkt.' }]} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            )}
            {/* HAUPTUNTERSUCHUNG (HU) */}
            {view === 'hu' && (
                <div className="space-y-4 animate-in fade-in">
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center gap-2 mb-4 text-teal-700 pb-2 border-b border-slate-50">
                            <Search className="w-5 h-5" />
                            <h3 className="font-black uppercase tracking-wide text-xs">Hauptuntersuchung (HU)</h3>
                        </div>

                        {/* Plaketten-Farben (2026 - 2032) */}
                        <div className="flex overflow-x-auto gap-4 pb-4 mb-2 px-2 custom-scrollbar" style={{ WebkitOverflowScrolling: 'touch' }}>
                            {[
                                { year: 2026, bg: 'bg-blue-400', short: '26' },
                                { year: 2027, bg: 'bg-yellow-400', short: '27' },
                                { year: 2028, bg: 'bg-[#8B4513]', short: '28' }, // Braun
                                { year: 2029, bg: 'bg-pink-300', short: '29' },  // Rosa
                                { year: 2030, bg: 'bg-green-500', short: '30' },
                                { year: 2031, bg: 'bg-orange-500', short: '31' },
                                { year: 2032, bg: 'bg-blue-400', short: '32' }
                            ].map((plakette) => (
                                <div key={plakette.year} className="flex flex-col items-center gap-1.5 shrink-0">
                                    <div className={`w-10 h-10 rounded-full ${plakette.bg} border-2 border-slate-800 shadow-sm flex items-center justify-center font-bold text-slate-800 text-[10px] relative`}>
                                        <div className="absolute top-0 w-2 h-2 bg-slate-800 rounded-b-sm"></div>
                                        <div className="bg-white/80 w-5 h-5 rounded-full flex items-center justify-center z-10 border border-slate-800">{plakette.short}</div>
                                    </div>
                                    <span className={`text-[10px] font-bold ${plakette.year === new Date().getFullYear() ? 'text-teal-600' : 'text-slate-500'}`}>{plakette.year}</span>
                                </div>
                            ))}
                        </div>

                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 text-sm text-slate-700 leading-relaxed">
                            <p>Am <strong>oberen Rand</strong> der Plakette (in der Mitte auf "12 Uhr") steht die Zahl des Monats, in dem die HU fällig ist. Um dies auch aus größeren Distanzen ablesen zu können, ist links und rechts der Zahl 12 eine schwarze Markierung angebracht.</p>
                        </div>

                        <h4 className="font-bold text-xs uppercase text-slate-500 mb-2">Tatbestände (HU-Fristüberschreitung)</h4>
                        <div className="bg-slate-50 p-2 sm:p-3 rounded-xl border border-slate-200">
                            <BkatRow title="mehr als 2 Monate bis zu 4 Monate" fines={[{ tbnr: '329113', cost: '15 €' }]} />
                            <BkatRow title="mehr als 4 Monate bis zu 8 Monate" fines={[{ tbnr: '329119', cost: '25 €' }]} />
                            <BkatRow title="mehr als 8 Monate" fines={[{ tbnr: '329610', cost: '60 €', points: '1 Pkt.' }]} />
                        </div>
                    </div>
                </div>
            )}
            {/* JUGENDSCHUTZ */}
            {view === 'juschg' && (
                <div className="space-y-4 animate-in fade-in">
                    <div className="bg-white p-1.5 sm:p-4 rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        
                        <div className="flex justify-between items-start mb-3 px-1 pt-1">
                            <div className="text-[9px] sm:text-[10px] text-slate-500 font-bold leading-tight max-w-[50%]">
                                (Dieses Gesetz gilt nicht für<br/>verheiratete Jugendliche)
                            </div>
                            <div className="flex flex-col gap-1 text-[9px] sm:text-[10px] font-bold text-slate-600">
                                <span className="flex items-center gap-1.5">
                                    <div className="w-3 h-3 bg-emerald-500 rounded-sm shadow-inner"></div> erlaubt
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <div className="w-3 h-3 bg-red-500 rounded-sm shadow-inner"></div> nicht erlaubt
                                </span>
                            </div>
                        </div>

                        <div className="w-full">
                            <table className="w-full text-left border-collapse border border-slate-200 table-fixed">
                                <thead>
                                    <tr className="bg-slate-800 text-white">
                                        <th className="p-1.5 sm:p-3 text-[7.5px] sm:text-[10px] font-medium leading-tight sm:leading-relaxed border-b border-r border-slate-700 w-[46%] text-slate-300 align-middle">
                                            
                                        </th>
                                        <th className="p-1 sm:p-2 text-[8px] sm:text-[10px] font-black uppercase border-b border-r border-slate-700 text-center leading-tight w-[18%] align-middle">
                                            Kinder<br/>unter<br/>14 J.
                                        </th>
                                        <th className="p-1 sm:p-2 text-[8px] sm:text-[10px] font-black uppercase border-b border-r border-slate-700 text-center leading-tight w-[18%] align-middle">
                                            Jugendl.<br/>unter<br/>16 J.
                                        </th>
                                        <th className="p-1 sm:p-2 text-[8px] sm:text-[10px] font-black uppercase border-b border-slate-700 text-center leading-tight w-[18%] align-middle">
                                            Jugendl.<br/>unter<br/>18 J.
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="align-top">
                                    
                                    {/* § 4 Gaststätten */}
                                    <tr className="border-b border-slate-200 hover:bg-slate-50">
                                        <td className="p-1.5 sm:p-2 border-r border-slate-200 break-words">
                                            <div className="flex gap-1.5 sm:gap-2">
                                                <span className="font-bold text-slate-500 w-4 sm:w-6 shrink-0 mt-0.5 text-[9px] sm:text-[11px]">§ 4</span>
                                                <span className="font-bold text-slate-700 text-[9px] sm:text-[11px] leading-tight">Aufenthalt in Gaststätten</span>
                                            </div>
                                        </td>
                                        <td className="p-1 border-r border-slate-200 align-middle"><div className="bg-red-500 w-full h-7 sm:h-8 rounded-sm shadow-inner mx-auto max-w-[32px] sm:max-w-[45px]"></div></td>
                                        <td className="p-1 border-r border-slate-200 align-middle"><div className="bg-red-500 w-full h-7 sm:h-8 rounded-sm shadow-inner mx-auto max-w-[32px] sm:max-w-[45px]"></div></td>
                                        <td className="p-1 align-middle"><div className="bg-emerald-500 text-white font-bold text-[7.5px] sm:text-[9px] w-full h-7 sm:h-8 flex flex-col items-center justify-center rounded-sm mx-auto max-w-[32px] sm:max-w-[45px] shadow-inner leading-[1.1]"><span>bis</span><span>24 Uhr</span></div></td>
                                    </tr>

                                    {/* § 4 Nachtbars */}
                                    <tr className="border-b border-slate-200 hover:bg-slate-50">
                                        <td className="p-1.5 sm:p-2 border-r border-slate-200 break-words">
                                            <div className="flex gap-1.5 sm:gap-2">
                                                <span className="font-bold text-slate-500 w-4 sm:w-6 shrink-0 mt-0.5 text-[9px] sm:text-[11px]">§ 4</span>
                                                <span className="font-bold text-slate-700 text-[9px] sm:text-[11px] leading-tight">Aufenthalt in Nachtbars, Nachtclubs oder vergleichbaren Vergnügungsbetrieben</span>
                                            </div>
                                        </td>
                                        <td className="p-1 border-r border-slate-200 align-middle"><div className="bg-red-500 w-full h-7 sm:h-8 rounded-sm shadow-inner mx-auto max-w-[32px] sm:max-w-[45px]"></div></td>
                                        <td className="p-1 border-r border-slate-200 align-middle"><div className="bg-red-500 w-full h-7 sm:h-8 rounded-sm shadow-inner mx-auto max-w-[32px] sm:max-w-[45px]"></div></td>
                                        <td className="p-1 align-middle"><div className="bg-red-500 w-full h-7 sm:h-8 rounded-sm shadow-inner mx-auto max-w-[32px] sm:max-w-[45px]"></div></td>
                                    </tr>

                                    {/* § 5 Disco */}
                                    <tr className="border-b border-slate-200 hover:bg-slate-50">
                                        <td className="p-1.5 sm:p-2 border-r border-slate-200 break-words">
                                            <div className="flex gap-1.5 sm:gap-2">
                                                <span className="font-bold text-slate-500 w-4 sm:w-6 shrink-0 mt-0.5 text-[9px] sm:text-[11px]">§ 5</span>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-slate-700 text-[9px] sm:text-[11px] leading-tight">Anwesenheit bei öffentlichen Tanzveranstaltungen, u. a. Disco</span>
                                                    <span className="text-[7.5px] sm:text-[9px] text-slate-500 mt-0.5 leading-tight">(Ausnahmegenehmigung durch zuständige Behörde möglich)</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-1 border-r border-slate-200 align-middle"><div className="bg-red-500 w-full h-7 sm:h-8 rounded-sm shadow-inner mx-auto max-w-[32px] sm:max-w-[45px]"></div></td>
                                        <td className="p-1 border-r border-slate-200 align-middle"><div className="bg-red-500 w-full h-7 sm:h-8 rounded-sm shadow-inner mx-auto max-w-[32px] sm:max-w-[45px]"></div></td>
                                        <td className="p-1 align-middle"><div className="bg-emerald-500 text-white font-bold text-[7.5px] sm:text-[9px] w-full h-7 sm:h-8 flex flex-col items-center justify-center rounded-sm mx-auto max-w-[32px] sm:max-w-[45px] shadow-inner leading-[1.1]"><span>bis</span><span>24 Uhr</span></div></td>
                                    </tr>

                                    {/* § 5 Jugendhilfe */}
                                    <tr className="border-b border-slate-200 hover:bg-slate-50">
                                        <td className="p-1.5 sm:p-2 border-r border-slate-200 break-words">
                                            <div className="flex gap-1.5 sm:gap-2">
                                                <span className="font-bold text-slate-500 w-4 sm:w-6 shrink-0 mt-0.5 text-[9px] sm:text-[11px]">§ 5</span>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-slate-700 text-[9px] sm:text-[11px] leading-tight">Anwesenheit bei Tanzveranstaltungen von anerkannten Trägern der Jugendhilfe.</span>
                                                    <span className="text-[7.5px] sm:text-[9px] text-slate-500 mt-0.5 leading-tight">Bei künstl. Betätigung o. zur Brauchtumspflege</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-1 border-r border-slate-200 align-middle"><div className="bg-emerald-500 text-white font-bold text-[7.5px] sm:text-[9px] w-full h-7 sm:h-8 flex flex-col items-center justify-center rounded-sm mx-auto max-w-[32px] sm:max-w-[45px] shadow-inner leading-[1.1]"><span>bis</span><span>22 Uhr</span></div></td>
                                        <td className="p-1 border-r border-slate-200 align-middle"><div className="bg-emerald-500 text-white font-bold text-[7.5px] sm:text-[9px] w-full h-7 sm:h-8 flex flex-col items-center justify-center rounded-sm mx-auto max-w-[32px] sm:max-w-[45px] shadow-inner leading-[1.1]"><span>bis</span><span>24 Uhr</span></div></td>
                                        <td className="p-1 align-middle"><div className="bg-emerald-500 text-white font-bold text-[7.5px] sm:text-[9px] w-full h-7 sm:h-8 flex flex-col items-center justify-center rounded-sm mx-auto max-w-[32px] sm:max-w-[45px] shadow-inner leading-[1.1]"><span>bis</span><span>24 Uhr</span></div></td>
                                    </tr>

                                    {/* § 6 & § 7 */}
                                    <tr className="border-b border-slate-200 hover:bg-slate-50">
                                        <td className="p-1.5 sm:p-2 border-r border-slate-200 break-words">
                                            <div className="flex gap-1.5 sm:gap-2">
                                                <span className="font-bold text-slate-500 w-4 sm:w-6 shrink-0 mt-0.5 leading-tight text-[9px] sm:text-[11px]">§ 6<br/>§ 7</span>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-slate-700 text-[9px] sm:text-[11px] leading-tight">Anwesenheit in öffentlichen Spielhallen. Teiln. an Spielen mit Gewinnmöglichkeiten<br/>Anwesenheit bei jugendgefährdenden Veranstaltungen und in Betrieben</span>
                                                    <span className="text-[7.5px] sm:text-[9px] text-slate-500 mt-0.5 leading-tight">(Die zuständige Behörde kann Alters- und Zeitbegrenzungen sowie andere Auflagen anordnen.)</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-1 border-r border-slate-200 align-middle"><div className="bg-red-500 w-full h-7 sm:h-8 rounded-sm shadow-inner mx-auto max-w-[32px] sm:max-w-[45px]"></div></td>
                                        <td className="p-1 border-r border-slate-200 align-middle"><div className="bg-red-500 w-full h-7 sm:h-8 rounded-sm shadow-inner mx-auto max-w-[32px] sm:max-w-[45px]"></div></td>
                                        <td className="p-1 align-middle"><div className="bg-red-500 w-full h-7 sm:h-8 rounded-sm shadow-inner mx-auto max-w-[32px] sm:max-w-[45px]"></div></td>
                                    </tr>

                                    {/* § 8 */}
                                    <tr className="border-b border-slate-200 hover:bg-slate-50">
                                        <td className="p-1.5 sm:p-2 border-r border-slate-200 break-words">
                                            <div className="flex gap-1.5 sm:gap-2">
                                                <span className="font-bold text-slate-500 w-4 sm:w-6 shrink-0 mt-0.5 text-[9px] sm:text-[11px]">§ 8</span>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-slate-700 text-[9px] sm:text-[11px] leading-tight">Aufenthalt an jugendgefährdenden Orten</span>
                                                    <span className="text-[7.5px] sm:text-[9px] text-slate-500 mt-0.5 leading-tight">(Die zuständige Behörde kann Maßnahmen zur Gefahrenabwehr treffen.)</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-1 border-r border-slate-200 align-middle"><div className="bg-red-500 w-full h-7 sm:h-8 rounded-sm shadow-inner mx-auto max-w-[32px] sm:max-w-[45px]"></div></td>
                                        <td className="p-1 border-r border-slate-200 align-middle"><div className="bg-red-500 w-full h-7 sm:h-8 rounded-sm shadow-inner mx-auto max-w-[32px] sm:max-w-[45px]"></div></td>
                                        <td className="p-1 align-middle"><div className="bg-red-500 w-full h-7 sm:h-8 rounded-sm shadow-inner mx-auto max-w-[32px] sm:max-w-[45px]"></div></td>
                                    </tr>

                                    {/* § 9 Bier/Wein */}
                                    <tr className="border-b border-slate-200 hover:bg-slate-50">
                                        <td className="p-1.5 sm:p-2 border-r border-slate-200 break-words">
                                            <div className="flex gap-1.5 sm:gap-2">
                                                <span className="font-bold text-slate-500 w-4 sm:w-6 shrink-0 mt-0.5 text-[9px] sm:text-[11px]">§ 9</span>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-slate-700 text-[9px] sm:text-[11px] leading-tight">Abgabe/Verzehr von Bier, Wein, Schaumwein, Mischungen mit Bier, Wein o.ä.</span>
                                                    <span className="text-[7.5px] sm:text-[9px] text-slate-500 mt-0.5 leading-tight">(Ausnahme: Erlaubt bei 14- u. 15-Jährigen in Begleitung einer personensorgeberechtigten Person [Eltern])</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-1 border-r border-slate-200 align-middle"><div className="bg-red-500 w-full h-7 sm:h-8 rounded-sm shadow-inner mx-auto max-w-[32px] sm:max-w-[45px]"></div></td>
                                        <td className="p-1 border-r border-slate-200 align-middle"><div className="bg-red-500 w-full h-7 sm:h-8 rounded-sm shadow-inner mx-auto max-w-[32px] sm:max-w-[45px]"></div></td>
                                        <td className="p-1 align-middle"><div className="bg-emerald-500 w-full h-7 sm:h-8 rounded-sm shadow-inner mx-auto max-w-[32px] sm:max-w-[45px]"></div></td>
                                    </tr>

                                    {/* § 9 Spirituosen */}
                                    <tr className="border-b border-slate-200 hover:bg-slate-50">
                                        <td className="p-1.5 sm:p-2 border-r border-slate-200 break-words">
                                            <div className="flex gap-1.5 sm:gap-2">
                                                <span className="font-bold text-slate-500 w-4 sm:w-6 shrink-0 mt-0.5"></span>
                                                <span className="font-bold text-slate-700 text-[9px] sm:text-[11px] leading-tight">Abgabe / Verzehr von anderen alkoholischen Getränken oder Lebensmitteln z. B. Spirituosen</span>
                                            </div>
                                        </td>
                                        <td className="p-1 border-r border-slate-200 align-middle"><div className="bg-red-500 w-full h-7 sm:h-8 rounded-sm shadow-inner mx-auto max-w-[32px] sm:max-w-[45px]"></div></td>
                                        <td className="p-1 border-r border-slate-200 align-middle"><div className="bg-red-500 w-full h-7 sm:h-8 rounded-sm shadow-inner mx-auto max-w-[32px] sm:max-w-[45px]"></div></td>
                                        <td className="p-1 align-middle"><div className="bg-red-500 w-full h-7 sm:h-8 rounded-sm shadow-inner mx-auto max-w-[32px] sm:max-w-[45px]"></div></td>
                                    </tr>

                                    {/* § 10 Rauchen */}
                                    <tr className="border-b border-slate-200 hover:bg-slate-50">
                                        <td className="p-1.5 sm:p-2 border-r border-slate-200 break-words">
                                            <div className="flex gap-1.5 sm:gap-2">
                                                <span className="font-bold text-slate-500 w-4 sm:w-6 shrink-0 mt-0.5 text-[9px] sm:text-[11px]">§ 10</span>
                                                <span className="font-bold text-slate-700 text-[9px] sm:text-[11px] leading-tight">Abgabe/Konsum von Tabakwaren, E-Zigaretten/E-Shishas (auch nikotinfrei)</span>
                                            </div>
                                        </td>
                                        <td className="p-1 border-r border-slate-200 align-middle"><div className="bg-red-500 w-full h-7 sm:h-8 rounded-sm shadow-inner mx-auto max-w-[32px] sm:max-w-[45px]"></div></td>
                                        <td className="p-1 border-r border-slate-200 align-middle"><div className="bg-red-500 w-full h-7 sm:h-8 rounded-sm shadow-inner mx-auto max-w-[32px] sm:max-w-[45px]"></div></td>
                                        <td className="p-1 align-middle"><div className="bg-red-500 w-full h-7 sm:h-8 rounded-sm shadow-inner mx-auto max-w-[32px] sm:max-w-[45px]"></div></td>
                                    </tr>

                                    {/* § 11 Kinobesuche */}
                                    <tr className="border-b border-slate-200 hover:bg-slate-50">
                                        <td className="p-1.5 sm:p-2 border-r border-slate-200 break-words">
                                            <div className="flex gap-1.5 sm:gap-2">
                                                <span className="font-bold text-slate-500 w-4 sm:w-6 shrink-0 mt-0.5 text-[9px] sm:text-[11px]">§ 11</span>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-slate-700 text-[9px] sm:text-[11px] leading-tight">Kinobesuche<br/>Nur bei Freigabe des Films und Vorspanns: "ohne Altersbeschr. / ab 6/12/16 Jahren"</span>
                                                    <span className="text-[7.5px] sm:text-[9px] text-slate-500 mt-0.5 leading-tight">(Kinder unter 6 Jahren nur mit einer erziehungsbeauftragten Person. Die Anwesenheit ist grundsätzlich an die Altersfreigabe gebunden! Ausnahme: „Filme ab 12 Jahren": Anwesenheit ab 6 Jahren in Begleitung einer personensorgeberechtigten Person [Eltern] gestattet.)</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-1 border-r border-slate-200 align-middle"><div className="bg-emerald-500 text-white font-bold text-[7.5px] sm:text-[9px] w-full h-7 sm:h-8 flex flex-col items-center justify-center rounded-sm mx-auto max-w-[32px] sm:max-w-[45px] shadow-inner leading-[1.1]"><span>bis</span><span>20 Uhr</span></div></td>
                                        <td className="p-1 border-r border-slate-200 align-middle"><div className="bg-emerald-500 text-white font-bold text-[7.5px] sm:text-[9px] w-full h-7 sm:h-8 flex flex-col items-center justify-center rounded-sm mx-auto max-w-[32px] sm:max-w-[45px] shadow-inner leading-[1.1]"><span>bis</span><span>22 Uhr</span></div></td>
                                        <td className="p-1 align-middle"><div className="bg-emerald-500 text-white font-bold text-[7.5px] sm:text-[9px] w-full h-7 sm:h-8 flex flex-col items-center justify-center rounded-sm mx-auto max-w-[32px] sm:max-w-[45px] shadow-inner leading-[1.1]"><span>bis</span><span>24 Uhr</span></div></td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* KINDERSITZE & GURT */}
            {view === 'kindersitz' && (
                <div className="space-y-4 animate-in fade-in">
                    
                    {/* Sub-Navigation */}
                    <div className="flex overflow-x-auto gap-2 pb-3 mb-1 custom-scrollbar" style={{ WebkitOverflowScrolling: 'touch' }}>
                        {[
                            { id: 'sitz', label: 'Kindersitzpflicht' },
                            { id: 'helm', label: 'Helmpflicht' },
                            { id: 'ausnahmen', label: 'Ausnahmen Gurtpflicht' },
                            { id: 'tatbestande', label: 'Tatbestände (BKat)' }
                        ].map(sub => (
                            <button
                                key={sub.id}
                                onClick={() => setKindersitzView(sub.id)}
                                className={`whitespace-nowrap px-3 py-2 rounded-xl text-xs font-bold transition-all border ${kindersitzView === sub.id ? 'bg-pink-600 text-white border-pink-600 shadow-md' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
                            >
                                {sub.label}
                            </button>
                        ))}
                    </div>

                    <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-slate-100">
                        
                        {/* 1. Kindersitzpflicht */}
                        {kindersitzView === 'sitz' && (
                            <div className="animate-in fade-in">
                                <div className="flex items-center gap-2 mb-4 text-pink-700 pb-2 border-b border-slate-50">
                                    <Baby className="w-5 h-5" />
                                    <h3 className="font-black uppercase tracking-wide text-xs">Pflicht (§ 21 StVO)</h3>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-2 mb-3">
                                     <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex flex-col justify-center items-center text-center shadow-sm">
                                        <span className="font-black text-slate-700 text-sm mb-0.5">Unter 12 Jahre</span>
                                        <span className="text-[10px] text-slate-400 font-bold uppercase mb-1">UND</span>
                                        <span className="font-black text-slate-700 text-sm">Unter 150 cm</span>
                                     </div>
                                     <div className="bg-pink-50 border border-pink-200 p-3 rounded-xl flex flex-col justify-center items-center text-center shadow-sm">
                                        <CheckCircle className="w-6 h-6 text-pink-500 mb-1" />
                                        <span className="font-black text-pink-800 text-xs uppercase text-center leading-tight">Kindersitz<br/>zwingend!</span>
                                     </div>
                                </div>
                                <div className="bg-amber-50 p-3 rounded-xl border border-amber-100 text-[11px] text-amber-900 font-medium mb-5 shadow-sm flex items-start gap-2">
                                    <Info className="w-4 h-4 shrink-0 text-amber-500 mt-0.5" />
                                    <span>Ist <strong>eine</strong> der Grenzen überschritten (älter als 12 <em>oder</em> größer als 150 cm), entfällt die Pflicht und der reguläre Gurt reicht aus.</span>
                                </div>

                                <div className="flex items-center gap-2 mb-3 text-pink-700 pb-2 border-b border-slate-50">
                                    <ShieldCheck className="w-5 h-5" />
                                    <h3 className="font-black uppercase tracking-wide text-xs">Zulässige Prüfnormen</h3>
                                </div>
                                
                                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                                    <li className="flex gap-3 items-center bg-slate-50 p-3 rounded-xl border border-slate-100 shadow-sm"><div className="w-6 h-6 rounded bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0"><CheckCircle className="w-4 h-4"/></div> <span className="pt-0.5"><strong>UN Reg. 129</strong> ("i-Size" - nach Größe)</span></li>
                                    <li className="flex gap-3 items-center bg-slate-50 p-3 rounded-xl border border-slate-100 shadow-sm"><div className="w-6 h-6 rounded bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0"><CheckCircle className="w-4 h-4"/></div> <span className="pt-0.5"><strong>UN ECE Reg. 44/03</strong> oder <strong>44/04</strong> (nach Gewicht)</span></li>
                                    <li className="flex gap-3 items-start bg-red-50 p-3 rounded-xl border border-red-100 text-red-900 shadow-sm"><div className="w-6 h-6 rounded bg-red-200 text-red-700 flex items-center justify-center shrink-0 mt-0.5"><AlertTriangle className="w-4 h-4"/></div> <div className="pt-1"><strong>Verboten:</strong> Alte Normen 44/01 und 44/02 dürfen im Straßenverkehr nicht mehr verwendet werden!</div></li>
                                </ul>
                            </div>
                        )}

                        {/* NEU: Helmpflicht */}
                        {kindersitzView === 'helm' && (
                            <div className="animate-in fade-in">
                                <div className="flex items-center gap-2 mb-4 text-pink-700 pb-2 border-b border-slate-50">
                                    <ShieldCheck className="w-5 h-5" />
                                    <h3 className="font-black uppercase tracking-wide text-xs">Helmpflicht (§ 21a Abs. 2 StVO)</h3>
                                </div>

                                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl mb-4 text-sm text-slate-700 leading-relaxed shadow-sm">
                                    <p>Wer <strong>Krafträder oder offene drei- oder mehrrädrige Kraftfahrzeuge</strong> mit einer bauartbedingten Höchstgeschwindigkeit von <strong>über 20 km/h</strong> führt sowie auf oder in ihnen mitfährt, muss während der Fahrt einen <strong>geeigneten Schutzhelm</strong> tragen.</p>
                                </div>

                                <h4 className="font-bold text-xs uppercase text-slate-500 mb-2">Wichtige Ausnahmen</h4>
                                <ul className="space-y-2.5 text-[13px] text-slate-700 font-medium mb-5">
                                    <li className="flex gap-3 items-start bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                                        <div className="w-6 h-6 rounded bg-pink-100 text-pink-700 flex items-center justify-center shrink-0 mt-0.5"><CheckCircle className="w-4 h-4"/></div>
                                        <div className="pt-0.5">Die Helmpflicht gilt <strong>nicht</strong>, wenn vorgeschriebene Sicherheitsgurte angelegt sind (z. B. BMW C1 Roller).</div>
                                    </li>
                                </ul>

                                <h4 className="font-bold text-xs uppercase text-slate-500 mb-2">"Geeigneter" Schutzhelm</h4>
                                <div className="space-y-3">
                                    <div className="bg-amber-50 p-3 rounded-xl border border-amber-100 text-[12px] text-amber-900 font-medium shadow-sm flex items-start gap-3">
                                        <Info className="w-5 h-5 shrink-0 mt-0.5 text-amber-500" />
                                        <div>
                                            <p>Amtlich genehmigt sind Helme, die nach der <strong>ECE-Regelung Nr. 22</strong> gebaut, geprüft und genehmigt wurden.</p>
                                            <p className="mt-1">Auch andere Helme können rechtlich "geeignet" sein, wenn sie eine ausreichende Schutzwirkung aufweisen (die Bauart muss als Schutzhelm ausgelegt sein, z. B. reicht ein Bauhelm oder Fahrradhelm <u>nicht</u> aus!).</p>
                                        </div>
                                    </div>

                                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                        <h5 className="font-bold text-slate-700 text-sm mb-3 border-b border-slate-100 pb-2 flex items-center gap-2">
                                            <ShieldCheck className="w-4 h-4 text-slate-400" />
                                            Die ECE-Norm (Economic Commission for Europe)
                                        </h5>
                                        
                                        <div className="space-y-3">
                                            <div className="flex gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                                                <div className="text-xs text-slate-700 leading-relaxed">
                                                    <strong>ECE-R 22.06:</strong> Die aktuelle Prüfnorm (geprüft seit Juni 2022).
                                                </div>
                                            </div>
                                            <div className="flex gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                                                <div className="text-xs text-slate-700 leading-relaxed">
                                                    <strong>ECE-R 22.05:</strong> Die Vorgängernorm (Produktion seit Juni 2023 eingestellt). <span className="font-bold text-emerald-700">Dürfen weiterhin uneingeschränkt verwendet werden! (Keine Austauschpflicht)</span>. Bei Neuanschaffungen sollte jedoch auf die aktuelle Norm geachtet werden.
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-3 border-t border-slate-100">
                                            <h6 className="font-bold text-slate-600 text-xs mb-1.5">Kennzeichnung (Kinnriemen / Futter):</h6>
                                            <p className="text-xs text-slate-600 leading-relaxed mb-2">
                                                Auf dem Prüflabel muss nicht zwingend der Text "ECE" oder "ECE-R 22" stehen! Ausreichend ist das <strong>"E" in einem Kreis</strong> zusammen mit der zugehörigen Prüfnummer.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 2. Ausnahmen Anschnallpflicht */}
                        {kindersitzView === 'ausnahmen' && (
                            <div className="animate-in fade-in">
                                <div className="flex items-center gap-2 mb-4 text-pink-700 pb-2 border-b border-slate-50">
                                    <ShieldCheck className="w-5 h-5" />
                                    <h3 className="font-black uppercase tracking-wide text-xs">Ausnahmen (§ 21a Abs. 1 StVO)</h3>
                                </div>
                                
                                <p className="text-xs text-slate-400 font-bold uppercase mb-3">Keine Gurtpflicht für:</p>
                                
                                <ul className="space-y-2.5 text-[13px] text-slate-700 font-medium">
                                    <li className="flex gap-3 items-start bg-slate-50 p-3 rounded-xl border border-slate-100 shadow-sm">
                                        <div className="w-6 h-6 rounded bg-pink-100 text-pink-700 flex items-center justify-center shrink-0 font-black text-[10px] mt-0.5">1</div>
                                        <div className="pt-0.5">Personen beim <strong>Haus-zu-Haus-Verkehr</strong> (z. B. Paketdienste), wenn in kurzen Abständen verlassen werden muss.</div>
                                    </li>
                                    <li className="flex gap-3 items-start bg-slate-50 p-3 rounded-xl border border-slate-100 shadow-sm">
                                        <div className="w-6 h-6 rounded bg-pink-100 text-pink-700 flex items-center justify-center shrink-0 font-black text-[10px] mt-0.5">2</div>
                                        <div className="pt-0.5">Fahrten mit <strong>Schrittgeschwindigkeit</strong> (z.B. Rückwärtsfahren, Parkplätze).</div>
                                    </li>
                                    <li className="flex gap-3 items-start bg-slate-50 p-3 rounded-xl border border-slate-100 shadow-sm">
                                        <div className="w-6 h-6 rounded bg-pink-100 text-pink-700 flex items-center justify-center shrink-0 font-black text-[10px] mt-0.5">3</div>
                                        <div className="pt-0.5">Fahrten in Kraftomnibussen, bei denen <strong>stehende Fahrgäste</strong> zugelassen sind.</div>
                                    </li>
                                    <li className="flex gap-3 items-start bg-slate-50 p-3 rounded-xl border border-slate-100 shadow-sm">
                                        <div className="w-6 h-6 rounded bg-pink-100 text-pink-700 flex items-center justify-center shrink-0 font-black text-[10px] mt-0.5">4</div>
                                        <div className="pt-0.5">Betriebspersonal in Omnibussen & <strong>Begleitpersonal</strong> von Pflegebedürftigen (während der Dienstleistung).</div>
                                    </li>
                                    <li className="flex gap-3 items-start bg-slate-50 p-3 rounded-xl border border-slate-100 shadow-sm">
                                        <div className="w-6 h-6 rounded bg-pink-100 text-pink-700 flex items-center justify-center shrink-0 font-black text-[10px] mt-0.5">5</div>
                                        <div className="pt-0.5">Fahrgäste in Bussen über 3,5 t beim <strong>kurzzeitigen Verlassen</strong> des Sitzplatzes.</div>
                                    </li>
                                </ul>
                            </div>
                        )}

                        {/* 3. Tatbestände */}
                        {kindersitzView === 'tatbestande' && (
                            <div className="animate-in fade-in">
                                <div className="flex items-center gap-2 mb-4 text-pink-700 pb-2 border-b border-slate-50">
                                    <Gavel className="w-5 h-5" />
                                    <h3 className="font-black uppercase tracking-wide text-xs">Tatbestände & Bußgelder</h3>
                                </div>

                                <h4 className="font-bold text-xs uppercase text-slate-500 mb-2">Gurt- & Kindersitzpflicht</h4>
                                <div className="bg-slate-50 p-2 sm:p-3 rounded-xl border border-slate-200 mb-5 space-y-1">
                                    <BkatRow title="Sicherheitsgurt nicht angelegt" fines={[{ tbnr: '121172', cost: '30 €' }]} />
                                    <div className="h-px bg-slate-200 w-full my-1.5"></div>
                                    <BkatRow title="1 Kind angeschnallt, aber ohne Kindersitz" fines={[{ tbnr: '121118', cost: '30 €' }]} />
                                    <BkatRow title="Mehrere Kinder angeschnallt, ohne Kindersitz" fines={[{ tbnr: '121124', cost: '35 €' }]} />
                                    <div className="h-px bg-slate-200 w-full my-1.5"></div>
                                    <BkatRow title="1 Kind ohne jegliche Sicherung befördert" fines={[{ tbnr: '121600', cost: '60 €', points: '1 Pkt.' }]} />
                                    <BkatRow title="Mehrere Kinder ohne jegliche Sicherung" fines={[{ tbnr: '121606', cost: '70 €', points: '1 Pkt.' }]} />
                                </div>

                                <h4 className="font-bold text-xs uppercase text-slate-500 mb-2">Helmpflicht (Motorrad etc.)</h4>
                                <div className="bg-slate-50 p-2 sm:p-3 rounded-xl border border-slate-200 space-y-1">
                                    <BkatRow title="Fahren ohne Schutzhelm" fines={[{ tbnr: '121178', cost: '15 €' }]} />
                                    <div className="h-px bg-slate-200 w-full my-1.5"></div>
                                    <BkatRow title="1 Kind befördert ohne Schutzhelm" fines={[{ tbnr: '121612', cost: '60 €' }]} />
                                    <BkatRow title="Mehrere Kinder befördert ohne Schutzhelm" fines={[{ tbnr: '121618', cost: '70 €' }]} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* KENNZEICHEN */}
            {view === 'kz' && (
                <div className="space-y-4">
                    {/* Sub-Navigation */}
                    <div className="flex overflow-x-auto gap-2 pb-3 mb-1 custom-scrollbar" style={{ WebkitOverflowScrolling: 'touch' }}>
                        {[
                            { id: 'kurzzeit', label: 'Kurzzeit (§ 42 FZV)' },
                            { id: 'ausfuhr', label: 'Ausfuhr (§ 45 FZV)' },
                            { id: 'rote', label: 'Rote (§ 41 FZV)' },
                            { id: 'oldtimer', label: 'Oldtimer (§ 43 FZV)' },
                            { id: 'verskennz', label: 'Versicherungskennzeichen' },
                        ].map(sub => (
                            <button
                                key={sub.id}
                                onClick={() => setKzView(sub.id)}
                                className={`whitespace-nowrap px-3 py-2 rounded-xl text-xs font-bold transition-all border ${kzView === sub.id ? 'bg-teal-600 text-white border-teal-600 shadow-md' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
                            >
                                {sub.label}
                            </button>
                        ))}
                    </div>

                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                        
                        {/* 1. Kurzzeitkennzeichen */}
                        {kzView === 'kurzzeit' && (
                            <div className="animate-in fade-in">
                                <div className="flex items-center gap-2 mb-4 text-teal-700 pb-2 border-b border-slate-50">
                                    <Car className="w-5 h-5" />
                                    <h3 className="font-black uppercase tracking-wide text-xs">Kurzzeitkennzeichen (§ 42 FZV)</h3>
                                </div>

                                <FahrtzweckeDropdown purposes={['probe', 'ueberfuehrung', 'reparatur']} />

                                <div className="flex items-start gap-3 bg-teal-50 p-3 rounded-xl border border-teal-100 mb-4 text-xs text-teal-900 font-medium shadow-sm">
                                    <Info className="w-5 h-5 shrink-0 text-teal-600 mt-0.5" />
                                    <div>
                                        Müssen <strong>nicht fest</strong> mit dem Fahrzeug verbunden sein.<br/>
                                        ➔ Eine Urkundenfälschung ist in diesem Fall <strong>nicht</strong> möglich.
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 bg-amber-50 p-3 rounded-xl border border-amber-100 mb-5 text-xs text-amber-900 font-medium shadow-sm">
                                    <AlertTriangle className="w-5 h-5 shrink-0 text-amber-500 mt-0.5" />
                                    <div>
                                        Liegt kein gültiger Fahrtzweck vor, handelt es sich um <strong>Fahren ohne Zulassung/Fahrtzweck nach § 42 FZV</strong>.
                                    </div>
                                </div>
                                
                                <h4 className="font-bold text-xs uppercase text-slate-500 mb-2">Häufige Tatbestände (BKat)</h4>
                                <div className="bg-slate-50 p-2 sm:p-3 rounded-xl border border-slate-200">
                                    <BkatRow title="Kennzeichen falsch angebracht" fines={[{ role: 'Fahrer', tbnr: '842100', cost: '10 €' }, { role: 'Halter', tbnr: '842000', cost: '10 €' }]} />
                                    <BkatRow title="Fahrzeugschein nicht mitgeführt" fines={[{ role: 'Fahrer', tbnr: '842124', cost: '20 €' }]} />
                                    <BkatRow title="Fahren ohne Fahrtzweck" fines={[{ role: 'Fahrer', tbnr: '842106', cost: '50 €' }]} />
                                    <BkatRow title="Kennzeichen an anderem Fahrzeug" fines={[{ role: 'Fahrer', tbnr: '842112', cost: '50 €' }]} />
                                    <BkatRow title="Datum abgelaufen" fines={[{ role: 'Fahrer', tbnr: '842118', cost: '50 €' }]} />
                                    <BkatRow title="Ohne Kennzeichen gefahren" fines={[{ role: 'Fahrer', tbnr: '842506', cost: '60 €' }, { role: 'Halter', tbnr: '842500', cost: '60 €' }]} />
                                </div>
                            </div>
                        )}

                        {/* 2. Ausfuhrkennzeichen */}
                        {kzView === 'ausfuhr' && (
                            <div className="animate-in fade-in">
                                <div className="flex items-center gap-2 mb-4 text-teal-700 pb-2 border-b border-slate-50">
                                    <Car className="w-5 h-5" />
                                    <h3 className="font-black uppercase tracking-wide text-xs">Ausfuhrkennzeichen (§ 45 FZV)</h3>
                                </div>

                                <FahrtzweckeDropdown purposes={['ueberfuehrung']} />

                                <div className="flex items-start gap-3 bg-red-50 p-3 rounded-xl border border-red-100 mb-4 text-xs text-red-900 font-medium shadow-sm">
                                    <AlertTriangle className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />
                                    <div>
                                        Müssen <strong>fest</strong> mit dem Fahrzeug verbunden sein!<br/>
                                        ➔ Eine Urkundenfälschung ist hier <strong>MÖGLICH</strong>.
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 bg-amber-50 p-3 rounded-xl border border-amber-100 mb-5 text-xs text-amber-900 font-medium shadow-sm">
                                    <Info className="w-5 h-5 shrink-0 text-amber-500 mt-0.5" />
                                    <div>
                                        Ist die Gültigkeit überschritten, handelt es sich um <strong>Fahren ohne Zulassung nach § 3 FZV</strong>.
                                    </div>
                                </div>
                                
                                <h4 className="font-bold text-xs uppercase text-slate-500 mb-2">Häufige Tatbestände (BKat)</h4>
                                <div className="bg-slate-50 p-2 sm:p-3 rounded-xl border border-slate-200">
                                    <BkatRow title="Kennzeichen falsch angebracht" fines={[{ role: 'Fahrer', tbnr: '845100', cost: '10 €' }]} />
                                    <BkatRow title="Gültigkeit abgelaufen (Keine Zulassung)" fines={[{ role: 'Fahrer', tbnr: '803600', cost: '70 €' }, { role: 'Halter', tbnr: '803500', cost: '70 €' }]} />
                                </div>
                            </div>
                        )}

                        {/* 3. Rote Kennzeichen */}
                        {kzView === 'rote' && (
                            <div className="animate-in fade-in">
                                <div className="flex items-center gap-2 mb-4 text-teal-700 pb-2 border-b border-slate-50">
                                    <Car className="w-5 h-5" />
                                    <h3 className="font-black uppercase tracking-wide text-xs">Rote Kennzeichen (§ 41 FZV)</h3>
                                </div>

                                <FahrtzweckeDropdown purposes={['probe', 'ueberfuehrung', 'reparatur']} />

                                <div className="flex items-start gap-3 bg-teal-50 p-3 rounded-xl border border-teal-100 mb-3 text-xs text-teal-900 font-medium shadow-sm">
                                    <Info className="w-5 h-5 shrink-0 text-teal-600 mt-0.5" />
                                    <div>
                                        Müssen <strong>nicht fest</strong> mit dem Fahrzeug verbunden sein. (Urkundenfälschung nicht möglich).
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 mb-4 text-xs text-slate-700 font-medium">
                                    <BookOpen className="w-5 h-5 shrink-0 text-slate-400 mt-0.5" />
                                    <div className="space-y-1">
                                        <p><strong>Fahrzeugscheinheft</strong> vor Fahrtantritt ausfüllen & mitführen.</p>
                                        <p><strong>Aufzeichnungen</strong> im Betrieb führen & der Polizei auf Verlangen aushändigen.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 bg-amber-50 p-3 rounded-xl border border-amber-100 mb-5 text-xs text-amber-900 font-medium shadow-sm">
                                    <AlertTriangle className="w-5 h-5 shrink-0 text-amber-500 mt-0.5" />
                                    <div>
                                        Liegt kein gültiger Fahrtzweck vor, ist es <strong>Fahren ohne Zulassung nach § 3 FZV</strong>.
                                    </div>
                                </div>
                                
                                <h4 className="font-bold text-xs uppercase text-slate-500 mb-2">Häufige Tatbestände (BKat)</h4>
                                <div className="bg-slate-50 p-2 sm:p-3 rounded-xl border border-slate-200">
                                    <BkatRow title="Kennzeichen falsch angebracht" fines={[{ role: 'Fahrer', tbnr: '841124', cost: '10 €' }, { role: 'Halter', tbnr: '841006', cost: '10 €' }]} />
                                    <BkatRow title="Mitführpflicht (Fahrzeugscheinheft)" fines={[{ role: 'Fahrer', tbnr: '841118', cost: '10 €' }]} />
                                    <BkatRow title="Ausfüllpflicht (Fahrzeugscheinheft)" fines={[{ role: 'Halter', tbnr: '841106', cost: '10 €' }]} />
                                    <BkatRow title="Aufzeichnung im Betrieb fehlt" fines={[{ role: 'Halter', tbnr: '841112', cost: '25 €' }]} />
                                    <BkatRow title="Kein Fahrtzweck (Keine Zulassung)" fines={[{ role: 'Fahrer', tbnr: '803600', cost: '70 €' }, { role: 'Halter', tbnr: '803500', cost: '70 €' }]} />
                                </div>
                            </div>
                        )}

                        {/* 4. Rote Oldtimerkennzeichen */}
                        {kzView === 'oldtimer' && (
                            <div className="animate-in fade-in">
                                <div className="flex items-center gap-2 mb-4 text-teal-700 pb-2 border-b border-slate-50">
                                    <Car className="w-5 h-5" />
                                    <h3 className="font-black uppercase tracking-wide text-xs">Rote Oldtimerkennzeichen (§ 43 FZV)</h3>
                                </div>

                                <FahrtzweckeDropdown purposes={['probe', 'ueberfuehrung', 'reparatur', 'brauchtum']} />

                                <div className="flex items-start gap-3 bg-teal-50 p-3 rounded-xl border border-teal-100 mb-3 text-xs text-teal-900 font-medium shadow-sm">
                                    <Info className="w-5 h-5 shrink-0 text-teal-600 mt-0.5" />
                                    <div>
                                        Müssen <strong>nicht fest</strong> mit dem Fahrzeug verbunden sein. (Urkundenfälschung nicht möglich).
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 mb-4 text-xs text-slate-700 font-medium">
                                    <BookOpen className="w-5 h-5 shrink-0 text-slate-400 mt-0.5" />
                                    <div>
                                        <strong>Fahrzeugscheinheft</strong> vor Fahrtantritt ausfüllen & bei jeder Fahrt mitführen.
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 bg-amber-50 p-3 rounded-xl border border-amber-100 mb-5 text-xs text-amber-900 font-medium shadow-sm">
                                    <AlertTriangle className="w-5 h-5 shrink-0 text-amber-500 mt-0.5" />
                                    <div>
                                        Liegt kein gültiger Fahrtzweck vor, ist es <strong>Fahren ohne Zulassung nach § 3 FZV</strong>.
                                    </div>
                                </div>
                                
                                <h4 className="font-bold text-xs uppercase text-slate-500 mb-2">Häufige Tatbestände (BKat)</h4>
                                <div className="bg-slate-50 p-2 sm:p-3 rounded-xl border border-slate-200">
                                    <BkatRow title="Kennzeichen falsch angebracht" fines={[{ role: 'Fahrer', tbnr: '843100', cost: '10 €' }, { role: 'Halter', tbnr: '843000', cost: '10 €' }]} />
                                    <BkatRow title="Mitführpflicht (Fahrzeugscheinheft)" fines={[{ role: 'Fahrer', tbnr: '843112', cost: '10 €' }]} />
                                    <BkatRow title="Ausfüllpflicht (Fahrzeugscheinheft)" fines={[{ role: 'Halter', tbnr: '843112', cost: '10 €' }]} />
                                    <BkatRow title="Kein Fahrtzweck (Keine Zulassung)" fines={[{ role: 'Fahrer', tbnr: '803600', cost: '70 €' }, { role: 'Halter', tbnr: '803500', cost: '70 €' }]} />
                                </div>
                            </div>
                        )}

                        {/* 5. Versicherungskennzeichen */}
                        {kzView === 'verskennz' && (
                            <div className="animate-in fade-in">
                                <div className="flex items-center gap-2 mb-4 text-teal-700 pb-2 border-b border-slate-50">
                                    <Shield className="w-5 h-5" />
                                    <h3 className="font-black uppercase tracking-wide text-xs">Versicherungskennzeichen</h3>
                                </div>

                                <div className="bg-teal-50 border border-teal-200 p-4 rounded-xl mb-6 text-sm text-teal-900 leading-relaxed">
                                    <strong>Gültigkeitszeitraum:</strong> Die Versicherungskennzeichen (für Mofas, E-Scooter, S-Pedelecs etc.) gelten immer vom <strong>01. März</strong> bis zum Ende des Monats Februar des Folgejahres. Die Farben wiederholen sich alle drei Jahre.
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                                    <div className="flex items-center justify-between bg-slate-50 border border-slate-200 p-3 rounded-xl">
                                        <div>
                                            <div className="text-xs text-slate-400 font-bold uppercase mb-0.5">ab März 2026</div>
                                            <div className="font-black text-slate-700">Schwarz</div>
                                        </div>
                                        <div className="w-12 h-14 rounded bg-slate-900 border border-slate-300 shadow-sm flex flex-col items-center justify-center text-white font-mono font-bold leading-none py-1">
                                            <span className="text-xs">XYZ</span>
                                            <span className="text-xs">789</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between bg-slate-50 border border-slate-200 p-3 rounded-xl">
                                        <div>
                                            <div className="text-xs text-slate-400 font-bold uppercase mb-0.5">ab März 2027</div>
                                            <div className="font-black text-slate-700">Blau</div>
                                        </div>
                                        <div className="w-12 h-14 rounded bg-blue-600 border border-slate-300 shadow-sm flex flex-col items-center justify-center text-white font-mono font-bold leading-none py-1">
                                            <span className="text-xs">DEF</span>
                                            <span className="text-xs">456</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between bg-slate-50 border border-slate-200 p-3 rounded-xl">
                                        <div>
                                            <div className="text-xs text-slate-400 font-bold uppercase mb-0.5">ab März 2028</div>
                                            <div className="font-black text-slate-700">Grün</div>
                                        </div>
                                        <div className="w-12 h-14 rounded bg-green-600 border border-slate-300 shadow-sm flex flex-col items-center justify-center text-white font-mono font-bold leading-none py-1">
                                            <span className="text-xs">GHI</span>
                                            <span className="text-xs">012</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between bg-slate-50 border border-slate-200 p-3 rounded-xl">
                                        <div>
                                            <div className="text-xs text-slate-400 font-bold uppercase mb-0.5">ab März 2029</div>
                                            <div className="font-black text-slate-700">Schwarz</div>
                                        </div>
                                        <div className="w-12 h-14 rounded bg-slate-900 border border-slate-300 shadow-sm flex flex-col items-center justify-center text-white font-mono font-bold leading-none py-1">
                                            <span className="text-xs">JKL</span>
                                            <span className="text-xs">345</span>
                                        </div>
                                    </div>
                                </div>

                                <h4 className="font-bold text-xs uppercase text-slate-500 mb-2 mt-4">Tatbestände & Rechtsfolgen</h4>
                                <div className="bg-slate-50 p-2 sm:p-3 rounded-xl border border-slate-200">
                                    <BkatRow title="Ohne Versicherungsschutz gefahren" fines={[{ role: 'Fahrer', tbnr: '§ 6 (1) PflVG', cost: 'Straftat' }, { role: 'Halter', tbnr: '§ 6 (4) PflVG', cost: 'Straftat' }]} />
                                    <BkatRow title="Bescheinigung nicht mitgeführt" fines={[{ tbnr: '852100', cost: '10 €' }]} />
                                    <BkatRow title="Kennzeichen nicht richtig angebracht" fines={[{ tbnr: '853100', cost: '10 €' }]} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* LASI WISSEN */}
            {view === 'lasi' && (
                <div className="space-y-4">
                    {/* Allgemein */}
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center gap-2 mb-4 text-teal-700 pb-2 border-b border-slate-50">
                            <LashingStrapIcon className="w-5 h-5" />
                            <h3 className="font-black uppercase tracking-wide text-xs">LaSi - Allgemein</h3>
                        </div>
                        <ol className="space-y-3 text-sm text-slate-700 font-medium list-decimal list-inside">
                            <li className="pl-1"><strong>Formschluss</strong> besteht bis zu einem Abstand von 3 cm in alle Richtungen außer hinten, dort maximal 30 cm.</li>
                            <li className="pl-1 leading-relaxed"><strong>Rutschhemmendes Material</strong> kann nur bezüglich des Reibwerts angenommen werden, wenn die Ladung gänzlich durch das rutschhemmende Material vom Boden angehoben wird.</li>
                            <li className="pl-1 leading-relaxed">Wenn die Ladung aufgrund der Reibung bzw. dem Formschluss rechnerisch nicht durch Gurte gesichert werden muss, muss die Ladung dennoch <strong>mindestens durch einen Gurt niedergehalten</strong> werden.</li>
                            <li className="pl-1 leading-relaxed">Ladung, die <strong>freistehend</strong> befördert wird, muss <strong>mindestens durch zwei Zurrgurte</strong> gesichert werden, auch wenn rechnerisch bereits ein Gurt die Ladung sichern würde.</li>
                        </ol>
                    </div>

                  {/* START: Kippgefahr Karte */}
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                      
                      {/* Header-Bereich */}
                      <div className="flex items-center gap-2 mb-4 text-teal-700 pb-2 border-b border-slate-50">
                          <RotateCw className="w-5 h-5" />
                          <h3 className="font-black uppercase tracking-wide text-xs">Kippgefahr</h3>
                      </div>
                      
                      {/* Content: Text und Grafik */}
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 justify-between">
                          
                          {/* Text-Bereich */}
                          <div className="flex-1 text-sm text-slate-700 leading-relaxed font-medium space-y-3">
                              <p>1. Wenn <strong>b größer c</strong>, dann besteht <strong className="text-red-600">Kippgefahr</strong>.</p>
                              <p>2. Somit müssen alle Beschleunigungswerte gemäß der VDI 2700 erhöht werden.</p>
                          </div>

                          {/* Grafik-Bereich */}
                          <div className="flex-shrink-0 bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm w-[160px] sm:w-[180px]">
                              <svg viewBox="0 0 200 240" className="w-full h-auto mx-auto block">
                                  {/* Oranger Rahmen (Ladung) */}
                                  <rect x="20" y="20" width="160" height="200" fill="#ffffff" stroke="#f59e0b" strokeWidth="4" rx="4" />
                                  
                                  {/* Schwerpunkt 'a' */}
                                  <circle cx="100" cy="100" r="5" fill="#ef4444" />
                                  <text x="115" y="105" fontSize="16" fontFamily="sans-serif" fill="#334155" fontWeight="bold">a</text>
                                  
                                  {/* Blaue Linie 'b' (Höhe) */}
                                  <line x1="100" y1="100" x2="100" y2="220" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
                                  <text x="115" y="165" fontSize="16" fontFamily="sans-serif" fill="#334155" fontWeight="bold">b</text>
                                  
                                  {/* Blaue Linie 'c' (Abstand zur Kippkante) */}
                                  <line x1="100" y1="220" x2="180" y2="220" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
                                  <text x="140" y="238" fontSize="16" fontFamily="sans-serif" fill="#334155" fontWeight="bold">c</text>
                              </svg>
                          </div>
                      </div>
                  </div>
                  {/* ENDE: Kippgefahr Karte */}


                    {/* Ablegereife */}
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center gap-2 mb-4 text-teal-700 pb-2 border-b border-slate-50">
                            <AlertTriangle className="w-5 h-5" />
                            <h3 className="font-black uppercase tracking-wide text-xs">Ablegereife</h3>
                        </div>

                        <div className="mb-4 relative">
                            <select 
                                value={lasiAblegereife}
                                onChange={(e) => setLasiAblegereife(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none shadow-sm cursor-pointer"
                            >
                                <option value="gurte">1. Zurrgurte (VDI 2700 Blatt 3.1)</option>
                                <option value="ketten">2. Zurrketten (VDI 2700 Blatt 3.1)</option>
                                <option value="rutsch">3. Rutschhemmendes Material (VDI 2700 Blatt 15)</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                                <ChevronDown className="w-4 h-4" />
                            </div>
                        </div>
                        
                        {/* 1. Zurrgurte */}
                        {lasiAblegereife === 'gurte' && (
                            <div className="animate-in fade-in">
                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-3">
                                    <div>
                                        <strong className="text-xs text-teal-700 uppercase tracking-wide block mb-1">Gewebegurtband:</strong>
                                        <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
                                            <li>Einschnitte größer als 10 %</li>
                                            <li>Verformungen</li>
                                        </ul>
                                    </div>
                                    <div className="border-t border-slate-200 pt-2">
                                        <strong className="text-xs text-teal-700 uppercase tracking-wide block mb-1">Endbeschlagteil:</strong>
                                        <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
                                            <li>Verformung</li>
                                            <li>Risse</li>
                                            <li>Rost</li>
                                        </ul>
                                    </div>
                                    <div className="border-t border-slate-200 pt-2">
                                        <strong className="text-xs text-teal-700 uppercase tracking-wide block mb-1">Etikett:</strong>
                                        <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
                                            <li>fehlt</li>
                                            <li>unleserlich</li>
                                            <li>CE Kennzeichnung vorhanden</li>
                                            <li>Belastbarkeit in kg angegeben</li>
                                        </ul>
                                        <div className="mt-2.5 pt-2.5 border-t border-slate-100 space-y-1.5 text-xs text-slate-700 font-medium">
                                            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-blue-500 shrink-0 shadow-sm border border-blue-600/20"></div>PES (Polyester) = blaues Etikett</div>
                                            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-emerald-500 shrink-0 shadow-sm border border-emerald-600/20"></div>PA (Polyamid) = grünes Etikett</div>
                                            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#8B4513] shrink-0 shadow-sm border border-black/20"></div>PP (Polypropylen) = braunes Etikett</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 2. Zurrketten */}
                        {lasiAblegereife === 'ketten' && (
                            <div className="animate-in fade-in">
                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-3">
                                    <div>
                                        <strong className="text-xs text-teal-700 uppercase tracking-wide block mb-1">Rundstahlkette:</strong>
                                        <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
                                            <li>Oberflächenrisse</li>
                                            <li>Dehnung von mehr als 3 %</li>
                                            <li>Verformungen</li>
                                            <li>Verschleiß von mehr als 10 % der Nenndicke</li>
                                        </ul>
                                    </div>
                                    <div className="border-t border-slate-200 pt-2">
                                        <strong className="text-xs text-teal-700 uppercase tracking-wide block mb-1">Verbindungsstellen / Spannelemente:</strong>
                                        <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
                                            <li>Verformungen</li>
                                            <li>Risse</li>
                                            <li>viel Rost</li>
                                            <li className="leading-snug">Sicherung des Zurrhakens darf fehlen, wenn die Tiefe der Nut mind. dem 5-fachen Wert der Nenndicke der Rundstahlkette entspricht</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 3. Rutschhemmendes Material */}
                        {lasiAblegereife === 'rutsch' && (
                            <div className="animate-in fade-in">
                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                                    <strong className="text-xs text-teal-700 uppercase tracking-wide block mb-2">Rutschhemmendes Material:</strong>
                                    <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
                                        <li>ausgebrochene Materialien</li>
                                        <li>bleibende Druckstellen oder Verformungen</li>
                                        <li>Risse</li>
                                        <li>Schäden durch Kontakt mit aggressiven Stoffen</li>
                                        <li>Verschmutzung die Funktion beeinträchtigt</li>
                                        <li>Versprödung</li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* PKW TRANSPORTER */}
            {view === 'pkw' && (
                <div className="space-y-4">
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center gap-2 mb-6 text-teal-700 pb-2 border-b border-slate-50">
                            <Car className="w-5 h-5" />
                            <h3 className="font-black uppercase tracking-wide text-xs">PKW-Transporter (VDI 2700 Blatt 8.1)</h3>
                        </div>

                        {/* TECHNISCHE DATEN (AUS PDF) */}
                        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl mb-6">
                            <h4 className="font-black text-slate-800 text-sm mb-3 flex items-center gap-2"><Settings className="w-4 h-4 text-slate-500"/> Technische Vorgaben & Zertifikat</h4>
                            
                            <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg flex items-start gap-3 shadow-sm mb-4">
                                <Info className="w-5 h-5 shrink-0 text-amber-500 mt-0.5" />
                                <div className="text-xs text-amber-900 font-medium">
                                    <strong className="block mb-1 text-amber-800">Hinweis zum Zertifikat (Übereinstimmungserklärung)</strong>
                                    Ein Zertifikat ist <strong>kein amtliches Dokument</strong> und es besteht <strong>keine behördliche Mitführpflicht</strong>! Es erleichtert lediglich die Kontrolle, um die Kompatibilität der Fahrbahnelemente mit den Sicherungsmitteln nachzuweisen.
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex gap-3 items-start bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                                    <div className="w-5 h-5 shrink-0 mt-0.5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500"><path d="M2 12h20" /><rect x="8" y="7" width="8" height="10" rx="2" fill="currentColor" fillOpacity="0.1" /><path d="M8 12h8" /><path d="M2 12l2 2" /><path d="M22 12l-2 2" /></svg></div>
                                    <div>
                                        <span className="font-bold text-slate-800 text-xs uppercase block mb-1">Drei-Punkt-Zurrgurte & Controller</span>
                                        <ul className="text-[11px] text-slate-600 list-disc list-inside space-y-0.5">
                                            <li><strong className="text-slate-700">LC:</strong> mind. 1500 daN | <strong className="text-slate-700">STF:</strong> mind. 330 daN</li>
                                            <li><strong className="text-slate-700">Gurtband-Dehnung:</strong> ≤ 4 %</li>
                                            <li><strong className="text-slate-700">Controller (ETA-Wert):</strong> Übertragungswert η ≥ 0,5</li>
                                            <li><strong className="text-slate-700">Controller-Länge:</strong> mind. halber Radumfang (180°)</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-start bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                                    <div className="w-5 h-5 shrink-0 mt-0.5"><Box className="w-full h-full text-yellow-500"/></div>
                                    <div>
                                        <span className="font-bold text-slate-800 text-xs uppercase block mb-1">Radvorleger (Anfahrbügel)</span>
                                        <ul className="text-[11px] text-slate-600 list-disc list-inside space-y-0.5">
                                            <li><strong className="text-slate-700">Höhe:</strong> ≥ 1/6 des Raddurchmessers (mind. 120 mm)</li>
                                            <li><strong className="text-slate-700">Blockierkraft (BC):</strong> ≥ 500 daN</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-start bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                                    <div className="w-5 h-5 shrink-0 mt-0.5"><ShieldCheck className="w-full h-full text-emerald-500"/></div>
                                    <div className="w-full">
                                        <span className="font-bold text-slate-800 text-xs uppercase block mb-1">Sicherungspunkte am Transporter</span>
                                        <table className="w-full text-[10px] text-left text-slate-600 mt-1">
                                            <thead className="text-slate-400 border-b border-slate-100">
                                                <tr><th className="pb-1">Fahrzeugmasse</th><th className="pb-1">Gurtzug 0°</th><th className="pb-1">Gurtzug 45°</th><th className="pb-1">Gurtzug 90°</th></tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-b border-slate-50"><td className="py-1">0 - 1500 kg</td><td className="py-1 font-bold text-slate-700">min. 500 daN</td><td className="py-1 font-bold text-slate-700">min. 500 daN</td><td className="py-1 font-bold text-slate-700">min. 500 daN</td></tr>
                                                <tr><td className="py-1">&gt; 1500 - 4500 kg</td><td className="py-1 font-bold text-slate-700">min. 700 daN</td><td className="py-1 font-bold text-slate-700">min. 700 daN</td><td className="py-1 font-bold text-slate-700">min. 600 daN</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ZULÄSSIGE VERLADEBILDER TABELLE */}
                        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl mb-8">
                            <h4 className="font-black text-slate-800 text-sm mb-3 flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-500"/> Zulässige Verladebilder (Übersicht)</h4>
                            <div className="overflow-x-auto custom-scrollbar">
                                <table className="w-full text-[11px] text-left border-collapse border border-slate-200 min-w-[300px]">
                                    <thead className="bg-slate-800 text-white font-bold uppercase tracking-wider text-[10px]">
                                        <tr>
                                            <th className="p-2 border border-slate-700 w-1/3">Masse des PKW</th>
                                            <th className="p-2 border border-slate-700 w-1/3">Anstellwinkel d. Fahrbahn</th>
                                            <th className="p-2 border border-slate-700 w-1/3">Mögliche Verladebilder</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        <tr>
                                            <td className="p-2 border border-slate-200 font-bold" rowSpan="3">0 - 2000 kg</td>
                                            <td className="p-2 border border-slate-200">max. +/- 25°</td>
                                            <td className="p-2 border border-slate-200 font-black text-indigo-600">1*, 5**</td>
                                        </tr>
                                        <tr>
                                            <td className="p-2 border border-slate-200">max. +10° / -25°</td>
                                            <td className="p-2 border border-slate-200 font-black text-indigo-600">1*, 2, 3, 5**</td>
                                        </tr>
                                        <tr>
                                            <td className="p-2 border border-slate-200">max. +/- 10°</td>
                                            <td className="p-2 border border-slate-200 font-black text-indigo-600">1*, 2, 3, 4, 5**</td>
                                        </tr>
                                        <tr>
                                            <td className="p-2 border border-slate-200 font-bold" rowSpan="3">&gt; 2000 - 3000 kg</td>
                                            <td className="p-2 border border-slate-200">max. +/- 25°</td>
                                            <td className="p-2 border border-slate-200 font-black text-indigo-600">6*, 5**</td>
                                        </tr>
                                        <tr>
                                            <td className="p-2 border border-slate-200">max. +10° / -25°</td>
                                            <td className="p-2 border border-slate-200 font-black text-indigo-600">6*, 3, 5**</td>
                                        </tr>
                                        <tr>
                                         
                                        </tr>
                                        <tr>
                                            <td className="p-2 border border-slate-200 font-bold">&gt; 3000 - 4500 kg</td>
                                            <td className="p-2 border border-slate-200">max. +/- 10° <br/><span className="font-normal text-[9px] text-slate-500">(Über/Unter 10° unzulässig!)</span></td>
                                            <td className="p-2 border border-slate-200 font-black text-indigo-600">5**</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-3 text-[10px] text-slate-500 leading-tight space-y-1">
                                <p><strong className="text-slate-700">* Verladebild 1 bzw. 6</strong> ist im Bereich bis 2000 kg (VB 1) bzw. bis 3000 kg (VB 6) grundsätzlich anzuwenden. Ausweichen auf andere nur, wenn technisch nicht machbar. Kann aus technischen Gründen kein Keil gesetzt werden, darf dieser durch einen weiteren Gurt ersetzt werden.</p>
                                <p><strong className="text-slate-700">** Verladebild 5</strong> ist verpflichtend anzuwenden, wenn der Masseschwerpunkt des transportierten Fahrzeugs hinter der letzten Achse des Transportfahrzeugs/Anhängers liegt (0 - 3000 kg).</p>
              
                            </div>
                        </div>

                        <div className="space-y-8">
                            
                            {/* Verladebilder Detailansicht - ALLE 6 BILDER */}
                            <div>
                                <h4 className="font-black text-slate-800 text-sm mb-3 border-b border-slate-100 pb-2">Alle 6 Verladebilder im Detail</h4>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                                    {/* VB 1 */}
                                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col h-full shadow-sm">
                                        <div className="text-[10px] font-black text-indigo-600 uppercase mb-2 text-center tracking-widest">Verladebild 1</div>
                                        <StaticCarDiagram carConfig={{ fl: { strap: true, chock: 'front' }, fr: { strap: false, chock: 'none' }, rl: { strap: false, chock: 'none' }, rr: { strap: true, chock: 'both' } }} />
                                        <p className="text-[10px] text-slate-600 mt-2 text-center leading-snug flex-grow">
                                            <strong className="text-slate-800">Diagonalsicherung (0-2t):</strong><br/>1 Rad in FR (Gurt + 1 Keil).<br/>1 Rad diagonal gegen FR (Gurt + 2 Keile).
                                        </p>
                                    </div>

                                    {/* VB 2 */}
                                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col h-full shadow-sm">
                                        <div className="text-[10px] font-black text-indigo-600 uppercase mb-2 text-center tracking-widest">Verladebild 2</div>
                                        <StaticCarDiagram carConfig={{ fl: { strap: false, chock: 'none' }, fr: { strap: false, chock: 'front' }, rl: { strap: true, chock: 'both' }, rr: { strap: true, chock: 'none' } }} />
                                        <p className="text-[10px] text-slate-600 mt-2 text-center leading-snug flex-grow">
                                            <strong className="text-slate-800">Alternative (0-2t):</strong><br/>Achse in FR: 1 Vorleger. Achse gegen FR: 2 Gurte + 1 Rad beidseitig gekeilt.
                                        </p>
                                    </div>

                                    {/* VB 3 */}
                                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col h-full shadow-sm">
                                        <div className="text-[10px] font-black text-indigo-600 uppercase mb-2 text-center tracking-widest">Verladebild 3</div>
                                        <StaticCarDiagram carConfig={{ fl: { strap: false, chock: 'none' }, fr: { strap: false, chock: 'none' }, rl: { strap: true, chock: 'both' }, rr: { strap: true, chock: 'both' } }} />
                                        <p className="text-[10px] text-slate-600 mt-2 text-center leading-snug flex-grow">
                                            <strong className="text-slate-800">Achsweise (0-3t):</strong><br/>Beide Räder der Achse gegen FR erhalten Gurt + 2 Keile beidseitig. Vorne frei. Fahrzeug muss in Fahrtrichtung verladen sein.<br/>
                                            <strong className="text-red-600 mt-1 block">Nur bei Vorwärtsverladung!</strong>
                                        </p>
                                    </div>

                                    {/* VB 4 */}
                                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col h-full shadow-sm">
                                        <div className="text-[10px] font-black text-indigo-600 uppercase mb-2 text-center tracking-widest">Verladebild 4</div>
                                        <StaticCarDiagram carConfig={{ fl: { strap: true, chock: 'none' }, fr: { strap: true, chock: 'none' }, rl: { strap: true, chock: 'none' }, rr: { strap: true, chock: 'none' } }} />
                                        <p className="text-[10px] text-slate-600 mt-2 text-center leading-snug flex-grow">
                                            <strong className="text-slate-800">Flacher Winkel max ±10°:</strong><br/>Alle 4 Räder mit Gurt gesichert. Radvorleger nicht erforderlich.
                                        </p>
                                    </div>

                                    {/* VB 5 */}
                                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col h-full shadow-sm">
                                        <div className="text-[10px] font-black text-indigo-600 uppercase mb-2 text-center tracking-widest">Verladebild 5</div>
                                        <StaticCarDiagram carConfig={{ fl: { strap: true, chock: 'both' }, fr: { strap: false, chock: 'none' }, rl: { strap: true, chock: 'both' }, rr: { strap: true, chock: 'both' } }} />
                                        <p className="text-[10px] text-slate-600 mt-2 text-center leading-snug flex-grow">
                                            <strong className="text-slate-800">Max. Sicherung (Zugende):</strong><br/>Mind. 3 Räder mit Gurt + je 2 Keilen beidseitig. (Pflicht bei Schwerpunkt ganz hinten!).
                                        </p>
                                    </div>

                                    {/* VB 6 */}
                                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col h-full shadow-sm">
                                        <div className="text-[10px] font-black text-indigo-600 uppercase mb-2 text-center tracking-widest">Verladebild 6</div>
                                        <StaticCarDiagram carConfig={{ fl: { strap: true, chock: 'front' }, fr: { strap: false, chock: 'none' }, rl: { strap: true, chock: 'both' }, rr: { strap: true, chock: 'both' } }} />
                                        <p className="text-[10px] text-slate-600 mt-2 text-center leading-snug flex-grow">
                                            <strong className="text-slate-800">Schwere PKW (&gt;2t - 3t):</strong><br/>1 Rad in FR (Gurt + Keil) & beide Räder gegen FR voll sichern (Gurt + 2 Keile).
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Legende */}
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                <h5 className="font-black text-slate-800 text-sm mb-3">Legende für Abbildungen:</h5>
                                <ul className="space-y-3 text-sm text-slate-700 font-bold flex flex-wrap gap-x-6 gap-y-2">
                                    <li className="flex items-center gap-2">
                                        <div className="w-5 h-1 bg-[#fde047] shadow-sm"></div>
                                        = Radkeil / Vorleger
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-6 h-3 border-2 border-slate-400 border-t-0 rounded-b-sm shadow-sm"></div> 
                                        = Mulde / Brille
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-6 h-1 bg-[#3b82f6] shadow-sm"></div> 
                                        = Autotransportgurt
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-3 h-5 bg-[#0f172a] rounded-[2px] shadow-sm"></div>
                                        = Rad
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            )}

            {/* RAUCHVERBOT */}
            {view === 'rauchverbot' && (
                 <div className="space-y-4 animate-in fade-in">
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center gap-2 mb-4 text-slate-700 pb-2 border-b border-slate-50">
                            <CigaretteOff className="w-5 h-5" />
                            <h3 className="font-black uppercase tracking-wide text-xs">Landesnichtraucherschutzgesetz (LNRSchG BW)</h3>
                        </div>

                        <div className="bg-red-50 border border-red-200 p-4 rounded-xl mb-5 text-sm text-red-900 leading-relaxed shadow-sm flex items-start gap-3">
                            <AlertTriangle className="w-6 h-6 shrink-0 mt-0.5 text-red-600" />
                            <div>
                                <strong className="block mb-1 text-red-800 text-base uppercase tracking-wide">Neues Rauchverbot (seit 1. Juni 2026)</strong>
                                Die Regelungen gelten <strong>unabhängig vom Nikotin- oder Cannabisgehalt</strong> für klassische Tabakprodukte, E-Zigaretten, Tabakerhitzer und vergleichbare Produkte. Ausnahmen sind in § 4 LNRSchG geregelt.
                            </div>
                        </div>

                        <h4 className="font-bold text-xs uppercase text-slate-500 mb-2">Das Rauchverbot gilt insbesondere:</h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-start gap-3 shadow-sm">
                                <Home className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
                                <div>
                                    <span className="font-bold text-slate-800 text-sm block mb-0.5">In öffentlich zugänglichen Innenräumen</span>
                                    <span className="text-xs text-slate-600">z. B. in Behörden, Geschäften, Restaurants, Kultureinrichtungen, Krankenhäusern u. v. m.</span>
                                </div>
                            </div>
                            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-start gap-3 shadow-sm">
                                <Baby className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
                                <div>
                                    <span className="font-bold text-slate-800 text-sm block mb-0.5">Auf öffentlichen Kinderspielplätzen</span>
                                </div>
                            </div>
                            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-start gap-3 shadow-sm">
                                <Caravan className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
                                <div>
                                    <span className="font-bold text-slate-800 text-sm block mb-0.5">An Haltestellen des ÖPNV</span>
                                    <span className="text-xs text-slate-600">An Bus- und Straßenbahnhaltestellen des öffentlichen Personennahverkehrs.</span>
                                </div>
                            </div>
                            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-start gap-3 shadow-sm">
                                <BookOpen className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
                                <div>
                                    <span className="font-bold text-slate-800 text-sm block mb-0.5">Auf Schulgeländen</span>
                                    <span className="text-xs text-slate-600">Einschließlich der Schulhöfe.</span>
                                </div>
                            </div>
                            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-start gap-3 shadow-sm sm:col-span-2">
                                <Sun className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
                                <div>
                                    <span className="font-bold text-slate-800 text-sm block mb-0.5">In bestimmten Außenbereichen</span>
                                    <span className="text-xs text-slate-600">z. B. in Zoos, Freizeitparks und Freibädern.</span>
                                </div>
                            </div>
                        </div>

                        <h4 className="font-bold text-xs uppercase text-slate-500 mb-2">Kontrollen & Bußgelder</h4>
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-3 text-sm">
                            <p className="text-slate-600 text-xs mb-2">Für die Kontrollen sind die jeweils Verantwortlichen der Bereiche und Einrichtungen beziehungsweise die Ortspolizeibehörden zuständig.</p>
                            
                            <div className="flex gap-2">
                                 <div className="flex-1 bg-white border border-slate-200 p-3 rounded-lg text-center shadow-sm">
                                    <span className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Verstoß (erstmalig)</span>
                                    <span className="text-lg font-black text-red-600">bis zu 200 €</span>
                                 </div>
                                 <div className="flex-1 bg-white border border-slate-200 p-3 rounded-lg text-center shadow-sm">
                                    <span className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Wiederholungsfall</span>
                                    <span className="text-lg font-black text-red-600">bis zu 500 €</span>
                                 </div>
                            </div>
                            
                            <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg flex gap-3 items-start text-xs text-amber-900 mt-3 shadow-sm">
                                <Info className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" />
                                <span><strong>Betreiberpflichten:</strong> Betreiberinnen und Betreiber, die ihren Kennzeichnungs- und Kontrollpflichten nicht nachkommen, müssen mit <strong>höheren Bußgeldern</strong> rechnen.</span>
                            </div>
                        </div>
                    </div>
                 </div>
            )}

            {/* REIFEN */}
            {view === 'reifen' && (
                 <div className="space-y-4 animate-in fade-in">
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center gap-2 mb-4 text-teal-700 pb-2 border-b border-slate-50">
                            <CircleDashed className="w-5 h-5" />
                            <h3 className="font-black uppercase tracking-wide text-xs">Reifen: Kennzeichnung & Vorschriften</h3>
                        </div>

                        <h4 className="font-bold text-slate-800 text-sm mb-3">Reifenkennzeichnung (Beispiel)</h4>
                        <div className="bg-slate-800 text-white p-4 rounded-xl mb-4 text-center shadow-inner">
                            <span className="text-2xl font-black font-mono tracking-widest text-teal-400 drop-shadow-md">205/55 R 16 91 V</span>
                        </div>

                        <div className="space-y-2 text-sm text-slate-700 font-medium mb-6">
                            <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg border border-slate-100"><span className="font-black text-slate-800 w-12 text-teal-600">205</span><span className="text-right">Reifenbreite in mm</span></div>
                            <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg border border-slate-100"><span className="font-black text-slate-800 w-12 text-teal-600">55</span><span className="text-right">Höhen-Breiten-Verhältnis in %</span></div>
                            <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg border border-slate-100"><span className="font-black text-slate-800 w-12 text-teal-600">R</span><span className="text-right">Radiale Bauart <span className="text-[10px] text-slate-400">(D = Diagonal)</span></span></div>
                            <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg border border-slate-100"><span className="font-black text-slate-800 w-12 text-teal-600">16</span><span className="text-right">Felgendurchmesser in Zoll</span></div>
                            <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg border border-slate-100"><span className="font-black text-slate-800 w-12 text-teal-600">91</span><span className="text-right">Tragfähigkeitsindex <span className="text-[10px] text-slate-400">(z.B. 91 = 615 kg)</span></span></div>
                            <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg border border-slate-100"><span className="font-black text-slate-800 w-12 text-teal-600">V</span><span className="text-right">Geschwindigkeitsindex <span className="text-[10px] text-slate-400">(z.B. V = 240 km/h)</span></span></div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex flex-col items-center text-center">
                                <span className="font-black text-slate-700 text-sm mb-1 bg-white px-2 py-0.5 rounded shadow-sm">DOT 1423</span>
                                <span className="text-[10px] text-slate-500 leading-tight">Herstellungsdatum:<br/>14. Kalenderwoche 2023</span>
                            </div>
                            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex flex-col items-center text-center">
                                <span className="font-black text-slate-700 text-sm mb-1 bg-white px-2 py-0.5 rounded shadow-sm">M+S / ⛰️❄️</span>
                                <span className="text-[10px] text-slate-500 leading-tight">Winterreifen<br/>(Alpine-Symbol Pflicht ab 10/24)</span>
                            </div>
                        </div>

                        <h4 className="font-bold text-xs uppercase text-slate-500 mb-2 mt-4">Tatbestände (Auswahl)</h4>
                        <div className="bg-slate-50 p-2 sm:p-3 rounded-xl border border-slate-200">
                            
                            {/* 1. Profil */}
                            <div className="mb-2 pb-2 border-b border-slate-200 last:border-0">
                                <button 
                                    onClick={() => setReifenExpanded(p => ({ ...p, profil: !p.profil }))}
                                    className="flex items-center justify-between w-full text-left outline-none"
                                >
                                    <div className="text-[10px] font-bold text-slate-600 uppercase flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5 text-slate-400"/> Mangelhafte Profil- und Einschnitttiefe</div>
                                    {reifenExpanded.profil ? <ChevronUp className="w-4 h-4 text-slate-400"/> : <ChevronDown className="w-4 h-4 text-slate-400"/>}
                                </button>
                                {reifenExpanded.profil && (
                                    <div className="mt-2 animate-in fade-in">
                                        <div className="flex gap-2 mb-3 pb-3 border-b border-slate-100/60">
                                            <div className="flex-1 bg-white p-2 rounded-lg border border-slate-200 shadow-sm text-center">
                                                <span className="block text-[9px] text-slate-400 font-bold uppercase mb-0.5">Mofa</span>
                                                <span className="font-black text-slate-700 text-xs">mind. 1,0 mm</span>
                                            </div>
                                            <div className="flex-1 bg-white p-2 rounded-lg border border-slate-200 shadow-sm text-center">
                                                <span className="block text-[9px] text-slate-400 font-bold uppercase mb-0.5">Kfz / Anhänger</span>
                                                <span className="font-black text-slate-700 text-xs">mind. 1,6 mm</span>
                                            </div>
                                        </div>
                                        <BkatRow title="Fahrer (Mofa)" fines={[{ tbnr: '336100', cost: '25,00 €' }]} />
                                        <BkatRow title="Fahrer (Kfz / Anhänger)" fines={[{ tbnr: '336606', cost: '60,00 €' }]} />
                                        <BkatRow title="Halter (Selbst geführt)" fines={[{ tbnr: '336618', cost: '75,00 €' }]} />
                                        <BkatRow title="Halter (Mofa zugelassen)" fines={[{ tbnr: '331118', cost: '35,00 €' }]} />
                                        <BkatRow title="Halter (Kfz/Anhänger zugelassen)" fines={[{ tbnr: '331690', cost: '75,00 €' }]} />
                                    </div>
                                )}
                            </div>

                            {/* 2. Winterreifen */}
                            <div className="mb-2 pb-2 border-b border-slate-200 last:border-0">
                                <button 
                                    onClick={() => setReifenExpanded(p => ({ ...p, winter: !p.winter }))}
                                    className="flex items-center justify-between w-full text-left outline-none"
                                >
                                    <div className="text-[10px] font-bold text-slate-600 uppercase flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5 text-slate-400"/> Verstoß gegen Winterreifenpflicht (bei Glätte)</div>
                                    {reifenExpanded.winter ? <ChevronUp className="w-4 h-4 text-slate-400"/> : <ChevronDown className="w-4 h-4 text-slate-400"/>}
                                </button>
                                {reifenExpanded.winter && (
                                    <div className="mt-2 animate-in fade-in">
                                        <BkatRow title="Fahrer" fines={[{ tbnr: '102706', cost: '60,00 €' }]} />
                                        <BkatRow title="Halter (Zulassen)" fines={[{ tbnr: '331638', cost: '75,00 €' }]} />
                                    </div>
                                )}
                            </div>
                            
                            {/* 3. Spikes */}
                            <div className="mb-1">
                                <button 
                                    onClick={() => setReifenExpanded(p => ({ ...p, spikes: !p.spikes }))}
                                    className="flex items-center justify-between w-full text-left outline-none"
                                >
                                    <div className="text-[10px] font-bold text-slate-600 uppercase flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5 text-slate-400"/> Unzulässige Nutzung von Reifen mit Spikes</div>
                                    {reifenExpanded.spikes ? <ChevronUp className="w-4 h-4 text-slate-400"/> : <ChevronDown className="w-4 h-4 text-slate-400"/>}
                                </button>
                                {reifenExpanded.spikes && (
                                    <div className="mt-2 animate-in fade-in">
                                        <BkatRow title="Fahrer" fines={[{ tbnr: '336500', cost: '50,00 €' }]} />
                                        <BkatRow title="Halter (Zulassen)" fines={[{ tbnr: '331512', cost: '75,00 €' }]} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                 </div>
            )}
      </div>
      <AppVersionFooter />
    </div>
  );
}

// --- INFO VIEW ---
function InfoView() {
  const dateTime = useDateTime();
  const [view, setView] = useState('impressum'); 

  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen">
      <div className="bg-slate-800/95 backdrop-blur-md p-4 text-white flex items-center justify-between sticky top-0 z-20 shadow-lg shadow-slate-900/10 no-print">
        <div><h1 className="text-xl font-bold flex items-center gap-2 leading-tight tracking-tight"><FileText className="w-6 h-6 shrink-0" />Rechtliche Hinweise</h1><p className="text-slate-400 text-xs opacity-90 mt-0.5 font-mono flex items-center gap-1.5 ml-8"><Clock className="w-3 h-3" />{dateTime}</p></div>
        <HeaderLogo />
      </div>
      <div className="p-3">
          <div className="flex bg-slate-200 p-1 rounded-xl mb-4 no-print overflow-x-auto gap-1 custom-scrollbar" style={{ WebkitOverflowScrolling: 'touch' }}>
            <button onClick={() => setView('impressum')} className={`flex-1 whitespace-nowrap px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${view === 'impressum' ? 'bg-white shadow text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}>Impressum</button>
            <button onClick={() => setView('privacy')} className={`flex-1 whitespace-nowrap px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${view === 'privacy' ? 'bg-white shadow text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}>Datenschutz</button>
            <button onClick={() => setView('notes')} className={`flex-1 whitespace-nowrap px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${view === 'notes' ? 'bg-white shadow text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}>Haftung</button>
            <button onClick={() => setView('donate')} className={`flex-1 whitespace-nowrap px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${view === 'donate' ? 'bg-white shadow text-pink-600' : 'text-slate-500 hover:text-pink-600'}`}>
                <Heart className="w-3 h-3" />
                Spenden
            </button>
          </div>
          
          <div className="animate-in fade-in duration-300 pb-20 no-print">
            
            {view === 'impressum' && (
                 <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="font-black uppercase tracking-wide text-slate-700 mb-5 text-center">Impressum</h3>
                    <div className="space-y-5 text-sm text-slate-600">
                        <div>
                            <p className="font-bold text-slate-800 mb-1">Angaben gemäß § 5 TMG</p>
                            <p>Simon Demel</p>
                            <p>Ellen-Gottlieb Straße 15</p>
                            <p>79106 Freiburg im Breisgau</p>
                        </div>
                        <div>
                            <p className="font-bold text-slate-800 mb-1">Kontakt</p>
                            <p>E-Mail: <a href="mailto:simondemel@gmx.de" className="text-indigo-600 hover:underline">simondemel@gmx.de</a></p>
                        </div>
                    </div>
                 </div>
            )}

            {view === 'privacy' && (
                 <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="font-black uppercase tracking-wide text-slate-700 mb-5 text-center">Datenschutzerklärung</h3>
                    <div className="space-y-5 text-sm text-slate-600 text-justify">
                        <div>
                            <p className="font-bold text-slate-800 mb-1">1. Datenerfassung & Lokale Verarbeitung</p>
                            <p>Diese Applikation arbeitet primär vollständig lokal auf Ihrem Endgerät ("Client-Side"). Es werden von der Applikationslogik selbst keinerlei personenbezogene Daten (wie Berechnungen, Gewichte, Winkel etc.) an externe Server übertragen oder dort gespeichert.</p>
                        </div>
                        <div>
                            <p className="font-bold text-slate-800 mb-1">2. Hosting (Vercel)</p>
                            <p>Wir hosten unsere Website bei Vercel. Anbieter ist die Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA. Wenn Sie unsere Website besuchen, erfasst Vercel serverseitig standardmäßig Verbindungsdaten (z. B. Ihre IP-Adresse, Browsertyp, Datum und Uhrzeit des Abrufs) in sogenannten Server-Logfiles, um die fehlerfreie Auslieferung der Website und die IT-Sicherheit zu gewährleisten. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Weitere Details finden Sie in der Datenschutzerklärung von Vercel.</p>
                        </div>
                        <div>
                            <p className="font-bold text-slate-800 mb-1">3. Gerätesensoren (Winkelmessung)</p>
                            <p>Für die Funktion der Winkelmessung wird, nach Ihrer ausdrücklichen Zustimmung, kurzzeitig auf die Lagesensoren (Gyroskop) Ihres Gerätes zugegriffen. Diese Daten werden ausschließlich live für die Anzeige in Ihrem Browser verarbeitet und zu keinem Zeitpunkt gespeichert, protokolliert oder an Server übertragen.</p>
                        </div>
                        <div>
                            <p className="font-bold text-slate-800 mb-1">4. Cookies & Tracking</p>
                            <p>Diese Anwendung verwendet keine eigenen Tracking-Cookies oder Analyse-Werkzeuge (z. B. Google Analytics), um das Nutzerverhalten auszuwerten oder Profile zu erstellen.</p>
                        </div>
                    </div>
                 </div>
            )}

            {view === 'notes' && (
                <div className="space-y-4">
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center gap-2 mb-3 text-slate-700 pb-2 border-b border-slate-50"><ShieldAlert className="w-5 h-5 text-amber-500" /><h3 className="font-black uppercase tracking-wide text-xs">Haftungsausschluss (Disclaimer)</h3></div>
                        <p className="text-slate-600 text-sm leading-relaxed text-justify mb-4 font-normal"><strong>Keine Gewähr für Richtigkeit:</strong> Trotz sorgfältiger Programmierung und Prüfung wird keine Haftung für die Richtigkeit, Vollständigkeit oder Aktualität der berechneten Ergebnisse übernommen. Die Ergebnisse stellen <u>keinen</u> rechtsverbindlichen Beweis dar und ersetzen keine amtliche Verwiegung oder gutachterliche Berechnung.</p>
                         <p className="text-slate-600 text-sm leading-relaxed text-justify font-normal">Die Nutzung der Applikation erfolgt auf eigene Gefahr. Für Schäden oder Rechtsfolgen, die aus der Nutzung der hier bereitgestellten Daten entstehen, wird keine Haftung übernommen.</p>
                    </div>
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center gap-2 mb-3 text-slate-700 pb-2 border-b border-slate-50"><Copyright className="w-5 h-5 text-indigo-500" /><h3 className="font-black uppercase tracking-wide text-xs">Geistiges Eigentum</h3></div>
                         <p className="text-slate-600 text-sm leading-relaxed text-justify font-normal">Alle Inhalte, das Design, der Quellcode sowie die in dieser Applikation enthaltenen Grafiken und Berechnungslogiken sind urheberrechtlich geschützt.</p>
                         <p className="text-slate-600 text-sm leading-relaxed text-justify mt-2 font-normal">Eine Vervielfältigung, Bearbeitung, Verbreitung oder jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des Erstellers. Downloads und Kopien sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.</p>
                    </div>
                </div>
            )}

            {view === 'donate' && (
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 text-center">
                    <div className="w-16 h-16 bg-pink-50 text-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-8 h-8 fill-current" />
                    </div>
                    <h3 className="font-black uppercase tracking-wide text-slate-700 mb-2">Unterstützen Sie das Projekt</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                        Diese App wurde mit viel Herzblut entwickelt und wird kostenlos zur Verfügung gestellt. 
                        Wenn Ihnen das Tool im Alltag hilft, würde ich mich riesig über einen kleinen Obolus für die Kaffeekasse freuen!
                    </p>
                    <a 
                        href="https://www.paypal.com/paypalme/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block w-full py-3.5 bg-[#0070BA] text-white font-bold rounded-xl shadow-lg hover:bg-[#003087] transition-all flex items-center justify-center gap-2"
                    >
                        <span className="fill-white"><svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M7.076 21.337l.486-3.08c.133-.84.852-1.464 1.703-1.464h1.725c3.55 0 6.315-1.44 7.15-5.698.417-2.126-.41-4.144-2.85-5.228-2.073-.92-4.947-.64-7.98 1.285l-.57-.027c-.89 0-1.666.626-1.83 1.503L2.83 19.34c-.08.43.25.823.69.823h2.95c.345 0 .64-.236.696-.576l.006-.03z"/></svg></span>
                        <span>Spende per PayPal</span>
                    </a>
                    <p className="text-[10px] text-slate-400 mt-3 mb-4">Sie werden zu PayPal weitergeleitet.</p>
                    
                    <div className="pt-4 border-t border-slate-100">
                        <p className="text-xs text-slate-500 mb-2">Falls der Link nicht funktioniert (manuelle Eingabe):</p>
                        <div className="inline-block bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 text-sm font-mono font-bold text-slate-700 select-all cursor-text shadow-sm">
                            simondemel@gmx.de
                        </div>
                    </div>
                </div>
            )}
          </div>
      </div>
      <AppVersionFooter />
    </div>
  );
}

// --- DRIVER LICENSE MODULE (FÜHRERSCHEIN) ---
const FEV_CLASSES = [
  { c: 'AM', t: 'Kleinkrafträder', d: 'Zweirädrige/dreirädrige Kleinkrafträder, max. 45 km/h, max. 50 ccm Hubraum bzw. max. 4 kW Nutzleistung. Auch leichte vierrädrige Kfz.' },
  { c: 'A1', t: 'Leichtkrafträder', d: 'Krafträder bis 125 ccm, max. 11 kW, Verhältnis Leistung/Gewicht max. 0,1 kW/kg. Dreirädrige Kfz bis 15 kW.' },
  { c: 'A2', t: 'Krafträder (beschränkt)', d: 'Krafträder bis 35 kW, Verhältnis Leistung/Gewicht max. 0,2 kW/kg (darf nicht von Fahrzeug mit mehr als doppelter Leistung abgeleitet sein).' },
  { c: 'A', t: 'Krafträder (unbeschränkt)', d: 'Schwere Krafträder über 35 kW oder Verhältnis Leistung/Gewicht über 0,2 kW/kg.' },
  { c: 'B', t: 'Kraftfahrzeuge (bis 3.500 kg)', d: 'Kfz bis 3.500 kg (max. 8 Pers. außer Fahrer). Anhänger bis 750 kg ODER Anhänger > 750 kg, wenn zGM der Kombination max. 3.500 kg.' },
  { c: 'B96', t: 'Fahrzeugkombination (bis 4.250 kg)', d: 'Erweiterung: Kombination aus Zugfahrzeug Klasse B und Anhänger > 750 kg zGM, zGM der Kombination über 3.500 kg aber max. 4.250 kg.' },
  { c: 'BE', t: 'Fahrzeugkombination (bis 7.000 kg)', d: 'Zugfahrzeug Klasse B + Anhänger über 750 kg zGM, wobei die zGM des Anhängers maximal 3.500 kg betragen darf (Gesamtzug max. 7.000 kg).' },
  { c: 'C1', t: 'Mittelschwere LKW (bis 7.500 kg)', d: 'Kfz über 3.500 kg bis max. 7.500 kg zGM (max. 8 Pers.). Anhänger bis max. 750 kg.' },
  { c: 'C1E', t: 'Fahrzeugkombination C1E', d: 'Zugfahrzeug C1 + Anhänger > 750 kg ODER Zugfahrzeug B + Anhänger > 3.500 kg. Die zGM der Fahrzeugkombination darf 12.000 kg NICHT übersteigen.' },
  { c: 'C', t: 'Schwere LKW', d: 'Kfz über 3.500 kg zGM (nach oben unbegrenzt). Anhänger bis max. 750 kg.' },
  { c: 'CE', t: 'Fahrzeugkombination CE', d: 'Zugfahrzeug Klasse C + Anhänger über 750 kg zGM (Keine Gewichtsobergrenze).' },
  { c: 'D1', t: 'Busse (bis 16 Fahrgäste)', d: 'Kfz zur Personenbeförderung (mehr als 8, max. 16 Pers. außer dem Fahrer). Länge max. 8 Meter. Anhänger bis 750 kg.' },
  { c: 'D1E', t: 'Fahrzeugkombination D1E', d: 'Zugfahrzeug Klasse D1 + Anhänger über 750 kg.' },
  { c: 'D', t: 'Busse (über 16 Fahrgäste)', d: 'Kfz zur Personenbeförderung mit mehr als 8 Personen (unbegrenzt). Anhänger bis 750 kg.' },
  { c: 'DE', t: 'Fahrzeugkombination DE', d: 'Zugfahrzeug Klasse D + Anhänger über 750 kg.' },
  { c: 'L', t: 'Zugmaschinen (bis 40 km/h)', d: 'Zugmaschinen bis 40 km/h (mit Anhänger max. 25 km/h). Selbstfahrende Arbeitsmaschinen/Stapler bis 25 km/h.' },
  { c: 'T', t: 'Zugmaschinen (bis 60 km/h)', d: 'Zugmaschinen bis 60 km/h. Selbstfahrende Arbeitsmaschinen/Stapler bis 40 km/h (jeweils für Land-/Forstwirtschaft).' }
];

const FEV_KEYS = [
  { k: '01', t: 'Korrektur des Sehvermögens und/oder Augenschutz', d: 'Übergeordnete Schlüsselzahl für Sehhilfen' },
  { k: '01.01', t: 'Brille', d: 'Korrektur des Sehvermögens durch Brille' },
  { k: '01.02', t: 'Kontaktlinse(n)', d: 'Korrektur des Sehvermögens durch Kontaktlinse(n)' },
  { k: '01.05', t: 'Augenschutz', d: 'Korrektur des Sehvermögens durch Augenschutz' },
  { k: '01.06', t: 'Brille oder Kontaktlinsen', d: 'Korrektur des Sehvermögens durch Brille oder Kontaktlinsen' },
  { k: '01.07', t: 'Spezifische optische Hilfe', d: 'Korrektur des Sehvermögens durch spezifische optische Hilfe' },
  { k: '02', t: 'Hörhilfe/Kommunikationshilfe', d: 'Hörhilfe / Kommunikationshilfe' },
  { k: '03', t: 'Prothese/Orthese der Gliedmaßen', d: 'Übergeordnete Schlüsselzahl für Prothesen/Orthesen' },
  { k: '03.01', t: 'Prothese/Orthese der oberen Gliedmaßen', d: 'Prothese/Orthese der oberen Gliedmaßen' },
  { k: '03.02', t: 'Prothese/Orthese der unteren Gliedmaßen', d: 'Prothese/Orthese der unteren Gliedmaßen' },
  { k: '10', t: 'Angepasste Schaltung', d: 'Übergeordnete Schlüsselzahl für angepasste Schaltung' },
  { k: '10.02', t: 'Automatische Fahrstufenwahl', d: 'Keine Kupplung / Automatische Fahrstufenwahl' },
  { k: '10.04', t: 'Angepasste Schalteinrichtung', d: 'Angepasste Schalteinrichtung' },
  { k: '15', t: 'Angepasste Kupplung', d: 'Übergeordnete Schlüsselzahl für angepasste Kupplung' },
  { k: '15.01', t: 'Angepasstes Kupplungspedal', d: 'Angepasstes Kupplungspedal' },
  { k: '15.02', t: 'Handkupplung', d: 'Handkupplung' },
  { k: '15.03', t: 'Automatische Kupplung', d: 'Automatische Kupplung' },
  { k: '15.04', t: 'Verhinderung der Blockierung/Betätigung des Kupplungspedals', d: 'Maßnahme zur Verhinderung der Blockierung/Betätigung des Kupplungspedals' },
  { k: '20', t: 'Angepasste Bremsanlage', d: 'Übergeordnete Schlüsselzahl für Bremsanlage' },
  { k: '20.01', t: 'Angepasstes Bremspedal', d: 'Angepasstes Bremspedal' },
  { k: '20.03', t: 'Bremspedal für den linken Fuß', d: 'Bremspedal für den linken Fuß' },
  { k: '20.04', t: 'Bremspedal als Fußraste', d: 'Bremspedal als Fußraste' },
  { k: '20.05', t: 'Bremse (Kipppedal)', d: 'Bremse (Kipppedal)' },
  { k: '20.06', t: 'Angepasste Handbremse', d: 'Angepasste Handbremse' },
  { k: '20.07', t: 'Bremsbetätigung mit maximaler Kraft von ... N', d: 'Bremsbetätigung mit max. Kraft' },
  { k: '20.09', t: 'Angepasste Feststellbremse', d: 'Angepasste Feststellbremse' },
  { k: '20.12', t: 'Maßnahme zur Verhinderung der Betätigung des Bremspedals', d: 'Maßnahme zur Verhinderung der Blockierung/Betätigung' },
  { k: '20.13', t: 'Kniebremse', d: 'Kniebremse' },
  { k: '20.14', t: 'Bremsanlage, unterstützt durch externe Energie', d: 'Bremsanlage, unterstützt durch externe Energie' },
  { k: '25', t: 'Angepasste Beschleunigungsanlage', d: 'Übergeordnete Schlüsselzahl für Gas' },
  { k: '25.01', t: 'Angepasstes Gaspedal', d: 'Angepasstes Gaspedal' },
  { k: '25.03', t: 'Gaspedal (Kipppedal)', d: 'Gaspedal (Kipppedal)' },
  { k: '25.04', t: 'Handgas', d: 'Handgas' },
  { k: '25.05', t: 'Kniegas', d: 'Kniegas' },
  { k: '25.06', t: 'Gasbetätigung, unterstützt durch externe Energie', d: 'Gasbetätigung, unterstützt durch externe Energie' },
  { k: '25.08', t: 'Gaspedal auf der linken Seite', d: 'Gaspedal auf der linken Seite' },
  { k: '25.09', t: 'Maßnahme zur Verhinderung der Betätigung des Gaspedals', d: 'Maßnahme zur Verhinderung der Blockierung/Betätigung' },
  { k: '31', t: 'Anpassungen und Sicherungen der Pedale', d: 'Übergeordnete Schlüsselzahl Pedale' },
  { k: '31.01', t: 'Zusätzlicher Satz Parallelpedale', d: 'Zusätzlicher Satz Parallelpedale' },
  { k: '31.02', t: 'Pedale auf gleicher (oder fast gleicher) Ebene', d: 'Pedale auf gleicher (oder fast gleicher) Ebene' },
  { k: '31.03', t: 'Verhinderung der Betätigung von Gas- und Bremspedal', d: 'Maßnahme zur Verhinderung der Blockierung/Betätigung von Gas- und Bremspedal' },
  { k: '31.04', t: 'Angehobener Boden', d: 'Angehobener Boden' },
  { k: '32', t: 'Kombinierte Gas- und Bremsanlage', d: 'Übergeordnete Schlüsselzahl kombinierte Anlage' },
  { k: '32.01', t: 'Gas und Bremse als kombiniertes System für eine Hand', d: 'Gas und Bremse als kombiniertes System für eine Hand' },
  { k: '32.02', t: 'Gas und Bremse als kombiniertes System (externe Kraft)', d: 'Betätigt durch externe Kraft' },
  { k: '33', t: 'Kombinierte Betriebsbremse, Beschleunigung und Lenkung', d: 'Übergeordnete Schlüsselzahl für kombinierte Systeme' },
  { k: '33.01', t: 'Kombiniertes System, externe Kraft mit einer Hand', d: 'Betätigt durch externe Kraft mit einer Hand' },
  { k: '33.02', t: 'Kombiniertes System, externe Kraft mit beiden Händen', d: 'Betätigt durch externe Kraft mit beiden Händen' },
  { k: '35', t: 'Angepasste Bedienvorrichtungen', d: 'Übergeordnete Schlüsselzahl (Licht, Scheibenwischer, Hupe etc.)' },
  { k: '35.02', t: 'Bedienvorrichtungen (ohne Loslassen der Lenkeinrichtung)', d: 'Können ohne Loslassen der Lenkeinrichtung betätigt werden' },
  { k: '35.03', t: 'Bedienvorrichtungen (linke Hand)', d: 'Können mit der linken Hand betätigt werden' },
  { k: '35.04', t: 'Bedienvorrichtungen (rechte Hand)', d: 'Können mit der rechten Hand betätigt werden' },
  { k: '35.05', t: 'Bedienvorrichtungen (eine Hand)', d: 'Können mit einer Hand betätigt werden' },
  { k: '40', t: 'Angepasste Lenkung', d: 'Übergeordnete Schlüsselzahl für Lenkung' },
  { k: '40.01', t: 'Lenkung mit maximaler Kraft von ... N', d: 'Lenkung mit maximaler Kraft von ... N' },
  { k: '40.05', t: 'Angepasstes Lenkrad', d: 'Angepasstes Lenkrad' },
  { k: '40.06', t: 'Angepasste Lenkradposition', d: 'Angepasste Lenkradposition' },
  { k: '40.09', t: 'Fußlenkung', d: 'Fußlenkung' },
  { k: '40.11', t: 'Lenkradknauf', d: 'Lenkradknauf' },
  { k: '40.14', t: 'Einarmig betätigtes alternatives Lenksystem', d: 'Einarmig betätigtes alternatives Lenksystem' },
  { k: '40.15', t: 'Zweiarmig betätigtes alternatives Lenksystem', d: 'Zweiarmig betätigtes alternatives Lenksystem' },
  { k: '42', t: 'Angepasste Rückspiegel', d: 'Übergeordnete Schlüsselzahl für Rückspiegel' },
  { k: '42.01', t: 'Angepasster Außenrückspiegel', d: 'Angepasster Außenrückspiegel' },
  { k: '42.03', t: 'Zusätzlicher Innenrückspiegel', d: 'Zusätzlicher Innenrückspiegel' },
  { k: '42.05', t: 'Toter-Winkel-Spiegel', d: 'Toter-Winkel-Spiegel' },
  { k: '43', t: 'Angepasster Fahrersitz', d: 'Übergeordnete Schlüsselzahl für Fahrersitz' },
  { k: '43.01', t: 'In der Höhe angepasster Fahrersitz', d: 'In der Höhe angepasster Fahrersitz' },
  { k: '43.02', t: 'Sitz an die Körperform angepasst', d: 'Sitz an die Körperform angepasst' },
  { k: '43.03', t: 'Fahrersitz mit Armlehne', d: 'Fahrersitz mit Armlehne' },
  { k: '43.04', t: 'Fahrersitz mit Trennwand', d: 'Fahrersitz mit Trennwand' },
  { k: '43.06', t: 'Angepasster Sicherheitsgurt', d: 'Angepasster Sicherheitsgurt' },
  { k: '44', t: 'Anpassungen des Kraftrades', d: 'Übergeordnete Schlüsselzahl für Krafträder' },
  { k: '44.01', t: 'Einzeln gesteuerte Bremsen', d: 'Einzeln gesteuerte Bremsen' },
  { k: '44.02', t: 'Angepasste Handbremse', d: 'Angepasste Handbremse (Vorderrad)' },
  { k: '44.03', t: 'Angepasste Fußbremse', d: 'Angepasste Fußbremse (Hinterrad)' },
  { k: '44.04', t: 'Angepasster Beschleunigungsgriff', d: 'Angepasster Beschleunigungsgriff' },
  { k: '44.08', t: 'Sitzhöhe angepasst', d: 'Sitzhöhe so angepasst, dass beide Füße gleichzeitig den Boden erreichen' },
  { k: '44.09', t: 'Angepasste Kraftradbedienung', d: 'Angepasste Kraftradbedienung' },
  { k: '44.11', t: 'Angepasste Fußraste', d: 'Angepasste Fußraste' },
  { k: '44.12', t: 'Angepasster Handgriff', d: 'Angepasster Handgriff' },
  { k: '45', t: 'Kraftrad nur mit Beiwagen', d: 'Nur in Verbindung mit Beiwagen' },
  { k: '46', t: 'Nur dreirädrige Kraftfahrzeuge', d: 'Nur für dreirädrige Kraftfahrzeuge' },
  { k: '47', t: 'Beschränkt auf mehr als zwei Räder', d: 'Keine zweirädrigen Fahrzeuge' },
  { k: '50', t: 'Bestimmtes Fahrzeug / Fahrgestellnummer', d: 'Beschränkt auf ein bestimmtes Fahrzeug/Fahrgestellnummer' },
  { k: '51', t: 'Bestimmtes Kennzeichen', d: 'Beschränkt auf ein bestimmtes amtliches Kennzeichen' },
  { k: '61', t: 'Fahrten bei Tag', d: 'Beschränkt auf Fahrten bei Tag (z.B. eine Stunde nach Sonnenaufgang und eine Stunde vor Sonnenuntergang)' },
  { k: '62', t: 'Umkreis ... km', d: 'Beschränkt auf Fahrten in einem Umkreis von ... km um den Wohnort' },
  { k: '63', t: 'Ohne Beifahrer', d: 'Fahren ohne Beifahrer' },
  { k: '64', t: 'Tempolimit', d: 'Beschränkt auf Fahrten mit einer Geschwindigkeit von max. ... km/h' },
  { k: '65', t: 'Nur in Begleitung', d: 'Fahren nur in Begleitung (z.B. Begleitetes Fahren ab 17)' },
  { k: '66', t: 'Ohne Anhänger', d: 'Ohne Anhänger' },
  { k: '67', t: 'Keine Autobahn', d: 'Fahren auf Autobahnen nicht erlaubt' },
  { k: '68', t: 'Kein Alkohol', d: 'Kein Alkohol' },
  { k: '69', t: 'Alkohol-Interlock', d: 'Beschränkt auf Fahrzeuge mit einer alkoholempfindlichen Wegfahrsperre' },
  { k: '70', t: 'Umtausch des Führerscheins', d: 'Umtausch des Führerscheins Nr. ... ausgestellt durch ... (EU-/Drittland)' },
  { k: '71', t: 'Duplikat des Führerscheins', d: 'Duplikat des Führerscheins Nr. ...' },
  { k: '73', t: 'Beschränkt auf Klasse B (drei-/vierrädrig)', d: 'Beschränkt auf Fahrzeuge der Klasse B von der Art eines dreirädrigen oder vierrädrigen Kraftfahrzeugs' },
  { k: '78', t: 'Automatikgetriebe', d: 'Nur Fahrzeuge mit Automatikgetriebe' },
  { k: '79', t: 'Spezifikationen (Besonderheiten in Klammern)', d: 'Beschränkung auf Fahrzeuge, die den in Klammern angegebenen Spezifikationen entsprechen' },
  { k: '79.01', t: 'Nur zweirädrige Fahrzeuge mit Beiwagen', d: 'Nur zweirädrige Fahrzeuge mit Beiwagen' },
  { k: '79.02', t: 'Nur dreirädrige oder leichte vierrädrige Kfz', d: 'Nur dreirädrige Fahrzeuge oder leichte vierrädrige Kraftfahrzeuge der Klasse AM' },
  { k: '79.03', t: 'Nur dreirädrige Fahrzeuge', d: 'Nur dreirädrige Fahrzeuge' },
  { k: '79.04', t: 'Dreirädrige Fahrzeuge mit Anhänger (bis 750 kg)', d: 'Nur dreirädrige Fahrzeuge mit einem Anhänger mit einer zGM von höchstens 750 kg' },
  { k: '79.05', t: 'Klasse A1 (Leistung/Gewicht > 0,1 kW/kg)', d: 'Krafträder der Klasse A1 mit einem Leistungsgewicht von mehr als 0,1 kW/kg' },
  { k: '79.06', t: 'Klasse BE (Anhänger über 3.500 kg)', d: 'Fahrzeuge der Klasse BE, sofern die zGM des Anhängers 3.500 kg übersteigt' },
  { k: '80', t: 'Alter dreirädrige Kfz (<24)', d: 'Nur für Inhaber einer Fahrerlaubnis für dreirädrige Kraftfahrzeuge der Klasse A, die das 24. Lebensjahr noch nicht vollendet haben' },
  { k: '81', t: 'Alter zweirädrige Kfz (<21)', d: 'Nur für Inhaber einer Fahrerlaubnis für zweirädrige Kraftfahrzeuge der Klasse A, die das 21. Lebensjahr noch nicht vollendet haben' },
  { k: '95', t: 'Berufskraftfahrer (BKrFQG)', d: 'Kraftfahrer, der Inhaber eines Befähigungsnachweises ist (Berufskraftfahrerqualifikationsgesetz)' },
  { k: '96', t: 'Klasse B96 (Gespanne bis 4.250 kg)', d: 'Fahrzeuge der Klasse B mit einem Anhänger über 750 kg zGM, wobei die zGM der Kombination 3.500 kg übersteigt, aber nicht mehr als 4.250 kg beträgt' },
  { k: '97', t: 'Keine Berechtigung für Klasse C1 (Erweiterung)', d: 'Nicht berechtigt zum Führen von Fahrzeugen der Klasse C1, die in den Geltungsbereich der Verordnung (EWG) Nr. 3821/85 fallen' },
  { k: '104', t: 'Gültiges ärztliches Attest mitführen', d: 'Muss ein gültiges ärztliches Attest mitführen' },
  { k: '171', t: 'Klasse C1 auch gültig für Kraftfahrzeuge der Klasse D', d: 'Klasse C1, auch gültig für Kraftfahrzeuge der Klasse D bis 7.500 kg zGM, jedoch ohne Fahrgäste' },
  { k: '172', t: 'Klasse C auch gültig für Kraftfahrzeuge der Klasse D', d: 'Klasse C, auch gültig für Kraftfahrzeuge der Klasse D, jedoch ohne Fahrgäste' },
  { k: '173', t: '(Entfallen) Klasse C1 auch für Klasse D', d: 'Klasse C1, auch gültig für Kraftfahrzeuge der Klasse D bis 7.500 kg zGM (Entfallen)', o: true },
  { k: '174', t: 'Klasse L (gültig auch zum Führen von Zugmaschinen bis 40 km/h)', d: 'Klasse L, gültig auch zum Führen von Zugmaschinen mit einer durch die Bauart bestimmten Höchstgeschwindigkeit von nicht mehr als 40 km/h' },
  { k: '175', t: 'Klasse L (Kfz bis 25 km/h)', d: 'Klasse L, auch gültig zum Führen von Kraftfahrzeugen mit einer durch die Bauart bestimmten Höchstgeschwindigkeit von nicht mehr als 25 km/h' },
  { k: '176', t: '(Entfallen) Klasse L auch für Leichtkrafträder', d: 'Klasse L, auch gültig zum Führen von Krafträdern mit Hubraum bis 125 cm³ und max 11 kW (Entfallen)', o: true },
  { k: '177', t: '(Entfallen) Klasse L auch für Krafträder', d: 'Klasse L, auch gültig zum Führen von Krafträdern ohne Leistungsbeschränkung (Entfallen)', o: true },
  { k: '178', t: 'Klasse D/D1 (Einschränkung Fahrten)', d: 'Klasse D oder D1, nur für Fahrten im Linienverkehr' },
  { k: '179', t: 'Klasse D1 (Einschränkung Fahrten)', d: 'Klasse D1, nur für Fahrten im Linienverkehr' },
  { k: '180', t: '(Entfallen) Klasse T nur für Klasse S (alt)', d: 'Klasse T, jedoch nur gültig für Klasse S (alt) (Entfallen)', o: true },
  { k: '181', t: 'Klasse T (nur Klasse S alt)', d: 'Klasse T, nur gültig für Kraftfahrzeuge der Klasse S (alt)' },
  { k: '182', t: 'Klasse AM (Erweiterung alter Klasse M)', d: 'Klasse AM, auch für Fahrzeuge der bisherigen Klasse M (dreirädrige Leichtkraftfahrzeuge)' },
  { k: '183', t: '(Entfallen) Klasse AM (dreirädrig)', d: 'Klasse AM, jedoch nur gültig für dreirädrige Leichtkraftfahrzeuge (Entfallen)', o: true },
  { k: '184', t: '(Entfallen) Klasse AM (vierrädrig)', d: 'Klasse AM, jedoch nur gültig für vierrädrige Leichtkraftfahrzeuge (Entfallen)', o: true },
  { k: '185', t: '(Entfallen) Klasse C auch für Klasse D (max. 8 Fahrgäste)', d: 'Klasse C, auch gültig für Klasse D, jedoch beschränkt auf Fahrten ohne Fahrgäste oder max. 8 Fahrgäste (Entfallen)', o: true },
  { k: '186', t: '(Entfallen) Klasse B auch für Klasse D (max. 8 Fahrgäste)', d: 'Klasse B, auch gültig für Klasse D, jedoch beschränkt auf Fahrten ohne Fahrgäste oder max. 8 Fahrgäste (Entfallen)', o: true },
  { k: '187', t: '(Entfallen) Klasse C1 auch für Klasse D1 (max. 8 Fahrgäste)', d: 'Klasse C1, auch gültig für Klasse D1, jedoch beschränkt auf Fahrten ohne Fahrgäste oder max. 8 Fahrgäste (Entfallen)', o: true },
  { k: '188', t: '(Entfallen) Klasse C auch für Klasse D (max. 8 Fahrgäste)', d: 'Klasse C, auch gültig für Klasse D, jedoch beschränkt auf Fahrten ohne Fahrgäste oder max. 8 Fahrgäste (Entfallen)', o: true },
  { k: '189', t: '(Entfallen) Klasse B auch für Klasse D (max. 8 Fahrgäste)', d: 'Klasse B, auch gültig für Klasse D, jedoch beschränkt auf Fahrten ohne Fahrgäste oder max. 8 Fahrgäste (Entfallen)', o: true },
  { k: '190', t: '(Entfallen) Klasse C1 auch für Klasse D (max. 8 Fahrgäste)', d: 'Klasse C1, auch gültig für Klasse D, jedoch beschränkt auf Fahrten ohne Fahrgäste oder max. 8 Fahrgäste (Entfallen)', o: true },
  { k: '191', t: '(Entfallen) Klasse C auch für Klasse D (max. 8 Fahrgäste)', d: 'Klasse C, auch gültig für Klasse D, jedoch beschränkt auf Fahrten ohne Fahrgäste oder max. 8 Fahrgäste (Entfallen)', o: true },
  { k: '192', t: '(Entfallen) Klasse B (Gespanne bis 4.250 kg)', d: 'Berechtigt abweichend zum Führen von Fahrzeugen Klasse B mit Anhänger > 750 kg zGM, zGM der Kombination bis 4.250 kg (Vorläufer B96 - Entfallen)', o: true },
  { k: '193', t: '(Entfallen) Klasse B (Gespanne)', d: 'Entfallen', o: true },
  { k: '194', t: '(Entfallen) Klasse B (Carsharing)', d: 'Entfallen', o: true },
  { k: '195', t: 'Klasse AM (Auflage im Inland)', d: 'Auflage zu der Klasse AM: Bis zur Vollendung des 16. LJ nur im Inland.' },
  { k: '196', t: 'Klasse B196', d: 'Im Inland Krafträder (auch mit Beiwagen) mit einem Hubraum von bis zu 125 cm³, eine Motorleistung von nicht mehr als 11 kW, bei denen das Verhältnis der Leistung zum Gewicht 0,1 kW/kg nicht übersteigt' },
  { k: '197', t: 'Prüfung auf Automatik, Schaltkompetenz nachgewiesen', d: 'Die Prüfung wurde auf einem Kraftfahrzeug mit Automatikgetriebe abgelegt und eine praktische Ausbildung zum Führen von Fahrzeugen der Klasse B mit Schaltgetriebe wurde absolviert (§ 17a FeV)' }
];

function DriverLicenseModule() {
  const [subTab, setSubTab] = useState('keys'); // 'keys', 'classes'
  const dateTime = useDateTime();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    // Erlaubt nur Zahlen und Punkte
    const val = e.target.value.replace(/[^0-9.]/g, '');
    setSearchQuery(val);
  };

  // Gefilterte Keys werden NUR berechnet, wenn auch ein Suchbegriff vorhanden ist
  const filteredKeys = searchQuery 
    ? FEV_KEYS.filter(k => k.k.startsWith(searchQuery))
    : [];

  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen">
      <div className="bg-sky-700/95 backdrop-blur-md p-4 text-white flex items-center justify-between sticky top-0 z-20 shadow-lg shadow-sky-900/10 no-print">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2 leading-tight tracking-tight"><CreditCard className="w-6 h-6 shrink-0" /> Führerschein</h1>
          <p className="text-sky-100 text-xs opacity-90 mt-0.5 font-mono flex items-center gap-1.5 ml-8"><Clock className="w-3 h-3" /> {dateTime}</p>
        </div>
        <HeaderLogo />
      </div>

      <div className="p-2 space-y-2 pb-24 no-print">
        {/* Navigation */}
        <div className="bg-white p-1 rounded-xl flex shadow-sm border border-slate-200 mb-2 gap-1 overflow-x-auto custom-scrollbar">
            <button onClick={() => { setSubTab('keys'); setSearchQuery(''); }} className={`flex-1 min-w-[90px] py-2.5 rounded-lg transition-all flex flex-col items-center gap-1 ${subTab === 'keys' ? 'bg-sky-50 text-sky-800 shadow-sm ring-1 ring-sky-200' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}>
                <Search className="w-5 h-5" /><span className="text-[10px] font-bold uppercase tracking-wider">Schlüsselzahlen</span>
            </button>
            <button onClick={() => setSubTab('classes')} className={`flex-1 min-w-[90px] py-2.5 rounded-lg transition-all flex flex-col items-center gap-1 ${subTab === 'classes' ? 'bg-sky-50 text-sky-800 shadow-sm ring-1 ring-sky-200' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}>
                <BookOpen className="w-5 h-5" /><span className="text-[10px] font-bold uppercase tracking-wider">Klassen (§ 6 FeV)</span>
            </button>
        </div>

        {subTab === 'keys' && (
          <div className="animate-in fade-in duration-300">
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 mb-3 sticky top-[80px] z-10">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  inputMode="decimal"
                  placeholder="Suche nach Schlüsselzahl (z. B. 01.01)..." 
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-sky-600 focus:outline-none placeholder:text-slate-400"
                />
                {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-3 top-3 p-0.5 rounded-full hover:bg-slate-200 transition-colors"><X className="w-4 h-4 text-slate-500" /></button>}
              </div>
            </div>

            <div className="space-y-2">
              {!searchQuery ? (
                 <div className="text-center p-8 mt-4 bg-white border border-slate-200 rounded-2xl shadow-sm text-slate-400 text-sm flex flex-col items-center gap-3">
                     <Server className="w-8 h-8 opacity-40 text-sky-600" />
                     <div className="space-y-1">
                         <p className="text-slate-700 font-bold uppercase tracking-wide text-xs">Fahrerlaubnis-Register bereit</p>
                         <p className="text-xs">Bitte geben Sie die zu überprüfende<br/>Schlüsselzahl in das Suchfeld ein.</p>
                     </div>
                 </div>
              ) : filteredKeys.length > 0 ? (
                 filteredKeys.map((item) => (
                   <div key={item.k} className={`bg-white p-4 rounded-xl shadow-sm flex flex-col animate-in fade-in zoom-in-95 duration-200 border-y border-r border-l-4 ${item.o ? 'border-r-red-100 border-y-red-100 border-l-red-600 bg-red-50/20' : 'border-r-slate-200 border-y-slate-200 border-l-slate-700'}`}>
                     <div className="flex items-center gap-3 mb-2 pb-2 border-b border-slate-100 flex-wrap">
                       <span className={`font-mono font-bold text-sm px-2 py-0.5 rounded shadow-sm shrink-0 border ${item.o ? 'bg-red-50 text-red-800 border-red-200' : 'bg-slate-100 text-slate-800 border-slate-300'}`}>{item.k}</span>
                       <span className={`font-bold text-sm tracking-wide ${item.o ? 'text-red-800' : 'text-slate-800'}`}>{item.t}</span>
                       {item.o && (
                         <span className="ml-auto bg-red-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded shadow-sm tracking-widest shrink-0">
                           Außer Kraft / Entfallen
                         </span>
                       )}
                     </div>
                     <span className={`text-xs leading-relaxed text-justify ${item.o ? 'text-red-900 font-medium' : 'text-slate-600'}`}>{item.d}</span>
                   </div>
                 ))
              ) : (
                 <div className="text-center p-6 bg-white border border-slate-200 rounded-2xl shadow-sm text-slate-500 text-sm font-medium">Kein Eintrag im Register gefunden.</div>
              )}
            </div>
          </div>
        )}

        {subTab === 'classes' && (
          <div className="animate-in fade-in duration-300 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {FEV_CLASSES.map((cls, idx) => (
              <div key={cls.c} className={`p-4 flex gap-4 ${idx !== FEV_CLASSES.length - 1 ? 'border-b border-slate-100' : ''}`}>
                <div className="w-12 h-12 shrink-0 bg-slate-800 text-white rounded-lg flex items-center justify-center font-black text-lg shadow-sm">
                  {cls.c}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">{cls.t}</h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed text-justify">{cls.d}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <AppVersionFooter />
    </div>
  );
}

// --- Home VIEW ---
const HomeView = ({ onSelect }) => {
    const dateTime = useDateTime();
    
    // --- HIER UPDATE TEXT EINTRAGEN ---
    const updateText = "🚀 Update 3.0: Reiter Rauchverbot gemäß LNRSchG BW implementiert, Erweiterung im Geschwindigkeitsrechner (i.g.O; a.g.O; BAB), PKW-Transporter nach VDI 2700 Blatt 8.1 implementiert";

    const tiles = [
        { id: 'age', title: 'Altersrechner', icon: Calendar, color: 'text-purple-500', bg: 'bg-purple-50', desc: '' },
        { id: 'license', title: 'Führerschein', icon: CreditCard, color: 'text-sky-500', bg: 'bg-sky-50', desc: 'Schlüsselzahlen • Klassen' },
        { id: 'speed', title: 'Geschwindigkeit', icon: Gauge, color: 'text-amber-500', bg: 'bg-amber-50', desc: 'Laser • Hinterherfahren' },
        { id: 'weight', title: 'Gewichte & Holz', icon: Scale, color: 'text-blue-500', bg: 'bg-blue-50', desc: 'Überladung • Holzgewicht' },
        { id: 'lashing', title: 'Ladungssicherung', icon: Truck, color: 'text-indigo-500', bg: 'bg-indigo-50', desc: 'Niederzurren • Diagonalzurren • PKW-Transporter' },
        { id: 'knowledge', title: 'Wissensdatenbank', icon: BookOpen, color: 'text-teal-500', bg: 'bg-teal-50', desc: '' }
    ];

    return (
        <div className="max-w-md mx-auto bg-slate-50 min-h-screen">
            <div className="bg-slate-800/95 backdrop-blur-md p-4 text-white flex items-center justify-between sticky top-0 z-20 shadow-lg no-print transition-colors duration-300">
                <div>
                    <h1 className="text-xl font-bold flex items-center gap-2 leading-tight tracking-tight">
                        <ShieldCheck className="w-6 h-6 shrink-0 text-indigo-400" /> Home
                    </h1>
                    <p className="text-slate-400 text-xs opacity-90 mt-0.5 font-mono flex items-center gap-1.5 ml-8">
                        <Clock className="w-3 h-3" /> {dateTime}
                    </p>
                </div>
                <HeaderLogo />
            </div>

            {/* --- LAUFSCHRIFT (TICKER) --- */}
            <div className="bg-indigo-600 text-white overflow-hidden flex items-center px-2 py-1.5 text-xs font-bold border-b border-indigo-700 shadow-inner no-print relative pause-marquee">
                <style>{`
                    @keyframes marquee {
                        0% { transform: translateX(0%); }
                        100% { transform: translateX(-100%); }
                    }
                    .animate-marquee {
                        animation: marquee 30s linear infinite;
                    }
                    .pause-marquee:hover .animate-marquee {
                        animation-play-state: paused;
                    }
                `}</style>
                <div className="bg-indigo-800 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider shrink-0 z-10 shadow-sm mr-2 flex items-center gap-1 relative">
                    <AlertCircle className="w-3 h-3" /> Update
                </div>
                <div className="whitespace-nowrap overflow-hidden relative flex-1 flex">
                    <div className="animate-marquee flex shrink-0 gap-8 pr-8 cursor-default">
                        <span>{updateText}</span>
                        <span>{updateText}</span>
                    </div>
                    <div className="animate-marquee flex shrink-0 gap-8 pr-8 cursor-default" aria-hidden="true">
                        <span>{updateText}</span>
                        <span>{updateText}</span>
                    </div>
                </div>
            </div>

            <div className="p-4 animate-in fade-in zoom-in-95 duration-300 pb-20">
                <div className="grid grid-cols-2 gap-3 pt-2">
                    {tiles.map(tile => (
                        <button 
                            key={tile.id} 
                            onClick={() => onSelect(tile.id)} 
                            className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md hover:border-indigo-200 transition-all active:scale-95 group"
                        >
                            <div className={`p-3 rounded-2xl ${tile.bg} mb-3 shadow-inner group-hover:scale-110 transition-transform`}>
                                <tile.icon className={`w-7 h-7 ${tile.color}`} />
                            </div>
                            <h3 className="font-bold text-slate-800 text-[13px] mb-1 leading-tight">{tile.title}</h3>
                            {tile.desc && <p className="text-[10px] text-slate-500 font-medium leading-snug">{tile.desc}</p>}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- MAIN APP COMPONENT ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [knowledgeView, setKnowledgeView] = useState('overview');
  const [knowledgeResetKey, setKnowledgeResetKey] = useState(0); // <--- NEU: Zähler für den Reset
  const [returnTab, setReturnTab] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleNavigateKnowledge = (viewId) => {
      setKnowledgeView(viewId);
      setReturnTab(activeTab); // Merkt sich den vorherigen Tab (z.B. den Rechner)
      setActiveTab('knowledge');
      setKnowledgeResetKey(prev => prev + 1); // <--- NEU: Zwingt die Wissensdatenbank zum Neuladen beim Einsprung aus dem Rechner
  };

  const handleTabChange = (tabId) => {
      setActiveTab(tabId);
      setReturnTab(null); // Setzt den Zurück-Button zurück, wenn man manuell im Menü navigiert
      
      // NEU: Wenn die Wissensdatenbank manuell geöffnet wird (z.B. übers Home),
      // wird sie immer auf die Startseite ("overview") zurückgesetzt.
      if (tabId === 'knowledge') {
          setKnowledgeView('overview');
          setKnowledgeResetKey(prev => prev + 1); // <--- NEU: Zwingt die Wissensdatenbank zum Neuladen
      }
  };

  useEffect(() => { window.scrollTo(0, 0); }, [activeTab]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode: () => setIsDarkMode(!isDarkMode) }}>
      <div className={isDarkMode ? 'dark' : ''}>
        <style>{darkThemeCSS}</style>
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col relative selection:bg-indigo-100 transition-colors duration-300">
          <PrintStyles />
          <div className="flex-1 pb-24 z-10 relative">
            <div className={activeTab === 'home' ? 'block' : 'hidden'}><HomeView onSelect={handleTabChange} /></div>
            <div className={activeTab === 'weight' ? 'block' : 'hidden'}><WeightModule /></div>
            <div className={activeTab === 'speed' ? 'block' : 'hidden'}><SpeedCalculator /></div>
            <div className={activeTab === 'age' ? 'block' : 'hidden'}><AgeCalculator /></div>
            <div className={activeTab === 'knowledge' ? 'block' : 'hidden'}><KnowledgeBaseView key={knowledgeResetKey} initialView={knowledgeView} onBack={returnTab ? () => handleTabChange(returnTab) : null} /></div>
            <div className={activeTab === 'license' ? 'block' : 'hidden'}><DriverLicenseModule /></div>
            <div className={activeTab === 'info' ? 'block' : 'hidden'}><InfoView /></div>
            <div className={activeTab === 'lashing' ? 'block' : 'hidden'}><LashingCalculator onOpenKnowledge={handleNavigateKnowledge} /></div>
          </div>
          <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-safe z-50 no-print transition-colors duration-300">
            <div className="max-w-md mx-auto flex justify-evenly items-center p-2">
              <button onClick={() => handleTabChange('home')} className={`w-24 flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 ${activeTab === 'home' ? 'text-indigo-600 bg-indigo-50 shadow-sm' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}>
                <Home className="w-6 h-6" />
                <span className="text-[10px] font-bold uppercase tracking-widest mt-0.5">Home</span>
              </button>
              <button onClick={() => handleTabChange('info')} className={`w-24 flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 ${activeTab === 'info' ? 'text-slate-800 bg-slate-100 shadow-sm' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}>
                <FileText className="w-6 h-6" />
                <span className="text-[10px] font-bold uppercase tracking-widest mt-0.5">Infos</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
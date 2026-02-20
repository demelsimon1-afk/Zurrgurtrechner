import React, { useState, useEffect, useRef } from 'react';
import { 
  Scale, AlertTriangle, CheckCircle, Info, Box, Truck, ShieldCheck, 
  ShieldAlert, Trees, Ruler, Clock, CheckSquare, Settings, ChevronRight, 
  Droplets, Weight, Gavel, User, Briefcase, FileText, X, Edit3, 
  Calculator, Smartphone, RotateCw, Lock, MapPin, Gauge, Car, Zap, 
  Copyright, Caravan, Calendar, UserPlus, Eye, EyeOff, Globe, Server, Cookie, UserCheck, Printer,
  List, Heart, Coffee, BookOpen, AlertCircle, Syringe, Fingerprint, Scale as ScaleLaw, Key, Download
} from 'lucide-react';

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
      svg {
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

const TrafficSign = ({ value, selected, onClick }) => (
    <button 
        onClick={onClick}
        className={`traffic-sign relative flex items-center justify-center w-12 h-12 rounded-full border-4 bg-white shadow-md transition-all duration-200 ${selected ? 'border-red-600 scale-110 ring-2 ring-red-200 z-10' : 'border-red-600/80 scale-100 opacity-70 hover:opacity-100 hover:scale-105'}`}
    >
        <span className="font-black text-slate-900 text-sm tracking-tighter">{value}</span>
    </button>
);

const HeaderLogo = () => (
  <span className="text-base font-black text-white/50 tracking-wider italic select-none border border-white/20 px-3 py-1 rounded-md backdrop-blur-sm no-print">
    Demel
  </span>
);

const AppVersionFooter = () => (
    <div className="text-center text-[10px] text-slate-300 font-mono py-2 select-none no-print">
        RoadTool v. 2.5
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

// --- ANGLE MEASUREMENT MODAL ---
const AngleMeasureModal = ({ isOpen, onClose, onApply }) => {
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
                 const rounded = Math.ceil(diff / 5) * 5;
                 setMeasuredAngle(rounded);
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

    const handleZero = () => { referenceBetaRef.current = currentBeta; setStep(3); };
    const stopSensors = () => { window.removeEventListener('deviceorientation', handleOrientation); };
    const handleClose = () => { stopSensors(); onClose(); };
    const handleApply = () => { stopSensors(); onApply(measuredAngle); };

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
                                 <div className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wide mb-2">Wichtig: Ladefläche nullen</div>
                                 <h4 className="font-bold text-slate-700 text-lg">Sensor Nullen</h4>
                                 <p className="text-slate-500 text-sm mt-2 leading-relaxed">Gerät flach auf den <strong>Ladeboden</strong> legen, um die Neigung auszugleichen.</p>
                             </div>
                             <button onClick={handleZero} className="w-full py-3 bg-slate-800 text-white font-bold rounded-xl shadow-lg hover:bg-slate-700 active:scale-95 transition-all">Jetzt Nullen (Referenz)</button>
                          </div>
                    )}
                    {step === 3 && (
                        <div className="text-center space-y-6">
                            <div className="py-4"><span className="text-6xl font-black text-indigo-600 tracking-tighter tabular-nums">{measuredAngle}°</span><p className="text-xs font-bold text-slate-400 uppercase mt-1 tracking-wide">Echtzeit (Aufgerundet +5°)</p></div>
                            <div><p className="text-slate-500 text-sm leading-relaxed">Gerät nun auf den <strong>Zurrgurt</strong> legen.</p></div>
                            <button onClick={handleApply} className="w-full py-3 bg-emerald-500 text-white font-bold rounded-xl shadow-lg hover:bg-emerald-600 active:scale-95 transition-all flex items-center justify-center gap-2"><CheckCircle className="w-5 h-5" />Wert übernehmen</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- CALCULATOR COMPONENTS ---

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
    const [vehicleType, setVehicleType] = useState('pkw'); 
    const [allowedSpeed, setAllowedSpeed] = useState('');
    const [measuredSpeedRaw, setMeasuredSpeedRaw] = useState('');
    const [followDistance, setFollowDistance] = useState('');
    const [result, setResult] = useState(null);
    const dateTime = useDateTime();

    const getViolation = (exceedance, type) => {
        if (exceedance < 16) return null;
        if (type === 'pkw_trailer') {
            if (exceedance <= 20) return { cost: '140 €', points: '1', ban: '-', id: '118632' };
            if (exceedance <= 25) return { cost: '150 €', points: '1', ban: '-', id: '118633' };
            if (exceedance <= 30) return { cost: '175 €', points: '1', ban: '-', id: '118634' };
            if (exceedance <= 40) return { cost: '255 €', points: '2', ban: '1 M', id: '118635' };
            if (exceedance <= 50) return { cost: '480 €', points: '2', ban: '1 M', id: '118636' };
            if (exceedance <= 60) return { cost: '600 €', points: '2', ban: '2 M', id: '118637' }; 
            if (exceedance <= 70) return { cost: '700 €', points: '2', ban: '3 M', id: '118638' }; 
            return { cost: '800 €', points: '2', ban: '3 M', id: '118639' }; 
        }
        if (exceedance <= 20) return { cost: '60 €', points: '-', ban: '-', id: '141720' };
        if (exceedance <= 25) return { cost: '100 €', points: '1', ban: '-', id: '141721' };
        if (exceedance <= 30) return { cost: '150 €', points: '1', ban: '-', id: '141722' };
        if (exceedance <= 40) return { cost: '200 €', points: '1', ban: '-', id: '141723' };
        if (exceedance <= 50) return { cost: '320 €', points: '2', ban: '1 M', id: '141724' };
        if (exceedance <= 60) return { cost: '480 €', points: '2', ban: '1 M', id: '141725' };
        if (exceedance <= 70) return { cost: '600 €', points: '2', ban: '2 M', id: '141726' };
        return { cost: '700 €', points: '2', ban: '3 M', id: '141727' };
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
        const violation = getViolation(exceedance, vehicleType);
        setResult({ netSpeed: Math.round(netSpeed), tolerance: tolerance, exceedance: Math.round(exceedance), violation: violation, formula: formula });
    }, [mode, allowedSpeed, measuredSpeedRaw, vehicleType]);

    return (
        <div className="max-w-md mx-auto bg-slate-50 min-h-screen">
            <div className="bg-amber-600/95 backdrop-blur-md p-4 text-white flex items-center justify-between sticky top-0 z-20 shadow-lg shadow-amber-900/10 no-print">
                <div><h1 className="text-xl font-bold flex items-center gap-2 leading-tight tracking-tight"><Gauge className="w-6 h-6 shrink-0" />Geschwindigkeitsrechner</h1><p className="text-amber-100 text-xs opacity-90 mt-0.5 font-mono flex items-center gap-1.5 ml-8"><Clock className="w-3 h-3" />{dateTime}</p></div>
                <HeaderLogo />
            </div>

            <div className="p-2 space-y-2 no-print">
                <div className="bg-white p-1 rounded-xl flex shadow-sm border border-slate-100 mb-2">
                    <button onClick={() => setMode('laser')} className={`flex-1 py-2 text-xs font-bold uppercase rounded-lg transition-all ${mode === 'laser' ? 'bg-amber-100 text-amber-800 shadow-sm' : 'text-slate-400'}`}>Laser</button>
                    <button onClick={() => setMode('follow')} className={`flex-1 py-2 text-xs font-bold uppercase rounded-lg transition-all ${mode === 'follow' ? 'bg-amber-100 text-amber-800 shadow-sm' : 'text-slate-400'}`}>Hinterherfahren</button>
                </div>

                <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
                    {mode === 'laser' && (
                        <div className="mb-4">
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Fahrzeugtyp</label>
                            <div className="flex gap-2">
                                <button onClick={() => setVehicleType('pkw')} className={`flex-1 p-2 rounded-xl border-2 flex flex-col items-center gap-1 transition-all ${vehicleType === 'pkw' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-slate-100 text-slate-400'}`}><Car className="w-6 h-6" /><span className="text-[10px] font-bold">PKW</span></button>
                                <button onClick={() => setVehicleType('pkw_trailer')} className={`flex-1 p-2 rounded-xl border-2 flex flex-col items-center gap-1 transition-all ${vehicleType === 'pkw_trailer' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-slate-100 text-slate-400'}`}><CarWithTrailerIcon className="w-8 h-8" /><span className="text-[10px] font-bold text-center">PKW mit<br/>Anhänger</span></button>
                            </div>
                        </div>
                    )}
                    <div className="space-y-4 mb-4">
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-0.5 ml-1">Zulässige Höchstgeschwindigkeit</label>
                        <div className="flex justify-between items-center px-1">
                            {[60, 70, 80, 100, 120].map(v => (<TrafficSign key={v} value={v} selected={allowedSpeed == v} onClick={() => setAllowedSpeed(v.toString())} />))}
                        </div>
                    </div>
                    <div className="space-y-3">
                        <InputWithIcon icon={Gauge} label={mode === 'laser' ? "Gemessener Wert (Brutto)" : "Abgelesener Tacho-Wert"} value={measuredSpeedRaw} onChange={(e) => setMeasuredSpeedRaw(e.target.value)} placeholder="0" />
                        {mode === 'follow' && (<InputWithIcon icon={Ruler} label="Nachfahrstrecke (ca. Meter)" value={followDistance} onChange={(e) => setFollowDistance(e.target.value)} placeholder="z.B. 500" />)}
                    </div>
                </div>

                {result && (
                    <div className="space-y-3">
                        <div className="bg-white border-2 border-amber-100 rounded-2xl p-4 shadow-xl">
                            <div className="flex justify-between items-center mb-2 border-b border-slate-50 pb-2">
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
                                    <div><div className="text-[10px] text-slate-400 uppercase font-bold">Punkte</div><div className="text-xl font-bold">{result.violation.points}</div></div>
                                    <div><div className="text-[10px] text-slate-400 uppercase font-bold">Fahrverbot</div><div className="text-xl font-bold">{result.violation.ban}</div></div>
                                    <div><div className="text-[10px] text-slate-400 uppercase font-bold">TBNR</div><div className="text-sm font-mono bg-slate-700 px-2 py-0.5 rounded inline-block mt-0.5">{result.violation.id}</div></div>
                                </div>
                            </div>
                        ) : (<div className="bg-green-50 text-green-700 p-3 rounded-xl text-center text-xs font-bold border border-green-200">Keine Maßnahmen im hinterlegten Bereich (&lt; 16 km/h)</div>)}
                    </div>
                )}
            </div>
            <AppVersionFooter />
        </div>
    );
}

function WoodCalculator() {
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
                 if (p > 25) return { cost: '425 €', points: '1', ban: '', tbnr: '331787' };
                 if (p > 20) return { cost: '380 €', points: '1', ban: '', tbnr: '331786' };
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

function OverloadCalculator() {
  const [mode, setMode] = useState('single'); 
  const [isCommercial, setIsCommercial] = useState(false);
  const [useCustomTolerance, setUseCustomTolerance] = useState(false); // NEUER STATE FÜR MANUELLE TOLERANZ
  
  const [allowedWeight1, setAllowedWeight1] = useState('');
  const [actualWeight1, setActualWeight1] = useState('');
  const [customTol1, setCustomTol1] = useState(''); // NEUER STATE

  const [allowedWeight2, setAllowedWeight2] = useState('');
  const [actualWeight2, setActualWeight2] = useState('');
  const [customTol2, setCustomTol2] = useState(''); // NEUER STATE
  
  const [totalAllowed, setTotalAllowed] = useState('');
  const [result, setResult] = useState(null);
  const dateTime = useDateTime();

  const tractorLimit = parseFloat(allowedWeight1) || 0;
  const show35tOption = tractorLimit > 0 && tractorLimit <= 25000;

  const standardTotalWeights = [
      { label: 'Kombination < 4 Achsen', val: '28000', detail: '28 t' },
      show35tOption 
        ? { label: '4 Achsen (Zugf. ≤ 25t zGM)', val: '35000', detail: '35 t' }
        : { label: '4 Achsen (2 ZM + 2 Anh)', val: '36000', detail: '36 t' },
      { label: 'Kombination > 4 Achsen', val: '40000', detail: '40 t' }
  ];

  useEffect(() => { setResult(null); setAllowedWeight2(''); setActualWeight2(''); setTotalAllowed(''); setCustomTol2(''); }, [mode]);

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
        
        return { actual, allowed, tolerance, netWeight, difference, percentage, isOverloaded: allowed > 0 && difference > 0, isValidInput: !isNaN(actual) };
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

  const resetForm = () => { setAllowedWeight1(''); setActualWeight1(''); setAllowedWeight2(''); setActualWeight2(''); setTotalAllowed(''); setCustomTol1(''); setCustomTol2(''); setUseCustomTolerance(false); setResult(null); };

  const checkConfiscation = (res) => {
      if (!res || !isCommercial || !res.isOverloaded) return false;
      if (res.allowed > 3500 && res.percentage >= 15) return true;
      if (res.allowed > 0 && res.allowed <= 3500 && res.percentage >= 20) return true;
      return false;
  };

  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen">
      
      {/* PRINT VIEW ONLY */}
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
                <div>Status: {result.vehicle1?.isOverloaded ? <span className="print-warning">ÜBERLADEN ({result.vehicle1.percentage.toFixed(2)}%)</span> : 'In Ordnung'}</div>
                {result.vehicle1?.isOverloaded && (
                    <div>Differenz: +{result.vehicle1.difference.toLocaleString()} kg</div>
                )}
                {checkConfiscation(result.vehicle1) && <div className="print-warning" style={{marginTop: '5px'}}>⚠️ Einziehung möglich!</div>}
                <PrintFineDisplay result={result.vehicle1} isTrailer={false} isCombination={false} />
            </div>

            {/* RESULTS VEHICLE 2 */}
            {mode === 'combination' && (
            <div className="print-result-box">
                <div className="print-result-header">Anhänger</div>
                <div>Status: {result.vehicle2?.isOverloaded ? <span className="print-warning">ÜBERLADEN ({result.vehicle2.percentage.toFixed(2)}%)</span> : 'In Ordnung'}</div>
                {result.vehicle2?.isOverloaded && (
                    <div>Differenz: +{result.vehicle2.difference.toLocaleString()} kg</div>
                )}
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
                        <tr><th>Summe Netto-Gewichte</th><td>{result.total.netWeight.toLocaleString()} kg</td></tr>
                    </tbody>
                </table>
                <div>Status: {result.total.isOverloaded ? <span className="print-warning">ÜBERLADEN ({result.total.percentage.toFixed(2)}%)</span> : 'In Ordnung'}</div>
                {result.total.isOverloaded && (
                    <div>Differenz: +{result.total.difference.toLocaleString()} kg</div>
                )}
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
        <HeaderLogo />
      </div>
      
      <div className="p-2 space-y-2 no-print">
        
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
                <span className="text-[10px] font-bold uppercase text-slate-400 group-hover:text-slate-600 transition-colors">Eigene Wiegetoleranz (kg) eingeben, sonst Toleranz der GZA Weil am Rhein</span>
             </label>
        </div>

        <div className="bg-white p-1 rounded-xl flex shadow-sm border border-slate-100 mb-2">
            <button onClick={() => setMode('single')} className={`flex-1 py-2 rounded-lg transition-all flex flex-col items-center gap-1 ${mode === 'single' ? 'bg-blue-50 text-blue-800 shadow-sm ring-1 ring-blue-200' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}>
                <Truck className="w-6 h-6" />
                <span className="text-[10px] font-bold uppercase">Einzelfahrzeug</span>
            </button>
            <button onClick={() => setMode('combination')} className={`flex-1 py-2 rounded-lg transition-all flex flex-col items-center gap-1 ${mode === 'combination' ? 'bg-blue-50 text-blue-800 shadow-sm ring-1 ring-blue-200' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}>
                <TruckTrailerIcon className="w-8 h-8" />
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
                    <InputWithIcon icon={ShieldCheck} label="zGM (kg)" value={allowedWeight1} onChange={(e) => setAllowedWeight1(e.target.value)} />
                    <InputWithIcon icon={Scale} label="Ist (kg)" value={actualWeight1} onChange={(e) => setActualWeight1(e.target.value)} />
                    {useCustomTolerance && (
                        <div className="pt-2 border-t border-slate-50 mt-2 animate-in fade-in">
                            <InputWithIcon icon={Edit3} label="Toleranzabzug (kg)" value={customTol1} onChange={(e) => setCustomTol1(e.target.value)} placeholder="0" />
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
                        <InputWithIcon icon={ShieldCheck} label="zGM (kg)" value={allowedWeight2} onChange={(e) => setAllowedWeight2(e.target.value)} />
                        <InputWithIcon icon={Scale} label="Ist (kg)" value={actualWeight2} onChange={(e) => setActualWeight2(e.target.value)} />
                        {useCustomTolerance && (
                            <div className="pt-2 border-t border-slate-50 mt-2 animate-in fade-in">
                                <InputWithIcon icon={Edit3} label="Toleranzabzug (kg)" value={customTol2} onChange={(e) => setCustomTol2(e.target.value)} placeholder="0" />
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
                   <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1">Standardwerte (zGM Gesamtzug)</label>
                   <select 
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-700"
                        onChange={(e) => {
                            if (e.target.value) setTotalAllowed(e.target.value);
                        }}
                        value={standardTotalWeights.find(opt => opt.val === totalAllowed)?.val || ""}
                   >
                       <option value="" disabled>Bitte wählen oder manuell eingeben...</option>
                       {standardTotalWeights.map((opt) => (
                           <option key={opt.val} value={opt.val}>
                               {opt.label} ({opt.detail})
                           </option>
                       ))}
                       <option value="custom">Eigener Wert (manuell unten)</option>
                   </select>
                </div>

                <div className="space-y-2">
                    <InputWithIcon icon={ShieldCheck} label="zGM Gesamtzug Manuell (kg)" value={totalAllowed} onChange={(e) => setTotalAllowed(e.target.value)} placeholder="zGM Zug laut Schein" />
                </div>
            </div>
        )}

        {!result && <div className="bg-blue-50/50 p-3 rounded-xl flex gap-2 text-blue-700 text-xs border border-blue-100"><Info className="w-5 h-5 shrink-0" /><p>Bitte füllen Sie die Felder für eine Berechnung aus.</p></div>}
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

                         <OverloadFormulaDisplay values={{ actual: result.vehicle1.actual, tolerance: result.vehicle1.tolerance, net: result.vehicle1.netWeight, allowed: result.vehicle1.allowed, diff: result.vehicle1.difference, percent: result.vehicle1.percentage }} />
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

                         <OverloadFormulaDisplay values={{ actual: result.vehicle2.actual, tolerance: result.vehicle2.tolerance, net: result.vehicle2.netWeight, allowed: result.vehicle2.allowed, diff: result.vehicle2.difference, percent: result.vehicle2.percentage }} />
                         <FineDisplay result={result.vehicle2} isTrailer={true} isCombination={false} />
                     </div>
                 </div>
             )}
          </div>

          {result.total && result.total.isValidInput && (
              <div className={`mt-2 p-3 rounded-2xl border-4 shadow-xl transition-all ${result.total.isOverloaded ? 'bg-red-50 border-red-600' : 'bg-slate-50 border-slate-400'}`}>
                <div className="flex justify-between items-center mb-1.5">
                    <span className="font-black text-slate-800 flex items-center gap-1.5 text-base uppercase tracking-wider">
                        <TruckTrailerIcon className="w-6 h-6"/> Gesamter Zug
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

                    <OverloadFormulaDisplay values={{ actual: result.total.actual, tolerance: result.total.tolerance, net: result.total.netWeight, allowed: result.total.allowed, diff: result.total.difference, percent: result.total.percentage }} isTotal={true} />
                    <FineDisplay result={result.total} isTrailer={false} isCombination={true} />
                </div>
            )}
          <button onClick={resetForm} className="mt-6 w-full py-2.5 text-slate-400 text-sm hover:text-slate-600 font-bold tracking-wide uppercase transition-colors">Alle Eingaben löschen</button>
          
          <PrintButton />
        </div>
      )}
      <AppVersionFooter />
    </div>
  );
}

// --- LASHING CALCULATOR ---
function LashingCalculator() {
  const [lashingType, setLashingType] = useState('nieder'); // Toggle zwischen 'nieder' und 'diagonal'

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
  const [wallFront, setWallFront] = useState(''); 
  const [wallSide, setWallSide] = useState('');    
  const [wallRear, setWallRear] = useState('');    
  const [fitFront, setFitFront] = useState(false);
  const [fitSide, setFitSide] = useState(false);
  const [fitRear, setFitRear] = useState(false);
  const [bodyCert, setBodyCert] = useState('NONE'); 
  const [isTipping, setIsTipping] = useState(false);
  const [lashingResult, setLashingResult] = useState(null);
  const [fineGroups, setFineGroups] = useState([]);
  const [isMeasureModalOpen, setIsMeasureModalOpen] = useState(false);
  const [showFines, setShowFines] = useState(false);
  const dateTime = useDateTime();

  const handleBlur = (type, val, setter) => {
    let num = parseFloat(val);
    if (isNaN(num)) setter('0');
  };

  const getStandardForces = () => {
    const total = parseFloat(allowedWeight) || 0;
    const empty = parseFloat(emptyWeight) || 0;
    const payload = Math.max(0, total - empty);
    if (bodyCert === 'L') return { front: 5000, side: Math.round(payload * 0.15), rear: 3100 };
    if (bodyCert === 'XL') return { Math: Math.round(payload * 0.50), side: Math.round(payload * 0.30), rear: Math.round(payload * 0.40) };
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
    const stfInNewton = s_tf * 10; 

    // ACCELERATION FACTOR SELECTION
    let accFwd, accSide, accRear;
    if (!maxWeight || maxWeight <= 1999) {
        accFwd = isTipping ? 1.08 : 0.90; accSide = isTipping ? 0.84 : 0.70; accRear = isTipping ? 0.60 : 0.50;
    } else if (maxWeight <= 3500) {
        accFwd = isTipping ? 0.96 : 0.80; accSide = isTipping ? 0.72 : 0.60; accRear = isTipping ? 0.60 : 0.50;
    } else {
        accFwd = isTipping ? 0.96 : 0.80; accSide = isTipping ? 0.60 : 0.50; accRear = isTipping ? 0.60 : 0.50;
    }

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
    const nRear = calculateN(accRear, calculateN(accRear, fitRear ? wallRear : 0, 'rear'));

    setLashingResult({
      forward: nForward, side: nSide, rear: nRear,
      factorForward: accFwd, factorSide: accSide, factorRear: accRear,
      weightClassInfo: !maxWeight ? '< 2000 kg (Standard)' : maxWeight <= 1999 ? '< 2000 kg' : maxWeight <= 3500 ? '2000 - 3500 kg' : '> 3500 kg',
      displayValues: { weightForceN: m * g, c: accFwd, formForceN: (parseFloat(fitFront ? wallFront : 0) * 10), mu, alphaRad, stfNewton: stfInNewton },
      weightClass: maxWeight,
      detailRows: [
        { label: 'Vorne', mu: mu, c: accFwd, angle: angle, hasFit: fitFront, force: fitFront ? wallFront : 0, result: nForward },
        { label: 'Seite', mu: mu, c: accSide, angle: angle, hasFit: fitSide, force: fitSide ? wallSide : 0, result: nSide },
        { label: 'Hinten', mu: mu, c: accRear, angle: angle, hasFit: fitRear, force: fitRear ? wallRear : 0, result: nRear },
      ]
    });
  }, [loadWeight, friction, stf, angle, allowedWeight, emptyWeight, isTipping, fitFront, fitSide, fitRear, wallFront, wallSide, wallRear, bodyCert]);

  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen">
      
      {/* PRINT VIEW ONLY (Nur für Niederzurren) */}
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
                <tr><th>Kippgefahr</th><td>{isTipping ? 'Ja' : 'Nein'}</td></tr>
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
                <thead><tr><th>Richtung</th><th>Berechnungsfaktor (c)</th><th>Mindestanzahl Gurte</th></tr></thead>
                <tbody>
                    <tr><td>Sicherung nach Vorne</td><td>{lashingResult.factorForward}g</td><td><strong>{lashingResult.forward}</strong></td></tr>
                    <tr><td>Sicherung zur Seite</td><td>{lashingResult.factorSide}g</td><td><strong>{lashingResult.side}</strong></td></tr>
                    <tr><td>Sicherung nach Hinten</td><td>{lashingResult.factorRear}g</td><td><strong>{lashingResult.rear}</strong></td></tr>
                </tbody>
            </table>
            <div className="print-result-box">
                <div className="print-result-header">Gesamtempfehlung</div>
                <div>Es sind mindestens <strong>{Math.max(lashingResult.forward, lashingResult.side, lashingResult.rear)}</strong> Zurrgurte (Niederzurren) zu verwenden, um die Ladung in alle Richtungen zu sichern.</div>
            </div>
        </>
        )}
      </div>
      )}
      {/* END PRINT VIEW */}

      <div className="bg-indigo-600/95 backdrop-blur-md p-4 text-white flex items-center justify-between sticky top-0 z-20 shadow-lg shadow-indigo-900/10 no-print">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2 leading-tight tracking-tight">
            {lashingType === 'nieder' ? <LashingStrapIcon className="w-5 h-5 shrink-0" /> : <DiagonalLashingIcon className="w-5 h-5 shrink-0" />}
            LaSi-Rechner
          </h1>
          <p className="text-indigo-100 text-xs opacity-90 mt-0.5 font-mono flex items-center gap-1.5 ml-7">
             <Clock className="w-3 h-3" />
             {dateTime}
          </p>
        </div>
        <HeaderLogo />
      </div>

      <AngleMeasureModal isOpen={isMeasureModalOpen} onClose={() => setIsMeasureModalOpen(false)} onApply={(a) => setAngle(a)} />

      <div className="p-2 space-y-2 no-print">
        
        {/* Toggle Niederzurren / Diagonalzurren */}
        <div className="bg-white p-1 rounded-xl flex shadow-sm border border-slate-100 mb-2">
            <button onClick={() => setLashingType('nieder')} className={`flex-1 py-2 rounded-lg transition-all flex flex-col items-center gap-1 ${lashingType === 'nieder' ? 'bg-indigo-50 text-indigo-800 shadow-sm ring-1 ring-indigo-200' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}>
                <LashingStrapIcon className="w-6 h-6" />
                <span className="text-[10px] font-bold uppercase">Niederzurren</span>
            </button>
            <button onClick={() => setLashingType('diagonal')} className={`flex-1 py-2 rounded-lg transition-all flex flex-col items-center gap-1 ${lashingType === 'diagonal' ? 'bg-indigo-50 text-indigo-800 shadow-sm ring-1 ring-indigo-200' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}>
                <DiagonalLashingIcon className="w-6 h-6" />
                <span className="text-[10px] font-bold uppercase">Diagonalzurren</span>
            </button>
        </div>

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
               <InputWithIcon icon={Box} label="Ladungsgewicht (kg) *" value={loadWeight} onChange={(e) => setLoadWeight(e.target.value)} placeholder="0" />
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
                        <button onClick={() => setIsMeasureModalOpen(true)} className="bg-indigo-600 text-white rounded-xl px-3.5 flex items-center justify-center hover:bg-indigo-700 active:scale-95 transition-all shadow-md shadow-indigo-200 no-print" title="Winkel messen"><SpiritLevelIcon className="w-5 h-5" /></button>
                    </div>
                </div>

                <div className="col-span-2 relative">
                     <label className="block text-xs font-bold text-slate-400 uppercase mb-0.5 ml-1">Vorspannkraft STF (daN)</label>
                     <select value={stf} onChange={(e) => setStf(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none font-medium">
                        {[100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600].map((val) => (<option key={val} value={val}>{val} daN</option>))}
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

            {/* KIPPGEFAHR */}
            <label className={`block border-2 rounded-xl p-3 flex items-center gap-3 transition-all cursor-pointer break-inside-avoid print-full-width ${isTipping ? 'bg-amber-50 border-amber-300 shadow-sm' : 'bg-white border-slate-100'}`}>
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${isTipping ? 'bg-amber-500 border-amber-500 text-white' : 'border-slate-300'}`}>
                {isTipping && <CheckSquare className="w-4 h-4" />}
              </div>
              <input type="checkbox" checked={isTipping} onChange={(e) => setIsTipping(e.target.checked)} className="hidden" />
              <span className={`font-bold text-sm ${isTipping ? 'text-amber-800' : 'text-slate-500'}`}>
                  Ladung ist kippgefährdet: {isTipping ? 'JA' : 'NEIN'}
              </span>
            </label>

            {/* RESULTAT */}
            {lashingResult !== null && (
              <div className="space-y-3 pb-20 break-inside-avoid print-full-width">
                <div className={`border-2 rounded-2xl p-4 mt-4 shadow-xl ${isTipping ? 'bg-white border-amber-200 shadow-amber-100' : 'bg-white border-indigo-100 shadow-indigo-100'}`}>
                  
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
                            <span className={`text-4xl font-black ${isTipping ? 'text-amber-600' : 'text-indigo-600'}`}>{res.count}</span>
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

                   <div className={`mt-4 p-3 rounded-xl flex items-center justify-between ${isTipping ? 'bg-amber-50 text-amber-900' : 'bg-indigo-50 text-indigo-900'}`}>
                     <span className="text-xs font-bold uppercase tracking-wide opacity-70">Minimum:</span>
                     <div className="text-3xl font-black">
                        {Math.max(lashingResult.forward, lashingResult.side, lashingResult.rear)} <span className="text-base font-bold opacity-60">Gurte</span>
                     </div>
                   </div>
                   
                   <LashingFormulaDisplay values={lashingResult.displayValues} details={lashingResult.detailRows} weightClass={lashingResult.weightClass} />
                </div>

                {fineGroups.length > 0 && (
                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex flex-col gap-3 shadow-sm mt-3">
                    <button onClick={() => setShowFines(!showFines)} className="flex items-center justify-between w-full no-print">
                        <div className="flex items-center gap-2">
                            <Gavel className="w-5 h-5 text-slate-400" />
                            <h4 className="font-bold text-slate-600 text-xs uppercase">Mögliches Bußgeld (bei Verstoß)</h4>
                        </div>
                        {showFines ? <EyeOff className="w-4 h-4 text-slate-400"/> : <Eye className="w-4 h-4 text-slate-400"/>}
                    </button>
                    
                    <div className={showFines ? 'block' : 'hidden print-visible'}>
                      {fineGroups.map((group, gIdx) => (
                          <div key={gIdx} className="mt-4 first:mt-2 animate-in slide-in-from-top-2">
                              {group.title && (
                                  <div className="text-xs font-black uppercase text-slate-500 tracking-wider mb-2 px-1">{group.title}</div>
                              )}
                              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                                <table className="w-full text-left text-sm">
                                  <thead className="bg-slate-50 border-b border-slate-200 text-xs text-slate-400 font-bold uppercase">
                                    <tr>
                                      <th className="px-3 py-2 font-black tracking-wide">Verantwortlich</th>
                                      <th className="px-3 py-2 font-black tracking-wide">TBNR</th>
                                      <th className="px-3 py-2 text-right font-black tracking-wide">Folge</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-100">
                                    {group.items.map((fine, fIdx) => (
                                      <tr key={fIdx} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-3 py-2.5">
                                          <div className="flex items-start gap-2">
                                              <div className="mt-0.5">{fine.role === 'Fahrer' ? <User className="w-4 h-4 text-indigo-500"/> : <Briefcase className="w-4 h-4 text-slate-500"/>}</div>
                                              <div>
                                                  <span className={`block font-bold ${fine.role === 'Fahrer' ? 'text-indigo-700' : 'text-slate-700'}`}>{fine.role}</span>
                                                  {fine.note && <span className="block text-[10px] text-slate-400 leading-tight mt-0.5">{fine.note}</span>}
                                              </div>
                                          </div>
                                        </td>
                                        <td className="px-3 py-2.5 font-mono text-slate-500 text-xs font-bold align-top">
                                          <div className="mt-0.5">{fine.code}</div>
                                        </td>
                                        <td className="px-3 py-2.5 text-right align-top">
                                          <div className="font-black text-slate-800 mt-0.5">{fine.cost}</div>
                                          {fine.points && <div className="text-[10px] font-bold text-red-500">{fine.points}</div>}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                          </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <PrintButton />
        </>
        ) : (
            // PLATZHALTER DIAGONALZURREN
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center mt-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center mb-6 border-4 border-amber-100 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#f59e0b_10px,#f59e0b_20px)]"></div>
                    <ConstructionConeIcon className="w-12 h-12 text-amber-500 relative z-10 drop-shadow-sm" />
                </div>
                <h3 className="text-xl font-black text-slate-700 uppercase tracking-wider mb-2">Im Aufbau</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-[250px]">
                    Der Rechner für das Diagonalzurren befindet sich aktuell noch in der Programmierung und wird in einer der nächsten Versionen verfügbar sein.
                </p>
            </div>
        )}
      </div>
      <AppVersionFooter />
    </div>
  );
}

// --- KNOWLEDGE BASE VIEW (NEW) ---
function KnowledgeBaseView() {
  const dateTime = useDateTime();
  const [view, setView] = useState('einziehung');

  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen">
      <div className="bg-teal-600/95 backdrop-blur-md p-4 text-white flex items-center justify-between sticky top-0 z-20 shadow-lg shadow-teal-900/10 no-print">
        <div><h1 className="text-xl font-bold flex items-center gap-2 leading-tight tracking-tight"><BookOpen className="w-6 h-6 shrink-0" />Wissen & Handbuch</h1><p className="text-teal-100 text-xs opacity-90 mt-0.5 font-mono flex items-center gap-1.5 ml-8"><Clock className="w-3 h-3" />{dateTime}</p></div>
        <HeaderLogo />
      </div>
      
      <div className="p-3">
          {/* Geänderte Navigation für Wissen - jetzt 5 Buttons */}
          <div className="flex bg-slate-200 p-1 rounded-xl mb-4 no-print overflow-x-auto gap-1">
            <button onClick={() => setView('einziehung')} className={`whitespace-nowrap flex-1 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${view === 'einziehung' ? 'bg-white shadow text-teal-700' : 'text-slate-500 hover:text-slate-700'}`}>Einziehung</button>
            <button onClick={() => setView('btm')} className={`whitespace-nowrap flex-1 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${view === 'btm' ? 'bg-white shadow text-teal-700' : 'text-slate-500 hover:text-slate-700'}`}>BtM-Mengen</button>
            <button onClick={() => setView('ed')} className={`whitespace-nowrap flex-1 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${view === 'ed' ? 'bg-white shadow text-teal-700' : 'text-slate-500 hover:text-slate-700'}`}>ED-Delikte</button>
            <button onClick={() => setView('blut')} className={`whitespace-nowrap flex-1 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${view === 'blut' ? 'bg-white shadow text-teal-700' : 'text-slate-500 hover:text-slate-700'}`}>Blut</button>
            <button onClick={() => setView('dako')} className={`whitespace-nowrap flex-1 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${view === 'dako' ? 'bg-white shadow text-teal-700' : 'text-slate-500 hover:text-slate-700'}`}>Dako-Key</button>
          </div>
          
          <div className="animate-in fade-in duration-300 pb-20 no-print">
            
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

            {/* BTM MENGEN */}
            {view === 'btm' && (
                 <div className="space-y-4">
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
                        
                        <div className="bg-teal-50 p-3 rounded-xl space-y-2 text-xs text-teal-900 border border-teal-100">
                            <div className="flex gap-2 items-start"><Info className="w-4 h-4 shrink-0 mt-0.5 opacity-70"/><span>Ab diesen Mengenangaben erfolgt eine Untersuchung auf den <strong>Wirkstoffgehalt</strong>.</span></div>
                            <div className="flex gap-2 items-start"><Info className="w-4 h-4 shrink-0 mt-0.5 opacity-70"/><span><strong>Belehrung</strong> des Beschuldigten nach Verbrechen!</span></div>
                            <div className="flex gap-2 items-start"><Info className="w-4 h-4 shrink-0 mt-0.5 opacity-70"/><span>Keine Folgemaßnahmen im Standardfall notwendig.</span></div>
                        </div>
                     </div>
                 </div>
            )}

            {/* ED-DELIKTE */}
            {view === 'ed' && (
                 <div className="space-y-4">
                     <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center gap-2 mb-4 text-teal-700 pb-2 border-b border-slate-50">
                            <Fingerprint className="w-5 h-5" />
                            <h3 className="font-black uppercase tracking-wide text-xs">ED-Delikte (Erkennungsdienst)</h3>
                        </div>
                        <p className="text-xs text-slate-400 font-bold uppercase mb-3">ED-Delikte sind u.a.:</p>
                        <ul className="space-y-1.5 text-sm text-slate-700 font-medium mb-6">
                            <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0"></div>Besonders schwerer Fall des Diebstahls</li>
                            <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0"></div>5 oder mehr Fälle Diebstahl</li>
                            <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0"></div>Raubdelikte</li>
                            <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0"></div>Gefährliche / schwere KV</li>
                            <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0"></div>Illegaler Handel / Schmuggel von BtM / illegale Einfuhr</li>
                            <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0"></div>Verstoß gegen das WaffG</li>
                            <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0"></div>Fälschungsdelikte</li>
                        </ul>

                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                            <p className="text-xs text-slate-500 font-bold uppercase mb-3 border-b border-slate-200 pb-2">Eine ED-Behandlung muss neu gemacht werden, wenn:</p>
                            <ol className="space-y-2 text-sm text-slate-700 list-decimal list-inside font-medium">
                                <li>Mehr als 5 Jahre her (Fingerabdrücke)</li>
                                <li>ED-Material weist Qualitätsmängel auf</li>
                                <li>Fingerglieder fehlen oder sind vernarbt</li>
                                <li>Die letzte ED-Behandlung im Alter von unter 18 Jahren erfolgte und mehr als 1 Jahr zurückliegt</li>
                                <li>Wenn sich das Aussehen der Person verändert hat</li>
                            </ol>
                        </div>
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

            {/* DAKO-KEY */}
            {view === 'dako' && (
                <div className="space-y-4">
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center gap-2 mb-4 text-teal-700 pb-2 border-b border-slate-50">
                            <Key className="w-5 h-5" />
                            <h3 className="font-black uppercase tracking-wide text-xs">Bedienung Dako-Key</h3>
                        </div>
                        
                        <p className="text-xs text-slate-400 font-bold uppercase mb-4">Auslesen des digitalen Kontrollgeräts:</p>
                        
                        <ol className="space-y-4 text-sm text-slate-700 font-medium mb-6">
                            <li className="flex gap-3">
                                <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 font-black text-xs">1</div>
                                <div className="mt-0.5"><strong>Zündung an schalten</strong></div>
                            </li>
                            <li className="flex gap-3">
                                <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 font-black text-xs">2</div>
                                <div className="mt-0.5"><strong>Kontrollkarte in Slot 2</strong></div>
                            </li>
                            <li className="flex gap-3">
                                <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 font-black text-xs">3</div>
                                <div className="mt-0.5"><strong>DAKO-Key in Downloadbuchse stecken</strong></div>
                            </li>
                            <li className="flex gap-3">
                                <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 font-black text-xs">4</div>
                                <div className="mt-0.5"><strong>T4 = Key-Aktivierung</strong></div>
                            </li>
                            <li className="flex gap-3">
                                <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 font-black text-xs">5</div>
                                <div className="flex-1">
                                    <div className="mt-0.5 mb-3 leading-tight">
                                        <strong>Warten bis LEDs aus sind und dann Tastenauswahl:</strong><br/>
                                        <span className="text-[10px] text-slate-400 font-normal uppercase tracking-wide">(Bei doppelter Kombination beide Tasten zusammen drücken)</span>
                                    </div>
                                    <div className="grid grid-cols-1 gap-2.5 text-xs">
                                        <div className="flex items-start gap-2.5"><span className="bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-black font-mono shrink-0 w-8 text-center border border-slate-300 shadow-sm">T1</span> <span>Geschwindigkeit Fahrzeugeinheit + 2 Tage Aktivitäten</span></div>
                                        <div className="flex items-start gap-2.5"><span className="bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-black font-mono shrink-0 w-8 text-center border border-slate-300 shadow-sm">T2</span> <span>Download Fahrzeugeinheit beginnend ab dem letzten vorgenommenen Download</span></div>
                                        <div className="flex items-start gap-2.5"><span className="bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-black font-mono shrink-0 w-8 text-center border border-slate-300 shadow-sm">T3</span> <span>Download Fahrzeugeinheit 3 Monate (92 Tage)</span></div>
                                        <div className="flex items-start gap-2.5"><span className="bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-black font-mono shrink-0 w-8 text-center border border-slate-300 shadow-sm">T4</span> <span>Download Fahrerkarte (Fahrerkarte steckt in Slot 1!)</span></div>
                                        <div className="flex items-start gap-2.5"><span className="bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-black font-mono shrink-0 w-[2.75rem] text-center border border-slate-300 shadow-sm">T1+T2</span> <span>Technische Daten / Fehler / Ereignisse</span></div>
                                        <div className="flex items-start gap-2.5"><span className="bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-black font-mono shrink-0 w-[2.75rem] text-center border border-slate-300 shadow-sm">T1+T3</span> <span>92 Tage Aktivitätsdaten</span></div>
                                        <div className="flex items-start gap-2.5"><span className="bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-black font-mono shrink-0 w-[2.75rem] text-center border border-slate-300 shadow-sm">T1+T4</span> <span>28 Tage Aktivitätsdaten</span></div>
                                        <div className="flex items-start gap-2.5"><span className="bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-black font-mono shrink-0 w-[2.75rem] text-center border border-slate-300 shadow-sm">T2+T4</span> <span>2 Tage Aktivitätsdaten</span></div>
                                        <div className="flex items-start gap-2.5"><span className="bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-black font-mono shrink-0 w-[2.75rem] text-center border border-slate-300 shadow-sm">T2+T3</span> <span>Speed-File (Unfalldaten)</span></div>
                                        <div className="flex items-start gap-2.5"><span className="bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-black font-mono shrink-0 w-[2.75rem] text-center border border-slate-300 shadow-sm">T3+T4</span> <span>Komplettdownload der Fahrzeugeinheit – interessant für Werkstätten</span></div>
                                    </div>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 font-black text-xs">6</div>
                                <div className="mt-0.5"><strong>T4 gedrückt halten bis LED/LEDs aus ist/sind.</strong> <span className="text-teal-700 block mt-0.5 text-xs"><Download className="inline w-3 h-3 mr-1"/>Download wird gestartet...</span></div>
                            </li>
                            <li className="flex gap-3">
                                <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 font-black text-xs">7</div>
                                <div className="mt-0.5"><strong>Wenn alle LEDs leuchten ist der Download beendet.</strong></div>
                            </li>
                        </ol>

                        <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-xl text-sm font-bold flex gap-2 items-center mt-4 shadow-sm">
                            <AlertTriangle className="w-6 h-6 shrink-0 text-red-500"/>
                            <span>Blinken alle LEDs = Fehler beim Download</span>
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

// --- INFO VIEW ---
function InfoView() {
  const dateTime = useDateTime();
  const [view, setView] = useState('impressum'); // Geändert: Startet jetzt direkt im Impressum als Standard

  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen">
      <div className="bg-slate-800/95 backdrop-blur-md p-4 text-white flex items-center justify-between sticky top-0 z-20 shadow-lg shadow-slate-900/10 no-print">
        <div><h1 className="text-xl font-bold flex items-center gap-2 leading-tight tracking-tight"><FileText className="w-6 h-6 shrink-0" />Rechtliche Hinweise</h1><p className="text-slate-400 text-xs opacity-90 mt-0.5 font-mono flex items-center gap-1.5 ml-8"><Clock className="w-3 h-3" />{dateTime}</p></div>
        <HeaderLogo />
      </div>
      <div className="p-3">
          <div className="flex bg-slate-200 p-1 rounded-xl mb-4 no-print overflow-x-auto gap-1">
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
                            <p>E-Mail: <a href="mailto:Demelsimon1@gmail.com" className="text-indigo-600 hover:underline">Demelsimon1@gmail.com</a></p>
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
                    <p className="text-[10px] text-slate-400 mt-4">Sie werden zu PayPal weitergeleitet.</p>
                </div>
            )}
          </div>
      </div>
      <AppVersionFooter />
    </div>
  );
}

// --- MAIN APP COMPONENT ---

export default function App() {
  const [activeTab, setActiveTab] = useState('lashing');
  useEffect(() => { window.scrollTo(0, 0); }, [activeTab]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col relative selection:bg-indigo-100">
      <PrintStyles />
      <div className="flex-1 pb-24 z-10 relative">
        {activeTab === 'overload' ? <OverloadCalculator /> : 
         activeTab === 'wood' ? <WoodCalculator /> : 
         activeTab === 'speed' ? <SpeedCalculator /> : 
         activeTab === 'age' ? <AgeCalculator /> :
         activeTab === 'knowledge' ? <KnowledgeBaseView /> : 
         activeTab === 'info' ? <InfoView /> : <LashingCalculator />}
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-safe z-50 no-print">
        <div className="max-w-md mx-auto flex justify-around p-2">
          {[
            { id: 'lashing', icon: LashingStrapIcon, label: 'Zurrgurte', color: 'text-indigo-600' },
            { id: 'overload', icon: Scale, label: 'Gewicht', color: 'text-blue-600' },
            { id: 'wood', icon: Trees, label: 'Holz', color: 'text-emerald-600' },
            { id: 'speed', icon: Gauge, label: 'Geschw.', color: 'text-amber-600' },
            { id: 'age', icon: Calendar, label: 'Alter', color: 'text-purple-600' },
            { id: 'knowledge', icon: BookOpen, label: 'Wissen', color: 'text-teal-600' }, 
            { id: 'info', icon: FileText, label: 'Infos', color: 'text-slate-600' }
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 py-2 px-0.5 rounded-xl flex flex-col items-center gap-1 transition-all duration-300 ${activeTab === tab.id ? 'bg-slate-100 scale-105' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}>
              <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? tab.color : ''}`} />
              <span className={`text-[9px] font-bold ${activeTab === tab.id ? 'text-slate-800' : ''}`}>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
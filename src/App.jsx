import React, { useState, useEffect, useRef } from 'react';
import { Scale, AlertTriangle, CheckCircle, Info, Box, Truck, ShieldCheck, ShieldAlert, Trees, Ruler, Clock, CheckSquare, Settings, ChevronRight, Droplets, Weight, Printer, Gavel, User, Briefcase, FileText, X, Edit3, Calculator, Smartphone, RotateCw, Lock, MapPin, Gauge, Car, Zap, Copyright, Caravan } from 'lucide-react';

// --- HELPER COMPONENTS FOR UI ---

const LashingStrapIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 12h20" />
    <rect x="8" y="7" width="8" height="10" rx="2" fill="currentColor" fillOpacity="0.1" />
    <path d="M8 12h8" />
    <path d="M2 12l2 2" />
    <path d="M22 12l-2 2" />
  </svg>
);

const TapeMeasureIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 12h20" />
      <path d="M2 12l2 2" />
      <path d="M22 12l-2 2" />
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M6 6v12" />
      <path d="M10 6v12" />
      <path d="M14 6v12" />
      <path d="M18 6v12" />
    </svg>
);

const HeaderLogo = () => (
  <span className="text-base font-black text-white/50 tracking-wider italic select-none border border-white/20 px-3 py-1 rounded-md backdrop-blur-sm print:hidden">
    Demel
  </span>
);

const PrintDocumentHeader = ({ title }) => {
    const [dateStr, setDateStr] = useState('');
    useEffect(() => {
        setDateStr(new Date().toLocaleString('de-DE', { dateStyle: 'full', timeStyle: 'short' }));
    }, []);

    return (
        <div className="hidden print:block mb-4 pb-2 border-b-2 border-slate-800">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-xl font-black text-slate-900 uppercase tracking-tight">{title}</h1>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">Erstellt am {dateStr}</p>
                </div>
                <div className="text-right">
                    <div className="text-lg font-bold text-slate-300 italic">Demel App v1.6</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Protokoll zur Dokumentation</div>
                </div>
            </div>
        </div>
    );
};

const PrintStyles = () => (
    <style dangerouslySetInnerHTML={{__html: `
      @media print {
        @page { margin: 10mm; size: A4 portrait; }
        html { height: 100%; }
        body { 
          background-color: white !important; 
          color: black !important; 
          font-family: ui-sans-serif, system-ui, -apple-system, sans-serif !important; 
          -webkit-print-color-adjust: exact !important; 
          print-color-adjust: exact !important;
          zoom: 0.9; /* Scales content down to fit on one page */
        }
        .no-print, nav, .fixed.bottom-0, .print-hide-button, .sticky.top-0, .print-hidden-icon { display: none !important; }
        .global-print-footer { display: flex !important; }
        .min-h-screen, .flex-1, .flex-col { display: block !important; width: 100% !important; height: auto !important; overflow: visible !important; padding-bottom: 0 !important; }
        .max-w-md { max-width: 100% !important; margin: 0 !important; width: 100% !important; }
        .print-grid-container { display: block !important; gap: 0 !important; }
        .bg-white, .bg-slate-50, .bg-slate-100 { background-color: transparent !important; box-shadow: none !important; border: none !important; padding: 0 !important; margin-bottom: 1rem !important; border-radius: 0 !important; }
        .print-grid-container > div { border-bottom: 1px solid #eee !important; padding-bottom: 0.5rem !important; margin-bottom: 0.5rem !important; break-inside: avoid; }
        label { color: #64748b !important; font-size: 8pt !important; text-transform: uppercase; letter-spacing: 0.05em; }
        input, select { border: none !important; border-bottom: 1px dotted #cbd5e1 !important; background: transparent !important; padding: 0 !important; padding-bottom: 1px !important; font-weight: bold !important; color: #000 !important; font-size: 10pt !important; width: 100% !important; appearance: none !important; text-align: left !important; border-radius: 0 !important; box-shadow: none !important; }
        .absolute.right-3 { display: none !important; }
        input { padding-left: 0 !important; }
        .relative > .absolute.inset-y-0.left-0 { display: none !important; }
        .pl-10 { padding-left: 0 !important; } 
        .bg-gradient-to-br, .border-2 { background: white !important; border: 2px solid #000 !important; color: black !important; box-shadow: none !important; border-radius: 8px !important; }
        .text-white, .text-emerald-100, .text-indigo-100, .text-blue-100 { color: black !important; }
        .bg-slate-200 { border: 1px solid #ccc !important; background: white !important; }
        .bg-emerald-500, .bg-amber-500, .bg-red-500 { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        .mt-4.p-3 { border: 1px solid #94a3b8 !important; background: #f8fafc !important; break-inside: avoid; margin-top: 0.5rem !important; padding: 0.5rem !important; }
        table { width: 100% !important; border-collapse: collapse !important; }
        th { text-align: left !important; font-size: 8pt !important; color: #64748b !important; border-bottom: 1px solid #cbd5e1 !important; padding-bottom: 2px !important; }
        td { font-size: 9pt !important; color: #000 !important; padding: 2px 0 !important; border-bottom: 1px solid #f1f5f9 !important; }
        button { border: none !important; background: none !important; }
        .break-inside-avoid { break-inside: avoid; }
        h1, h2, h3 { color: black !important; }
      }
    `}} />
);

const AppVersionFooter = () => (
    <div className="text-center text-[10px] text-slate-300 font-mono py-2 no-print select-none">
        Demel App v1.6
    </div>
);

const GlobalPrintFooter = () => (
    <div className="hidden global-print-footer fixed bottom-0 left-0 right-0 justify-center items-center border-t border-slate-300 pt-1 bg-white print:flex">
         <div className="flex items-center gap-1.5 text-[8px] text-slate-500 font-mono uppercase tracking-wider">
             <ShieldCheck className="w-2.5 h-2.5" />
             <span>Demel App v1.6 – Generiertes Protokoll</span>
        </div>
    </div>
);

const ExportButton = () => (
  <button 
    onClick={() => { try { window.focus(); } catch(e){} window.print(); }}
    className="print-hide-button mt-6 w-full py-4 bg-slate-800 text-white rounded-xl flex items-center justify-center gap-2.5 font-bold shadow-lg hover:bg-slate-700 transition-all active:scale-95 mb-4 text-base"
  >
    <Printer className="w-5 h-5" />
    Ergebnis als PDF exportieren
  </button>
);

const ProgressBar = ({ current, max, isOverloaded }) => {
  if (!max || max <= 0) return null;
  const percentage = Math.min(100, Math.max(0, (current / max) * 100));
  let colorClass = 'bg-emerald-500';
  if (percentage > 90) colorClass = 'bg-amber-500';
  if (percentage >= 100 || isOverloaded) colorClass = 'bg-red-500';
  return (
    <div className="w-full h-3 bg-slate-200 rounded-full mt-2.5 overflow-hidden shadow-inner print:border print:border-slate-300">
      <div className={`h-full transition-all duration-500 ease-out ${colorClass}`} style={{ width: `${percentage}%` }} />
    </div>
  );
};

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
          <th className="pb-1 font-bold hidden sm:table-cell print:table-cell">Gleit-Reib. μ</th>
          <th className="pb-1 font-bold">Beschl. c</th>
          <th className="pb-1 font-bold hidden sm:table-cell print:table-cell">Winkel α</th>
          <th className="pb-1 font-bold">Formschluss</th>
          <th className="pb-1 font-bold">F<sub>Form</sub> (daN)</th>
          <th className="pb-1 text-right font-black">Ergebnis</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-50">
        {data.map((row, i) => (
            <tr key={i} className="text-slate-700">
                <td className="py-1.5 font-bold">{row.label}</td>
                <td className="py-1.5 hidden sm:table-cell print:table-cell">{row.mu.toFixed(2).replace('.', ',')}</td>
                <td className="py-1.5">{row.c} g</td>
                <td className="py-1.5 hidden sm:table-cell print:table-cell">{row.angle}°</td>
                <td className="py-1.5">{row.hasFit ? <span className="text-emerald-600 font-bold flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Ja</span> : <span className="text-slate-400 text-[10px]">Nein</span>}</td>
                <td className="py-1.5">{row.force}</td>
                <td className="py-1.5 text-right font-black">{row.result} Gurte</td>
            </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const LashingFormulaDisplay = ({ values, details, weightClass }) => {
  if (!values) return null;
  const { weightForceN, c, formForceN, mu, alphaRad, stfNewton } = values;
  // Use 1.8 for classes <= 3.5t, else 2.0 (but standard here for display purposes we show what was used)
  const factor = (!weightClass || weightClass <= 3500) ? "1,8" : "2";

  return (
    <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 print:bg-white print:border-slate-300">
        <div className="flex items-center gap-2 mb-2 font-bold text-slate-500 uppercase text-[10px]"><Calculator className="w-3 h-3" /><span>Berechnungsformel (Niederzurren)</span></div>
        <div className="mb-2 pb-3">
             <div className="text-[10px] text-slate-400 font-bold mb-1 text-center uppercase">
                {(!weightClass || weightClass <= 3500) ? 'Berechnung nach Spezialformel (< 3,5t)' : 'Berechnung nach VDI 2700 / DIN EN 12195-1'}
             </div>
             <FormulaFraction label={<span className="italic">n</span>} equals="≥" numerator={<span>(F<sub>G</sub> · c) - F<sub>Form</sub> - (F<sub>G</sub> · μ)</span>} denominator={<span>{factor} · μ · sin(α) · STF</span>} />
        </div>
        {details && <LashingDetailTable data={details} />}
    </div>
  );
};

const WoodFormulaDisplay = ({ values }) => {
    if (!values) return null;
    const { l, w, h, vol, factor, solidVol, density, weight } = values;
    return (
    <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 print:bg-white print:border-slate-300">
        <div className="flex items-center gap-2 mb-2 font-bold text-slate-500 uppercase text-[10px]"><Calculator className="w-3 h-3" /><span>Berechnungsformel (Holzgewicht)</span></div>
        <div className="grid grid-cols-1 gap-3">
             <div><div className="flex justify-between text-[10px] uppercase font-bold text-slate-400"><span>1. Raummaß</span><span>L · B · H</span></div><div className="font-mono bg-white border border-slate-100 p-1.5 rounded mt-0.5 text-center text-emerald-800">{l} m · {w} m · {h} m = <strong>{vol} m³</strong></div></div>
             <div><div className="flex justify-between text-[10px] uppercase font-bold text-slate-400"><span>2. Festmeter</span><span>Raummaß · Faktor</span></div><div className="font-mono bg-white border border-slate-100 p-1.5 rounded mt-0.5 text-center text-emerald-800">{vol} m³ · {factor} = <strong>{solidVol} m³</strong></div></div>
             <div><div className="flex justify-between text-[10px] uppercase font-bold text-slate-400"><span>3. Gewicht</span><span>Festmeter · Dichte</span></div><div className="font-mono bg-white border border-slate-100 p-1.5 rounded mt-0.5 text-center font-bold text-emerald-700 text-sm">{solidVol} m³ · {density} kg/m³ ≈ {weight.toLocaleString()} kg</div></div>
        </div>
    </div>
    );
};

const OverloadFormulaDisplay = ({ values }) => {
    if (!values) return null;
    const { actual, tolerance, net, allowed, diff, percent } = values;
    return (
    <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 print:bg-white print:border-slate-300 break-inside-avoid">
        <div className="flex items-center gap-2 mb-2 font-bold text-slate-500 uppercase text-[10px]"><Calculator className="w-3 h-3" /><span>Berechnungsformel (Überladung)</span></div>
        <div className="space-y-3 font-mono text-[11px]">
             <div><div className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">1. Nettogewicht (Vorwerfbar)</div><div className="pl-2 border-l-2 border-blue-200">{actual.toLocaleString()} - {tolerance} = {net.toLocaleString()} kg</div></div>
             <div><div className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">2. Differenz zum zGM</div><div className="pl-2 border-l-2 border-blue-200">{net.toLocaleString()} - {allowed.toLocaleString()} = {diff.toLocaleString()} kg</div></div>
             <div><div className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">3. Prozentuale Überladung</div><div className="pl-2 border-l-2 border-blue-200">({diff.toLocaleString()} / {allowed.toLocaleString()}) · 100 = {percent.toFixed(2)} %</div></div>
        </div>
    </div>
    );
};

const InputWithIcon = ({ icon: Icon, label, value, onChange, placeholder, type="number", disabled=false, onBlur }) => (
  <div className="relative group break-inside-avoid">
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
                     <h3 className="font-black text-slate-800 flex items-center gap-2"><Ruler className="w-5 h-5 text-indigo-600" />Winkelmesser</h3>
                     <button onClick={handleClose} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"><X className="w-4 h-4 text-slate-500" /></button>
                </div>
                {errorMsg && <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-bold mb-4 flex items-start gap-2"><AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />{errorMsg}</div>}
                <div className="min-h-[200px] flex flex-col justify-center">
                    {step === 1 && (
                        <div className="text-center space-y-4">
                            <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-indigo-600"><Ruler className="w-8 h-8" /></div>
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

// --- MAIN APP COMPONENT ---

export default function App() {
  const [activeTab, setActiveTab] = useState('lashing');
  useEffect(() => { window.scrollTo(0, 0); }, [activeTab]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col relative selection:bg-indigo-100">
      <PrintStyles />
      <div className="flex-1 pb-24 z-10 relative print-scale-wrapper">
        {activeTab === 'overload' ? <OverloadCalculator /> : 
         activeTab === 'wood' ? <WoodCalculator /> : 
         activeTab === 'speed' ? <SpeedCalculator /> : 
         activeTab === 'info' ? <InfoView /> : <LashingCalculator />}
      </div>
      <GlobalPrintFooter />
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-safe z-50 no-print">
        <div className="max-w-md mx-auto flex justify-around p-2">
          {[
            { id: 'lashing', icon: LashingStrapIcon, label: 'Zurrgurte', color: 'text-indigo-600' },
            { id: 'overload', icon: Scale, label: 'Gewicht', color: 'text-blue-600' },
            { id: 'wood', icon: Trees, label: 'Holz', color: 'text-emerald-600' },
            { id: 'speed', icon: Gauge, label: 'Geschw.', color: 'text-amber-600' },
            { id: 'info', icon: FileText, label: 'Infos', color: 'text-slate-600' }
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 py-2 px-1 rounded-xl flex flex-col items-center gap-1 transition-all duration-300 ${activeTab === tab.id ? 'bg-slate-100 scale-105' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}>
              <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? tab.color : ''}`} />
              <span className={`text-[10px] font-bold ${activeTab === tab.id ? 'text-slate-800' : ''}`}>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- SPEED CALCULATOR ---
function SpeedCalculator() {
    const [mode, setMode] = useState('laser'); // 'laser' or 'follow'
    const [vehicleType, setVehicleType] = useState('pkw'); // 'pkw', 'pkw_trailer'
    const [allowedSpeed, setAllowedSpeed] = useState('');
    const [measuredSpeedRaw, setMeasuredSpeedRaw] = useState('');
    
    // Follow specific
    const [followDistance, setFollowDistance] = useState(''); // Nachfahrstrecke

    // Result state
    const [result, setResult] = useState(null);
    const dateTime = useDateTime();

    // Violation Table
    const getViolation = (exceedance, type) => {
        if (exceedance < 16) return null;

        // SPEZIALFALL: PKW mit Anhänger (TBNR 118632 ff.)
        if (type === 'pkw_trailer') {
            if (exceedance <= 20) return { cost: '140 €', points: '1', ban: '-', id: '118632' };
            if (exceedance <= 25) return { cost: '150 €', points: '1', ban: '-', id: '118633' };
            if (exceedance <= 30) return { cost: '175 €', points: '1', ban: '-', id: '118634' };
            if (exceedance <= 40) return { cost: '255 €', points: '2', ban: '1 M', id: '118635' };
            if (exceedance <= 50) return { cost: '480 €', points: '2', ban: '1 M', id: '118636' };
            if (exceedance <= 60) return { cost: '600 €', points: '2', ban: '2 M', id: '118637' }; // Annahme Fortführung Standard
            if (exceedance <= 70) return { cost: '700 €', points: '2', ban: '3 M', id: '118638' }; // Annahme Fortführung Standard
            return { cost: '800 €', points: '2', ban: '3 M', id: '118639' }; // Annahme
        }

        // Standard PKW
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

        let netSpeed = 0;
        let tolerance = 0;
        let formula = '';

        if (mode === 'laser') {
            // Laser Tolerances: <=100: 3, 101-133: 4, 134-166: 5, 167-206: 6, >206: 7
            if (measured <= 100) tolerance = 3;
            else if (measured <= 133) tolerance = 4;
            else if (measured <= 166) tolerance = 5;
            else if (measured <= 206) tolerance = 6;
            else tolerance = 7;
            
            netSpeed = measured - tolerance;
            formula = `${measured} - ${tolerance} (Tol.) = ${netSpeed}`;
        } else {
            // Follow Formula: (((Read - 10%) - 4) - 3%)
            // Step 1: Remove 10%
            const step1 = measured - (measured * 0.10);
            // Step 2: Remove 4 km/h fixed
            const step2 = step1 - 4;
            // Step 3: Remove 3% traffic error
            const step3 = step2 - (step2 * 0.03);
            
            netSpeed = Math.floor(step3); // Rounding down in favor of driver usually
            tolerance = measured - netSpeed; // Implicit tolerance sum
            formula = `((${measured} - 10%) - 4) - 3% = ${netSpeed.toFixed(0)}`;
        }

        const exceedance = Math.max(0, netSpeed - allowed);
        const violation = getViolation(exceedance, vehicleType);

        setResult({
            netSpeed: Math.round(netSpeed),
            tolerance: tolerance,
            exceedance: Math.round(exceedance),
            violation: violation,
            formula: formula
        });

    }, [mode, allowedSpeed, measuredSpeedRaw, vehicleType]);

    return (
        <div className="max-w-md mx-auto bg-slate-50 min-h-screen">
            <div className="bg-amber-600/95 backdrop-blur-md p-4 text-white flex items-center justify-between sticky top-0 z-20 shadow-lg shadow-amber-900/10">
                <div><h1 className="text-xl font-bold flex items-center gap-2 leading-tight tracking-tight"><Gauge className="w-6 h-6 shrink-0" />Geschwindigkeitsrechner</h1><p className="text-amber-100 text-xs opacity-90 mt-0.5 font-mono flex items-center gap-1.5 ml-8"><Clock className="w-3 h-3" />{dateTime}</p></div>
                <HeaderLogo />
            </div>

            <div className="p-2 space-y-2">
                {/* MODE SELECTION */}
                <div className="bg-white p-1 rounded-xl flex shadow-sm border border-slate-100 mb-2">
                    <button onClick={() => setMode('laser')} className={`flex-1 py-2 text-xs font-bold uppercase rounded-lg transition-all ${mode === 'laser' ? 'bg-amber-100 text-amber-800 shadow-sm' : 'text-slate-400'}`}>Laser / Statisch</button>
                    <button onClick={() => setMode('follow')} className={`flex-1 py-2 text-xs font-bold uppercase rounded-lg transition-all ${mode === 'follow' ? 'bg-amber-100 text-amber-800 shadow-sm' : 'text-slate-400'}`}>Hinterherfahren</button>
                </div>

                <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
                    {mode === 'laser' && (
                        <div className="mb-4">
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Fahrzeugtyp</label>
                            <div className="flex gap-2">
                                <button onClick={() => setVehicleType('pkw')} className={`flex-1 p-2 rounded-xl border-2 flex flex-col items-center gap-1 transition-all ${vehicleType === 'pkw' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-slate-100 text-slate-400'}`}><Car className="w-6 h-6" /><span className="text-[10px] font-bold">PKW</span></button>
                                <button onClick={() => setVehicleType('pkw_trailer')} className={`flex-1 p-2 rounded-xl border-2 flex flex-col items-center gap-1 transition-all ${vehicleType === 'pkw_trailer' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-slate-100 text-slate-400'}`}><Caravan className="w-6 h-6" /><span className="text-[10px] font-bold text-center">PKW mit<br/>Anhänger</span></button>
                            </div>
                        </div>
                    )}

                    <div className="space-y-3">
                        <div className="relative">
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-0.5 ml-1">Zulässige Höchstgeschwindigkeit</label>
                            <select value={allowedSpeed} onChange={(e) => setAllowedSpeed(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-base font-bold text-slate-700">
                                <option value="">Bitte wählen...</option>
                                {[60, 70, 80, 100, 120].map(v => <option key={v} value={v}>{v} km/h</option>)}
                            </select>
                        </div>

                        <InputWithIcon icon={Gauge} label={mode === 'laser' ? "Gemessener Wert (Brutto)" : "Abgelesener Tacho-Wert"} value={measuredSpeedRaw} onChange={(e) => setMeasuredSpeedRaw(e.target.value)} placeholder="0" />
                        
                        {mode === 'follow' && (
                             <InputWithIcon icon={Ruler} label="Nachfahrstrecke (ca. Meter)" value={followDistance} onChange={(e) => setFollowDistance(e.target.value)} placeholder="z.B. 500" />
                        )}
                    </div>
                </div>

                {result && (
                    <div className="space-y-3">
                        <div className="bg-white border-2 border-amber-100 rounded-2xl p-4 shadow-xl">
                            <div className="flex justify-between items-center mb-2 border-b border-slate-50 pb-2">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Vorwerfbar</span>
                                <span className="text-3xl font-black text-amber-600">{result.netSpeed} <span className="text-sm text-slate-400">km/h</span></span>
                            </div>
                            
                            <div className="bg-slate-50 rounded-lg p-2 mb-3 text-xs font-mono text-center text-slate-500">
                                {result.formula}
                            </div>

                            <div className="flex items-center justify-between bg-red-50 p-3 rounded-xl border border-red-100">
                                <span className="text-xs font-bold text-red-400 uppercase">Überschreitung</span>
                                <span className="text-xl font-black text-red-600">+{result.exceedance} km/h</span>
                            </div>
                        </div>

                        {result.violation ? (
                            <div className="bg-slate-800 text-white p-4 rounded-2xl shadow-lg">
                                <div className="flex items-center gap-2 mb-4 border-b border-slate-700 pb-2">
                                    <Gavel className="w-5 h-5 text-amber-400" />
                                    <h3 className="font-bold uppercase tracking-wide text-sm">Folgen des Verstoßes</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><div className="text-[10px] text-slate-400 uppercase font-bold">Bußgeld</div><div className="text-2xl font-black text-amber-400">{result.violation.cost}</div></div>
                                    <div><div className="text-[10px] text-slate-400 uppercase font-bold">Punkte</div><div className="text-xl font-bold">{result.violation.points}</div></div>
                                    <div><div className="text-[10px] text-slate-400 uppercase font-bold">Fahrverbot</div><div className="text-xl font-bold">{result.violation.ban}</div></div>
                                    <div><div className="text-[10px] text-slate-400 uppercase font-bold">TBNR</div><div className="text-sm font-mono bg-slate-700 px-2 py-0.5 rounded inline-block mt-0.5">{result.violation.id}</div></div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-green-50 text-green-700 p-3 rounded-xl text-center text-xs font-bold border border-green-200">
                                Keine Maßnahmen im hinterlegten Bereich (&lt; 16 km/h)
                            </div>
                        )}
                    </div>
                )}
            </div>
            <ExportButton />
            <AppVersionFooter />
        </div>
    );
}

// --- INFO VIEW ---
function InfoView() {
  const dateTime = useDateTime();
  const [view, setView] = useState('notes');

  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen">
      <div className="bg-slate-800/95 backdrop-blur-md p-4 text-white flex items-center justify-between sticky top-0 z-20 shadow-lg shadow-slate-900/10">
        <div><h1 className="text-xl font-bold flex items-center gap-2 leading-tight tracking-tight"><FileText className="w-6 h-6 shrink-0" />Rechtliche Hinweise</h1><p className="text-slate-400 text-xs opacity-90 mt-0.5 font-mono flex items-center gap-1.5 ml-8"><Clock className="w-3 h-3" />{dateTime}</p></div>
        <HeaderLogo />
      </div>
      <div className="p-3">
          <div className="flex bg-slate-200 p-1 rounded-xl mb-4 no-print overflow-x-auto">
            <button onClick={() => setView('notes')} className={`flex-1 whitespace-nowrap px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${view === 'notes' ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}>Haftung & Nutzung</button>
            <button onClick={() => setView('impressum')} className={`flex-1 whitespace-nowrap px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${view === 'impressum' ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}>Impressum</button>
            <button onClick={() => setView('privacy')} className={`flex-1 whitespace-nowrap px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${view === 'privacy' ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}>Datenschutz</button>
          </div>
          
          <div className="animate-in fade-in duration-300 pb-20">
            {view === 'notes' && (
                <div className="space-y-4">
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center gap-2 mb-3 text-slate-700 pb-2 border-b border-slate-50"><ShieldAlert className="w-5 h-5 text-amber-500" /><h3 className="font-black uppercase tracking-wide text-xs">Haftungsausschluss (Disclaimer)</h3></div>
                        
                        <p className="text-slate-600 text-sm leading-relaxed text-justify mb-4 font-normal">
                            <strong>Keine Gewähr für Richtigkeit:</strong> Trotz sorgfältiger Programmierung und Prüfung wird keine Haftung für die Richtigkeit, Vollständigkeit oder Aktualität der berechneten Ergebnisse übernommen. Die Ergebnisse stellen <u>keinen</u> rechtsverbindlichen Beweis dar und ersetzen keine amtliche Verwiegung oder gutachterliche Berechnung.
                        </p>
                         <p className="text-slate-600 text-sm leading-relaxed text-justify font-normal">
                            Die Nutzung der Applikation erfolgt auf eigene Gefahr. Für Schäden oder Rechtsfolgen, die aus der Nutzung der hier bereitgestellten Daten entstehen, wird keine Haftung übernommen.
                        </p>
                    </div>

                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center gap-2 mb-3 text-slate-700 pb-2 border-b border-slate-50"><Copyright className="w-5 h-5 text-indigo-500" /><h3 className="font-black uppercase tracking-wide text-xs">Geistiges Eigentum</h3></div>
                         <p className="text-slate-600 text-sm leading-relaxed text-justify font-normal">
                            Alle Inhalte, das Design, der Quellcode sowie die in dieser Applikation enthaltenen Grafiken und Berechnungslogiken sind urheberrechtlich geschützt.
                        </p>
                         <p className="text-slate-600 text-sm leading-relaxed text-justify mt-2 font-normal">
                            Eine Vervielfältigung, Bearbeitung, Verbreitung oder jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des Erstellers. Downloads und Kopien sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
                        </p>
                    </div>
                </div>
            )}

            {view === 'impressum' && (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-5 text-sm text-slate-600">
                     <div className="flex items-center gap-2 mb-1 text-slate-800 pb-2 border-b border-slate-100"><Briefcase className="w-5 h-5" /><h3 className="font-black uppercase tracking-wide text-sm">Impressum</h3></div>
                    
                    <div>
                        <h4 className="font-bold text-xs uppercase text-slate-400 mb-1">Angaben gemäß § 5 DDG</h4>
                        <p className="text-slate-800 font-normal">Simon Demel</p>
                        <p className="font-normal">Ellen-Gottlieb Straße 15</p>
                        <p className="font-normal">79106 Freiburg im Breisgau</p>
                    </div>

                    <div>
                         <h4 className="font-bold text-xs uppercase text-slate-400 mb-1">Kontakt</h4>
                         <p className="font-normal">E-Mail: demelsimon1@gmail.com</p>
                    </div>

                    <div className="text-xs text-slate-400 pt-4 border-t border-slate-50 font-normal">
                        <p>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV: Simon Demel (Anschrift wie oben)</p>
                    </div>
                </div>
            )}

            {view === 'privacy' && (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-5 text-sm text-slate-600">
                     <div className="flex items-center gap-2 mb-1 text-slate-800 pb-2 border-b border-slate-100"><Lock className="w-5 h-5" /><h3 className="font-black uppercase tracking-wide text-sm">Datenschutzerklärung</h3></div>
                    
                    <div>
                        <h4 className="font-bold text-slate-800 mb-2">1. Datenschutz auf einen Blick</h4>
                        <p className="text-justify leading-relaxed mb-2 font-normal">
                            <strong>Allgemeine Hinweise:</strong> Die folgenden Hinweise geben einen Überblick über die Verarbeitung personenbezogener Daten bei Nutzung dieser Applikation. Der Schutz persönlicher Daten wird sehr ernst genommen.
                        </p>
                        <p className="text-justify leading-relaxed font-normal">
                            <strong>Datenerfassung:</strong> Diese Applikation ist eine sogenannte "Client-Side Application". Das bedeutet, alle Eingaben (Gewichte, Maße, Winkel), werden <strong>ausschließlich lokal</strong> im Browser verarbeitet (In-Memory). Es findet <strong>keine Übertragung</strong> der Eingabedaten an externe Server oder Datenbanken statt. Sobald der Tab geschlossen oder die Seite neu geladen wird, werden die Daten gelöscht.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-800 mb-2">2. Hosting (Vercel)</h4>
                        <p className="text-justify leading-relaxed font-normal">
                            Diese Applikation wird bei dem externen Dienstleister Vercel Inc., 340 S Lemon Ave #4133 Walnut, CA 91789, USA (im Folgenden „Vercel“) gehostet.
                        </p>
                        <p className="text-justify leading-relaxed mt-2 font-normal">
                            Beim Aufruf der Applikation erfasst Vercel automatisch Daten und Informationen vom Computersystem des aufrufenden Rechners in sogenannten Server-Log-Dateien. Dies ist technisch notwendig, um die Website sicher und stabil auszuliefern. Erfasst werden können u.a.:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-xs text-slate-500 font-normal">
                            <li>Browsertyp und Browserversion</li>
                            <li>Verwendetes Betriebssystem</li>
                            <li>Referrer URL (die zuvor besuchte Seite)</li>
                            <li>Hostname des zugreifenden Rechners</li>
                            <li>Uhrzeit der Serveranfrage</li>
                            <li>IP-Adresse (ggf. anonymisiert)</li>
                        </ul>
                    </div>
                </div>
            )}
          </div>
      </div>
      <AppVersionFooter />
    </div>
  );
}

// --- WOOD CALCULATOR ---
function WoodCalculator() {
  const [allowedWeight, setAllowedWeight] = useState('');
  const [emptyWeight, setEmptyWeight] = useState('');
  const [tractorWeight, setTractorWeight] = useState('');
  const [trailerWeight, setTrailerWeight] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [woodType, setWoodType] = useState('Akazie ganz frisch'); 
  const dateTime = useDateTime();

  useEffect(() => {
    const tractor = parseFloat(tractorWeight) || 0;
    const trailer = parseFloat(trailerWeight) || 0;
    const total = tractor + trailer;
    if (tractor > 0 || trailer > 0) {
        setEmptyWeight(total > 0 ? total.toString() : '');
    }
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

  const volume = (parseFloat(length) || 0) * (parseFloat(width) || 0) * (parseFloat(height) || 0);
  const solidFactor = 0.70;
  const solidVolume = volume * solidFactor;
  const selectedWood = woodTypes.find(w => w.name === woodType);
  const currentDensity = selectedWood ? selectedWood.density : 800;
  const rawWeight = solidVolume * currentDensity;
  const maxWeight = parseFloat(allowedWeight) || 0;
  const calculatedLoadWeight = (!maxWeight || maxWeight <= 3500) ? Math.floor(rawWeight) : Math.ceil(rawWeight);
  const totalWeight = (parseFloat(emptyWeight) || 0) + calculatedLoadWeight;
  const difference = totalWeight - maxWeight;
  const isOverloaded = maxWeight > 0 && difference > 0;
  const percentage = (isOverloaded && maxWeight > 0) ? (difference / maxWeight) * 100 : 0;

  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen">
      <div className="bg-emerald-600/95 backdrop-blur-md p-4 text-white flex items-center justify-between sticky top-0 z-20 shadow-lg shadow-emerald-900/10">
        <div><h1 className="text-xl font-bold flex items-center gap-2 leading-tight tracking-tight"><Trees className="w-6 h-6 shrink-0" />Holzgewichtsrechner</h1><p className="text-emerald-100 text-xs opacity-90 mt-0.5 font-mono flex items-center gap-1.5 ml-8"><Clock className="w-3 h-3" />{dateTime}</p></div>
        <HeaderLogo />
      </div>
      <PrintDocumentHeader title="Protokoll: Holzgewichtsrechnung" />
      <div className="p-2 space-y-2 print-grid-container">
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 break-inside-avoid">
           <div className="grid grid-cols-2 gap-2 mb-2"><InputWithIcon icon={Truck} label="Leergewicht Zugm. (kg)" value={tractorWeight} onChange={(e) => setTractorWeight(e.target.value)} placeholder="0" /><InputWithIcon icon={Box} label="Leergewicht Aufl. (kg)" value={trailerWeight} onChange={(e) => setTrailerWeight(e.target.value)} placeholder="0" /></div>
           <InputWithIcon icon={Scale} label="zGM (kg)" value={allowedWeight} onChange={(e) => setAllowedWeight(e.target.value)} placeholder="0" />
           <div className="flex gap-2 mt-2">
               <button onClick={() => setAllowedWeight('40000')} className="flex-1 py-2 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 border border-transparent transition-all">Standard 40t</button>
               <button onClick={() => setAllowedWeight('44000')} className="flex-1 py-2 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 border border-transparent transition-all">Ausnahme 44t</button>
           </div>
        </div>
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 break-inside-avoid">
           <div className="grid grid-cols-3 gap-2"><InputWithIcon icon={Ruler} label="L (m)" value={length} onChange={(e) => setLength(e.target.value)} /><InputWithIcon icon={Ruler} label="B (m)" value={width} onChange={(e) => setWidth(e.target.value)} /><InputWithIcon icon={Ruler} label="H (m)" value={height} onChange={(e) => setHeight(e.target.value)} /></div>
        </div>
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 break-inside-avoid">
            <label className="flex items-center gap-1.5 text-sm font-black text-emerald-700 uppercase tracking-wide mb-2 print:text-black"><Trees className="w-5 h-5 print:hidden" />Art des Holzes</label>
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
        {calculatedLoadWeight > 0 && <div className="space-y-3 animate-in slide-in-from-bottom-4 duration-500 break-inside-avoid print-full-width"><div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-4 text-center text-white shadow-xl print:text-black print:bg-none print:border-2 print:border-black"><p className="text-sm font-bold opacity-70 uppercase tracking-wider mb-1">Ladungsgewicht</p><div className="text-5xl font-black tracking-tighter">{calculatedLoadWeight.toLocaleString('de-DE')} kg</div></div><WoodFormulaDisplay values={{ l: length, w: width, h: height, vol: volume.toFixed(2), factor: solidFactor, solidVol: solidVolume.toFixed(2), density: currentDensity, weight: calculatedLoadWeight }} /></div>}
        <ExportButton />
      </div>
      <AppVersionFooter />
    </div>
  );
}

// --- OVERLOAD CALCULATOR ---
function OverloadCalculator() {
  const [allowedWeight1, setAllowedWeight1] = useState('');
  const [actualWeight1, setActualWeight1] = useState('');
  const [allowedWeight2, setAllowedWeight2] = useState('');
  const [actualWeight2, setActualWeight2] = useState('');
  const [result, setResult] = useState(null);
  const dateTime = useDateTime();

  useEffect(() => {
    if (!actualWeight1 && !actualWeight2) {
        setResult(null);
        return;
    }

    const calculateForVehicle = (allowedStr, actualStr) => {
        const allowed = parseFloat(allowedStr);
        const actual = parseFloat(actualStr);
        if (isNaN(actual)) return null;

        let tolerance = 0;
        if (actual <= 10000) tolerance = 20;
        else if (actual <= 40000) tolerance = 40;
        else tolerance = 60;

        let netWeightRaw = actual - tolerance;
        let netWeight = (allowed <= 3500) ? Math.floor(netWeightRaw) : Math.ceil(netWeightRaw);
        
        let difference = isNaN(allowed) ? 0 : netWeight - allowed;
        let percentage = (difference > 0 && allowed > 0) ? (difference / allowed) * 100 : 0;
        
        let confiscationPossible = false;
        if (allowed > 0 && difference > 0) {
            if (allowed <= 7500) {
                if (allowed <= 3500 && percentage >= 20) { confiscationPossible = true; }
                else if (allowed > 3500 && percentage >= 15) { confiscationPossible = true; }
            } else {
                 if (percentage >= 15) { confiscationPossible = true; }
            }
        }

        return { actual, allowed, tolerance, netWeight, difference, percentage, isOverloaded: allowed > 0 && difference > 0, isValidInput: !isNaN(allowed) && !isNaN(actual), confiscationPossible };
    };

    setResult({ vehicle1: calculateForVehicle(allowedWeight1, actualWeight1), vehicle2: calculateForVehicle(allowedWeight2, actualWeight2) });
  }, [allowedWeight1, actualWeight1, allowedWeight2, actualWeight2]);

  const resetForm = () => { setAllowedWeight1(''); setActualWeight1(''); setAllowedWeight2(''); setActualWeight2(''); setResult(null); };

  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen">
      <div className="bg-blue-600/95 backdrop-blur-md p-4 text-white flex items-center justify-between sticky top-0 z-20 shadow-lg shadow-blue-900/10">
        <div><h1 className="text-xl font-bold flex items-center gap-2 leading-tight tracking-tight"><Scale className="w-6 h-6 shrink-0" />Überladungsrechner</h1><p className="text-blue-100 text-xs opacity-90 mt-0.5 font-mono flex items-center gap-1.5 ml-8"><Clock className="w-3 h-3" />{dateTime}</p></div>
        <HeaderLogo />
      </div>
      <PrintDocumentHeader title="Protokoll: Überladung" />
      <div className="p-2 space-y-2 print-grid-container">
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 break-inside-avoid"><div className="flex items-center gap-2 mb-2 text-blue-700 print:text-black"><Truck className="w-5 h-5 print:hidden" /><span className="text-sm font-black uppercase tracking-wide">Zugfahrzeug</span></div><div className="space-y-2"><InputWithIcon icon={ShieldCheck} label="zGM (kg)" value={allowedWeight1} onChange={(e) => setAllowedWeight1(e.target.value)} /><InputWithIcon icon={Scale} label="Ist-Gewicht (Brutto)" value={actualWeight1} onChange={(e) => setActualWeight1(e.target.value)} /></div></div>
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 break-inside-avoid"><div className="flex items-center gap-2 mb-2 text-blue-700 print:text-black"><Box className="w-5 h-5 print:hidden" /><span className="text-sm font-black uppercase tracking-wide">Anhänger / Auflieger</span></div><div className="space-y-2"><InputWithIcon icon={ShieldCheck} label="zGM (kg)" value={allowedWeight2} onChange={(e) => setAllowedWeight2(e.target.value)} /><InputWithIcon icon={Scale} label="Ist-Gewicht (Brutto)" value={actualWeight2} onChange={(e) => setActualWeight2(e.target.value)} /></div></div>
        {!result && <div className="bg-blue-50/50 p-3 rounded-xl flex gap-2 text-blue-700 text-xs border border-blue-100 print-full-width print:bg-transparent print:border-none print:text-black"><Info className="w-5 h-5 shrink-0 print:hidden" /><p>Bitte geben Sie die Gewichte für mindestens ein Fahrzeug ein.</p></div>}
      </div>
      {result && (
        <div className="bg-slate-100 border-t border-slate-200 p-4 animate-in slide-in-from-bottom-4 duration-500 pb-20 print-full-width print:bg-transparent print:border-t-0 print:p-0">
          <div className="space-y-3">
             {result.vehicle1 && result.vehicle1.isValidInput && (
                 <div className={`p-3 rounded-2xl border-2 shadow-sm transition-all break-inside-avoid print:rounded-lg print:border-black ${result.vehicle1.isOverloaded ? 'bg-white border-red-200' : 'bg-white border-slate-200'}`}>
                    <div className="flex justify-between items-center mb-1.5"><span className="font-bold text-slate-700 flex items-center gap-1.5 text-sm print:text-black"><Truck className="w-4 h-4 text-slate-400 print:hidden"/> Zugfahrzeug</span><span className={`px-2 py-0.5 rounded-[6px] text-xs font-black uppercase print:border print:border-black print:bg-transparent print:text-black ${result.vehicle1.isOverloaded ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{result.vehicle1.isOverloaded ? 'Überladen' : 'OK'}</span></div>
                    <div className="flex justify-between items-end mb-1"><span className="text-xs text-slate-500 print:text-black print:font-bold">Vorwerfbar:</span><span className="text-xl font-black text-slate-800 print:text-black">{result.vehicle1.netWeight.toLocaleString()} kg</span></div>
                    <ProgressBar current={result.vehicle1.netWeight} max={result.vehicle1.allowed} isOverloaded={result.vehicle1.isOverloaded} />
                     {result.vehicle1.isOverloaded && (<div className="mt-2 pt-1.5 border-t border-red-100 text-sm font-bold text-red-600 print:text-black print:border-t-black"><div className="flex justify-between mb-1"><span>Überschuss:</span><span>+ {result.vehicle1.difference.toLocaleString()} kg ({result.vehicle1.percentage.toFixed(2)}%)</span></div>{result.vehicle1.confiscationPossible && <div className="mt-2 bg-amber-50 rounded-lg p-2 border border-amber-200 text-amber-800 text-xs font-bold flex items-center gap-2 print:bg-transparent print:border print:border-black print:text-black"><AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 print:hidden" /><span>! Bei gewerblichem Transport: Einziehung möglich!</span></div>}</div>)}
                     <OverloadFormulaDisplay values={{ actual: result.vehicle1.actual, tolerance: result.vehicle1.tolerance, net: result.vehicle1.netWeight, allowed: result.vehicle1.allowed, diff: result.vehicle1.difference, percent: result.vehicle1.percentage }} />
                 </div>
             )}
             {result.vehicle2 && result.vehicle2.isValidInput && (
                 <div className={`p-3 rounded-2xl border-2 shadow-sm transition-all break-inside-avoid print:rounded-lg print:border-black ${result.vehicle2.isOverloaded ? 'bg-white border-red-200' : 'bg-white border-slate-200'}`}>
                    <div className="flex justify-between items-center mb-1.5"><span className="font-bold text-slate-700 flex items-center gap-1.5 text-sm print:text-black"><Box className="w-4 h-4 text-slate-400 print:hidden"/> Anhänger</span><span className={`px-2 py-0.5 rounded-[6px] text-xs font-black uppercase print:border print:border-black print:bg-transparent print:text-black ${result.vehicle2.isOverloaded ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{result.vehicle2.isOverloaded ? 'Überladen' : 'OK'}</span></div>
                    <div className="flex justify-between items-end mb-1"><span className="text-xs text-slate-500 print:text-black print:font-bold">Vorwerfbar:</span><span className="text-xl font-black text-slate-800 print:text-black">{result.vehicle2.netWeight.toLocaleString()} kg</span></div>
                    <ProgressBar current={result.vehicle2.netWeight} max={result.vehicle2.allowed} isOverloaded={result.vehicle2.isOverloaded} />
                     {result.vehicle2.isOverloaded && (<div className="mt-2 pt-1.5 border-t border-red-100 text-sm font-bold text-red-600 print:text-black print:border-t-black"><div className="flex justify-between mb-1"><span>Überschuss:</span><span>+ {result.vehicle2.difference.toLocaleString()} kg ({result.vehicle2.percentage.toFixed(2)}%)</span></div>{result.vehicle2.confiscationPossible && <div className="mt-2 bg-amber-50 rounded-lg p-2 border border-amber-200 text-amber-800 text-xs font-bold flex items-center gap-2 print:bg-transparent print:border print:border-black print:text-black"><AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 print:hidden" /><span>! Bei gewerblichem Transport: Einziehung möglich!</span></div>}</div>)}
                     <OverloadFormulaDisplay values={{ actual: result.vehicle2.actual, tolerance: result.vehicle2.tolerance, net: result.vehicle2.netWeight, allowed: result.vehicle2.allowed, diff: result.vehicle2.difference, percent: result.vehicle2.percentage }} />
                 </div>
             )}
          </div>
          <button onClick={resetForm} className="print-hide-button mt-6 w-full py-2.5 text-slate-400 text-sm hover:text-slate-600 font-bold tracking-wide uppercase transition-colors">Alle Eingaben löschen</button>
        </div>
      )}
      <ExportButton />
      <AppVersionFooter />
    </div>
  );
}

// --- LASHING CALCULATOR ---
function LashingCalculator() {
  const [allowedWeight, setAllowedWeight] = useState('');
  const [emptyWeight, setEmptyWeight] = useState('');
  const [loadWeight, setLoadWeight] = useState('');
  
  const FRICTION_OPTIONS = [
    { id: '0.20_dirty', val: 0.20, label: '0,20 μ - Nicht besenrein (verschmutzt) (Q: DIN EN 12195-1)' },
    { id: '0.20_metal', val: 0.20, label: '0,20 μ - Metall auf Metall (Q: DIN EN 12195-1)' },
    { id: '0.25_gitter', val: 0.25, label: '0,25 μ - Gitterbox auf Siebdruckboden (Q: TUL-LOG)' },
    { id: '0.25_kunststoff', val: 0.25, label: '0,25 μ - Kunststoffpalette auf Siebdruckboden (DGUV)' },
    { id: '0.25_papier', val: 0.25, label: '0,25 μ - Papierrolle auf Siebdruckboden (Q: VDI 2700 Blatt 9)' },
    { id: '0.30_holz_mehrweg', val: 0.30, label: '0,30 μ - Holzpalette Mehrweg auf Siebdruckboden (Q: DEKRA)' },
    { id: '0.35_papier_joloda', val: 0.35, label: '0,35 μ - Papierrolle Siebdruckboden mit Joloda (Q: VDI 2700 Blatt 9)' },
    { id: '0.35_stroh', val: 0.35, label: '0,35 μ - Strohballen auf Siebdruckboden (Q: DEKRA)' },
    { id: '0.40_kantholz', val: 0.40, label: '0,40 μ - Kantholz auf Siebdruckboden (Q: DIN EN 12195-1)' },
    { id: '0.45_holz_einweg', val: 0.45, label: '0,45 μ - Holzpalette Einweg auf Siebdruckboden (Q: Fraunhofer)' },
    { id: '0.45_stahlkiste', val: 0.45, label: '0,45 μ - Stahlkiste auf Siebdruckboden (Q: DIN EN 12195-1)' },
    { id: '0.45_gummireifen', val: 0.45, label: '0,45 μ - Gummireifen auf Siebdruckboden (Q: DEKRA)' },
    { id: '0.55_betonware', val: 0.55, label: '0,55 μ - Betonware auf Siebdruckboden (Q: Fraunhofer)' },
    { id: '0.60_antirutsch', val: 0.60, label: '0,60 μ - Antirutschmatte (Q: DIN EN 12195-1)' },
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
    const maxWeight = parseFloat(allowedWeight);
    const empty = parseFloat(emptyWeight) || 0;

    if (isNaN(m) || m <= 0) {
      setLashingResult(null); return;
    }
    
    // Bußgeld-Logik (unverändert)
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
    
    // CASE 1: <= 1999 kg
    if (!maxWeight || maxWeight <= 1999) {
        accFwd = isTipping ? 1.08 : 0.90;
        accSide = isTipping ? 0.84 : 0.70;
        accRear = isTipping ? 0.60 : 0.50;
    } 
    // CASE 2: 2000 kg - 3500 kg
    else if (maxWeight <= 3500) {
        accFwd = isTipping ? 0.96 : 0.80; // Vorgabe: 0.8 / 0.96
        accSide = isTipping ? 0.72 : 0.60; // Vorgabe: 0.6 / 0.72
        accRear = isTipping ? 0.60 : 0.50; // Vorgabe: 0.5 / 0.60
    } 
    // CASE 3: > 3500 kg (Standard/Old values if not specified otherwise, but standard is usually 0.8/0.5)
    else {
        accFwd = isTipping ? 0.96 : 0.80; // Standard Truck
        accSide = isTipping ? 0.60 : 0.50; // Standard Truck
        accRear = isTipping ? 0.60 : 0.50; // Standard Truck
    }

    const calculateN = (acc, blockingDaN, direction) => {
       const weightForce = m * g;
       const blockingForce = (parseFloat(blockingDaN) || 0) * 10; 
       
       let n = 0;

       // SPECIAL FORMULA FOR <= 3.5t
       if (!maxWeight || maxWeight <= 3500) {
           // Formula: (((Weight*Acc) - Wall - (Weight*Friction))) / (1.8 * sin(a) * Friction * STF)
           const numerator = (weightForce * acc) - blockingForce - (weightForce * mu);
           if (numerator <= 0) return 0;
           
           // Denominator uses 1.8 instead of 2.0 or 1.5 safety factor logic directly
           // Denominator = 1.8 * sin(alpha) * mu * STF_Newton
           const denominator = 1.8 * Math.sin(alphaRad) * mu * stfInNewton;
           
           if (denominator <= 0) return 0; // Avoid division by zero
           n = numerator / denominator;
           
           return Math.floor(n); 
       } 
       
       // STANDARD FORMULA FOR > 3.5t
       else {
            // Standard Safety Factor Logic
           let safetyFactor = (direction === 'forward') ? 1.25 : 1.1; 

           const numerator = (weightForce * acc) - blockingForce - (weightForce * mu);
           if (numerator <= 0) return 0;
           const denominator = stfInNewton * 2 * mu * Math.sin(alphaRad); // Standard denominator
           if (denominator <= 0) return 0; 
           n = (numerator / denominator) * safetyFactor;
           return Math.ceil(n);
       }
    };

    const nForward = calculateN(accFwd, fitFront ? wallFront : 0, 'forward');
    const nSide = calculateN(accSide, fitSide ? wallSide : 0, 'side');
    const nRear = calculateN(accRear, fitRear ? wallRear : 0, 'rear');

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
      <div className="bg-indigo-600/95 backdrop-blur-md p-4 text-white flex items-center justify-between sticky top-0 z-20 shadow-lg shadow-indigo-900/10">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2 leading-tight tracking-tight">
            <LashingStrapIcon className="w-5 h-5 shrink-0" />
            LaSi-Niederzurren
          </h1>
          <p className="text-indigo-100 text-xs opacity-90 mt-0.5 font-mono flex items-center gap-1.5 ml-7">
             <Clock className="w-3 h-3" />
             {dateTime}
          </p>
        </div>
        <HeaderLogo />
      </div>

      <PrintDocumentHeader title="Protokoll: Ladungssicherung" />

      <AngleMeasureModal isOpen={isMeasureModalOpen} onClose={() => setIsMeasureModalOpen(false)} onApply={(a) => setAngle(a)} />

      <div className="p-2 space-y-2 print-grid-container">
        
        {/* AUFBAU CARD */}
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 break-inside-avoid">
            <div className="mb-2 text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5 print:text-black">
                <ShieldCheck className="w-3.5 h-3.5 print:hidden" /> Fahrzeugaufbau wählen
            </div>
            <div className="grid grid-cols-2 gap-2 print:block">
                 <button onClick={() => setBodyCert('NONE')} className={`col-span-2 py-2.5 rounded-xl font-bold text-xs sm:text-sm border-2 flex items-center justify-center gap-1.5 transition-all print:border-none print:justify-start print:pl-0 ${bodyCert === 'NONE' ? 'bg-slate-700 text-white border-slate-700 shadow-md transform scale-[1.02] print:text-black print:bg-transparent print:shadow-none' : 'bg-white text-slate-500 border-slate-100 hover:border-indigo-200 print:hidden'}`}>
                    <span>Kein geprüfter Aufbau</span>
                </button>
                <button onClick={() => setBodyCert('L')} className={`py-2.5 rounded-xl font-bold text-xs sm:text-sm border-2 flex items-center justify-center gap-1.5 transition-all print:border-none print:justify-start print:pl-0 ${bodyCert === 'L' ? 'bg-indigo-600 text-white border-indigo-600 shadow-md transform scale-[1.02] print:text-black print:bg-transparent print:shadow-none' : 'bg-white text-slate-500 border-slate-100 hover:border-indigo-200 print:hidden'}`}>
                    <span>Code L</span>
                </button>
                 <button onClick={() => setBodyCert('XL')} className={`py-2.5 rounded-xl font-bold text-xs sm:text-sm border-2 flex items-center justify-center gap-1.5 transition-all print:border-none print:justify-start print:pl-0 ${bodyCert === 'XL' ? 'bg-indigo-600 text-white border-indigo-600 shadow-md transform scale-[1.02] print:text-black print:bg-transparent print:shadow-none' : 'bg-white text-slate-500 border-slate-100 hover:border-indigo-200 print:hidden'}`}>
                    <span>Code XL</span>
                </button>
            </div>
        </div>

        {/* GEWICHTE CARD */}
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 break-inside-avoid">
           <div className="flex items-center gap-1.5 mb-2 text-indigo-700 print:text-black">
              <Scale className="w-5 h-5 print:hidden" />
              <span className="text-sm font-black uppercase tracking-wide">Massen & Gewicht</span>
           </div>
           <div className="grid grid-cols-2 gap-2 mb-2">
             <InputWithIcon icon={Truck} label="Leergewicht (kg)" value={emptyWeight} onChange={(e) => setEmptyWeight(e.target.value)} placeholder="0" />
             <InputWithIcon icon={ShieldCheck} label="Zul. Gesamt (kg)" value={allowedWeight} onChange={(e) => setAllowedWeight(e.target.value)} placeholder="0" />
           </div>
           <InputWithIcon icon={Box} label="Ladungsgewicht (kg) *" value={loadWeight} onChange={(e) => setLoadWeight(e.target.value)} placeholder="0" />
        </div>

        {/* SETTINGS CARD */}
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 break-inside-avoid">
          <div className="flex items-center gap-1.5 mb-2 text-indigo-700 print:text-black">
              <Settings className="w-5 h-5 print:hidden" />
              <span className="text-sm font-black uppercase tracking-wide">Parameter</span>
           </div>
          <div className="grid grid-cols-2 gap-2">
            
            <div className="relative col-span-2 sm:col-span-1">
                <label className="block text-xs font-bold text-slate-400 uppercase mb-0.5 ml-1">Reibbeiwert (μ)</label>
                {selectedFrictionId === 'CUSTOM' ? (
                  <div className="flex gap-1">
                    <div className="relative w-full">
                       <input type="number" step="0.01" value={customFrictionVal} onChange={(e) => setCustomFrictionVal(e.target.value)} className="w-full bg-white border-2 border-indigo-500 rounded-xl px-3 py-2.5 text-base focus:outline-none focus:ring-0 font-medium text-slate-800 print:border-none print:pl-0" placeholder="z.B. 0.33" autoFocus />
                       <span className="absolute right-3 top-2.5 text-slate-400 font-bold pointer-events-none print:hidden">μ</span>
                    </div>
                    <button onClick={() => { setSelectedFrictionId('0.3_holz'); setFriction(0.3); }} className="bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-xl px-3 flex items-center justify-center transition-colors print:hidden" title="Zurück zur Liste"><X className="w-5 h-5" /></button>
                  </div>
                ) : (
                  <select value={selectedFrictionId} onChange={(e) => setSelectedFrictionId(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none font-medium truncate pr-8 print:border-b print:border-slate-300 print:rounded-none print:pl-0">
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
                         <input type="number" min="0" max="90" value={angle} onChange={(e) => setAngle(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium print:border-b print:border-slate-300 print:rounded-none print:pl-0" placeholder="90" />
                         <span className="absolute right-3 top-2.5 text-slate-400 font-bold pointer-events-none print:hidden">°</span>
                    </div>
                    <button onClick={() => setIsMeasureModalOpen(true)} className="bg-indigo-600 text-white rounded-xl px-3.5 flex items-center justify-center hover:bg-indigo-700 active:scale-95 transition-all shadow-md shadow-indigo-200 print:hidden" title="Winkel messen"><TapeMeasureIcon className="w-5 h-5" /></button>
                </div>
            </div>

            <div className="col-span-2 relative">
                 <label className="block text-xs font-bold text-slate-400 uppercase mb-0.5 ml-1">Vorspannkraft STF (daN)</label>
                 <select value={stf} onChange={(e) => setStf(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none font-medium print:border-b print:border-slate-300 print:rounded-none print:pl-0">
                    {[100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600].map((val) => (<option key={val} value={val}>{val} daN</option>))}
                </select>
            </div>
          </div>
        </div>

        {/* FORMSCHLUSS CARD */}
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 break-inside-avoid">
           <div className="flex items-center gap-1.5 mb-2 text-indigo-700 print:text-black">
              <Box className="w-5 h-5 print:hidden" />
              <span className="text-sm font-black uppercase tracking-wide">Aufbau Belastbarkeit (daN)</span>
           </div>
           
           <div className="grid grid-cols-3 gap-2">
             {/* Stirnwand */}
             <div className="flex flex-col">
               <div className="flex items-center gap-1 mb-1">
                 <input type="checkbox" checked={fitFront} onChange={(e) => setFitFront(e.target.checked)} id="cb_front" className="w-3.5 h-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer print:hidden" />
                 <label htmlFor="cb_front" className="text-xs font-bold text-slate-600 uppercase cursor-pointer select-none print:text-black">Formschluss</label>
               </div>
               <label className="block text-xs font-bold text-slate-400 uppercase mb-0.5 print:hidden">Stirnwand</label>
               <input type="number" inputMode="numeric" disabled={!fitFront} value={wallFront} onChange={(e) => setWallFront(e.target.value)} onBlur={(e) => handleBlur('front', e.target.value, setWallFront)} placeholder="0" className={`w-full border rounded px-1.5 py-2 text-sm text-center focus:outline-none focus:ring-2 transition-all print:text-left print:pl-0 print:border-b print:border-slate-300 print:rounded-none ${fitFront ? 'bg-white border-indigo-300 focus:ring-indigo-500 text-slate-800' : 'bg-slate-100 border-slate-200 text-slate-400 print:bg-transparent'}`} />
             </div>

             {/* Seite */}
             <div className="flex flex-col">
               <div className="flex items-center gap-1 mb-1">
                 <input type="checkbox" checked={fitSide} onChange={(e) => setFitSide(e.target.checked)} id="cb_side" className="w-3.5 h-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer print:hidden" />
                 <label htmlFor="cb_side" className="text-xs font-bold text-slate-600 uppercase cursor-pointer select-none print:text-black">Formschluss</label>
               </div>
               <label className="block text-xs font-bold text-slate-400 uppercase mb-0.5 print:hidden">Seite</label>
               <input type="number" inputMode="numeric" disabled={!fitSide} value={wallSide} onChange={(e) => setWallSide(e.target.value)} onBlur={(e) => handleBlur('side', e.target.value, setWallSide)} placeholder="0" className={`w-full border rounded px-1.5 py-2 text-sm text-center focus:outline-none focus:ring-2 transition-all print:text-left print:pl-0 print:border-b print:border-slate-300 print:rounded-none ${fitSide ? 'bg-white border-indigo-300 focus:ring-indigo-500 text-slate-800' : 'bg-slate-100 border-slate-200 text-slate-400 print:bg-transparent'}`} />
             </div>

             {/* Heck */}
             <div className="flex flex-col">
               <div className="flex items-center gap-1 mb-1">
                 <input type="checkbox" checked={fitRear} onChange={(e) => setFitRear(e.target.checked)} id="cb_rear" className="w-3.5 h-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer print:hidden" />
                 <label htmlFor="cb_rear" className="text-xs font-bold text-slate-600 uppercase cursor-pointer select-none print:text-black">Formschluss</label>
               </div>
               <label className="block text-xs font-bold text-slate-400 uppercase mb-0.5 print:hidden">Heck</label>
               <input type="number" inputMode="numeric" disabled={!fitRear} value={wallRear} onChange={(e) => setWallRear(e.target.value)} onBlur={(e) => handleBlur('rear', e.target.value, setWallRear)} placeholder="0" className={`w-full border rounded px-1.5 py-2 text-sm text-center focus:outline-none focus:ring-2 transition-all print:text-left print:pl-0 print:border-b print:border-slate-300 print:rounded-none ${fitRear ? 'bg-white border-indigo-300 focus:ring-indigo-500 text-slate-800' : 'bg-slate-100 border-slate-200 text-slate-400 print:bg-transparent'}`} />
             </div>
           </div>
           
           <div className="mt-2 flex gap-2 items-start text-xs text-slate-500 bg-slate-50 p-2 rounded-xl print:bg-transparent print:p-0 print:text-black">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-indigo-400 print:hidden" />
              <p>Formschluss gilt bis 5 cm Abstand (hinten max. 30 cm).</p>
           </div>
        </div>

        {/* KIPPGEFAHR */}
        <label className={`block border-2 rounded-xl p-3 flex items-center gap-3 transition-all cursor-pointer break-inside-avoid print-full-width print:border-none print:pl-0 ${isTipping ? 'bg-amber-50 border-amber-300 shadow-sm print:bg-transparent' : 'bg-white border-slate-100 print:bg-transparent'}`}>
          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center print:hidden ${isTipping ? 'bg-amber-500 border-amber-500 text-white' : 'border-slate-300'}`}>
            {isTipping && <CheckSquare className="w-4 h-4" />}
          </div>
          <input type="checkbox" checked={isTipping} onChange={(e) => setIsTipping(e.target.checked)} className="hidden" />
          <span className={`font-bold text-sm ${isTipping ? 'text-amber-800 print:text-black' : 'text-slate-500 print:text-black'}`}>
             Ladung ist kippgefährdet: {isTipping ? 'JA' : 'NEIN'}
          </span>
        </label>

        {/* RESULTAT */}
        {lashingResult !== null && (
          <div className="space-y-3 pb-20 break-inside-avoid print-full-width">
            <div className={`border-2 rounded-2xl p-4 mt-4 shadow-xl print:shadow-none print:border-2 print:border-black print:rounded-lg ${isTipping ? 'bg-white border-amber-200 shadow-amber-100' : 'bg-white border-indigo-100 shadow-indigo-100'}`}>
              
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100 print:border-slate-300">
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 print:text-black">Erforderliche Gurte</h3>
                <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-500 print:bg-transparent print:text-black print:border print:border-black">
                  {lashingResult.weightClassInfo}
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                {[
                    { label: 'Vorne', count: lashingResult.forward, factor: lashingResult.factorForward, hasFit: fitFront },
                    { label: 'Seite', count: lashingResult.side, factor: lashingResult.factorSide, hasFit: fitSide },
                    { label: 'Hinten', count: lashingResult.rear, factor: lashingResult.factorRear, hasFit: fitRear }
                ].map((res, idx) => (
                    <div key={idx} className="flex flex-col items-center p-2 rounded-xl bg-slate-50 print:bg-transparent">
                        <span className={`text-4xl font-black ${isTipping ? 'text-amber-600 print:text-black' : 'text-indigo-600 print:text-black'}`}>{res.count}</span>
                        <span className="text-xs font-bold uppercase text-slate-400 mt-0.5 print:text-black">{res.label}</span>
                        <div className="flex flex-col items-center gap-0.5">
                            <span className="text-[10px] text-slate-300 print:text-black">({res.factor}g)</span>
                            <span className={`text-[10px] font-bold ${res.hasFit ? 'text-emerald-600' : 'text-slate-300'} print:text-black`}>
                                {res.hasFit ? (
                                    <span className="flex items-center gap-0.5"><CheckCircle className="w-2.5 h-2.5" /> Formschl.</span>
                                ) : 'Kein Formschl.'}
                            </span>
                        </div>
                    </div>
                ))}
              </div>

               <div className={`mt-4 p-3 rounded-xl flex items-center justify-between print:bg-transparent print:border-t print:border-black print:rounded-none ${isTipping ? 'bg-amber-50 text-amber-900' : 'bg-indigo-50 text-indigo-900'}`}>
                 <span className="text-xs font-bold uppercase tracking-wide opacity-70 print:text-black">Minimum:</span>
                 <div className="text-3xl font-black print:text-black">
                    {Math.max(lashingResult.forward, lashingResult.side, lashingResult.rear)} <span className="text-base font-bold opacity-60 print:text-black">Gurte</span>
                 </div>
               </div>
               
               {/* FORMEL ANZEIGE MIT DETAIL-TABELLE */}
               <LashingFormulaDisplay values={lashingResult.displayValues} details={lashingResult.detailRows} weightClass={lashingResult.weightClass} />
            </div>

            
            {fineGroups.length > 0 && (
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex flex-col gap-3 shadow-sm mt-3 print:bg-transparent print:border-none print:shadow-none">
                <div className="flex items-center gap-2 mb-1 print:hidden">
                   <Gavel className="w-5 h-5 text-slate-400" />
                   <h4 className="font-bold text-slate-600 text-xs uppercase">Mögliches Bußgeld (bei Verstoß)</h4>
                </div>
                
                {fineGroups.map((group, gIdx) => (
                    <div key={gIdx} className="mt-4 first:mt-2 print:hidden">
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
            )}
          </div>
        )}
      </div>
      <ExportButton />
      <div className="hidden signature-section pt-8 border-t border-slate-300 print:hidden">
          {/* Leeres Unterschriftenfeld für zukünftige Nutzung */}
      </div>
      <AppVersionFooter />
    </div>
  ;
}
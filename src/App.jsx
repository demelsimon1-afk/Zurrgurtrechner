import React, { useState, useEffect } from 'react';
import { Scale, AlertTriangle, CheckCircle, Info, Box, Truck, ShieldCheck, ShieldAlert, Trees, Ruler, Clock, CheckSquare, Settings, ChevronRight, Droplets, Weight, Printer } from 'lucide-react';

// --- HELPER COMPONENTS FOR UI ---

// Benutzerdefiniertes Icon für Zurrgurt/Ratsche
const LashingStrapIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 12h20" />
    <rect x="8" y="7" width="8" height="10" rx="2" fill="currentColor" fillOpacity="0.1" />
    <path d="M8 12h8" />
    <path d="M2 12l2 2" />
    <path d="M22 12l-2 2" />
  </svg>
);

const HeaderLogo = () => (
  <span className="text-base font-black text-white/50 tracking-wider italic select-none border border-white/20 px-3 py-1 rounded-md backdrop-blur-sm">
    Demel
  </span>
);

// Styles für den Druck (Optimiert für Scrolling/Overflow)
const PrintStyles = () => (
    <style dangerouslySetInnerHTML={{__html: `
      @media print {
        @page { margin: 10mm; size: A4; }
        html, body { 
          height: auto !important; 
          min-height: auto !important;
          overflow: visible !important; 
          background-color: white !important;
          -webkit-print-color-adjust: exact !important; 
          print-color-adjust: exact !important; 
        }
        
        /* Navigation und UI-Elemente ausblenden */
        .no-print, nav, .fixed.bottom-0, .print-hide-button { display: none !important; }
        
        /* Layout Reset für Druck */
        .min-h-screen, .flex-1, .flex-col { 
           display: block !important; 
           position: static !important;
           height: auto !important; 
           min-height: 0 !important;
           overflow: visible !important;
           flex: none !important;
        }

        .pb-24 { padding-bottom: 0 !important; }
        .max-w-md { max-w: 100% !important; margin: 0 !important; width: 100% !important; }
        
        /* Container Styling für Druck */
        .bg-slate-50 { background-color: white !important; }
        .shadow-sm, .shadow-xl { box-shadow: none !important; border: 1px solid #ccc !important; }
        .gap-2 { gap: 0.5rem !important; }
        
        /* Header Farben erzwingen */
        .bg-emerald-600 { background-color: #059669 !important; color: white !important; }
        .bg-blue-600 { background-color: #2563eb !important; color: white !important; }
        .bg-indigo-600 { background-color: #4f46e5 !important; color: white !important; }
        .text-white { color: white !important; }
        
        /* Seitenumbrüche steuern */
        .break-inside-avoid { break-inside: avoid; page-break-inside: avoid; }
        
        /* Eingabefelder im Druck flach darstellen */
        input, select { 
            border: none !important; 
            background: transparent !important; 
            padding-left: 0 !important; 
            font-weight: bold !important; 
            color: black !important;
            appearance: none !important;
        }
        .relative.group { border-bottom: 1px solid #eee; margin-bottom: 0.25rem; }
        input { padding-left: 1.5rem !important; }
        
        /* Verstecke Placeholder im Druck wenn leer */
        input:placeholder-shown { opacity: 0; }
      }
    `}} />
);

// Export Button Component
const ExportButton = () => (
  <button 
    onClick={() => {
        try { window.focus(); } catch(e){}
        window.print();
    }}
    className="print-hide-button mt-6 w-full py-4 bg-slate-800 text-white rounded-xl flex items-center justify-center gap-2.5 font-bold shadow-lg hover:bg-slate-700 transition-all active:scale-95 mb-8 text-base"
  >
    <Printer className="w-5 h-5" />
    Ergebnis als PDF exportieren
  </button>
);

// Progress Bar Component
const ProgressBar = ({ current, max, isOverloaded }) => {
  if (!max || max <= 0) return null;
  const percentage = Math.min(100, Math.max(0, (current / max) * 100));
  
  let colorClass = 'bg-emerald-500';
  if (percentage > 90) colorClass = 'bg-amber-500';
  if (percentage >= 100 || isOverloaded) colorClass = 'bg-red-500';

  return (
    <div className="w-full h-3 bg-slate-200 rounded-full mt-2.5 overflow-hidden shadow-inner print:border print:border-slate-300">
      <div 
        className={`h-full transition-all duration-500 ease-out ${colorClass}`} 
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

// Input Field mit Icon - GRÖSSERE SCHRIFT
const InputWithIcon = ({ icon: Icon, label, value, onChange, placeholder, type="number", disabled=false, onBlur }) => (
  <div className="relative group break-inside-avoid">
    <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1 transition-colors group-focus-within:text-indigo-500">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
        <Icon className="h-5 w-5" />
      </div>
      <input
        type={type}
        inputMode={type === 'number' ? 'decimal' : 'text'}
        className={`block w-full pl-10 pr-3 py-2.5 text-base border rounded-xl transition-all shadow-sm
          ${disabled 
            ? 'bg-slate-100 border-slate-200 text-slate-400' 
            : 'bg-white border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-700 font-medium'
          }`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
      />
    </div>
  </div>
);

// Hilfsfunktion für Datum und Zeit
const useDateTime = () => {
  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const str = now.toLocaleString('de-DE', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });
      setDateTime(str + ' Uhr');
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return dateTime;
};

// --- MAIN APP COMPONENT ---

export default function App() {
  const [activeTab, setActiveTab] = useState('lashing');

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col relative selection:bg-indigo-100">
      <PrintStyles />
      <div className="flex-1 pb-24 z-10 relative">
        {activeTab === 'overload' ? (
          <OverloadCalculator />
        ) : activeTab === 'wood' ? (
          <WoodCalculator />
        ) : (
          <LashingCalculator />
        )}
      </div>
      
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-safe z-50 no-print">
        <div className="max-w-md mx-auto flex justify-around p-2">
          {[
            { id: 'lashing', icon: LashingStrapIcon, label: 'Zurrgurte', color: 'text-indigo-600' },
            { id: 'overload', icon: Scale, label: 'Gewicht', color: 'text-blue-600' },
            { id: 'wood', icon: Trees, label: 'Holz', color: 'text-emerald-600' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-3 rounded-xl flex flex-col items-center gap-1 transition-all duration-300 ${
                activeTab === tab.id ? 'bg-slate-100 scale-105' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
              }`}
            >
              <tab.icon className={`w-6 h-6 ${activeTab === tab.id ? tab.color : ''}`} />
              <span className={`text-xs font-bold ${activeTab === tab.id ? 'text-slate-800' : ''}`}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>
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
  const [woodType, setWoodType] = useState('Fichte lufttrocken'); 
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
    { name: 'Akazie ganz frisch', density: 950 }, { name: 'Akazie waldtrocken', density: 800 }, { name: 'Akazie lufttrocken', density: 750 }, { name: 'Akazie Darr-Gewicht', density: 700 },
    { name: 'Apfelbaum ganz frisch', density: 980 }, { name: 'Apfelbaum waldtrocken', density: 830 }, { name: 'Apfelbaum lufttrocken', density: 750 }, { name: 'Apfelbaum Darr-Gewicht', density: 700 },
    { name: 'Aspe ganz frisch', density: 800 }, { name: 'Aspe waldtrocken', density: 650 }, { name: 'Aspe lufttrocken', density: 500 }, { name: 'Aspe Darr-Gewicht', density: 400 },
    { name: 'Bergahorn ganz frisch', density: 950 }, { name: 'Bergahorn waldtrocken', density: 800 }, { name: 'Bergahorn lufttrocken', density: 660 }, { name: 'Bergahorn Darr-Gewicht', density: 600 },
    { name: 'Birke ganz frisch', density: 900 }, { name: 'Birke waldtrocken', density: 800 }, { name: 'Birke lufttrocken', density: 650 }, { name: 'Birke Darr-Gewicht', density: 575 },
    { name: 'Birnbaum ganz frisch', density: 950 }, { name: 'Birnbaum waldtrocken', density: 820 }, { name: 'Birnbaum lufttrocken', density: 750 }, { name: 'Birnbaum Darr-Gewicht', density: 700 },
    { name: 'Edelkastanie ganz frisch', density: 850 }, { name: 'Edelkastanie waldtrocken', density: 700 }, { name: 'Edelkastanie lufttrocken', density: 625 }, { name: 'Edelkastanie Darr-Gewicht', density: 575 },
    { name: 'Eibe ganz frisch', density: 1000 }, { name: 'Eibe waldtrocken', density: 850 }, { name: 'Eibe lufttrocken', density: 750 }, { name: 'Eibe Darr-Gewicht', density: 650 },
    { name: 'Eiche ganz frisch', density: 1150 }, { name: 'Eiche waldtrocken', density: 1000 }, { name: 'Eiche lufttrocken', density: 800 }, { name: 'Eiche Darr-Gewicht', density: 680 },
    { name: 'Esche ganz frisch', density: 900 }, { name: 'Esche waldtrocken', density: 800 }, { name: 'Esche lufttrocken', density: 725 }, { name: 'Esche Darr-Gewicht', density: 650 },
    { name: 'Feldahorn ganz frisch', density: 1000 }, { name: 'Feldahorn waldtrocken', density: 850 }, { name: 'Feldahorn lufttrocken', density: 725 }, { name: 'Feldahorn Darr-Gewicht', density: 650 },
    { name: 'Fichte ganz frisch', density: 800 }, { name: 'Fichte waldtrocken', density: 675 }, { name: 'Fichte lufttrocken', density: 500 }, { name: 'Fichte Darr-Gewicht', density: 420 },
    { name: 'Gemeine Kiefer ganz frisch', density: 800 }, { name: 'Gemeine Kiefer waldtrocken', density: 680 }, { name: 'Gemeine Kiefer lufttrocken', density: 575 }, { name: 'Gemeine Kiefer Darr-Gewicht', density: 500 },
    { name: 'Kirsche ganz frisch', density: 800 }, { name: 'Kirsche waldtrocken', density: 675 }, { name: 'Kirsche lufttrocken', density: 600 }, { name: 'Kirsche Darr-Gewicht', density: 560 },
    { name: 'Lärche ganz frisch', density: 875 }, { name: 'Lärche waldtrocken', density: 750 }, { name: 'Lärche lufttrocken', density: 600 }, { name: 'Lärche Darr-Gewicht', density: 560 },
    { name: 'Linde ganz frisch', density: 750 }, { name: 'Linde waldtrocken', density: 600 }, { name: 'Linde lufttrocken', density: 450 }, { name: 'Linde Darr-Gewicht', density: 400 },
    { name: 'Nussbaum ganz frisch', density: 850 }, { name: 'Nussbaum waldtrocken', density: 700 }, { name: 'Nussbaum lufttrocken', density: 675 }, { name: 'Nussbaum Darr-Gewicht', density: 625 },
    { name: 'Pappel ganz frisch', density: 750 }, { name: 'Pappel waldtrocken', density: 600 }, { name: 'Pappel lufttrocken', density: 475 }, { name: 'Pappel Darr-Gewicht', density: 400 },
    { name: 'Platane ganz frisch', density: 850 }, { name: 'Platane waldtrocken', density: 680 }, { name: 'Platane lufttrocken', density: 625 }, { name: 'Platane Darr-Gewicht', density: 550 },
    { name: 'Rosskastanie ganz frisch', density: 750 }, { name: 'Rosskastanie waldtrocken', density: 600 }, { name: 'Rosskastanie lufttrocken', density: 550 }, { name: 'Rosskastanie Darr-Gewicht', density: 500 },
    { name: 'Rotbuche ganz frisch', density: 1100 }, { name: 'Rotbuche waldtrocken', density: 900 }, { name: 'Rotbuche lufttrocken', density: 750 }, { name: 'Rotbuche Darr-Gewicht', density: 700 },
    { name: 'Roterle ganz frisch', density: 850 }, { name: 'Roterle waldtrocken', density: 700 }, { name: 'Roterle lufttrocken', density: 550 }, { name: 'Roterle Darr-Gewicht', density: 475 },
    { name: 'Schwarzkiefer ganz frisch', density: 1000 }, { name: 'Schwarzkiefer waldtrocken', density: 750 }, { name: 'Schwarzkiefer lufttrocken', density: 650 }, { name: 'Schwarzkiefer Darr-Gewicht', density: 600 },
    { name: 'Spitzahorn ganz frisch', density: 950 }, { name: 'Spitzahorn waldtrocken', density: 820 }, { name: 'Spitzahorn lufttrocken', density: 670 }, { name: 'Spitzahorn Darr-Gewicht', density: 625 },
    { name: 'Tanne ganz frisch', density: 900 }, { name: 'Tanne waldtrocken', density: 700 }, { name: 'Tanne lufttrocken', density: 490 }, { name: 'Tanne Darr-Gewicht', density: 410 },
    { name: 'Ulme ganz frisch', density: 900 }, { name: 'Ulme waldtrocken', density: 750 }, { name: 'Ulme lufttrocken', density: 675 }, { name: 'Ulme Darr-Gewicht', density: 600 },
    { name: 'Weide ganz frisch', density: 800 }, { name: 'Weide waldtrocken', density: 650 }, { name: 'Weide lufttrocken', density: 475 }, { name: 'Weide Darr-Gewicht', density: 400 },
    { name: 'Weym.-Kiefer ganz frisch', density: 720 }, { name: 'Weym.-Kiefer waldtrocken', density: 475 }, { name: 'Weym.-Kiefer lufttrocken', density: 400 }, { name: 'Weym.-Kiefer Darr-Gewicht', density: 375 },
    { name: 'Weißbuche ganz frisch', density: 1000 }, { name: 'Weißbuche waldtrocken', density: 850 }, { name: 'Weißbuche lufttrocken', density: 820 }, { name: 'Weißbuche Darr-Gewicht', density: 750 },
    { name: 'Weißerle ganz frisch', density: 900 }, { name: 'Weißerle waldtrocken', density: 700 }, { name: 'Weißerle lufttrocken', density: 550 }, { name: 'Weißerle Darr-Gewicht', density: 500 }
  ];

  const volume = (parseFloat(length) || 0) * (parseFloat(width) || 0) * (parseFloat(height) || 0);
  const solidFactor = 0.70;
  const solidVolume = volume * solidFactor;

  const selectedWood = woodTypes.find(w => w.name === woodType);
  const currentDensity = selectedWood ? selectedWood.density : 0;

  const rawWeight = solidVolume * currentDensity;
  const maxWeight = parseFloat(allowedWeight) || 0;
  
  const calculatedLoadWeight = (!maxWeight || maxWeight <= 3500) 
    ? Math.floor(rawWeight) 
    : Math.ceil(rawWeight);
  
  const totalWeight = (parseFloat(emptyWeight) || 0) + calculatedLoadWeight;
  const difference = totalWeight - maxWeight;
  const isOverloaded = maxWeight > 0 && difference > 0;
  const percentage = (isOverloaded && maxWeight > 0) ? (difference / maxWeight) * 100 : 0;
  const remaining = maxWeight - totalWeight;

  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen">
      <div className="bg-emerald-600/95 backdrop-blur-md p-4 text-white flex items-center justify-between sticky top-0 z-20 shadow-lg shadow-emerald-900/10">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2 leading-tight tracking-tight">
            <Trees className="w-6 h-6 shrink-0" />
            Holzgewichtsrechner
          </h1>
          <p className="text-emerald-100 text-xs opacity-90 mt-0.5 font-mono flex items-center gap-1.5 ml-8">
             <Clock className="w-3 h-3" />
             {dateTime}
          </p>
        </div>
        <HeaderLogo />
      </div>

      <div className="p-2 space-y-2">
        
        {/* FAHRZEUGGEWICHTE CARD */}
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 break-inside-avoid">
           <div className="flex items-center gap-1.5 mb-2 text-emerald-700">
              <Truck className="w-5 h-5" />
              <span className="text-sm font-black uppercase tracking-wide">Fahrzeuggewichte</span>
           </div>
           
           <div className="grid grid-cols-2 gap-2 mb-2">
             <InputWithIcon icon={Truck} label="Leergewicht Zugm. (kg)" value={tractorWeight} onChange={(e) => setTractorWeight(e.target.value)} placeholder="0" />
             <InputWithIcon icon={Box} label="Leergewicht Aufl. (kg)" value={trailerWeight} onChange={(e) => setTrailerWeight(e.target.value)} placeholder="0" />
           </div>

           <div className="space-y-2">
               <InputWithIcon icon={Scale} label="Zulässiges Gesamtgewicht (kg)" value={allowedWeight} onChange={(e) => setAllowedWeight(e.target.value)} placeholder="z.B. 40000" />
               <div className="grid grid-cols-2 gap-2 print-hide-button">
                 <button onClick={() => setAllowedWeight('40000')} className={`text-xs font-bold py-2.5 rounded-lg border transition-all ${allowedWeight === '40000' ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-white border-slate-100 text-slate-400 hover:border-emerald-200'}`}>
                   40 t (Standard)
                 </button>
                 <button onClick={() => setAllowedWeight('44000')} className={`text-xs font-bold py-2.5 rounded-lg border transition-all ${allowedWeight === '44000' ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-white border-slate-100 text-slate-400 hover:border-emerald-200'}`}>
                   44 t (Ausnahme)
                 </button>
               </div>
           </div>
           
           {(parseFloat(emptyWeight) > 0) && (
              <div className="mt-2 pt-2 border-t border-slate-100 flex justify-between text-xs text-slate-500">
                <span>Leergewicht gesamt:</span>
                <span className="font-bold text-slate-700 text-sm">{parseFloat(emptyWeight).toLocaleString('de-DE')} kg</span>
              </div>
           )}
        </div>

        {/* DIMENSIONEN CARD */}
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 break-inside-avoid">
           <div className="flex items-center gap-1.5 mb-2 text-emerald-700">
              <Ruler className="w-5 h-5" />
              <span className="text-sm font-black uppercase tracking-wide">Ladungsmaße (Meter)</span>
           </div>
           <div className="grid grid-cols-3 gap-2">
             <InputWithIcon icon={Ruler} label="Länge (m)" value={length} onChange={(e) => setLength(e.target.value)} placeholder="0.00" />
             <InputWithIcon icon={Ruler} label="Breite (m)" value={width} onChange={(e) => setWidth(e.target.value)} placeholder="0.00" />
             <InputWithIcon icon={Ruler} label="Höhe (m)" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="0.00" />
           </div>
           {volume > 0 && (
             <div className="mt-2 text-right text-xs text-slate-500 bg-slate-50 p-2 rounded-lg inline-block w-full">
               Raumvolumen: <span className="font-bold text-slate-700 text-sm">{volume.toFixed(2)} m³</span>
             </div>
           )}
        </div>

        {/* HOLZART CARD */}
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 break-inside-avoid">
          <label className="flex items-center gap-1.5 text-sm font-black text-emerald-700 uppercase tracking-wide mb-2">
            <Trees className="w-5 h-5" /> Art des Holzes
          </label>
          <div className="relative">
            <select
              value={woodType}
              onChange={(e) => setWoodType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none font-medium text-slate-700 shadow-sm"
            >
              {woodTypes.map((wood) => (
                <option key={wood.name} value={wood.name}>
                  {wood.name} (~{wood.density} kg/m³)
                </option>
              ))}
            </select>
            <ChevronRight className="absolute right-3 top-3 text-slate-400 w-4 h-4 pointer-events-none rotate-90" />
          </div>

          <div className="mt-3 bg-emerald-50/50 border border-emerald-100 rounded-xl p-2.5">
             <div className="flex items-center gap-1.5 mb-1.5">
                <Droplets className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-bold uppercase text-emerald-700">Feuchtigkeits-Info</span>
             </div>
             <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-600">
                <div className="bg-white/60 p-1.5 rounded flex justify-between"><span>Ganz frisch:</span> <span className="font-bold">&gt; 30%</span></div>
                <div className="bg-white/60 p-1.5 rounded flex justify-between"><span>Waldfrisch:</span> <span className="font-bold">25-30%</span></div>
                <div className="bg-white/60 p-1.5 rounded flex justify-between"><span>Lufttrocken:</span> <span className="font-bold">15%</span></div>
                <div className="bg-white/60 p-1.5 rounded flex justify-between"><span>Darrgewicht:</span> <span className="font-bold">0%</span></div>
             </div>
          </div>
        </div>

        {/* ERGEBNIS */}
        {calculatedLoadWeight > 0 && (
          <div className="space-y-3 animate-in slide-in-from-bottom-4 duration-500 fade-in break-inside-avoid">
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-4 text-center text-white shadow-xl shadow-emerald-200">
              <p className="text-sm font-bold text-emerald-100 uppercase tracking-wider mb-1">Berechnetes Ladungsgewicht</p>
              <div className="text-5xl font-black tracking-tighter drop-shadow-sm">
                {calculatedLoadWeight.toLocaleString('de-DE')} <span className="text-2xl font-bold opacity-70">kg</span>
              </div>
              <p className="text-xs text-emerald-100 mt-2 font-medium opacity-80">
                * Basis: 70% Holz / 30% Luft (Bayerische LWF)
              </p>
            </div>

            {(parseFloat(allowedWeight) > 0 && parseFloat(emptyWeight) > 0) && (
              <div className={`p-3 rounded-2xl border-2 shadow-sm flex flex-col gap-2 transition-colors duration-300 ${
                isOverloaded 
                  ? 'bg-red-50 border-red-100' 
                  : 'bg-white border-emerald-100'
              }`}>
                 <div className="flex items-center gap-2">
                    {isOverloaded ? (
                    <div className="p-1.5 bg-red-100 rounded-full text-red-600"><AlertTriangle className="w-6 h-6" /></div>
                    ) : (
                    <div className="p-1.5 bg-emerald-100 rounded-full text-emerald-600"><CheckCircle className="w-6 h-6" /></div>
                    )}
                    
                    <div className="flex-1">
                    <p className={`font-black text-xl leading-tight ${isOverloaded ? 'text-red-800' : 'text-emerald-800'}`}>
                        {isOverloaded ? 'Überladen!' : 'Im grünen Bereich'}
                    </p>
                    <p className="text-sm text-slate-500">
                        Gesamtgewicht: <span className="font-bold text-slate-800">{totalWeight.toLocaleString('de-DE')} kg</span>
                    </p>
                    </div>
                </div>

                <ProgressBar current={totalWeight} max={maxWeight} isOverloaded={isOverloaded} />
                
                <div className="flex justify-between text-xs font-bold mt-0.5">
                    <span className="text-slate-400">0 kg</span>
                    <span className={isOverloaded ? 'text-red-500' : 'text-slate-400'}>{maxWeight.toLocaleString()} kg (Max)</span>
                </div>

                  {isOverloaded ? (
                    <div className="bg-red-100/50 rounded-lg p-2 mt-0.5">
                      <p className="text-sm text-red-700 flex justify-between">
                        <span>Zu viel:</span> <span className="font-bold">{difference.toLocaleString('de-DE')} kg</span>
                      </p>
                      <p className="text-sm text-red-700 flex justify-between mt-0.5">
                        <span>Überladung:</span> <span className="font-bold">{percentage.toFixed(2)}%</span>
                      </p>
                    </div>
                  ) : (
                     <p className="text-sm text-emerald-700 bg-emerald-50 rounded-lg p-2 mt-0.5 flex justify-between font-bold">
                      <span>Restzuladung möglich:</span> <span>{remaining.toLocaleString('de-DE')} kg</span>
                    </p>
                  )}
              </div>
            )}
            
            <div className="mt-3 pt-3 border-t border-slate-200">
                <p className="text-xs font-bold text-slate-400 uppercase mb-1.5 ml-1">Details zur Berechnung</p>
                <div className="text-xs font-mono text-slate-500 space-y-0.5 bg-white border border-slate-100 p-3 rounded-xl shadow-sm">
                    <div className="flex justify-between"><span>Raummaß:</span> <span>{volume.toFixed(2)} m³</span></div>
                    <div className="flex justify-between"><span>Festmeter (x{solidFactor}):</span> <span>{solidVolume.toFixed(2)} m³</span></div>
                    <div className="flex justify-between"><span>Dichte ({selectedWood?.name}):</span> <span>{currentDensity} kg/m³</span></div>
                    <div className="flex justify-between pt-1 mt-1 border-t border-slate-100 font-bold text-slate-700">
                        <span>Kalk. Gesamtgewicht:</span>
                        <span>{totalWeight.toLocaleString()} kg</span>
                    </div>
                </div>
            </div>
          </div>
        )}
        <ExportButton />
      </div>
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
        if (allowed <= 3500) difference = Math.floor(difference);
        else difference = Math.ceil(difference);

        let percentage = (difference > 0 && allowed > 0) ? (difference / allowed) * 100 : 0;

        return {
            actual, allowed, tolerance, netWeight, difference, percentage,
            isOverloaded: allowed > 0 && difference > 0,
            isValidInput: !isNaN(allowed) && !isNaN(actual)
        };
    };

    setResult({
        vehicle1: calculateForVehicle(allowedWeight1, actualWeight1),
        vehicle2: calculateForVehicle(allowedWeight2, actualWeight2)
    });

  }, [allowedWeight1, actualWeight1, allowedWeight2, actualWeight2]);

  const resetForm = () => {
    setAllowedWeight1(''); setActualWeight1(''); setAllowedWeight2(''); setActualWeight2('');
    setResult(null);
  };

  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen">
      <div className="bg-blue-600/95 backdrop-blur-md p-4 text-white flex items-center justify-between sticky top-0 z-20 shadow-lg shadow-blue-900/10">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2 leading-tight tracking-tight">
            <Scale className="w-6 h-6 shrink-0" />
            Überladungsrechner
          </h1>
           <p className="text-blue-100 text-xs opacity-90 mt-0.5 font-mono flex items-center gap-1.5 ml-8">
             <Clock className="w-3 h-3" />
             {dateTime}
          </p>
        </div>
        <HeaderLogo />
      </div>

      <div className="p-2 space-y-2">
        
        {/* FAHRZEUG 1 CARD */}
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 break-inside-avoid">
           <div className="flex items-center gap-2 mb-2 text-blue-700">
              <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center font-bold text-xs">1</div>
              <span className="text-sm font-black uppercase tracking-wide">Zugfahrzeug</span>
           </div>
           <div className="space-y-2">
              <InputWithIcon icon={ShieldCheck} label="zGM (kg)" value={allowedWeight1} onChange={(e) => setAllowedWeight1(e.target.value)} placeholder="0" />
              <InputWithIcon icon={Scale} label="Gewogenes Gewicht (kg)" value={actualWeight1} onChange={(e) => setActualWeight1(e.target.value)} placeholder="0" />
           </div>
        </div>

        {/* FAHRZEUG 2 CARD */}
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 break-inside-avoid">
           <div className="flex items-center gap-2 mb-2 text-blue-700">
              <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center font-bold text-xs">2</div>
              <span className="text-sm font-black uppercase tracking-wide">Anhänger / Auflieger</span>
           </div>
           <div className="space-y-2">
              <InputWithIcon icon={ShieldCheck} label="zGM (kg)" value={allowedWeight2} onChange={(e) => setAllowedWeight2(e.target.value)} placeholder="0" />
              <InputWithIcon icon={Scale} label="Gewogenes Gewicht (kg)" value={actualWeight2} onChange={(e) => setActualWeight2(e.target.value)} placeholder="0" />
           </div>
        </div>

        {!result && (
          <div className="bg-blue-50/50 p-3 rounded-xl flex gap-2 text-blue-700 text-xs border border-blue-100">
            <Info className="w-5 h-5 shrink-0" />
            <p>Bitte geben Sie die Gewichte für mindestens ein Fahrzeug ein. Messtoleranzen werden automatisch berücksichtigt.</p>
          </div>
        )}
      </div>

      {result && (
        <div className="bg-slate-100 border-t border-slate-200 p-4 animate-in slide-in-from-bottom-4 duration-500 pb-20">
          <h3 className="text-lg font-black text-slate-700 mb-3">Ergebnis</h3>

          <div className="space-y-3">
             {/* Resultat Zugfahrzeug */}
             {result.vehicle1 && result.vehicle1.isValidInput && (
                 <div className={`p-3 rounded-2xl border-2 shadow-sm transition-all break-inside-avoid ${
                    result.vehicle1.isOverloaded ? 'bg-white border-red-200' : 'bg-white border-slate-200'
                 }`}>
                    <div className="flex justify-between items-center mb-1.5">
                        <span className="font-bold text-slate-700 flex items-center gap-1.5 text-sm"><Truck className="w-4 h-4 text-slate-400"/> Zugfahrzeug</span>
                        <span className={`px-2 py-0.5 rounded-[6px] text-xs font-black uppercase ${result.vehicle1.isOverloaded ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                            {result.vehicle1.isOverloaded ? 'Überladen' : 'OK'}
                        </span>
                    </div>
                    
                    <div className="flex justify-between items-end mb-1">
                        <span className="text-xs text-slate-500">Vorwerfbar:</span>
                        <span className="text-xl font-black text-slate-800">{result.vehicle1.netWeight.toLocaleString()} kg</span>
                    </div>

                    <ProgressBar current={result.vehicle1.netWeight} max={result.vehicle1.allowed} isOverloaded={result.vehicle1.isOverloaded} />

                     {result.vehicle1.isOverloaded && (
                         <div className="mt-2 pt-1.5 border-t border-red-100 text-sm font-bold text-red-600 flex justify-between">
                             <span>Überschuss:</span>
                             <span>+ {result.vehicle1.difference.toLocaleString()} kg ({result.vehicle1.percentage.toFixed(2)}%)</span>
                         </div>
                     )}
                 </div>
             )}

             {/* Resultat Anhänger */}
             {result.vehicle2 && result.vehicle2.isValidInput && (
                 <div className={`p-3 rounded-2xl border-2 shadow-sm transition-all break-inside-avoid ${
                    result.vehicle2.isOverloaded ? 'bg-white border-red-200' : 'bg-white border-slate-200'
                 }`}>
                    <div className="flex justify-between items-center mb-1.5">
                        <span className="font-bold text-slate-700 flex items-center gap-1.5 text-sm"><Box className="w-4 h-4 text-slate-400"/> Anhänger</span>
                        <span className={`px-2 py-0.5 rounded-[6px] text-xs font-black uppercase ${result.vehicle2.isOverloaded ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                            {result.vehicle2.isOverloaded ? 'Überladen' : 'OK'}
                        </span>
                    </div>

                    <div className="flex justify-between items-end mb-1">
                        <span className="text-xs text-slate-500">Vorwerfbar:</span>
                        <span className="text-xl font-black text-slate-800">{result.vehicle2.netWeight.toLocaleString()} kg</span>
                    </div>

                    <ProgressBar current={result.vehicle2.netWeight} max={result.vehicle2.allowed} isOverloaded={result.vehicle2.isOverloaded} />

                     {result.vehicle2.isOverloaded && (
                         <div className="mt-2 pt-1.5 border-t border-red-100 text-sm font-bold text-red-600 flex justify-between">
                             <span>Überschuss:</span>
                             <span>+ {result.vehicle2.difference.toLocaleString()} kg ({result.vehicle2.percentage.toFixed(2)}%)</span>
                         </div>
                     )}
                 </div>
             )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200">
             <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-xs text-slate-500 shadow-sm break-inside-avoid">
                <p className="font-bold uppercase text-slate-400 mb-1">Toleranz-Abzug (GZA Weil am Rhein)</p>
                <div className="flex justify-between"><span>≤ 10t:</span> <span>-20 kg</span></div>
                <div className="flex justify-between"><span>≤ 40t:</span> <span>-40 kg</span></div>
                <div className="flex justify-between"><span>&gt; 40t:</span> <span>-60 kg</span></div>
             </div>
          </div>

          <button onClick={resetForm} className="print-hide-button mt-6 w-full py-2.5 text-slate-400 text-sm hover:text-slate-600 font-bold tracking-wide uppercase transition-colors">
            Alle Eingaben löschen
          </button>
        </div>
      )}
      <ExportButton />
    </div>
  );
}

// --- LASHING CALCULATOR ---
function LashingCalculator() {
  const [allowedWeight, setAllowedWeight] = useState('');
  const [emptyWeight, setEmptyWeight] = useState('');
  const [loadWeight, setLoadWeight] = useState('');
  const [friction, setFriction] = useState('0.3');
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
  const [weightWarning, setWeightWarning] = useState(null);
  const dateTime = useDateTime();

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
    setWeightWarning(null);
    const m = parseFloat(loadWeight);
    const mu = parseFloat(friction);
    const s_tf = parseFloat(stf);
    const alpha = parseFloat(angle);
    const maxWeight = parseFloat(allowedWeight);
    const empty = parseFloat(emptyWeight) || 0;

    if (isNaN(m) || m <= 0) {
      setLashingResult(null); return;
    }
    
    if (maxWeight > 0 && (m + empty) > maxWeight) {
      setWeightWarning({ total: Math.floor(m + empty), diff: Math.floor((m + empty) - maxWeight) });
    }

    const g = 9.81; 
    const radAlpha = (alpha * Math.PI) / 180;
    const stfInNewton = s_tf * 10; 

    let accFwd, accSide, accRear;
    if (!maxWeight || maxWeight <= 1999) {
      accFwd = isTipping ? 1.08 : 0.90; accSide = isTipping ? 0.84 : 0.70; accRear = isTipping ? 0.60 : 0.50;
    } else if (maxWeight <= 3500) {
      accFwd = isTipping ? 0.98 : 0.80; accSide = isTipping ? 0.72 : 0.60; accRear = isTipping ? 0.60 : 0.50;
    } else {
      accFwd = isTipping ? 0.96 : 0.80; accSide = isTipping ? 0.60 : 0.50; accRear = isTipping ? 0.60 : 0.50;
    }

    const calculateN = (acc, blockingDaN, direction) => {
       const weightForce = m * g;
       const blockingForce = (parseFloat(blockingDaN) || 0) * 10; 
       let safetyFactor = 1.0;
       if (!maxWeight || maxWeight <= 3500) safetyFactor = 1.8;
       else safetyFactor = (direction === 'forward') ? 1.25 : 1.1; 

       const numerator = (weightForce * acc) - blockingForce - (weightForce * mu);
       if (numerator <= 0) return 0;
       const denominator = stfInNewton * 2 * mu * Math.sin(radAlpha);
       if (denominator <= 0) return 0; 
       const n = (numerator / denominator) * safetyFactor;
       return (!maxWeight || maxWeight <= 3500) ? Math.floor(n) : Math.ceil(n);
    };

    const nForward = calculateN(accFwd, fitFront ? wallFront : 0, 'forward');
    const nSide = calculateN(accSide, fitSide ? wallSide : 0, 'side');
    const nRear = calculateN(accRear, fitRear ? wallRear : 0, 'rear');

    setLashingResult({
      forward: nForward, side: nSide, rear: nRear,
      factorForward: accFwd, factorSide: accSide, factorRear: accRear,
      weightClassInfo: !maxWeight ? '< 2000 kg (Standard)' : maxWeight <= 1999 ? '< 2000 kg' : maxWeight <= 3500 ? '2000 - 3500 kg' : '> 3500 kg',
    });
  }, [loadWeight, friction, stf, angle, allowedWeight, emptyWeight, isTipping, fitFront, fitSide, fitRear, wallFront, wallSide, wallRear, bodyCert]);

  const handleBlur = (type, value, setter) => {
    if (!bodyCert || bodyCert === 'NONE') return;
    const standards = getStandardForces();
    let minVal = 0;
    if (type === 'front') minVal = standards.front;
    if (type === 'side') minVal = standards.side;
    if (type === 'rear') minVal = standards.rear;
    if ((parseFloat(value) || 0) < minVal) setter(minVal.toString());
  };

  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen">
      <div className="bg-indigo-600/95 backdrop-blur-md p-4 text-white flex items-center justify-between sticky top-0 z-20 shadow-lg shadow-indigo-900/10">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2 leading-tight tracking-tight">
            <LashingStrapIcon className="w-5 h-5 shrink-0" />
            Niederzurren
          </h1>
          <p className="text-indigo-100 text-xs opacity-90 mt-0.5 font-mono flex items-center gap-1.5 ml-7">
             <Clock className="w-3 h-3" />
             {dateTime}
          </p>
        </div>
        <HeaderLogo />
      </div>

      <div className="p-2 space-y-2">
        
        {/* AUFBAU CARD */}
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 break-inside-avoid">
            <div className="mb-2 text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Fahrzeugaufbau wählen
            </div>
            <div className="grid grid-cols-2 gap-2">
                 <button onClick={() => setBodyCert('NONE')} className={`col-span-2 py-2.5 rounded-xl font-bold text-xs sm:text-sm border-2 flex items-center justify-center gap-1.5 transition-all ${bodyCert === 'NONE' ? 'bg-slate-700 text-white border-slate-700 shadow-md transform scale-[1.02]' : 'bg-white text-slate-500 border-slate-100 hover:border-indigo-200'}`}>
                    {bodyCert === 'NONE' && <ShieldAlert className="w-4 h-4" />} Kein geprüfter Aufbau
                </button>
                <button onClick={() => setBodyCert('L')} className={`py-2.5 rounded-xl font-bold text-xs sm:text-sm border-2 flex items-center justify-center gap-1.5 transition-all ${bodyCert === 'L' ? 'bg-indigo-600 text-white border-indigo-600 shadow-md transform scale-[1.02]' : 'bg-white text-slate-500 border-slate-100 hover:border-indigo-200'}`}>
                    {bodyCert === 'L' && <ShieldCheck className="w-4 h-4" />} Code L
                </button>
                 <button onClick={() => setBodyCert('XL')} className={`py-2.5 rounded-xl font-bold text-xs sm:text-sm border-2 flex items-center justify-center gap-1.5 transition-all ${bodyCert === 'XL' ? 'bg-indigo-600 text-white border-indigo-600 shadow-md transform scale-[1.02]' : 'bg-white text-slate-500 border-slate-100 hover:border-indigo-200'}`}>
                    {bodyCert === 'XL' && <ShieldCheck className="w-4 h-4" />} Code XL
                </button>
            </div>
        </div>

        {/* GEWICHTE CARD */}
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 break-inside-avoid">
           <div className="flex items-center gap-1.5 mb-2 text-indigo-700">
              <Scale className="w-5 h-5" />
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
          <div className="flex items-center gap-1.5 mb-2 text-indigo-700">
              <Settings className="w-5 h-5" />
              <span className="text-sm font-black uppercase tracking-wide">Parameter</span>
           </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="relative">
                <label className="block text-xs font-bold text-slate-400 uppercase mb-0.5 ml-1">Reibbeiwert (μ)</label>
                <select value={friction} onChange={(e) => setFriction(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none font-medium">
                {[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9].map((val) => (<option key={val} value={val}>{val} μ</option>))}
                </select>
            </div>
            <div className="relative">
                <label className="block text-xs font-bold text-slate-400 uppercase mb-0.5 ml-1">Winkel α (°)</label>
                <select value={angle} onChange={(e) => setAngle(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none font-medium">
                    {Array.from({ length: 19 }, (_, i) => i * 5).map((val) => (<option key={val} value={val}>{val}°</option>))}
                </select>
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
           
           {/* Formschluss Inputs - Wieder im übersichtlichen 3-Spalten-Layout */}
           <div className="grid grid-cols-3 gap-2">
             
             {/* Stirnwand */}
             <div className="flex flex-col">
               <div className="flex items-center gap-1 mb-1">
                 <input
                    type="checkbox"
                    checked={fitFront}
                    onChange={(e) => setFitFront(e.target.checked)}
                    id="cb_front"
                    className="w-3.5 h-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                 />
                 <label htmlFor="cb_front" className="text-xs font-bold text-slate-600 uppercase cursor-pointer select-none">
                   Formschl.
                 </label>
               </div>
               <label className="block text-xs font-bold text-slate-400 uppercase mb-0.5">Stirnwand</label>
               <input
                  type="number"
                  inputMode="numeric"
                  disabled={!fitFront}
                  value={wallFront}
                  onChange={(e) => setWallFront(e.target.value)}
                  onBlur={(e) => handleBlur('front', e.target.value, setWallFront)}
                  placeholder="0"
                  className={`w-full border rounded px-1.5 py-2 text-sm text-center focus:outline-none focus:ring-2 transition-all ${
                    fitFront 
                      ? 'bg-white border-indigo-300 focus:ring-indigo-500 text-slate-800' 
                      : 'bg-slate-100 border-slate-200 text-slate-400'
                  }`}
               />
             </div>

             {/* Seite */}
             <div className="flex flex-col">
               <div className="flex items-center gap-1 mb-1">
                 <input
                    type="checkbox"
                    checked={fitSide}
                    onChange={(e) => setFitSide(e.target.checked)}
                    id="cb_side"
                    className="w-3.5 h-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                 />
                 <label htmlFor="cb_side" className="text-xs font-bold text-slate-600 uppercase cursor-pointer select-none">
                   Formschl.
                 </label>
               </div>
               <label className="block text-xs font-bold text-slate-400 uppercase mb-0.5">Seite</label>
               <input
                  type="number"
                  inputMode="numeric"
                  disabled={!fitSide}
                  value={wallSide}
                  onChange={(e) => setWallSide(e.target.value)}
                  onBlur={(e) => handleBlur('side', e.target.value, setWallSide)}
                  placeholder="0"
                  className={`w-full border rounded px-1.5 py-2 text-sm text-center focus:outline-none focus:ring-2 transition-all ${
                    fitSide 
                      ? 'bg-white border-indigo-300 focus:ring-indigo-500 text-slate-800' 
                      : 'bg-slate-100 border-slate-200 text-slate-400'
                  }`}
               />
             </div>

             {/* Heck */}
             <div className="flex flex-col">
               <div className="flex items-center gap-1 mb-1">
                 <input
                    type="checkbox"
                    checked={fitRear}
                    onChange={(e) => setFitRear(e.target.checked)}
                    id="cb_rear"
                    className="w-3.5 h-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                 />
                 <label htmlFor="cb_rear" className="text-xs font-bold text-slate-600 uppercase cursor-pointer select-none">
                   Formschl.
                 </label>
               </div>
               <label className="block text-xs font-bold text-slate-400 uppercase mb-0.5">Heck</label>
               <input
                  type="number"
                  inputMode="numeric"
                  disabled={!fitRear}
                  value={wallRear}
                  onChange={(e) => setWallRear(e.target.value)}
                  onBlur={(e) => handleBlur('rear', e.target.value, setWallRear)}
                  placeholder="0"
                  className={`w-full border rounded px-1.5 py-2 text-sm text-center focus:outline-none focus:ring-2 transition-all ${
                    fitRear 
                      ? 'bg-white border-indigo-300 focus:ring-indigo-500 text-slate-800' 
                      : 'bg-slate-100 border-slate-200 text-slate-400'
                  }`}
               />
             </div>
           </div>
           
           <div className="mt-2 flex gap-2 items-start text-xs text-slate-500 bg-slate-50 p-2 rounded-xl">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-indigo-400" />
              <p>Formschluss gilt bis 5 cm Abstand (hinten max. 30 cm).</p>
           </div>
        </div>

        {/* KIPPGEFAHR */}
        <label className={`block border-2 rounded-xl p-3 flex items-center gap-3 transition-all cursor-pointer break-inside-avoid ${isTipping ? 'bg-amber-50 border-amber-300 shadow-sm' : 'bg-white border-slate-100'}`}>
          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${isTipping ? 'bg-amber-500 border-amber-500 text-white' : 'border-slate-300'}`}>
            {isTipping && <CheckSquare className="w-4 h-4" />}
          </div>
          <input type="checkbox" checked={isTipping} onChange={(e) => setIsTipping(e.target.checked)} className="hidden" />
          <span className={`font-bold text-sm ${isTipping ? 'text-amber-800' : 'text-slate-500'}`}>Ladung ist kippgefährdet</span>
        </label>

        {/* RESULTAT */}
        {lashingResult !== null && (
          <div className="space-y-3 pb-20 break-inside-avoid">
            <div className={`border-2 rounded-2xl p-4 mt-4 shadow-xl ${isTipping ? 'bg-white border-amber-200 shadow-amber-100' : 'bg-white border-indigo-100 shadow-indigo-100'}`}>
              
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-400">Erforderliche Gurte</h3>
                <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-500">
                  {lashingResult.weightClassInfo}
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                {[
                    { label: 'Vorne', count: lashingResult.forward, factor: lashingResult.factorForward },
                    { label: 'Seite', count: lashingResult.side, factor: lashingResult.factorSide },
                    { label: 'Hinten', count: lashingResult.rear, factor: lashingResult.factorRear }
                ].map((res, idx) => (
                    <div key={idx} className="flex flex-col items-center p-2 rounded-xl bg-slate-50">
                        <span className={`text-4xl font-black ${isTipping ? 'text-amber-600' : 'text-indigo-600'}`}>{res.count}</span>
                        <span className="text-xs font-bold uppercase text-slate-400 mt-0.5">{res.label}</span>
                        <span className="text-[10px] text-slate-300">({res.factor}g)</span>
                    </div>
                ))}
              </div>

               <div className={`mt-4 p-3 rounded-xl flex items-center justify-between ${isTipping ? 'bg-amber-50 text-amber-900' : 'bg-indigo-50 text-indigo-900'}`}>
                 <span className="text-xs font-bold uppercase tracking-wide opacity-70">Minimum:</span>
                 <div className="text-3xl font-black">
                    {Math.max(lashingResult.forward, lashingResult.side, lashingResult.rear)} <span className="text-base font-bold opacity-60">Gurte</span>
                 </div>
               </div>
            </div>

            {weightWarning && (
              <div className="bg-red-50 border border-red-100 p-3 rounded-xl flex items-start gap-2 shadow-sm">
                 <div className="p-1.5 bg-red-100 rounded-full text-red-600"><AlertTriangle className="w-5 h-5" /></div>
                 <div>
                   <h4 className="font-bold text-red-800 text-sm">Überladungswarnung</h4>
                   <p className="text-xs text-red-700 mt-0.5">
                     Gesamt: <strong>{weightWarning.total.toLocaleString('de-DE')} kg</strong> (+{weightWarning.diff.toLocaleString('de-DE')} kg)
                   </p>
                 </div>
              </div>
            )}
          </div>
        )}
      </div>
      <ExportButton />
    </div>
  );
}
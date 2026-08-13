import React, { useState } from 'react';
import { useAppData } from '../context/AppDataContext';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { Camera, Upload, CheckCircle2, AlertTriangle, FileText, ArrowRight } from 'lucide-react';

export const DamageDetectionPage: React.FC = () => {
  const { addToast, setActiveTab } = useAppData();
  const [damageCategory, setDamageCategory] = useState('Water Damage');
  const [severity, setSeverity] = useState('High');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>({
    detectedDamage: 'Water Damage',
    severity: 'High',
    confidencePercent: 87,
    affectedQuantity: 120,
    possibleCause: 'Container water ingress during sea voyage or heavy tropical rain at port terminal.',
    demoNotice: 'Demo AI Computer Vision Analysis — Simulates multimodal damage recognition.'
  });

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target?.result as string);
        runAnalysis();
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const runAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      addToast('Damage Detection Analysis Complete', 'AI Computer Vision confidence score: 87%', 'success');
    }, 700);
  };

  return (
    <div className="space-y-6">
      <DisclaimerBanner
        title="AI DAMAGE RECOGNITION COMPUTER VISION"
        message="Simulates image-based deep learning vision analysis to identify water ingress, packaging tears, mechanical dents, and rust corrosion."
        type="demo"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Photo Upload Zone & Selector (5 Cols) */}
        <div className="lg:col-span-5 bg-navy-850 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-800">
            <Camera className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Photo Inspection Dropzone</h3>
          </div>

          {/* Upload Dropzone Box */}
          <div className="border-2 border-dashed border-slate-700 hover:border-cyan-500/50 rounded-2xl p-6 text-center transition-colors relative cursor-pointer bg-navy-800/50">
            <input
              type="file"
              accept="image/*"
              onChange={handleSimulateUpload}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            {previewImage ? (
              <div className="space-y-2">
                <img src={previewImage} alt="Uploaded Cargo" className="max-h-44 mx-auto rounded-lg object-cover" />
                <span className="text-xs text-cyan-400 font-semibold block">Click or Drag to Swap Photo</span>
              </div>
            ) : (
              <div className="space-y-2 py-4">
                <Upload className="w-8 h-8 text-cyan-400 mx-auto" />
                <span className="text-xs font-bold text-white block">Upload Cargo / Container Photo</span>
                <span className="text-[11px] text-slate-400 block">Supports JPG, PNG, WEBP cargo imagery</span>
              </div>
            )}
          </div>

          {/* Manual Selectors for Demo Customization */}
          <div className="space-y-3 text-xs pt-2">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Select Damage Category</label>
              <select
                value={damageCategory}
                onChange={(e) => setDamageCategory(e.target.value)}
                className="w-full bg-navy-800 border border-slate-750 rounded-lg px-3 py-2 text-white focus:border-cyan-500 outline-none"
              >
                <option value="Water Damage">Water Damage</option>
                <option value="Crack">Crack</option>
                <option value="Dent">Dent</option>
                <option value="Rust">Rust</option>
                <option value="Broken Packaging">Broken Packaging</option>
                <option value="Leakage">Leakage</option>
                <option value="Impact Damage">Impact Damage</option>
                <option value="Missing Items">Missing Items</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Severity Rating</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="w-full bg-navy-800 border border-slate-750 rounded-lg px-3 py-2 text-white focus:border-cyan-500 outline-none"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <button
              onClick={runAnalysis}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all flex items-center justify-center space-x-2"
            >
              <span>{analyzing ? 'Analyzing Image...' : 'Run Vision Diagnosis'}</span>
            </button>
          </div>
        </div>

        {/* AI Vision Diagnosis Display (7 Cols) */}
        <div className="lg:col-span-7 bg-navy-850 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded border border-cyan-500/40">
                AI COMPUTER VISION DIAGNOSIS
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-1">{damageCategory} Detected</h2>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block font-medium">Vision Confidence</span>
              <span className="text-2xl font-extrabold font-mono text-cyan-400">{analysis.confidencePercent}%</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-navy-800 rounded-xl border border-slate-750">
              <span className="text-slate-400 font-medium block mb-1">Detected Damage Type:</span>
              <span className="font-bold text-rose-400 text-base">{damageCategory}</span>
            </div>

            <div className="p-4 bg-navy-800 rounded-xl border border-slate-750">
              <span className="text-slate-400 font-medium block mb-1">Severity Severity:</span>
              <span className="font-bold text-amber-400 text-base">{severity} Severity</span>
            </div>
          </div>

          {/* Root Cause Diagnosis */}
          <div className="p-4 bg-navy-800 rounded-xl border border-slate-750 text-xs space-y-1">
            <span className="text-slate-400 font-medium block">Diagnosed Possible Root Cause:</span>
            <p className="text-slate-200 leading-relaxed font-semibold">{analysis.possibleCause}</p>
          </div>

          {/* Action CTA: Generate Claim */}
          <div className="p-4 bg-cyan-950/60 border border-cyan-500/30 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-white block">Next Operational Step: Claim Generation</span>
              <span className="text-[11px] text-cyan-300">Convert damage report directly into formal carrier claim draft</span>
            </div>
            <button
              onClick={() => setActiveTab('claim-generator')}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-md flex items-center space-x-1.5 shrink-0"
            >
              <span>Generate Claim</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

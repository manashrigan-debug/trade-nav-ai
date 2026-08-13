import React, { useState } from 'react';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { FileCheck2, Search, CheckCircle2, AlertCircle, FileText, ArrowRight } from 'lucide-react';

export const HSCustomsPage: React.FC = () => {
  const [query, setQuery] = useState('Cotton T-Shirts');
  const [result, setResult] = useState<any>({
    query: 'Cotton T-Shirts',
    suggestedHSCode: '6109.10',
    classification: 'Knitted or crocheted apparel & clothing accessories of cotton',
    dutyRate: '15.0% Basic Customs Duty (BCD)',
    taxRate: '12.0% IGST',
    restrictions: 'Requires Textile Committee Quality Clearance Certificate',
    confidencePercent: 91,
    requiredDocuments: ['Commercial Invoice', 'Packing List', 'Bill of Lading', 'Certificate of Origin', 'Textile Test Report'],
    disclaimerLabel: 'Demo Data — Tariff values represent simulated customs database entries.'
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.toLowerCase();

    if (q.includes('electronics') || q.includes('chip') || q.includes('micro')) {
      setResult({
        query,
        suggestedHSCode: '8542.31',
        classification: 'Electronic Integrated Circuits & Microcontrollers',
        dutyRate: '7.5% Basic Customs Duty',
        taxRate: '18.0% IGST',
        restrictions: 'BIS Registration Required for Consumer Modules',
        confidencePercent: 94,
        requiredDocuments: ['Commercial Invoice', 'Packing List', 'Air Waybill / BL', 'Certificate of Origin', 'BIS Registration Copy'],
        disclaimerLabel: 'Demo Data — Tariff values represent simulated customs database entries.'
      });
    } else if (q.includes('battery') || q.includes('power')) {
      setResult({
        query,
        suggestedHSCode: '8507.60',
        classification: 'Lithium-Ion Electric Accumulators',
        dutyRate: '10.0% Basic Customs Duty',
        taxRate: '18.0% IGST',
        restrictions: 'Hazardous Cargo Safety Compliance & Battery Waste Declaration',
        confidencePercent: 89,
        requiredDocuments: ['MSDS Safety Sheet', 'UN 38.3 Transport Test Certificate', 'Commercial Invoice', 'Bill of Lading'],
        disclaimerLabel: 'Demo Data — Tariff values represent simulated customs database entries.'
      });
    } else {
      setResult({
        query,
        suggestedHSCode: '6109.10',
        classification: 'Knitted apparel & cotton garments',
        dutyRate: '15.0% Basic Customs Duty (BCD)',
        taxRate: '12.0% IGST',
        restrictions: 'Standard Textile Quality Inspection',
        confidencePercent: 91,
        requiredDocuments: ['Commercial Invoice', 'Packing List', 'Bill of Lading', 'Certificate of Origin'],
        disclaimerLabel: 'Demo Data — Tariff values represent simulated customs database entries.'
      });
    }
  };

  return (
    <div className="space-y-6">
      <DisclaimerBanner
        title="CUSTOMS CLASSIFICATION ENGINE"
        message="Search products to extract 6-digit HS tariff classifications, customs duty rates, regulatory restrictions, and mandatory documentation checklists."
      />

      {/* Search Input Bar */}
      <div className="bg-navy-850 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Cotton T-Shirts, Microcontrollers, Batteries..."
              className="w-full bg-navy-800 border border-slate-750 rounded-xl pl-11 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-500 outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all flex items-center space-x-2"
          >
            <span>Classify Product</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Results Display */}
      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Card (8 Cols) */}
          <div className="lg:col-span-8 bg-navy-850 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded border border-cyan-500/40">
                  SUGGESTED HS CODE
                </span>
                <h2 className="text-3xl font-extrabold font-mono text-white mt-1">{result.suggestedHSCode}</h2>
                <p className="text-xs text-slate-300 font-medium mt-1">{result.classification}</p>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 block font-medium">HS Confidence Score</span>
                <span className="text-2xl font-extrabold font-mono text-emerald-400">{result.confidencePercent}%</span>
              </div>
            </div>

            {/* Duty & Tax Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-navy-800 rounded-xl border border-slate-750">
                <span className="text-xs text-slate-400 block font-medium mb-1">Basic Customs Duty (BCD)</span>
                <span className="text-base font-bold font-mono text-white">{result.dutyRate}</span>
              </div>

              <div className="p-4 bg-navy-800 rounded-xl border border-slate-750">
                <span className="text-xs text-slate-400 block font-medium mb-1">Integrated Tax (IGST)</span>
                <span className="text-base font-bold font-mono text-cyan-400">{result.taxRate}</span>
              </div>

              <div className="p-4 bg-navy-800 rounded-xl border border-slate-750">
                <span className="text-xs text-slate-400 block font-medium mb-1">Customs Status</span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  Standard Clearance
                </span>
              </div>
            </div>

            {/* Restrictions & Notes */}
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-200">
              <div className="flex items-center space-x-2 font-bold mb-1">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <span>Regulatory Restrictions & Licensing Notes</span>
              </div>
              <p className="text-slate-300">{result.restrictions}</p>
            </div>

            {/* Disclaimer Label Notice */}
            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-mono italic">
              * {result.disclaimerLabel}
            </div>
          </div>

          {/* Required Documents Checklist (4 Cols) */}
          <div className="lg:col-span-4 bg-navy-850 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center space-x-2 pb-3 border-b border-slate-800">
              <FileText className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Mandatory Document Checklist</h3>
            </div>

            <p className="text-xs text-slate-400">Required documentation for smooth customs clearance at port terminal:</p>

            <div className="space-y-2.5 text-xs">
              {result.requiredDocuments.map((doc: string, idx: number) => (
                <div key={idx} className="p-3 bg-navy-800 rounded-xl border border-slate-750 flex items-center space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-semibold text-slate-200">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

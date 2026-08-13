import React, { useState } from 'react';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { FileSearch, AlertOctagon, CheckCircle2, FileText, ArrowRight } from 'lucide-react';

export const DocumentDetectorPage: React.FC = () => {
  const [invQty, setInvQty] = useState(500);
  const [pkgQty, setPkgQty] = useState(500);
  const [blQty, setBlQty] = useState(450); // Intentional mismatch demo

  const hasMismatch = invQty !== blQty || pkgQty !== blQty;

  return (
    <div className="space-y-6">
      <DisclaimerBanner
        title="DOCUMENT ERROR & QUANTITY MISMATCH DETECTOR"
        message="Cross-examines Commercial Invoices, Packing Lists, Purchase Orders, and Bills of Lading prior to customs declaration."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Document Inputs (5 Cols) */}
        <div className="lg:col-span-5 bg-navy-850 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 text-xs">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-800">
            <FileSearch className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Document Parity Inputs</h3>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Commercial Invoice Quantity</label>
            <input
              type="number"
              value={invQty}
              onChange={(e) => setInvQty(Number(e.target.value))}
              className="w-full bg-navy-800 border border-slate-750 rounded-lg px-3 py-2 text-white font-mono focus:border-cyan-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Packing List Quantity</label>
            <input
              type="number"
              value={pkgQty}
              onChange={(e) => setPkgQty(Number(e.target.value))}
              className="w-full bg-navy-800 border border-slate-750 rounded-lg px-3 py-2 text-white font-mono focus:border-cyan-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Bill of Lading Manifest Quantity</label>
            <input
              type="number"
              value={blQty}
              onChange={(e) => setBlQty(Number(e.target.value))}
              className="w-full bg-navy-800 border border-slate-750 rounded-lg px-3 py-2 text-white font-mono focus:border-cyan-500 outline-none"
            />
          </div>
        </div>

        {/* Verification Display (7 Cols) */}
        <div className="lg:col-span-7 bg-navy-850 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border ${
                hasMismatch ? 'bg-rose-950 text-rose-400 border-rose-500/40' : 'bg-emerald-950 text-emerald-400 border-emerald-500/40'
              }`}>
                {hasMismatch ? 'CRITICAL MISMATCH DETECTED' : 'PARITY VERIFIED ✓'}
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-1">Cross-Document Verification</h2>
            </div>
          </div>

          {hasMismatch ? (
            <div className="p-4 bg-rose-500/15 border border-rose-500/40 rounded-xl space-y-2 text-xs text-rose-200">
              <div className="flex items-center space-x-2 font-bold text-sm text-rose-300">
                <AlertOctagon className="w-5 h-5 text-rose-400" />
                <span>Quantity Discrepancy Identified</span>
              </div>
              <p className="leading-relaxed text-slate-200">
                Commercial Invoice ({invQty} units) and Packing List ({pkgQty} units) specify 500 units, but Bill of Lading registers {blQty} units. Quantity mismatch detected before customs processing.
              </p>
              <p className="font-semibold text-rose-300 mt-2">
                Action Required: Request carrier BL manifest amendment prior to submitting Bill of Entry.
              </p>
            </div>
          ) : (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center space-x-3 text-xs text-emerald-300">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <span className="font-bold text-white block text-sm">Perfect Parity Across All Documents</span>
                <span>Unit counts across Invoice, Packing List, and Bill of Lading match perfectly ({invQty} units).</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useAppData } from '../context/AppDataContext';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { FileText, Copy, Download, Save, Edit3, Check, AlertTriangle, ShieldCheck } from 'lucide-react';

export const ComplaintGeneratorPage: React.FC = () => {
  const { addToast, addDamageCase } = useAppData();
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [claimParams, setClaimParams] = useState({
    shipmentId: 'TRD10298',
    containerNumber: 'COSCO-88123',
    cargoDescription: 'ABS Plastic Enclosures',
    origin: 'Guangzhou Nansha Port',
    destination: 'Mundra Port',
    transportMode: 'Sea',
    damageCategory: 'Water Damage',
    damageDate: '11 Aug 2026',
    estimatedLossINR: 420000,
    responsibleParty: 'Shipping Carrier'
  });

  const [claimText, setClaimText] = useState(`SUBJECT: FORMAL CARGO DAMAGE CLAIM & NOTICE OF LIABILITY — SHIPMENT TRD10298

ATTENTION: Claims & Legal Compliance Department
RECIPIENT ORGANISATION: Shipping Carrier (COSCO Shipping Lines)
DATE OF NOTICE: 13 August 2026

Dear Claims Manager,

This formal communication serves as an official claim for cargo loss and physical damage sustained during carriage under Shipment Reference TRD10298.

1. SHIPMENT & ROUTE SUMMARY:
- Shipment ID / BL Reference: TRD10298
- Container Number: COSCO-88123
- Commodity Description: ABS Plastic Enclosures
- Mode of Transportation: Sea Ocean Vessel
- Origin: Guangzhou Nansha Port → Destination: Mundra Port

2. DAMAGE INCIDENT DETAILS:
- Date of Inspection/Incident: 11 Aug 2026
- Observed Damage Category: Water Ingress & Moisture Corrosion
- Primary Responsible Party: Shipping Carrier
- Total Quantified Financial Loss: ₹4,20,000 INR

3. STATEMENT OF EVIDENCE & SUBMITTED ATTACHMENTS:
The following verified evidentiary documents are attached to this claim package:
  - [✓] Commercial Invoice
  - [✓] Packing List
  - [✓] Bill of Lading (BL Manifest)
  - [✓] High-Resolution Inspection Photos
  - [✓] Delivery Receipt & Surveyor Notes

4. DEMAND FOR SETTLEMENT:
Based on preliminary surveyor evaluation and contract of carriage terms, we hereby hold Shipping Carrier liable for the direct damage amount of ₹4,20,000 INR.

Kindly acknowledge receipt of this formal claim within seven (7) business days and provide your claim reference number.

Issued by:
Trade Nav AI Claim Logistics Desk
Representative for Merchant/Importer`);

  const handleCopy = () => {
    navigator.clipboard.writeText(claimText);
    setCopied(true);
    addToast('Claim Draft Copied', 'Claim text copied to clipboard.', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    // Create text file download for PDF simulation
    const element = document.createElement('a');
    const file = new Blob([claimText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Claim_${claimParams.shipmentId}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    addToast('Claim Document Downloaded', 'Claim draft saved locally.', 'success');
  };

  const handleSaveCase = () => {
    addDamageCase({
      id: `dmg-${Date.now()}`,
      caseId: `DMG-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      shipmentId: claimParams.shipmentId,
      cargoDescription: claimParams.cargoDescription,
      damageCategory: claimParams.damageCategory,
      severity: 'High',
      confidencePercent: 87,
      affectedQuantity: 120,
      totalQuantity: 5000,
      unitValueINR: 3500,
      estimatedLossINR: claimParams.estimatedLossINR,
      responsibleParty: claimParams.responsibleParty,
      evidenceStatus: {
        invoice: true,
        packingList: true,
        billOfLading: true,
        photos: true,
        inspectionReport: true,
        deliveryRecord: true
      },
      claimReadinessPercent: 92,
      claimDraft: claimText,
      status: 'Claim Drafted',
      createdAt: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="space-y-6">
      <DisclaimerBanner
        title="LEGAL NOTICE REQUIREMENT — USER REVIEW MANDATORY"
        message="AI generates structured claim templates. Claims are NEVER sent automatically. Review and approve all details before transmitting to carriers or insurers."
        type="simulation"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs (4 Cols) */}
        <div className="lg:col-span-4 bg-navy-850 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3.5 text-xs">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-800">
            <FileText className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Claim Details</h3>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Shipment ID</label>
            <input
              type="text"
              value={claimParams.shipmentId}
              onChange={(e) => setClaimParams({ ...claimParams, shipmentId: e.target.value })}
              className="w-full bg-navy-800 border border-slate-750 rounded-lg px-3 py-1.5 text-white font-mono focus:border-cyan-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Container Number</label>
            <input
              type="text"
              value={claimParams.containerNumber}
              onChange={(e) => setClaimParams({ ...claimParams, containerNumber: e.target.value })}
              className="w-full bg-navy-800 border border-slate-750 rounded-lg px-3 py-1.5 text-white font-mono focus:border-cyan-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Responsible Recipient Party</label>
            <select
              value={claimParams.responsibleParty}
              onChange={(e) => setClaimParams({ ...claimParams, responsibleParty: e.target.value })}
              className="w-full bg-navy-800 border border-slate-750 rounded-lg px-3 py-1.5 text-cyan-400 font-semibold focus:border-cyan-500 outline-none"
            >
              <option value="Shipping Carrier">Shipping Carrier</option>
              <option value="Supplier">Supplier</option>
              <option value="Road Transporter">Road Transporter</option>
              <option value="Rail Operator">Rail Operator</option>
              <option value="Air Cargo Carrier">Air Cargo Carrier</option>
              <option value="Port Operator">Port Operator</option>
              <option value="Insurance Provider">Insurance Provider</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Quantified Financial Loss (₹)</label>
            <input
              type="number"
              value={claimParams.estimatedLossINR}
              onChange={(e) => setClaimParams({ ...claimParams, estimatedLossINR: Number(e.target.value) })}
              className="w-full bg-navy-800 border border-slate-750 rounded-lg px-3 py-1.5 text-white font-mono focus:border-cyan-500 outline-none"
            />
          </div>
        </div>

        {/* Right Output: Claim Editor & Actions (8 Cols) */}
        <div className="lg:col-span-8 bg-navy-850 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded border border-cyan-500/40">
                FORMAL CLAIM DRAFT
              </span>
              <h3 className="text-lg font-bold text-white mt-1">Claim Draft — Shipment {claimParams.shipmentId}</h3>
            </div>

            {/* Action Button Toolbar */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-3 py-1.5 rounded-lg bg-navy-800 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white flex items-center space-x-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditing ? 'Done' : 'Edit'}</span>
              </button>

              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg bg-navy-800 border border-slate-700 text-xs font-semibold text-cyan-400 hover:bg-navy-750 flex items-center space-x-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={handleDownloadPDF}
                className="px-3 py-1.5 rounded-lg bg-navy-800 border border-slate-700 text-xs font-semibold text-white hover:bg-navy-750 flex items-center space-x-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>

              <button
                onClick={handleSaveCase}
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold shadow-md flex items-center space-x-1"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Case</span>
              </button>
            </div>
          </div>

          {/* Textarea or Text Display */}
          {isEditing ? (
            <textarea
              value={claimText}
              onChange={(e) => setClaimText(e.target.value)}
              rows={16}
              className="w-full bg-navy-900 border border-slate-700 rounded-xl p-4 text-xs font-mono text-slate-100 focus:border-cyan-500 outline-none leading-relaxed"
            />
          ) : (
            <pre className="w-full bg-navy-900 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed overflow-x-auto">
              {claimText}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};

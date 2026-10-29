import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Trip } from '../../types';
import { useToast } from '../../context/ToastContext';
import { Printer, Copy, Check, Globe, FileDown } from 'lucide-react';

interface ShareExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: Trip;
}

export const ShareExportModal: React.FC<ShareExportModalProps> = ({ isOpen, onClose, trip }) => {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}?trip=${trip.id}`
    : `https://wanderplan-ai.vercel.app?trip=${trip.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    showToast('Shareable trip link copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Share & Export Itinerary"
      subtitle={`Export "${trip.title}" or share it with travel companions.`}
      maxWidth="md"
    >
      <div className="space-y-6">
        
        {/* Printable / Download PDF Section */}
        <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200/80 space-y-3">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-teal-600 text-white shrink-0 mt-0.5">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Print or Save as PDF</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Generate an elegant multi-page travel brochure formatted for physical printing or offline PDF storage on your phone.
              </p>
            </div>
          </div>

          <Button
            variant="teal"
            size="sm"
            onClick={handlePrint}
            className="w-full shadow-sm"
          >
            <FileDown className="w-4 h-4" />
            <span>Open Print / PDF Exporter</span>
          </Button>
        </div>

        {/* Shareable Link */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Shareable Travel Link
          </label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="w-full pl-9 pr-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl text-slate-700 select-all"
              />
            </div>
            <Button variant="outline" size="sm" onClick={handleCopyLink}>
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </Button>
          </div>
          <p className="text-[11px] text-slate-500">
            Anyone with this link can load this itinerary in their WanderPlan session.
          </p>
        </div>

        {/* Summary Details */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1 text-slate-600">
          <div className="flex justify-between">
            <span className="font-semibold">Destination:</span>
            <span>{trip.destination}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Duration:</span>
            <span>{trip.days.length} Days ({trip.startDate} to {trip.endDate})</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Travelers:</span>
            <span>{trip.travelers} ({trip.travelStyle})</span>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 flex justify-end">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

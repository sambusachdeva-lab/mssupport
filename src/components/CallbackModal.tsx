import React, { useState } from 'react';
import { X, PhoneCall, Clock, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import { SupportIssue, SupportTicket } from '../types/support';

interface CallbackModalProps {
  initialIssue?: SupportIssue | null;
  onClose: () => void;
  onTicketCreated: (ticket: SupportTicket) => void;
}

export const CallbackModal: React.FC<CallbackModalProps> = ({
  initialIssue,
  onClose,
  onTicketCreated
}) => {
  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [timing, setTiming] = useState<'asap' | 'scheduled'>('asap');
  const [timeSlot, setTimeSlot] = useState('Today at 2:30 PM - 3:00 PM');
  const [notes, setNotes] = useState(
    initialIssue ? `Assistance requested regarding: ${initialIssue.title}` : ''
  );
  const [submittedTicket, setSubmittedTicket] = useState<SupportTicket | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim() || phoneNumber.trim().length < 7) {
      setError('Please enter a valid phone number for the callback.');
      return;
    }
    setError('');

    const newTicket: SupportTicket = {
      ticketNumber: `SRX-${Math.floor(10000000 + Math.random() * 90000000)}`,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      product: initialIssue ? `Windows (${initialIssue.title})` : 'Windows Operating System Support',
      issueTitle: initialIssue ? initialIssue.title : 'Phone Support Callback',
      channel: 'callback',
      status: 'Scheduled',
      contactPhone: `${countryCode} ${phoneNumber.trim()}`,
      preferredTime: timing === 'asap' ? 'Within 4 - 6 minutes' : timeSlot,
      notes: notes.trim()
    };

    onTicketCreated(newTicket);
    setSubmittedTicket(newTicket);
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-neutral-300 w-full max-w-lg overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-indigo-600 text-white flex items-center justify-center">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-900">
                Request a Support Callback
              </h3>
              <p className="text-[11px] text-neutral-500">
                Official Microsoft Support Desk
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submittedTicket ? (
          /* Confirmation Screen */
          <div className="p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div>
              <h4 className="text-lg font-bold text-neutral-900">
                Callback Scheduled
              </h4>
              <p className="text-xs text-neutral-600 mt-1">
                A Microsoft Windows Support Engineer will call you directly.
              </p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-500">Service Request ID:</span>
                <span className="font-mono font-bold text-neutral-900">{submittedTicket.ticketNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Phone Number:</span>
                <span className="font-medium text-neutral-900">{submittedTicket.contactPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Expected Time:</span>
                <span className="font-medium text-neutral-900">{submittedTicket.preferredTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Incoming Caller ID:</span>
                <span className="text-neutral-700 font-mono">1-800-MICROSOFT (642-7676)</span>
              </div>
            </div>

            <p className="text-[11px] text-neutral-500 leading-relaxed">
              Please have your PC powered on and near your workspace. You can track this request at any time under "My Support Cases".
            </p>

            <button
              onClick={onClose}
              className="w-full py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          /* Callback Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Phone Number
              </label>
              <div className="flex gap-2">
                <select
                  value={countryCode}
                  onChange={e => setCountryCode(e.target.value)}
                  className="px-2.5 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-md text-neutral-900 focus:outline-none focus:border-blue-600"
                >
                  <option value="+1">United States (+1)</option>
                  <option value="+44">United Kingdom (+44)</option>
                  <option value="+1">Canada (+1)</option>
                  <option value="+61">Australia (+61)</option>
                  <option value="+49">Germany (+49)</option>
                  <option value="+91">India (+91)</option>
                  <option value="+81">Japan (+81)</option>
                </select>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                  placeholder="e.g. 555-019-2834"
                  className="flex-1 px-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-md text-neutral-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Preferred Callback Window
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setTiming('asap')}
                  className={`p-2.5 rounded-md border text-left font-medium transition-colors ${
                    timing === 'asap'
                      ? 'border-blue-600 bg-blue-50/60 text-blue-900 font-semibold'
                      : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span>Call as soon as possible</span>
                  </div>
                  <span className="text-[11px] text-neutral-500 block">Est. wait: 4-6 minutes</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTiming('scheduled')}
                  className={`p-2.5 rounded-md border text-left font-medium transition-colors ${
                    timing === 'scheduled'
                      ? 'border-blue-600 bg-blue-50/60 text-blue-900 font-semibold'
                      : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Clock className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Schedule later today</span>
                  </div>
                  <span className="text-[11px] text-neutral-500 block">Pick 30-min window</span>
                </button>
              </div>

              {timing === 'scheduled' && (
                <div className="mt-2">
                  <select
                    value={timeSlot}
                    onChange={e => setTimeSlot(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-md text-neutral-900 focus:outline-none focus:border-blue-600"
                  >
                    <option value="Today at 2:30 PM - 3:00 PM">Today at 2:30 PM - 3:00 PM</option>
                    <option value="Today at 3:30 PM - 4:00 PM">Today at 3:30 PM - 4:00 PM</option>
                    <option value="Today at 4:30 PM - 5:00 PM">Today at 4:30 PM - 5:00 PM</option>
                    <option value="Tomorrow at 10:00 AM - 10:30 AM">Tomorrow at 10:00 AM - 10:30 AM</option>
                  </select>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Problem Summary (Optional)
              </label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={2}
                placeholder="Briefly describe what errors or symptoms you are seeing..."
                className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-md text-neutral-900 focus:outline-none focus:border-blue-600 focus:bg-white resize-none"
              ></textarea>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-neutral-200">
              <span className="text-[11px] text-neutral-500 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                No charge for Windows warranty & account support
              </span>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              >
                Confirm Call Request
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};

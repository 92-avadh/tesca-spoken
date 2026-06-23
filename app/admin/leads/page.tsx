'use client';

import { useState } from 'react';
import { Search, Phone, MessageSquare, Check, X, PhoneCall, CheckCircle } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
  status: 'new' | 'contacted' | 'converted';
  dateAdded: string;
}

export default function AdminLeadsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 'lead-1',
      name: 'Vikram Singh',
      phone: '+91 91234 56789',
      email: 'vikram.singh@gmail.com',
      notes: 'Interested in the Spoken English Mastery course. Prefers morning batches.',
      status: 'new',
      dateAdded: 'June 23, 2026',
    },
    {
      id: 'lead-2',
      name: 'Anjali Sharma',
      email: 'anjali.s@yahoo.com',
      phone: '+91 98123 45670',
      notes: 'Wants to improve business vocabulary for upcoming job interviews.',
      status: 'contacted',
      dateAdded: 'June 22, 2026',
    },
    {
      id: 'lead-3',
      name: 'Suresh Patel',
      phone: '+91 99000 88812',
      email: 'suresh.patel@gmail.com',
      notes: 'Registered for a free level assessment. Waiting for callback.',
      status: 'new',
      dateAdded: 'June 21, 2026',
    },
    {
      id: 'lead-4',
      name: 'Meera Deshmukh',
      phone: '+91 98222 33344',
      email: 'meera.d@gmail.com',
      notes: 'Converted from lead to enrolled student today!',
      status: 'converted',
      dateAdded: 'June 18, 2026',
    },
  ]);

  const handleUpdateStatus = (id: string, status: 'contacted' | 'converted') => {
    setLeads(leads.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  const filteredLeads = leads.filter((l) =>
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    l.notes.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">Leads & Inquiries</h1>
        <p className="text-xs text-gray-400 font-semibold mt-0.5">Follow up on call inquiries, demo test takers, and level evaluation submissions</p>
      </div>

      {/* Filter toolbar */}
      <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2.5 w-full md:w-[280px] shadow-soft">
        <Search className="h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search leads..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-transparent text-xs text-gray-700 outline-none placeholder:text-gray-400"
        />
      </div>

      {/* Leads list cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredLeads.map((lead) => (
          <div
            key={lead.id}
            className={`bg-white border rounded-2xl p-5 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between space-y-4 ${
              lead.status === 'new' ? 'border-l-4 border-l-secondary' : 'border-gray-100/80'
            }`}
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-bold text-gray-800">{lead.name}</h3>
                  <p className="text-[10px] text-gray-400 mt-0.5">Registered: {lead.dateAdded}</p>
                </div>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${
                    lead.status === 'new'
                      ? 'bg-amber-50 text-amber-600'
                      : lead.status === 'contacted'
                      ? 'bg-blue-50 text-blue-600'
                      : 'bg-emerald-50 text-emerald-600'
                  }`}
                >
                  {lead.status}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-gray-500">
                <p>Phone: <span className="text-gray-700">{lead.phone}</span></p>
                <p>Email: <span className="text-gray-700">{lead.email}</span></p>
              </div>

              <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 flex gap-2">
                <MessageSquare className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-500 font-medium leading-normal">{lead.notes}</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-3 border-t border-gray-50 flex items-center justify-end gap-2 text-xs font-bold">
              {lead.status === 'new' && (
                <button
                  onClick={() => handleUpdateStatus(lead.id, 'contacted')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-50 border border-gray-150 hover:bg-gray-100 text-gray-600 transition-colors"
                >
                  <PhoneCall className="h-3.5 w-3.5" />
                  Mark Contacted
                </button>
              )}
              {lead.status !== 'converted' && (
                <button
                  onClick={() => handleUpdateStatus(lead.id, 'converted')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary-600 transition-colors shadow-soft"
                >
                  <CheckCircle className="h-3.5 w-3.5" />
                  Mark Converted
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

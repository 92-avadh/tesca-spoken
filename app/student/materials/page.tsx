'use client';

import { useState } from 'react';
import { FileText, Download, Search, Headphones, BookOpen, FileCheck } from 'lucide-react';

interface Material {
  id: string;
  name: string;
  category: 'grammar' | 'vocabulary' | 'speaking' | 'worksheet';
  format: 'PDF' | 'MP3' | 'DOCX';
  size: string;
  downloadUrl: string;
  addedDate: string;
}

export default function StudentMaterialsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const materials: Material[] = [
    {
      id: 'mat-1',
      name: '100 Common Idioms for Daily Conversation',
      category: 'vocabulary',
      format: 'PDF',
      size: '1.2 MB',
      downloadUrl: '#',
      addedDate: 'June 20, 2026',
    },
    {
      id: 'mat-2',
      name: 'Irregular Verbs Cheat Sheet & Quiz',
      category: 'grammar',
      format: 'PDF',
      size: '850 KB',
      downloadUrl: '#',
      addedDate: 'June 18, 2026',
    },
    {
      id: 'mat-3',
      name: 'Daily Pronunciation Practice Audio (Lesson 3)',
      category: 'speaking',
      format: 'MP3',
      size: '14.5 MB',
      downloadUrl: '#',
      addedDate: 'June 15, 2026',
    },
    {
      id: 'mat-4',
      name: 'Intermediate Conversation Starters Workbook',
      category: 'speaking',
      format: 'PDF',
      size: '3.4 MB',
      downloadUrl: '#',
      addedDate: 'June 10, 2026',
    },
    {
      id: 'mat-5',
      name: 'Present Perfect vs Past Simple Exercises',
      category: 'worksheet',
      format: 'DOCX',
      size: '220 KB',
      downloadUrl: '#',
      addedDate: 'June 05, 2026',
    },
  ];

  const categories = [
    { value: 'all', label: 'All Materials' },
    { value: 'grammar', label: 'Grammar' },
    { value: 'vocabulary', label: 'Vocabulary' },
    { value: 'speaking', label: 'Speaking & Audio' },
    { value: 'worksheet', label: 'Worksheets' },
  ];

  const filteredMaterials = materials.filter((material) => {
    const matchesCategory = activeCategory === 'all' || material.category === activeCategory;
    const matchesQuery = material.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'MP3':
        return Headphones;
      case 'DOCX':
        return FileCheck;
      default:
        return FileText;
    }
  };

  const getFormatColor = (format: string) => {
    switch (format) {
      case 'MP3':
        return 'bg-amber-50 text-amber-600';
      case 'DOCX':
        return 'bg-blue-50 text-blue-600';
      default:
        return 'bg-rose-50 text-rose-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">Study Materials</h1>
          <p className="text-xs text-gray-400 font-semibold mt-0.5">Download worksheets, guides, and audio materials</p>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2.5 w-full sm:w-[260px] shadow-soft">
          <Search className="h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-xs text-gray-700 outline-none placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeCategory === cat.value
                ? 'bg-primary text-white shadow-soft'
                : 'bg-white border border-gray-100 text-gray-500 hover:bg-gray-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Materials List */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-soft overflow-hidden">
        {filteredMaterials.length === 0 ? (
          <div className="p-12 text-center">
            <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-base font-bold text-gray-700">No materials found</h3>
            <p className="text-xs text-gray-400 mt-1">Try refining your search keyword or selecting a different category.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {filteredMaterials.map((material) => {
              const Icon = getFormatIcon(material.format);
              const colorClass = getFormatColor(material.format);
              return (
                <div
                  key={material.id}
                  className="flex items-center justify-between p-4 sm:p-5 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className={`h-11 w-11 rounded-xl flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 space-y-1">
                      <p className="text-sm font-semibold text-gray-800 truncate leading-snug">
                        {material.name}
                      </p>
                      <div className="flex flex-wrap gap-3 text-[11px] font-semibold text-gray-400">
                        <span className="bg-gray-100 px-2 py-0.5 rounded uppercase tracking-wider text-[9px]">
                          {material.format}
                        </span>
                        <span>{material.size}</span>
                        <span>Added: {material.addedDate}</span>
                      </div>
                    </div>
                  </div>

                  <a
                    href={material.downloadUrl}
                    className="p-2.5 rounded-xl border border-gray-100 hover:border-primary hover:text-primary transition-all text-gray-500 flex-shrink-0"
                    title="Download File"
                  >
                    <Download className="h-4.5 w-4.5" />
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

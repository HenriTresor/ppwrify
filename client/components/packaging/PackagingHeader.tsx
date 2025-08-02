import React from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Plus, Download, Columns3, X } from 'lucide-react';

interface PackagingHeaderProps {
  onCreateNew: () => void;
  onExport: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onClearFilters: () => void;
}

const PackagingHeader: React.FC<PackagingHeaderProps> = ({
  onCreateNew,
  onExport,
  searchQuery,
  onSearchChange,
  activeTab,
  onTabChange,
  onClearFilters
}) => {
  const { t } = useTranslation();

  const tabs = [
    { id: 'all', label: t('all'), count: 2342 },
    { id: 'active', label: t('active'), count: 2340 },
    { id: 'inactive', label: t('inactive'), count: 2 },
    { id: 'draft', label: t('draft'), count: null }
  ];

  const filters = [
    'Material',
    'PPWR Stufe',
    'Status',
    'Konformitätserklärung',
    'Erstelldatum'
  ];

  return (
    <div className="bg-white border-b border-gray-200">
      {/* Page Header */}
      <div className="px-4 md:px-6 py-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1 lg:min-w-80">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900">{t('packagingTitle')}</h1>
          </div>

          {/* Search - Mobile first, then desktop positioning */}
          <div className="w-full lg:max-w-80 lg:min-w-48 lg:ml-4 order-3 lg:order-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={t('search')}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 border border-gray-200 rounded text-xs font-medium text-gray-500">
                  ⌘K
                </kbd>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-3 order-2 lg:order-3">
            <button
              onClick={onExport}
              className="inline-flex items-center px-3 md:px-3.5 py-2 md:py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="hidden sm:inline">{t('export')}</span>
              <Download className="sm:hidden h-5 w-5" />
            </button>
            <button
              onClick={onCreateNew}
              className="inline-flex items-center px-3 md:px-3.5 py-2 md:py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="sm:hidden h-5 w-5" />
              <span className="hidden sm:inline">{t('newPackaging')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 md:px-6 border-b border-gray-200">
        <nav className="flex space-x-4 md:space-x-6 overflow-x-auto" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  activeTab === tab.id
                    ? 'bg-indigo-100 text-indigo-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {tab.count.toLocaleString()}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Filters */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {filters.map((filter) => (
              <button
                key={filter}
                className="inline-flex items-center px-3.5 py-2 border border-dashed border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50"
              >
                <Plus className="w-3 h-3 mr-1.5" />
                {filter}
              </button>
            ))}
            <button
              onClick={onClearFilters}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              <X className="w-5 h-5 mr-2" />
              {t('removeAllFilters')}
            </button>
          </div>
          <button className="inline-flex items-center px-3.5 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50">
            <Columns3 className="w-5 h-5 mr-2" />
            {t('view')}
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 20 20">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 10l3 3 3-3m0-6l-3 3-3-3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackagingHeader;

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Search, Trash2, HelpCircle } from 'lucide-react';

interface PackagingFormProps {
  initialData?: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}

const PackagingForm: React.FC<PackagingFormProps> = ({ initialData, onSave, onCancel }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('information');
  const [formData, setFormData] = useState({
    designation: initialData?.designation || 'Becher mit Siegel',
    internalId: initialData?.internalId || 'FL10232',
    gtinArticleNumber: initialData?.gtinArticleNumber || 'FL10232',
    countryOfAssembly: initialData?.countryOfAssembly || ['DE'],
    salesCountries: initialData?.salesCountries || ['DE', 'ES'],
    assignedProducts: initialData?.assignedProducts || [
      { id: '1', name: 'Erdbeere Joghurt', productId: 'P00011' },
      { id: '2', name: 'Erdbeere Joghurt', productId: 'P00011' },
      { id: '3', name: 'Erdbeere Joghurt', productId: 'P00011' }
    ]
  });

  const tabs = [
    { id: 'information', label: t('information'), current: activeTab === 'information' },
    { id: 'components', label: t('components'), current: activeTab === 'components' },
    { id: 'documents', label: t('documents'), current: activeTab === 'documents', count: 2 }
  ];

  const countries = [
    { code: 'DE', name: 'Olivia', flag: '🇩🇪' },
    { code: 'ES', name: 'Phoenix', flag: '🇪🇸' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const removeProduct = (productId: string) => {
    setFormData(prev => ({
      ...prev,
      assignedProducts: prev.assignedProducts.filter((p: any) => p.id !== productId)
    }));
  };

  const removeCountry = (countryCode: string, field: 'countryOfAssembly' | 'salesCountries') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((c: string) => c !== countryCode)
    }));
  };

  return (
    <div className="flex flex-col h-full">
      {/* Form Content */}
      <div className="flex flex-col xl:flex-row flex-1 overflow-hidden">
        {/* Left Column - Form */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Header */}
          <div className="px-4 md:px-6 py-5 border-b border-gray-200 bg-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div className="flex-1 min-w-0">
                <h1 className="text-xl md:text-2xl font-semibold text-gray-900 truncate">{formData.designation}</h1>
                <p className="text-sm md:text-base text-gray-600 mt-1">ID: VP0003</p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleSubmit}
                  className="inline-flex items-center px-3 md:px-3.5 py-2 md:py-2.5 border-2 border-indigo-200 text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {t('savePackaging')}
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="px-6 border-b border-gray-200 bg-white">
            <nav className="flex space-x-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    tab.current
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.count && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Form Fields */}
          <div className="flex-1 p-6 bg-white overflow-auto">
            {activeTab === 'information' && (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  {/* Designation */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">{t('designation')}</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.designation}
                        onChange={(e) => setFormData(prev => ({ ...prev, designation: e.target.value }))}
                        className="block w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-base text-gray-900 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <HelpCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Internal ID */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">{t('internalId')}</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.internalId}
                        onChange={(e) => setFormData(prev => ({ ...prev, internalId: e.target.value }))}
                        className="block w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-base text-gray-900 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <HelpCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  {/* GTIN/Article Number */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">{t('gtinArticleNumber')}</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.gtinArticleNumber}
                        onChange={(e) => setFormData(prev => ({ ...prev, gtinArticleNumber: e.target.value }))}
                        className="block w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-base text-gray-900 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <HelpCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Country of Assembly */}
                  <div className="flex flex-col space-y-1.5">
                    <div className="flex items-center space-x-1">
                      <label className="text-sm font-medium text-gray-700">{t('countryOfAssembly')}</label>
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="relative">
                      <div className="flex items-center px-3 py-2 border border-gray-300 rounded-lg bg-white">
                        <Search className="w-5 h-5 text-gray-400 mr-2" />
                        <div className="flex items-center space-x-2 flex-1">
                          {formData.countryOfAssembly.map((country: string) => (
                            <div key={country} className="inline-flex items-center px-2 py-1 bg-white border border-gray-300 rounded text-sm">
                              <span className="mr-2">🇩🇪</span>
                              <span>Olivia</span>
                              <button
                                type="button"
                                onClick={() => removeCountry(country, 'countryOfAssembly')}
                                className="ml-1 p-0.5 hover:bg-gray-100 rounded"
                              >
                                <X className="w-3 h-3 text-gray-400" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sales Countries */}
                  <div className="flex flex-col space-y-1.5">
                    <div className="flex items-center space-x-1">
                      <label className="text-sm font-medium text-gray-700">{t('salesCountries')}</label>
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="relative">
                      <div className="flex items-center px-3 py-2 border border-gray-300 rounded-lg bg-white">
                        <Search className="w-5 h-5 text-gray-400 mr-2" />
                        <div className="flex items-center space-x-2 flex-1">
                          <div className="inline-flex items-center px-2 py-1 bg-white border border-gray-300 rounded text-sm">
                            <span className="mr-2">🇩🇪</span>
                            <span>Olivia</span>
                            <button
                              type="button"
                              className="ml-1 p-0.5 hover:bg-gray-100 rounded"
                            >
                              <X className="w-3 h-3 text-gray-400" />
                            </button>
                          </div>
                          <div className="inline-flex items-center px-2 py-1 bg-white border border-gray-300 rounded text-sm">
                            <span className="mr-2">🇪🇸</span>
                            <span>Phoenix</span>
                            <button
                              type="button"
                              className="ml-1 p-0.5 hover:bg-gray-100 rounded"
                            >
                              <X className="w-3 h-3 text-gray-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Right Column - Product Assignment */}
        <div className="w-96 border-l border-gray-200 bg-gray-50 flex flex-col">
          <div className="p-6">
            <div className="space-y-5">
              {/* Header */}
              <div>
                <h3 className="text-base font-semibold text-gray-900">{t('assignProducts')}</h3>
                <p className="text-sm text-gray-600 mt-1">{t('assignProductsDescription')}</p>
              </div>

              {/* Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder={t('search')}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <kbd className="inline-flex items-center px-2 py-0.5 border border-gray-200 rounded text-xs font-medium text-gray-500">
                    ⌘K
                  </kbd>
                </div>
              </div>

              {/* Product List */}
              <div className="space-y-3">
                {formData.assignedProducts.map((product: any) => (
                  <div key={product.id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-700">{product.name}</h4>
                      <p className="text-sm text-gray-500">{product.productId}</p>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
                        {t('open')}
                      </button>
                      <button
                        onClick={() => removeProduct(product.id)}
                        className="p-1.5 hover:bg-gray-100 rounded"
                      >
                        <Trash2 className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Product Button */}
              <button className="w-full px-3 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                {t('addProduct')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackagingForm;

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';

interface PackagingItem {
  id: string;
  designation: string;
  internalId: string;
  materials: string[];
  status: 'active' | 'draft' | 'inactive';
  weight: string;
  ppwrLevels: string[];
  conformityDeclaration: string;
  createdAt: string;
  lastModified: string;
  lastModifiedBy: string;
  expanded?: boolean;
}

interface PackagingTableProps {
  items: PackagingItem[];
  onItemClick: (item: PackagingItem) => void;
  onItemEdit: (item: PackagingItem) => void;
}

const PackagingTable: React.FC<PackagingTableProps> = ({ items, onItemClick, onItemEdit }) => {
  const { t } = useTranslation();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['3'])); // Third item expanded by default

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium border";
    
    switch (status) {
      case 'active':
        return (
          <span className={`${baseClasses} border-gray-300 bg-white text-gray-700`}>
            <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
            {t('statusActive')}
          </span>
        );
      case 'draft':
        return (
          <span className={`${baseClasses} border-gray-300 bg-white text-gray-700`}>
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-1"></div>
            {t('statusDraft')}
          </span>
        );
      case 'inactive':
        return (
          <span className={`${baseClasses} border-gray-300 bg-white text-gray-700`}>
            <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
            {t('statusDeactivated')}
          </span>
        );
      default:
        return status;
    }
  };

  const getLevelBadge = (level: string) => {
    const baseClasses = "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border mr-1";
    
    switch (level) {
      case 'levelA':
        return <span className={`${baseClasses} border-green-200 bg-green-50 text-green-700`}>{t('levelA')}</span>;
      case 'levelB':
        return <span className={`${baseClasses} border-yellow-200 bg-yellow-50 text-yellow-700`}>{t('levelB')}</span>;
      case 'levelC':
        return <span className={`${baseClasses} border-orange-200 bg-orange-50 text-orange-700`}>{t('levelC')}</span>;
      case 'salesBan':
        return <span className={`${baseClasses} border-red-200 bg-red-50 text-red-700`}>{t('salesBan')}</span>;
      default:
        return level;
    }
  };

  const componentData = {
    '3': [
      { name: 'Joghurtbecher', type: 'separat', format: 'Becher', weight: '300g', category: 'Kategorie 1', level: 'levelA' },
      { name: 'Platine', type: 'integriert', format: 'Platine', weight: '300g', category: 'Kategorie 3', level: null },
      { name: 'Deckel', type: 'separat', format: 'Stülpdeckel', weight: '300g', category: 'Kategorie 5', level: 'levelA' }
    ]
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      {/* Mobile view for small screens */}
      <div className="block lg:hidden">
        <div className="divide-y divide-gray-200">
          {items.map((item) => (
            <div key={item.id} className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center min-w-0 flex-1">
                  <button
                    onClick={() => toggleExpanded(item.id)}
                    className="mr-3 p-2 hover:bg-gray-100 rounded flex-shrink-0"
                  >
                    {expandedItems.has(item.id) ? (
                      <ChevronUp className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-gray-900 truncate">{item.designation}</div>
                    <div className="text-sm text-gray-500">{item.internalId}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  {getStatusBadge(item.status)}
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">{t('materials')}:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {item.materials.slice(0, 2).map((material, idx) => (
                      <span key={idx} className="inline-flex items-center px-1.5 py-0.5 rounded border border-gray-300 bg-white text-xs font-medium text-gray-700">
                        {material}
                      </span>
                    ))}
                    {item.materials.length > 2 && (
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded border border-gray-300 bg-white text-xs font-medium text-gray-700">
                        +{item.materials.length - 2}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <span className="text-gray-500">{t('weight')}:</span>
                  <div className="text-gray-900">{item.weight}</div>
                </div>
              </div>
              
              <div>
                <span className="text-gray-500 text-sm">{t('ppwrLevel')}:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.ppwrLevels.slice(0, 3).map((level, idx) => (
                    <React.Fragment key={idx}>
                      {getLevelBadge(level)}
                    </React.Fragment>
                  ))}
                  {item.ppwrLevels.length > 3 && (
                    <span className="text-xs text-gray-500">+{item.ppwrLevels.length - 3}</span>
                  )}
                </div>
              </div>
              
              {/* Mobile expanded content */}
              {expandedItems.has(item.id) && componentData[item.id as keyof typeof componentData] && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Bestandteile</h4>
                  <div className="space-y-3">
                    {componentData[item.id as keyof typeof componentData].map((component, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-white rounded border">
                        <div className="flex items-center min-w-0 flex-1">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                            <div className="w-4 h-4 bg-purple-600 rounded"></div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-medium text-gray-900 truncate">{component.name}</div>
                            <div className="text-xs text-gray-500">{component.type}</div>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          {component.level && getLevelBadge(component.level)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop table view */}
      <div className="hidden lg:block">
        <div className="overflow-x-auto">
          {/* Table Header */}
          <div className="bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="col-span-3 flex items-center">
                {t('designation')}
                <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 12 12">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.5 7.5L6 10L8.5 7.5M3.5 4.5L6 2L8.5 4.5" />
                </svg>
              </div>
              <div className="col-span-2 flex items-center">
                {t('internalId')}
                <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 12 12">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.5 7.5L6 10L8.5 7.5M3.5 4.5L6 2L8.5 4.5" />
                </svg>
              </div>
              <div className="col-span-2">{t('materials')}</div>
              <div className="col-span-1 flex items-center">
                {t('status')}
                <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 12 12">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.5 7.5L6 10L8.5 7.5M3.5 4.5L6 2L8.5 4.5" />
                </svg>
              </div>
              <div className="col-span-1 flex items-center">
                {t('weight')}
                <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 12 12">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.5 7.5L6 10L8.5 7.5M3.5 4.5L6 2L8.5 4.5" />
                </svg>
              </div>
              <div className="col-span-2">{t('ppwrLevel')}</div>
              <div className="col-span-1">{t('conformityDeclaration')}</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {items.map((item, index) => (
              <React.Fragment key={item.id}>
                <div className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50">
                  {/* Designation */}
                  <div className="col-span-3 flex items-center">
                    <button
                      onClick={() => toggleExpanded(item.id)}
                      className="mr-3 p-2 hover:bg-gray-100 rounded"
                    >
                      {expandedItems.has(item.id) ? (
                        <ChevronUp className="w-5 h-5 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600" />
                      )}
                    </button>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.designation}</div>
                      <div className="text-sm text-gray-500">{item.internalId}</div>
                    </div>
                  </div>

                  {/* Internal ID */}
                  <div className="col-span-2 flex items-center">
                    <div className="text-sm text-gray-500">{item.internalId}</div>
                  </div>

                  {/* Materials */}
                  <div className="col-span-2 flex items-center">
                    <div className="flex flex-wrap gap-1">
                      {item.materials.slice(0, 3).map((material, idx) => (
                        <span key={idx} className="inline-flex items-center px-1.5 py-0.5 rounded border border-gray-300 bg-white text-xs font-medium text-gray-700">
                          {material}
                        </span>
                      ))}
                      {item.materials.length > 3 && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded border border-gray-300 bg-white text-xs font-medium text-gray-700">
                          +{item.materials.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="col-span-1 flex items-center">
                    {getStatusBadge(item.status)}
                  </div>

                  {/* Weight */}
                  <div className="col-span-1 flex items-center">
                    <div className="text-sm text-gray-500">{item.weight}</div>
                  </div>

                  {/* PPWR Levels */}
                  <div className="col-span-2 flex items-center">
                    <div className="flex flex-wrap gap-1">
                      {item.ppwrLevels.map((level, idx) => (
                        <React.Fragment key={idx}>
                          {getLevelBadge(level)}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Conformity Declaration */}
                  <div className="col-span-1 flex items-center justify-between">
                    <span className="inline-flex items-center px-2 py-0.5 rounded border border-gray-300 bg-white text-xs font-medium text-gray-700">
                      {t('available')}
                    </span>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Expanded Components Section */}
                {expandedItems.has(item.id) && componentData[item.id as keyof typeof componentData] && (
                  <div className="bg-white border-t border-gray-100 px-6 py-5">
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
                        <h4 className="text-base font-medium text-gray-900">Bestandteile</h4>
                        <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                          Bestandteile bearbeiten
                        </button>
                      </div>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bezeichnung</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Format</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gewicht</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volumen</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PPWR Kategorie</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PPWR Stufe</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {componentData[item.id as keyof typeof componentData].map((component, idx) => (
                              <tr key={idx}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                      <div className="w-5 h-5 bg-purple-600 rounded"></div>
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium text-gray-900">{component.name}</div>
                                      <div className="text-sm text-gray-500">{component.type}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="inline-flex items-center px-1.5 py-0.5 rounded border border-gray-300 bg-white text-xs font-medium text-gray-700">
                                    {component.format}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{component.weight}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{component.weight}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="inline-flex items-center px-1.5 py-0.5 rounded border border-gray-300 bg-white text-xs font-medium text-gray-700">
                                    {component.category}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {component.level && getLevelBadge(component.level)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <button className="p-1 hover:bg-gray-100 rounded">
                                    <MoreVertical className="w-5 h-5 text-gray-400" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="bg-white px-4 md:px-6 py-3 flex items-center justify-between md:justify-end border-t border-gray-200">
        <div className="flex items-center space-x-1 border border-gray-300 rounded-lg overflow-hidden">
          <button className="flex items-center px-3 md:px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border-r border-gray-300">
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-1.5" />
            <span className="hidden sm:inline">{t('previous')}</span>
          </button>
          <button className="px-2 md:px-3 py-2 text-sm font-medium text-white bg-gray-50 border-r border-gray-300">1</button>
          <button className="px-2 md:px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border-r border-gray-300 hidden sm:block">2</button>
          <button className="px-2 md:px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border-r border-gray-300 hidden sm:block">3</button>
          <button className="px-2 md:px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border-r border-gray-300 hidden md:block">...</button>
          <button className="px-2 md:px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border-r border-gray-300 hidden md:block">8</button>
          <button className="px-2 md:px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border-r border-gray-300 hidden md:block">9</button>
          <button className="px-2 md:px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border-r border-gray-300">10</button>
          <button className="flex items-center px-3 md:px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <span className="hidden sm:inline">{t('next')}</span>
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 ml-1 md:ml-1.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackagingTable;

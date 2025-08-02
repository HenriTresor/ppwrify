import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { LayoutGrid } from 'lucide-react';
import PackagingHeader from '../components/packaging/PackagingHeader';
import PackagingTable from '../components/packaging/PackagingTable';

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
}

const PackagingManagement: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [items, setItems] = useState<PackagingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Sample data matching the Figma design
  const sampleData: PackagingItem[] = [
    {
      id: '1',
      designation: 'Kaffeetasse mit Deckel',
      internalId: 'SDF-12343',
      materials: ['PET-T', 'PET-U', 'PET-V', '+2'],
      status: 'active',
      weight: '300g',
      ppwrLevels: ['levelA', 'levelB', 'levelC', 'salesBan'],
      conformityDeclaration: 'available',
      createdAt: '15.07.2025 14:30 Uhr',
      lastModified: '15.07.2025 14:30 Uhr',
      lastModifiedBy: 'Meike Miller'
    },
    {
      id: '2',
      designation: 'Tee-Set aus Porzellan',
      internalId: 'SDF-12344',
      materials: ['PET-H', 'PET-I', 'PET-J', '+2'],
      status: 'draft',
      weight: '300g',
      ppwrLevels: ['levelA', 'levelB'],
      conformityDeclaration: 'available',
      createdAt: '14.07.2025 09:45 Uhr',
      lastModified: '14.07.2025 09:45 Uhr',
      lastModifiedBy: 'Meike Miller'
    },
    {
      id: '3',
      designation: 'Glasflasche mit Korken',
      internalId: 'SDF-12345',
      materials: ['PET-AL', 'PET-AM', 'PET-AN', 'PET-AQ'],
      status: 'inactive',
      weight: '300g',
      ppwrLevels: ['levelA', 'levelB', 'levelC', 'salesBan'],
      conformityDeclaration: 'available',
      createdAt: '13.07.2025 11:00 Uhr',
      lastModified: '13.07.2025 11:00 Uhr',
      lastModifiedBy: 'Meike Miller'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setItems(sampleData);
      setLoading(false);
    }, 500);
  }, []);

  const handleCreateNew = () => {
    navigate('/packaging/new');
  };

  const handleExport = () => {
    console.log('Export functionality');
  };

  const handleItemClick = (item: PackagingItem) => {
    navigate(`/packaging/${item.id}`);
  };

  const handleItemEdit = (item: PackagingItem) => {
    navigate(`/packaging/${item.id}/edit`);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setActiveTab('all');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Top Navigation */}
      <div className="flex items-center h-13 px-2 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-2 border-r border-gray-200 pr-2 mr-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <LayoutGrid className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-gray-500">{t('packagingManagement')}</span>
        </div>
      </div>

      {/* Header */}
      <PackagingHeader
        onCreateNew={handleCreateNew}
        onExport={handleExport}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onClearFilters={handleClearFilters}
      />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white overflow-auto">
        <PackagingTable
          items={items}
          onItemClick={handleItemClick}
          onItemEdit={handleItemEdit}
        />
      </div>
    </div>
  );
};

export default PackagingManagement;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, LayoutGrid, ChevronRight } from 'lucide-react';
import PackagingForm from '../components/packaging/PackagingForm';

const PackagingEdit: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [packagingData, setPackagingData] = useState(null);

  useEffect(() => {
    // Simulate API call to fetch packaging data
    setTimeout(() => {
      setPackagingData({
        id,
        designation: 'Becher mit Siegel',
        internalId: 'FL10232',
        gtinArticleNumber: 'FL10232',
        countryOfAssembly: ['DE'],
        salesCountries: ['DE', 'ES'],
        assignedProducts: [
          { id: '1', name: 'Erdbeere Joghurt', productId: 'P00011' },
          { id: '2', name: 'Erdbeere Joghurt', productId: 'P00011' },
          { id: '3', name: 'Erdbeere Joghurt', productId: 'P00011' }
        ]
      });
      setLoading(false);
    }, 500);
  }, [id]);

  const handleSave = async (data: any) => {
    try {
      // Simulate API call to save packaging data
      console.log('Saving packaging data:', data);
      navigate('/packaging');
    } catch (error) {
      console.error('Failed to save packaging:', error);
    }
  };

  const handleCancel = () => {
    navigate('/packaging');
  };

  const handleBack = () => {
    navigate('/packaging');
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
      <div className="flex items-center min-h-13 px-2 md:px-4 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-2 border-r border-gray-200 pr-2 mr-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <LayoutGrid className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 flex-1 py-2 sm:py-0">
          <button
            onClick={handleBack}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 self-start"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5" />
            <span className="hidden sm:inline">{t('back')}</span>
          </button>

          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 min-w-0" aria-label="Breadcrumb">
            <button
              onClick={() => navigate('/packaging')}
              className="text-sm font-medium text-gray-500 hover:text-gray-700 truncate"
            >
              {t('packagingManagement')}
            </button>
            <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
            <span className="text-sm font-medium text-indigo-600 truncate">
              {t('cupsWithLid')}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <PackagingForm
          initialData={packagingData}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default PackagingEdit;

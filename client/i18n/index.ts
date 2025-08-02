import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      dashboard: 'Dashboard',
      products: 'Products',
      packaging: 'Packaging',
      packagingManagement: 'Packaging Management',
      categories: 'Categories',
      reporting: 'Reporting',
      search: 'Search',
      save: 'Save',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      add: 'Add',
      open: 'Open',
      close: 'Close',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      login: 'Login',
      logout: 'Logout',
      email: 'Email',
      password: 'Password',
      loginTitle: 'Sign in to PPWRify',
      loginButton: 'Sign In',
      packagingTitle: 'Packaging Management',
      newPackaging: 'Create New Packaging',
      export: 'Export',
      all: 'All',
      active: 'Active',
      inactive: 'Inactive',
      draft: 'Draft',
      designation: 'Designation',
      internalId: 'Internal ID',
      materials: 'Materials',
      status: 'Status',
      weight: 'Weight',
      ppwrLevel: 'PPWR Level',
      conformityDeclaration: 'Conformity Declaration',
      createdDate: 'Created Date',
      lastModified: 'Last Modified',
      lastModifiedBy: 'Last Modified By',
      removeAllFilters: 'Remove All Filters',
      view: 'View',
      information: 'Information',
      components: 'Components',
      documents: 'Documents',
      savePackaging: 'Save Packaging',
      cupsWithLid: 'Cups with Lid',
      gtinArticleNumber: 'GTIN/Art. No.',
      countryOfAssembly: 'Country of Assembly',
      salesCountries: 'Sales Countries',
      assignProducts: 'Assign Products',
      assignProductsDescription: 'Assign different products to the packaging.',
      addProduct: 'Add Product',
      strawberryYoghurt: 'Strawberry Yogurt',
      statusActive: 'Active',
      statusDraft: 'Draft',
      statusDeactivated: 'Deactivated',
      available: 'Available',
      levelA: 'Level A',
      levelB: 'Level B',
      levelC: 'Level C',
      salesBan: 'Sales Ban'
    }
  },
  de: {
    translation: {
      dashboard: 'Dashboard',
      products: 'Produkte',
      packaging: 'Verpackungen',
      packagingManagement: 'Verpackungsverwaltung',
      categories: 'Kategorien',
      reporting: 'Reporting',
      search: 'Suche',
      save: 'Speichern',
      cancel: 'Abbrechen',
      edit: 'Bearbeiten',
      delete: 'Löschen',
      add: 'Hinzufügen',
      open: 'Öffnen',
      close: 'Schließen',
      back: 'Zurück',
      next: 'Weiter',
      previous: 'Zurück',
      
      // Login
      login: 'Anmelden',
      logout: 'Abmelden',
      email: 'E-Mail',
      password: 'Passwort',
      loginTitle: 'Bei PPWRify anmelden',
      loginButton: 'Anmelden',
      
      // Packaging Management
      packagingTitle: 'Verpackungsverwaltung',
      newPackaging: 'Neue Verpackung erstellen',
      export: 'Exportieren',
      all: 'Alle',
      active: 'Aktiv',
      inactive: 'Inaktiv',
      draft: 'Entwurf',
      designation: 'Bezeichnung',
      internalId: 'Interne Kennung',
      materials: 'Materialien',
      status: 'Status',
      weight: 'Gewicht',
      ppwrLevel: 'PPWR Stufe',
      conformityDeclaration: 'Konformitätserklärung',
      createdDate: 'Erstelldatum',
      lastModified: 'Zuletzt geändert',
      lastModifiedBy: 'Zuletzt geändert von',
      removeAllFilters: 'Alle Filter entfernen',
      view: 'Ansicht',
      
      // Packaging Form
      information: 'Informationen',
      components: 'Bestandteile',
      documents: 'Dokumente',
      savePackaging: 'Verpackung speichern',
      cupsWithLid: 'Becher mit Siegel',
      gtinArticleNumber: 'GTIN/Art. Nr.',
      countryOfAssembly: 'Montageland',
      salesCountries: 'Vertriebsländer',
      assignProducts: 'Produkte zuweisen',
      assignProductsDescription: 'Weisen Sie der Verpackung verschiedene Produkte zu.',
      addProduct: 'Produkt hinzufügen',
      strawberryYoghurt: 'Erdbeere Joghurt',
      
      // Status
      statusActive: 'Aktiv',
      statusDraft: 'Entwurf',
      statusDeactivated: 'Deaktiviert',
      available: 'vorhanden',
      
      // Levels
      levelA: 'Stufe A',
      levelB: 'Stufe B',
      levelC: 'Stufe C',
      salesBan: 'Verkaufsverbot'
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'de',
    debug: import.meta.env.DEV,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage']
    }
  });

export default i18n;

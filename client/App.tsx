import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import PackagingManagement from './pages/PackagingManagement';
import PackagingEdit from './pages/PackagingEdit';
import NotFound from './pages/NotFound';
import './i18n';

const Dashboard: React.FC = () => (
  <div className="p-4 md:p-6">
    <h1 className="text-xl md:text-2xl font-bold text-gray-900">Dashboard</h1>
    <p className="text-gray-600 mt-2">Dashboard page - placeholder</p>
  </div>
);

const Products: React.FC = () => (
  <div className="p-4 md:p-6">
    <h1 className="text-xl md:text-2xl font-bold text-gray-900">Products</h1>
    <p className="text-gray-600 mt-2">Products page - placeholder</p>
  </div>
);

const Categories: React.FC = () => (
  <div className="p-4 md:p-6">
    <h1 className="text-xl md:text-2xl font-bold text-gray-900">Categories</h1>
    <p className="text-gray-600 mt-2">Categories page - placeholder</p>
  </div>
);

const Reporting: React.FC = () => (
  <div className="p-4 md:p-6">
    <h1 className="text-xl md:text-2xl font-bold text-gray-900">Reporting</h1>
    <p className="text-gray-600 mt-2">Reporting page - placeholder</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Layout>
                  <Navigate to="/packaging" replace />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/products" element={
              <ProtectedRoute>
                <Layout>
                  <Products />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/packaging" element={
              <ProtectedRoute>
                <Layout>
                  <PackagingManagement />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/packaging/:id" element={
              <ProtectedRoute>
                <Layout>
                  <PackagingEdit />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/packaging/:id/edit" element={
              <ProtectedRoute>
                <Layout>
                  <PackagingEdit />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/packaging/categories" element={
              <ProtectedRoute>
                <Layout>
                  <Categories />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/reporting" element={
              <ProtectedRoute>
                <Layout>
                  <Reporting />
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

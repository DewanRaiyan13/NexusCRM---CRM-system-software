import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CRMProvider } from './context/CRMContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Deals from './pages/Deals';
import Tasks from './pages/Tasks';

function App() {
  return (
    <CRMProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="customers" element={<Customers />} />
            <Route path="deals" element={<Deals />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="settings" element={
              <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h1>Settings</h1>
                <p>Configure your NexusCRM experience.</p>
                <div className="card" style={{ maxWidth: '400px', margin: '2rem auto' }}>
                  <p>Settings module coming soon...</p>
                </div>
              </div>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </CRMProvider>
  );
}

export default App;

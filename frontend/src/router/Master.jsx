import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';

const Master = () => {
  return (
    <div className="flex h-screen bg-brand-light-2 dark:bg-brand-dark-1">
        {/* Sidebar will go here */}
        <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header will go here */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-brand-light-4 dark:bg-brand-dark-2 p-6">
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </main>
        </div>
    </div>
  );
};

export default Master;

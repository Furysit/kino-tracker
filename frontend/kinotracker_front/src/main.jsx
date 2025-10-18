import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './reset.css';
import { AuthProvider } from './api/Auth.jsx';
import Root from './Root.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Root />
    </AuthProvider>
  </StrictMode>
);

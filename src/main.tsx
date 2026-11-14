import React from 'react';
import {createRoot} from 'react-dom/client';
import {App} from './App';
import './styles/kit-tokens.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/shared.css';
import './styles/pages.css';
import './styles/desktop.css';
import './styles/mobile.css';

createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);

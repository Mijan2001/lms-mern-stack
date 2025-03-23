import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { appStore } from './app/store';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from './components/theme-provider.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={appStore}>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <App />
            </ThemeProvider>

            <Toaster />
        </Provider>
    </StrictMode>
);

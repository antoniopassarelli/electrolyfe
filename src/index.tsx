import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import IngredientProvider from "@/app/Context/IngredientProvider.tsx";

const Router = import.meta.env.BASE_URL === '/' ? BrowserRouter : HashRouter;

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <IngredientProvider>
            <Router basename={import.meta.env.BASE_URL}>
                <App/>
            </Router>
        </IngredientProvider>
    </React.StrictMode>
);

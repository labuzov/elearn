import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';

const root = document.getElementById('root');

const container = createRoot(root);

container.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

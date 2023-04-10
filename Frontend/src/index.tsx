import ReactDOM from 'react-dom/client';
import App from "./App";
import './index.css';
import interceptorsService from './Services/InterceptorService';

interceptorsService.createInterceptors();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <App />
);


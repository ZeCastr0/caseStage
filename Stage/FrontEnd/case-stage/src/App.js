/*
 * Caminho do Arquivo:
 * Descrição: APP  
 * Autor: José Inácio Saletti Castro Silva
 * Data de Criação: 16/10/2023
 */

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import AreasPage from './pages/AreaListPage/AreaListPage.jsx';
import ProcessosPage from './pages/ProcessListPage/ProcessListPage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/areas" element={<AreasPage />} />
        <Route path="/processos" element={<ProcessosPage />} />
      </Routes>
    </Router>
  );
}

export default App;

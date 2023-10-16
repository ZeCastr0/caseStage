/*
 * Caminho do Arquivo: .\Stage\FrontEnd\case-stage\src\components\organisms\Dashboard.jsx
 * Descrição: Organismo reutilizável que representa um painel de controle mostrando contagens de áreas e processos.
 * Autor: José Inácio Saletti Castro Silva
 * Data de Criação: 16/10/2023
 */

import React from 'react';
import DashboardCard from '../molecules/DashboardCard';
import './style/Dashboard.css'; 

/*
 * Componente Dashboard para exibir o número de áreas e processos.
 * Este componente renderiza um painel de controle que apresenta o número total de 
 * processos e áreas através de cartões (DashboardCard). Essas contagens são 
 * passadas como propriedades para o componente.
 */

const Dashboard = ({ areaCount, processCount }) => {
  return (
    <div className="dashboard">
      <DashboardCard title="Processos" number={processCount} />
      <DashboardCard title="Areas" number={areaCount} />
    </div>
  );
};

export default Dashboard;

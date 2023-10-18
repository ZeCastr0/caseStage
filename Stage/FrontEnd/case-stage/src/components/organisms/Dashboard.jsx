/**
 * Arquivo: .\Stage\FrontEnd\case-stage\src\components\organisms\Dashboard.jsx
 * Descrição: Este componente representa um "organismo" reutilizável chamado Dashboard.
 *            Ele é projetado para exibir informações estatísticas sobre áreas e processos
 *            através de cartões visualmente atrativos. Cada cartão mostra o número total
 *            de processos ou áreas.
 * 
 * Autor: José Inácio Saletti Castro Silva
 * Data de Criação: 16/10/2023
 *
 * Componente Dashboard.
 * 
 * Este componente renderiza um painel de controle que apresenta o número total de 
 * processos e áreas. Estas estatísticas são visualizadas através de cartões (DashboardCard).
 * 
 * @param {number} areaCount - O número total de áreas.
 * @param {number} processCount - O número total de processos.
 * @returns {ReactElement} Retorna um elemento React representando o painel de controle.
 */

import React from 'react';
import DashboardCard from '../molecules/DashboardCard';
import './style/Dashboard.css'; 

const Dashboard = ({ areaCount, processCount }) => {
  return (
    <div className="dashboard">
      <DashboardCard title="Processos" number={processCount} />
      <DashboardCard title="Areas" number={areaCount} />
    </div>
  );
};

export default Dashboard;

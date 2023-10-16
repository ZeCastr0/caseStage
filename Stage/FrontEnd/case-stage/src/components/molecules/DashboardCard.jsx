/*
 * Caminho do Arquivo: .\Stage\FrontEnd\case-stage\src\components\molecules\DashboardCard.jsx
 * Descrição: Molecula reutilizável, DashboardCard
 * Autor: José Inácio Saletti Castro Silva
 * Data de Criação: 16/10/2023
 */


import React from 'react';
import CardTitle from '../atoms/CardTitle';
import CardNumber from '../atoms/CardNumber';


const DashboardCard = ({ title, number }) => {
  return (
    <div className="card">
      <CardTitle title={title} />
      <CardNumber number={number} />
    </div>
  );
};

export default DashboardCard;

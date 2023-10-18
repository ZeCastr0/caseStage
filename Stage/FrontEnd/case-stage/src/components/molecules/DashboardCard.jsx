/**
 * Arquivo: .\Stage\FrontEnd\case-stage\src\components\molecules\DashboardCard.jsx
 * Descrição: Este componente é uma "molécula" reutilizável chamada DashboardCard. Ele combina
 *            dois átomos, CardTitle e CardNumber, para criar um card simples e estilizado que
 *            exibe um título e um número. É útil para dashboards ou interfaces onde uma representação 
 *            visual concisa de informações é desejada.
 * 
 * Autor: José Inácio Saletti Castro Silva
 * Data de Criação: 16/10/2023
 *
 * DashboardCard é um componente que combina dois átomos para representar um card com título e número.
 * Ele recebe um título e um número como propriedades e os renderiza usando os componentes CardTitle e CardNumber.
 * 
 * @param {string} title - Título a ser exibido no card.
 * @param {number|string} number - Número (ou texto representando um número) a ser exibido no card.
 * @returns {ReactElement} Retorna um elemento React representando o card com título e número.
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

/*
 * Caminho do Arquivo: .\Stage\FrontEnd\case-stage\src\components\molecules\BarChartComponent.jsx
 * Descrição: Molecula reutilizável BarChartComponent
 * Autor: José Inácio Saletti Castro Silva
 * Data de Criação: 16/10/2023
 */


import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';

const BarChartComponent = ({ data }) => {
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Processos Principais" fill="#8884d8" />
          <Bar dataKey="Subprocessos" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;

/**
 * Arquivo: .\Stage\FrontEnd\case-stage\src\components\molecules\BarChartComponent.jsx
 * Descrição: Este componente é uma "molécula" reutilizável que representa um gráfico de barras.
 *            Utiliza a biblioteca 'recharts' para renderizar um gráfico baseado em dados passados
 *            como propriedade. É projetado para ser responsivo, adaptando-se ao tamanho do contêiner pai.
 * 
 * Autor: José Inácio Saletti Castro Silva
 * Data de Criação: 16/10/2023
 *
 * BarChartComponent é um componente que representa um gráfico de barras.
 * Ele recebe um conjunto de dados como propriedade e os renderiza usando a biblioteca 'recharts'.
 * 
 * @param {Array} data - Conjunto de dados para o gráfico. Cada item do array deve ter chaves 
 *                       correspondentes às utilizadas no componente BarChart (por exemplo, "name", 
 *                       "Processos Principais", "Subprocessos").
 * @returns {ReactElement} Retorna um elemento React representando o gráfico de barras.
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

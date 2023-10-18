/**
 * Arquivo: .\Stage\FrontEnd\case-stage\src\components\atoms\CardTitle.jsx
 * Descrição: Este componente é um "átomo" reutilizável que representa um CardTitle.
 *            Sua principal finalidade é exibir um título dentro de um elemento de card.
 *            É ideal para uso em dashboards ou em qualquer interface onde 
 *            uma representação visual de títulos em um card seja desejada.
 * 
 * Autor: José Inácio Saletti Castro Silva
 * Data de Criação: 16/10/2023
 *
 * 
 * CardTitle é um componente "átomo" que representa um título dentro de um card.
 * Ele recebe um título como propriedade e o renderiza dentro de uma div com a classe "card-title".
 * 
 * @param {string} title - Título a ser exibido no card.
 * @returns {ReactElement} Retorna um elemento React representando o título dentro de um card.
 */

import React from 'react';

const CardTitle = ({ title }) => {
  return <div className="card-title">{title}</div>;
};

export default CardTitle;

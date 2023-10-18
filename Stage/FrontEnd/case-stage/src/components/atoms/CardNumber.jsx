/**
 * Arquivo: .\Stage\FrontEnd\case-stage\src\components\atoms\CardNumber.jsx
 * Descrição: Este componente é um "átomo" reutilizável que representa um CardNumber.
 *            Sua principal finalidade é exibir um número dentro de um elemento de card.
 *            Pode ser especialmente útil em dashboards ou qualquer interface onde
 *            uma representação visual de números em um card seja necessária.
 * 
 * Autor: José Inácio Saletti Castro Silva
 * Data de Criação: 16/10/2023
 *
 * CardNumber é um componente "átomo" que representa um número dentro de um card.
 * Recebe um número como propriedade e o renderiza dentro de uma div com a classe "card-number".
 * 
 * @param {number|string} number - Número (ou string representando um número) a ser exibido no card.
 * @returns {ReactElement} Retorna um elemento React representando o número dentro de um card.
 */

import React from 'react';



const CardNumber = ({ number }) => {
  return <div className="card-number">{number}</div>;
};

export default CardNumber;

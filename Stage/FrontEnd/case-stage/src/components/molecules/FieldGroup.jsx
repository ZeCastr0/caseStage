/**
 * Arquivo: .\Stage\FrontEnd\case-stage\src\components\molecules\FieldGroup.jsx
 * Descrição: Este componente é uma "molécula" reutilizável chamada FieldGroup. Ela é uma 
 *            abstração que encapsula o AtomicTextField para fornecer um campo de entrada 
 *            mais genérico, permitindo uma maior customização por meio de propriedades 
 *            passadas. Pode ser usado em formulários ou qualquer lugar onde uma entrada de 
 *            usuário é necessária.
 * 
 * Autor: José Inácio Saletti Castro Silva
 * Data de Criação: 16/10/2023
 *
 * FieldGroup é um componente que encapsula o AtomicTextField para fornecer um campo de entrada.
 * Aceita várias propriedades para customização, como 'label' e 'id', além de outras propriedades
 * que podem ser direcionadas para o AtomicTextField.
 * 
 * @param {string} label - Rótulo para o campo de entrada.
 * @param {string} id - ID do elemento para acessibilidade e seleção no DOM.
 * @param {...Object} otherProps - Outras propriedades que podem ser passadas para o AtomicTextField.
 * @returns {ReactElement} Retorna um elemento React representando o campo de entrada.
 */

import React from 'react';
import AtomicTextField from '../atoms/AtomicTextField.jsx';


function FieldGroup({ label, id, ...otherProps }) {
    return <AtomicTextField id={id} label={label} {...otherProps} />;
}

export default FieldGroup;

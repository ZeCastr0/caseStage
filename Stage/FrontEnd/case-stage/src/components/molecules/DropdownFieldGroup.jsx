/**
 * Arquivo: .\Stage\FrontEnd\case-stage\src\components\molecules\DropdownFieldGroup.jsx
 * Descrição: Este componente é uma "molécula" reutilizável chamada DropdownFieldGroup. Ele é 
 *            uma abstração para um campo de formulário suspenso (ou "dropdown"). Utiliza o
 *            AtomicTextField (um campo de texto base) e expande sua funcionalidade para mostrar
 *            uma lista suspensa de opções, com base nas opções passadas como propriedades.
 * 
 * Autor: José Inácio Saletti Castro Silva
 * Data de Criação: 16/10/2023
 * 
 * DropdownFieldGroup é um componente que renderiza um campo de formulário suspenso.
 * Ele é baseado no AtomicTextField, expandindo sua funcionalidade para exibir uma lista
 * suspensa de opções. As opções e outras propriedades são passadas para este componente.
 * 
 * @param {string} label - Rótulo para o campo suspenso.
 * @param {string} id - ID do elemento para acessibilidade e seleção no DOM.
 * @param {Array} options - Array de objetos representando as opções do dropdown. 
 *                          Cada objeto deve ter as chaves 'value' e 'label'.
 * @param {...Object} otherProps - Outras propriedades que podem ser passadas para o AtomicTextField.
 * @returns {ReactElement} Retorna um elemento React representando o campo suspenso.
 */


import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import AtomicTextField from '../atoms/AtomicTextField.jsx';

function DropdownFieldGroup({ label, id, options, ...otherProps }) {
    return (
        <AtomicTextField id={id} label={label} select {...otherProps}>
            {options.map((option) => (
                <MenuItem key={option.value} value={option.label}>
                    {option.label}
                </MenuItem>
            ))}
        </AtomicTextField>
    );
}

export default DropdownFieldGroup;

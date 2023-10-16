/*
 * Caminho do Arquivo: .\Stage\FrontEnd\case-stage\src\components\molecules\DropdownFieldGroup.jsx
 * Descrição: Molecula reutilizável DropdownFieldGroup
 * Autor: José Inácio Saletti Castro Silva
 * Data de Criação: 16/10/2023
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

/*
 * Caminho do Arquivo: .\Stage\FrontEnd\case-stage\src\components\molecules\FieldGroup.jsx
 * Descrição: Molecula reutilizável FieldGroup
 * Autor: José Inácio Saletti Castro Silva
 * Data de Criação: 16/10/2023
 */


import React from 'react';
import AtomicTextField from '../atoms/AtomicTextField.jsx';

function FieldGroup({ label, id, ...otherProps }) {
    return <AtomicTextField id={id} label={label} {...otherProps} />;
}

export default FieldGroup;

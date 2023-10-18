/**
 * Arquivo: .\Stage\FrontEnd\case-stage\src\components\atoms\AtomicTextField.jsx
 * Descrição: Este componente é uma encapsulação do componente TextField da biblioteca MUI.
 *            Ele serve para criar um campo de texto (input) que pode ser reutilizado 
 *            em diferentes partes do projeto, garantindo consistência e facilitando
 *            modificações futuras.
 * 
 * Autor: José Inácio Saletti Castro Silva
 * Data de Criação: 16/10/2023
 *
 * AtomicTextField é um componente "átomo" que representa um campo de texto (input).
 * Ele recebe todas as propriedades possíveis de um TextField do MUI e as repassa para 
 * o componente interno. Isso permite uma personalização completa do TextField quando
 * usado em outros locais do projeto.
 * 
 * @param {Object} props - Propriedades recebidas pelo componente.
 * @returns {ReactElement} Retorna um elemento React representando o campo de texto.
 */

import React from 'react';
import TextField from '@mui/material/TextField';

function AtomicTextField(props) {
    return <TextField {...props} />;
}

export default AtomicTextField;

/*
 * Caminho do Arquivo: .\Stage\FrontEnd\case-stage\src\components\atoms\button.jsx
 * Descrição: Atomo reutilizável de Botao, recebendo parametros
 * Autor: José Inácio Saletti Castro Silva
 * Data de Criação: 16/10/2023
 */

import React from 'react';
import Button from '@mui/material/Button';
import './style.css'

function AtomicButton({ variant, color, onClick, children }) {
    return (
        <Button variant={variant} color={color} onClick={onClick} className='margin-05rem'> 
            {children}
        </Button>
    );
}

export default AtomicButton;
 
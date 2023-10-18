/**
 * Arquivo: .\Stage\FrontEnd\case-stage\src\components\atoms\button.jsx
 * Descrição: Este componente é uma encapsulação do componente Button da biblioteca MUI.
 *            Ele foi criado para ser um botão reutilizável, permitindo personalização 
 *            através de suas propriedades.
 * 
 * Autor: José Inácio Saletti Castro Silva
 * Data de Criação: 16/10/2023
 *
 * AtomicButton é um componente "átomo" que representa um botão.
 * Ele recebe propriedades de personalização como variant, color, onClick e children 
 * e as repassa para o componente Button do MUI. A classe 'margin-05rem' adiciona uma 
 * margem ao botão, conforme definido no arquivo de estilos.
 * 
 * @param {string} variant - Define a variante visual do botão (e.g., "contained", "outlined").
 * @param {string} color - Define a cor do botão (e.g., "default", "primary", "secondary").
 * @param {Function} onClick - Função a ser executada quando o botão é clicado.
 * @param {ReactNode} children - Conteúdo ou elementos filhos a serem renderizados dentro do botão.
 * @returns {ReactElement} Retorna um elemento React representando o botão.
 */

import React from 'react';
import Button from '@mui/material/Button';
import './style.css';


function AtomicButton({ variant, color, onClick, children }) {
    return (
        <Button variant={variant} color={color} onClick={onClick} className='margin-05rem'> 
            {children}
        </Button>
    );
}

export default AtomicButton;
 
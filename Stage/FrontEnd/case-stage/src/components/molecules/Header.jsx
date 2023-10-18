/**
 * Arquivo: .\Stage\FrontEnd\case-stage\src\components\molecules\Header.jsx
 * Descrição: Este componente é uma "molécula" reutilizável chamada Header. Ele representa 
 *            um cabeçalho para as páginas, contendo um título central e botões de redirecionamento 
 *            para diferentes seções do site. Pode ser facilmente incorporado em várias páginas 
 *            para fornecer uma interface consistente.
 * 
 * Autor: José Inácio Saletti Castro Silva
 * Data de Criação: 16/10/2023
*
 * Header é um componente que representa um cabeçalho de página. Ele exibe um título central
 * e botões de redirecionamento para diferentes seções do site.
 * 
 * @param {string} title - Título a ser exibido no centro do cabeçalho.
 * @returns {ReactElement} Retorna um elemento React representando o cabeçalho da página.
 */


import React from 'react';
import RedirectButton from '../../components/atoms/redirect';
import './style.css';

const Header = ({ title }) => {
    return (
        <div className='container-header'>
            <div className="header">
                <h1>{title}</h1> 
                <div className="button-container">
                    <RedirectButton to="/" label="Home" />
                    <RedirectButton to="/areas" label="Areas" />
                    <RedirectButton to="/processos" label="Processos" />
                </div>
            </div>
        </div>
    );
}

export default Header;

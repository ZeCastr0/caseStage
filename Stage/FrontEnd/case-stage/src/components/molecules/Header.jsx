/*
 * Caminho do Arquivo: .\Stage\FrontEnd\case-stage\src\components\molecules\Header.jsx
 * Descrição: Molecula reutilizável Header
 * Autor: José Inácio Saletti Castro Silva
 * Data de Criação: 16/10/2023
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

/**
 * Arquivo: .\Stage\FrontEnd\case-stage\src\components\atoms\redirect.jsx
 * Descrição: Este componente é um "átomo" reutilizável representando um botão direcional.
 *            Ele foi projetado para redirecionar o usuário para outra página ao ser clicado.
 *            É útil para navegação e fluxos de usuário em aplicativos web.
 * 
 * Autor: José Inácio Saletti Castro Silva
 * Data de Criação: 16/10/2023
 *
 * 
 * RedirectButton é um componente que representa um botão direcional.
 * Quando clicado, ele redireciona o usuário para o caminho especificado pela propriedade 'to'.
 * 
 * @param {string} to - O caminho (rota) para o qual o usuário deve ser redirecionado ao clicar no botão.
 * @param {string} label - Texto a ser exibido no botão.
 * @returns {ReactElement} Retorna um elemento React representando o botão de redirecionamento.
 */


import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import './style.css';


function RedirectButton({ to, label }) {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(to);
  };

  return (
    <Button variant="contained" color="primary" onClick={handleRedirect} className='margin-05rem'>
      {label}
    </Button>
  );
}

export default RedirectButton;
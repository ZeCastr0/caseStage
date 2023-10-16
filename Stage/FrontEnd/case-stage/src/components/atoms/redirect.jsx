/*
 * Caminho do Arquivo:.\Stage\FrontEnd\case-stage\src\components\atoms\redirect.jsx
 * Descrição: Atomo reutilizável de botao direcional para outra pg
 * Autor: José Inácio Saletti Castro Silva
 * Data de Criação: 16/10/2023
 */

import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import './style.css'

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
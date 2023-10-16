/*
 * Caminho do Arquivo: .\Stage\FrontEnd\case-stage\src\api\area\index.js
 * Descrição: Aqui é responsavel por consumir a API relacioada a Area.
 * Autor: José Inácio Saletti Castro Silva
 * Data de Criação: 16/10/2023
 */

import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/area`;

const getToken = () => {
    return process.env.REACT_APP_API_TOKEN;
};

// Cabeçalhos padrão para suas requisições
const getHeaders = () => {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
    };
};


//Metodo GET, passando o cabeçalho padrão
export const fetchAreas = async () => {
    try {
        const response = await axios.get(BASE_URL, {
            headers: getHeaders()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

//Metodo post, passando o cabeçalho padrão, e parametros para Inclusão/Atualização
export const addOrUpdateArea = async (processData) => {
    const transformedData = transformDataForAPI(processData);
    const response = await axios.post(BASE_URL, transformedData, {
        headers: getHeaders()
    });
    return response.data;
};

//Metodo delete, passando o cabeçalho padrão, e o ID para DELETE
export const deleteArea = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`, {
            headers: getHeaders()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

//Metodo Post, passando o cabeçalho padrão e parametros para filtrar o SELECT
export const filterAreas = async (filter) => {
    try {
        const response = await axios.post(`${BASE_URL}/filter`, filter, {
            headers: getHeaders()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

//Tratamento dos dados
const transformDataForAPI = (data) => {
    return {
        are_AreaId_IN: Number(data.Area) || null,
        are_Nome_VC: data.Nome || "",
        are_Descricao_VC: data.Descricao || "",
    };
};

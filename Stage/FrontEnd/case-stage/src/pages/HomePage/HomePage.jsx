/*
 * Caminho do Arquivo: .\Stage\FrontEnd\case-stage\src\pages\HomePage\HomePage.jsx
 * Descrição: Página inicial do aplicativo, apresentando um painel de informações, gráficos e uma árvore de áreas e processos.
 * Autor: José Inácio Saletti Castro Silva
 * Data de Criação: 16/10/2023
 */

import React, { useEffect, useState } from 'react';
import Header from '../../components/molecules/Header';         
import Dashboard from '../../components/organisms/Dashboard';
import AreaTree from '../../components/organisms/areaTree';
import BarChartComponent from '../../components/molecules/BarChartComponent';
import { fetchAreas } from '../../api/area/index';
import { fetchProcesses } from '../../api/process/index';
import './style.css';

function HomePage() {
    // Estados para armazenar as áreas e processos
    const [areas, setAreas] = useState([]);
    const [processes, setProcesses] = useState([]);

    // useEffect é utilizado para buscar as áreas e processos quando o componente é montado
    useEffect(() => {
        const fetchData = async () => {
            const fetchedAreas = await fetchAreas();
            const fetchedProcesses = await fetchProcesses();
            setAreas(fetchedAreas);
            setProcesses(fetchedProcesses);
        };

        fetchData();
    }, []);

    // Calcula o número de processos principais e subprocessos
    const mainProcesses = processes.filter(p => typeof p.ProcessoPai !== 'number').length;
    const subProcesses = processes.length - mainProcesses;

    // Estrutura os dados para serem usados no gráfico de barras
    const data = [
        { name: 'Processos', 'Processos Principais': mainProcesses, 'Subprocessos': subProcesses }
    ];

    return (
        <div>
            <Header title="Home Page" />
            <div className="container">
                
                <div className="info-section">
                    <BarChartComponent data={data} />
                    <Dashboard areaCount={areas.length} processCount={processes.length} />
                </div>
                
                <div className="tree-container">
                    <AreaTree areas={areas} processes={processes} />
                </div>
            </div>
        </div>
    );
}

export default HomePage;

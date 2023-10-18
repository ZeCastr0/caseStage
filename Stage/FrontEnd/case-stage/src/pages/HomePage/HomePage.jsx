/*
 * Caminho do Arquivo: .\Stage\FrontEnd\case-stage\src\pages\HomePage\HomePage.jsx
 * Descrição: Esta é a página inicial do aplicativo. Ela apresenta um painel de informações, 
 * gráficos e uma estrutura de árvore para visualização de áreas e seus respectivos processos.
 * Autor: José Inácio Saletti Castro Silva
 * Data de Criação: 16/10/2023
 */

// Importações necessárias
import React, { useEffect, useState } from 'react';
import Header from '../../components/molecules/Header';                        
import Dashboard from '../../components/organisms/Dashboard';                  
import AreaTree from '../../components/organisms/areaTree';                    
import BarChartComponent from '../../components/molecules/BarChartComponent';  
import { fetchAreas } from '../../api/area/index';                             
import { fetchProcesses } from '../../api/process/index';                      
import './style.css';                                                          

function HomePage() {
    // Estados para armazenar as informações das áreas e dos processos
    const [areas, setAreas] = useState([]);
    const [processes, setProcesses] = useState([]);

    // Ao montar o componente, busca-se as áreas e processos utilizando a API
    useEffect(() => {
        const fetchData = async () => {
            const fetchedAreas = await fetchAreas();
            const fetchedProcesses = await fetchProcesses();
            setAreas(fetchedAreas);
            setProcesses(fetchedProcesses);
        };

        fetchData();
    }, []);

    // Separa os processos em principais e subprocessos
    const mainProcesses = processes.filter(p => typeof p.ProcessoPai !== 'number').length;
    const subProcesses = processes.length - mainProcesses;

    // Estruturação dos dados para serem apresentados no gráfico de barras
    const data = [
        { name: 'Processos', 'Processos Principais': mainProcesses, 'Subprocessos': subProcesses }
    ];

    // Renderização da página
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

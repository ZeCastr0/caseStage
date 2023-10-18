/*
 * Arquivo: .\Stage\FrontEnd\case-stage\src\components\organisms\areaTree.jsx
 * Descrição: Este componente é um "organismo" reutilizável chamado AreaTree. Ele representa
 *            uma visualização hierárquica das áreas e seus respectivos processos, possibilitando
 *            expandir e colapsar cada item da árvore. Foi projetado para fornecer uma representação
 *            clara das relações entre áreas e processos.
 * 
 * Autor: José Inácio Saletti Castro Silva
 * Data de Criação: 16/10/2023
 */

import React from 'react';
import { TreeView, TreeItem } from '@mui/x-tree-view';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './style/AreaTree.css'; 

/**
 * Verifica se um processo possui subprocessos.
 * @param {number} id - ID do processo.
 * @param {Array} processes - Lista de processos.
 * @returns {boolean} Retorna verdadeiro se o processo possui subprocessos, caso contrário, falso.
 */
const hasChildProcesses = (id, processes) => {
    return processes.some(p => p.ProcessoPai === id);
};


/**
 * Verifica se uma área possui processos associados.
 * @param {number} areaId - ID da área.
 * @param {Array} processes - Lista de processos.
 * @returns {boolean} Retorna verdadeiro se a área possui processos associados, caso contrário, falso.
 */
const areaHasProcesses = (areaId, processes) => {
    return processes.some(p => p.AreaId === areaId && typeof p.ProcessoPai !== 'number');
};


/**
 * Renderiza de forma recursiva a árvore de processos.
 * @param {number|null} parentProcessId - ID do processo pai.
 * @param {Array} processes - Lista de processos.
 * @param {Array} expanded - Lista de IDs de nós expandidos.
 * @returns {ReactElement} Retorna um conjunto de elementos TreeItem representando a árvore de processos.
 */
const renderProcessTree = (parentProcessId, processes, expanded) => {
    const relevantProcesses = processes.filter(p => {
        if (parentProcessId === null) {
            return typeof p.ProcessoPai !== 'number';
        } else {
            return p.ProcessoPai === parentProcessId;
        }
    });

    return relevantProcesses.map(process => (
        <TreeItem
            key={process.Processo}
            nodeId={process.Processo.toString()}
            label={process.Nome}
            icon={
                hasChildProcesses(process.Processo, processes) ? (
                    <ArrowForwardIosIcon
                        className={`arrow-icon ${
                            expanded.includes(process.Processo.toString()) ? "expanded" : ""
                        }`}
                    />
                ) : null
            }
        >
            {renderProcessTree(process.Processo, processes, expanded)}
        </TreeItem>
    ));
};


/**
 * Componente que renderiza uma árvore de áreas e seus respectivos processos.
 * @param {Array} areas - Lista de áreas.
 * @param {Array} processes - Lista de processos.
 * @returns {ReactElement} Retorna um elemento React representando uma árvore de áreas e processos.
 */
const AreaTree = ({ areas, processes }) => {
    const [expanded, setExpanded] = React.useState([]);

    return (
        <TreeView
            expanded={expanded}
            onNodeToggle={(event, nodeIds) => {
                setExpanded(nodeIds);
            }}
        >
            {areas.map(area => (
                <TreeItem
                    key={area.Area}
                    nodeId={area.Area.toString()}
                    label={area.Nome}
                    icon={
                        areaHasProcesses(area.Area, processes) ? (
                            <ArrowForwardIosIcon
                                className={`arrow-icon ${
                                    expanded.includes(area.Area.toString()) ? "expanded" : ""
                                }`}
                            />
                        ) : null
                    }
                >
                    {renderProcessTree(null, processes.filter(p => p.AreaId === area.Area), expanded)}
                </TreeItem>
            ))}
        </TreeView>
    );
};

export default AreaTree;

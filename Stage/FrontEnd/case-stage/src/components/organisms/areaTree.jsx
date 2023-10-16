/*
 * Caminho do Arquivo: .\Stage\FrontEnd\case-stage\src\components\organisms\areaTree.jsx
 * Descrição: Organismo reutilizável para renderizar uma árvore de áreas e processos.
 * Autor: José Inácio Saletti Castro Silva
 * Data de Criação: 16/10/2023
 */

import React from 'react';
import { TreeView } from '@mui/x-tree-view';
import { TreeItem } from '@mui/x-tree-view';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './style/AreaTree.css'; 

//Verifica se um processo tem subprocessos.
const hasChildProcesses = (id, processes) => {
    return processes.some(p => p.ProcessoPai === id);
};

// Verifica se uma área tem processos associados.
const areaHasProcesses = (areaId, processes) => {
    return processes.some(p => p.AreaId === areaId && typeof p.ProcessoPai !== 'number');
};

//Renderiza recursivamente a árvore de processos.
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

// Componente que renderiza uma árvore de áreas e seus respectivos processos.
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

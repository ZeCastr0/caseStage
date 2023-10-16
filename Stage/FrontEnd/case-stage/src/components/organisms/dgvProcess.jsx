/*
 * Caminho do Arquivo: .\Stage\FrontEnd\case-stage\src\components\organisms\dgvProcess.jsx
 * Descrição: Organismo reutilizável que retorna um DataGridView de processos
 * Autor: José Inácio Saletti Castro Silva
 * Data de Criação: 16/10/2023
 */

import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { fetchProcesses, deleteProcess } from '../../api/process/index.js';
import AtomicButton from '../atoms/button.jsx';

const columns = [
  { field: 'Processo', headerName: 'ID', width: 90 },
  { field: 'Nome', headerName: 'Nome', width: 150, editable: false },
  { field: 'Descricao', headerName: 'Descrição', width: 300, editable: false },
  { field: 'ProcessoPai', headerName: 'Processo Pai', width: 150, editable: false },
  { field: 'Ferramenta', headerName: 'Ferramenta', width: 150, editable: false },
  { field: 'Area', headerName: 'Area', width: 150, editable: false }
];

// Hook personalizado para carregar processos, caso receba o refreshKey ele faz o recarregamento dos dados
const useProcesses = (refreshKey) => {
  const [processes, setProcesses] = React.useState([]);
  
  React.useEffect(() => {
    const load = async () => {
      try {
        //Chama o metodo GET
        const data = await fetchProcesses();
        const mappedData = data.map(item => ({
          ...item,
          id: item.Processo,
          
          //Tratamento de Nulos
          ...Object.keys(item).reduce((acc, key) => {
            acc[key] = item[key] === null || (typeof item[key] === "object" && Object.keys(item[key]).length === 0) ? "" : item[key];
            return acc;
          }, {})
        }));
        setProcesses(mappedData);
      } catch (error) {
        console.error("Erro ao buscar processos:", error);
      }
    };

    load();
  }, [refreshKey]);

  return processes;
};

export default function ProcessDataGrid({ onSelect, refreshKey, onRefresh }) {
  const processes = useProcesses(refreshKey);
  const [selectedRows, setSelectedRows] = React.useState([]);

  //Busca o ID do item nas linhas selecionadas(checkbox), para fazer o DELETE
  const handleDelete = async () => {
    try {
      await Promise.all(selectedRows.map(rowId => deleteProcess(rowId)));
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error("Erro ao deletar processos:", error);
    }
  };

  //Para preencehr o FORM com as informaçoes do GRID
  const handleRowClick = (params) => {
    if (typeof onSelect === 'function') {
      const selectedData = {
        ...params.row,
        Area: params.row.AreaId,
        ProcessoPai: params.row.ProcessoPai 
      };
      onSelect(selectedData);
    } else {
      console.warn('onSelect não foi passado como uma função para ProcessDataGrid');
    }
  };

  //Retorna o GRID preenchido
  return (
    <Box sx={{ height: '70vh', width: '100%' }}>
      <DataGrid
        rows={processes}
        columns={columns}
        onRowClick={handleRowClick}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={(selectionModel) => {
          setSelectedRows(selectionModel);
        }}
      />
      <AtomicButton variant="contained" color="secondary" onClick={handleDelete}>
        Deletar Selecionados
      </AtomicButton>
      
    </Box>
  );
}


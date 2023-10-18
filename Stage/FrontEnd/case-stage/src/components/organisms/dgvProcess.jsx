/*
 * Arquivo: .\Stage\FrontEnd\case-stage\src\components\organisms\dgvProcess.jsx
 * Descrição: Este organismo reutilizável é responsável por renderizar um DataGridView
 *            (DGV) para processos. Ele permite aos usuários visualizar uma lista de 
 *            processos, selecionar processos específicos e também deletar processos 
 *            selecionados.
 * 
 * Autor: José Inácio Saletti Castro Silva
 * Data de Criação: 16/10/2023
 */

// Importações de bibliotecas e componentes
import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { fetchProcesses, deleteProcess } from '../../api/process/index.js';
import AtomicButton from '../atoms/button.jsx';

// Colunas para o DataGridView de processos
const columns = [
  { field: 'Processo', headerName: 'ID', width: 90 },
  { field: 'Nome', headerName: 'Nome', width: 150, editable: false },
  { field: 'Descricao', headerName: 'Descrição', width: 300, editable: false },
  { field: 'ProcessoPai', headerName: 'Processo Pai', width: 150, editable: false },
  { field: 'Ferramenta', headerName: 'Ferramenta', width: 150, editable: false },
  { field: 'Area', headerName: 'Área', width: 150, editable: false }
];

/**
 * Hook personalizado para buscar e tratar processos.
 * 
 * @param {number|string} refreshKey - Uma chave que, quando alterada, causa uma nova busca dos processos.
 * @returns {Array} Retorna uma lista de processos.
 */
const useProcesses = (refreshKey) => {
  const [processes, setProcesses] = React.useState([]);
  
  React.useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProcesses();
        const mappedData = data.map(item => ({
          ...item,
          id: item.Processo,
          
          // Tratamento de campos nulos ou objetos vazios
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

/**
 * Componente principal: ProcessDataGrid
 * 
 * @param {Function} onSelect - Função a ser chamada quando uma linha é clicada.
 * @param {number|string} refreshKey - Chave que indica quando os dados devem ser atualizados.
 * @param {Function} onRefresh - Função a ser chamada após a deleção de um processo.
 * @returns {ReactElement} Retorna um elemento React contendo o DataGridView e o botão de exclusão.
 */
export default function ProcessDataGrid({ onSelect, refreshKey, onRefresh }) {
  const processes = useProcesses(refreshKey);
  const [selectedRows, setSelectedRows] = React.useState([]);

  // Manipulador para deletar processos selecionados
  const handleDelete = async () => {
    try {
      await Promise.all(selectedRows.map(rowId => deleteProcess(rowId)));
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error("Erro ao deletar processos:", error);
    }
  };

  // Manipulador para retornar dados do processo selecionado
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

  // Renderização do DataGridView com botão de exclusão
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

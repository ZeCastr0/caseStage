/*
 * Arquivo: .\Stage\FrontEnd\case-stage\src\components\organisms\dgvArea.jsx
 * Descrição: Este organismo reutilizável é responsável por renderizar um DataGridView
 *            (DGV) para áreas. Ele permite aos usuários visualizar uma lista de áreas,
 *            selecionar áreas específicas e também deletar áreas selecionadas.
 * 
 * Autor: José Inácio Saletti Castro Silva
 * Data de Criação: 16/10/2023
 */

import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { fetchAreas, deleteArea } from '../../api/area/index.js';
import AtomicButton from '../atoms/button.jsx';

// Colunas para o DataGridView de áreas
const columns = [
  { field: 'Area', headerName: 'ID', width: 90 },
  { field: 'Nome', headerName: 'Nome', width: 150, editable: false },
  { field: 'Descricao', headerName: 'Descrição', width: 300, editable: false },
];


/**
 * Hook personalizado para buscar e tratar áreas.
 * 
 * @param {number|string} refreshKey - Uma chave que, quando alterada, causa uma nova busca das áreas.
 * @returns {Array} Retorna uma lista de áreas.
 */
const useAreas = (refreshKey) => {
  const [areas, setAreas] = React.useState([]);

  React.useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchAreas();
        const mappedData = data.map(item => ({
          ...item,
          id: item.Area,

          // Tratamento de campos nulos ou objetos vazios
          ...Object.keys(item).reduce((acc, key) => {
            acc[key] = item[key] === null || (typeof item[key] === "object" && Object.keys(item[key]).length === 0) ? "" : item[key];
            return acc;
          }, {})
        }));
        setAreas(mappedData);
      } catch (error) {
        console.error("Erro ao buscar Áreas:", error);
      }
    };

    load();
  }, [refreshKey]);

  return areas;
};


/**
 * Componente principal: AreasDataGrid
 * 
 * @param {Function} onSelect - Função a ser chamada quando uma linha é clicada.
 * @param {number|string} refreshKey - Chave que indica quando os dados devem ser atualizados.
 * @param {Function} onRefresh - Função a ser chamada após a deleção de uma área.
 * @returns {ReactElement} Retorna um elemento React contendo o DataGridView e o botão de exclusão.
 */
export default function AreasDataGrid({ onSelect, refreshKey, onRefresh }) {
  const areas = useAreas(refreshKey);
  const [selectedRows, setSelectedRows] = React.useState([]);

  // Manipulador para deletar áreas selecionadas
  const handleDelete = async () => {
    try {
      await Promise.all(selectedRows.map(rowId => deleteArea(rowId)));
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error("Erro ao deletar áreas: ", error);
    }
  };

  // Manipulador para retornar dados da área selecionada
  const handleRowClick = (params) => {
    if (typeof onSelect === 'function') {
      const selectedData = {
        ...params.row,
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
        rows={areas}
        columns={columns}
        onRowClick={handleRowClick}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
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

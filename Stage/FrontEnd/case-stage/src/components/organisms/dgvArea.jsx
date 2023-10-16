/*
 * Caminho do Arquivo: .\Stage\FrontEnd\case-stage\src\components\organisms\dgvArea.jsx
 * Descrição: Organismo reutilizável que retorna um DataGridView de area
 * Autor: José Inácio Saletti Castro Silva
 * Data de Criação: 16/10/2023
 */



import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { fetchAreas, deleteArea } from '../../api/area/index.js';
import AtomicButton from '../atoms/button.jsx';

const columns = [
  { field: 'Area', headerName: 'ID', width: 90 },
  { field: 'Nome', headerName: 'Nome', width: 150, editable: false },
  { field: 'Descricao', headerName: 'Descrição', width: 300, editable: false },
];


// Hook personalizado para carregar areas, caso receba o refreshKey ele faz o recarregamento dos dados
const useAreas = (refreshKey) => {
  const [areas, setAreas] = React.useState([]);

  React.useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchAreas();
        const mappedData = data.map(item => ({
          ...item,
          id: item.Area,

          //Tratamento de Nulos
          ...Object.keys(item).reduce((acc, key) => {
            acc[key] = item[key] === null || (typeof item[key] === "object" && Object.keys(item[key]).length === 0) ? "" : item[key];
            return acc;
          }, {})
        }))
        setAreas(mappedData);
      } catch (error) {
        console.error("Erro ao buscar Areas:", error);
      }
    };

    load();
  }, [refreshKey]);

  return areas
}


export default function AreasDataGrid({ onSelect, refreshKey, onRefresh }) {
  const areas = useAreas(refreshKey);
  const [selectedRows, setSelectedRows] = React.useState([]);

  //Busca o ID do item nas linhas selecionadas(checkbox), para fazer o DELETE
  const handleDelete = async () => {
    try {
      await Promise.all(selectedRows.map(rowId => deleteArea(rowId)));
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error("Erro ao deletar aras: ", error)
    }
  };

  //Para preencehr o FORM com as informaçoes do GRID
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

  //Retorna o GRID preenchido
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

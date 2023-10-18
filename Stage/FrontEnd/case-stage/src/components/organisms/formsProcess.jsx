/*
 * Arquivo: .\Stage\FrontEnd\case-stage\src\components\organisms\formsProcess.jsx
 * Descrição: Este organismo reutilizável é responsável por renderizar um formulário
 *            relacionado ao "Processo". Permite aos usuários inserir e editar informações
 *            de processos e também possui funcionalidades para limpar o 
 *            formulário e salvar os dados inseridos. Ele também carrega dados 
 *            relacionados a processos e áreas de uma API.
 * 
 * Autor: José Inácio Saletti Castro Silva
 * Data de Criação: 16/10/2023
 */

import * as React from 'react';
import Box from '@mui/material/Box';
import { fetchAreas } from '../../api/area/index.js';
import { fetchProcesses } from '../../api/process/index.js';
import AtomicButton from '../atoms/button.jsx';
import FieldGroup from '../molecules/FieldGroup.jsx';
import DropdownFieldGroup from '../molecules/DropdownFieldGroup.jsx';

/**
 * Hook para carregar dados de processos
 * 
 * @param {any} refreshKey - Chave de atualização para recarregar os processos.
 * @returns {Array} Lista de processos.
 */
const useProcesses = (refreshKey) => {
  const [processes, setProcesses] = React.useState([]);

  React.useEffect(() => {
    const load = async () => {
      try {
        const processData = await fetchProcesses();
        setProcesses(processData);
      } catch (error) {
        console.error("Erro ao buscar processos:", error);
      }
    };

    load();
  }, [refreshKey]);

  return processes;
};

/**
 * Hook para carregar dados de áreas.
 * 
 * @returns {Array} Lista de áreas.
 */
const useAreas = () => {
  const [areas, setAreas] = React.useState([]);

  React.useEffect(() => {
    const load = async () => {
      try {
        const areasData = await fetchAreas();
        setAreas(areasData);
      } catch (error) {
        console.error("Erro ao buscar áreas:", error);
      }
    };

    load();
  }, []);

  return areas;
};

/**
 * Componente FormProcess
 * 
 * @param {Object} initialData - Dados iniciais para preencher o formulário.
 * @param {Function} onSave - Função callback invocada para salvar os dados do formulário.
 * @param {any} refreshKey - Chave de atualização para recarregar os dados.
 * @returns {ReactElement} Retorna um elemento React contendo o formulário para Processo.
 */
export default function FormProcess({ initialData, onSave, refreshKey }) {
  const [formData, setFormData] = React.useState(initialData || {});
  const areas = useAreas();
  const processes = useProcesses(refreshKey);

  // Atualiza formData toda vez que initialData é alterado.
  React.useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  // Atualiza formData com base no input do usuário.
  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData(prevState => ({ ...prevState, [id]: value }));
  };

  // Atualiza o campo de área com base na seleção do dropdown.
  const handleAreaChange = (event) => {
    const selectedName = event.target.value;
    const matchingArea = areas.find(area => area.Nome === selectedName);
    setFormData(prevState => ({ ...prevState, Area: matchingArea ? matchingArea.Area : "" }));
  };

  // Atualiza o campo de processo pai com base na seleção do dropdown.
  const handleProcessChange = (event) => {
    setFormData(prevState => ({ ...prevState, ProcessoPai: event.target.value }));
  };

  // Limpa os campos do formulário.
  const handleClear = () => setFormData({});

  // Salva os dados do formulário utilizando o callback onSave.
  const handleSave = async () => {
    await onSave(formData);
  };

  const selectedAreaName = areas.find(area => area.Area === formData.Area)?.Nome || "";
  const dropdownOptions = areas.map(area => ({ value: area.Area, label: area.Nome }));
  const processOptions = [{ value: "", label: "" }, ...processes.map(process => ({ value: process.Processo, label: process.Processo.toString() }))];

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: { xs: '90%', sm: '70%', md: '50%', lg: '40%', xl: '30ch' }},
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <FieldGroup
          id="Processo"
          label="ID"
          value={formData.Processo || ""}
          onChange={handleChange}
          disabled
        />
        <FieldGroup
          required
          id="Nome"
          label="Nome"
          value={formData.Nome || ""}
          onChange={handleChange}
        />
        <FieldGroup
          id="Descricao"
          label="Descrição"
          value={formData.Descricao || ""}
          onChange={handleChange}
        />
        <DropdownFieldGroup
          id="ProcessoPai"
          label="Processo Pai"
          value={String(formData.ProcessoPai || "")}
          onChange={handleProcessChange}
          options={processOptions}
        />
        <FieldGroup
          id="Ferramenta"
          label="Ferramenta"
          value={formData.Ferramenta || ""}
          onChange={handleChange}
        />
        <DropdownFieldGroup
          required
          id="Area"
          label="Area"
          value={selectedAreaName}
          onChange={handleAreaChange}
          options={dropdownOptions}
        />
        <div>
          <AtomicButton variant="contained" color="primary" onClick={handleSave}>
            {formData.Processo ? "Atualizar" : "Criar"}
          </AtomicButton>
          <AtomicButton variant="outlined" color="secondary" onClick={handleClear}>
            Novo
          </AtomicButton>
        </div>
      </div>
    </Box>
  );
}

/*
 * Arquivo: .\Stage\FrontEnd\case-stage\src\components\organisms\formsArea.jsx
 * Descrição: Este organismo reutilizável é responsável por renderizar um formulário
 *            relacionado à "Área". Ele permite aos usuários inserir e editar informações
 *            relacionadas à área e também possui funcionalidades para limpar o 
 *            formulário e salvar os dados inseridos.
 * 
 * Autor: José Inácio Saletti Castro Silva
 * Data de Criação: 16/10/2023
 */

import * as React from 'react';
import Box from '@mui/material/Box';
import AtomicButton from '../atoms/button.jsx';
import FieldGroup from '../molecules/FieldGroup.jsx';

/**
 * Componente FormArea
 * 
 * @param {Object} initialData - Dados iniciais para preencher o formulário.
 * @param {Function} onSave - Função callback invocada para salvar os dados do formulário.
 * @returns {ReactElement} Retorna um elemento React contendo o formulário para Área.
 */
export default function FormArea({ initialData, onSave }) {
  const [formData, setFormData] = React.useState(initialData || {});

  // Atualiza formData toda vez que initialData é alterado.
  React.useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  /**
   * Atualiza formData com base no input do usuário.
   * 
   * @param {Event} event - Evento originado do campo alterado.
   */
  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData(prevState => ({ ...prevState, [id]: value }));
  };

  // Limpa os campos do formulário.
  const handleClear = () => setFormData({});

  //Salva os dados do formulário utilizando o callback onSave.
  const handleSave = async () => {
    await onSave(formData);
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': {
          m: 1, width: { xs: '90%', sm: '70%', md: '50%', lg: '40%', xl: '30ch' }
        },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <FieldGroup
          id="Area"
          label="ID"
          value={formData.Area || ""}
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
          required
          id="Descricao"
          label="Descrição"
          value={formData.Descricao || ""}
          onChange={handleChange}
        />
        <div>
          <AtomicButton variant="contained" color="primary" onClick={handleSave}>
            {formData.Area ? "Atualizar" : "Criar"}
          </AtomicButton>
          <AtomicButton variant="outlined" color="secondary" onClick={handleClear}>
            Novo
          </AtomicButton>
        </div>
      </div>
    </Box>
  );
}

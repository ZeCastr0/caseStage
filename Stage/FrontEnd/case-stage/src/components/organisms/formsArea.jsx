/*
 * Caminho do Arquivo: .\Stage\FrontEnd\case-stage\src\components\organisms\formsArea.jsx
 * Descrição: Organismo reutilizável 
 * Autor: José Inácio Saletti Castro Silva
 * Data de Criação: 16/10/2023
 */


import * as React from 'react';
import Box from '@mui/material/Box';
import AtomicButton from '../atoms/button.jsx';
import FieldGroup from '../molecules/FieldGroup.jsx';

export default function FormArea({ initialData, onSave }) {
  const [formData, setFormData] = React.useState(initialData || {});

   //O efeito tem o objetivo de atualizar o estado formData toda vez que a propriedade initialData for modificada.
  React.useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);


  //Atualiza o valor do formData com base nas mudanças do campo
  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData(prevState => ({ ...prevState, [id]: value }));
  };

  //Limpa os campos do formulário.
  const handleClear = () => setFormData({});

  //Invoca a função de salvar do componente pai com os dados atuais do formulário.
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
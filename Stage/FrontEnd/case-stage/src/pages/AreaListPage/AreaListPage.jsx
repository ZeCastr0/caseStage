/*
 * Caminho do Arquivo: .\Stage\FrontEnd\case-stage\src\pages\AreaListPage\AreaListPage.jsx
 * Descrição: Página destinada ao gerenciamento de áreas. Apresenta um formulário para criar ou editar áreas e uma grade de dados para exibir todas as áreas.
 * Autor: José Inácio Saletti Castro Silva
 * Data de Criação: 16/10/2023
 */

import * as React from 'react';
import FormArea from '../../components/organisms/formsArea.jsx';        
import AreasDataGrid from '../../components/organisms/dgvArea.jsx';     
import { addOrUpdateArea } from '../../api/area/index.js';              
import Header from '../../components/molecules/Header';                 
import './style.css';                                                   

export default function AreaListPage() {
    // Estado que armazena a área selecionada na grade de dados para edição
    const [selectedArea, setSelectedArea] = React.useState(null);
    
    // Estado usado para forçar a atualização/recarregamento da grade de dados
    const [refreshKey, setRefreshKey] = React.useState(0);

    // Função para salvar a área criada ou editada
    const handleSave = async (formData) => {
        try {
            await addOrUpdateArea(formData);
            setRefreshKey(prevKey => prevKey + 1);  // Atualiza a chave de atualização para recarregar a grade de dados
            if (formData.area) {
                console.log("Area atualizada com sucesso!");
            } else {
                console.log("Novo Area criada com sucesso!");
            }
        } catch (error) {
            console.error("Erro ao gravar Area:", error);
        }
    };

    // Função para atualizar/recarregar a grade de dados
    const handleRefresh = () => {
        setRefreshKey(prevKey => prevKey + 1);
    };

    return (
        <div>
            <Header title="Areas" />
            
            <div className='center-content'>
     
                <div className='form'>
                    <FormArea initialData={selectedArea} onSave={handleSave} />
                </div>
                
                <div className='grid'>
                    <AreasDataGrid onSelect={setSelectedArea} refreshKey={refreshKey} onRefresh={handleRefresh} />
                </div>
            </div>
        </div>
    );
}

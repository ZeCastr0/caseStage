/*
 * Caminho do Arquivo: .\Stage\FrontEnd\case-stage\src\pages\AreaListPage\AreaListPage.jsx
 * Descrição: Esta página é destinada ao gerenciamento de áreas. Ela apresenta um formulário para criar ou editar áreas 
 * e também uma grade de dados que exibe todas as áreas registradas.
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
    // Estado para armazenar a área selecionada na grade de dados. Útil para edição.
    const [selectedArea, setSelectedArea] = React.useState(null);
    
    // Estado usado como um "gatilho" para forçar a atualização/recarregamento da grade de dados.
    const [refreshKey, setRefreshKey] = React.useState(0);

    // Função responsável por salvar ou atualizar uma área.
    const handleSave = async (formData) => {
        try {
            await addOrUpdateArea(formData);
            // Incrementa a chave de atualização para recarregar a grade de dados
            setRefreshKey(prevKey => prevKey + 1);  
            if (formData.area) {
                console.log("Área atualizada com sucesso!");
            } else {
                console.log("Nova área criada com sucesso!");
            }
        } catch (error) {
            console.error("Erro ao gravar área:", error);
        }
    };

    // Função responsável por recarregar a grade de dados.
    const handleRefresh = () => {
        setRefreshKey(prevKey => prevKey + 1);
    };

    // Renderização da página
    return (
        <div>
            <Header title="Áreas" />
            
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

/*
 * Caminho do Arquivo: .\Stage\FrontEnd\case-stage\src\pages\ProcessListPage\ProcessListPage.jsx
 * Descrição: Esta é a página destinada à gestão de processos. Ela oferece recursos para criação, atualização 
 * e visualização de processos através de um formulário e uma grade de dados.
 * Autor: José Inácio Saletti Castro Silva
 * Data de Criação: 16/10/2023
 */

import React from 'react';
import FormProcess from '../../components/organisms/formsProcess';         
import ProcessDataGrid from '../../components/organisms/dgvProcess';       
import { addOrUpdateProcess } from '../../api/process';                    
import Header from '../../components/molecules/Header';                    
import './style.css';                                                      

function ProcessPage() {
    // Estado para gerenciar o processo selecionado na grade de dados para edição
    const [selectedProcess, setSelectedProcess] = React.useState(null);
    
    // Estado para controlar a atualização/recarregamento da grade de dados
    const [refreshKey, setRefreshKey] = React.useState(0);

    // Função responsável por salvar ou atualizar os detalhes de um processo
    const handleSave = async (formData) => {
        try {
            await addOrUpdateProcess(formData);
            setRefreshKey(prevKey => prevKey + 1);  // Força o recarregamento da grade de dados
            if (formData.Processo) {
                console.log("Processo atualizado com sucesso!");
            } else {
                console.log("Novo processo criado com sucesso!");
            }
        } catch (error) {
            console.error("Erro ao gravar processo:", error);
        }
    };

    // Função para atualizar/recarregar a grade de dados
    const handleRefresh = () => {
        setRefreshKey(prevKey => prevKey + 1);
    };

    // Renderização da página
    return (
        <div>
            <Header title="Processos" />
            <div className='center-content'>

                <div className='form'>
                    <FormProcess initialData={selectedProcess} onSave={handleSave} refreshKey={refreshKey} />
                </div>
                <div className='grid'>
                    <ProcessDataGrid onSelect={setSelectedProcess} refreshKey={refreshKey} onRefresh={handleRefresh} />
                </div>
            </div>
        </div>
    );
}

export default ProcessPage;

/*
 * Caminho do Arquivo: .\Stage\FrontEnd\case-stage\src\pages\ProcessListPage\ProcessListPage.jsx
 * Descrição: Página destinada à gestão de processos, permitindo a criação, atualização e visualização de processos.
 * Autor: José Inácio Saletti Castro Silva
 * Data de Criação: 16/10/2023
 */

// Importações dos módulos e componentes necessários
import React from 'react';
import FormProcess from '../../components/organisms/formsProcess';
import ProcessDataGrid from '../../components/organisms/dgvProcess';
import { addOrUpdateProcess } from '../../api/process';
import Header from '../../components/molecules/Header'
import './style.css';

function ProcessPage() {
    // Estados para armazenar o processo selecionado e controlar a atualização da grid
    const [selectedProcess, setSelectedProcess] = React.useState(null);
    const [refreshKey, setRefreshKey] = React.useState(0);

    // Função para salvar ou atualizar um processo
    const handleSave = async (formData) => {
        try {
            await addOrUpdateProcess(formData);
            setRefreshKey(prevKey => prevKey + 1);
            if (formData.Processo) {
                console.log("Processo atualizado com sucesso!");
            } else {
                console.log("Novo processo criado com sucesso!");
            }
        } catch (error) {
            console.error("Erro ao gravar processo:", error);
        }
    };

    // Função para forçar a atualização da lista de processos na grid
    const handleRefresh = () => {
        setRefreshKey(prevKey => prevKey + 1);
    };

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

/*
 * Nome do Arquivo: ProcessoController.cs
 * Descrição: Este arquivo contém a definição do controlador de processos, responsável por gerenciar 
 *            operações CRUD relacionadas a processos via API, incluindo inserção, atualização, exclusão e listagem.
 * Autor: José Inácio Saletti Castro Silva
 * Data de Criação: 16/10/2023
 */

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using StageAPI.Models;

namespace StageAPI.Controllers
{
    [Route("api/processo")]
    [ApiController]
    public class ProcessoController : ControllerBase
    {
        //Provê acesso aos dados de configuração da aplicação.
        private readonly IConfiguration _configuration;

        // Construtor que inicializa a instância de IConfiguration.
        public ProcessoController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // Função privada para validar o token fornecido no cabeçalho Authorization.
        private bool IsValidToken(string? token)
        {
            var validToken = _configuration["ValidToken"];
            return token == validToken;
        }

        // Função privada para recuperar o token fornecido no cabeçalho Authorization.
        private string GetTokenFromHeader()
        {
            var token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last() ?? string.Empty;
            return token;
        }



        // Endpoint POST para inserir ou atualizar um processo no banco de dados.
        // Utiliza uma stored procedure chamada 'usp_InserirOuAtualizarProcesso'.
        //--------------------------------------------------------------------------------
        [HttpPost]
        public IActionResult InserirOuAtualizarProcesso([FromBody] ProcessoModel processo)
        {
            var token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            if (string.IsNullOrEmpty(token) || !IsValidToken(token))
            {
                return Unauthorized();
            }

            string connectionString = _configuration.GetConnectionString("DefaultConnection");
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand("usp_InserirOuAtualizarProcesso", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ProcessoId_IN", processo.prc_ProcessoId_IN);
                    cmd.Parameters.AddWithValue("@Nome_VC", processo.prc_Nome_VC);
                    cmd.Parameters.AddWithValue("@Descricao_VC", processo.prc_Descricao_VC);
                    cmd.Parameters.AddWithValue("@ProcessoPaiId_IN", processo.prc_ProcessoPaiId_IN);
                    cmd.Parameters.AddWithValue("@Ferramenta_VC", processo.prc_Ferramenta_VC);
                    cmd.Parameters.AddWithValue("@Area_IN", processo.prc_AreaId_IN);

                    cmd.ExecuteNonQuery();
                }
                conn.Close();
            }
            return Ok();
        }


        // Endpoint DELETE para excluir um processo por ID.
        // Utiliza uma stored procedure chamada 'usp_ExcluirProcesso'.
        //--------------------------------------------------------------------------------
        [HttpDelete("{id}")]
        public IActionResult ExcluirProcesso(int id)
        {
            var token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            if (string.IsNullOrEmpty(token) || !IsValidToken(token))
            {
                return Unauthorized();
            }

            string connectionString = _configuration.GetConnectionString("DefaultConnection");
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand("usp_ExcluirProcesso", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ProcessoId_IN", id);
                        
                    cmd.ExecuteNonQuery();
                }
                conn.Close();
            }
            return Ok();
        }


        // Endpoint POST para selecionar processos com base em um filtro.
        // Utiliza uma stored procedure chamada 'usp_SelecionarProcesosPorFiltro'.
        //--------------------------------------------------------------------------------
        [HttpPost("filter")]
        public IActionResult SelecionarProcessosPorFiltro([FromBody] ProcessoModel processo)
        {

            var token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            if (string.IsNullOrEmpty(token) || !IsValidToken(token))
            {
                return Unauthorized();
            }

            DataTable dt = new DataTable();
            string connectionString = _configuration.GetConnectionString("DefaultConnection");
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand("usp_SelecionarProcesosPorFiltro", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ProcessoId_IN", processo.prc_ProcessoId_IN);
                    cmd.Parameters.AddWithValue("@Nome_VC", processo.prc_Nome_VC);
                    cmd.Parameters.AddWithValue("@Descricao_VC", processo.prc_Descricao_VC);
                    cmd.Parameters.AddWithValue("@ProcessoPaiId_IN", processo.prc_ProcessoPaiId_IN);
                    cmd.Parameters.AddWithValue("@Ferramenta_VC", processo.prc_Ferramenta_VC);
                    cmd.Parameters.AddWithValue("@Area_IN", processo.prc_AreaId_IN);

                    SqlDataAdapter da = new SqlDataAdapter(cmd);
                    da.Fill(dt);
                }
                conn.Close();
            }
            // Convertendo DataTable para uma Lista de Dicionários
            var list = new List<Dictionary<string, object>>();
            foreach (DataRow row in dt.Rows)
            {
                var dict = new Dictionary<string, object>();
                foreach (DataColumn col in dt.Columns)
                {
                    dict[col.ColumnName] = row[col];
                }
                list.Add(dict);
            }
            return Ok(list);
        }

        // Endpoint GET para recuperar todos os processos.
        // Utiliza uma stored procedure chamada 'usp_SelecionarProcesos'.
        //--------------------------------------------------------------------------------
        [HttpGet]
        public IActionResult SelecionarProcesos()
        {
            var token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            if (string.IsNullOrEmpty(token) || !IsValidToken(token))
            {
                return Unauthorized();
            }
                
            DataTable dt = new DataTable();
            string connectionString = _configuration.GetConnectionString("DefaultConnection");
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand("usp_SelecionarProcesos", conn))
                {
                    SqlDataAdapter da = new SqlDataAdapter(cmd);
                    da.Fill(dt);
                }
                conn.Close();
            }

            // Convertendo DataTable para uma Lista de Dicionários
            var list = new List<Dictionary<string, object>>();
            foreach (DataRow row in dt.Rows)
            {
                var dict = new Dictionary<string, object>();
                foreach (DataColumn col in dt.Columns)
                {
                    dict[col.ColumnName] = row[col];
                }
                list.Add(dict);
            }
            return Ok(list);

        }
    }
}

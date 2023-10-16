/*
 * Nome do Arquivo: ProcessoController.cs
 * Descrição: Este arquivo contém as chamadas dos memtodos relacionado a processos.
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


        public ProcessoController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private bool IsValidToken(string? token)
        {
            var validToken = _configuration["ValidToken"];
            return token == validToken;
        }

        private string GetTokenFromHeader()
        {
            var token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last() ?? string.Empty;
            return token;
        }



        //Metodo Post insert na tabela de acordo com os parametros passados
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


        //Metodo DELETE, apaga por ID
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


        //Metodo Post(Porque passsa parametros) que faz um SELECT filtrado de acordo com os parametros
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

        //GET GERAL
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

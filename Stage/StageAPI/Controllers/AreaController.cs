/*
 * Nome do Arquivo: AreaController.cs
 * Descrição: Este arquivo provê os endpoints da API relacionados às Áreas.
 * Autor: José Inácio Saletti Castro Silva
 * Data de Criação: 16/10/2023
 */

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using StageAPI.Models;

namespace StageAPI.Controllers
{
    [Route("api/area")]
    [ApiController]
    public class AreaController : ControllerBase
    {
        //Provê acesso aos dados de configuração da aplicação.
        private readonly IConfiguration _configuration;

        // Construtor para inicialização do objeto de configuração.
        public AreaController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // Verifica se o token fornecido é válido.
        private bool IsValidToken(string? token)
        {
            var validToken = _configuration["ValidToken"];
            return token == validToken;
        }

        // Obtém o token a partir do cabeçalho da requisição.
        private string GetTokenFromHeader()
        {
            var token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last() ?? string.Empty;
            return token;
        }



        // Método POST para inserção ou atualização de uma área com base nos parâmetros fornecidos.
        //--------------------------------------------------------------------------------

        [HttpPost]
        public IActionResult InserirOuAtualizarArea([FromBody]AreaModel area)
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
                using (SqlCommand cmd = new SqlCommand("usp_InserirOuAtualizarAreas", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@AreaId_IN", area.are_AreaId_IN);
                    cmd.Parameters.AddWithValue("@Nome_VC", area.are_Nome_VC);
                    cmd.Parameters.AddWithValue("@Descricao_VC", area.are_Descricao_VC);

                    cmd.ExecuteNonQuery();
                }
                conn.Close();
            }
            return Ok();
        }

        // Método DELETE para exclusão de uma área por ID.
        //--------------------------------------------------------------------------------
        [HttpDelete("{id}")]
        public IActionResult ExcluirArea(int id)
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
                using (SqlCommand cmd = new SqlCommand("usp_ExcluirArea", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@AreaId_IN", id);

                    cmd.ExecuteNonQuery();
                }
                conn.Close();
            }
            return Ok();
        }

        // Método POST para seleção de áreas com base em filtros fornecidos.
        //--------------------------------------------------------------------------------

        [HttpPost("filter")]
        public IActionResult SelecionarAreaPorFiltro([FromBody] AreaModel area)
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
                using (SqlCommand cmd = new SqlCommand("usp_SelecionarAreaPorFiltro", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@AreaId_IN", area.are_AreaId_IN);
                    cmd.Parameters.AddWithValue("@Nome_VC", area.are_Nome_VC);
                    cmd.Parameters.AddWithValue("@Descricao_VC", area.are_Descricao_VC);

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

        // Método GET para seleção de todas as áreas.
        //--------------------------------------------------------------------------------
        [HttpGet]
        public IActionResult SelecionarArea()
        {
            var token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (!IsValidToken(token))
            {
                return Unauthorized();
            }

            DataTable dt = new DataTable();
            string connectionString = _configuration.GetConnectionString("DefaultConnection");
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand("usp_SelecionarArea", conn))
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

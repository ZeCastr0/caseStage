/*
 * Nome do Arquivo: ProcessoController.cs
 * Descrição: Este arquivo contém as chamadas dos memtodos relacionado a Areas.
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

        public AreaController(IConfiguration configuration)
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

        //Metodo DELETE, apaga por ID
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

        //Metodo Post(Porque passsa parametros) que faz um SELECT filtrado de acordo com os parametros
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

        //GET GERAL
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

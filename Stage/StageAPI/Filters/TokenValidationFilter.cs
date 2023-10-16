/*
 * Nome do Arquivo: TokenValidationFilter.cs
 * Descrição: Este arquivo contém a implementação do filtro de validação de token para ASP.NET Core.
 * Autor: José Inácio Saletti Castro Silva
 * Data de Criação: 16/10/2023
 */

using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Configuration;

public class TokenValidationFilter : IActionFilter
{
    private readonly IConfiguration _configuration;

    //Provê acesso aos dados de configuração da aplicação.
    public TokenValidationFilter(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public void OnActionExecuting(ActionExecutingContext context)
    {
        // Recupera o token do cabeçalho da requisição
        var token = context.HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

        // Recupera o token válido a partir das configurações
        var validToken = _configuration["ValidToken"];

        // Se o token fornecido não corresponder ao token válido, define o resultado como não autorizado (401)
        if (token != validToken)
        {
            context.Result = new Microsoft.AspNetCore.Mvc.UnauthorizedResult();
        }
    }

    //Método vazio que é chamado após a ação do controller ser executada. Não tem implementação neste filtro.
    public void OnActionExecuted(ActionExecutedContext context) { }
}

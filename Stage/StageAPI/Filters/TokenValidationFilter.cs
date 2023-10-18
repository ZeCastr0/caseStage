/*
 * Nome do Arquivo: TokenValidationFilter.cs
 * Descrição: Este arquivo contém a implementação do filtro de validação de token para autenticar e autorizar requisições na API do ASP.NET Core.
 * O filtro compara o token fornecido na requisição com um token válido definido nas configurações da aplicação.
 * Se os tokens não corresponderem, a resposta da API será de não autorizado (HTTP 401).
 * Autor: José Inácio Saletti Castro Silva
 * Data de Criação: 16/10/2023
 */

using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Configuration;

// Classe TokenValidationFilter implementa a interface IActionFilter do ASP.NET Core
public class TokenValidationFilter : IActionFilter
{
    private readonly IConfiguration _configuration;

    // Construtor da classe, que recebe uma instância da interface IConfiguration. 
    // A interface IConfiguration fornece acesso aos dados de configuração da aplicação.
    public TokenValidationFilter(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    // Método invocado antes da ação do controller ser executada.
    public void OnActionExecuting(ActionExecutingContext context)
    {
        // Recupera o token do cabeçalho Authorization da requisição.
        // O formato esperado é "Bearer <token>".
        var token = context.HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

        // Recupera o token válido das configurações da aplicação.
        var validToken = _configuration["ValidToken"];

        // Compara o token fornecido com o token válido.
        // Se não forem iguais, define o resultado da ação como não autorizado (HTTP 401).
        if (token != validToken)
        {
            context.Result = new Microsoft.AspNetCore.Mvc.UnauthorizedResult();
        }
    }

    // Método invocado após a ação do controller ser executada. 
    // No contexto atual do filtro de validação de token, não é necessário implementar nenhuma lógica neste método.
    public void OnActionExecuted(ActionExecutedContext context) { }
}

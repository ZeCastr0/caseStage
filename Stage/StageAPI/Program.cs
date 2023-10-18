/*
 * Nome do Arquivo: Program.cs
 * Descrição: Este arquivo inicial da aplicação
 * Autor: José Inácio Saletti Castro Silva
 * Data de Criação: 16/10/2023
 */


// Cria uma nova instância do construtor da aplicação Web.
var builder = WebApplication.CreateBuilder(args);

// Configuração dos serviços a serem utilizados pela aplicação:

// Registra os controladores (Controllers) para o MVC.
builder.Services.AddControllers();

// Registra o serviço para descoberta das endpoints da API.
builder.Services.AddEndpointsApiExplorer();

// Registra o serviço Swagger para documentação da API.
builder.Services.AddSwaggerGen();

// Registra o filtro de validação de token como um serviço. Isso é usado para autenticação e autorização.
builder.Services.AddScoped<TokenValidationFilter>();

// Configura o serviço CORS (Cross-Origin Resource Sharing) e define uma política padrão.
// CORS é usado para permitir que clientes de origens diferentes acessem recursos da API.
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder
            .AllowAnyOrigin()   // Permite qualquer origem.
            .AllowAnyMethod()   // Permite qualquer método HTTP.
            .AllowAnyHeader()   // Permite qualquer header.
            .WithHeaders(Microsoft.Net.Http.Headers.HeaderNames.AccessControlAllowHeaders, "X-Requested-With", "Authorization")
            .WithMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
        });
});

// Constrói a aplicação com as configurações definidas.
var app = builder.Build();

// Configura o uso do Swagger somente em ambientes de desenvolvimento.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();            // Habilita o middleware Swagger.
    app.UseSwaggerUI();          // Habilita a interface do usuário Swagger.
}

// Aplica a política CORS definida.
app.UseCors();

// Habilita o middleware de autorização.
app.UseAuthorization();

// Mapeia os controladores para serem usados como endpoints.
app.MapControllers();

// Inicia a aplicação.
app.Run();

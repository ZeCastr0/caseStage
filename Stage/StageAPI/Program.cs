/*
 * Nome do Arquivo: Program.cs
 * Descri��o: Este arquivo inicial da aplica��o
 * Autor: Jos� In�cio Saletti Castro Silva
 * Data de Cria��o: 16/10/2023
 */


// Cria uma nova inst�ncia do construtor da aplica��o Web.
var builder = WebApplication.CreateBuilder(args);

// Configura��o dos servi�os a serem utilizados pela aplica��o:

// Registra os controladores (Controllers) para o MVC.
builder.Services.AddControllers();

// Registra o servi�o para descoberta das endpoints da API.
builder.Services.AddEndpointsApiExplorer();

// Registra o servi�o Swagger para documenta��o da API.
builder.Services.AddSwaggerGen();

// Registra o filtro de valida��o de token como um servi�o. Isso � usado para autentica��o e autoriza��o.
builder.Services.AddScoped<TokenValidationFilter>();

// Configura o servi�o CORS (Cross-Origin Resource Sharing) e define uma pol�tica padr�o.
// CORS � usado para permitir que clientes de origens diferentes acessem recursos da API.
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder
            .AllowAnyOrigin()   // Permite qualquer origem.
            .AllowAnyMethod()   // Permite qualquer m�todo HTTP.
            .AllowAnyHeader()   // Permite qualquer header.
            .WithHeaders(Microsoft.Net.Http.Headers.HeaderNames.AccessControlAllowHeaders, "X-Requested-With", "Authorization")
            .WithMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
        });
});

// Constr�i a aplica��o com as configura��es definidas.
var app = builder.Build();

// Configura o uso do Swagger somente em ambientes de desenvolvimento.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();            // Habilita o middleware Swagger.
    app.UseSwaggerUI();          // Habilita a interface do usu�rio Swagger.
}

// Aplica a pol�tica CORS definida.
app.UseCors();

// Habilita o middleware de autoriza��o.
app.UseAuthorization();

// Mapeia os controladores para serem usados como endpoints.
app.MapControllers();

// Inicia a aplica��o.
app.Run();

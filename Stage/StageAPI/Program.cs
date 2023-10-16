var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<TokenValidationFilter>();  // Adicionar o filtro como um serviço

// Registra os serviços CORS e define uma política.
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithHeaders(Microsoft.Net.Http.Headers.HeaderNames.AccessControlAllowHeaders, "X-Requested-With", "Authorization") 
            .WithMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
        });
});

var app = builder.Build();

// Configura o HTTP request.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Aplica o CORS .
app.UseCors();
app.UseAuthorization();
app.MapControllers();

app.Run();

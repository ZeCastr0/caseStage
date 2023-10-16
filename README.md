# caseStage
 Controle de Areas/Processos


Iniciando o projeto clonando o repositorio 

### React:

1. **Clonar o Repositório**:
 
   git clone <url-do-repositorio>


2. **Instalar Dependências**:
   Ao entrar na pasta do projeto React (por exemplo, se estiver em uma subpasta chamada "frontend" ou "react-app"):
 
   cd <pasta-do-react>
   npm install


3. **Configuração de Arquivos** (se necessário):
   Se houver arquivos de configuração ignorados no Git, como `.env`, certifique-se de criar/copiar e configurar esses arquivos conforme necessário.

4. **Execução**:
   
   npm start


### ASP.NET Core:

1. **Clonar o Repositório** (se você já não o fez na etapa do React):
   
   git clone <url-do-repositorio>


2. **Restaurar Pacotes NuGet**:
   Ao entrar na pasta do projeto ASP.NET Core (por exemplo, se estiver em uma subpasta chamada "backend" ou "aspnet-app"):
  
   cd <pasta-do-aspnet>
   dotnet restore


3. **Configuração de Arquivos**:
   - Se você ignorou `appsettings.json`, precisa garantir que tenha uma versão desse arquivo com as configurações necessárias.
   - Você pode ter uma versão de exemplo como `appsettings.example.json` no repositório. Após clonar o repositório, você copiaria e renomearia esse arquivo para `appsettings.json` e, em seguida, adicionaria as configurações necessárias.


4. **Build** (opcional, mas pode ajudar a identificar erros de compilação):
   ```bash
   dotnet build
   ```

5. **Execução**:
   ```bash
   dotnet run
   ```

Ao seguir essas etapas para ambas as partes do projeto (React e ASP.NET Core), você deve ter ambos os ambientes configurados e em execução. Se você estiver usando um ambiente de desenvolvimento integrado, como Docker com `docker-compose`, haverá etapas adicionais ou diferentes, mas, para um ambiente padrão, esses são os passos básicos.
# Comunidade wap chat-pipoca

<h4 align="center"> 
	🚧  Chat-pipoca  🚀 Em construção...  🚧
</h4>

#### Configure o ENV

> Renomeie o arquivo .env.example para .env e o edite
> configure a conexão com o banco de dados mySQL/mariaDB


#### Rodando o Back-end (servidor) - ambiente de desenvolvimento

```bash
# Clone o repositório
$ git clone https://github.com/gabriel4g/chat-pipoca.git

# Acesse a pasta do projeto terminal/cmd
$ cd api-calorias

# No windows
chat-pipoca> npm install --global windows-build-tools

# Instale as dependências
$ npm install

# gerando APP_KEY
$ node ace key:generate

# Execute as migrations
$ node ace migration:run

# Executando aplicação
$ npm run dev
```
### Rodando no heroku
```bash
#gerando o projeto
$ npm run build

#crie O arquivo Procfile(*unix like)
$ nano Procfile.txt

#insira os textos mostrados no cat abaixo:
$ cat
release: ENV_SILENT=true node ace migration:run --force
web: ENV_SILENT=true npm start
```

#### Edite O arquivo package.json scripts start
> "start": "ENV_SILENT=true node server.js",
> e configure as variáveis de ambiente no heroku

#### Rotas

> - [X] /login (POST) validação de usuário no BD
> - [X] /register (POST) criação de usuário no BD
> - [ ] /user/delete (POST) rota para deletar usuário do banco de dados
> - [ ] /user/update/:id (GET) rota para editar dados do usuário no banco de dados

#### 🛠 Tecnologias

> - [node.js](https://nodejs.org/en/)
> - [adonisJS/v5](https://adonisjs.com/)
> - [mySQL/mariaDB]


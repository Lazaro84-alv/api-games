# API de Games

Esta API foi desenvolvida no curso de Formação Nodejs na plataforma udemy

## Endpoints

### GET / games
Esse endpoint é responsável por retornar a listagem de todos os games cadastrados no banco de dados.
#### Parametros
Nenhum
#### Respostas
##### OK! 200
Caso essa resposta aconteça irá receber a listagem de todos os games.

Exemplo de resposta:
```
[
	{
		"id": 8,
		"title": "Call of duty MW",
		"year": 2022,
		"price": 60
	},
	{
		"id": 4,
		"title": "Sea of thieves",
		"year": 2021,
		"price": 40
	},
	{
		"id": 2,
		"title": "Minecraft",
		"year": 2020,
		"price": 20
	}
]

```

##### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Token inválido, Token expirado.

Exemplo de resposta:

```
{
	"err": "Token inválido!"
}

```

### POST /auth
Esse endpoint é responsável por executar o processo de login da API.
#### Parametros
email: E-mail do usuário cadastrado no sistema.

password: Senha do usuário cadastrado no sistema, com aquele determinado

Exemplo de resposta:

```

{
	"email": "titacachorra@udemy.com",
	"password": "nodejs<3"
}
```
#### Resposta
##### OK! 200
Caso essa resposta aconteça você vai receber a listagem de todos os games.

```
{
	"token": 	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0aXRhY2FjaG9ycmFAdWRlbXkuY29tIiwiaWF0IjoxNjczNDUxMzcyLCJleHAiOjE2NzM2MjQxNzJ9.HhIyCJLRWabn5oqraUEvGbNlGQovY9HbPzOIGXaU9wE"
}

```

##### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: e-mail ou password incorretos.

Exemplo de resposta:

```
{
	"err": "Credenciais inválidas!"
}
```



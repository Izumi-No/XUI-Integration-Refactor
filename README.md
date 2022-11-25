# XUI-Integration-Refactor

curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
sudo apt-get install -y nodejs

npm rum iniciar:banco
npm rum iniciar:servidor

Configurar ID do revendedor e Autorizacao em configs.ts

Todas as chamadas tem que ter a Autorizacao
Authorization bearrer test123

GET Listar Usuarios
http://95.217.163.120:3000/users/

GET Listar Planos
http://95.217.163.120:3000/plans/

GET Listar Credito
http://95.217.163.120:3000/plans/credits

POST Criar Usuario
http://95.217.163.120:3000/users/
{
 "username": "jucasantos18",
 "password": "123456", 
 "plano": 0
}

POST Atualizar Plano
http://95.217.163.120:3000/users/renew/jucasantos15
{
 "plano": 1
}

PATCH Bloquear Usuario
http://95.217.163.120:3000/users/jucasantos15
{
  "enabled": 1
}

PATCH Bloquear Canais Adultos
http://95.217.163.120:3000/users/jucasantos15
{
  "bouquet": "[1,2,3]"
}

DEL Deletar Usuario
http://95.217.163.120:3000/users/jucasantos15

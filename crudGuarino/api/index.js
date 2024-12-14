const express = require('express')
const cors = require('cors')
const { BodyBuilder } = require('./src/bodybuilder/bodybuilder.entity')
const { Gym } = require('./src/gym/gym.entity')
const req = require('express/lib/request')
const { EstilosDeBodyBuilder } = require('./src/bodybuilderStyle/bodybuilderStyle.entity')
const app = express()
app.use(cors())
const port = 3000
app.use(express.json())

//banco de dados de clientes
var clientes = []

//banco de dados de academias
var academias = []

//banco de dados de estilos
var estilos = []

app.post('/body-builder', (req, res) => {
    //console.log(req.body)
    const data = req.body //receber o bodyBuilder, que é um objeto JSON que vem do front-end

    //pegar o idAcademia e encontrar o objeto da classe Gym
    const idAcademia = data.idAcademia
    const gym = academias.find((gym) => gym.id == idAcademia)
    //após pegar o objeto Gym, vincula-o ao BodyBuilders

    //pegar o idEstilo e encontrar o objeto da classe BpdyBuilderStyle
    const idEstilo = data.idEstilo
    const estilo = estilos.find((estilo) => estilo.id == idEstilo)
    //após pegar o objeto estilo, vincula-o ao BodyBuilders

    let bodyBuilder = new BodyBuilder(data.cpf, data.nome, data.peso, data.altura, data.dataNascimento, estilo, gym)

    //adiciona o bodyBuilder à academia
    // gym.bodyBuilders.push(bodyBuilder)

    clientes.push(bodyBuilder) //adicionar o bodyBuiler no banco de dados
    res.send("Cadastrou")
})

app.put('/body-builder/:cpf', (req, res) => {
  let cpf = req.params.cpf
  for(let i=0; i < clientes.length; i++){
    let cliente = clientes[i]
    if (cliente.cpf == cpf){
      const data = req.body

      //pegar o idAcademia e encontrar o objeto da classe Gym
      const idAcademia = data.idAcademia
      const gym = academias.find((gym) => gym.id == idAcademia)
      //após pegar o objeto Gym, vincula-o ao BodyBuilders

      //pegar o idEstilo e encontrar o objeto da classe BpdyBuilderStyle
      const idEstilo = data.idEstilo
      const estilo = estilos.find((estilo) => estilo.id == idEstilo)
      //após pegar o objeto estilo, vincula-o ao BodyBuilders

      let bodyBuilder = new BodyBuilder(data.cpf, data.nome, data.peso, data.altura, data.dataNascimento, estilo, gym)
      clientes[i] = bodyBuilder
      //substitui o bodyBuilder pelos dados enviados no body
      res.send("Atualizou")
    }
  }
  throw new Error("Body builder nao encontrado")
})

app.delete('/body-builder/:cpf', (req, res) => {
  let cpf = req.params.cpf
  for(let i = 0; i < clientes.length; i++){
      let cliente = clientes[i]
      if (cliente.cpf == cpf){
          clientes.splice(i, 1)
          res.send("Deletou")        
      }
  }
  throw new Error("Cliente nao encontrado")
})

app.get('/body-builder', (req, res) => {
  let busca = req.query.busca
  let clientesFiltrados
  if (busca){ //se a busca for diferente de vazio
    clientesFiltrados = clientes.filter((cliente) => {
      return cliente.nome.toLowerCase().includes(busca.toLowerCase())
      || cliente.cpf.toLowerCase().includes(busca.toLowerCase())
    })
  }else{
    clientesFiltrados = clientes
  }
  res.json(clientesFiltrados)
})

app.post('/gym', (req, res) => {
  const data = req.body
  let gym = new Gym()
  gym.id = academias.lenght + 1
  gym.nome = data.nome
  gym.telefone = data.telefone
  academias.push(gym)
  
  res.status(201).json({ mensagem: "Cadastrado com sucesso", gym: gym });
})

app.get('/gym', (req, res) => {
  res.json(academias)
})

app.post('/estilo-body-builder', (req, res) => {
  const data = req.body;
  let estilo = new EstilosDeBodyBuilder();
  estilo.id = estilos.length + 1;
  estilo.nome = data.nome;
  estilos.push(estilo);

  res.status(201).json({ mensagem: "Cadastrado com sucesso", estilo: estilo });
});

app.get('/estilo-body-builder', (req, res) => {
  res.json(estilos)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

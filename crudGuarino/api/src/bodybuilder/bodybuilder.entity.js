class BodyBuilder{

    constructor(cpf, nome, peso, altura, dataNascimento, estilo, gym){
        this.cpf = cpf
        this.nome = nome
        this.peso = peso
        this.altura = altura
        this.dataNascimento = dataNascimento
        this.estilo = estilo //associação com a classe estilo
        this.gym = gym //associação com a classe Gym
    }
}
module.exports = { BodyBuilder }
import CarrosDAO from "../DAO/CarrosDAO.js"

class carrosController {
  static rotas(app){
    app.get('/carro', carrosController.listar)
    app.post('/carro', carrosController.inserir)
    app.delete('/carro/:id', carrosController.deletar)
    app.put('/carro/:id', carrosController.atualizar)
  }

  static async listar(req, res){
    const carros = await CarrosDAO.listar()

    res.send(carros)
  }

  static async inserir(req, res){
    const carro = {
      title: req.body.title,
      artist: req.body.artist
    }

    const result = await CarrosDAO.inserir(carro)

    if(result.erro) {
      res.status(500).send(result)
    }

    res.send(result)
  }

  static async deletar(req, res){
    const carro = await CarrosDAO.deletar(req.params.id)

    if(carro.erro){
        res.status(500).send('Erro ao deletar carro')
    }

    res.send({mensagem: 'carro removido com sucesso'})
  }

  static async atualizar(req, res){
    const carro = {
      title: req.body.title,
      artist: req.body.artist
    }

    const result = await CarrosDAO.atualizar(req.params.id, carro)

    if(result.erro){
        res.status(500).send('Erro ao atualizar carro')
    }

    res.send({mensagem: 'carro alterado com sucesso'})
  }
}

export default carrosController
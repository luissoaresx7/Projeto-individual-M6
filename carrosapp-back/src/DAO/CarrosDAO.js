import db from '../infra/db.js'

class CarrosDAO {
    static listar() {
        const query = 'SELECT * FROM carros';
        return new Promise((resolve, reject) => {
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                }

                resolve(rows)
            });
        });
    }

    static inserir(carro) {
        const query = 'INSERT INTO carros(modelo, ano) VALUES (?, ?)';
        return new Promise((resolve, reject) => {
            db.run(query, [carro.modelo, carro.ano], function (err) {
                if (err) {
                    reject({
                        mensagem: 'Erro ao inserir carro',
                        erro: err
                    })
                }

                resolve({
                    mensagem: 'carrocriada com sucesso',
                    carroId: this.lastID
                 })
            });
        });
    }

    static deletar(id) {
      const query = 'DELETE FROM carros WHERE id = ?';
      return new Promise((resolve, reject) => {
          db.run(query, [id], (err) => {
              if (err) {
                  reject({
                      mensagem: 'Erro ao deletar a carro',
                      erro: err
                  })
              }

              resolve({ mensagem: 'carro deletado com sucesso' })
          });
      });
    }

    static atualizar(id, carro) {
      const query = 'UPDATE carros SET modelo = ?, ano = ? WHERE id = ?';
      return new Promise((resolve, reject) => {
          db.run(query, [carro.modelo, carro.ano, id], (err) => {
              if (err) {
                  reject({
                      mensagem: 'Erro ao atualizar a música',
                      erro: err
                  })
              }

              resolve({ mensagem: 'Música atualizado com sucesso' })
          });
      });
    }
}

export default CarrosDAO;
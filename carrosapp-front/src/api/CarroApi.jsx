const CarroApi = () => {
  const url = 'http://localhost:3000'

  return {
      getCarros () {
          return fetch(`${url}/carro`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json'
              }
          })
      },
      deleteCarro (carroId) {
        return fetch(`${url}/carro/${carroId}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
       })
      },
      createCarro (modelo, ano) {
        return fetch(`${url}/carro`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
              modelo: modelo,
              ano: ano
            }
          )
       })
      },
      updateCarro(carroId, modelo, ano) {
        return fetch(`${url}/carro/${carroId}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
              modelo: modelo,
              ano: ano
            }
          )
       })
      },
  }
}

export default CarroApi
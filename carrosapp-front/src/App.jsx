import { Table, Container, Button } from 'react-bootstrap'
import CarroApi from './api/CarroApi'
import { useEffect, useState } from 'react'
import CreateCarroModal from './components/CreateCarroModal'
import UpdateCarroModal from './components/UpdateCarroModal'

function App() {
  const [carros, setCarros] = useState()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [selectedCarro, setSelectedCarro] = useState()

  const handleCloseCreateModal = () => setIsCreateModalOpen(false);
  const handleShowCreateModal = () => setIsCreateModalOpen(true);

  const handleCloseUpdateModal = () => setIsUpdateModalOpen(false);
  const handleShowUpdateModal = () => setIsUpdateModalOpen(true);

  useEffect(() => {
    async function getData() {
      await CarroApi().getCarros().then(data => {
        return data.json()
      })
      .then(data => {
        setCarros(data)
      })
    }

    getData()
  }, [])

  async function deleteCarro(carroId) {
    try {
      await CarroApi().deleteCarro(carroId)

      const formattedCarros = carros.filter(cont => {
        if(cont.id !== carroId){
          return cont
        }
      })

      setCarros(formattedCarros)
    } catch(err) {
      throw err
    }
  }

  async function createCarro(event) {
    try {
      event.preventDefault()

      const req = event.currentTarget.elements

      await CarroApi().createCarro(
        req.modelo.value, req.ano.value
      ).then(data => {
        return data.json()
      }).then(res => {
        setCarros([...carros, {
          id: res.carroId,
          modelo: req.modelo.value,
          ano: req.ano.value
        }])

        setIsCreateModalOpen(false)
      })
    } catch(err) {
      throw err
    }
  }

  async function updateCarro(event) {
    try {
      event.preventDefault()

      const req = event.currentTarget.elements

      await CarroApi().updateCarro(
        selectedCarro.id, req.modelo.value, req.ano.value
      )

      const formattedCarros = carros.map(cont => {
        if(cont.id === selectedCarro.id) {
          return {
            id: selectedCarro.id,
            modelo:  req.modelo.value,
            ano: req.ano.value
          }
        }

        return cont
      })

      setCarros(formattedCarros)

      setIsUpdateModalOpen(false)
    } catch(err) {
      throw err
    }
  }

  return(
    <>
    <Container
      className="
        d-flex
        flex-column
        align-items-start
        justify-content-center
        h-100
        w-100
        "
    >
      <Button
        className="mb-2"
        onClick={handleShowCreateModal}
        variant='primary'>
        Criar Carro
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Modelo</th>
            <th>Ano</th>
          </tr>
        </thead>

        <tbody>
          {carros && carros.map(cont => (
            <tr key={cont.id}>
              <td>{cont.modelo}</td>
              <td>{cont.ano}</td>
              <td>
                <Button onClick={() => deleteCarro(cont.id)} variant='danger'>
                  Excluir
                </Button>
                <Button
                  onClick={() => {
                    handleShowUpdateModal()
                    setSelectedCarro(cont)
                  }}
                  variant='warning'
                  className='m-1'
                  >
                  Atualizar
                </Button>
              </td>

            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
    <CreateCarroModal isModalOpen={isCreateModalOpen} handleClose={handleCloseCreateModal} createCarro={createCarro} />
    {selectedCarro && (
      <UpdateCarroModal isModalOpen={isUpdateModalOpen} handleClose={handleCloseUpdateModal} updateCarro={updateCarro} carro={selectedCarro} />
    )}
    </>
  )
}

export default App

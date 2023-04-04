import { Modal, Button, Form } from 'react-bootstrap'
function UpdateCarroModal(props) {
  return(
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={props.isModalOpen}>
        <Form onSubmit={(event) => {
          props.updateCarro(event)
        }}>
        <Modal.Header closeButton onClick={props.handleClose}>
          <Modal.Title>Atualizar carro</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group controlId="modelo">
            <Form.Label>
              Modelo
            </Form.Label>
            <Form.Control defaultValue={props.carro.modelo} type="text" />
          </Form.Group>

          <Form.Group controlId="ano">
            <Form.Label>
              Ano
            </Form.Label>
            <Form.Control defaultValue={props.carro.ano} type="text" />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>Close</Button>
          <Button variant="primary" type="submit">Salvar</Button>
        </Modal.Footer>
        </Form>
      </Modal >
    </div>
  )
}

export default UpdateCarroModal

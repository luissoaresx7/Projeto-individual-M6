import app from './app.js'
import db from './infra/db.js'

// escolhendo a porta em que o servidor será aberto
const port = 3000
import './infra/carros.js'

// abrindo o servidor na porta escolhida
app.listen(port,  ()=>{
    db.run(`delete from carros`)

    console.log(`Server rodando em http://localhost:${port}/`)
})
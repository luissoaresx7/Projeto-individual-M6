/*
Esse arquivo deve ser executado apenas uma vez para que a o banco seja criado e populado
*/
import db from "./db.js";

//==== Conteúdos
const CARROS_SCHEMA = `
CREATE TABLE IF NOT EXISTS "carros" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "modelo" text,
    "ano" text
  );`;

function createTableCarros() {
    db.run(CARROS_SCHEMA, (error)=> {
       if (error) console.log("Erro ao criar tabela de carro");
    });
}

db.serialize( ()=> {
    createTableCarros();
});
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express(); 

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const db = mysql.createConnection({
  host: "HOST_DO_BANCO_DE_DADOS",
  user: "USER_DO_BANCO_DE_DADOS",
  password: "SENHA_DO_BANCO_DE_DADOS",
  database: "NOME_DO_BANCO_DE_DADOS"
});

db.connect(err => {
  if (err) {
    console.error("Erro ao conectar no MySQL:", err);
  } else {
    console.log("Conectado ao MySQL!");
  }
});

app.post("/produtos", (req, res) => {
  const { nome_do_produto, categoria, quantidade_em_estoque, preco } = req.body;

  const sql = `
    INSERT INTO produtos
    (nome_do_produto, categoria, quantidade_em_estoque, preco)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [nome_do_produto, categoria, quantidade_em_estoque, preco], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    res.json({ message: "Produto cadastrado com sucesso!" });
  });
});


app.get("/produtos", (req, res) => {
  db.query("SELECT * FROM produtos", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    res.json(results);
  });
});


app.put("/produtos/:id", (req, res) => {
  const { id } = req.params;
  const { nome_do_produto, categoria, quantidade_em_estoque, preco } = req.body;

  const sql = `
    UPDATE produtos
    SET
      nome_do_produto = ?,
      categoria = ?,
      quantidade_em_estoque = ?,
      preco = ?
    WHERE id = ?
  `;

  db.query(sql, [nome_do_produto, categoria, quantidade_em_estoque, preco, id], (err, result) => {
    if (err) {
      console.error("Erro ao atualizar produto:", err);
      return res.status(500).json(err);
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    res.json({ message: "Produto atualizado com sucesso!" });
  });
});


app.delete("/produtos/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM produtos WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Erro ao deletar produto:", err);
      return res.status(500).json(err);
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    res.json({ message: "Produto removido com sucesso!" });
  });
});



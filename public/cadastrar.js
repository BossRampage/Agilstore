const form = document.getElementById("formProduto");
const tabela = document.getElementById("listaProdutos");
const produtoIdInput = document.getElementById("produtoId");
const btnSalvar = document.getElementById("btnSalvar");

const nome = document.getElementById("nome");
const categoria = document.getElementById("categoria");
const quantidade = document.getElementById("quantidade");
const preco = document.getElementById("preco");

let editando = false;

/* CARREGAR PRODUTOS */
document.addEventListener("DOMContentLoaded", carregarProdutos);

async function carregarProdutos() {
  try {
    const res = await fetch("/produtos");
    if (!res.ok) throw new Error("Erro ao carregar produtos");
    const produtos = await res.json();

    tabela.innerHTML = "";
    produtos.forEach(adicionarNaTabela);
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
    alert("Erro ao carregar produtos. Verifique se o servidor está rodando.");
  }
}

/* SUBMIT (CREATE / UPDATE) */
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const produto = {
      nome_do_produto: nome.value,
      categoria: categoria.value,
      quantidade_em_estoque: quantidade.value,
      preco: preco.value
    };

    const url = editando ? `/produtos/${produtoIdInput.value}` : "/produtos";
    const method = editando ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto)
    });

    if (!res.ok) throw new Error("Erro ao salvar produto");

    form.reset();
    btnSalvar.textContent = "Adicionar Produto";
    editando = false;

    carregarProdutos();
  } catch (error) {
    console.error("Erro ao salvar produto:", error);
    alert("Erro ao salvar produto. Tente novamente.");
  }
});

/* TABELA */
function adicionarNaTabela(produto) {
  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${produto.nome_do_produto}</td>
    <td>${produto.categoria}</td>
    <td>${produto.quantidade_em_estoque}</td>
    <td>R$ ${produto.preco}</td>
    <td>
      <button class="btn-edit">Editar</button>
      <button class="btn-delete">Deletar</button>
    </td>
  `;

  tr.querySelector(".btn-edit").onclick = () => editarProduto(produto);
  tr.querySelector(".btn-delete").onclick = () => deletarProduto(produto.id);

  tabela.appendChild(tr);
}

/* EDITAR */
function editarProduto(produto) {
  produtoIdInput.value = produto.id;
  nome.value = produto.nome_do_produto;
  categoria.value = produto.categoria;
  quantidade.value = produto.quantidade_em_estoque;
  preco.value = produto.preco;

  btnSalvar.textContent = "Salvar Alterações";
  editando = true;
}

/* DELETE */
async function deletarProduto(id) {
  if (!confirm("Deseja realmente deletar este produto?")) return;

  try {
    const res = await fetch(`/produtos/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Erro ao deletar produto");
    carregarProdutos();
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    alert("Erro ao deletar produto. Tente novamente.");
  }
}

const logadonew = window.sessionStorage.getItem("logado");

const transformJSON = JSON.parse(logadonew);

const logout = document.querySelector("#logout");

const list = [];

if (transformJSON == true) {
  const dataJ = localStorage.getItem("datadata");

  const datalog = JSON.parse(dataJ);

  const formulario = document.querySelector("form");

  const todo = document.querySelector(".todo-list");

  const clearAllButton = document.querySelector("#clear-all"); // Renomeei para clearAllButton

  const select = document.querySelector(".filter-todo");

  preecchelistaHTML(datalog);

  formulario.addEventListener("submit", function (conteudo) {
    conteudo.preventDefault();

    // Capturar elementos de informação do usuário:
    let todoInput = formulario.querySelector("input").value;

    formulario.reset();
    document.querySelector("input").focus();

    let validado = valida(todoInput);

    if (validado == true) {
      adicionaNovoElemento(todoInput);
    }
  });

  clearAllButton.addEventListener("click", function () {
    // Limpar o campo de entrada de tarefas
    formulario.querySelector("input").value = "";

    // Limpar a lista de tarefas
    list.length = 0;
    todo.innerHTML = "";

    // Limpar o filtro selecionado
    select.value = "all";

    // Remover os dados salvos no localStorage
    localStorage.removeItem("datadata");
  });

  select.addEventListener("change", () => {
    if (select.value == "all") {
      const mapAll = list.map(all);
      console.log(mapAll);
    }
    if (select.value == "completed") {
      const mapComplete = list.map(check);
      console.log(mapComplete);
    }
    if (select.value == "uncompleted") {
      const map = list.map(mapCheck);
      console.log(map);
    }
  });

  function check(value) {
    if (value.check) {
      document.querySelector("#div" + value.id).style.display = "flex";
    } else {
      document.querySelector("#div" + value.id).style.display = "none";
    }
    return value;
  }

  function mapCheck(value) {
    if (!value.check) {
      document.querySelector("#div" + value.id).style.display = "flex";
    } else {
      document.querySelector("#div" + value.id).style.display = "none";
    }
    return value;
  }

  function all(value) {
    document.querySelector("#div" + value.id).style.display = "flex";

    return value;
  }

  function valida(todoInput) {
    // Validação:
    if (todoInput == "") {
      alert("Favor Inserir Informações no Campo Correto");
      return false;
    } else if (todoInput == null) {
      return false;
    } else if (todoInput == undefined) {
      return false;
    } else {
      return true;
    }
  }

  function adicionaNovoElemento(todoInput) {
    const objeto = {
      item: todoInput,
      id: list.length + 1,
      check: false,
    };

    list.push(objeto);

    adicionaNovaTags(objeto);

    const dataJSON = JSON.stringify(list);
    localStorage.setItem("datadata", dataJSON);
  }

  function adicionaNovaTags(objeto) {
    const div = document.createElement("div");
    div.id = "div" + objeto.id;
    div.classList.add("todo");

    let li = criaTagLi(objeto.item);

    let buttonCheck = criaTagButtonCheck();

    let buttonTrash = criaTagButtonTrash();

    let i = criaTagI();

    let i1 = criaTagITrash();

    div.appendChild(li);
    div.append(buttonCheck);
    buttonCheck.appendChild(i);
    div.append(buttonTrash);
    buttonTrash.appendChild(i1);

    todo.append(div);
  }

  function criaTagLi(item) {
    let li = document.createElement("li");
    li.classList.add("todo-item");
    li.innerHTML = item;
    return li;
  }

  function criaTagButtonCheck() {
    let buttonCheck = document.createElement("button");
    buttonCheck.classList.add("check-btn");
    buttonCheck.id = list.length;
    buttonCheck.addEventListener("click", (b) => {
      let botao = b.target;

      let check = document.querySelector("#div" + botao.id);

      botao.classList.contains("check-btn");

      check.classList.toggle("completed");
      if (check.classList.contains("completed")) {
        list[botao.id - 1].check = true;
      } else {
        list[botao.id - 1].check = false;
      }

      localStorage.setItem("datadata", JSON.stringify(list));
    });
    return buttonCheck;
  }

  function criaTagButtonTrash() {
    let buttonTrash = document.createElement("button");
    buttonTrash.classList.add("trash-btn");
    buttonTrash.id = list.length;
    buttonTrash.addEventListener("click", function (b) {
      let botao = b.target;

      let id = botao.id;

      // Remover elementos da lista

      for (let i = 0; i < list.length; i++) {
        if (id == list[i].id) {
          list.splice(i, 1);
          localStorage.setItem("datadata", JSON.stringify(list));
        }
      }

      let divASerRemovida = document.querySelector("#div" + id);

      // Remover elementos da tela

      todo.removeChild(divASerRemovida);
    });
    return buttonTrash;
  }

  function criaTagI() {
    let i = document.createElement("i");
    i.classList.add("fas", "fa-check");
    return i;
  }

  function criaTagITrash() {
    let i = document.createElement("i");
    i.classList.add("fas", "fa-trash");
    return i;
  }

  function preecchelistaHTML(datalog) {
    let log;
    if (datalog !== null) {
      for (let i = 0; i < datalog.length; i++) {
        log = datalog[i];
        list.push(log);
        adicionaNovaTags(log);
      }
    }
  }
} else {
  window.location = "./Login.html";
}

logout.addEventListener("click", () => {
  sessionStorage.setItem("logado", false);
  window.location = "./Login.html";
});

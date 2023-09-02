const logadonew = window.sessionStorage.getItem("logado");

const transformJSON = JSON.parse(logadonew);

const logout = document.querySelector("#logout");

const list = [];

if (transformJSON == true) {
  const dataJ = localStorage.getItem("datadata");

  const datalog = JSON.parse(dataJ);

  const formulario = document.querySelector("form");

  const todo = document.querySelector(".todo-list");

  const deletar = document.querySelector("#clear-all");

  const select = document.querySelector(".filter-todo");

  preecchelistaHTML(datalog);

  formulario.addEventListener("submit", function (conteudo) {
    conteudo.preventDefault();

    //capturar elementos de informação do usuário:
    let todoInput = formulario.querySelector("input").value;

    formulario.reset();
    document.querySelector("input").focus();

    let validado = valida(todoInput);

    if (validado == true) {
      adicionanovoelemento(todoInput);
    }
  });

  deletar.addEventListener("click", function () {
    // Limpa o campo de entrada de tarefas
    todoInput.value = "";

    // Limpa a lista de tarefas
    list.length = 0;
    todoList.innerHTML = "";

    // Limpa o filtro selecionado
    select.value = "all";

    // Remove os dados salvos no localStorage
    localStorage.removeItem("datadata");
  });

  select.addEventListener("change", () => {
    if (select.value == "all") {
      const mapall = list.map(all);
      console.log(mapall);
    }
    if (select.value == "completed") {
      const mapcomplete = list.map(check);
      console.log(mapcomplete);
    }
    if (select.value == "uncompleted") {
      const map = list.map(mapcheck);
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

  function mapcheck(value) {
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
    //Validação:
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

  function adicionanovoelemento(todoInput) {
    const objeto = {
      item: todoInput,
      id: list.length + 1,
      check: false,
    };

    list.push(objeto);

    adicionanovastags(objeto);

    const dataJASON = JSON.stringify(list);
    localStorage.setItem("datadata", dataJASON);
  }

  function adicionanovastags(objeto) {
    const div = document.createElement("div");
    div.id = "div" + objeto.id;
    div.classList.add("todo");

    let li = criatagli(objeto.item);

    let buttoncheck = criatagbuttonchk();

    let buttontrash = criarbuttontrash();

    let i = criaritagI();

    let i1 = criaritagItrash();

    div.appendChild(li);
    div.append(buttoncheck);
    buttoncheck.appendChild(i);
    div.append(buttontrash);
    buttontrash.appendChild(i1);

    todo.append(div);
  }

  function criatagli(item) {
    let li = document.createElement("li");
    li.classList.add("todo-item");
    li.innerHTML = item;
    return li;
  }

  function criatagbuttonchk() {
    let buttoncheck = document.createElement("button");
    buttoncheck.classList.add("check-btn");
    buttoncheck.id = list.length;
    buttoncheck.addEventListener("click", (b) => {
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
    return buttoncheck;
  }

  function criarbuttontrash() {
    let buttontrash = document.createElement("button");
    buttontrash.classList.add("trash-btn");
    buttontrash.id = list.length;
    buttontrash.addEventListener("click", function (b) {
      let botao = b.target;

      let id = botao.id;

      //remover elementos da lista

      for (let i = 0; i < list.length; i++) {
        if (id == list[i].id) {
          list.splice(i, 1);
          localStorage.setItem("datadata", JSON.stringify(list));
        }
      }

      let div_a_ser_removida = document.querySelector("#div" + id);

      //remover elementos da tela

      todo.removeChild(div_a_ser_removida);
    });
    return buttontrash;
  }

  function criaritagI() {
    let i = document.createElement("i");
    i.classList.add("fas", "fa-check");
    return i;
  }

  function criaritagItrash() {
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
        adicionanovastags(log);
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

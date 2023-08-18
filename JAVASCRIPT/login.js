const login = "Admin";

const senha = "1234";

let contador = 0;

const formulario = document.querySelector("form");

formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  const input_login = document.querySelector("#login");
  const input_senha = document.querySelector("#senha");

  if (contador < 3) {
    if (login == input_login.value && senha == input_senha.value) {
      window.sessionStorage.setItem("logado", true);
      window.location = "./index1.html";
    } else {
      contador++
      window.sessionStorage.setItem("logado", false);
      alert("Login ou Senha invalidos, favor digitar os campos corretamemte");
    }
  }
});
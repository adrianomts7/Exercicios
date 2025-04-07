import validator from "validator";

export default class Login {
  constructor(formClass) {
    this.form = document.querySelector(formClass);
  }

  init() {
    this.events();
  }

  events() {
    if (!this.form) return;
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.validate(e);
    });
  }

  validate(e) {
    const el = e.target;
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');
    const erros = [];
    const msg = document.querySelector(".mensagens-erro");

    if (!validator.isEmail(emailInput.value)) {
      erros.push("E-mail invalido");
    }

    if (passwordInput.value.length < 3 || passwordInput.value.length > 15) {
      erros.push("A senha deve ter entre 3 a 15 caracteres");
    }

    if (erros.length > 0) {
      msg.innerHTML = erros.join("<br>");
      console.log(erros);
    }

    if (erros.length <= 0) {
      el.submit();
    }
  }
}

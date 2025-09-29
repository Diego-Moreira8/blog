export const full_name_validation = {
  label: "Seu nome:",
  id: "fullName",
  name: "fullName",
  autoComplete: "name",
  validation: {
    maxLength: {
      value: 250,
      message: "O nome pode ter no máximo de 250 caracteres.",
    },
  },
};

export const username_validation = {
  label: "Nome de usuário:",
  id: "username",
  name: "username",
  autoComplete: "username",
  validation: {
    required: {
      value: true,
      message: "Campo obrigatório.",
    },
    minLength: {
      value: 3,
      message: "O nome de usuário precisa ter pelo menos 3 caracteres.",
    },
    maxLength: {
      value: 50,
      message: "O nome de usuário pode ter no máximo 50 caracteres.",
    },
    pattern: {
      value: /^[A-Za-z0-9._-]+$/,
      message:
        "O nome de usuário pode incluir apenas letras, números, pontos (.), sublinhados (_) e traços (-). Espaços em branco não são permitidos.",
    },
  },
};

export const password_validation = {
  label: "Senha:",
  type: "password",
  id: "password",
  name: "password",
  autoComplete: "new-password",
  validation: {
    required: {
      value: true,
      message: "Campo obrigatório.",
    },
    minLength: {
      value: 8,
      message: "A senha precisa ter pelo menos 8 caracteres.",
    },
    maxLength: {
      value: 250,
      message: "A senha pode ter no máximo 250 caracteres.",
    },
    pattern: {
      value: /^(?=.*[A-Za-z])(?=.*\d).+$/,
      message: "A senha precisa incluir pelo menos uma letra e um número.",
    },
    validate: (password, { username }) => {
      if (password.toLowerCase() === username.toLowerCase()) {
        return "A senha não pode ser igual ao nome de usuário.";
      }
    },
  },
};

export const password_confirmation_validation = {
  label: "Repita a senha:",
  type: "password",
  id: "passwordConfirmation",
  name: "passwordConfirmation",
  autoComplete: "new-password",
  validation: {
    required: {
      value: true,
      message: "Campo obrigatório.",
    },
    validate: (passwordConfirmation, { password }) => {
      if (passwordConfirmation !== password) {
        return "As senhas não são iguais. Tente novamente.";
      }
    },
  },
};

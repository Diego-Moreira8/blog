# blog

Uma aplicação full-stack de um serviço de blog.

# Regras dos formulários:

- name
  | REGRA | BACK | WRITER | BLOG |
  |---|---|---|---|
  | max 250 caracteres | x | x | |
  | trim | x | - | |

- username
  | REGRA | BACK | WRITER | BLOG |
  |---|---|---|---|
  | min 3 caracteres | x | x | |
  | max 50 caracteres | x | x | |
  | trim | x | - | |
  | não vazio | x | x | |
  | sem espaços | x | x | |
  | apenas letras, números, -, \_ e . | x | x | |
  | único no BD | x | | |

- senha
  | REGRA | BACK | WRITER | BLOG |
  |---|---|---|---|
  | min 8 caracteres | x | x | |
  | max 250 caracteres | x | x | |
  | não vazio | x | x | |
  | letras e números | x | x | |
  | Não permitir senha igual ao username | x | | |

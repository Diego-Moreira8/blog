# blog

Uma aplicação full-stack de um serviço de blog.

# Regras dos formulários:

- name
  | REGRA | BACK | BLOG | WRITER |
  |---|---|---|---|
  | max 250 caracteres | x | | |
  | trim | x | | |

- username
  | REGRA | BACK | BLOG | WRITER |
  |---|---|---|---|
  | min 3 caracteres | x | | |
  | max 50 caracteres | x | | |
  | trim | x | | |
  | não vazio | x | | |
  | sem espaços | x | | |
  | apenas letras, números, -, \_ e . | x | | |
  | único no BD | x | | |

- senha
  | REGRA | BACK | BLOG | WRITER |
  |---|---|---|---|
  | min 8 caracteres | x | | |
  | max 250 caracteres | x | | |
  | não vazio | x | | |
  | letras e números | x | | |
  | Não permitir senha igual ao username | x | | |

# Exercícios web — ordenação, receitas e usuários

Conjunto de três páginas para explorar JavaScript no navegador, leitura de JSON e consumo de uma API REST.

## Tecnologias e recursos

- HTML, CSS e JavaScript.
- Bootstrap 5.2.3, reset-css e Vue carregados por CDN.
- **1º procedimento:** adicionar e misturar valores, com Bubble Sort, Selection Sort e Quick Sort.
- **2º procedimento:** montar um catálogo de receitas a partir de `dados.json`.
- **3º procedimento:** consultar usuários de teste na [ReqRes](https://reqres.in).

## Como visualizar

```bash
git clone https://github.com/alvesvslucas/nivel2-estacio-2s.git
cd nivel2-estacio-2s
```

Sirva a pasta por um servidor HTTP estático e abra `index.html` no endereço local fornecido. No VS Code, uma opção é a extensão Live Server e a ação **Open with Live Server**.

Use HTTP para permitir a leitura de `dados.json` por `fetch`. Os recursos de CDN e a página de usuários dependem de internet e da disponibilidade da API externa.

## Estrutura

- `index.html` e `js/ordenando.js`: exercício de ordenação.
- `receitas.html`, `js/receitas.js` e `dados.json`: catálogo de receitas.
- `usuarios.html`: consulta REST e apresentação com Vue.
- `css/`: estilos das páginas.

## Créditos e escopo

As páginas identificam Lucas Alves como desenvolvedor. Os exemplos são exercícios de navegador; a integração com a ReqRes precisa ser validada contra as condições atuais do serviço antes de uma demonstração pública.


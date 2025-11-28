# jantinha
Uma aplicação web focada em estilização usando frameworks CSS, usa uma API pública que traz aleatoriamente uma receita para sua jantinha!!!

## Como rodar a aplicação

- Baixe o repositorio e rode:
- `npm install` ou `npm i`

Obs: a tag `<base href="/jantinha/" />` precisa ser retirada no local, ela foi incluida para melhor funcionamento do GitHub Pages dessa aplicação

Para rodar de maneira adequada precisamos levantar o json server usando este comando:

`json-server --watch databases/db.json`
Esse arquivo `db.json` contem as nossas receitas salvas.

## Sobre as bibliotecas usadas

- **Json Server**
- **Sass**
- **bootstrap**


## Ver a aplicação

Para ver a aplicação rodando remotamente você pode acessar via: https://felipefadel.github.io/jantinha/index.html

Podemos ver o design system proposto no figma (ID0) no seguinte link: www.figma.com/design/nKdhKi12R8OaQvQ6SYuINb/Jantinha?node-id=1-3&p=f&t=J0LC20JXytKYC5EA-0

## Checklist | Indicadores de Desempenho (ID) dos Resultados de Aprendizagem (RA)

#### RA1 - Utilizar Frameworks CSS para estilização de elementos HTML e criação de layouts responsivos.
- [x] ID0 - Prototipa interfaces adaptáveis para no mínimo os tamanhos de tela mobile e desktop, usando ferramentas de design como Figma, Quant UX ou Sketch.
- [x] ID01 - Implementa um layout responsivo de uma página web utilizando um Framework CSS, como Bootstrap, Materialize ou Tailwind (com DaisyUI), aproveitando as técnicas de Flexbox ou Grid oferecidas pelo próprio framework, garantindo que o layout se adapte adequadamente a diferentes tamanhos de tela e dispositivos.
- [x] ID 02 - Utiliza técnica de responsividade nativa de CSS, como Flexbox ou Grid Layout, para criar layouts responsivos e fluidos em diferentes resoluções de tela.
- [x] ID 03 - Utiliza componentes CSS (ex. card, button ou outros) e JavaScript (ex. modal, carrousel ou outro) oferecidos por um Framework CSS.
- [x] ID 04 - Implementa um layout fluido e responsivo utilizando unidades relativas (vw, vh, %, em ou rem) em vez de unidades fixas (px) em diferentes dispositivos e tamanhos de tela.
- [x] ID 05 - Implementa animações em elementos da página, como fadeIn/fadeOut, slideIn/slideOut, utilizando CSS Animations ou bibliotecas de animação, como o Animate.css ou JQuery, para fornecer feedback visual ao usuário e criar uma experiência interativa.
- [x] ID 07 - Aplica um Design System consistente, definindo diretrizes de estilo, cores, tipografia e padrões de componentes que são seguidos em toda a aplicação, garantindo uma experiência de usuário uniforme e atraente.
- [x] ID 08 - Implementa pré-processadores CSS, como o Sass, em conjunto com um Framework CSS ou de forma isolada, para organizar e modularizar o código CSS, aplicando variáveis, mixins e funções para facilitar a manutenção e escalabilidade dos estilos.
- [x] ID 09 - Aplica tipografia responsiva utilizando media queries ou a função clamp(), em conjunto com unidades relativas como rem, em ou vw, para ajustar o tamanho da fonte de acordo com diferentes tamanhos de tela.

#### RA2 - Realizar tratamento de formulários e aplicar validações customizadas no lado cliente, utilizando a API do HTML e expressões regulares (REGEX).
- [x] ID 10 - Implementa tratamento de formulários no lado cliente com apresentação de mensagens de erro (texto próximo dos campos de entrada ou balões com mensagens) ou sucesso, utilizando os recursos da API do HTML, como validação de campos obrigatórios, tipo de entrada e limites de caracteres, garantindo que os dados inseridos sejam válidos antes de serem enviados para o servidor (via tratador de evento submit).
- [x] ID 11 - Aplica expressões regulares (REGEX) de forma eficiente para realizar validações customizadas nos campos de formulários, como formatos específicos de e-mail, telefone, data ou outros padrões personalizados definidos pelos requisitos do projeto.
- [x] ID 12 - Incorpora elementos de listagem, como checkbox, radio ou select, de maneira eficiente em formulários web, possibilitando a seleção e coleta precisa de dados pelos usuários.
- [x] ID 13 - Realiza a escrita e leitura de dados no Web Storage, permitindo a persistência de informações entre sessões de usuário e fornecendo uma maneira eficaz de armazenar dados localmente no navegador.

#### RA3 - Aplicar ferramentas para otimização do processo de desenvolvimento web, incluindo Node.js, NPM e linters para garantir a qualidade do código, juntamento com boas práticas de versionamento e organização de projetos.
- [x] ID 14 - Configura adequadamente um ambiente de desenvolvimento usando Node.js e NPM para gerenciar pacotes e dependências do projeto, facilitando a instalação e o uso de bibliotecas e ferramentas de terceiros.
- [x] ID 15 - Utiliza linters, como ESLint ou Stylelint, para analisar e corrigir automaticamente problemas de código, incluindo erros de sintaxe, estilo e boas práticas, garantindo a qualidade e consistência do código do projeto.
- [x] ID 16 - Adota boas práticas de versionamento utilizando sistemas como Git e GitHub, criando e gerenciando repositórios com branches adequados ou pelo menos o branch main.
- [x] ID 18 - Organiza o arquivo README.md conforme o template exigido na disciplina, contendo informações claras e estruturadas sobre o projeto, principalmente o checklist de tópicos devidamente preenchido.
- [x] ID 19 - Organiza os arquivos do projeto em uma estrutura coerente, lógica e modular, conforme projeto de exemplo, facilitando a localização, manutenção e escalabilidade.

#### RA4 - Aplicar bibliotecas de funções e componentes em JavaScript para aprimorar a interatividade de páginas web.
- [x] ID 21 - Utiliza a biblioteca jQuery para manipular o DOM e aprimorar a interatividade das páginas web, implementando funcionalidades como eventos, animações e manipulação de elementos HTML de forma eficiente.  
- [x] ID 22 - Seleciona e integra com sucesso um plugin jQuery, como o jQuery Mask Plugin ou outro plugin relevante para o projeto, a fim de melhorar a funcionalidade ou a aparência de elementos específicos em uma página web. 

#### RA5 - Efetuar requisições assíncronas para uma API fake e APIs públicas, permitindo a obtenção e manipulação de dados dinamicamente.
- [x] ID 25 - Realiza requisições assíncronas para uma API fake utilizando adequadamente conceitos como AJAX, Fetch API ou bibliotecas, para persistir os dados originados de um formulário.
- [x] ID 26 - Realiza requisições assíncronas para uma API fake utilizando adequadamente conceitos como AJAX, Fetch API ou bibliotecas, para exibição dos dados na página web.

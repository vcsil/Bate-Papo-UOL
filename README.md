[![wakatime](https://wakatime.com/badge/user/04459a42-f0a6-4019-ad90-9558a7c04b39/project/6c994c2a-5507-40ac-98e2-d8cdcb7fc21f.svg)](https://wakatime.com/badge/user/04459a42-f0a6-4019-ad90-9558a7c04b39/project/6c994c2a-5507-40ac-98e2-d8cdcb7fc21f)

# 05 - Bate-Papo UOL

### Descrição

Implementação de um bate-papo totalmente funcional, inspirado no saudoso Bate-Papo UOL. Mas evite usar o site real da UOL como referência, pois apesar de inspirado nele, nossa interface é totalmente diferente :)

[Figma com o Layout](https://www.figma.com/file/eviXSw3MnQVphvpalRT78c/Chat-UOL?node-id=0%3A1)

[API Chat UOL](https://bootcampra.notion.site/API-Chat-UOL-1df39c2a8d75450f9b82920163d306b0)

### Requisitos

- Geral

  - [x] Não utilize nenhuma biblioteca para implementar este projeto (jquery, lodash, react, etc), nem outras linguagens que compilem para JS (TypeScript, Clojure, ELM, etc), somente JavaScript puro
  - [x] Seu projeto deverá ser desenvolvido utilizando Git e GitHub, em um repositório público
  - [x] **A cada requisito implementado** faça um commit com uma mensagem descritiva do que você evoluiu

- Layout

  - [x] Aplicar layout para mobile, seguindo figma abaixo. Não é necessário implementar uma versão para desktop.

  

- Chat

  - [x] Ao entrar no site, este deve carregar as mensagens do servidor e exibi-las conforme layout fornecido
  - [x] Existem 3 tipos de mensagem:
    - Mensagens de status (**Entrou** ou **Saiu** da sala): deve ter o fundo cinza
    - Mensagens reservadas (**Reservadamente**): deve ter o fundo rosa
    - Mensagens normais: devem ter o fundo branco

​		[x] A cada 3 segundos o site deve re-carregar as mensagens do servidor para manter sempre atualizado

​		[x] O chat deverá ter rolagem automática por padrão, ou seja, sempre que novas mensagens forem adicionadas ao final do chat ele deve scrollar para o final

**Dica**: Você pode fazer com que um elemento apareça na tela utilizando a função `scrollIntoView`:

```jsx
const elementoQueQueroQueApareca = document.querySelector('.mensagem');
elementoQueQueroQueApareca.scrollIntoView();
```

Se `elementoQueQueroQueApareca` estiver dentro de um elemento scrollável, o elemento será scrollado para que o `elementoQueQueroQueApareca` fique visível.

- [x] As mensagens com **Reservadamente** só devem ser exibidas se o nome do destinatário for igual ao nome do usuário que está usando o chat (ou senão ele poderia ver as mensagens reservadas para outras pessoas)

  - **Obs**: Fazer essa filtragem no front-end não é uma boa prática, o ideal seria o servidor não fornecer essas mensagens para outras pessoas. Manteremos dessa forma por fins didáticos :)

- Entrada na sala

  - [x] Ao entrar no site, o usuário deverá ser perguntado com um `prompt` ****seu lindo nome
  - [x] Após inserção do nome, este deve ser enviado para o servidor pra cadastrar o usuário
    - Caso o servidor responda com sucesso, o usuário poderá entrar na sala
    - Caso o servidor responda com erro, deve-se pedir para o usuário digitar outro nome, pois este já está em uso
  - [x] Enquanto o usuário estiver na sala, a cada 5 segundos o site deve avisar ao servidor que o usuário ainda está presente, ou senão será considerado que "Saiu da sala"

- Envio de mensagem

  - [x] Ao enviar uma mensagem, esta deve ser enviada para o servidor

    - Caso o servidor responda com sucesso, você deve obter novamente as mensagens do servidor e atualizar o chat

    - Caso o servidor responda com erro, significa que esse usuário não está mais na sala e a página deve ser atualizada (e com isso voltando pra etapa de pedir o nome)

      **Dica**: experimente usar `window.location.reload()`

  - [x] Nesse envio, deve ser informado o remetente, o destinatário e se a mensagem é reservada ou não.

    - Escolher um destinatário e se a mensagem é reservada ou pública é um **requisito bônus** (ver abaixo). Logo, se você não implementar o bônus, sempre envie destinatário como **Todos** e a mensagem como **pública**.

### Bônus

- Participantes ativos

  - [ ] Ao clicar no ícone superior direito de participantes, o menu lateral deve abrir por cima do chat conforme layout. Um fundo escuro semi-transparente deve ficar por cima do chat.
  - [ ] Ao clicar no fundo escuro, o menu lateral deve ser ocultado novamente
  - [ ] O site deve obter a lista de participantes assim que entra no chat e deve atualizar a lista a cada 10 segundos
  - [ ] Ao clicar em uma pessoa ou em público/reservadamente, a opção clicada deve ser marcada com um check e as demais desmarcadas
  - [ ] Além do check acima, ao trocar esses parâmetros também deve ser alterada a frase que informa o destinatário, que fica embaixo do input de mensagem

- Tela de entrada

  - [x] Em vez de um prompt, faça uma tela inicial, seguindo o layout abaixo

    - Layout

    - ![Layout1](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fc9f1d322-f267-4b3a-8a25-b3c67eebae9e%2FiPhone_8_-_3.png?table=block&id=acd314c4-c727-406f-9039-dc24243f1531&spaceId=53ae0554-5028-4299-85aa-5ea6d3fb67f9&width=2000&userId=6607dc9a-07f7-4b24-b29a-892632bc32da&cache=v2)

      ![Layout2](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F661d24f5-1122-499e-970a-591e2c1b8a6f%2FiPhone_8_-_4.png?table=block&id=60d67bf7-0b1e-471e-b7f9-e4210ca2ca70&spaceId=53ae0554-5028-4299-85aa-5ea6d3fb67f9&width=2000&userId=6607dc9a-07f7-4b24-b29a-892632bc32da&cache=v2)

- Envio com enter

  - [x] Faça com que, caso o usuário tecle Enter no campo de mensagem, ela seja enviada (ou seja, deve ter o mesmo comportamento caso o usuário clique no botão de envio)

### Bug's
* Quando cola texto no lugar de escrever muda a fonte e tudo mais

### Bug's resolvidos
* Corrigir a quebra de nomes e textos muitos grandes.
* Usar outro layout para perguntar o nome.
* Melhorar a atualização das mensagens
* Melhorar o scroll
* Ajeitar o horário

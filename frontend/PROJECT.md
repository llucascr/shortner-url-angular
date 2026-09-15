# Shortner URL

## Visao Geral

Este projeto e o frontend em Angular de um encurtador de URLs. Ele vai consumir uma API backend em Spring Boot que, conforme informado pelo responsavel pelo projeto, ja esta pronta.

O foco atual e construir a interface e integra-la a API existente, sem recriar a logica de negocio do backend. O fluxo central e permitir que o usuario informe uma URL e obtenha sua versao encurtada.

## Base Tecnica

- Frontend em Angular com componentes standalone.
- Estilizacao com Tailwind CSS v4.
- Backend existente em Spring Boot, consumido por HTTP.
- Comandos e particularidades do workspace documentados em `AGENTS.md`.

Os endpoints, os formatos de requisicao e resposta, a URL base e eventuais requisitos de autenticacao devem ser confirmados no contrato da API antes da integracao. Este documento nao define esses detalhes nem presume funcionalidades adicionais.

## Direcao Visual

A referencia visual escolhida e o template **Supabase Sage** do [21st.dev](https://21st.dev/), especialmente suas cores.

- Usar essa referencia para orientar a identidade visual do frontend.
- Consultar a referencia antes de definir valores de cores; nao tratar uma paleta aproximada como a paleta oficial do template.
- Adaptar os exemplos encontrados para Angular e para o Tailwind v4 ja utilizado pelo projeto, sem introduzir outro framework de interface apenas para copiar um componente.

O nome da referencia foi fornecido pelo responsavel pelo projeto. O link especifico do template e os valores da paleta ainda precisam ser confirmados na pesquisa.

## Pesquisa De Interface

Sempre que forem necessarios componentes, cores, templates ou outras referencias de interface, acionar um agente para pesquisar em **https://21st.dev/** antes de implementar.

A pesquisa deve retornar os links das referencias encontradas e as informacoes relevantes para a implementacao. Se o site estiver indisponivel ou a referencia Supabase Sage nao for encontrada, informar a limitacao em vez de inventar resultados ou substituir silenciosamente a direcao visual.

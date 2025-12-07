# 📋 Curso Cypress - Testes E2E Automatizados

Projeto educacional de testes end-to-end com Cypress, incluindo fixtures, commands customizados, relatórios HTML com gráficos e integração com GitHub Actions.

## 📚 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Testes Disponíveis](#testes-disponíveis)
- [Relatórios](#relatórios)
- [GitHub Actions](#github-actions)
- [Comandos npm](#comandos-npm)
- [Contribuindo](#contribuindo)

## Sobre o Projeto

Este projeto demonstra as principais funcionalidades do Cypress para testes automatizados:

✅ Testes UI com Cypress  
✅ Fixtures para dados de teste  
✅ Commands customizados para fluxos comuns  
✅ Relatórios HTML com gráficos (Chart.js)  
✅ Screenshots e vídeos de testes  
✅ Integração com GitHub Actions (CI/CD)  
✅ Dados dinâmicos com Faker.js  

## Pré-requisitos

- **Node.js** 18.x ou superior
- **npm** (incluído com Node.js)
- **Git**

## Instalação

1. **Clone o repositório**
```bash
git clone <seu-repositorio>
cd Curso_Cypress
```

2. **Instale as dependências**
```bash
npm install
```

3. **Verifique a instalação**
```bash
npx cypress --version
```

## Como Usar

### Executar os Testes

**Rodar todos os testes e gerar relatório HTML com gráfico:**
```bash
npm test
```

**Rodar testes apenas no terminal (sem relatório):**
```bash
npx cypress run
```

**Abrir o Cypress Test Runner (interface visual):**
```bash
npx cypress open
```

**Limpar os relatórios anteriores:**
```bash
npm run clean
```

### Visualizar o Relatório

Após executar `npm test`, abra o arquivo:
```
cypress/reports/relatorio-curso-cypress.html
```

O relatório incluirá:
- Resumo dos testes com gráfico de barras
- Testes passados e falhados
- Screenshots de falhas
- Vídeos de execução (se disponível)

## Estrutura do Projeto

```
Curso_Cypress/
├── .github/
│   └── workflows/
│       └── cypress-tests.yml        # Pipeline GitHub Actions
├── cypress/
│   ├── e2e/
│   │   └── UI/
│   │       ├── test-com-fixtures.cy.js
│   │       ├── test-com-faker.cy.js
│   │       ├── test-com-baseurl.cy.js
│   │       ├── test-com-commands-fluxo-carrinho.cy.js
│   │       ├── test-sauce-demo.cy.js
│   │       ├── test_forEach.cy.js
│   │       ├── test_upload_de_arquivo.cy.js
│   │       └── ... (outros testes)
│   ├── fixtures/                    # Dados de teste
│   │   ├── dados_cadastro.json
│   │   ├── dados_formulario.json
│   │   └── dados_login.json
│   ├── reports/                     # Relatórios HTML e JSON
│   │   └── relatorio-curso-cypress.html
│   ├── screenshots/                 # Screenshots de falhas
│   ├── videos/                      # Vídeos de testes
│   ├── support/
│   │   ├── e2e.js                   # Configuração global
│   │   ├── commands.js              # Commands customizados
│   │   ├── login.js                 # Fluxo de login
│   │   ├── logout.js                # Fluxo de logout
│   │   ├── fluxo_carrinho.js        # Fluxo do carrinho
│   │   └── formulario.js            # Commands de formulário
│   └── config.js                    # Configuração do Cypress
├── inserir-grafico.js               # Script para gerar gráfico
├── package.json                     # Dependências e scripts
└── README.md                        # Este arquivo
```

## Testes Disponíveis

### 1. Testes com Fixtures
**Arquivo:** `test-com-fixtures.cy.js`

Demonstra como usar arquivos JSON para dados de teste:
```javascript
cy.fixture('dados_login').then((dados) => {
  cy.login(dados.usuario, dados.senha);
});
```

### 2. Testes com Faker
**Arquivo:** `test-com-faker.cy.js`

Gera dados dinâmicos para cada execução:
```javascript
import { faker } from '@faker-js/faker';
const email = faker.internet.email();
```

### 3. Testes com Base URL
**Arquivo:** `test-com-baseurl.cy.js`

Utiliza a URL base configurada no cypress.config.js:
```javascript
cy.visit('/'); // Usa a baseUrl automaticamente
```

### 4. Testes com Commands Customizados
**Arquivo:** `test-com-commands-fluxo-carrinho.cy.js`

Usa commands reutilizáveis para fluxos comuns:
```javascript
cy.login(usuario, senha);
cy.adicionarAoCarrinho('Produto 1');
cy.finalizarCompra();
```

### 5. Testes com Upload de Arquivo
**Arquivo:** `test_upload_de_arquivo.cy.js`

Demonstra upload de arquivos:
```javascript
cy.get('input[type="file"]').selectFile('caminho/arquivo.pdf');
```

## Relatórios

### Geração Automática

O relatório HTML com gráfico é gerado **automaticamente e sem dependências externas** ao rodar `npm test`:

1. **Cypress executa todos os testes** (10 arquivos de teste)
2. **cypress-mochawesome-reporter** converte resultados em HTML
3. **inserir-grafico.js** adiciona um gráfico SVG com estatísticas
4. **Resultado final:** `cypress/reports/relatorio-curso-cypress.html`

### Conteúdo do Relatório

- 📊 **Gráfico SVG:** Visualização de testes passados vs. falhados
- 📈 **Estatísticas:** Total de testes, taxa de sucesso (%)
- ✅ **Detalhes dos Testes:** Nome, status, duração, código
- 📷 **Screenshots:** Capturadas automaticamente em falhas
- 🎥 **Vídeos:** Gravação completa da execução
- ⏱️ **Duração:** Tempo total de cada teste e suite

### Como Visualizar

Após rodar `npm test`, abra o arquivo em seu navegador:
```
cypress/reports/relatorio-curso-cypress.html
```

## GitHub Actions

### Como Funciona

O arquivo `.github/workflows/cypress-tests.yml` configura um pipeline que:

1. **Dispara automaticamente em:**
   - Push para `main` ou `develop`
   - Pull requests para `main` ou `develop`

2. **Executa no servidor GitHub:**
   - Instala Node.js 18.x
   - Instala dependências com `npm install`
   - Roda testes com `npm test` (que já inclui gráfico)

3. **Salva artefatos por 30 dias:**
   - Relatório HTML com gráfico
   - Screenshots
   - Vídeos

### Ver Resultados

1. Faça push ou crie um PR
2. Vá para a aba **"Actions"** no GitHub
3. Clique na execução do workflow
4. Faça download dos artefatos em **"Artifacts"**

## Script de Geração de Gráfico

### Arquivo: `inserir-grafico.js`

Este script Node.js:
- ✅ Lê o relatório HTML gerado
- ✅ Extrai dados de testes do atributo `data-raw` (JSON embutido)
- ✅ Gera um gráfico SVG com estatísticas
- ✅ Insere o gráfico no início do relatório (após `<body>`)
- ✅ **Não depende de bibliotecas externas** (Chart.js, etc.)

### Como Funciona

```javascript
// Localiza o relatório HTML
const relatorioPath = path.join(reportsDir, files[0]);

// Extrai dados JSON embutido no HTML
const dataRawMatch = html.match(/data-raw="([^"]+)"/);
const passes = data.stats.passes;
const failures = data.stats.failures;

// Gera SVG com barras verdes (passados) e vermelhas (falhados)
// Insere na linha 1 do HTML
```

### Execução Automática

O script roda automaticamente em `npm test`:
```json
{
  "scripts": {
    "test": "npm run clean && cypress run || node inserir-grafico.js || true"
  }
}
```

**Nota:** O `|| node inserir-grafico.js` garante que o gráfico seja gerado **mesmo que testes falhem**.

## Comandos npm

```bash
# 🚀 Executar testes, gerar HTML e inserir gráfico automaticamente
npm test

# 🧹 Limpar relatórios anteriores (apaga cypress/reports)
npm run clean

# 📋 Executar apenas testes no terminal
npx cypress run

# 🖥️ Abrir Cypress Test Runner (interface gráfica)
npx cypress open

# 📊 Gerar/atualizar gráfico manualmente no relatório existente
node inserir-grafico.js
```

### O que `npm test` faz:

1. Limpa relatórios antigos (`npm run clean`)
2. Executa todos os testes Cypress (`cypress run`)
3. **Insere automaticamente o gráfico SVG** (`node inserir-grafico.js`)
4. Tudo isso mesmo que houver testes falhando ✅

## Dependências Principais

| Pacote | Versão | Descrição |
|--------|--------|-----------|
| cypress | ^15.7.1 | Framework de testes E2E |
| mochawesome | ^7.1.4 | Reporter HTML |
| cypress-mochawesome-reporter | ^4.0.2 | Integração Cypress + Mochawesome |
| @faker-js/faker | Latest | Geração de dados fake |
| mochawesome-merge | ^5.1.0 | Merge de relatórios |
| mochawesome-report-generator | ^6.3.2 | Gerador de relatório |

## Configuração do Cypress

**Arquivo:** `cypress.config.js`

```javascript
module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com/',
    specPattern: 'cypress/e2e/**/*.cy.js',
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true,
      reportFilename: 'relatorio-curso-cypress'
    },
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    video: true,
    videosFolder: 'cypress/videos'
  }
});
```

## Troubleshooting

### Gráfico não aparece no relatório

Se o gráfico não aparecer, execute manualmente:
```bash
node inserir-grafico.js
```

Verifique a saída:
```
✓ Encontrado em data-raw: X passados, Y falhados
✓ Gráfico inserido após <body ...>
✅ Sucesso!
```

### Relatório HTML não foi gerado

```bash
# Verifique se a pasta existe
ls cypress/reports

# Execute manualmente
npx cypress run
node inserir-grafico.js
```

### Testes falhando no GitHub Actions

- Verifique se a baseUrl está acessível
- Confirme credenciais/dados de teste
- Veja os logs no Actions do GitHub
- Downloads screenshots/vídeos dos artefatos

### Problema ao executar `npm test`

Limpe tudo e tente novamente:
```bash
npm run clean
npm test
```

## Boas Práticas

✅ Use **fixtures** para dados estáticos  
✅ Use **Faker** para dados dinâmicos  
✅ Crie **commands customizados** para ações repetitivas  
✅ Organize testes em **pastas por funcionalidade**  
✅ Use **data-testid** nos elementos HTML  
✅ Evite **delays** desnecessários com `cy.wait()`  
✅ Use **cy.contains()** para textos visíveis  

## Contribuindo

1. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
2. Commit suas mudanças (`git commit -am 'Adiciona MinhaFeature'`)
3. Push para a branch (`git push origin feature/MinhaFeature`)
4. Abra um Pull Request

## Autor

Desenvolvido por Uelton Gomes como projeto educacional de Cypress.

## Licença

ISC

---

**💡 Dica:** Para mais informações sobre Cypress, visite [docs.cypress.io](https://docs.cypress.io)

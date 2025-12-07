const fs = require('fs');
const path = require('path');

// Busca o arquivo HTML do relatório na pasta cypress/reports
const reportsDir = path.join(__dirname, 'cypress', 'reports');

if (!fs.existsSync(reportsDir)) {
  console.error('Pasta cypress/reports não existe');
  process.exit(1);
}

const files = fs.readdirSync(reportsDir).filter(f => f.endsWith('.html'));

if (files.length === 0) {
  console.error('Nenhum relatório HTML encontrado em:', reportsDir);
  process.exit(1);
}

const relatorioPath = path.join(reportsDir, files[0]);
console.log('📄 Processando:', relatorioPath);

let html = fs.readFileSync(relatorioPath, 'utf8');

// Extrai dados - tenta várias abordagens
let passes = 0;
let failures = 0;

// Abordagem 1: Procura no data-raw (JSON embutido no HTML do mochawesome)
const dataRawMatch = html.match(/data-raw="([^"]+)"/);
if (dataRawMatch) {
  try {
    // Decodifica as entidades HTML e faz parse do JSON
    const decodedJson = dataRawMatch[1]
      .replace(/&quot;/g, '"')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&#x27;/g, "'")
      .replace(/&amp;/g, '&');
    
    const data = JSON.parse(decodedJson);
    if (data.stats) {
      passes = data.stats.passes || 0;
      failures = data.stats.failures || 0;
      console.log(`✓ Encontrado em data-raw: ${passes} passados, ${failures} falhados`);
    }
  } catch (e) {
    console.log('Erro ao fazer parse do JSON em data-raw, tentando outro método...');
  }
}

// Abordagem 2: Se não funcionou, procura por "Passed X" ou "X passed"
if (passes === 0 && failures === 0) {
  const passMatch = html.match(/(?:Passed|passed|Passaram|passaram)\s*:?\s*(\d+)/i);
  if (passMatch) {
    passes = parseInt(passMatch[1], 10);
    console.log(`✓ Encontrado "Passed": ${passes}`);
  }

  const failMatch = html.match(/(?:Failed|failed|Falharam|falharam)\s*:?\s*(\d+)/i);
  if (failMatch) {
    failures = parseInt(failMatch[1], 10);
    console.log(`✓ Encontrado "Failed": ${failures}`);
  }
}


console.log(`\n📊 Resultado: ${passes} passados, ${failures} falhados\n`);

// Cria um gráfico SVG melhorado
const maxValue = Math.max(passes, failures, 10);
const scale = 100 / maxValue;

const graficSvg = `
<div style="margin: 40px auto; text-align: center; max-width: 550px; padding: 20px; background: #f5f5f5; border-radius: 8px;">
  <h2 style="color: #333; margin-bottom: 20px;">📊 Resumo dos Testes</h2>
  <svg width="350" height="250" style="border: 2px solid #ddd; border-radius: 5px; background: white;">
    <!-- Grid linhas horizontais -->
    <line x1="50" y1="180" x2="330" y2="180" stroke="#e0e0e0" stroke-width="1"/>
    <line x1="50" y1="130" x2="330" y2="130" stroke="#e0e0e0" stroke-width="1"/>
    <line x1="50" y1="80" x2="330" y2="80" stroke="#e0e0e0" stroke-width="1"/>
    <line x1="50" y1="30" x2="330" y2="30" stroke="#e0e0e0" stroke-width="1"/>
    
    <!-- Eixo X -->
    <line x1="50" y1="190" x2="330" y2="190" stroke="black" stroke-width="2"/>
    <!-- Eixo Y -->
    <line x1="50" y1="30" x2="50" y2="190" stroke="black" stroke-width="2"/>
    
    <!-- Labels do eixo Y -->
    <text x="40" y="195" text-anchor="end" font-size="10" fill="#666">0</text>
    <text x="40" y="145" text-anchor="end" font-size="10" fill="#666">${Math.round(maxValue/2)}</text>
    <text x="40" y="35" text-anchor="end" font-size="10" fill="#666">${maxValue}</text>
    
    <!-- Barra de Passados (verde) -->
    <g>
      <rect x="100" y="${190 - (passes * scale)}" width="70" height="${Math.max(passes * scale, 1)}" fill="#4caf50" rx="3"/>
      <text x="135" y="210" text-anchor="middle" font-size="12" font-weight="bold">Passados</text>
      <text x="135" y="${175 - (passes * scale)}" text-anchor="middle" font-size="16" font-weight="bold" fill="#4caf50">${passes}</text>
    </g>
    
    <!-- Barra de Falhados (vermelho) -->
    <g>
      <rect x="230" y="${190 - (failures * scale)}" width="70" height="${Math.max(failures * scale, 1)}" fill="#f44336" rx="3"/>
      <text x="265" y="210" text-anchor="middle" font-size="12" font-weight="bold">Falhados</text>
      <text x="265" y="${175 - (failures * scale)}" text-anchor="middle" font-size="16" font-weight="bold" fill="#f44336">${failures}</text>
    </g>
  </svg>
  
  <div style="margin-top: 20px; padding: 15px; background: white; border-radius: 5px;">
    <p style="margin: 5px 0; font-size: 15px;">
      <strong>Total de testes:</strong> <span style="color: #333; font-size: 18px; font-weight: bold;">${passes + failures}</span>
    </p>
    <p style="margin: 5px 0; font-size: 15px;">
      <strong>Taxa de sucesso:</strong> <span style="color: #4caf50; font-size: 18px; font-weight: bold;">${((passes / (passes + failures)) * 100 || 0).toFixed(1)}%</span>
    </p>
  </div>
</div>
<hr style="margin: 30px 0; border: 1px solid #ddd;">
`;

// Tenta inserir o gráfico logo após <body> ou <body ...>
if (html.match(/<body[^>]*>/)) {
  html = html.replace(/(<body[^>]*>)/, `$1\n${graficSvg}`);
  console.log('✓ Gráfico inserido após <body ...>');
} else {
  console.error('✗ Não foi possível encontrar tag <body> no HTML');
  process.exit(1);
}

fs.writeFileSync(relatorioPath, html, 'utf8');
console.log(`✅ Sucesso! Gráfico inserido em: ${relatorioPath}`);

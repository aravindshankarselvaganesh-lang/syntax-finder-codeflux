const fs = require('fs');
const path = require('path');

const md = fs.readFileSync('files/PSM_Research_Report.md', 'utf8');
const demoData = JSON.parse(fs.readFileSync('files/demo_data_assam_gujarat.json', 'utf8'));

// Convert CSV to JSON roughly
const parseCSV = (csv) => {
  const lines = csv.split('\n').filter(l => l.trim());
  const headers = lines[0].split(',').map(h => h.trim());
  return lines.slice(1).map(line => {
    const values = [];
    let inQuotes = false;
    let current = '';
    for (let i=0; i<line.length; i++) {
      if (line[i] === '"') { inQuotes = !inQuotes; continue; }
      if (line[i] === ',' && !inQuotes) { values.push(current); current = ''; continue; }
      current += line[i];
    }
    values.push(current);
    
    const obj = {};
    headers.forEach((h, i) => { obj[h] = values[i]; });
    return obj;
  });
};

const historicalIncidents = parseCSV(fs.readFileSync('files/historical_incidents.csv', 'utf8'));
const taxonomy = parseCSV(fs.readFileSync('files/failure_taxonomy.csv', 'utf8'));
const sources = parseCSV(fs.readFileSync('files/sources.csv', 'utf8'));

const rag = fs.readFileSync('files/rag_records.jsonl', 'utf8')
  .split('\n')
  .filter(l => l.trim())
  .map(l => JSON.parse(l));

const output = `
export const RESEARCH_REPORT = \`${md.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
export const DEMO_DATA = ${JSON.stringify(demoData, null, 2)};
export const HISTORICAL_INCIDENTS = ${JSON.stringify(historicalIncidents, null, 2)};
export const FAILURE_TAXONOMY = ${JSON.stringify(taxonomy, null, 2)};
export const SOURCES = ${JSON.stringify(sources, null, 2)};
export const RAG_RECORDS = ${JSON.stringify(rag, null, 2)};
`;

fs.writeFileSync('frontend/src/data/intelligenceData.js', output);
console.log('Successfully generated frontend/src/data/intelligenceData.js');

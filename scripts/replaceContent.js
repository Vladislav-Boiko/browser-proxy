const fs = require('fs');

const WHERE = 'dist/src/content_template.js';
const WHAT = 'dist/src/injected_prepared.js';
const OUTPUT = 'dist/src/content.js';

try {
  const where = fs.readFileSync(WHERE, 'utf8');
  let what = fs.readFileSync(WHAT, 'utf8');
  what = what.replace(/\`/g, '\\`');
  what = what.replace(/\$\{/g, '\\${');
  fs.writeFileSync('dist/src/injected_result.js', what, 'utf8');
  const result = where.replace(/"PLACEHOLDER"/, '`' + what + '`');
  fs.writeFileSync(OUTPUT, result, 'utf8');
} catch (e) {
  console.error(e);
}

const fs = require('fs');
const file = fs.readFileSync('src/PageContent.jsx', 'utf8');
const start = file.indexOf('there is an answer');
const chunk = file.substr(start, 700);
// Show all chars and codes around idx 376
for (let i = 370; i < 410; i++) {
  console.log(i, JSON.stringify(chunk[i]), chunk.charCodeAt(i));
}

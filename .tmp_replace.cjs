const fs = require('fs');
const path = 'src/PageContent.jsx';
let c = fs.readFileSync(path, 'utf8');

// Match using regex tolerant to whitespace (incl NBSP) on indentation lines
const oldRe = /              there is an answer you cannot find, please read FAQ\n[ \u00A0]*\n              <br \/>\n[ \u00A0]+<\/p>\n[ \u00A0]+<a\n[ \u00A0]+href="\/faq-FirstStepHack {0,500}-protothon-2021"\n[ \u00A0]+className="yellow-button w-button"\n[ \u00A0]+>\n[ \u00A0]+READ FAQ\n[ \u00A0]+<\/a>\n[ \u00A0]+<\/div>\n[ \u00A0]+<\/div>\n[ \u00A0]+<\/header>/;

const newText = [
  '              there is an answer you cannot find, please read FAQ',
  '              <br />',
  '            </p>',
  '            <div className="flex flex-wrap gap-3 items-center pt-2">',
  '              <a',
  '                href="/faq-FirstStepHack                                                                                                                         -protothon-2021"',
  '                className="yellow-button w-button group inline-flex items-center"',
  '                style={{ borderRadius: "9999px", gap: 10 }}',
  '              >',
  '                READ FAQ',
  '                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />',
  '              </a>',
  '              <a',
  '                href="mailto:hello@firststephack.com"',
  '                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-slate-200 text-[#023345] font-bold hover:bg-slate-50 transition-colors text-sm"',
  '              >',
  '                <Mail className="w-4 h-4" />',
  '                Email Us',
  '              </a>',
  '            </div>',
  '          </motion.div>',
  '        </div>',
  '      </header>'
].join('\n');

if (!oldRe.test(c)) {
  console.log('Regex not matched');
  process.exit(1);
}
c = c.replace(oldRe, newText);
fs.writeFileSync(path, c);
console.log('OK have-a-question replaced');

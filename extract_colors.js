const fs = require('fs');

const filepath = './color_sample.css';

const cssText = fs.readFileSync(filepath, 'utf-8');

const matches = [];

const newCss = cssText.replace(/(?:\r\n|\r|\n)/g,'').replace(/\{(.*?)\}/gmi, match => {
	return match.replace(/#([A-Fa-f0-9]{3}){1,2}/g, hex => {
		const rgb = hexToRgbA(hex);
		matches.push(rgb);
	});
});

const stringColors = matches.map(JSON.stringify.bind(JSON)) //new Set();

const filtered = Array.from(new Set(stringColors)).map(JSON.parse);

fs.writeFileSync('./color_swatch.js', `
module.exports = ${JSON.stringify(filtered)}
`, 'utf-8');


function hexToRgbA(hex){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return { r: (c>>16)&255, g: (c>>8)&255, b: c&255 }
    }
    throw new Error('Bad Hex:' + hex);
}


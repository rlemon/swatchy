import { Router } from 'express';
import css from 'css';
import requestAsync from 'request-promise-native';

const router = Router();

// possible cases for color changes (not complete)
const properties = [
	'background',
	'color',
	'background-color',
	'border-color',
	'box-shadow',
	'border-top-color',
	'border-right-color',
	'border-bottom-color',
	'border-left-color',
	'border',
	'border-bottom',
	'border-left',
	'border-right',
	'border-top',
	'text-shadow',
	'-webkit-text-fill-color',
	'background-image',
	'stroke',
	'fill'
];

function invertRgb(rgb) {
	return {
		r: 255 - rgb.r,
		g: 255 - rgb.g,
		b: 255 - rgb.b,
		a: rgb.a
	}
}

function getColorWeight(clr1, clr2) {
	return 	Math.pow((clr2.r - clr1.r), 2) + 
			Math.pow((clr2.g - clr1.g), 2) + 
			Math.pow((clr2.b - clr1.b), 2)
}

function getClosestColor(clr, swatch) {
	const chosen = {
		rgb: {},
		value: 1e99
	};
	for( const color of swatch ) {
		const weight = getColorWeight(color, clr);
		if( weight < chosen.value ) {
			chosen.value = weight;
			chosen.rgb = color;
			if( typeof chosen.rgb.a === 'undefined' ) {
				chosen.rgb.a = 1;
			}
		}
	}
	return chosen.rgb;
}

function hexToRgbA(hex){
	let c;
	if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
		c= hex.substring(1).split('');
		if(c.length== 3){
			c= [c[0], c[0], c[1], c[1], c[2], c[2]];
		}
		c= '0x'+c.join('');
		return { r: (c>>16)&255, g: (c>>8)&255, b: c&255 , a: 1 }
	}
	throw new Error('Bad Hex:' + hex);
}


/*::TODO

add an invert option on the client. they should be able to match to their
swatch OR invert and match.
seems kinda useful? 

*/
router.post('/transform', async (req, res) => {
	const { url, inputcss } = req.body;
	const swatch = JSON.parse(req.body.swatch);

	let input;
	if( url ) {
		const response = await requestAsync({
			uri: url
		});
		input = response;
	} else {
		input = inputcss;
	}
	const parsedCss = css.parse(input);
	for( const rule of parsedCss.stylesheet.rules ) {
		if( !rule.declarations ) continue;
		for( const declaration of rule.declarations ) {
			if( properties.includes(declaration.property) ) {
				declaration.value = declaration.value.replace(/#([A-Fa-f0-9]{3}){1,2}|rgba?\((.*?)\)/g, match => {
					let rgb;
					if( /#/g.test(match) ) {
						rgb = hexToRgbA(match);
					} else {
						const parts = match.match(/(\d+)/g);
						rgb = {
							r: parts[0], 
							g: parts[1], 
							b: parts[2], 
							a: typeof parts[3] === 'undefined' ? 1 : parts[3]
						};
					}
					const invertedRgb = invertRgb(rgb);
					const newColor = getClosestColor(invertedRgb, swatch);
					return `rgba(${newColor.r},${newColor.g},${newColor.b},${newColor.a})`;
				});
			}
		}
	}
	const cssString = css.stringify(parsedCss, { compress: false });
	res.json({cssString});
});

export default router;
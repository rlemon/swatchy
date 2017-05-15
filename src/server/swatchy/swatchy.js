import css from 'css';
import defaultProperties from './defaultProperties';
import { invertRgb } from './inverters';
import { hexToRgbA } from './converters';

const reColor = /#([A-Fa-f0-9]{3}){1,2}|rgba?\((.*?)\)/g;
const reDigit = /(\d+)/g;
// regexp has state in .test, so I don't store an expression for the hash check.

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

export default function Swatchy(options) {
	/*	Options::
		input (css string)
		swatch (array of color objects)
		invert (boolean)
		compress (boolean)
	*/
	const properties = options.properties || defaultProperties;
	const parsedCss = css.parse(options.input, { silent: true });
	for( const rule of parsedCss.stylesheet.rules ) {
		if( !rule.declarations ) continue;
		for( const declaration of rule.declarations ) {
			if( properties.includes(declaration.property) ) {
				declaration.value = declaration.value.replace(reColor, match => {
					let rgb;
					if( /#/g.test(match) ) {
						rgb = hexToRgbA(match);
					} else {
						const parts = match.match(reDigit);
						rgb = {
							r: parts[0],
							g: parts[1],
							b: parts[2],
							a: typeof parts[3] === 'undefined' ? 1 : parts[3]
						};
					}
					if( options.invert ) {
						rgb = invertRgb(rgb);
					}
					const newColor = getClosestColor(rgb, options.swatch);
					return `rgba(${newColor.r},${newColor.g},${newColor.b},${newColor.a})`;
				});
			}
		}
	}
	const cssString = css.stringify(parsedCss, { compress: options.compress, sourcemap: false });
	return cssString;
}
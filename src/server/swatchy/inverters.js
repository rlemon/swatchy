export function invertRgb(rgb) {
	return {
		r: 255 - rgb.r,
		g: 255 - rgb.g,
		b: 255 - rgb.b,
		a: rgb.a
	}
}
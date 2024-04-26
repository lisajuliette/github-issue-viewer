export function isLight(colorHex: string): boolean {
	let r: number = 0;
	let g: number = 0;
	let b: number = 0;

	if (colorHex.charAt(0) === '#') {
		colorHex = colorHex.slice(1);
	}

	if (colorHex.length === 3) {
		r = parseInt(colorHex[0] + colorHex[0], 16);
		g = parseInt(colorHex[1] + colorHex[1], 16);
		b = parseInt(colorHex[2] + colorHex[2], 16);
	} else if (colorHex.length === 6) {
		r = parseInt(colorHex.slice(0, 2), 16);
		g = parseInt(colorHex.slice(2, 4), 16);
		b = parseInt(colorHex.slice(4, 6), 16);
	}

	const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
	return luminance > 0.5;
}

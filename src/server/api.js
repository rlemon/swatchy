import { Router } from 'express';
import requestAsync from 'request-promise-native';
import Swatchy from './swatchy/swatchy.js';

const router = Router();

router.post('/transform', async (req, res) => {
	try {
		let { swatch, cssinput, url } = req.body;

		if( url ) {

		}
		const options = {
			invert: true,
			compress: false,
			input: cssinput,
			swatch: JSON.parse(swatch)
		};
		const cssString = Swatchy(options);
		return res.json({cssString});
	} catch(error) {
		res.json({error});
	}
});

export default router;

/*
	const { url, inputcss } = req.body;
	let swatch;
	try {
		swatch = JSON.parse(req.body.swatch);
	} catch (error) {
		return res.json({error});
	}
	let input;
	if( url ) {
		try {
			const response = await requestAsync({
				uri: url
			});
			input = response;
		} catch (error) {
			return res.json({error})
		}
	} else {
		input = inputcss;
	}
	try {
		const cssString = Swatchy({
			invert: true,
			compress: false,
			swatch, input
		})
	} catch(error) {
		return res.json({error});
	}
	res.json({cssString});
	*/
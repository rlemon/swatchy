import express from 'express';
import apiEndpoints from './api';
import bodyParser from 'body-parser';

const app = express();
const PORT = 8080;

app.use(express.static(`${__dirname}/static`));
app.use(bodyParser.json());
app.use(bodyParser({ extended: true }));
app.use('/api', apiEndpoints);

app.use((req, res, next) => {
	res.sendFile('/index.html', {
		root: `${__dirname}/static`,
		headers: {
			'Content-Type': 'text/html'
		}}, err => {
		if( err ) res.status(err.status).end(err.message || '');
	})
});

app.listen(PORT, console.log.bind(console, `app listening on ${PORT}`));

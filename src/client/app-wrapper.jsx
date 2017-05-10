import React from 'react';

import './styles/style.scss';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	async handleSubmit(event) {
		event.preventDefault();
		const form = event.target;
		const data = [...new FormData(form).entries()].reduce((obj, entry) => {
			obj[entry[0]] = entry[1];
			return obj;
		},{});
		const response = await fetch('/api/transform', {
			method: 'POST', 
			body: JSON.stringify(data),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			credentials: 'same-origin'
		});
		const json = await response.json();
		this.refs.output.value = json.cssString;
	}
	render() {
		return <div className="app-wrapper">
			<h1>rlemon's autodark</h1>
			<h2>How does it work?</h2>
			<p>autodark takes you css input, or css url and attempts to match the inverse of the colors present with the closest match in your provided swatch file.</p>
			<h3>Swatch</h3>
			<p>please provide an array of objects containing the rgba values for your swatch. example: </p>
			<pre><code>
{`[ {"r":34,"g":34,"b":34},
{"r":26,"g":26,"b":26},
{"r":221,"g":221,"b":221},
{"r":17,"g":17,"b":17},
{"r":22,"g":22,"b":22},
{"r":204,"g":204,"b":204},
{"r":84,"g":84,"b":84},
{"r":80,"g":159,"b":216},
{"r":51,"g":51,"b":51},
{"r":69,"g":69,"b":69},
{"r":153,"g":153,"b":153},
{"r":238,"g":238,"b":238},
{"r":36,"g":36,"b":36},
{"r":119,"g":152,"b":194},
{"r":34,"g":68,"b":170},
{"r":255,"g":255,"b":255},
{"r":102,"g":102,"b":102},
{"r":60,"g":57,"b":50},
{"r":170,"g":170,"b":170},
{"r":40,"g":40,"b":40},
{"r":255,"g":187,"b":119},
{"r":255,"g":221,"b":187},
{"r":187,"g":187,"b":187},
{"r":136,"g":136,"b":136},
{"r":119,"g":119,"b":119} ]`}
			</code></pre>
			<form onSubmit={event=>this.handleSubmit(event)}>
			<textarea id="swatch" name="swatch" placeholder="swatch information"></textarea>
			<h3>Sheet</h3>
			<p>
			you can provide a url to the css sheet or paste its contents in the textarea below
			</p>
			<input type="text" id="url" name="url" placeholder="url to sheet" />
			<textarea id="inputcss" name="inputcss" placeholder="sheet css"></textarea>
			<button type="submit">Submit</button>
			</form>
			<h3>Output</h3>
			<p>below is your new sheet css</p>
			<textarea ref="output" placeholder="rendered sheet css"></textarea>
		</div>;
	}
}
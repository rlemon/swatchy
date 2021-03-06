import React from 'react';

import ColorPicker from '../components/color-picker';

export default class InBrowser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			swatchInput: '',
			cssInput: ''
		}
	}
	async doSwatchy() {
		const data = {cssinput: this.state.cssInput, swatch: this.state.swatchInput};
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
		if( 'cssString' in json ) {
			this.refs.output.value = json.cssString;
		}
	}
	handleKeyDown(event) {
		this.setState({cssInput: this.refs.input.value}, _ => this.doSwatchy());
	}
	handleColorPicker() {
		console.log(this.refs.doeshaveref);
	}
	/* 	check out how babeljs.io/repl does it 
		it looks like they're using a debounce script on the keydown.
		on error they display a warning, which is also nice. 
		they also have the options as checkboxes.. which I should do

	*/
	render() {
		return <section className="component__section">
					<h2 className="component__sub-title">Try Swatchy!</h2>
					<div className="grid">
						<div className="grid__row grid__row--md">
							<div className="grid__item swatch-area">
								<ColorPicker 
									onClick={_ => this.handleColorPicker()} />
							</div>
						</div>
						<div className="grid__row grid__row--md">
							<div className="grid__item code-area">
								<h3 className="code-area__title">Original CSS</h3>
								<textarea ref="input" className="code-area__input" 
									onKeyPress={event => this.handleKeyDown(event)} 
									defaultValue={this.state.cssInput}></textarea>
							</div>
							<div className="grid__item code-area">
								<h3 className="code-area__title">New CSS</h3>
								<textarea ref="output" readOnly={true} className="code-area__input"></textarea>
							</div>
						</div>
					</div>
				</section>;
	}
}
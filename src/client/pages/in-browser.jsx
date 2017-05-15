import React from 'react';

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
	render() {
		return <section className="component__section">
					<h2 className="component__sub-title">Try Swatchy!</h2>
					<div className="grid">
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
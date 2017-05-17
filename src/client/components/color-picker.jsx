import React from 'react';

function noop(){}
export default function ColorPicker(props) {
	const { onOpen = noop, onInput = noop, onChange = noop } = props;
	return	<button className="picker__button" onClick={onOpen}>
				<input type="color" ref="doeshaveref" onChange={onChange} onInput={onInput} className="picker__input" />
				<svg viewBox="0 0 24 24" className="picker__svg">
					<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
				</svg>
			</button>
}
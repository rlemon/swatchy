import React from 'react';
import bluebird from 'bluebird';

// Will be added as a static function on the component
function getQuery(queryName, queryArgs) {
	let query = this.dataComponentConfig.queries[queryName];

	if (!query) {
		throw new Error(`query ${queryName} not found.`);
	}

	return query(queryArgs);
}

function makeDataWrapperComponent(Component) {

	class DataWrapperComponent extends React.Component
	{
		constructor(props, context) {
			super(props, context);
			this.state = {
				dataLoaded: false,
				data: null
			};
		}
		loadData(params) {
			const queries = Component.dataComponentConfig.queries;
			const data = {};
			for (let key in queries) {
				data[key] = queries[key](params);
			}

			bluebird.props(data).then(data => {
				this.setState({
					data,
					dataLoaded: true
				});
			});
		}
		componentDidMount() {
			this.loadData(this.props.params);
		}
		componentWillReceiveProps(a) {
			let shouldReloadData = false;
			const newParams = a.params;
			const oldParams = this.props.params;
			Object.keys(newParams).forEach( key => {
				if( oldParams[key] !== newParams[key] ) {
					shouldReloadData = true;
				} else {
					newParams[key] = oldParams[key];
				}
			});
			if( shouldReloadData ) this.loadData(newParams);
		}
		render() {
			const messages = [
				"640K ought to be enough for anybody",
				"the architects are still drafting",
				"the bits are breeding",
				"we're building the buildings as fast as we can",
				"would you prefer chicken, steak, or tofu?",
				"pay no attention to the man behind the curtain",
				"enjoy the elevator music",
				"while the little elves draw your map",
				"a few bits tried to escape, but we caught them",
				"dream of faster computers",
				"would you like fries with that?",
				"checking the gravitational constant in your locale",
				"go ahead -- hold your breath",
				"at least you're not on hold",
				"hum something loud while others stare",
				"you're not in Kansas any more",
				"the server is powered by a lemon and two electrodes",
				"we love you just the way you are",
				"while a larger software vendor in Seattle takes over the world",
				"we're testing your patience",
				"please wait... as if you had any other choice",
				"take a moment to sign up for our lovely prizes",
				"don't think of purple hippos",
				"follow the white rabbit",
				"why don't you order a sandwich?",
				"while the satellite moves into position",
				"the bits are flowing slowly today",
				"dig on the 'X' for buried treasure... ARRR!",
				"it's still faster than you could draw it"
			];
			if (this.state.dataLoaded) {
				return <Component {...this.state.data} {...this.props} />;
			}
			else {
				return (
					<div style={{textAlign: 'center', margin: 100}} >
						<p style={{padding: '1rem'}}>{messages[Math.floor(Math.random()*messages.length)]}</p>
					</div>
				);
			}
		}
	}

	return DataWrapperComponent;
}

// a @decorator(config) is a component that has some queries attached to it
export function dataComponent(config) {
	return function decorator(Component) {

		Component.dataComponentConfig = config;
		Component.getQuery = getQuery;

		return Component;
	};
}

// a @page(config) is a dataComponent that is a root and gets it's params from
// this.props.params (there react-router puts them)
export function page(config) {
	return function decorator(Component) {
		dataComponent(config)(Component);

		return makeDataWrapperComponent(Component);
	};
}
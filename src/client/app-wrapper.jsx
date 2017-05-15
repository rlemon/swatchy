import React from 'react';
import { Link } from 'react-router';

import './styles/style.scss';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	render() {
		return <div className="app-wrapper">
			<header className="app-header">
				<nav className="app-header-nav">
					<Link to='/' className="app-header-nav__link">Swatchy!</Link>
					<Link to='/' className="app-header-nav__link"><i className="fa fa-github"></i></Link>
				</nav>
				<div className="container">
					<h1 className="app-header__title">Swatchy - CSS Color Manipulator</h1>
				</div>
			</header>

			<main className="app-content">

				<div className="container">
					<nav className="app-sub-nav">
						<ul className="app-sub-nav__items">
							<li className="app-sub-nav__item">
								<Link to='/about' className="app-sub-nav__link">What does it do?</Link>
							</li>
							<li className="app-sub-nav__item">
								<Link to='/swatch' className="app-sub-nav__link">Swatch Designer</Link>
							</li>
							<li className="app-sub-nav__item">
								<Link to='in-browser' className="app-sub-nav__link">Try Swatchy!</Link>
							</li>
							<li className="app-sub-nav__item">
								<Link to='/' className="app-sub-nav__link">Code</Link>
							</li>
						</ul>
					</nav>
				</div>
				
				{this.props.children}


			</main>

		<footer className="app-footer">
			<div className="container">
				<small>Swatchy &copy; {new Date().getYear() + 1900}, <a href="http://rlemon.ca" target="_blank">rlemon.ca</a></small>
			</div>
		</footer>

		</div>;
	}
}
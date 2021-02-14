import React, { Component } from "react";
import { Switch, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Install from "./Install";

export default class Panel extends Component {
	render() {
		return (
			<div>
				<BrowserRouter>
 					<Switch>
 						<Route path="/install" exact={true}>
 							<Install />
 						</Route>
 						<Route path="/" exact={true}>
							<h1>Hello w0rld</h1>
 						</Route>
 					</Switch>
 				</BrowserRouter>
			</div>
		)
	}
}

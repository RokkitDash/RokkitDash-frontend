import React, { Component, useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Loading from "./components/Loading";
import Install from "./pages/Install";
import Panel from "./pages/Panel";

interface Props {

}

interface State {
	mode: string;
}

export default class App extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.getMode = this.getMode.bind(this);
	
		this.state = {
			mode: "loading"
		}
	}

	//TODO: Better network calls
	async getMode() {
		const res = await fetch("/api/mode");
		const { mode } = await res.json();
		this.setState({ mode });
	}

	async componentDidMount() {
		//await this.getMode();
		this.setState({ mode: "install" });
	}

	render() {
		switch(this.state.mode) {
			case "loading":
				return <Loading />;
			case "install":
				return <Install />;
			case "panel":
				return <Panel />;
			default:
				return <h1>Unknown mode</h1>;
		}
	}
}

// return (
// 	<div>
// 		<BrowserRouter>
// 			<Switch>
// 				<Route path="/install" exact={true}>
// 					<Install />
// 				</Route>
// 				<Route path="/" exact={true}>
// 					<h1>Hello, World!</h1>
// 				</Route>
// 			</Switch>
// 		</BrowserRouter>
// 	</div>
// );

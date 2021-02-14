import React, { Component } from "react";
import { Select, MenuItem, TextField, Typography, AccordionSummary, Accordion, AccordionDetails, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Button } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase, faGlobe, faUser, faCheck } from "@fortawesome/free-solid-svg-icons";

interface Props {

}

interface State {
	dbType?: "mysql" | "mariadb" | "postgres" | "mssql";
	dbHost?: string;
	dbPort?: number;
	dbUsername?: string;
	dbPassword?: string;

	domainConfigure?: boolean;
	domainName?: string;

	loginUsername?: string;
	loginPassword?: string;

	expanded?: string;
}

export default class Install extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			dbType: "mysql",
			dbHost: "",
			dbPort: 0,
			dbUsername: "",
			dbPassword: "",
			domainConfigure: false,
			domainName: "",
			loginUsername: "admin",
			loginPassword: "",
			expanded: "dbPanel"
		};

		this.changePanel = this.changePanel.bind(this);
		this.changeConfig = this.changeConfig.bind(this);
	}

	changePanel(panel: string) {
		return (event: React.ChangeEvent<{}>, isExpanded: any) => {
			this.setState({
				expanded: this.state.expanded === panel ? undefined : panel
			});
		}
	}
	
	changeConfig<K extends keyof State>(key: K, value: State[K]) {
		this.setState({
			[key]: value
		});
	}

	async componentDidMount() {

	}

	render() {
		return (
			<div className="install-root">
				<h2 className="install-title">Welcome to RokkitDash</h2>
				<h2 className="install-title-small">Installation</h2>

				{/* Database setup */}
				<Accordion className="accordion" expanded={this.state.expanded === "dbPanel"} onChange={this.changePanel("dbPanel")}>
					<AccordionSummary
						expandIcon={<ExpandMore htmlColor="rgb(200, 200, 200)" />}
						aria-controls="panel1bh-content"
						id="dbPanel-header"
					>
						<Typography className="accordion-heading">
							<FontAwesomeIcon icon={faDatabase} className="icon-heading" /> 
							Database
						</Typography>
						<Typography className="accordion-subheading">Database setup</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<h4 className="install-h4">Database Configuration</h4>
						<br />
						<Select onChange={e => this.changeConfig("dbType", e.target.value as State["dbType"])} className="quarter-width-input" defaultValue={"mysql"}>
							<MenuItem value={"mysql"}>MySQL</MenuItem>
							<MenuItem value={"mariadb"}>MariaDB</MenuItem>
							<MenuItem value={"postgres"}>PostgreSQL</MenuItem>
							<MenuItem value={"mssql"}>MS SQL</MenuItem>
						</Select>

						<br/>
						<br/>

						<TextField onChange={e => this.changeConfig("dbHost", e.target.value)} className="half-width-input" id="dbHost" label="Hostname" variant="outlined" />
						<TextField onChange={e => this.changeConfig("dbPort", parseInt(e.target.value))} className="port-input" id="dbPort" label="Port" variant="outlined" />

						<br/>
						<br/>

						<TextField onChange={e => this.changeConfig("dbUsername", e.target.value)} className="quarter-width-input" id="dbUsername" label="Username" variant="outlined" />
						<TextField onChange={e => this.changeConfig("dbPassword", e.target.value)} className="quarter-width-input floating-input" id="dbPassword" label="Password" type="password" autoComplete="current-password" variant="outlined" />
					</AccordionDetails>
				</Accordion>

				{/* Domain setup */}
				<Accordion className="accordion" expanded={this.state.expanded === "domainPanel"} onChange={this.changePanel("domainPanel")}>
					<AccordionSummary
						expandIcon={<ExpandMore htmlColor="rgb(200, 200, 200)" />}
						aria-controls="domainPanel-content"
						id="domainPanel-header"
					>
					<Typography className="accordion-heading">
						<FontAwesomeIcon icon={faGlobe} className="icon-heading" /> 
						Domain
					</Typography>
					<Typography className="accordion-subheading">Domain setup</Typography>
					</AccordionSummary>
					<AccordionDetails>
					<FormControl component="fieldset">
						<FormLabel component="legend"></FormLabel>
							<RadioGroup onChange={e => this.changeConfig("domainConfigure", e.target.value === "true")} aria-label="Root Domain">
								<FormControlLabel value={true} control={<Radio color="primary" />} label="Configure" />
								<FormControlLabel value={false} control={<Radio color="primary" />} label="Don't Configure" />
							</RadioGroup>
						</FormControl>
					</AccordionDetails>
				</Accordion>

				{/*User setup*/}
				<Accordion className="accordion" expanded={this.state.expanded === "userPanel"} onChange={this.changePanel("userPanel")}>
					<AccordionSummary
						expandIcon={<ExpandMore htmlColor="rgb(200, 200, 200)" />}
						aria-controls="userPanel-content"
						id="userPanel-header"
					>
					<Typography className="accordion-heading">
						<FontAwesomeIcon icon={faUser} className="icon-heading" /> 
						Login
					</Typography>
					<Typography className="accordion-subheading">User setup</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<TextField onChange={e => this.changeConfig("loginUsername", e.target.value)} defaultValue={this.state.loginUsername!} className="half-width-input" id="userUsername" label="Username" variant="outlined" />
						<br/>
						<br/>
						<TextField onChange={e => this.changeConfig("loginPassword", e.target.value)} className="half-width-input" id="userPassword" label="Password" type="password" autoComplete="current-password" variant="outlined" />
					</AccordionDetails>
				</Accordion>

				{/*Confirm configuration*/}
				<Accordion className="accordion" expanded={this.state.expanded === "confirmPanel"} onChange={this.changePanel("confirmPanel")}>
					<AccordionSummary
						expandIcon={<ExpandMore htmlColor="rgb(200, 200, 200)" />}
						aria-controls="confirmPanel-content"
						id="confirmPanel-header"
					>
					<Typography className="accordion-heading">
						<FontAwesomeIcon icon={faCheck} className="icon-heading" /> 
						Confirm
					</Typography>
					<Typography className="accordion-subheading">Confirm Details</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<h1>Database</h1>
						<h2>Database Type: {this.state.dbType}</h2>
						<h2>Database Host: {this.state.dbHost}</h2>
						<h2>Database Port: {this.state.dbPort}</h2>
						<h2>Database Username: {this.state.dbUsername}</h2>
						<h2>Database Password: {hidePass(this.state.dbPassword!)}</h2>
					</AccordionDetails>
					<Button variant="contained" className="install-button">Install</Button>
				</Accordion>
			</div>
		);
	}
}

const hidePass = (pass: string) => "•".repeat(pass.length);
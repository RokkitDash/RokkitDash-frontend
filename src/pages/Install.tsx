import React, { Component } from "react";
import { Select, MenuItem, TextField, Typography, AccordionSummary, Accordion, AccordionDetails, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase, faGlobe, faUser } from "@fortawesome/free-solid-svg-icons";

interface Props {

}

interface InstallDatabaseConfig {
	type?: string;
	host?: string;
	port?: number;
	username?: string;
	password?: string;
}

interface LoginConfig {
	username?: string;
	password?: string;
}

interface InstallConfig {
	database?: InstallDatabaseConfig;
	login?: LoginConfig;
}

interface State {
	config: InstallConfig;
	expanded?: string;
}

export default class Install extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			config: {
				database: {
					host: "",
					port: 0,
					type: "",
					username: "",
					password: ""
				},
				login: {
					username: "admin",
					password: ""
				}
			},
			expanded: "dbPanel"
		};

		this.changePanel = this.changePanel.bind(this);
		this.changeDatabaseConfigValue = this.changeDatabaseConfigValue.bind(this);
	}

	changePanel(panel: string) {
		return (event: React.ChangeEvent<{}>, isExpanded: any) => {
			this.setState({
				expanded: this.state.expanded === panel ? undefined : panel
			});
		}
	}

	changeDatabaseConfigValue(key: keyof InstallDatabaseConfig, value: any) {
		this.setState({
			config :{
				database: {
					[key]: value
				}
			}
		});
	}

	async componentDidMount() {

	}

	render() {
		console.log(this.state.config!.database!);
		return (
			<div className="install-root">
				<h2 className="install-title">Welcome to RokkitDash</h2>
				<h2 className="install-title-small">Installation</h2>
				{/* TODO: REMOVE THIS */}
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
						<Select onChange={e => this.changeDatabaseConfigValue("type", e.target.value)} className="quarter-width-input" defaultValue={"mysql"}>
							<MenuItem value={"mysql"}>MySQL</MenuItem>
							<MenuItem value={"mariadb"}>MariaDB</MenuItem>
							<MenuItem value={"postgres"}>PostgreSQL</MenuItem>
							<MenuItem value={"mssql"}>MS SQL</MenuItem>
						</Select>

						<br/>
						<br/>

						<TextField onChange={e => this.changeDatabaseConfigValue("host", e.target.value)} className="half-width-input" id="dbHost" label="Hostname" variant="outlined" />
						<TextField onChange={e => this.changeDatabaseConfigValue("port", parseInt(e.target.value))} className="port-input" id="dbPort" label="Port" variant="outlined" />

						<br/>
						<br/>

						<TextField onChange={e => this.changeDatabaseConfigValue("username", e.target.value)} className="quarter-width-input" id="dbUsername" label="Username" variant="outlined" />
						<TextField onChange={e => this.changeDatabaseConfigValue("password", e.target.value)} className="quarter-width-input floating-input" id="dbPassword" label="Password" type="password" autoComplete="current-password" variant="outlined" />
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
							<RadioGroup aria-label="Root Domain">
								<FormControlLabel value="configureDomain" control={<Radio color="primary" />} label="Configure" />
								<FormControlLabel value="doNotConfigureDomain" control={<Radio color="primary" />} label="Don't Configure" />
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
						<TextField defaultValue={this.state.config!.login!.username!} className="half-width-input" id="userUsername" label="Username" variant="outlined" />
						<br/>
						<br/>
						<TextField className="half-width-input" id="userPassword" label="Password" type="password" autoComplete="current-password" variant="outlined" />
					</AccordionDetails>
				</Accordion>
			</div>
		);
	}
}

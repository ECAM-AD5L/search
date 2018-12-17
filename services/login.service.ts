"use strict";
import { ServiceSchema } from "moleculer";
import * as jwt from 'jsonwebtoken';
import { } from 'node-fetch';

const users = { username: 'HUB-007', password: 'test', role: 'admin' }
const usersUrl = 'http://urldesenetemine.be/api/basemoistp'
const LoginService: ServiceSchema = {
	name: "login",

	/**
	 * Service settings
	 */
	settings: {

	},

	/**
	 * Service dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {

		auth: {
			params: {
				username: "string",
				password: "string"
			},
			handler(ctx) {
				/*fetch(usersUrl).then(res => res.json()).then(json => {
					if (ctx.params.password.localeCompare(json.password) == 0) {
						var token = jwt.sign({
							name: ctx.params.username,
							role: json.role
						  }, 'HUBLOVESFOUNDBADIEZSALIMALSO19951992ECAMLABO20185MIN', { expiresIn: '6h' });
						return token
					} else {
						return 'Password inocorect :( !'
					}

				})*/
				if (ctx.params.password.localeCompare(users.password) == 0) {
					var token = jwt.sign({
						name: ctx.params.username,
						role: users.role
					}, 'HUBLOVESFOUNDBADIEZSALIMALSO19951992ECAMLABO20185MIN', { expiresIn: '6h' });
					return token
				} else {
					return 'Password inocorect :( !'
				}
			},
		},
	},

	/**
	 * Events
	 */
	events: {

	},

	/**
	 * Methods
	 */
	methods: {

	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {

	},

	/**
	 * Service started lifecycle event handler
	 */
	// started() {

	// },

	/**
	 * Service stopped lifecycle event handler
	 */
	// stopped() {

	// },
};

export = LoginService;

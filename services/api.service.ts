import { ServiceSchema } from "moleculer";
import ApiGateway = require("moleculer-web");
const E = require("moleculer-web").Errors;
import * as jwt from 'jsonwebtoken';

const ApiService: ServiceSchema = {
	name: "api",

	mixins: [ApiGateway],

	// More info about settings: https://moleculer.services/docs/0.13/moleculer-web.html
	settings: {
		port: process.env.PORT || 3000,
		path: "/api",
		routes: [
			{
				path: "/",
				whitelist: [
					// Access to any actions in all services under "/api" URL
					"**",
				],
				authorization: true,
			},

			{
				path: "/",
				whitelist: [
					// Access to any actions in all services under "/api" URL
					"login.*",
				],
				authorization: false,
			}],

		// Serve assets from "public" folder
		assets: {
			folder: "public",
		},
	},
	methods: {
		// Second thing
		authorize(ctx, route, req, res) {
			// Read the token from header
			let auth = req.headers["authorization"];
			if (auth && auth.startsWith("Bearer")) {
				let token = auth.split(" ");
				try {
					var decoded = jwt.verify(token[1], 'HUBLOVESFOUNDBADIEZSALIMALSO19951992ECAMLABO20185MIN');
					console.log(decoded)
				} catch (error) {
					return Promise.reject(new E.UnAuthorizedError(E.ERR_NO_TOKEN));
				}
			} else {
				// No token
				return Promise.reject(new E.UnAuthorizedError(E.ERR_NO_TOKEN));
			}
		}

	}
};

export = ApiService;

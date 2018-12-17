"use strict";
import { ServiceSchema } from "moleculer";
var elasticsearch = require('elasticsearch');
import * as jwt from 'jsonwebtoken';

var client = new elasticsearch.Client({
	host: 'localhost:9200'
});

const products = [
	{
		id: '1', nom: 'Iphone X',
		prix: '899',
		commentaire: { note: 8, text: 'Bon marché' },
		description: { couleur: 'noir', modele: '1' }
	}
	,
	{
		id: '2', nom: 'Huawei P10',
		prix: '279',
		commentaire: { note: 7, text: 'Bon marché' },
		description: { couleur: 'noir', modele: '2' }
	}
]

const SearchService: ServiceSchema = {
	name: "search",

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
		searchQuery: {
			params: {
				search: "string",
			},
			async handler(ctx) {
				//this.createDB();
				var res = await this.searchElastic(ctx.params.search)
				return res;
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
		createDB() {
			if (!this.indexExists()) {
				// This get read even when index exists wtf
				this.createIndex();
				for (var i = 0; i < products.length; i++) {
					this.addDocument(products[i]);

				}
			}

		},

		indexExists() {
			client.indices.exists({
				index: "store"
			}).then(function () {
				//return true
			}, function (err, exists) {
				//return false
				if (exists) {
					console.log('Index already exists')
					return true;
				} else {
					console.log('Creating new index')
					return false;
				}
			})
		}
		,

		createIndex() {
			/* Index is where related documents are stored (All products)*/

			client.indices.create({
				index: 'store'
			}, function (err, resp, status) {
				if (err) {
					console.log(err);
				} else {
					console.log("create", resp);
				}
			});
		},

		addDocument(payload) {
			/* Add dataset: Must add the json document*/
			client.index({
				index: 'store',
				type: 'products',
				body: payload
			}, function (err, resp, status) {
				console.log(resp);
			});
		},

		async searchElastic(query) {
			/* Search for object(s) matching the query*/
			return client.search({
				index: 'store',
				type: 'products',
				q: query
			}).then(async resp => {
				return resp.hits.hits;
			}).then(async err => {
				return err
			});
		}
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

export = SearchService;

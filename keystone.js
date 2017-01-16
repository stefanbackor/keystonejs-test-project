// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');
var cons = require('consolidate');
var nunjucks = require('nunjucks');
var i18n= require('i18n');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	'name': 'KeystoneJS Test Project',
	'brand': 'KeystoneJS Test Project',

	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': ['templates', 'templates/views'],
	'view engine': 'html',
	'custom engine': cons.nunjucks,

  'cookie secret': process.env.COOKIE_SECRET || "abcdef12345",
	'emails': 'templates/emails',

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Rest API settings - available in keystone._options.rest
keystone.set('rest', {
  jwtSecret: process.env.JWT_SECRET || 'abcdef12345',
  jwtExpires: '10m'
});

// Load your project's Routes
keystone.set('routes', require('./routes'));

// Configure i18n
i18n.configure({
	locales:['en', 'de', 'it'],
	directory: __dirname + '/locales'
});

// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.
keystone.set('email locals', {
	logo_src: '/images/logo-email.gif',
	logo_width: 194,
	logo_height: 76,
	theme: {
		email_bg: '#f9f9f9',
		link_color: '#2697de',
		buttons: {
			color: '#fff',
			background_color: '#2697de',
			border_color: '#1a7cb7',
		},
	},
});

// Load your project's email test routes
keystone.set('email tests', require('./routes/emails'));


// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	users: 'users',
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();

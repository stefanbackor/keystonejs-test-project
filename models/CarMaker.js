var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * CarMaker Model (Znacka/Vyrobca)
 * ==========
 */

var CarMaker = new keystone.List('CarMaker', {
  autokey: { path: 'slug', from: 'name', unique: true },
  sortable: true,
});

CarMaker.add({
	name: { type: String, required: true, index: true }
});

/**
 * Registration
 */
CarMaker.defaultColumns = 'name';
CarMaker.register();
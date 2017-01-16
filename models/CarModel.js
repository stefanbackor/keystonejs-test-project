var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * CarModel Model (Model vyrobcu)
 * ==========
 */

var CarModel = new keystone.List('CarModel', {
  autokey: { path: 'slug', from: 'name', unique: true },
  sortable: true,
  sortContext: 'maker',
  drilldown: 'maker',
});

CarModel.add({
	name: { type: String, required: true, index: true },
  maker: { type: Types.Relationship, ref: 'CarMaker' },
});

/**
 * Registration
 */
CarModel.defaultColumns = 'name';
CarModel.register();
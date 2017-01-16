var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Premise Model (Pobocka/Autoservis)
 * ==========
 */

var Premise = new keystone.List('Premise', {
  defaultSort: 'name',
  track: true,
  drilldown: 'admins'
});

Premise.add({
	name: { type: String, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
  createdAt: { type: Date, default: Date.now, noedit: true },
  admins: { type: Types.Relationship, ref: 'User', many: true, idex: true },
  location: { type: Types.Location, defaults: { country: 'Slovakia' } }
});

/**
 * Registration
 */
Premise.defaultColumns = 'name, email, admins';
Premise.register();
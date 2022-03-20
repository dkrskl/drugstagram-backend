/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
	pgm.createTable('drug', {
		id: 'id',
		description: 'text',
		name: 'text',
		released: 'date',
	});

	pgm.createTable('disease', {
		id: 'id',
		name: 'text',
		drugId: { type: 'integer', references: 'drug', onDelete: 'set null' },
	});
};

exports.down = pgm => {
	pgm.dropTable('disease');
	pgm.dropTable('drug');
};

const tableTemplates = {
	Custom: [],
	MBTI: [
		{ name: 'id', type: 'INTEGER', isMandatory: true },
		{ name: 'username', type: 'VARCHAR' },
		{ name: 'class', type: 'VARCHAR' },
	],
	PersonalityAA: [
		{ name: 'id', type: 'INTEGER', isMandatory: true },
		{ name: 'username', type: 'VARCHAR' },
		{ name: 'question', type: 'TEXT' },
		{ name: 'information', type: 'TEXT' },
	],
}

const typesData = [
	'VARCHAR',
	'INTEGER',
	'DECIMAL',
	'TIMESTAMP',
	'TEXT',
	'BOOLEAN',
]

const idColumn = [{ name: 'id', type: 'INTEGER', isMandatory: true }]

export { tableTemplates, typesData, idColumn }

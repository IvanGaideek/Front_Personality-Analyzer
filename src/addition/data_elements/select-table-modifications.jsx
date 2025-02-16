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
		{ name: 'information', type: 'TEXT' },
	],
	FraudDetection: [
		{ name: 'id', type: 'INTEGER', isMandatory: true },
		{ name: 'username', type: 'VARCHAR' },
		{ name: 'fraud', type: 'BOOLEAN' },
		{ name: 'PhoneNumber', type: 'VARCHAR' },
		{ name: 'LocationPhone', type: 'VARCHAR' },
		{ name: 'fraud_PhoneNumber', type: 'BOOLEAN' },
	],
}

const len_varchar = 256

const typesData = [
	'VARCHAR',
	'INTEGER',
	'DECIMAL',
	'TIMESTAMP',
	'TEXT',
	'BOOLEAN',
]

// Получаем placeholder и паттерн в зависимости от типа
const getInputProps = type => {
	switch (type) {
		case 'INTEGER':
			return {
				placeholder: 'Enter a whole number',
				step: '1',
			}
		case 'DECIMAL':
			return {
				placeholder: 'Enter a decimal number',
				step: '0.01',
			}
		case 'TIMESTAMP':
			return {
				placeholder: 'YYYY-MM-DD HH:MM:SS',
			}
		case 'VARCHAR':
			return {
				placeholder: `Max length: ${len_varchar}`,
				maxLength: len_varchar,
			}
		default:
			return {}
	}
}

// Функции валидации для каждого типа данных
const validateInput = {
	VARCHAR: value => {
		return value.length <= len_varchar
	},
	INTEGER: value => {
		return /^-?\d+$/.test(value) // Допускает целые числа и пустую строку
	},
	DECIMAL: value => {
		return /^-?\d*\.?\d*$/.test(value) // Допускает десятичные числа и пустую строку
	},
	TIMESTAMP: value => {
		// Простая проверка формата даты/времени
		return (
			/^\d{4}-\d{2}-\d{2}(\s\d{2}:\d{2}(:\d{2})?)?$/.test(value) || value === ''
		)
	},
	TEXT: value => {
		return true // Для TEXT нет ограничений
	},
	BOOLEAN: value => {
		const validValues = ['true', 'false', '1', '0', '', 'yes', 'no']
		return validValues.includes(value.toLowerCase())
	},
}

// Функция для получения типа input в зависимости от типа данных
const getInputType = dataType => {
	switch (dataType) {
		case 'INTEGER':
		case 'DECIMAL':
			return 'number'
		case 'TIMESTAMP':
			return 'datetime-local'
		case 'BOOLEAN':
			return 'checkbox'
		default:
			return 'text'
	}
}

const idColumn = [{ name: 'id', type: 'INTEGER', isMandatory: true }]

export {
	tableTemplates,
	typesData,
	idColumn,
	len_varchar,
	getInputProps,
	validateInput,
	getInputType,
}

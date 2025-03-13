import {
	fraud_detection_analyser_link,
	mbti_analyser_link,
} from '../data_elements/links_to_backend'

const searchClassMBTI = async (
	inputText,
	person,
	isDownloadConfirm,
	loadingDatabase,
	token
) => {
	if (inputText.split(' ').filter(word => word !== '').length < 4) {
		return constructMessageClass([
			{
				personName: 'Error',
				analysis:
					'Insufficient or incorrect input (check out the documentation)',
				writingDatabase: 'undefined',
			},
		])
	}
	const requestBody = {
		text: inputText,
		person: person,
		loading_database: {
			selectedTable: loadingDatabase.selectedTable,
			personColumn: loadingDatabase.personColumn,
			classColumn: loadingDatabase.classColumn,
		},
		writingDatabase: Boolean(person) & isDownloadConfirm,
	}

	const options = {
		method: 'POST',
		headers: {
			accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(requestBody),
	}

	try {
		const url = new URL(mbti_analyser_link)
		url.searchParams.append('authorization', `Bearer ${token}`)
		const response = await fetch(url, options)
		const data = await response.json()

		if (response.ok) {
			let res_writingDatabase = false
			if (data.writingDatabase) {
				res_writingDatabase = 'Successful entry in the database!'
			}
			return constructMessageClass([
				{
					personName: person,
					analysis: data.analysis,
					writingDatabase: res_writingDatabase, // Значение из ответа сервера
				},
			])
		} else {
			return constructMessageClass([
				{
					personName: 'Error',
					analysis: data.detail || 'Unknown error occurred',
					writingDatabase: 'undefined',
				},
			])
		}
	} catch (error) {
		return constructMessageClass([
			{
				personName: 'Error',
				analysis: error.message || 'An error occurred',
				writingDatabase: 'undefined',
			},
		])
	}
}

const constructMessageClass = data_messages => {
	return data_messages.map(result => ({
		text: `${result.personName} - ${result.analysis} -> Write in DB: ${
			result.writingDatabase ? result.writingDatabase : 'Not writing this down'
		}`,
		sender: 'bot',
	}))
}

const searchLlm = (
	inputText,
	person,
	useSearchInternet,
	isDownloadConfirm,
	loadingDatabase
) => {
	let mockResult = null
	try {
		if (inputText.length < 5) {
			mockResult = 'The question is too short!'
		} else if (isDownloadConfirm && person) {
			// Имитация ответа от сервера для примера с записью в БД
			// При отправке запроса передаём useSearchInternet (при выборе llm решает использовать поиск или нет), person, loadingDatabase, содержащий информацию, куда записывать результаты
			const result_analysing = 'Answer bot.'
			const decisionLlm_use_search_internet = useSearchInternet
				? 'use'
				: 'not use'
			const callback_write_db = 'Successful entry in the database!'
			mockResult = `${person} - ${result_analysing} -> Write in DB: ${callback_write_db} Internet search: ${decisionLlm_use_search_internet}`
		} else {
			// При отправке запроса передаём useSearchInternet (при выборе llm решает использовать поиск или нет)
			const result_analysing = 'Answer bot.'
			const decisionLlm_use_search_internet = useSearchInternet
				? 'use'
				: 'not use'
			mockResult = `${person} - ${result_analysing} -> Write in DB: Not writing this down. Internet search: ${decisionLlm_use_search_internet}`
		}
	} catch (error) {
		mockResult = 'Error: ' + error.messages
	}
	return [{ text: mockResult, sender: 'bot' }]
}

const searchClassFraudDetect = async (
	inputText,
	person,
	isDownloadConfirm,
	loadingDatabase,
	token
) => {
	if (inputText.split(' ').filter(word => word !== '').length < 4) {
		return constructMessageClass([
			{
				personName: 'Error',
				analysis:
					'Insufficient or incorrect input (check out the documentation)',
				writingDatabase: 'undefined',
			},
		])
	}
	const requestBody = {
		text: inputText,
		person: person,
		loading_database: {
			selectedTable: loadingDatabase.selectedTable,
			personColumn: loadingDatabase.personColumn,
			classColumn: loadingDatabase.classColumn,
		},
		writingDatabase: Boolean(person) & isDownloadConfirm,
	}

	const options = {
		method: 'POST',
		headers: {
			accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(requestBody),
	}

	try {
		const url = new URL(fraud_detection_analyser_link)
		url.searchParams.append('authorization', `Bearer ${token}`)
		const response = await fetch(url, options)
		const data = await response.json()

		if (response.ok) {
			let res_writingDatabase = false
			let res_analysis = 'Not fraud or spam'
			if (data.writingDatabase) {
				res_writingDatabase = 'Successful entry in the database!'
			}
			if (data.analysis == 'true') {
				res_analysis = 'Fraud'
			}
			return constructMessageClass([
				{
					personName: person,
					analysis: res_analysis,
					writingDatabase: res_writingDatabase, // Значение из ответа сервера
				},
			])
		} else {
			return constructMessageClass([
				{
					personName: 'Error',
					analysis: data.detail || 'Unknown error occurred',
					writingDatabase: 'undefined',
				},
			])
		}
	} catch (error) {
		mockResult = {
			personName: 'Error',
			analysis: error.messages,
			writingDatabase: 'undefined',
		}
	}
}

export {
	searchClassMBTI,
	constructMessageClass,
	searchLlm,
	searchClassFraudDetect,
}

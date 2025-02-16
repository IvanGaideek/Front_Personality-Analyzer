const searchClassMBTI = (
	inputText,
	person,
	isDownloadConfirm,
	loadingDatabase
) => {
	let mockResult = null
	try {
		if (inputText.split(' ').filter(word => word !== '').length < 4) {
			mockResult = {
				personName: 'Error',
				analysis:
					'insufficient or incorrect input (check out the documentation)',
				writingDatabase: 'undefined',
			}
		} else if (isDownloadConfirm && person) {
			// Имитация ответа от сервера для примера с записью в БД
			// При отправке запроса передаём person, loadingDatabase, содержащий информацию, куда записывать результаты
			console.log(loadingDatabase)
			mockResult = {
				personName: person,
				analysis: 'MBTI',
				writingDatabase: 'Successful entry in the database!',
			}
		} else {
			// Имитация ответа от сервера для примера без записи в БД
			mockResult = {
				personName: person,
				analysis: 'MBTI',
				writingDatabase: false,
			}
		}
	} catch (error) {
		mockResult = {
			personName: 'Error',
			analysis: error.messages,
			writingDatabase: 'undefined',
		}
	}
	return constructMessageClass([mockResult])
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

const searchClassFraudDetect = (
	inputText,
	person,
	isDownloadConfirm,
	loadingDatabase
) => {
	let mockResult = null
	try {
		if (inputText.split(' ').filter(word => word !== '').length < 4) {
			mockResult = {
				personName: 'Error',
				analysis:
					'insufficient or incorrect input (check out the documentation)',
				writingDatabase: 'undefined',
			}
		} else if (isDownloadConfirm && person) {
			// Имитация ответа от сервера для примера с записью в БД
			// При отправке запроса передаём person, loadingDatabase, содержащий информацию, куда записывать результаты
			console.log(loadingDatabase)
			mockResult = {
				personName: person,
				analysis:
					'FRAUD, the result of the number analysis, if you selected this function', // планируется, что 1 - мошенник, 0 - нормальное письмо (документ),
				// если юзер выбрал функцию анализа телефонного номера в сообщение, то происходит анализ по выбранным параметрам (если номер нашёлся в сообщении)
				writingDatabase: 'Successful entry in the database!',
			}
		} else {
			// Имитация ответа от сервера для примера без записи в БД
			mockResult = {
				personName: person,
				analysis:
					'No fraud, the result of the number analysis, if you selected this function', // если юзер выбрал функцию анализа телефонного номера в сообщение, то происходит анализ по всем параметрам (если номер нашёлся в сообщении)
				writingDatabase: false,
			}
		}
	} catch (error) {
		mockResult = {
			personName: 'Error',
			analysis: error.messages,
			writingDatabase: 'undefined',
		}
	}
	return constructMessageClass([mockResult])
}

export {
	searchClassMBTI,
	constructMessageClass,
	searchLlm,
	searchClassFraudDetect,
}

const searchClass = (inputText, isDownloadConfirm, loadingDatabase) => {
	let mockResult = null
	try {
		// Разделение текста на две части
		const [person, ...texts] = inputText.split(' - ')
		// Склеиваем оставшиеся части обратно (если разделителей было больше одного)
		const text_user = texts.join(' - ') // отправляю на анализ в бекэнд
		if (
			person < 1 ||
			text_user.split(' ').filter(word => word !== '').length < 4
		) {
			mockResult = {
				personName: 'Error',
				analysis:
					'insufficient or incorrect input (check out the documentation)',
				writingDatabase: 'undefined',
			}
		} else if (isDownloadConfirm) {
			// Имитация ответа от сервера для примера с записью в БД
			// При отправке запроса передаём loadingDatabase, содержащий информацию, куда записывать результаты
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

export { searchClass, constructMessageClass }

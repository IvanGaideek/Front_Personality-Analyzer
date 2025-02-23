export const validateEmail = email => {
	const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
	return emailPattern.test(email)
}

export const validateOnLengthPassword = password => {
	const minLength = 8
	const maxLength = 64
	if (password.length < minLength) {
		return `The password must contain a minimum of ${minLength} symbols.`
	}
	if (password.length > maxLength) {
		return `The password must contain no more than ${maxLength} symbols.`
	}
	return false
}

export const validatePassword = password => {
	const validationLength = validateOnLengthPassword(password)

	if (validationLength) {
		return validationLength
	}
	if (!/[0-9]/.test(password)) {
		return 'The password must contain at least one digit.'
	}

	if (!/[a-z]/.test(password)) {
		return 'The password must contain at least one lowercase letter.'
	}

	if (!/[A-Z]/.test(password)) {
		return 'The password must contain at least one uppercase letter.'
	}

	if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
		return 'The password must contain at least one special character (for example, !, @, #, $).'
	}

	const commonWords = ['password', '12345678', 'qwertyQ1!']
	if (commonWords.some(word => password.toLowerCase() == word)) {
		console.log(password)
		return 'The password must not contain common words or sequences.'
	}

	return '' // Возвращаем пустую строку, если ошибок нет
}

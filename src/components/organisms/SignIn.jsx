import React, { useState } from 'react'
import { register_link } from '../../addition/data_elements/into-system-link'
import EmailInput from '../molecules/EmailInput'
import PasswordInput from '../molecules/PasswordInput'
import RememberMeCheckbox from '../atoms/RememberMeCheckbox'
import { validateEmail, validatePassword } from '../atoms/validation'
import BottomIntoSystemForms from '../molecules/BottomIntoSystemForms'

export default function SignIn() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [rememberMe, setRememberMe] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	const handleSubmit = e => {
		e.preventDefault()

		if (email === '' || password === '') {
			setErrorMessage('Both fields are required.')
			return
		}

		if (!validateEmail(email)) {
			setErrorMessage('Enter the correct email address.')
			return
		}

		const passwordError = validatePassword(password)
		if (passwordError) {
			setErrorMessage(passwordError)
			return
		}

		setErrorMessage('')
		// Процесс входа...
		// console.log('Logging in with:', { email, password, rememberMe })
	}

	return (
		<section className='bg-all-black min-h-screen flex items-center justify-center'>
			<div className='w-full max-w-md bg-black-alpha-70 rounded-lg shadow-md p-8'>
				<div className='mb-6 text-2xl poppins-bold text-almost-white text-center'>
					Login
				</div>
				<h1 className='text-xl poppins leading-tight tracking-tight text-almost-white md:text-2xl text-center'>
					Sign in to your account
				</h1>
				<form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
					<EmailInput email={email} setEmail={setEmail} />
					<PasswordInput
						password={password}
						setPassword={setPassword}
						errorMessage={errorMessage}
					/>
					<RememberMeCheckbox
						rememberMe={rememberMe}
						setRememberMe={setRememberMe}
					/>
					<BottomIntoSystemForms
						submit_name='Sign in'
						register_link={register_link}
						question='Don’t have an account yet?'
						link_name='Sign up'
					/>
				</form>
			</div>
		</section>
	)
}

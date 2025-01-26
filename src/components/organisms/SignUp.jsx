import React, { useState } from 'react'
import { login_link } from '../../addition/data_elements/into-system-link'
import EmailInput from '../molecules/EmailInput'
import PasswordInput from '../molecules/PasswordInput'
import { validateEmail, validatePassword } from '../atoms/validation'
import BottomIntoSystemForms from '../molecules/BottomIntoSystemForms'
import CheckboxForm from '../atoms/CheckboxForm'

export default function SignUp() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [termsAccepted, setTermsAccepted] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	const handleSubmit = e => {
		e.preventDefault()

		if (!termsAccepted) {
			setErrorMessage('You must accept the terms and conditions.')
			return
		}

		if (email === '' || password === '' || confirmPassword === '') {
			setErrorMessage('All fields are required.')
			return
		}

		if (!validateEmail(email)) {
			setErrorMessage('Enter a valid email address.')
			return
		}

		const passwordError = validatePassword(password)
		if (passwordError) {
			setErrorMessage(passwordError)
			return
		}

		if (password !== confirmPassword) {
			setErrorMessage('Passwords do not match.')
			return
		}

		setErrorMessage('')
		// Процесс регистрации...
		// console.log('Registering with:', { email, password })
	}

	return (
		<section className='bg-all-black min-h-screen flex items-center justify-center'>
			<div className='w-full max-w-md bg-black-alpha-70 rounded-lg shadow-md p-8'>
				<div className='mb-6 text-2xl poppins-bold text-almost-white text-center'>
					Register
				</div>
				<h1 className='text-xl poppins leading-tight tracking-tight text-almost-white md:text-2xl text-center'>
					Create an account
				</h1>
				<form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
					<EmailInput email={email} setEmail={setEmail} />
					<PasswordInput
						password={password}
						setPassword={setPassword}
						errorMessage={errorMessage}
					/>
					<div>
						<label
							htmlFor='confirm-password'
							className='block mb-2 text-sm lato-bold text-medium-gray'
						>
							Confirm password
						</label>
						<input
							type='password'
							name='confirm-password'
							id='confirm-password'
							placeholder='••••••••'
							className='bg-black-alpha-10 border border-medium-gray text-almost-white text-sm lato-regular rounded-lg focus:ring-medium-yellow focus:border-medium-yellow block w-full p-2.5'
							value={confirmPassword}
							onChange={e => setConfirmPassword(e.target.value)}
							required
						/>
					</div>
					<CheckboxForm
						checked={termsAccepted}
						onChange={() => setTermsAccepted(!termsAccepted)}
					>
						I accept the{' '}
						<a
							className='font-medium text-medium-yellow hover:underline'
							href='/docs/policy'
						>
							Terms and Conditions
						</a>
					</CheckboxForm>

					<BottomIntoSystemForms
						submit_name='Sign in'
						register_link={login_link}
						question='Don’t have an account yet?'
						link_name='Sign up'
					/>
				</form>
			</div>
		</section>
	)
}

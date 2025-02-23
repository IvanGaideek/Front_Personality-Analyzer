import React, { useContext, useState } from 'react'
import { register_link } from '../../addition/data_elements/into-system-link'
import EmailInput from '../molecules/EmailInput'
import PasswordInput from '../molecules/PasswordInput'
import RememberMeCheckbox from '../atoms/RememberMeCheckbox'
import { validateEmail, validateOnLengthPassword } from '../atoms/validation'
import BottomIntoSystemForms from '../molecules/BottomIntoSystemForms'
import { login_link } from '../../addition/data_elements/links_to_backend'
import { UserContext } from '../../addition/contexts/UserContext'
import { useNavigate } from 'react-router-dom'

export default function SignIn() {
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [rememberMe, setRememberMe] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [, setToken] = useContext(UserContext)

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

		const passwordError = validateOnLengthPassword(password)
		if (passwordError) {
			setErrorMessage(passwordError)
			return
		}

		setErrorMessage('')
		submitLogin()
	}

	const submitLogin = async () => {
		const remember_me = rememberMe
		const request_params = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				accept: 'application/json',
			},
			body: JSON.stringify({
				email: email,
				password: password,
				remember_me: remember_me,
			}),
		}

		const response = await fetch(login_link, request_params)
		const data = await response.json()

		if (!response.ok) {
			setErrorMessage(data.detail)
			setToken(null)
		} else {
			setToken(data.access_token, remember_me)
			navigate('/')
		}
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

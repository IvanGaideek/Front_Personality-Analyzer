import React from 'react'
import { Link } from 'react-router-dom'

export default function BottomIntoSystemForms(props) {
	const link_name = props.link_name
	const question = props.question
	const register_link = props.register_link
	const submit_name = props.submit_name

	return (
		<>
			<button
				type='submit'
				className='w-full text-all-black bg-medium-yellow hover:bg-yellow-alpha-80 focus:ring-4 focus:outline-none focus:ring-yellow-alpha-20 poppins rounded-lg text-sm px-5 py-2.5 text-center'
			>
				{submit_name}
			</button>
			<p className='text-sm lato-regular font-light text-medium-gray'>
				{question}{' '}
				<Link
					to={register_link}
					className='poppins-bold text-medium-yellow hover:underline'
				>
					{link_name}
				</Link>
			</p>
		</>
	)
}

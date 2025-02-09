import React from 'react'
import { Link } from 'react-router-dom'

export default function TextLinkBlock(props) {
	return (
		<div
			className={
				'flex items-center gap-2 text-xs md:text-sm text-almost-white lato-regular ' +
				props.className
			}
		>
			<span>{props.message}</span>
			<Link
				to={props.link}
				target='_blank'
				rel='noopener noreferrer'
				className='text-medium-yellow hover:text-yellow-alpha-80 underline transition-colors duration-300'
			>
				{props.text_link}
			</Link>
		</div>
	)
}

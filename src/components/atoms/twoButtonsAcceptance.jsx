import React from 'react'

export default function TwoButtonsAcceptance({
	first_className = 'bg-medium-yellow hover:bg-yellow-alpha-80 hover:duration-200 text-all-black poppins py-2 px-4 rounded-md',
	second_className = 'border-2 border-medium-gray text-almost-white poppins py-2 px-4 hover:bg-almost-white hover:duration-200 hover:text-all-black rounded-md',
	first_onClick,
	second_onClick,
	first_disabled = false,
	names,
}) {
	return (
		<div className='flex justify-end gap-2 mt-4'>
			<button
				className={first_className}
				onClick={first_onClick}
				disabled={first_disabled}
			>
				{names.left}
			</button>
			<button className={second_className} onClick={second_onClick}>
				{names.right}
			</button>
		</div>
	)
}

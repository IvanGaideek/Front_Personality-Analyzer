import React from 'react'
import TwoButtonsAcceptance from '../../atoms/twoButtonsAcceptance'

export default function BottomModalWindow(props) {
	const comparison = props.len_columns >= props.MAX_COLUMNS

	return (
		<div className='flex flex-row gap-2 justify-end items-center mt-4'>
			<div className='text-sm text-gray-500 mr-auto'>
				{props.len_columns}/{props.MAX_COLUMNS} columns
			</div>
			<TwoButtonsAcceptance
				first_className={`bg-medium-yellow text-all-black poppins py-2 px-4 rounded-md ${
					comparison
						? 'opacity-50 cursor-not-allowed'
						: 'hover:bg-yellow-alpha-80'
				}`}
				first_onClick={props.addColumn}
				second_onClick={props.handleSubmit}
				first_disabled={comparison}
				names={{ left: 'Add Column', right: 'Submit' }}
			/>
		</div>
	)
}

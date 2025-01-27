import React from 'react'

export default function BottomModalWindow(props) {
	return (
		<div className='flex flex-row gap-2 justify-end items-center mt-4'>
			<div className='text-sm text-gray-500 mr-auto'>
				{props.len_columns}/{props.MAX_COLUMNS} columns
			</div>
			<button
				className={`bg-medium-yellow text-all-black poppins py-2 px-4 rounded-md ${
					props.len_columns >= props.MAX_COLUMNS
						? 'opacity-50 cursor-not-allowed'
						: 'hover:bg-yellow-alpha-80'
				}`}
				onClick={props.addColumn}
				disabled={props.len_columns >= props.MAX_COLUMNS}
			>
				Add Column
			</button>
			<button
				className='border-2 border-medium-gray text-almost-white poppins py-2 px-4 hover:bg-almost-white hover:duration-200 hover:text-all-black rounded-md'
				onClick={props.handleSubmit}
			>
				Submit
			</button>
		</div>
	)
}

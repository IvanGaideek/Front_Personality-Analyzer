import React from 'react'
import CheckboxForm from './CheckboxForm'

export default function ChooseColumnModification({
	label,
	checked,
	columns,
	setLoadingDatabase,
}) {
	return (
		<>
			<CheckboxForm
				checked={checked}
				onChange={async () => {
					if (checked) {
						setLoadingDatabase('')
					} else if (columns) {
						setLoadingDatabase(columns[0])
					}
				}}
			>
				{label}
			</CheckboxForm>
			<select
				disabled={!checked}
				value={checked}
				onChange={e => setLoadingDatabase(e.target.value)}
				className='block w-full md:w-1/3 px-4 py-2 bg-all-black border border-medium-yellow text-white rounded-lg focus:outline-none focus:ring focus:ring-medium-gray transition duration-200'
			>
				{columns.map(column => (
					<option
						key={column}
						value={column}
						className='bg-gray-800 hover:bg-gray-600'
					>
						{column}
					</option>
				))}
			</select>
		</>
	)
}

import { ChevronDownIcon } from '@heroicons/react/16/solid'
import React, { useState } from 'react'

const CustomSelect = () => {
	const [selectedOption, setSelectedOption] = useState('FilterColumn')
	const [isOpen, setIsOpen] = useState(false)

	const options = ['col1', 'col2', 'col3']

	const handleOptionClick = option => {
		setSelectedOption(option)
		setIsOpen(false)
	}

	return (
		<div className='relative'>
			<div
				className='bg-all-black h-10 px-5 text-white rounded-l-full poppins text-sm focus:outline-none border-2 border-medium-yellow cursor-pointer max-h-10 overflow-hidden flex items-center justify-between'
				onClick={() => setIsOpen(!isOpen)}
			>
				<span>{selectedOption}</span>
				<ChevronDownIcon
					aria-hidden='true'
					className='size-5 flex-none text-gray-400'
				/>
				{/* Стрелка вниз */}
			</div>
			{isOpen && (
				<div className='absolute bg-all-black border-2 border-medium-yellow w-full rounded-b-lg rounded-tl-lg '>
					{options.map((option, index) => (
						<div
							key={index}
							className={`px-5 py-2 cursor-pointer hover:bg-yellow-alpha-20 ${
								index < options.length - 1
									? 'border-b border-medium-yellow'
									: ''
							}`}
							onClick={() => handleOptionClick(option)}
						>
							{option}
						</div>
					))}
				</div>
			)}
		</div>
	)
}

const SearchComponent = () => {
	const [searchTerm, setSearchTerm] = useState('')

	return (
		<div className='sm:w-full md:w-2/3 lg:w-1/2 p-4 text-white open-sans'>
			<div className='relative flex'>
				<CustomSelect />
				<input
					type='search'
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					placeholder='Search'
					className='bg-all-black h-10 px-5 w-full rounded-r-full text-sm focus:outline-none border-2 border-l-0 border-medium-yellow'
					autoComplete='off'
					spellCheck='false'
					required
				/>
			</div>
		</div>
	)
}

export default SearchComponent

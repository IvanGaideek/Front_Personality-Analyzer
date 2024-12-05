import { PopoverButton } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'

export const NavButtonTitleList = ({ className, title }) => {
	const [isOpenList, setOpenList] = useState(false)

	return (
		<PopoverButton
			className={className}
			onClick={() => setOpenList(!isOpenList)}
		>
			{title}
			{isOpenList ? (
				<ChevronUpIcon
					aria-hidden='true'
					className='size-5 flex-none text-gray-400'
				/>
			) : (
				<ChevronDownIcon
					aria-hidden='true'
					className='size-5 flex-none text-gray-400'
				/>
			)}
		</PopoverButton>
	)
}

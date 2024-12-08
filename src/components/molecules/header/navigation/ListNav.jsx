import { PopoverPanel } from '@headlessui/react'
import React from 'react'
import { ButtonList } from '../../../atoms/ButtonList'
import { ListItems } from '../../../atoms/ListItems'
import { features } from '../../../../addition/data_elements/items-list-nav'

export const ListNav = () => {
	return (
		<PopoverPanel
			transition
			className='absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in'
		>
			<ListItems className='p-4 poppins' group={features} />
			<ButtonList className='divide-x divide-gray-900/5 bg-gray-50 poppins' />
		</PopoverPanel>
	)
}

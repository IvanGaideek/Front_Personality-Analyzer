import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import React from 'react'
import {
	callsToAction,
	features,
} from '../../addition/data_elements/items-list-nav'

export const DialogListItems = ({ title }) => {
	return (
		<Disclosure as='div' className='-mx-3'>
			<DisclosureButton className='group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50'>
				{title}
				<ChevronDownIcon
					aria-hidden='true'
					className='size-5 flex-none group-data-[open]:rotate-180'
				/>
			</DisclosureButton>
			<DisclosurePanel className='mt-2 space-y-2'>
				{[...features, ...callsToAction].map(item => (
					<DisclosureButton
						key={item.name}
						as='a'
						href={item.href}
						className='block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50'
					>
						{item.name}
					</DisclosureButton>
				))}
			</DisclosurePanel>
		</Disclosure>
	)
}

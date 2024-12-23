import { Popover, PopoverGroup } from '@headlessui/react'
import React from 'react'
import { NavButtonTitleList } from '../../../atoms/NavButtonTitleList'
import { ListNav } from './ListNav'

export const NavCenter = () => {
	return (
		<PopoverGroup className='hidden md:flex md:gap-x-24 lg:flex lg:gap-x-24'>
			<a href='#' className='text-sm/6 poppins-bold'>
				Product
			</a>
			<Popover className='relative'>
				<NavButtonTitleList
					className='flex items-center gap-x-1 text-sm/6 poppins-bold'
					title='Features'
				/>
				<ListNav />
			</Popover>
			<a href='#' className='text-sm/6 poppins-bold'>
				API
			</a>
		</PopoverGroup>
	)
}

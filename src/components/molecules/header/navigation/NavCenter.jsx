import { Popover, PopoverGroup } from '@headlessui/react'
import React, { useState } from 'react'
import { NavButtonTitleList } from '../../../atoms/NavButtonTitleList'
import { ListNav } from './ListNav'

export const NavCenter = () => {
	return (
		<PopoverGroup className='hidden lg:flex lg:gap-x-24'>
			<a href='#' className='text-sm/6 font-semibold text-gray-900'>
				Product
			</a>
			<Popover className='relative'>
				<NavButtonTitleList
					className='flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900'
					title='Features'
				/>
				<ListNav />
			</Popover>
			<a href='#' className='text-sm/6 font-semibold text-gray-900'>
				API
			</a>
		</PopoverGroup>
	)
}

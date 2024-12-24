import { Popover, PopoverGroup } from '@headlessui/react'
import React from 'react'
import { NavButtonTitleList } from '../../../atoms/NavButtonTitleList'
import { ListNav } from './ListNav'
import { NavLink } from 'react-router-dom'

export const NavCenter = () => {
	return (
		<PopoverGroup className='hidden md:flex md:gap-x-24 lg:flex lg:gap-x-24'>
			<NavLink to='/' className='text-sm/6 poppins-bold'>
				Product
			</NavLink>
			<Popover className='relative'>
				<NavButtonTitleList
					className='flex items-center gap-x-1 text-sm/6 poppins-bold'
					title='Features'
				/>
				<ListNav />
			</Popover>
			<NavLink to='/docs/api' className='text-sm/6 poppins-bold'>
				API
			</NavLink>
		</PopoverGroup>
	)
}

import React from 'react'
import { NavItem } from './NavItem'

export const ListItems = ({ className = '', group = [] }) => {
	return (
		<div className={className}>
			{group.map(item => (
				<NavItem
					name={item.name}
					className='group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50'
					Icon={item.icon}
					description={item.description}
					href={item.href}
					key={item.name}
				/>
			))}
		</div>
	)
}

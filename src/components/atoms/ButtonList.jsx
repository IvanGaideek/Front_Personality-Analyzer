import React from 'react'
import { callsToAction } from '../../addition/data_elements/items-list-nav'

export const ButtonList = ({ className = '' }) => {
	return (
		<div className={className}>
			{callsToAction.map(item => (
				<a
					key={item.name}
					href={item.href}
					className='flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100'
				>
					{item.icon && (
						<item.icon
							aria-hidden='true'
							className='size-5 flex-none text-gray-400'
						/>
					)}
					{item.name}
				</a>
			))}
		</div>
	)
}

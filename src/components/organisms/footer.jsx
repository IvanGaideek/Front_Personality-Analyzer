import React from 'react'
import HorizontalLine from '../atoms/HorizontalLine'
import Copyright from '../atoms/Copyright'
import { UserGroupIcon } from '@heroicons/react/24/outline'
import IconAndTeam from '../molecules/footer/IconAndTeam'
import { footer_items } from '../../addition/data_elements/items-list-footer'
import StandartList from '../molecules/StandartList'

export default function Footer() {
	const team = 'Noname'

	return (
		<footer className='bg-gray-900 shadow'>
			<div className='w-full max-w-screen-xl mx-auto p-4 md:py-8'>
				<div className='sm:flex sm:items-center sm:justify-between'>
					<IconAndTeam
						Image={UserGroupIcon}
						team={team}
						classTeam='text-2xl lato-bold whitespace-nowrap text-almost-white'
						href='/docs/team'
					/>
					<StandartList
						data={footer_items}
						className='flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0 text-gray-400'
						commonStyleItem='hover:underline text-medium-yellow lato-regular'
					/>
				</div>
				<HorizontalLine color='border-gray-700' etc_style='my-6' />
				<Copyright team={team} color='text-medium-gray' />
			</div>
		</footer>
	)
}

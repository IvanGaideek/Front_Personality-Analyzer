import React from 'react'
import LogoutButton from '../atoms/LogoutButton'
import Settings from '../molecules/settings'
import { settings } from '../../addition/data_elements/items-settings'
import DeleteButton from '../atoms/DeleteButton'

export default function Profile() {
	return (
		<div className='min-h-screen flex items-center justify-center bg-all-black p-6 circle-bi'>
			<div className='w-full max-w-6xl rounded-lg bg-almost-white shadow-lg p-8'>
				{/* Profile Section */}
				<div className='text-center mb-8'>
					<h2 className='text-2xl lato-bold'>Username</h2>
					<div className='mt-4 space-y-2'>
						<p className='text-all-black open-sans'>
							<span className='lato-bold'>Email: </span>
							johndoe@example.com
						</p>
						<p className='text-all-black open-sans'>
							<span className='lato-bold'>Saved Entities: </span>0
						</p>
					</div>
				</div>

				{/* Settings Section */}
				<div className='overflow-hidden border border-gray-200 rounded-lg mb-6'>
					<Settings data={settings} />
				</div>

				{/* Action Buttons */}
				<div className='flex justify-end gap-4'>
					<DeleteButton
						text='Delete'
						title='Confirm the deletion'
						description='Are you sure you want to delete your account along with other dependent data?'
						className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 text-sm/6 rounded-full transition duration-200 focus:outline-none poppins focus:ring focus:ring-medium-gray mr-2 border-2 border-all-black'
					/>
					<LogoutButton />
				</div>
			</div>
		</div>
	)
}

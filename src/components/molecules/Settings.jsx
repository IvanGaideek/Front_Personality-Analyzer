import React from 'react'

export default function Settings({ data = [] }) {
	return (
		<>
			{data.map(setting => (
				<div
					key={setting.id}
					className='p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors duration-200'
				>
					<div className='flex items-center justify-between'>
						<div className='flex-1 min-w-0'>
							<div className='flex flex-row'>
								<h3 className="text-lg font-medium text-gray-900 truncate after:content-[':']">
									{setting.title}
								</h3>
								<div>{setting.field}</div>
							</div>
							<p className='mt-1 text-sm text-gray-500 truncate'>
								{setting.description}
							</p>
						</div>
						<div className='ml-4'>
							<button className='inline-flex items-center px-3 py-2 border border-all-black lato-regular leading-4 rounded-lg text-all-black bg-medium-gray hover:bg-black-alpha-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black-alpha-10'>
								Edit
							</button>
						</div>
					</div>
				</div>
			))}
		</>
	)
}

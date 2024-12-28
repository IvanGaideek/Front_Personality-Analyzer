import React from 'react'

// team members data
const teamMembers = [
	{
		name: 'ZOVDUN IVAN',
		role: 'MANAGER, TEAM LEAD',
		image: '/src/resources/img/zovdun_ivan.jpg',
	},
	{
		name: 'ROMANOV MAXIM',
		role: 'CODER',
		image: '/src/resources/img/romanov_maxim.jpg',
	},
	{
		name: 'GAYDEEK IVAN',
		role: 'CODER',
		image: '/src/resources/img/gaydeek_ivan.jpg',
	},
	{
		name: 'BUBLYAEV ARSENY',
		role: 'CODER',
		image: '/src/resources/img/bublyaev_arseny.jpg',
	},
	{
		name: 'STEBUNOV ALEXANDER',
		role: 'Kurator',
		image: '/src/resources/img/stebunov_alexander.png',
	},
]

const Team = () => {
	return (
		<div className='container mx-auto px-1 py-10'>
			<h1 className='text-4xl poppins-bold text-center mb-8 text-white'>
				Meet Our Team
			</h1>
			<div className='gap-6 flex flex-wrap justify-center'>
				{teamMembers.map((member, index) => (
					<div
						key={index}
						className='bg-transparent overflow-hidden transition transform hover:scale-105 px-1 w-max'
					>
						<img
							src={member.image}
							alt={member.name}
							className='w-full h-80 object-cover rounded-lg shadow-lg'
						/>
						<div className='p-6'>
							<h2 className='text-almost-white text-xl font-semibold text-center lato-bold'>
								{member.name}
							</h2>
							<h3 className='text-medium-gray text-center lato-regular'>
								{member.role}
							</h3>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Team

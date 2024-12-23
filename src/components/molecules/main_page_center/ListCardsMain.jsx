import React from 'react'
import CardMinimalistic from '../../atoms/CardMinimalistic'

export default function ListCardsMain({ dataCards = [] }) {
	return (
		<>
			{dataCards.map(item => (
				<CardMinimalistic
					name={item.name}
					description={item.description}
					href={item.href}
					key={item.name}
					className='w-full h-full px-1 sm:w-1/2 md:w-2/3 lg:w-1/3'
				/>
			))}
		</>
	)
}

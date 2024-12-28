import React from 'react'
import ListCardsMain from '../molecules/main_page_center/ListCardsMain'
import { main_cards_center } from '../../addition/data_elements/items-cards'

export default function CenterMainPage() {
	return (
		<div className='flex-grow bg-all-black circle-bi'>
			<div className='flex justify-center p-9'>
				<div className='w-max'>
					<h1 className='overflow-hidden text-center whitespace-nowrap text-white poppins-bold text-3xl'>
						Our Products:
					</h1>
					<h2 className='animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white text-white poppins text-xl '>
						Try our personality analyzers!!!
					</h2>
				</div>
			</div>
			<div className='-mx-4 flex flex-wrap p-8 justify-center'>
				<ListCardsMain dataCards={main_cards_center} />
			</div>
		</div>
	)
}

import React from 'react'
import BranchBlock from './BranchBlock'

export const BranchesBlocksLink = ({ group = [] }) => {
	return (
		<div>
			{group.map(item => (
				<BranchBlock
					title={item.title}
					fontBlock='lato-bold'
					className='hover:text-medium-yellow lato-regular'
					items={item.items}
					key={item.title}
				/>
			))}
		</div>
	)
}

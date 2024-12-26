import React from 'react'
import BranchBlock from './BranchBlock'

export const BranchesBlocksLink = ({ group = [] }) => {
	return (
		<div>
			{group.map(item => (
				<BranchBlock
					title={item.title}
					className='hover:text-medium-yellow'
					items={item.items}
					key={item.title}
				/>
			))}
		</div>
	)
}

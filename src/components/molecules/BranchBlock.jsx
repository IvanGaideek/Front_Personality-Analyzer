import React from 'react'
import LinkItem from '../atoms/LinkItem'

export default function BranchBlock({
	title = '',
	items,
	className = '',
	fontBlock = '',
}) {
	return (
		<>
			{title && (
				<h2
					className={
						'text-lg font-semibold mb-2 text-medium-gray' + ' ' + fontBlock
					}
				>
					{title}
				</h2>
			)}
			<div className='space-y-2 mb-6'>
				{items.map(item => (
					<LinkItem
						text={item.text}
						href={item.href}
						className={className}
						navLink={true}
						key={item.text}
					/>
				))}
			</div>
		</>
	)
}

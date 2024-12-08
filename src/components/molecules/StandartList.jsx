import React from 'react'
import LinkItem from '../atoms/LinkItem'

export default function StandartList({
	data = [],
	className = '',
	commonStyleItem = '',
}) {
	return (
		<div className={className}>
			{data.map(item => (
				<LinkItem
					text={item.text}
					className={commonStyleItem + ' ' + item.className}
					href={item.href}
				/>
			))}
		</div>
	)
}

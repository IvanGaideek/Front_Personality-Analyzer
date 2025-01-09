import React from 'react'

export default function ListButtonsDownloads(props) {
	return (
		<div className={props.className}>
			{...props.data.map(item => (
				<button id={item.id} key={item.id} className={props.classNameItem}>
					{item.title}
				</button>
			))}
		</div>
	)
}

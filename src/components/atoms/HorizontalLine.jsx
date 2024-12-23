import React from 'react'

export default function HorizontalLine({ color = '', etc_style = '' }) {
	const className = color + ' ' + etc_style + ' ' + 'sm:mx-auto lg:my-8 md:my-8'
	return <hr className={className} />
}

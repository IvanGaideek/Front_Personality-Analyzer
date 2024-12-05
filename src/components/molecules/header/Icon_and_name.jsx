import React from 'react'
import { IconSite } from '../../atoms/IconSite'
import MainIconSite from '../../../resources/img/MainIconSite.svg'

export const IconName = ({ className = '' }) => {
	return (
		<div className={className}>
			<IconSite Img={MainIconSite} className='h-8 w-auto' alt='' />
			<span>PersonalAnalysis</span>
		</div>
	)
}

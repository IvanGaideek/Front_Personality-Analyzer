import React from 'react'
import { IconSite } from '../../atoms/IconSite'
import MainIconSite from '../../../resources/img/MainIconSite.svg'

export const IconName = ({ className = '' }) => {
	return (
		<div className={className}>
			<IconSite Img={MainIconSite} className='h-10 w-auto' alt='' />
			<span className='lato-bold'>PersonalAnalysis</span>
		</div>
	)
}

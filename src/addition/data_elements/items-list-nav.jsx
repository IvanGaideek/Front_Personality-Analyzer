import {
	ChartPieIcon,
	DocumentTextIcon,
	UserIcon,
} from '@heroicons/react/24/outline'

const features = [
	{
		name: 'My Data search',
		description:
			'To search, filter, evaluate and download your data on the analyzed personalities.',
		href: '#',
		icon: ChartPieIcon,
	},
	{
		name: 'Documentation',
		description: 'Instructions on how to use the platform.',
		href: '#',
		icon: DocumentTextIcon,
	},
	{
		name: 'Profile',
		description: 'Manage your account.',
		href: '#',
		icon: UserIcon,
	},
]
const callsToAction = [{ name: 'About us', href: '#' }]

export { features, callsToAction }

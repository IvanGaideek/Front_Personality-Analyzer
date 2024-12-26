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
		href: '/notfound',
		icon: ChartPieIcon,
	},
	{
		name: 'Documentation',
		description: 'Instructions on how to use the platform.',
		href: '/docs/app-usage',
		icon: DocumentTextIcon,
	},
	{
		name: 'Profile',
		description: 'Manage your account.',
		href: '/profile',
		icon: UserIcon,
	},
]
const callsToAction = [{ name: 'About us', href: '/docs/overview' }]

export { features, callsToAction }

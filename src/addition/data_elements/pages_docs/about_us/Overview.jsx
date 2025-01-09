import React from 'react'
import { Link } from 'react-router-dom'

export default function OverviewAboutUs() {
	return (
		<section className='py-24 relative'>
			<div className='w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto'>
				<div className='w-full justify-start items-center gap-8 grid lg:grid-cols-2 grid-cols-1'>
					<div className='w-full flex-col justify-start lg:items-start items-center gap-10 inline-flex'>
						<div className='w-full flex-col justify-start lg:items-start items-center gap-4 flex'>
							<h2 className='text-white lato-bold text-4xl leading-normal lg:text-start text-center'>
								A Large-Scale personality analysis platform
							</h2>
							<p className='text-almost-white open-sans text-base font-normal leading-relaxed lg:text-start text-center'>
								The platform provides the user with the opportunity to analyze a
								person based on the provided data (questionnaires, resumes,
								characteristics, tests, etc.), while the system generates a
								compact database with the key characteristics of the analyzed
								people.
							</p>
						</div>
						<Link
							to='/docs/fast-start'
							className='border-2 border-medium-yellow sm:w-fit w-full px-3.5 py-2 hover:bg-yellow-alpha-80 transition-all duration-700 ease-in-out rounded-lg shadow-[0px_1px_2px_0px_rgba(48,_72,_120,_0.05)] justify-center items-center flex'
						>
							<span className='px-1.5 text-white text-sm lato-regular leading-6'>
								Get Started
							</span>
						</Link>
					</div>
					<img
						className='lg:mx-0 mx-auto h-full rounded-3xl'
						src='/src/resources/img/about_us_overwrite1.jpg'
						alt='AboutUs img'
					/>
				</div>
			</div>
		</section>
	)
}

import React, { useState } from 'react'
import ModalWindow from './ModalWindow'
import ModalAcceptance from '../molecules/ModalAcceptance'

export default function DeleteButton(props) {
	const className_button = props.className

	const [modalIsOpen, setModalIsOpen] = useState(false)

	return (
		<>
			<button
				onClick={() => setModalIsOpen(true)}
				className={
					className_button != null
						? className_button
						: 'bg-red-500 text-white px-3 py-1 rounded-md text-xs md:text-sm'
				}
			>
				{props.text}
			</button>
			{modalIsOpen && (
				<ModalWindow setModalIsOpen={setModalIsOpen}>
					<ModalAcceptance
						setModalIsOpen={setModalIsOpen}
						title={props.title}
						description={props.description}
						name_button={props.name_button ? props.name_button : 'Delete'}
					/>
				</ModalWindow>
			)}
		</>
	)
}

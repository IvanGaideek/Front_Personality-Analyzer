import React, { useState } from 'react'
import {
	tableTemplates,
	typesData,
	idColumn,
} from '../../../addition/data_elements/select-table-modifications'
import ModalWindow from '../../atoms/ModalWindow'
import ButtonLoadModal from './ButtonLoadModal'
import WorkspaceModal from './WorkspaceModal'

export default function ModalTableCreationTool() {
	const [open, setOpen] = useState(false)

	return (
		<div>
			<ButtonLoadModal setOpen={setOpen} />
			{open && (
				<ModalWindow setModalIsOpen={setOpen}>
					<div className='p-4 border-b flex justify-between items-center'>
						<h2 className='text-xl poppins'>Create Table</h2>
						<button
							className='text-gray-500 hover:text-gray-700'
							onClick={() => setOpen(false)}
						>
							&times;
						</button>
					</div>
					<WorkspaceModal
						tableTemplates={tableTemplates}
						typesData={typesData}
						idColumn={idColumn}
					/>
				</ModalWindow>
			)}
		</div>
	)
}

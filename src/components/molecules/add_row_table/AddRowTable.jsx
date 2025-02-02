import React, { useState } from 'react'
import ModalWindow from '../../atoms/ModalWindow'
import TwoButtonsAcceptance from '../../atoms/twoButtonsAcceptance'
import {
	len_varchar,
	getInputProps,
	validateInput,
	getInputType,
} from '../../../addition/data_elements/select-table-modifications'
import CheckboxForm from '../../atoms/CheckboxForm'
import ErrorMessage from '../../atoms/ErrorMessage'
import { AiOutlineLoading3Quarters } from 'react-icons/ai' // Иконка для индикации загрузки

// Компонент модального окна добавления строки
export default function AddRowModal(props) {
	// Обработчик изменения значений полей
	const handleInputChange = (columnName, value) => {
		props.setEditedData(prev => ({
			...prev,
			[columnName.toLowerCase().replace(/ /g, '_')]: value,
		}))
	}

	return (
		<ModalWindow setModalIsOpen={props.setIsAddModalOpen}>
			<div className='p-4 border-b flex justify-between items-center'>
				<h2 className='text-xl poppins'>Add Row</h2>
				<button
					className='text-gray-500 hover:text-gray-700'
					onClick={() => props.setIsAddModalOpen(false)}
				>
					&times;
				</button>
			</div>
			<div className='p-6 open-sans'>
				{props.isLoading ? (
					<div className='flex flex-row gap-2 mb-2'>
						<span className='text-medium-gray text-sm lato-regular'>
							Loading
						</span>
						<AiOutlineLoading3Quarters className='animate-spin mr-2 h-5 w-5' />
					</div>
				) : (
					<ErrorMessage
						message={props.error}
						className='mb-2 text-sm text-red-500 lato-regular'
					/>
				)}
				<div className='max-h-[60vh] overflow-y-auto'>
					{props.columns.map((column, index) => {
						const columnKey = column.name.toLowerCase().replace(/ /g, '_')
						const isIdField = columnKey === 'id'

						const handleChange = e => {
							const value =
								column.type === 'BOOLEAN' ? e.target.checked : e.target.value

							// Проверяем валидность ввода
							if (validateInput[column.type](value.toString())) {
								handleInputChange(column.name, value)
							}
						}

						return (
							<div key={index} className='mb-4'>
								{column.type === 'BOOLEAN' ? (
									<div className='mx-2'>
										<CheckboxForm
											checked={props.editedData[columnKey] || false}
											onChange={handleChange}
										>
											{column.name}
										</CheckboxForm>
									</div>
								) : (
									!isIdField && (
										<>
											<label className='block text-sm poppins text-almost-white mb-2'>
												{column.name}
											</label>
											<input
												type={getInputType(column.type)}
												value={props.editedData[columnKey] || ''}
												onChange={handleChange}
												disabled={isIdField}
												{...getInputProps(column.type)}
												className={`w-full py-2 px-3 border border-medium-gray bg-black-alpha-10 
              rounded-md shadow-sm focus:outline-none focus:ring-medium-yellow 
              focus:border-medium-yellow`}
											/>
										</>
									)
								)}
								{column.type === 'VARCHAR' && (
									<div className='text-sm text-gray-400 mt-1'>
										{props.editedData[columnKey]?.length || 0}/{len_varchar}
									</div>
								)}
							</div>
						)
					})}
				</div>
				<TwoButtonsAcceptance
					first_onClick={props.handleAdd}
					second_onClick={() => props.setIsAddModalOpen(false)}
					names={{ left: 'Add', right: 'Cancel' }}
				/>
			</div>
		</ModalWindow>
	)
}

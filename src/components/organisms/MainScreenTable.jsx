import React, { useEffect, useState } from 'react'
import {
	DataTable,
	exportCSV,
	exportJSON,
	exportSQL,
	exportTXT,
} from 'simple-datatables'
import { ChevronUpDownIcon } from '@heroicons/react/24/outline'
import ListButtonsDownloads from '../molecules/ListButtonsDownloads'
import { downloads_database } from '../../addition/data_elements/item-downloads-database'
import UpdateModalTable from '../molecules/modelUpdateTable/UpdateModalTable'

export default function MainScreenTable({ columns, data, selectedTable }) {
	const [isEditModalOpen, setIsEditModalOpen] = useState(false)
	const [editedData, setEditedData] = useState({})
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [oldData, setOldData] = useState({})

	useEffect(() => {
		// Проверяем, чтобы загрузка завершилась и таблица была создана
		const tableElement = document.getElementById('filter-table')

		// Проверяем, чтобы загрузка завершилась и таблица была создана
		if (data.length > 0 && tableElement) {
			const dataTable = new DataTable('#filter-table', {
				searchable: true,
				sortable: true,
				perPage: 5,
				searchQuerySeparator: ' ',
				multiselect: true,
				tableRender: (_data, table, type) => {
					if (type === 'print') {
						return table
					}

					const tHead = table.childNodes[0]
					const filterHeaders = {
						nodeName: 'TR',
						attributes: { class: 'search-filtering-row' },
						childNodes: tHead.childNodes[0].childNodes.map((_th, index) => ({
							nodeName: 'TH',
							childNodes: [
								{
									nodeName: 'INPUT',
									attributes: {
										class: 'datatable-input',
										type: 'search',
										'data-columns': `[${index}]`,
									},
								},
							],
						})),
					}

					tHead.childNodes.push(filterHeaders)
					return table
				},
			})

			document.getElementById('export-csv').addEventListener('click', () => {
				exportCSV(dataTable, {
					download: true,
					lineDelimiter: '\n',
					columnDelimiter: ';',
				})
			})
			document.getElementById('export-sql').addEventListener('click', () => {
				exportSQL(dataTable, {
					download: true,
					tableName: 'export_table',
				})
			})
			document.getElementById('export-txt').addEventListener('click', () => {
				exportTXT(dataTable, {
					download: true,
				})
			})
			document.getElementById('export-json').addEventListener('click', () => {
				exportJSON(dataTable, {
					download: true,
					space: 3,
				})
			})
		}
	}, [data])

	// Обработчик клика по строке
	const handleRowClick = rowData => {
		setEditedData(rowData)
		setOldData(rowData)
		setIsEditModalOpen(true)
	}

	// Обработчик сохранения изменений
	const handleSave = async () => {
		if (oldData === editedData) {
			setError('No changes to save')
			return
		}
		try {
			setError('') // Очищаем предыдущие ошибки
			setIsLoading(true) // Опционально: показываем состояние загрузки

			const response = await fetch('/api/update-row', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					// Добавьте другие необходимые заголовки (например, авторизацию)
				},
				body: JSON.stringify(editedData),
			})

			let errorMessage = 'Failed to update data'

			if (!response.ok) {
				try {
					const errorData = await response.json()

					// Обработка различных форматов ответа сервера
					errorMessage =
						errorData?.message || // Стандартное поле message
						errorData?.error || // Альтернативное поле error
						errorData?.errors?.[0] || // Массив ошибок
						response.statusText || // HTTP статус
						errorMessage // Дефолтное сообщение
				} catch (parseError) {
					// Если не удалось распарсить JSON, используем HTTP статус
					errorMessage =
						`${response.status}: ${response.statusText}` || errorMessage
				}

				throw new Error(errorMessage)
			}

			const data = await response.json()

			// Успешное обновление
			setIsEditModalOpen(false)
			// Здесь можно добавить обновление данных в таблице
		} catch (error) {
			setError(error.message)
		} finally {
			setIsLoading(false) // Опционально: скрываем состояние загрузки
		}
	}

	// Добавьте функцию для удаления строки
	const handleDelete = async () => {
		setError('') // Очищаем предыдущие ошибки
		setIsLoading(true) // Опционально: показываем состояние загрузки
		try {
			const response = await fetch('/api/delete-row', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					id: editedData.id,
					tableName: selectedTable,
				}),
			})

			if (!response.ok) {
				setError('Failed to delete row')
			}

			// После успешного удаления
			setIsEditModalOpen(false)
			// Обновление данных в таблице, удалив строку
			// const newData = data.filter(row => row.id !== editedData.id)
			setData(newData)
		} catch (error) {
			// Передача сообщения об ошибке
			setError('Failed to delete row')
		}
	}

	return (
		<>
			<div className='overflow-x-auto'>
				<table
					id='filter-table'
					className='min-w-full bg-white border border-gray-200 rounded-lg shadow-lg'
				>
					<thead className='text-all-black'>
						<tr>
							{columns.map((heading, index) => (
								<th
									key={index}
									className='px-6 py-3 text-left text-sm font-medium'
								>
									<span className='flex items-center'>
										{heading.name}
										<ChevronUpDownIcon className='w-4 h-4 ms-1' />
									</span>
								</th>
							))}
						</tr>
					</thead>
					<tbody className='text-all-black'>
						{data.map((item, index) => (
							<tr
								key={item.id || index}
								className='border-b hover:bg-medium-gray transition duration-150 cursor-pointer'
								onClick={() => handleRowClick(item)}
							>
								{columns.map((column, columnIndex) => (
									<td
										key={columnIndex}
										className='px-6 py-4 font-medium text-gray-800'
									>
										{item[column.name.toLowerCase().replace(/ /g, '_')]}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{isEditModalOpen && (
				<UpdateModalTable
					setIsEditModalOpen={setIsEditModalOpen}
					columns={columns}
					handleSave={handleSave}
					editedData={editedData}
					setEditedData={setEditedData}
					error={error}
					isLoading={isLoading}
					handleDelete={handleDelete}
				/>
			)}

			<ListButtonsDownloads
				className='flex items-center justify-end gap-2 md:gap-4 my-2'
				data={downloads_database}
				classNameItem='flex items-center px-1 py-1 bg-medium-yellow border-2 border-white text-xs md:text-base text-all-black font-lato-regular rounded-lg shadow-md hover:bg-yellow-alpha-80 transition duration-400'
			/>
		</>
	)
}

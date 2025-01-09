import React, { useEffect } from 'react'
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

export default function MainScreenTable({ columns, data }) {
	// для инициализации DataTable
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
										{heading}
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
								className='border-b hover:bg-medium-gray transition duration-150'
							>
								{columns.map((column, columnIndex) => (
									<td
										key={columnIndex}
										className='px-6 py-4 font-medium text-gray-800'
									>
										{item[column.toLowerCase().replace(/ /g, '_')]}
										{/* Преобразование ключа в формат объекта */}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<ListButtonsDownloads
				className='flex items-center justify-end gap-2 md:gap-4 my-2'
				data={downloads_database}
				classNameItem='flex items-center px-1 py-1 bg-medium-yellow border-2 border-white text-xs md:text-base text-all-black font-lato-regular rounded-lg shadow-md hover:bg-yellow-alpha-80 transition duration-400'
			/>
		</>
	)
}

import React, { useState } from 'react'
import ResponseResult from '../../atoms/ResponseResult'
import BottomModalWindow from './BottomModalWindow'

const MAX_COLUMNS = 16
const MAX_COLUMN_NAME_LENGTH = 30
const MAX_TABLE_NAME_LENGTH = 50
const validNameRegex = /^[a-zA-Z_][a-zA-Z0-9_]*$/ // Валидация на допустимые символы

export default function WorkspaceModal({
	tableTemplates,
	typesData,
	idColumn,
}) {
	const [columns, setColumns] = useState(idColumn)
	const [template, setTemplate] = useState('')
	const [message, setMessage] = useState('')
	const [error, setError] = useState('')
	const [tableName, setTableName] = useState('')

	const handleTableNameChange = value => {
		if (value.length > MAX_TABLE_NAME_LENGTH) {
			setError(`Table name cannot exceed ${MAX_TABLE_NAME_LENGTH} characters`)
			return
		}
		if (value && !validNameRegex.test(value)) {
			setError(
				'Table name can contain only letters, numbers, underscores, and begin with a letter or underscores.'
			)
			return
		}

		setTableName(value)
		setError('')
	}

	const addColumn = () => {
		if (columns.length >= MAX_COLUMNS) {
			setError(`Maximum number of columns (${MAX_COLUMNS}) reached`)
			return
		}
		setColumns([...columns, { name: '', type: 'VARCHAR' }])
		setError('')
	}

	const removeColumn = index => {
		const newColumns = columns.filter((_, i) => i !== index)
		setColumns(newColumns)
		setError('')
	}

	const handleChange = (index, key, value) => {
		const newColumns = [...columns]

		if (key === 'name') {
			// Ограничение длины имени колонки
			if (value.length > MAX_COLUMN_NAME_LENGTH) {
				setError(
					`Column name cannot exceed ${MAX_COLUMN_NAME_LENGTH} characters`
				)
				return
			}
			if (!validNameRegex.test(value)) {
				setError(
					'The column name can contain only letters, numbers, underscores, and begin with a letter or underscores.'
				)
				return
			}
		}

		newColumns[index][key] = value
		setColumns(newColumns)
		setError('')
	}

	const handleTemplateChange = templateName => {
		const templateColumns = [
			{ name: 'id', type: 'INTEGER', isMandatory: true },
			...(tableTemplates[templateName]?.filter(col => col.name !== 'id') || []),
		]

		if (templateColumns.length > MAX_COLUMNS) {
			setError(`Template exceeds maximum number of columns (${MAX_COLUMNS})`)
			return
		}

		setTemplate(templateName)
		setColumns(templateColumns)
		setError('')
	}
	const handleSubmit = async () => {
		// Проверка наличия имени таблицы
		if (!tableName.trim()) {
			setError('Table name is required')
			return
		}
		// Проверка на содержание хотя бы двух столбцов
		if (columns.length < 3) {
			setError('Add more columns')
			return
		}

		const tableData = {
			tableName,
			columns,
		}

		try {
			const response = await fetch('/api/create-table', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(tableData),
			})

			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`)
			}

			const data = await response.json()
			setMessage('Success: Table created successfully')
			setError('')
			setOpen(false)
		} catch (error) {
			setError(error.message)
			setMessage('')
		}
	}
	return (
		<div className='p-6 open-sans'>
			<ResponseResult message={message} error={error} />
			<div className='mb-4'>
				<label className='block text-sm poppins text-almost-white mb-2'>
					Table Name <span className='text-red-500'>*</span>
				</label>
				<input
					type='text'
					placeholder='Enter table name'
					value={tableName}
					onChange={e => handleTableNameChange(e.target.value)}
					maxLength={MAX_TABLE_NAME_LENGTH}
					className='w-full py-2 px-3 border border-medium-gray bg-black-alpha-10 rounded-md shadow-sm focus:outline-none focus:ring-medium-yellow focus:border-medium-yellow'
					required
				/>
				<div className='text-sm text-gray-500 mt-1'>
					{tableName.length}/{MAX_TABLE_NAME_LENGTH} characters
				</div>
			</div>
			<div className='mb-4'>
				<label className='block text-sm poppins text-almost-white'>
					Select Template
				</label>
				<select
					value={template}
					onChange={e => handleTemplateChange(e.target.value)}
					className='mt-1 block w-full py-2 px-3 border border-medium-gray bg-black-alpha-10 rounded-md shadow-sm focus:outline-none focus:ring-medium-yellow focus:border-medium-yellow'
				>
					{Object.keys(tableTemplates).map(key => (
						<option
							key={key}
							value={key}
							className='bg-almost-white text-all-black'
						>
							{key}
						</option>
					))}
				</select>
			</div>
			<div className='max-h-[60vh] overflow-y-auto'>
				{columns.map((column, index) => (
					<div
						key={index}
						className='flex items-center space-x-1 md:space-x-2 mb-4'
					>
						<input
							type='text'
							placeholder='Column Name'
							value={column.name}
							onChange={e => handleChange(index, 'name', e.target.value)}
							readOnly={column.isMandatory}
							maxLength={MAX_COLUMN_NAME_LENGTH}
							className={`flex-1 py-2 px-2 md:px-3 border border-medium-gray bg-black-alpha-10 rounded-md shadow-sm focus:outline-none focus:ring-medium-yellow focus:border-medium-yellow ${
								column.isMandatory ? 'bg-black-alpha-70 cursor-not-allowed' : ''
							}`}
						/>
						<select
							value={column.type}
							onChange={e => handleChange(index, 'type', e.target.value)}
							disabled={column.isMandatory}
							className={`py-2 px-3 border border-medium-gray bg-black-alpha-10 rounded-md shadow-sm focus:outline-none focus:ring-medium-yellow focus:border-medium-yellow ${
								column.isMandatory ? 'bg-black-alpha-70 cursor-not-allowed' : ''
							}`}
						>
							{typesData.map((type, index) => (
								<option
									key={index}
									className='bg-almost-white text-all-black'
									value={type}
								>
									{type}
								</option>
							))}
						</select>
						{!column.isMandatory && (
							<button
								className='text-red-500 hover:text-red-700'
								onClick={() => removeColumn(index)}
							>
								&#10005;
							</button>
						)}
					</div>
				))}
			</div>
			<BottomModalWindow
				MAX_COLUMNS={MAX_COLUMNS}
				len_columns={columns.length}
				addColumn={addColumn}
				handleSubmit={handleSubmit}
			/>
		</div>
	)
}

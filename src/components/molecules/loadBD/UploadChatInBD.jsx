import React, { useState, useEffect } from 'react'
import CheckboxForm from '../../atoms/CheckboxForm'
import TextLinkBlock from '../../atoms/TextLinkBlock'
import PhoneWritingInBD from './PhoneWritingInBD'
import { error_same_col } from '../../../addition/data_elements/errors'

const MAX_LENGTH_NAME = 64 // Максимальная длина

export default function UploadChatInBD({
	isDownloadConfirm,
	setDownloadConfirm,
	loadingDatabase,
	setLoadingDatabase,
	personName,
	setPersonName,
	func_search_internet = false,
	useSearchInternet,
	setUseSearchInternet,
	analysis_phone = false,
}) {
	const [isUploadEnabled, setUploadEnabled] = useState(isDownloadConfirm)
	const [tables, setTables] = useState([])
	const [columns, setColumns] = useState([])
	const [error, setError] = useState('')

	useEffect(() => {
		// взависимости от таблицы в selectedTable
		if (loadingDatabase.selectedTable) {
			const mockColumns = ['Column1', 'Column2', 'Column3', 'Person', 'Class']
			setColumns(mockColumns)
			setLoadingDatabase(prevState => ({
				...prevState,
				personColumn: mockColumns[0],
				classColumn: mockColumns[mockColumns.length - 1],
			}))
		} else {
			setLoadingDatabase(prevState => ({
				...prevState,
				personColumn: '',
				classColumn: '',
			}))
			setColumns([])
			if (isUploadEnabled) {
				setError('Please select the correct table.')
			}
		}
	}, [loadingDatabase.selectedTable, isUploadEnabled])

	// эффект для проверки колонок
	useEffect(() => {
		if (!loadingDatabase.personColumn || !loadingDatabase.classColumn) {
			setError(
				'It is impossible to upload to the Database without these filled in fields.'
			)
			setDownloadConfirm(false)
			return
		}
		if (loadingDatabase.personColumn === loadingDatabase.classColumn) {
			setError('Person and Class columns must be different')
			setDownloadConfirm(false)
		} else {
			if (!personName) {
				setError(
					'It is impossible to upload to the Database without these filled in fields.'
				)
			} else {
				setError('')
			}
			setDownloadConfirm(true)
		}
	}, [loadingDatabase, personName])

	useEffect(() => {
		if (analysis_phone) {
			if (isDownloadConfirm && loadingDatabase.needAnalysisPhone) {
				const texts = [
					loadingDatabase.personColumn,
					loadingDatabase.classColumn,
					loadingDatabase.writingPhoneColumn,
					loadingDatabase.locationPhoneColumn,
					loadingDatabase.providerPhoneColumn,
				].filter(text => text.trim())
				const validation = checkTexts(texts)
				if (texts && !validation) {
					setError(error_same_col)
					setDownloadConfirm(false)
				} else {
					setError('')
					setDownloadConfirm(true)
				}
			}
		}
	}, [
		loadingDatabase.personColumn,
		loadingDatabase.classColumn,
		loadingDatabase.writingPhoneColumn,
		loadingDatabase.locationPhoneColumn,
		loadingDatabase.providerPhoneColumn,
	])

	const checkTexts = texts => {
		// Проверка на уникальность
		const uniqueTexts = new Set(texts)
		const hasNonUniqueTexts = uniqueTexts.size !== texts.length

		return !hasNonUniqueTexts
	}

	const onChangeCheckUpload = async () => {
		setError('')

		// Если пытаемся включить
		if (!isUploadEnabled) {
			// Сначала получаем таблицы
			const mockTables = ['Table1', 'Table2', 'Table3']
			// const mockTables = [] // для тестирования пустого состояния

			// Проверяем наличие таблиц
			if (mockTables.length === 0) {
				setDownloadConfirm(false)
				setError(
					"You don't have any tables. Please create a table first (in My Data search)."
				)
				return // Предотвращаем включение чекбокса
			}

			// Если таблицы есть, обновляем состояние
			setTables(mockTables)
			setLoadingDatabase(prevState => ({
				...prevState,
				selectedTable: 'Table1',
			}))
			setDownloadConfirm(true)
			setUploadEnabled(true)
		} else {
			// Если выключаем
			setTables([])
			setLoadingDatabase(prevState => ({
				...prevState,
				selectedTable: '',
			}))
			setDownloadConfirm(false)
			setUploadEnabled(false)
		}
	}

	const handleTableChange = event => {
		const table = event.target.value
		setLoadingDatabase(prevState => ({
			...prevState,
			selectedTable: table,
		}))
	}

	return (
		<div className='border-2 border-almost-white bg-all-black p-4 max-w-2xl mx-auto rounded-lg'>
			{func_search_internet && (
				<CheckboxForm
					checked={useSearchInternet}
					onChange={() => setUseSearchInternet(!useSearchInternet)}
				>
					Use the internet search
				</CheckboxForm>
			)}
			{analysis_phone && (
				<PhoneWritingInBD
					loadingDatabase={loadingDatabase}
					setLoadingDatabase={setLoadingDatabase}
					isUploadEnabled={isUploadEnabled}
					columns={columns}
				/>
			)}
			<h2 className='text-lg font-semibold text-medium-yellow'>
				Data Upload (Database)
			</h2>
			<p className='text-sm text-medium-gray mb-4'>
				Enable data download. Select the table and columns where you want to
				upload the data.
			</p>
			<CheckboxForm checked={isUploadEnabled} onChange={onChangeCheckUpload}>
				Enable Upload
			</CheckboxForm>
			{isUploadEnabled && tables.length > 0 && (
				<>
					<div className='flex flex-row items-center justify-content gap-2 mb-4 mt-4'>
						<label className='text-white poppins mb-2'>Select Table:</label>
						<select
							value={loadingDatabase.selectedTable}
							onChange={handleTableChange}
							className='block w-full md:w-1/3 px-4 py-2 bg-all-black border border-medium-yellow text-white rounded-lg focus:outline-none focus:ring focus:ring-medium-gray transition duration-200'
						>
							{tables.map(table => (
								<option
									key={table}
									value={table}
									className='bg-gray-800 hover:bg-gray-600'
								>
									{table}
								</option>
							))}
						</select>
					</div>
					{loadingDatabase.selectedTable && (
						<>
							<div className='flex flex-row items-center justify-content gap-2 mb-4 mt-4'>
								<label className='text-white poppins mb-2'>
									Select Person Column:
								</label>
								<select
									value={loadingDatabase.personColumn}
									onChange={e =>
										setLoadingDatabase(prevState => ({
											...prevState,
											personColumn: e.target.value,
										}))
									}
									className='block w-full md:w-1/3 px-4 py-2 bg-all-black border border-medium-yellow text-white rounded-lg focus:outline-none focus:ring focus:ring-medium-gray transition duration-200'
								>
									{columns.map(column => (
										<option
											key={column}
											value={column}
											className='bg-gray-800 hover:bg-gray-600'
										>
											{column}
										</option>
									))}
								</select>
							</div>
							<div className='flex flex-row items-center justify-content gap-2 mb-4 mt-4'>
								<label className='text-white poppins mb-2'>
									Writing the result to the:
								</label>
								<select
									value={loadingDatabase.classColumn}
									onChange={e =>
										setLoadingDatabase(prevState => ({
											...prevState,
											classColumn: e.target.value,
										}))
									}
									className='block w-full md:w-1/3 px-4 py-2 bg-all-black border border-medium-yellow text-white rounded-lg focus:outline-none focus:ring focus:ring-medium-gray transition duration-200'
								>
									{columns.map(column => (
										<option
											key={column}
											value={column}
											className='bg-gray-800 hover:bg-gray-600'
										>
											{column}
										</option>
									))}
								</select>
							</div>
							<div className='flex flex-row items-center justify-content gap-2 mb-4 mt-4'>
								<label className='text-white poppins mb-2'>Name person:</label>
								<div className='relative w-full'>
									<input
										type='text'
										maxLength={MAX_LENGTH_NAME}
										value={personName}
										onChange={e => setPersonName(e.target.value)}
										placeholder='Enter your text here...'
										className='block w-full w-full px-4 py-2 bg-all-black border border-medium-yellow text-white rounded-lg focus:outline-none focus:ring focus:ring-medium-gray transition duration-200'
									/>
									<div className='rounded-lg text-xs poppins-bold absolute right-1 bottom-1 text-medium-yellow bg-black-alpha-70'>
										<span className='p-1'>
											{personName.length}/{MAX_LENGTH_NAME}
										</span>
									</div>
								</div>
							</div>
						</>
					)}
				</>
			)}
			{error && isUploadEnabled && (
				<p className='text-red-500 lato-regular'>{error}</p>
			)}
			<TextLinkBlock
				message='Read the rules for uploading to the database:'
				link='/docs/app-usage'
				text_link='in documentation'
				className='mt-6'
			/>
		</div>
	)
}

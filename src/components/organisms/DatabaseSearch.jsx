import React, { useState, useEffect } from 'react'
import MainScreenTable from './MainScreenTable'
import DeleteButton from '../atoms/DeleteButton'
import ModalTableCreationTool from '../molecules/modelCreateTable/CreateTableModal'

export default function DatabaseSearch() {
	const [tables, setTables] = useState([]) // Состояние для таблиц
	const [selectedTable, setSelectedTable] = useState('') // Начальное состояние выбранной таблицы
	const [data, setData] = useState([])
	const [columns, setColumns] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		// Функция для получения данных таблиц с сервера
		const fetchTables = async () => {
			try {
				const result = [
					{ label: 'table1', value: 'table1' },
					{ label: 'table2', value: 'table2' },
					// Добавьте другие таблицы, если необходимо
				]
				setTables(result) // ожидаем, что результат — это массив объектов с label и value
				if (result.length > 0) {
					setSelectedTable(result[0].value) // устанавливаем выбранную таблицу
				}
			} catch (err) {
				setError(err.message)
			} finally {
				setLoading(false)
			}
		}

		fetchTables()
	}, [])

	useEffect(() => {
		const fetchData = () => {
			if (selectedTable) {
				setLoading(true)
				setError(null)
				setTimeout(() => {
					try {
						let fakeResponse
						if (selectedTable === 'table2') {
							fakeResponse = {
								columns: [
									{ name: 'id', type: 'INTEGER' },
									{ name: 'Name', type: 'VARCHAR' },
									{ name: 'Category', type: 'VARCHAR' },
									{ name: 'Brand', type: 'VARCHAR' },
									{ name: 'Price', type: 'VARCHAR' },
									{ name: 'Stock', type: 'INTEGER' },
									{ name: 'How', type: 'BOOLEAN' },
								], // имя колонки - тип данных колонки
								data: [
									{
										id: 12,
										name: 'Product 1',
										category: 'Category 1',
										brand: 'Brand 1',
										price: '$100',
										stock: 10,
										how: true,
									},
									{
										id: 13,
										name: 'Product 2',
										category: 'Category 2',
										brand: 'Brand 2',
										price: '$200',
										stock: 20,
										how: false,
									},
									{
										id: 14,
										name: 'Product 3',
										category: 'Category 3',
										brand: 'Brand 3',
										price: '$300',
										stock: 30,
										how: true,
									},
								],
							}
						}
						if (selectedTable === 'table1') {
							fakeResponse = {
								columns: [
									{ name: 'id', type: 'INTEGER' },
									{ name: 'Name', type: 'VARCHAR' },
									{ name: 'Category', type: 'VARCHAR' },
									{ name: 'Brand', type: 'VARCHAR' },
									{ name: 'Price', type: 'VARCHAR' },
									{ name: 'Stock', type: 'INTEGER' },
									{ name: 'Total_Sales', type: 'DECIMAL' },
									{ name: 'Status', type: 'VARCHAR' },
								], // имя колонки - тип данных колонки
								data: [
									{
										id: 1,
										name: 'Apple iMac hefvhjehrvhjehbjv',
										category: 'Computers',
										brand: 'Apple',
										price: '$1,299',
										stock: 50,
										totalSales: 200,
										status: 'In Stock',
									},
									{
										id: 2,
										name: 'Apple iPhone',
										category: 'Mobile Phones',
										brand: 'Apple',
										price: '$999',
										stock: 120,
										totalSales: 300,
										status: 'In Stock',
									},
									{
										id: 3,
										name: 'Samsung Galaxy',
										category: 'Mobile Phones',
										brand: 'Samsung',
										price: '$899',
										stock: 80,
										totalSales: 150,
										status: 'In Stock',
									},
									{
										id: 4,
										name: 'Dell XPS 13',
										category: 'Computers',
										brand: 'Dell',
										price: '$1,099',
										stock: 30,
										totalSales: 120,
										status: 'In Stock',
									},
									{
										id: 5,
										name: 'Apple MacBook Pro',
										category: 'Computers',
										brand: 'Apple',
										price: '$1,299',
										stock: 20,
										totalSales: 100,
										status: 'In Stock',
									},
									{
										id: 6,
										name: 'Apple iMac',
										category: 'Computers',
										brand: 'Apple',
										price: '$1,299',
										stock: 50,
										totalSales: 200,
										status: 'In Stock',
									},
									{
										id: 7,
										name: 'Apple iPhone',
										category: 'Mobile Phones',
										brand: 'Apple',
										price: '$999',
										stock: 120,
										totalSales: 300,
										status: 'In Stock',
									},
									{
										id: 8,
										name: 'Samsung Galaxy',
										category: 'Phones',
										brand: 'Samsung',
										price: '$899',
										stock: 80,
										totalSales: 20,
										status: 'In Stock',
									},
								],
							}
						}
						setColumns(fakeResponse.columns)
						setData(fakeResponse.data)
					} catch (err) {
						setError('Error when uploading data')
					} finally {
						setLoading(false)
					}
				}, 1000)
			}
		}

		fetchData()
	}, [selectedTable])

	return (
		<div className='flex-container bg-all-black right-top-circle-bi'>
			{error ? (
				<div className='text-white'>Error: {error}</div>
			) : (
				<>
					<div className='border-2 border-white p-6 bg-black-alpha-70 rounded-lg shadow-lg m-4'>
						{selectedTable ? (
							<>
								<h2 className='text-white poppins mb-4'>Select a table:</h2>
								<div className='flex flex-row gap-5 justify-between'>
									<select
										value={selectedTable}
										onChange={e => setSelectedTable(e.target.value)}
										className='block w-full md:w-1/3 px-4 py-2 bg-all-black border border-medium-yellow text-white rounded-lg focus:outline-none focus:ring focus:ring-medium-gray transition duration-200'
									>
										{tables.map(table => (
											<option
												key={table.value}
												value={table.value}
												className='bg-gray-800 hover:bg-gray-600'
											>
												{table.label}
											</option>
										))}
									</select>
									<div className='flex flex-col items-center gap-2'>
										<DeleteButton
											text='Delete SelectedTable'
											title='Delete the selected table'
											description='Are you sure you want to permanently delete this table?'
										/>
										<ModalTableCreationTool />
									</div>
								</div>
							</>
						) : (
							<h2 className='text-white text-lg'>You don't have tables.</h2>
						)}
					</div>
					{loading && <div className='text-white'>Loading...</div>}
					{!loading && !error && selectedTable && (
						<MainScreenTable
							columns={columns}
							data={data}
							selectedTable={selectedTable}
						/>
					)}
				</>
			)}
		</div>
	)
}

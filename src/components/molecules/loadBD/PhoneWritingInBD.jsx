import React from 'react'
import CheckboxForm from '../../atoms/CheckboxForm'
import ChooseColumnModification from '../../atoms/ChooseColumnModification'

export default function PhoneWritingInBD({
	loadingDatabase,
	setLoadingDatabase,
	isUploadEnabled,
	columns,
}) {
	const handleChangeWritingPhoneColumn = arg => {
		setLoadingDatabase(prevState => ({
			...prevState,
			writingPhoneColumn: arg,
		}))
	}

	const handleChangeLocationPhoneColumn = arg => {
		setLoadingDatabase(prevState => ({
			...prevState,
			locationPhoneColumn: arg,
		}))
	}

	const handleChangeProviderPhoneColumn = arg => {
		setLoadingDatabase(prevState => ({
			...prevState,
			providerPhoneColumn: arg,
		}))
	}

	return (
		<div>
			<div className='flex flex-col justify-content mb-4'>
				<CheckboxForm
					checked={loadingDatabase.needAnalysisPhone}
					onChange={async () =>
						setLoadingDatabase(prevState => ({
							...prevState,
							needAnalysisPhone: !prevState.needAnalysisPhone,
						}))
					}
				>
					Analyze the first phone number you see
				</CheckboxForm>
				{loadingDatabase.needAnalysisPhone && isUploadEnabled && (
					<div className='flex flex-col gap-2 ml-2 mt-4'>
						<div className='flex flex-row gap-1 justify-between items-center'>
							<ChooseColumnModification
								columns={columns}
								checked={loadingDatabase.writingPhoneColumn}
								setLoadingDatabase={handleChangeWritingPhoneColumn}
								label='Write out the phone number in the column:'
							/>
						</div>
						<div className='flex flex-row gap-1 justify-between items-center'>
							<ChooseColumnModification
								columns={columns}
								checked={loadingDatabase.locationPhoneColumn}
								setLoadingDatabase={handleChangeLocationPhoneColumn}
								label='The place of registration:'
							/>
						</div>
						<div className='flex flex-row gap-1 justify-between items-center'>
							<ChooseColumnModification
								columns={columns}
								checked={loadingDatabase.providerPhoneColumn}
								setLoadingDatabase={handleChangeProviderPhoneColumn}
								label='Phone Number Provider:'
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

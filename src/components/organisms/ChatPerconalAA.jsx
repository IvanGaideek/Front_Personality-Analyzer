import React from 'react'
import ChatBot from '../molecules/ChatBot'
import { BoxUploadFiles } from '../molecules/FileUploadingInChat'

export default function ChatPersonalAA() {
	return (
		<>
			<BoxUploadFiles path_upload='/ai/upload' path_delete='/ai/delete' />
			<ChatBot maxWords={3000} />
		</>
	)
}

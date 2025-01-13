import React from 'react'

const ErrorMessage = ({ message, className = 'mt-2 text-sm text-red-500' }) => {
	return <div>{message && <p className={className}>{message}</p>}</div>
}

export default ErrorMessage

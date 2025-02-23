import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { UserContext } from '../../addition/contexts/UserContext'

const ProtectedRoute = ({ children }) => {
	const [token] = useContext(UserContext)
	const location = useLocation()

	if (!token) {
		// Сохраняем путь, с которого пользователя перенаправили
		return <Navigate to='/into-system' state={{ from: location.pathname }} />
	}

	return children
}

export default ProtectedRoute

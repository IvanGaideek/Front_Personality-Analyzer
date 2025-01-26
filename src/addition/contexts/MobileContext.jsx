import React, { createContext, useContext, useState } from 'react'

// Создаём контекст
const MobileMenuContext = createContext()

// Создаём провайдер
export const MobileMenuProvider = ({ children }) => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	return (
		<MobileMenuContext.Provider value={{ mobileMenuOpen, setMobileMenuOpen }}>
			{children}
		</MobileMenuContext.Provider>
	)
}

// хук для использования контекста
export const useMobileMenu = () => {
	return useContext(MobileMenuContext)
}

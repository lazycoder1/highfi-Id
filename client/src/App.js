import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './components/Home'
import Callbacks from './components/Callbacks'
import Permissions from './components/Permissions'
import WagmiSignIn from './components/wagmiSignIn'
import WagmiContext from './contexts/wagmi/wagmiContext'
import Organization from './components/Organization'
import Analysis from './components/Analysis'

function App() {
	const { address, isConnected, connect, connectors, isLoading, pendingConnector, disconnect, error, signIn, signOut, signInLoading } =
		useContext(WagmiContext)

	const disconnectHandler = async () => {
		// disconnect();
		await signOut()
	}

	// if (!isConnected || !address)
	// 	return (
	// 		<WagmiSignIn
	// 			connectors={connectors}
	// 			isLoading={isLoading}
	// 			pendingConnector={pendingConnector}
	// 			connect={connect}
	// 			error={error}
	// 			signIn={signIn}
	// 			isConnected={isConnected}
	// 		/>
	// 	)
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/callbacks" element={<Callbacks />} />
				<Route path="/permissions" element={<Permissions />} />
				<Route path="/organization/devfolio" element={<Organization />} />
        <Route path="/analysis/devfolio" element={<Analysis />} />
			</Routes>
		</Router>
	)
}

export default App

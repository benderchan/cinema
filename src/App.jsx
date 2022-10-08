import { Layout } from './components/Layout/Layout'
import { Route, Routes } from 'react-router-dom'

import { Home } from './pages/Home/Home'
import { TrendingPage } from './pages/TrendingPage/TrendingPage'
import { MoviesPage } from './pages/MoviesPage/MoviesPage'
import { DiscoveryPage } from './pages/DiscoveryPage/DiscoveryPage'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthPage } from './pages/AuthPage/AuthPage'
import { AuthRequired } from './components/hoc/AuthRequired'
import { ProfilePage } from './pages/ProfilePage/ProfilePage'
import { GenrePage } from './pages/GenrePage/GenrePage'
import { MoviePage } from './pages/MoviePage/MoviePage'

function App() {
	return (
		<Layout>
			<Routes>
				<Route path={'/'} element={<Home />} />
				<Route path={'/trending'} element={<TrendingPage />} />
				<Route path={'/movies'} element={<MoviesPage />} />
				<Route path={'/movies/:id'} element={<MoviePage />} />
				<Route
					path={'/genre'}
					element={
						<AuthRequired>
							<DiscoveryPage />
						</AuthRequired>
					}
				/>
				<Route
					path={'genre/:genre'}
					element={
						<AuthRequired>
							<GenrePage />
						</AuthRequired>
					}
				/>
				<Route
					path={'/me'}
					element={
						<AuthRequired>
							<ProfilePage />
						</AuthRequired>
					}
				/>

				<Route path={'/auth'} element={<AuthPage />} />

				<Route
					path={'/logout'}
					element={
						<AuthRequired>
							<AuthPage />
						</AuthRequired>
					}
				/>
			</Routes>

			<ToastContainer position={'bottom-right'} />
		</Layout>
	)
}

export default App

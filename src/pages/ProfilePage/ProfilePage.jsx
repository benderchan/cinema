import { ProfileTabs } from '../../components/ProfileTabs/ProfileTabs'

import { useGetMyAccountQuery } from '../../services/account'
import { useGetRatedMoviesQuery } from '../../services/movies'

export const ProfilePage = () => {
	const sessionId = localStorage.getItem('session_id')
	const { data: getAcc } = useGetMyAccountQuery(sessionId)
	const { data: ratedMovies } = useGetRatedMoviesQuery(sessionId)
	console.log(ratedMovies)

	return (
		<div className={'my-14'}>
			{getAcc && (
				<div className={'flex items-center gap-2 my-10'}>
					<img
						className={'h-40 w-40 rounded-full'}
						src={`https://image.tmdb.org/t/p/original/${getAcc.avatar.tmdb.avatar_path}`}
						alt=''
					/>
					<div>
						<div>Name: {getAcc.name}</div>
						<div>Username: {getAcc.username}</div>
						<div>Country: {getAcc.iso_3166_1}</div>
					</div>
				</div>
			)}

			<div>
				<ProfileTabs ratedMovies={ratedMovies} />
			</div>
		</div>
	)
}

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useRateMovieMutation } from '../../services/movies'
import { Button } from '../ui/Button/Button'
import { Input } from '../ui/Input/Input'
import { useSelector } from 'react-redux'

export const Modal = ({title, overview, backdrop_path, id, rating}) => {
    let [isOpen, setIsOpen] = useState(false)

    const {isAuth} = useSelector(state => state.auth)

    console.log(isAuth)
    const [rated, setRated] = useState(rating)
    const [newRating, setNewRating] = useState(null)
    const [movieVote, setMovieVote] = useState(null)


    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const [rate] = useRateMovieMutation()

    const rateMovie = () => {
        const sessionId = localStorage.getItem('session_id')

        const vote = {
            value: movieVote
        }

        if (movieVote < 0 || movieVote > 10) {
            alert('Insert a valid vote')
            return
        }

        // pass movieId, sessionId,  vote
        if (id) {
            rate({id, sessionId, vote}).unwrap().then(console.log)
            setRated(true)
            setNewRating(vote.value)
        }
    }


    return (
        <>
            <Button
                type='button'
                onClick={openModal}
            >
                Info
            </Button>


            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as='div' className='relative z-10' onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <div className='fixed inset-0 bg-black bg-opacity-25'/>
                    </Transition.Child>

                    <div className='fixed inset-0 overflow-y-auto'>
                        <div className='flex min-h-full items-center justify-center p-4 text-center'>
                            <Transition.Child
                                as={Fragment}
                                enter='ease-out duration-300'
                                enterFrom='opacity-0 scale-95'
                                enterTo='opacity-100 scale-100'
                                leave='ease-in duration-200'
                                leaveFrom='opacity-100 scale-100'
                                leaveTo='opacity-0 scale-95'
                            >
                                <Dialog.Panel
                                    className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                                    <Dialog.Title
                                        as='h3'
                                        className='text-lg font-medium leading-6 text-gray-900'
                                    >
                                        {title}

                                    </Dialog.Title>
                                    <div className='mt-2'>
                                        <img className={'rounded-2xl'}
                                             src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
                                             alt=''/>
                                        <p className='text-sm text-gray-500'>
                                            {overview}
                                        </p>

                                        {
                                            rating ? <span>Rating: {rating}</span> :
                                                <div>
                                                    <div className={'my-2'}>
                                                        <Input hidden={rated} placeholder={'Vote from 1 to 10...'}
                                                               onChange={(e) => setMovieVote(e.target.value)}/>
                                                    </div>

                                                    <span>Rating: {newRating}</span>
                                                    <Button hidden={rated} onClick={rateMovie}
                                                            disabled={!isAuth}>Rate
                                                        movie</Button>

                                                </div>
                                        }


                                    </div>

                                    <div className='mt-4 flex'>
                                        <button
                                            type='button'
                                            className=' ml-auto inline-flex justify-center hover:scale-105 transition-all rounded-md border border-black  px-4 py-2 text-sm font-medium'
                                            onClick={closeModal}
                                        >
                                            Got it!
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

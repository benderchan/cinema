import { useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import { Modal } from '../../components/Modal/Modal'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const ProfileTabs = ({ratedMovies = {}, ratedTv}) => {
    let [categories, setCategories] = useState({
        Movies: [],
        TV: [
            {
                id: 1,
                title: 'Is tech making coffee better or worse?',
                date: 'Jan 7',
                commentCount: 29,
                shareCount: 16
            },
            {
                id: 2,
                title: 'The most innovative things happening in coffee',
                date: 'Mar 19',
                commentCount: 24,
                shareCount: 12
            }
        ]
    })


    useEffect(() => {
        if (ratedMovies.results) {
            const movieArr = ratedMovies.results.map(el => (
                {
                    key: el.id,
                    title: el.title,
                    rating: el.rating,
                    date: el.release_date,
                    modal: {...el}
                }
            ))
            setCategories({...categories, Movies: movieArr})
        }

    }, [ratedMovies])


    return (
        <div className='w-full px-2 py-16 sm:px-0'>

            <Tab.Group>
                <Tab.List className='flex space-x-1 rounded-xl bg-blue-900/20 p-1'>
                    {Object.keys(categories).map((category) => (
                        <Tab
                            key={category}
                            className={({selected}) =>
                                classNames(
                                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                                    selected
                                        ? 'bg-white shadow'
                                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                )
                            }
                        >
                            {category}
                        </Tab>
                    ))}


                </Tab.List>
                <Tab.Panels className='mt-2'>
                    {Object.values(categories).map((posts, idx) => (
                        <Tab.Panel
                            key={idx}
                            className={classNames(
                                'rounded-xl bg-white p-3'
                            )}
                        >
                            <ul>
                                {posts && posts.map((post) => (

                                    <li
                                        key={post.id}
                                        className='relative rounded-md p-3'

                                    >
                                        <h3 className='text-sm font-medium leading-5'>
                                            <span className={'text-black'}>{post.title}</span>

                                        </h3>

                                        <ul className='mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500 justify-between items-center'>
                                            <li>Released: {post.date} </li>
                                            <li>Rating: {post.rating}</li>
                                            <Modal {...post.modal}/>
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}

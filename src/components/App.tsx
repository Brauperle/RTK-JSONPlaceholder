import { Post, User } from '../types'
import {
  useGetPostsQuery,
  useGetUsersQuery
} from '../api'

const App = (): JSX.Element | null => {
  const {
    data: posts
  } = useGetPostsQuery()

  const {
    data: users
  } = useGetUsersQuery()

  if (posts === undefined || users === undefined) return null
  // console.log({ posts })
  // console.log({ users })
  return (
    <div className='flex flex-col space-y-4'>
      {posts.map((post: Post) => {
        const user = users.find((u: User) => u.id === post.userId)
        const userName = user?.name
        return (
          <div key={post.id} className='max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl'>
            <div className='p-8'>
              <div className='uppercase tracking-wide text-sm text-indigo-500 font-semibold'>
                {userName}
              </div>
              <a href='#' className='block mt-1 text-lg leading-tight font-medium text-black hover:underline'>
                {post.title}
              </a>
              <p className='mt-2 text-slate-500'>
                {post.body}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default App

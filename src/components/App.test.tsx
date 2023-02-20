import 'whatwg-fetch'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import '@testing-library/jest-dom'
import { cleanup, render, waitFor, screen, within } from '@testing-library/react'
import { afterEach } from 'vitest'
import { Provider } from 'react-redux'

import { Post, User } from '../types'

import { store } from '../store'

import App from './App'

// Mock server
const POSTS: Post[] = [{
  userId: 1,
  id: 1,
  title: 'first post title',
  body: 'first post body'
}]

const USERS: Array<Partial<User>> = [{
  id: 1,
  name: 'Jean-Claude'
}]

const SERVER = setupServer(...[
  rest.get('https://jsonplaceholder.typicode.com/posts', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(POSTS))
  }),
  rest.get('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(USERS))
  })
])

// Mock Providers
const MockProviders = ({ children }: { children: JSX.Element }): JSX.Element => (
  <Provider store={store}>{children}</Provider>
)

// Lifecycle hooks
beforeAll(() => SERVER.listen({ onUnhandledRequest: 'error' }))
afterAll(() => SERVER.close())
afterEach(() => {
  SERVER.resetHandlers()
  cleanup()
})

// Component tests
describe('App component should be rendered', () => {
  it('App component should render all posts', async () => {
    render(
      <App />,
      { wrapper: MockProviders }
    )
    await waitFor(() => expect(screen.queryByTestId('post')).toBeInTheDocument())
    expect(screen.queryAllByTestId('post').length).toEqual(1)
  })

  it('App component should render a post', async () => {
    render(
      <App />,
      { wrapper: MockProviders }
    )
    await waitFor(() => expect(screen.queryByTestId('post')).toBeInTheDocument())
    const posts = screen.queryAllByTestId('post')
    posts.forEach((p, i) => {
      expect(screen.queryAllByTestId('post')[i]).toBeInTheDocument()
      expect(within(screen.queryAllByTestId('post')[i]).queryByTestId('post_username')).toBeInTheDocument()
      expect(within(screen.queryAllByTestId('post')[i]).queryByTestId('post_title')).toBeInTheDocument()
      expect(within(screen.queryAllByTestId('post')[i]).queryByTestId('post_body')).toBeInTheDocument()
    })
  })
})

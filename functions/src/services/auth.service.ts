import * as express from 'express'
import * as cors from 'cors'
import AuthService from '../controllers/auth.controller'
const authService = new AuthService()
export const app = express()

app.use(cors())

app.post('/signup', async (request, response) => {
  try {
    const { email, password } = request.body
    const loggedIn = await authService.signUp(email, password)
    response.send(loggedIn)
  } catch (error) {
    console.error(error)
    response.status(500).send(error)
  }
})

app.post('/login', async (request, response) => {
  try {
    const { email, password } = request.body
    const loggedIn = await authService.login(email, password)
    response.send(loggedIn)
  } catch (error) {
    console.error(error)
    response.status(500).send(error)
  }
})

app.get('/nodes', async (request, response) => {
  try {
    const nodes = await authService.nodes()
    response.send(nodes)
  } catch (error) {
    console.error(error)
    response.status(500).send({ error })
  }
})

app.get('/logout', async (request, response) => {
  try {
    const nodes = await authService.logout()
    response.send(nodes)
  } catch (error) {
    console.error(error)
    response.status(500).send({ error })
  }
})

app.get('/profile', async (request, response) => {
  try {
    const nodes = await authService.profile()
    response.send(nodes)
  } catch (error) {
    console.error(error)
    response.status(500).send({ error })
  }
})

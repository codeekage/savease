import {Request, Response} from 'express';
import AuthService from '../services/auth.service'
const auth = new AuthService()
const userLogin = {};


export async function handleLoginWithBody(request : Request, response : Response)  {
  try {
    const { email, password } = request.body
    const loggedIn = await auth.login(email, password)
    Object.assign(userLogin, { email, password })
    response.send(loggedIn)
  } catch (error) {
    console.error(error)
    response.status(500).send(error)
  }
}

export async function handleLoginWithQuery(request : Request, response : Response)  {
  try {
    const { email, password } = request.query
    const loggedIn = await auth.login(email, password)
    response.send(loggedIn)
  } catch (error) {
    console.error(error)
    response.status(500).send(error)
  }
}

export async function handleLogout(request : Request, response : Response)  {
  try {
    const nodes = await auth.logout()
    response.send(nodes)
  } catch (error) {
    console.error(error)
    response.status(500).send({ error })
  }
}

export async function handleSignUp(request : Request, response : Response)  {
  try {
    const { email, password } = request.body
    const loggedIn = await auth.signUp(email, password)
    response.send(loggedIn)
  } catch (error) {
    console.error(error)
    response.status(500).send(error)
  }
}

export async function currentUser(request : Request, response : Response)  {
  try {
    const nodes = await auth.currentUser()
    response.send({ data: nodes, login: userLogin })
  } catch (error) {
    console.error(error)
    response.status(500).send({ error })
  }
}

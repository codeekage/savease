# savease


## How to use

Have a reliable terminal for windows installed everything will be done with terminals

- Install [node.js](https://nodejs.org)
- Install `npm install -g firebase-tools --save`
- `cd functions` 
- Run `npm run serve` from `functions` folder
- Run  `test.html` with a server `environment`(i.e. you can install `live server` in `VS Code`)

Some buttons are created in `test.html`.

## Avaliable Routes

**Base URL: https://us-central1-save-ease.cloudfunctions.net**


#### Auth `/auth`

- POST `/login`_logins and start session_
- POST `/signup` _create a new user with email and password_
- GET `/profile` _fetch currently logged in user info_
- GET `/logout` _logsout and destroy session_
- PUT  `/update` _update currently logged in user info_

#### Units `/units`

- POST `/add` _add new unit set_
- GET `/fetch` _fetch avaliable unit sets_
- GET `/fetch/:id` _fetch with unit set id_
- POST `/login` _avaliable but do not use_
- GET `/logout` _avaliable but do not use_

#### Batches `/batch`

- POST `/login` _avaliable but do not use_
- GET `/logout` _avaliable but do not use_
- POST `/add` _add new batch set_
- GET `/fetch` _get batch set from the currently logged in user_
- GET `/fetch/:id` _force get batch set with the id provided_ 

#### Wallet `/wallet`

- POST `/login` _avaliable but do not use_
- GET `/logout` _avaliable but do not use_
- GET `/history` _get currently logged in user wallet history_
- GET `/balance` _get wallet of the currently logged in user_


### Usage

`https://us-central1-save-ease.cloudfunctions.net/auth/profile`

The above URL fetches details of the currently logged in user.
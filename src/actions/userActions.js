export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'


//Three states for login
function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

//State changes for logout
function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

export function loginUser(creds) {
  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
  }

  return dispatch => {

    dispatch(requestLogin(creds))

    var fetchString = 'http://localhost:4567/userLogin/' + creds.username + '?password=' + creds.password;
    return fetch(fetchString, config)
      .then(response =>
        response.json().then(user => ({ user, response }))
            ).then(({ user, response }) =>  {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(user.message))
          return Promise.reject(user)
        } else if(user.code === "401") {
            dispatch(loginError(user.message))
            return Promise.reject(user)
        } else {
            // If login was successful, set the token in session storage
            sessionStorage.setItem('access_token', user.jwt)
            sessionStorage.setItem('access_username', creds.username)

            dispatch(receiveLogin(user))
        }
      }).catch(err => dispatch(loginError(err)))
  }
}

export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    sessionStorage.removeItem('access_token')
    sessionStorage.removeItem('access_username')
    dispatch(receiveLogout())
  }
}

import axios from 'axios'

// ** Get Profile
export const getProfile = user => {
  return async dispatch => {
    dispatch({
      type: 'GET_PROFILE',
      selected: user
    })
  }
}

// ** Get Data Profile
export const getDataProfile = id => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users/profile`).then(response => {

      const {data} = response

      if (data.status) {
        dispatch(getProfile(data.data))
      }
    })
  }
}

// ** Add new user
export const addProfile = user => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_PROFILE'
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/app/resource/action`, user)
      .then(response => {

        const {data} = response

        if (data.status) {

          dispatch(getProfile(data.data))

          dispatch({
            type: 'SUCCESS_PROFILE'
          })
        } else {
          dispatch({
            type: 'ERROR_PROFILE',
            error: data.message
          })
        }

        setTimeout(() => {
          dispatch({
            type: 'RESET_PROFILE'
          })
        }, 500)
      })
      .catch(err => {
        const {response} = err
        
        if (response?.status === 422) {
          const {data} = response
          dispatch({
            type: 'ERROR_PROFILE',
            error: data.message.message
          })
        } else if (response?.status === 400) {
          const {data} = response
          dispatch({
            type: 'ERROR_PROFILE',
            error: data.message
          })
        } else if (response?.status === 404) {
          const {data} = response
          dispatch({
            type: 'ERROR_PROFILE',
            error: data.message
          })
        }

        setTimeout(() => {
          dispatch({
            type: 'RESET_PROFILE'
          })
        }, 500)
      })
  }
}


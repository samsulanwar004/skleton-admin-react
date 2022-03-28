import axios from 'axios'

// ** Get all Data
export const getAllData = () => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/app/resource/all-data`).then(response => {
      const {data} = response

      if (data.status) {
        dispatch({
          type: 'GET_ALL_DATA',
          data: data.data
        })
      }
    })
  }
}

// ** Get data on page or row change
export const getData = params => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/app/resource/data`, {params})
      .then(response => {
        const {data} = response
        
        if (data.status) {

          dispatch({
            type: 'GET_DATA',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_DATA',
            data: [],
            totalPages: 0,
            params
          })
        }
      })
  }
}

// ** Get User
export const getUser = user => {
  return async dispatch => {
    dispatch({
      type: 'GET_USER',
      selected: user
    })
  }
}

// ** Add new user
export const addUser = user => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_USER'
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/app/resource/action`, user)
      .then(response => {

        const {data} = response

        if (data.status) {
          dispatch({
            type: 'ADD_USER',
            user
          })
          dispatch({
            type: 'SUCCESS_USER'
          })
        } else {
          dispatch({
            type: 'ERROR_USER',
            error: data.message
          })
        }

        setTimeout(() => {
          dispatch({
            type: 'RESET_USER'
          })
        }, 500)
      })
      .catch(err => {
        dispatch({
          type: 'ERROR_USER',
          error: err.message
        })
      })
  }
}

// ** Delete user
export const deleteUser = id => {
  return (dispatch, getState) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/app/resource/delete`, { resource_id: id })
      .then(response => {
        dispatch({
          type: 'DELETE_USER'
        })
      })
      .then(() => {
        dispatch(getData(getState().users.params))
      })
      .catch(err => console.log(err))
  }
}

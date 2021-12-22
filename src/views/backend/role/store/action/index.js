import axios from 'axios'

// ** Get all Data
export const getAllDataRole = () => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/app/role/all-data`).then(response => {
      
      const {data} = response

      if (data.status) {
        dispatch({
          type: 'GET_ALL_DATA_ROLE',
          data: data.data
        })
      }
    })
  }
}

// ** Get data on page or row change
export const getDataRole = params => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/app/role/data`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_ROLE',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_DATA_ROLE',
            data: [],
            totalPages: 0,
            params
          })
        }
      })
  }
}

// ** Get Role
export const getRole = role => {
  return async dispatch => {
    dispatch({
      type: 'GET_ROLE',
      selectedRole: role
    })
  }
}

// ** Add new role
export const addRole = role => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_ROLE'
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/app/role/action`, role)
      .then(response => {
        
        const {data} = response

        if (data.status) {
          dispatch({
            type: 'ADD_ROLE',
            role
          })
          dispatch({
            type: 'SUCCESS_ROLE'
          })
        } else {
          dispatch({
            type: 'ERROR_ROLE',
            error: data.message
          })
        }

        setTimeout(() => {
          dispatch({
            type: 'RESET_ROLE'
          })
        }, 500)
      })
      .catch(err => {
        dispatch({
          type: 'ERROR_ROLE',
          error: err.message
        })
      })
  }
}

// ** Delete role
export const deleteRole = id => {
  return (dispatch, getState) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/app/role/delete`, { role_id: String(id) })
      .then(response => {
        dispatch({
          type: 'DELETE_ROLE'
        })
      })
      .then(() => {
        dispatch(getDataRole(getState().roles.params))
      })
      .catch(err => console.log(err))
  }
}

import axios from 'axios'

// ** Get all Data
export const getAllDataMenu = () => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/app/menu/all-data`).then(response => {

      const {data} = response

      if (data.status) {
        dispatch({
          type: 'GET_ALL_DATA_MENU',
          data: data.data
        })
      }
    })
  }
}

// ** Get data on page or row change
export const getDataMenu = params => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/app/menu/data`, {params})
      .then(response => {
        const {data} = response

        if (data.status) {

          dispatch({
            type: 'GET_DATA_MENU',
            data: data.data.values,
            totalPages: data.data.total,
            params
          })
        }
      }).catch(err => {
        const {response} = err
        if (response.status === 404) {
          dispatch({
            type: 'GET_DATA_MENU',
            data: [],
            totalPages: 0,
            params
          })
        }
      })
  }
}

// ** Get
export const getMenu = menu => {
  return async dispatch => {
    dispatch({
      type: 'GET_MENU',
      selected: menu
    })
  }
}

// ** Add new menu
export const addMenu = menu => {
  return (dispatch, getState) => {

    dispatch({
      type: 'REQUEST_MENU'
    })

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/app/menu/action`, menu)
      .then(response => {

        const {data} = response

        if (data.status) {
          dispatch({
            type: 'ADD_MENU',
            menu
          })
          dispatch({
            type: 'SUCCESS_MENU'
          })
        } else {
          dispatch({
            type: 'ERROR_MENU',
            error: data.message
          })
        }

        setTimeout(() => {
          dispatch({
            type: 'RESET_MENU'
          })
        }, 500)
        
      })
      .catch(err => console.log(err))
  }
}

// ** Delete menu
export const deleteMenu = id => {
  return (dispatch, getState) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/app/menu/delete`, { menu_id: id })
      .then(response => {
        dispatch({
          type: 'DELETE_MENU'
        })
      })
      .then(() => {
        dispatch(getDataMenu(getState().menus.params))
      })
      .catch(err => console.log(err))
  }
}

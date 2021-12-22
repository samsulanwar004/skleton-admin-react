import axios from 'axios'

// ** Get all Data
export const getAllDataNavigation = () => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/app/menu/all-data`).then(response => {

      const {data} = response

      if (data.status) {
        dispatch({
          type: 'GET_ALL_DATA_NAVIGATION',
          data: data.data
        })
      }
    })
  }
}

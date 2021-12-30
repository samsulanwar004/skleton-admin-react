// ** Initial State
const initialState = {
  allData: [],
  data: [],
  total: 1,
  params: null,
  selected: null,
  loading: false,
  error: null,
  success: false
}

const users = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA':
      return { ...state, allData: action.data }
    case 'GET_DATA':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_USER':
      return { ...state, selected: action.selected }
    case 'ADD_USER':
      return { ...state }
    case 'DELETE_USER':
      return { ...state }
    case 'RESET_USER':
      return {
        ...state,
        loading: false,
        error: null,
        success: false
      }
    case 'REQUEST_USER':
      return {
        ...state,
        loading: true
      }
    case 'SUCCESS_USER':
      return {
        ...state,
        loading: false,
        success: true
      }
    case 'ERROR_USER':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return { ...state }
  }
}
export default users

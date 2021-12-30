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

const roles = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA_ROLE':
      return { ...state, allData: action.data }
    case 'GET_DATA_ROLE':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_ROLE':
      return { ...state, selected: action.selected }
    case 'ADD_ROLE':
      return { ...state }
    case 'DELETE_ROLE':
      return { ...state }
    case 'RESET_ROLE':
      return {
        ...state,
        loading: false,
        error: null,
        success: false
      }
    case 'REQUEST_ROLE':
      return {
        ...state,
        loading: true
      }
    case 'SUCCESS_ROLE':
      return {
        ...state,
        loading: false,
        success: true
      }
    case 'ERROR_ROLE':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return { ...state }
  }
}
export default roles

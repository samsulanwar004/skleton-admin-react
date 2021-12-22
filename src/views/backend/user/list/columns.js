// ** React Imports
import { Link } from 'react-router-dom'

// ** Store & Actions
import { getUser, deleteUser } from '../store/action'
import { store } from '@store/storeConfig/store'

// ** Third Party Components
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Media } from 'reactstrap'
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { FormattedMessage } from 'react-intl'

const MySwal = withReactContent(Swal)
import logoDefault from '@src/assets/images/avatars/avatar-blank.png'

const handleDelete = (row) => {
  return MySwal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-danger ml-1'
    },
    buttonsStyling: false
  }).then(function (result) {
    if (result.value) {
      store.dispatch(deleteUser(row.resource_id))
    }
  })
}

const statusObj = {
  A: {
    color: 'light-success',
    value: 'Active'
  },
  D: {
    color: 'light-secondary',
    value: 'Deactive'
  },
  NV: {
    color: 'light-warning',
    value: 'Need Verification'
  },
  S: {
    color: 'light-danger',
    value: 'Suspend'
  }
  
}

export const columns = (number) => {
  return [
    {
      name: '#',
      cell: (row, index) => (index + 1) + number,
      grow: 0
    },
    {
      name: 'Profil',
      minWidth: '50px',
      selector: 'image_foto',
      sortable: false,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          <Media object className='rounded mr-50' src={`${process.env.REACT_APP_BASE_URL}${row.image_foto}`} onError={(e) => (e.target.src = logoDefault)} height='50' width='50' />
        </div>
      )
    },
    {
      name: <FormattedMessage id='Name'/>,
      minWidth: '200px',
      selector: 'emp_name',
      sortable: false,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          {row.full_name}
        </div>
      )
    },
    {
      name: 'Username',
      minWidth: '200px',
      selector: 'username',
      sortable: false,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          {row.username}
        </div>
      )
    },
    {
      name: 'Email',
      minWidth: '300px',
      selector: 'email',
      sortable: false,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          {row.email}
        </div>
      )
    },
    {
      name: 'Telepon',
      minWidth: '200px',
      selector: 'telepon',
      sortable: false,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          {row.telepon}
        </div>
      )
    },
    {
      name: 'Total Login',
      minWidth: '200px',
      selector: 'total_login',
      sortable: false,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          {row.total_login}
        </div>
      )
    },
    {
      name: 'Default Language',
      minWidth: '200px',
      selector: 'default_language',
      sortable: false,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          {row.default_language}
        </div>
      )
    },
    {
      name: 'Status',
      minWidth: '100px',
      selector: 'status',
      sortable: true,
      cell: row => (
        <Badge className='text-capitalize' color={statusObj[row.status]['color']} pill>
          {statusObj[row.status]['value']}
        </Badge>
      )
    },
    {
      name: 'Actions',
      minWidth: '100px',
      cell: row => (
        <UncontrolledDropdown>
          <DropdownToggle tag='div' className='btn btn-sm'>
            <MoreVertical size={14} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem
              tag={Link}
              to={`/user/save/${row.resource_id}`}
              className='w-100'
              onClick={() => store.dispatch(getUser(row))}
            >
              <Archive size={14} className='mr-50' />
              <span className='align-middle'>Edit</span>
            </DropdownItem>
            <DropdownItem className='w-100' onClick={() => handleDelete(row)}>
              <Trash2 size={14} className='mr-50' />
              <span className='align-middle'><FormattedMessage id='Delete'/></span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      )
    }
  ]
}

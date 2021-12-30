// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'

// ** Store & Actions
import { addRoleMenu } from '../store/action'
import { useSelector, useDispatch } from 'react-redux'
import { getAllDataRole } from '@src/views/backend/role/store/action'
import { getAllDataMenu } from '@src/views/backend/menu/store/action'

// ** Third Party Components
import { User, Info, Share2, MapPin, Check, X } from 'react-feather'
import { Card, CardBody, Row, Col, Alert, Button, Label, FormGroup, Input, CustomInput, Form } from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import classnames from 'classnames'
import Cleave from 'cleave.js/react'
import Flatpickr from 'react-flatpickr'
import 'cleave.js/dist/addons/cleave-phone.us'
import Select from 'react-select'
import { FormattedMessage } from 'react-intl'
import { toast, Slide } from 'react-toastify'
import Avatar from '@components/avatar'

const ToastContent = ({ text }) => {
  if (text) {
    return (
      <Fragment>
        <div className='toastify-header'>
          <div className='title-wrapper'>
            <Avatar size='sm' color='danger' icon={<X size={12} />} />
            <h6 className='toast-title font-weight-bold'>Error</h6>
          </div>
          <div className='toastify-body'>
            <span>{text}</span>
          </div>
        </div>
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <div className='toastify-header'>
          <div className='title-wrapper'>
            <Avatar size='sm' color='success' icon={<Check size={12} />} />
            <h6 className='toast-title font-weight-bold'>Success</h6>
          </div>
        </div>
      </Fragment>
    )
  }
}

// ** Styles
import '@styles/react/apps/app-users.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'

// ** Utils
import { isObjEmpty, selectThemeColors } from '@utils'

const RoleMenuSave = () => {
  // ** States & Vars
  const store = useSelector(state => state.rolemenus),
    dispatch = useDispatch(),
    { id } = useParams(),
    roles = useSelector(state => state.roles),
    menus = useSelector(state => state.menus)

  // ** React hook form vars
  const { register, errors, handleSubmit, control, setValue, trigger } = useForm()

  // ** State
  const [data, setData] = useState(null)
  const [selected, setSelected] = useState(null)
  const [selectedMenu, setSelectedMenu] = useState([])
  const [selectedRole, setSelectedRole] = useState({value: '', label: 'Select...'})

  // ** redirect
  const history = useHistory()

  // ** Function to get employee on mount
  useEffect(() => {
    if (store.selected !== null && store.selected !== undefined) {
      const selectMenu = {
        value: store.selected.menu_id,
        label: store.selected.menu_name
      }

      const selectRole = {
        value: store.selected.role_id,
        label: store.selected.role_name
      }

      setSelectedMenu(selectMenu)
      setSelectedRole(selectRole)
    } 
    dispatch(getAllDataRole())
    dispatch(getAllDataMenu())
  }, [dispatch])

  useEffect(() => {

    if (store.success) {
      toast.success(
        <ToastContent text={null} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
      history.push("/role_menu/list")
    } else if (store.error) {
      toast.error(
        <ToastContent text={store.error} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
    }
  }, [store.loading])

  const onSubmit = data => {

    if (isObjEmpty(errors)) {

      setData(data)
      
      if (id) {
        data.role_menu_id = id
        data.menu_id = String(data.menu_id.value)
        data.role_id = String(data.role_id.value)

        dispatch(addRoleMenu(data))
      } else {
        for (let i = 0; i < data.menu_id.length; i++) {

          dispatch(addRoleMenu({
            role_id: String(data.role_id.value),
            menu_id: String(data.menu_id[i].value),
            status: data.status
          }))
        }
      }
    }
  }

  return store.selected !== null && store.selected !== undefined ? (
    <Row className='app-user-edit'>
      <Col sm='12'>
        <Card>
          <CardBody className='pt-2'>
            <Form
              onSubmit={handleSubmit(onSubmit)}
            >
              <Row className='mt-1'>
                <Col sm='12'>
                  <h4 className='mb-1'>
                    <User size={20} className='mr-50' />
                    <span className='align-middle'>Edit Role Menu</span>
                  </h4>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='role_id'>Role</Label>
                    <Controller
                      name='role_id'
                      id='role_id'
                      control={control}
                      invalid={data !== null && (data.role_id === undefined || data.role_id === null)}
                      defaultValue={{value: store.selected?.role_id, label: store.selected?.role_name}}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={roles.allData.map(r => {
                              return {
                                value: r.role_id,
                                label: r.role_name
                              }
                            })}
                            value={selectedRole}
                            onChange={data => {
                              onChange(data)
                              setSelectedRole(data)
                            }}
                          />
                        )
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='menu_id'>Menu</Label>
                    <Controller
                      name='menu_id'
                      id='menu_id'
                      control={control}
                      invalid={data !== null && (data.menu_id === undefined || data.menu_id === null)}
                      defaultValue={{value: store.selected?.menu_id, label: store.selected?.menu_name}}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={menus.allData.map(r => {
                              return {
                                value: r.menu_id,
                                label: r.menu_name
                              }
                            })}
                            value={selectedMenu}
                            onChange={data => {
                              onChange(data)
                              setSelectedMenu(data)
                            }}
                          />
                        )
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='status'>Status</Label>
                    <Controller
                      as={Input}
                      type='select'
                      name='status'
                      id='status'
                      control={control}
                      defaultValue={store.selected.status}
                      invalid={data !== null && (data.status === undefined || data.status === null)}
                    >
                      <option value='A'>Active</option>
                      <option value='D'>Deactive</option>
                    </Controller>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className='d-flex flex-sm-row flex-column mt-2'>
                  <Button type='submit' color='primary' className='mb-1 mb-sm-0 mr-0 mr-sm-1'>
                    <FormattedMessage id='Save' />
                  </Button>
                  <Link to='/role_menu/list'>
                    <Button color='secondary' outline>
                      <FormattedMessage id='Back' />
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  ) : (
    <Row className='app-user-edit'>
      <Col sm='12'>
        <Card>
          <CardBody className='pt-2'>
            <Form
              onSubmit={handleSubmit(onSubmit)}
            >
              <Row className='mt-1'>
                <Col sm='12'>
                  <h4 className='mb-1'>
                    <User size={20} className='mr-50' />
                    <span className='align-middle'><FormattedMessage id='Add'/> Role Menu</span>
                  </h4>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='role_id'>Role</Label>
                    <Controller
                      name='role_id'
                      id='role_id'
                      control={control}
                      invalid={data !== null && (data.role_id === undefined || data.role_id === null)}
                      defaultValue={selectedRole}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={roles.allData.map(r => {
                              return {
                                value: r.role_id,
                                label: r.role_name
                              }
                            })}
                            value={selectedRole}
                            onChange={data => {
                              onChange(data)
                              setSelectedRole(data)
                            }}
                          />
                        )
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='menu_id'>Menu</Label>
                    <Controller
                      name='menu_id'
                      id='menu_id'
                      control={control}
                      invalid={data !== null && (data.menu_id === undefined || data.menu_id === null)}
                      defaultValue={selectedMenu}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isMulti
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={menus.allData.map(r => {
                              return {
                                value: r.menu_id,
                                label: r.menu_name
                              }
                            })}
                            value={selectedMenu}
                            onChange={data => {
                              onChange(data)
                              setSelectedMenu(data)
                            }}
                          />
                        )
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='status'>Status</Label>
                    <Controller
                      as={Input}
                      type='select'
                      name='status'
                      id='status'
                      control={control}
                      defaultValue={'A'}
                      invalid={data !== null && (data.status === undefined || data.status === null)}
                    >
                      <option value='A'>Active</option>
                      <option value='D'>Deactive</option>
                    </Controller>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className='d-flex flex-sm-row flex-column mt-2'>
                  <Button type='submit' color='primary' className='mb-1 mb-sm-0 mr-0 mr-sm-1'>
                    <FormattedMessage id='Save' />
                  </Button>
                  <Link to='/role_menu/list'>
                    <Button color='secondary' outline>
                      <FormattedMessage id='Back' />
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}
export default RoleMenuSave

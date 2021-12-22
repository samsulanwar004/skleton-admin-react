// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import Select, { components } from 'react-select'
import * as Icons from 'react-feather'

// ** Store & Actions
import { addMenu, getAllDataMenu } from '../store/action'
import { useSelector, useDispatch } from 'react-redux'

// ** Third Party Components
import { User, Info, Share2, MapPin, X, Check } from 'react-feather'
import { Card, CardBody, Row, Col, Alert, Button, Label, FormGroup, Input, CustomInput, Form } from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import classnames from 'classnames'
import Cleave from 'cleave.js/react'
import Flatpickr from 'react-flatpickr'
import 'cleave.js/dist/addons/cleave-phone.us'
import { FormattedMessage, useIntl } from 'react-intl'
import { toast, Slide } from 'react-toastify'
import Avatar from '@components/avatar'

// ** Styles
import '@styles/react/apps/app-users.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'

// ** Utils
import { isObjEmpty, selectThemeColors } from '@utils'

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

const OptionComponent = ({ data, ...props }) => {
  const Icon = Icons[data.icon]

  return (
    <components.Option {...props}>
      <Icon className='mr-50' size={14} />
      {data.label}
    </components.Option>
  )
}

const MenuSave = () => {
  // ** States & Vars
  const store = useSelector(state => state.menus),
    dispatch = useDispatch(),
    { id } = useParams(),
    intl = useIntl()

  // ** React hook form vars
  const { register, errors, handleSubmit, control, setValue, trigger } = useForm({
    defaultValues: {emp_gender: 'M'}
  })

  // ** State
  const [data, setData] = useState(null)
  const [optionIcons, setOptionIcons] = useState([])
  const [selectedIcon, setSelectedIcon] = useState({label: 'Select Icon', value: ''})
  const [selectedParent, setSelectedParent] = useState({label: 'Select Parent Menu', value: ''})

  // ** redirect
  const history = useHistory()

  // ** Function to get employee on mount
  useEffect(() => {
    if (store.success) {
      toast.success(
        <ToastContent text={null} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
      history.push("/menu/list")
    } else if (store.error) {
      toast.error(
        <ToastContent text={store.error} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
    }
  }, [store.loading])

  useEffect(() => {

    const icons = []
    for (const icon in Icons) {
      icons.push({
        value: icon,
        label: icon,
        icon
      })
    }

    setOptionIcons(icons)
  }, [])

  useEffect(() => {
    if (store.selectedMenu !== null && store.selectedMenu !== undefined) {
      setSelectedIcon({
        label: store.selectedMenu.menu_icon,
        value: store.selectedMenu.menu_icon
      })
    }

    dispatch(getAllDataMenu())
  }, [dispatch])

  const onSubmit = data => {

    if (isObjEmpty(errors)) {

      setData(data)
      
      if (id) {
        data.menu_id = id
      }

      data.menu_icon = selectedIcon.value
      data.module_name = data.module_name
      data.type_menu = null
      data.seq_number = data.seq_number
      data.parent_id = selectedParent.value
      data.status = data.status

      dispatch(addMenu(data))
    }
  }

  return store.selectedMenu !== null && store.selectedMenu !== undefined ? (
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
                    <span className='align-middle'>Edit Menu</span>
                  </h4>
                </Col>
                <Col sm='12' md='6'>
                  <FormGroup>
                    <Label for='parent_id'>Parent Menu</Label>
                    <Controller
                      name='parent_id'
                      id='parent_id'
                      control={control}
                      invalid={data !== null && (data.parent_id === undefined || data.parent_id === null)}
                      defaultValue={selectedParent}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={store.allData.map(r => {
                              return {
                                value: r.menu_id,
                                label: r.menu_name
                              }
                            })}
                            value={selectedParent}
                            onChange={data => {
                              onChange(data)
                              setSelectedParent(data)
                            }}
                          />
                        )
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='6'>
                  <FormGroup>
                    <Label for='menu_name'><FormattedMessage id='Name'/></Label>
                    <Input
                      id='menu_name'
                      name='menu_name'
                      placeholder={intl.formatMessage({id: 'Name'})}
                      defaultValue={store.selectedMenu.menu_name}
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.menu_name
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='6'>
                  <FormGroup>
                    <Label for='module_name'>Module Name</Label>
                    <Input
                      id='module_name'
                      name='module_name'
                      placeholder={'Module name, put # only if yo want to group menu'}
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.module_name
                      })}
                      defaultValue={store.selectedMenu.module_name}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='6'>
                  <FormGroup>
                    <Label for='seq_number'>Seq Number</Label>
                    <Input
                      id='seq_number'
                      name='seq_number'
                      type='number'
                      placeholder={'Seq Number'}
                      innerRef={register({ required: false })}
                      defaultValue={store.selectedMenu.seq_number}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='6'>
                  <FormGroup>
                    <Label for='menu_icon'>Menu Icon</Label>
                    <Controller
                      name='menu_icon'
                      id='menu_icon'
                      control={control}
                      invalid={data !== null && (data.menu_icon === undefined || data.menu_icon === null)}
                      defaultValue={selectedIcon}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={optionIcons}
                            components={{
                              Option: OptionComponent
                            }}
                            value={selectedIcon}
                            onChange={data => {
                              onChange(data)
                              setSelectedIcon(data)
                            }}
                          />
                        )
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='6'>
                  <FormGroup>
                    <Label for='status'>Status</Label>
                    <Controller
                      as={Input}
                      type='select'
                      name='status'
                      id='status'
                      control={control}
                      defaultValue={store.selectedMenu.status}
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
                    <FormattedMessage id='Save'/>
                  </Button>
                  <Link to='/menu/list'>
                    <Button color='secondary' outline>
                      <FormattedMessage id='Back'/>
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
                    <span className='align-middle'><FormattedMessage id='Add'/> Menu</span>
                  </h4>
                </Col>
                <Col sm='12' md='6'>
                  <FormGroup>
                    <Label for='parent_id'>Parent Menu</Label>
                    <Controller
                      name='parent_id'
                      id='parent_id'
                      control={control}
                      invalid={data !== null && (data.parent_id === undefined || data.parent_id === null)}
                      defaultValue={selectedParent}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={store.allData.map(r => {
                              return {
                                value: r.menu_id,
                                label: r.menu_name
                              }
                            })}
                            value={selectedParent}
                            onChange={data => {
                              onChange(data)
                              setSelectedParent(data)
                            }}
                          />
                        )
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='6'>
                  <FormGroup>
                    <Label for='menu_name'>Menu Name</Label>
                    <Input
                      id='menu_name'
                      name='menu_name'
                      placeholder={'Menu name'}
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.menu_name
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='6'>
                  <FormGroup>
                    <Label for='module_name'>Module Name</Label>
                    <Input
                      id='module_name'
                      name='module_name'
                      placeholder={'Module name, put # only if yo want to group menu'}
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.module_name
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='6'>
                  <FormGroup>
                    <Label for='seq_number'>Seq Number</Label>
                    <Input
                      id='seq_number'
                      name='seq_number'
                      type='number'
                      placeholder={'Seq Number'}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='6'>
                  <FormGroup>
                    <Label for='menu_icon'>Menu Icon</Label>
                    <Controller
                      name='menu_icon'
                      id='menu_icon'
                      control={control}
                      invalid={data !== null && (data.menu_icon === undefined || data.menu_icon === null)}
                      defaultValue={selectedIcon}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={optionIcons}
                            components={{
                              Option: OptionComponent
                            }}
                            value={selectedIcon}
                            onChange={data => {
                              onChange(data)
                              setSelectedIcon(data)
                            }}
                          />
                        )
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col sm='12' md='6'>
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
                    <FormattedMessage id='Save'/>
                  </Button>
                  <Link to='/menu/list'>
                    <Button color='secondary' outline>
                      <FormattedMessage id='Back'/>
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
export default MenuSave

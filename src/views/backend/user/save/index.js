// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'

// ** Store & Actions
import { addUser } from '../store/action'
import { useSelector, useDispatch } from 'react-redux'
import { getAllDataRole } from '@src/views/backend/role/store/action'

// ** Third Party Components
import { User, Info, Share2, MapPin, Check, X } from 'react-feather'
import { Card, CardBody, Row, Col, Alert, Button, Label, FormGroup, Input, CustomInput, Form, Media } from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import classnames from 'classnames'
import Cleave from 'cleave.js/react'
import Flatpickr from 'react-flatpickr'
import 'cleave.js/dist/addons/cleave-phone.us'
import { FormattedMessage, useIntl } from 'react-intl'
import { toast, Slide } from 'react-toastify'
import Avatar from '@components/avatar'
import Select from 'react-select'
import logoDefault from '@src/assets/images/avatars/avatar-blank.png'

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

const UserSave = () => {
  // ** States & Vars
  const store = useSelector(state => state.users),
    dispatch = useDispatch(),
    { id } = useParams(),
    roles = useSelector(state => state.roles),
    satkers = useSelector(state => state.satkers),
    universitys = useSelector(state => state.universitys),
    intl = useIntl()

  // ** React hook form vars
  const { register, errors, handleSubmit, control, setValue, trigger } = useForm({
    defaultValues: { gender: 'gender-female', dob: null }
  })

  // ** State
  const [data, setData] = useState(null)
  const [selectedRole, setSelectedRole] = useState({value: '', label: 'Select...'})
  const [selectedUniversity, setSelectedUniversity] = useState({value: '', label: 'Select...'})
  const [selectedSatker, setSelectedSatker] = useState({value: '', label: 'Select...'})
   const [logo, setLogo] = useState({file: null, link: null})

  // ** redirect
  const history = useHistory()

  // ** Function to get user on mount

  useEffect(() => {

    if (store.selected !== null && store.selected !== undefined) {

      const linkLogo = `${process.env.REACT_APP_BASE_URL}${store.selected.image_foto}`
      setLogo({...logo, link: linkLogo})

      setSelectedRole(store.selected.role_id)
    }

    dispatch(getAllDataRole())
  }, [dispatch])

  useEffect(() => {

    if (store.success) {
      toast.success(
        <ToastContent text={null} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
      history.push("/user/list")
    } else if (store.error) {
      toast.error(
        <ToastContent text={store.error} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
    }
  }, [store.loading])

  const onChangeLogo = e => {

    const reader = new FileReader(),
      files = e.target.files

    if (files.length <= 0) return

    reader.onload = function () {
      const blobURL = URL.createObjectURL(files[0])
      setLogo({file: files[0], link: blobURL})
    }
    reader.readAsDataURL(files[0])
  }

  const onSubmit = data => {

    if (isObjEmpty(errors)) {

      setData(data)

      const datas = new FormData()
      
      if (id) {
        datas.append('resource_id', id)

        if (data.password !== '') {
          datas.append('password', data.password)
        }
      } else {
        datas.append('password', data.password)
      }

      datas.append('role_id', JSON.stringify(selectedRole))
      datas.append('id_universitas', JSON.stringify(selectedUniversity))
      datas.append('id_satker', JSON.stringify(selectedSatker))
      datas.append('username', data.username)
      datas.append('first_name', data.first_name)
      datas.append('last_name', data.last_name)
      datas.append('email', data.email)
      datas.append('type', data.type)
      datas.append('default_language', data.default_language)
      datas.append('status', data.status)
      datas.append('telepon', data.telepon)
      datas.append('image_foto', logo.file)

      dispatch(addUser(datas))
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
                    <span className='align-middle'>Edit User</span>
                  </h4>
                </Col>
                <Col sm='12'>
                  <Media>
                    <Media className='mr-25' left>
                      <Media object className='rounded mr-50' src={logo.link ? logo.link : logoDefault} alt='Profile' onError={() => setLogo({...logo, link: logoDefault})} height='100' width='100' />
                    </Media>
                    <Media className='mt-75 ml-1' body>
                      <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary'>
                        Upload
                        <Input type='file' onChange={onChangeLogo} hidden accept='image/*' />
                      </Button.Ripple>
                      <Button.Ripple style={{marginBottom: '4px'}} color='secondary' size='sm' outline onClick={() => setLogo({file: null, link: null})}>
                        Reset
                      </Button.Ripple>
                      <p>Allowed JPG or PNG. Max size of 1MB</p>
                    </Media>
                  </Media>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='first_name'>Nama Depan</Label>
                    <Input
                      id='first_name'
                      name='first_name'
                      defaultValue={store.selected.first_name}
                      placeholder='Nama Depan'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.first_name
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='last_name'>Nama Belakang</Label>
                    <Input
                      id='last_name'
                      name='last_name'
                      defaultValue={store.selected.last_name}
                      placeholder='Nama Belakang'
                      innerRef={register({ required: false })}
                      className={classnames({
                        'is-invalid': errors.last_name
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='username'>Username</Label>
                    <Input
                      id='username'
                      name='username'
                      defaultValue={store.selected.username}
                      placeholder='Username'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.username
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='email'>Email</Label>
                    <Input
                      id='email'
                      name='email'
                      defaultValue={store.selected.email}
                      placeholder='Email'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.email
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='password'>Password</Label>
                    <Input
                      id='password'
                      name='password'
                      type='password'
                      placeholder='Password'
                      innerRef={register({ required: !id })}
                      className={classnames({
                        'is-invalid': errors.password
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='telepon'>Telepon</Label>
                    <Input
                      id='telepon'
                      name='telepon'
                      defaultValue={store.selected.telepon}
                      placeholder='Telepon'
                      innerRef={register({ required: false })}
                      className={classnames({
                        'is-invalid': errors.telepon
                      })}
                    />
                  </FormGroup>
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
                    <Label for='default_language'>Default Language</Label>
                    <Controller
                      as={Input}
                      type='select'
                      name='default_language'
                      id='default_language'
                      control={control}
                      defaultValue={store.selected.default_language ?? ''}
                      invalid={data !== null && (data.default_language === undefined || data.default_language === null)}
                    >
                      <option value={''}>Select...</option>
                      <option value='ID'>Indonesia</option>
                      <option value='EN'>English</option>
                    </Controller>
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
                      <option value='NV'>Need Verification</option>
                      <option value='S'>Suspend</option>
                    </Controller>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className='d-flex flex-sm-row flex-column mt-2'>
                  <Button type='submit' color='primary' className='mb-1 mb-sm-0 mr-0 mr-sm-1'>
                    <FormattedMessage id='Save'/>
                  </Button>
                  <Link to='/user/list'>
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
                    <span className='align-middle'><FormattedMessage id='Add'/> User</span>
                  </h4>
                </Col>
                <Col sm='12'>
                  <Media>
                    <Media className='mr-25' left>
                      <Media object className='rounded mr-50' src={logo.link ? logo.link : logoDefault} alt='Profile' onError={() => setLogo({...logo, link: logoDefault})} height='100' width='100' />
                    </Media>
                    <Media className='mt-75 ml-1' body>
                      <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary'>
                        Upload
                        <Input type='file' onChange={onChangeLogo} hidden accept='image/*' />
                      </Button.Ripple>
                      <Button.Ripple style={{marginBottom: '4px'}} color='secondary' size='sm' outline onClick={() => setLogo({file: null, link: null})}>
                        Reset
                      </Button.Ripple>
                      <p>Allowed JPG or PNG. Max size of 1MB</p>
                    </Media>
                  </Media>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='first_name'>Nama Depan</Label>
                    <Input
                      id='first_name'
                      name='first_name'
                      placeholder='Nama Depan'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.first_name
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='last_name'>Nama Belakang</Label>
                    <Input
                      id='last_name'
                      name='last_name'
                      placeholder='Nama Belakang'
                      innerRef={register({ required: false })}
                      className={classnames({
                        'is-invalid': errors.last_name
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='username'>Username</Label>
                    <Input
                      id='username'
                      name='username'
                      placeholder='Username'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.username
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='email'>Email</Label>
                    <Input
                      id='email'
                      name='email'
                      placeholder='Email'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.email
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='password'>Password</Label>
                    <Input
                      id='password'
                      name='password'
                      type='password'
                      placeholder='Password'
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.password
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='telepon'>Telepon</Label>
                    <Input
                      id='telepon'
                      name='telepon'
                      placeholder='Telepon'
                      innerRef={register({ required: false })}
                      className={classnames({
                        'is-invalid': errors.telepon
                      })}
                    />
                  </FormGroup>
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
                    <Label for='default_language'>Default Language</Label>
                    <Controller
                      as={Input}
                      type='select'
                      name='default_language'
                      id='default_language'
                      control={control}
                      defaultValue={''}
                      invalid={data !== null && (data.default_language === undefined || data.default_language === null)}
                    >
                      <option value={''}>Select...</option>
                      <option value='ID'>Indonesia</option>
                      <option value='EN'>English</option>
                    </Controller>
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
                      <option value='NV'>Need Verification</option>
                      <option value='S'>Suspend</option>
                    </Controller>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className='d-flex flex-sm-row flex-column mt-2'>
                  <Button type='submit' color='primary' className='mb-1 mb-sm-0 mr-0 mr-sm-1'>
                    <FormattedMessage id='Save'/>
                  </Button>
                  <Link to='/user/list'>
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
export default UserSave

// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { addProfile } from './store/action'

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
import { isObjEmpty, selectThemeColors, isUserLoggedIn, ipks } from '@utils'

const ProfileSave = () => {
  // ** States & Vars
  const store = useSelector(state => state.profile),
    dispatch = useDispatch(),
    { id } = useParams(),
    intl = useIntl()

  // ** React hook form vars
  const { register, errors, handleSubmit, control, setValue, trigger, setError } = useForm()

  // ** State
  const [data, setData] = useState(null)
  const [logo, setLogo] = useState({file: null, link: null})
  const [file, setFile] = useState({file: null, link: null})
  const [userData, setUserData] = useState(null)
  const [selectedUniversity, setSelectedUniversity] = useState({value: '', label: 'Select...'})
  const [selectedSatker, setSelectedSatker] = useState({value: '', label: 'Select...'})
  const [selectedIpk, setSelectedIpk] = useState({value: '', label: 'Select...'})

  // ** redirect
  const history = useHistory()

  // ** Function to get user on mount
  useEffect(() => {

    if (isUserLoggedIn() !== null) {
      const dataProfile = JSON.parse(localStorage.getItem('userData'))
      setUserData(dataProfile.userdata)
    }
  }, [])

  useEffect(() => {
    if (store.selected !== null && store.selected !== undefined) {
      const linkLogo = `${process.env.REACT_APP_BASE_URL}${store.selected.image_foto}`
      setLogo({...logo, link: linkLogo})
      setSelectedIpk({label: store.selected.ipk, value: store.selected.ipk})
    }
  }, [store.selected])

  useEffect(() => {

  }, [dispatch])

  useEffect(() => {

    if (store.success) {
      toast.success(
        <ToastContent text={null} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
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

      if (data.password !== data.password_confirm) {
        setError('password_confirm', {
          message: 'Password not match'
        })
        return null
      }

      if (data.password) {
        if (data.password.length < 8) {
          setError('password', {
            message: 'Password min. 8'
          })
          return null
        }
        datas.append('password', data.password)
      }

      datas.append('resource_id', userData.resource_id)
      datas.append('email', userData.email)
      datas.append('image_foto', logo.file)
      datas.append('first_name', data.first_name)
      datas.append('last_name', data.last_name)
      datas.append('telepon', data.telepon)
      datas.append('majoring', data.majoring)
      datas.append('total_sks', data.total_sks)
      datas.append('ipk', selectedIpk.value)
      datas.append('default_language', data.default_language)
      datas.append('id_satker', JSON.stringify(selectedSatker))
      datas.append('id_universitas', JSON.stringify(selectedUniversity))

      dispatch(addProfile(datas))
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
                    <span className='align-middle'>Edit Profil</span>
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
                      placeholder={'Nama Depan'}
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
                      placeholder={'Nama Belakang'}
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.last_name
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
                      placeholder={'Telepon'}
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.telepon
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='majoring'>Jurusan</Label>
                    <Input
                      id='majoring'
                      name='majoring'
                      defaultValue={store.selected.majoring}
                      placeholder={'Jurusan'}
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.majoring
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
                      defaultValue={''}
                      placeholder={'Password'}
                      innerRef={register({ required: false })}
                      className={classnames({
                        'is-invalid': errors.password
                      })}
                    />
                    {errors.password && <div className='invalid-feedback'>{errors.password.message}</div>}
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='total_sks'>Total SKS</Label>
                    <Input
                      id='total_sks'
                      name='total_sks'
                      type='number'
                      defaultValue={store.selected.total_sks}
                      placeholder={'Total SKS'}
                      innerRef={register({ required: true })}
                      className={classnames({
                        'is-invalid': errors.total_sks
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='ipk'>IPK</Label>
                    <Controller
                      name='gpa'
                      id='gpa'
                      control={control}
                      invalid={data !== null && (data.gpa === undefined || data.gpa === null)}
                      defaultValue={selectedIpk}
                      render={({value, onChange}) => {

                        return (
                          <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            options={ipks()}
                            value={selectedIpk}
                            onChange={data => {
                              onChange(data)
                              setSelectedIpk(data)
                            }}
                          />
                        )
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col lg='4' md='6'>
                  <FormGroup>
                    <Label for='password_confirm'>Password Retype</Label>
                    <Input
                      id='password_confirm'
                      name='password_confirm'
                      type='password'
                      defaultValue={''}
                      placeholder={'Password Retype'}
                      innerRef={register({ required: false })}
                      className={classnames({
                        'is-invalid': errors.password_confirm
                      })}
                    />
                    {errors.password_confirm && <div className='invalid-feedback'>{errors.password_confirm.message}</div>}
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
              </Row>
              <Row>
                <Col className='d-flex flex-sm-row flex-column mt-2'>
                  <Button type='submit' color='primary' className='mb-1 mb-sm-0 mr-0 mr-sm-1'>
                    <FormattedMessage id='Save'/>
                  </Button>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  ) : null
}
export default ProfileSave

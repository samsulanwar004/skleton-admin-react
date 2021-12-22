import { useContext, useEffect, useState } from 'react'
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Media } from 'reactstrap'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'

// ** Utils
import { isUserLoggedIn } from '@utils'

// ** Styles
import '@styles/react/apps/app-users.scss'

const Dashboard = () => {

  // ** Store Vars
  const store = useSelector(state => state.profile),
  dispatch = useDispatch()

  const [userData, setUserData] = useState(null)
  const [isMounted, setIsMounted] = useState(false)

  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      const user = JSON.parse(localStorage.getItem('userData'))
      setUserData(user.userdata)
    }

    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div id='dashboard' className="px-1">

    </div>
  )
}

export default Dashboard

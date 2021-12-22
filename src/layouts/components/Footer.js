// ** Icons Import
import { Heart } from 'react-feather'

const CustomFooter = props => {

  return (
    <p className='clearfix mb-0'>
      <span className='float-md-left d-block d-md-inline-block mt-25'>
        COPYRIGHT © {new Date().getFullYear()}{' '}
        <a href='https://www.spektro-bi.org/' target='_blank' rel='noopener noreferrer'>
          Spektro
        </a>
        <span className='d-none d-sm-inline-block'>, All rights Reserved</span>
      </span>
    </p>
  )
}

export default CustomFooter

import React from 'react'
import { useLocation } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'

const Placeholder = () => {
  const { pathname } = useLocation()
  return (
    <CCard className="mb-4">
      <CCardHeader>{pathname}</CCardHeader>
      <CCardBody>This section is not implemented yet.</CCardBody>
    </CCard>
  )
}

export default Placeholder

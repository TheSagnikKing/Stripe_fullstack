import React from 'react'
import { useNavigate } from 'react-router-dom'

const Cancel = () => {

  const navigate = useNavigate()

  return (
    <>
      <div style={{ color: "red", fontWeight: "600" }}>Order Failed :(</div>
      <button onClick={() => navigate("/")}>Go back</button>
    </>
  )
}

export default Cancel
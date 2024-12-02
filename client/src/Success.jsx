import React from 'react'
import { useNavigate } from 'react-router-dom'

const Success = () => {
  const navigate = useNavigate()

  return (
    <>
    <div style={{ color: "green", fontWeight: "600"}}>Order Successfully Places :)</div>
    <button onClick={() => navigate("/")}>Go back</button>
    </>
  )
}

export default Success
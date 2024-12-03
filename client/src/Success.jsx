import React from 'react'
import { useNavigate } from 'react-router-dom'

const Success = () => {
  const navigate = useNavigate()

  return (
    <>
    <div style={{ color: "green", fontWeight: "600", fontSize: "26px"}}>Order Successfully Places :)</div>
    <button onClick={() => navigate("/")} style={{ height: "40px", width: "100px", marginTop: "20px"}}>Go back</button>
    </>
  )
}

export default Success
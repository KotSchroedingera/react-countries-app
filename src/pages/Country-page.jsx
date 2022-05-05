import React from 'react'
import { useParams } from 'react-router-dom'

export default function CountryPage() {
  const { name } = useParams()

  return (
    <div>Country {name}</div>
  )
}

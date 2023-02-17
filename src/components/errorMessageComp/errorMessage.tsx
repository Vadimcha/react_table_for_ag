import React from 'react'

interface ErrorMessageProps {
  errorKod: string
}

export function ErrorMessage({ errorKod }: ErrorMessageProps) {
  return (
    <p className="text-center text-red-600">{ errorKod }</p>
  )
}
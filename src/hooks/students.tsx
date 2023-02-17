import { AgStudent } from '../models'
import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { students } from '../data/students' 

export function useStudents() {
  const [products, setProducts] = useState<AgStudent[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  async function fetchStudents() {
    try {
      setLoading(true)
      const response = students
      setProducts(response)
      setLoading(false)
    } 
    catch (e: unknown) {
      setError('Какая-то чертовщина происходит')
      setLoading(false)
    }
  }
  return { students, error, loading }
}
import { useState, useEffect } from 'react'

const useAsync = (asyncFn) => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const executeAsyncFn = async () => {
      try {
        const result = await asyncFn()
        setData(result)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsPending(false)
      }
    }

    executeAsyncFn()
  }, [])

  return { data, isPending, error }
}

const useFetch = (url) => {
  const fetchData = async () => {
    const response = await fetch(url)
    const json = await response.json()
    return json
  }

  return useAsync(fetchData)
}

export default useFetch

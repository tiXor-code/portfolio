import { useState, useEffect } from 'react'

export const useLoading = (minimumLoadTime = 2000) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, minimumLoadTime)

    return () => clearTimeout(timer)
  }, [minimumLoadTime])

  return { isLoading }
}
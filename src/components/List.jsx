import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

function List(props) {
  const [users, setUsers] = useState([])
  // API Helpers
  const [isLoading, setLoading] = useState(false)
  const [hasError, setError] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      // Set loader
      setLoading(true)

      // Fetch users from API
      try {
        const response = await fetch(process.env.REACT_APP_USERS_URL)
        if (!response.ok) {
          // Throw error
          setError(response.statusText)
          throw new Error(response.statusText)
        }

        // Set news, clean errors
        const users = await response.json()
        setUsers(users)
        setError(null)
      } catch (e) {
        setError(e)
      } finally {
        // Remove loader
        setLoading(false)
        console.log('Done?', users, hasError, isLoading)
      }
    }

    // Fetch data from API on mount
    fetchUsers()

    // Run once, no cleaning needed
  }, [])

  return (
    <>
      {isLoading && <p>Loading... Patience, please</p>}
      {hasError && (
        <p>Oops, an error sneaked in here! Try to refresh the page.</p>
      )}
      <ul>
        {users.map((o) => (
          <li key={o.id} className="list-item">
            <button className="user-name">{o.name}</button>
          </li>
        ))}
      </ul>
    </>
  )
}

List.propTypes = {}

export default List

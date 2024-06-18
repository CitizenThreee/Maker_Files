import './App.css'
import AppRoutes from './AppRoutes'
import { UserProvider } from './context/UserProvider'
import { DataProvider, useDataContext } from './context/DataProvider'
import { useEffect } from 'react'

function App() {
  return (
    <>
    <DataProvider>
      <UserProvider>
        <AppRoutes></AppRoutes>
      </UserProvider>
    </DataProvider>
    </>
  )
}

export default App

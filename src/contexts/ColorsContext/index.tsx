import React, { createContext, useState, ReactNode, FC, useEffect } from 'react'

import fetchWithAuth from '../../utils/fetchWithAuth'

interface ColorsContextType {
  page: number
  setPage: (n: number) => void
  pageData: PageDataType | undefined
  perPage: number
  setPerPage: (n: number) => void
  addColor: (color: ColorWithoutId) => void
  deleteColor: (id: number) => void
  editColor: (id: number, color: ColorWithoutId) => void
  moveColor: (id: number, direction: 'up' | 'down') => void
}

const ColorsContext = createContext<ColorsContextType | undefined>(undefined)

interface ColorsProviderProps {
  children: ReactNode
}

export type ColorsType = {
  id: number
  name: string
  year: number
  color: string
  pantone_value: string
}

export type ColorWithoutId = Omit<ColorsType, 'id'>

export type PageDataType = {
  count: number
  next: number
  previous: number
  results: ColorsType[]
}

const ColorsProvider: FC<ColorsProviderProps> = ({ children }) => {
  const [pageData, setPageData] = useState<PageDataType>()
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(5)

  const fetchPageData = async () => {
    try {
      const res = await fetchWithAuth(
        `${process.env.REACT_APP_API_URL}/resources/?page=${page}&page_size=${perPage}`
      )
      const fetchedData: PageDataType = await res.json()
      setPageData(fetchedData)
    } catch (error) {
      console.error('Erro ao buscar dados:', error)
    }
  }

  useEffect(() => {
    fetchPageData()
  }, [page, perPage])

  const addColor = async (color: ColorWithoutId) => {
    try {
      await fetchWithAuth(`${process.env.REACT_APP_API_URL}/resources/`, {
        method: 'POST',
        body: JSON.stringify(color)
      })
      await fetchPageData()
    } catch (error) {
      console.error('Erro ao adicionar cor:', error)
    }
  }

  const deleteColor = async (id: number) => {
    try {
      await fetchWithAuth(`${process.env.REACT_APP_API_URL}/resources/${id}/`, {
        method: 'DELETE'
      })
      await fetchPageData()
    } catch (error) {
      console.error('Erro ao excluir cor:', error)
    }
  }

  const moveColor = async (id: number, direction: 'up' | 'down') => {
    try {
      const endpoint = direction === 'up' ? 'move_up' : 'move_down'
      await fetchWithAuth(
        `${process.env.REACT_APP_API_URL}/resources/${id}/${endpoint}/`,
        { method: 'POST' }
      )
      await fetchPageData()
    } catch (error) {
      console.error(
        `Erro ao mover cor para ${direction === 'up' ? 'cima' : 'baixo'}:`,
        error
      )
    }
  }

  const editColor = async (id: number, color: ColorWithoutId) => {
    try {
      await fetchWithAuth(`${process.env.REACT_APP_API_URL}/resources/${id}/`, {
        method: 'PUT',
        body: JSON.stringify(color)
      })
      await fetchPageData()
    } catch (error) {
      console.error('Erro ao editar cor:', error)
    }
  }

  return (
    <ColorsContext.Provider
      value={{
        page,
        setPage,
        perPage,
        setPerPage,
        pageData,
        addColor,
        deleteColor,
        editColor,
        moveColor
      }}
    >
      {children}
    </ColorsContext.Provider>
  )
}

const useColors = () => {
  const context = React.useContext(ColorsContext)
  if (context === undefined) {
    throw new Error('useColors must be used within an ColorsProvider')
  }
  return context
}

export { ColorsProvider, useColors }

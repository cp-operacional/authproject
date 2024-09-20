import React, { createContext, useState, ReactNode, FC, useEffect } from 'react'

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
      const accessToken = localStorage.getItem('access')
      if (!accessToken) {
        throw new Error('Token de acesso não encontrado')
      }

      const res = await fetch(
        `http://127.0.0.1:8000/resources/?page=${page}&page_size=${perPage}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )

      if (!res.ok) {
        throw new Error('Falha ao buscar cores')
      }

      const fetchedData: PageDataType = await res.json()
      setPageData(fetchedData)

      console.log(fetchedData)
    } catch (error) {
      console.error('Erro ao buscar dados:', error)
    }
  }

  useEffect(() => {
    fetchPageData()
  }, [page, perPage])

  const addColor = async (color: ColorWithoutId) => {
    try {
      const accessToken = localStorage.getItem('access')
      if (!accessToken) {
        throw new Error('Token de acesso não encontrado')
      }

      const res = await fetch('http://127.0.0.1:8000/resources/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(color)
      })

      if (!res.ok) {
        throw new Error('Falha ao adicionar cor')
      }
      await fetchPageData()
    } catch (error) {
      console.error('Erro ao adicionar cor:', error)
    }
  }

  const deleteColor = async (id: number) => {
    try {
      const accessToken = localStorage.getItem('access')
      if (!accessToken) {
        throw new Error('Token de acesso não encontrado')
      }

      const res = await fetch(`http://127.0.0.1:8000/resources/${id}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      if (!res.ok) {
        throw new Error('Falha ao excluir cor')
      }
      await fetchPageData()
    } catch (error) {
      console.error('Erro ao excluir cor:', error)
    }
  }

  const moveColor = async (id: number, direction: 'up' | 'down') => {
    try {
      const accessToken = localStorage.getItem('access')
      if (!accessToken) {
        throw new Error('Token de acesso não encontrado')
      }

      const endpoint = direction === 'up' ? 'move_up' : 'move_down'
      const res = await fetch(
        `http://127.0.0.1:8000/resources/${id}/${endpoint}/`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )

      if (!res.ok) {
        throw new Error(
          `Falha ao mover cor para ${direction === 'up' ? 'cima' : 'baixo'}`
        )
      }
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
      const accessToken = localStorage.getItem('access')
      if (!accessToken) {
        throw new Error('Token de acesso não encontrado')
      }

      const res = await fetch(`http://127.0.0.1:8000/resources/${id}/`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(color)
      })

      if (!res.ok) {
        throw new Error('Falha ao editar cor')
      }
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

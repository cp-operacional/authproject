import React, { createContext, useState, ReactNode, FC, useEffect } from 'react'

interface ColorsContextType {
  page: number
  setPage: (n: number) => void
  pageData: PageDataType | undefined
  addColor: (color: ColorWithoutId) => void
  deleteColor: (id: number) => void
  editColor: (id: number, color: ColorWithoutId) => void
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

  const fetchPageData = async () => {
    try {
      const accessToken = localStorage.getItem('access')
      if (!accessToken) {
        throw new Error('Token de acesso não encontrado')
      }

      const res = await fetch(`http://127.0.0.1:8000/resources/?page=${page}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

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
  }, [page])

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
      await fetchPageData() // Atualiza a lista após adicionar
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
      await fetchPageData() // Atualiza a lista após excluir
    } catch (error) {
      console.error('Erro ao excluir cor:', error)
    }
  }

  // const moveColor = (id: number, direction: 'up' | 'down') => {
  //   const index = colors.findIndex((color) => color.id === id)
  //   if (index === -1) return

  //   const newIndex = direction === 'up' ? index - 1 : index + 1
  //   if (newIndex < 0 || newIndex >= colors.length) return

  //   const newColors = [...colors]
  //   newColors[index] = colors[newIndex]
  //   newColors[newIndex] = colors[index]

  //   setColors(newColors)
  // }

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
      await fetchPageData() // Atualiza a lista após editar
    } catch (error) {
      console.error('Erro ao editar cor:', error)
    }
  }

  return (
    <ColorsContext.Provider
      value={{
        page,
        setPage,
        pageData,
        addColor,
        deleteColor,
        editColor
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

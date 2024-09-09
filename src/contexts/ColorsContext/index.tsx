import React, { createContext, useState, ReactNode, FC, useEffect } from 'react'

interface ColorsContextType {
  fetchColors: () => void
  colorsList: ArrayColorsListType
  perPage: number
  setPerPage: (n: number) => void
  totalPages: number
  addColor: (color: ColorWithoutId) => void
  deleteColor: (id: number) => void
  moveColor: (id: number, direction: 'up' | 'down') => void
}

const ColorsContext = createContext<ColorsContextType | undefined>(undefined)

interface ColorsProviderProps {
  children: ReactNode
}

type ColorsType = {
  id: number
  name: string
  year: number
  color: string
  pantone_value: string
}

export type ColorWithoutId = Omit<ColorsType, 'id'>

type ColorsListType = {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: ColorsType[]
}

type ArrayColorsListType = ColorsListType[]

const ColorsProvider: FC<ColorsProviderProps> = ({ children }) => {
  const [colors, setColors] = useState<ColorsType[]>([])
  const [colorsList, setColorsList] = useState<ArrayColorsListType>([])
  const [perPage, setPerPage] = useState(4)
  const [totalPages, setTotalPages] = useState(Math.ceil(12 / perPage))

  const fetchColors = async () => {
    try {
      const fetchedData: ColorsType[] = []
      for (let i = 1; i <= totalPages; i++) {
        const res = await fetch(`https://reqres.in/api/unknown?page=${i}`)
        const dataJson: ColorsListType = await res.json()
        fetchedData.push(...dataJson.data)
      }
      setColors(fetchedData)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    const colorsList = colors.reduce<ArrayColorsListType>(
      (acc, color, index) => {
        if (index % perPage === 0) {
          acc.push({
            page: acc.length + 1,
            per_page: perPage,
            total: colors.length,
            total_pages: Math.ceil(colors.length / perPage),
            data: [color]
          })
        } else {
          acc[acc.length - 1].data.push(color)
        }
        return acc
      },
      []
    )

    setColorsList(colorsList)
    setTotalPages(colorsList.length)
  }, [colors, perPage])

  const addColor = (color: ColorWithoutId) => {
    const newColor = {
      ...color,
      id: colors.length + 1
    }

    setColors((prev) => [newColor, ...prev])
  }

  const deleteColor = (id: number) => {
    setColors((prev) => prev.filter((color) => color.id !== id))
  }

  const moveColor = (id: number, direction: 'up' | 'down') => {
    const index = colors.findIndex((color) => color.id === id)
    if (index === -1) return

    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= colors.length) return

    const newColors = [...colors]
    newColors[index] = colors[newIndex]
    newColors[newIndex] = colors[index]

    setColors(newColors)
  }

  return (
    <ColorsContext.Provider
      value={{
        fetchColors,
        colorsList,
        perPage,
        setPerPage,
        totalPages,
        addColor,
        deleteColor,
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

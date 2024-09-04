import { useEffect, useState } from 'react'
import { Button, TextField } from '@mui/material'
import * as S from './styles'

type ColorsType = {
  id: number
  name: string
  year: number
  color: string
  pantone_value: string
}

type ColorsListType = {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: ColorsType[]
}

type ArrayColorsListType = ColorsListType[]

const ColorsList = () => {
  const [colors, setColors] = useState<ColorsType[]>([])
  const [colorsList, setColorsList] = useState<ArrayColorsListType>([])
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(4)
  const [totalPages, setTotalPages] = useState(Math.ceil(12 / perPage))
  const [newPerPage, setNewPerPage] = useState<number>(perPage)

  useEffect(() => {
    const getData = async () => {
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

    getData()
  }, [])

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

  const currentPageData = colorsList.find((pageData) => pageData.page === page)

  const handlePerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10)
    setNewPerPage(value)
  }

  const isFirstPage = page === 1

  const isLastPage = page === totalPages

  const applyPerPageChange = () => {
    setPerPage(newPerPage)
    const newTotalPages = Math.ceil(colors.length / newPerPage)
    setTotalPages(newTotalPages)
    setPage(1)
  }

  const handleAddColor = () => {
    const newColor = {
      id: colors.length + 1,
      name: 'New Color',
      year: 2021,
      color: '#000000',
      pantone_value: '0000'
    }

    setColors((prev) => [...prev, newColor])
  }

  useEffect(() => {
    console.log(colors)
  }, [colors])

  return (
    <section>
      <S.ButtonContainer>
        <Button type="button" onClick={handleAddColor} variant="outlined">
          Adicionar Cor
        </Button>
      </S.ButtonContainer>
      {currentPageData && (
        <S.List>
          {currentPageData.data.map((color) => (
            <S.ListItem key={color.id} $color={color.color}>
              <div className="content">
                <p>{color.name}</p>
                <p>{color.pantone_value}</p>
                <p>{color.year}</p>
              </div>
              <span className="color" />
            </S.ListItem>
          ))}
        </S.List>
      )}
      <S.ButtonContainer>
        <Button
          type="button"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={isFirstPage}
          variant="outlined"
        >
          Anterior
        </Button>
        <TextField
          className="perPageInput"
          type="number"
          value={newPerPage}
          onChange={handlePerPageChange}
          variant="outlined"
          size="small"
        />
        <Button onClick={applyPerPageChange} variant="text">
          Aplicar
        </Button>
        <Button
          type="button"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={isLastPage}
          variant="outlined"
        >
          Próximo
        </Button>
      </S.ButtonContainer>
    </section>
  )
}

export default ColorsList

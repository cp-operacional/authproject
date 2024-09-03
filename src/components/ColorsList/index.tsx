import { useEffect, useState } from 'react'
import { Button } from '@mui/material'

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

const ColorsList = () => {
  const [colorsListData, setColorsListData] = useState<ColorsListType>()
  const [page, setPage] = useState(1)

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`https://reqres.in/api/unknown?page=${page}`)
        const dataJson = await res.json()
        setColorsListData(dataJson)
      } catch (error) {
        setColorsListData(undefined)
      }
    }

    getData()
  }, [page])

  const handleClickNextPage = () => {
    setPage((prev) => prev + 1)
  }

  const handleClickPreviousPage = () => {
    setPage((prev) => prev - 1)
  }

  const isLastPage = colorsListData?.total_pages === page

  const isFirstPage = colorsListData?.page === 1

  return (
    <section>
      {colorsListData && (
        <S.List>
          {colorsListData.data.map((color) => (
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
          onClick={handleClickPreviousPage}
          disabled={isFirstPage}
          variant="outlined"
        >
          Anterior
        </Button>
        <Button
          type="button"
          onClick={handleClickNextPage}
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

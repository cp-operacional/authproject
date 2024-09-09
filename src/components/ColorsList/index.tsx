import { useEffect, useState } from 'react'
import { Button, TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

import { AddColorPU } from '../AddColorPU'
import { useColors } from '../../contexts/ColorsContext'

import * as S from './styles'

const ColorsList = () => {
  const {
    fetchColors,
    colorsList,
    perPage,
    setPerPage,
    totalPages,
    deleteColor,
    moveColor
  } = useColors()

  const [page, setPage] = useState(1)
  const [newPerPage, setNewPerPage] = useState<number>(perPage)

  useEffect(() => {
    fetchColors()
  }, [])

  const currentPageData = colorsList.find((pageData) => pageData.page === page)

  const handlePerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10)
    setNewPerPage(value)
  }

  const isFirstPage = page <= 1

  const isLastPage = page >= totalPages

  const applyPerPageChange = () => {
    setPerPage(newPerPage)
    setPage(1)
  }

  const isFirstColorId = (id: number) => id === colorsList[0].data[0].id

  const isLastColorId = (id: number) => {
    return (
      id ===
      colorsList[colorsList.length - 1].data[
        colorsList[colorsList.length - 1].data.length - 1
      ].id
    )
  }

  return (
    <section>
      <S.ButtonContainer>
        <AddColorPU />
      </S.ButtonContainer>
      {currentPageData && (
        <S.List>
          {currentPageData.data.map((color) => (
            <S.ListItem key={color.id} $color={color.color}>
              <div className="content">
                <div className="itemHeader">
                  <p className="name">{color.name}</p>
                  <DeleteIcon
                    className="trashIcon"
                    onClick={() => deleteColor(color.id)}
                  />
                </div>
                <p className="pantone">{color.pantone_value}</p>
                <p className="year">{color.year}</p>
              </div>
              <div className="right">
                <span className="color" />
                <div className="movingButtonContainer">
                  <Button
                    className="movingButton"
                    onClick={() => moveColor(color.id, 'up')}
                    disabled={isFirstColorId(color.id)}
                    color="primary"
                  >
                    <ArrowUpwardIcon />
                  </Button>
                  <Button
                    className="movingButton"
                    onClick={() => moveColor(color.id, 'down')}
                    disabled={isLastColorId(color.id)}
                    color="primary"
                  >
                    <ArrowDownwardIcon />
                  </Button>
                </div>
              </div>
            </S.ListItem>
          ))}
        </S.List>
      )}
      <S.ButtonContainer>
        <Button
          type="button"
          onClick={() => setPage((prev) => prev - 1)}
          disabled={isFirstPage}
          variant="outlined"
        >
          Anterior
        </Button>
        <TextField
          className="perPageInput"
          type="number"
          value={newPerPage == 0 ? 1 : newPerPage}
          onChange={handlePerPageChange}
          variant="outlined"
          size="small"
        />
        <Button onClick={applyPerPageChange} variant="text">
          Aplicar
        </Button>
        <Button
          type="button"
          onClick={() => setPage((prev) => prev + 1)}
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

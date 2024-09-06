import { useEffect, useState } from 'react'
import { Button, TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

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
    deleteColor
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
                  <p>{color.name}</p>
                  <DeleteIcon
                    className="trashIcon"
                    onClick={() => deleteColor(color.id)}
                  />
                </div>
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
          onClick={() => setPage((prev) => prev - 1)}
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

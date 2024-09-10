import { useEffect, useState } from 'react'
import { Button, TextField, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import CancelIcon from '@mui/icons-material/Cancel'
import { Cancel } from '@mui/icons-material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

import { AddColorPU } from '../AddColorPU'
import { ColorWithoutId, useColors } from '../../contexts/ColorsContext'

import * as S from './styles'

const ColorsList = () => {
  const {
    fetchColors,
    colorsList,
    perPage,
    setPerPage,
    totalPages,
    deleteColor,
    moveColor,
    editColor
  } = useColors()

  const [page, setPage] = useState(1)
  const [newPerPage, setNewPerPage] = useState<number>(perPage)
  const [indexColorEditing, setIndexColorEditing] = useState<number>()
  const [newColor, setNewColor] = useState<ColorWithoutId>()
  const [hexColorError, setHexColorError] = useState(false)

  useEffect(() => {
    fetchColors()
  }, [])

  const currentPageData = colorsList.find((pageData) => pageData.page === page)

  const handlePreviousPage = () => setPage((prev) => prev - 1)

  const handleNextPage = () => setPage((prev) => prev + 1)

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

  const isEditing = (id: number) => indexColorEditing === id

  const handleStartEditing = (id: number) => {
    setIndexColorEditing(id)
    setNewColor(currentPageData?.data.find((color) => color.id === id))
    setHexColorError(false)
  }

  const handleEditColor = (id: number) => {
    if (newColor) {
      editColor(id, newColor)
      setIndexColorEditing(undefined)
      setNewColor(undefined)
      setHexColorError(false)
    }
  }

  const handleCancelEditing = () => {
    setIndexColorEditing(undefined)
    setNewColor(undefined)
    setHexColorError(false)
  }

  const handleSetName = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (newColor) {
      setNewColor({ ...newColor, name: event.target.value })
    }
  }

  const handleSetPantone = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (newColor) {
      setNewColor({ ...newColor, pantone_value: event.target.value })
    }
  }

  const handleSetYear = (event: React.ChangeEvent<HTMLInputElement>) => {
    const year = parseInt(event.target.value, 10)

    if (newColor) {
      setNewColor({ ...newColor, year: year ? year : 0 })
    }
  }

  const handleSetColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    const hexColorRegex = /^#([0-9A-Fa-f]{3}){1,2}$/

    if (newColor) {
      setNewColor({ ...newColor, color: value })
    }

    if (hexColorRegex.test(value)) {
      setHexColorError(false)
    } else {
      setHexColorError(true)
    }
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
                <div className="colorButtonsContainer">
                  {isEditing(color.id) ? (
                    <>
                      <IconButton disabled={hexColorError}>
                        <CheckIcon
                          className={
                            hexColorError ? 'checkIcon disabled' : 'checkIcon'
                          }
                          onClick={() => handleEditColor(color.id)}
                        />
                      </IconButton>
                      <IconButton>
                        <CancelIcon
                          className="cancelIcon"
                          onClick={handleCancelEditing}
                        />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton>
                        <EditIcon
                          className="editIcon"
                          onClick={() => handleStartEditing(color.id)}
                        />
                      </IconButton>
                      <IconButton>
                        <DeleteIcon
                          className="trashIcon"
                          onClick={() => deleteColor(color.id)}
                        />
                      </IconButton>
                    </>
                  )}
                </div>
                <div className="colorDescription">
                  {isEditing(color.id) ? (
                    <>
                      <input
                        type="text"
                        className="nameInput"
                        value={newColor?.name}
                        onChange={handleSetName}
                      />
                      <input
                        type="text"
                        className="pantoneInput"
                        value={newColor?.pantone_value}
                        onChange={handleSetPantone}
                      />
                      <input
                        type="text"
                        className="yearInput"
                        value={newColor?.year}
                        onChange={handleSetYear}
                      />
                    </>
                  ) : (
                    <>
                      <div className="itemHeader">
                        <p className="name">{color.name}</p>
                      </div>
                      <p className="pantone">{color.pantone_value}</p>
                      <p className="year">{color.year}</p>
                    </>
                  )}
                </div>
              </div>
              <div className="right">
                <span className="color">
                  {isEditing(color.id) && (
                    <input
                      type="text"
                      className={
                        hexColorError ? 'hexColorInput error' : 'hexColorInput'
                      }
                      value={newColor?.color}
                      onChange={handleSetColor}
                    />
                  )}
                </span>
                <div className="movingButtonContainer">
                  <IconButton
                    className="movingButton"
                    onClick={() => moveColor(color.id, 'up')}
                    disabled={isFirstColorId(color.id)}
                    color="primary"
                  >
                    <ArrowUpwardIcon />
                  </IconButton>
                  <IconButton
                    className="movingButton"
                    onClick={() => moveColor(color.id, 'down')}
                    disabled={isLastColorId(color.id)}
                    color="primary"
                  >
                    <ArrowDownwardIcon />
                  </IconButton>
                </div>
              </div>
            </S.ListItem>
          ))}
        </S.List>
      )}
      <S.ButtonContainer>
        <Button
          type="button"
          onClick={handlePreviousPage}
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
          onClick={handleNextPage}
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

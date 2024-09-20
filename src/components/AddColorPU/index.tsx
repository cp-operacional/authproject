import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@mui/material'
import React from 'react'

import { useColors } from '../../contexts/ColorsContext'

export const AddColorPU = () => {
  const { addColor } = useColors()

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const formJson = Object.fromEntries((formData as any).entries())
    const name = formJson.name
    const year = formJson.year
    const color = formJson.color
    const pantone = formJson.pantone

    const newColor = {
      name: name,
      year: year,
      color: color,
      pantone_value: pantone
    }

    addColor(newColor)

    handleClose()
  }

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        Adicionar cor
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: onSubmit
        }}
      >
        <DialogTitle>Adicione uma cor</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Preencha os campos para adicionar uma cor à lista.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Nome da cor:"
            type="text"
            fullWidth
            variant="standard"
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="year"
            name="year"
            label="Ano:"
            type="number"
            fullWidth
            variant="standard"
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="color"
            name="color"
            label="Cor em Hexadecimal (exemplo: #FFFFFF)"
            type="text"
            fullWidth
            variant="standard"
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="pantone"
            name="pantone"
            label="Valor do tom (exemplo: 15-5519)"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit">Adicionar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

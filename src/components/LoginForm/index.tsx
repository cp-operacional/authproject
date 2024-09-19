import { FormEvent, useState } from 'react'
import {
  Button,
  IconButton,
  InputAdornment,
  Typography,
  FormControl,
  InputLabel
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import { useAuth } from '../../contexts/AuthContext'

import * as S from './styles'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isRequesting, setIsRequesting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { login } = useAuth()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    setIsRequesting(true)

    try {
      setHasError(false)
      setErrorMessage('')
      await login(email, password)
    } catch (error) {
      error instanceof Error
        ? setErrorMessage(error.message)
        : setErrorMessage('Unknown error')
      setHasError(true)
    }

    setIsRequesting(false)
  }

  const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleOnChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <S.Container>
      {hasError && <S.ErrorBox severity="error">{errorMessage}</S.ErrorBox>}

      <S.FormContainer onSubmit={onSubmit}>
        <Typography variant="h4">Login</Typography>
        <S.TextField
          value={email}
          onChange={handleOnChangeEmail}
          type="email"
          label="E-mail"
          variant="outlined"
          autoComplete="email"
          fullWidth
          required
        />
        <FormControl fullWidth required variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
          <S.OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handleOnChangePassword}
            autoComplete="current-password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Senha"
          />
        </FormControl>
        <Button type="submit" variant="contained" disabled={isRequesting}>
          Enviar
        </Button>
      </S.FormContainer>
    </S.Container>
  )
}

export default LoginForm

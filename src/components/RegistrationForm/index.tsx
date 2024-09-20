import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  IconButton,
  InputAdornment,
  Typography,
  FormControl,
  InputLabel,
  Alert
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import * as S from './styles'

const RegistrationForm = () => {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [hasSuccess, setHasSuccess] = useState(false)
  const [isRequesting, setIsRequesting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [count, setCount] = useState(5)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    setIsRequesting(true)

    try {
      setHasError(false)
      setErrorMessage('')

      const response = await fetch('http://127.0.0.1:8000/auth/users/', {
        method: 'POST',
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        console.log(data)
        setHasSuccess(true)
        setCount(5)
        handleRedirect()
      }
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

  const handleOnChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value)
  }

  const handleOnChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value)
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleOnClickLogin = () => {
    navigate('/login')
  }

  const handleRedirect = () => {
    const countdownInterval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(countdownInterval)
          navigate('/login', { replace: true })
          return 0
        }
        return prevCount - 1
      })
    }, 1000)
  }

  return (
    <S.Container>
      {hasError && <S.ErrorBox severity="error">{errorMessage}</S.ErrorBox>}
      {hasSuccess && (
        <Alert severity="success">
          Usuário criado com sucesso! Você está sendo redirecionado para a
          pagina de login em {count} segundos...
        </Alert>
      )}

      <S.FormContainer onSubmit={onSubmit}>
        <Typography variant="h4">Cadastro</Typography>
        <S.TextField
          value={firstName}
          onChange={handleOnChangeFirstName}
          type="text"
          label="Nome"
          variant="outlined"
          autoComplete="new-password"
          inputProps={{ maxLength: 150 }}
          fullWidth
          required
        />
        <S.TextField
          value={lastName}
          onChange={handleOnChangeLastName}
          type="text"
          label="Sobrenome"
          variant="outlined"
          autoComplete="new-password"
          inputProps={{ maxLength: 150 }}
          fullWidth
          required
        />
        <S.TextField
          value={email}
          onChange={handleOnChangeEmail}
          type="email"
          label="E-mail"
          variant="outlined"
          autoComplete="new-password"
          inputProps={{ maxLength: 255 }}
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
            autoComplete="new-password"
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
        <Button
          type="button"
          variant="text"
          disabled={isRequesting}
          onClick={handleOnClickLogin}
        >
          Já tem uma Conta? Entre!
        </Button>
      </S.FormContainer>
    </S.Container>
  )
}

export default RegistrationForm

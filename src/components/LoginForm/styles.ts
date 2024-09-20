import styled from 'styled-components'
import {
  Alert,
  TextField as MuiTextField,
  OutlinedInput as MuiOutlinedInput
} from '@mui/material'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  flex-direction: column;
`

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding: 40px 40px;
  border: 1px solid #000;
  border-radius: 8px;
  text-align: center;
  background-color: #fff;
`

export const TextField = styled(MuiTextField)`
  background-color: #fff;
`

export const OutlinedInput = styled(MuiOutlinedInput)`
  background-color: #fff;
`

export const ErrorBox = styled(Alert)`
  position: absolute;
  top: 32px;
  left: 50%;
  transform: translateX(-50%);
`

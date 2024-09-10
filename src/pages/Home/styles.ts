import styled from 'styled-components'
import { breakpoints } from '../../styles'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 24px;
  row-gap: 16px;
  padding-left: 250px;

  @media (max-width: ${breakpoints.desktop}) {
    padding-left: 0;
    padding-bottom: 80px;
  }
`

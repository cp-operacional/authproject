import styled from 'styled-components'
import { List as MuiList, ListItem as MuiListItem } from '@mui/material'

export const List = styled(MuiList)`
  max-width: 600px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
`

type ListItemProps = {
  $color: string
}

export const ListItem = styled(MuiListItem)<ListItemProps>`
  display: flex;
  justify-content: space-between;
  column-gap: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);

  .content {
    display: flex;
    flex-direction: column;
    row-gap: 4px;
  }

  .color {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: ${({ $color }) => $color};
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 550px;
  margin: 0 auto;
  margin-top: 16px;
`

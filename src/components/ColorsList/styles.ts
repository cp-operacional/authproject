import styled from 'styled-components'

export const List = styled.ul`
  max-width: 400px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
  margin-top: 16px;
`

type ListItemProps = {
  $color: string
}

export const ListItem = styled.li<ListItemProps>`
  display: flex;
  justify-content: space-between;
  column-gap: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 8px 16px;

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
  max-width: 400px;
  column-gap: 8px;
  margin: 0 auto;
  margin-top: 16px;

  .perPageInput {
    max-width: 4rem;
  }
`

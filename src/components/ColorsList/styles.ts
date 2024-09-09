import styled from 'styled-components'

export const List = styled.ul`
  max-width: 400px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
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

  &:hover {
    .trashIcon {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    row-gap: 4px;

    .itemHeader {
      display: flex;
      align-items: center;
      column-gap: 4px;

      .name {
        font-size: 18px;
        font-weight: bold;
      }
    }

    .pantone,
    .year {
      font-size: 12px;
    }
  }

  .trashIcon {
    font-size: 20px;
    color: #ffffff;
    background-color: #1976d2;
    border-radius: 50%;
    margin-left: 4px;
    padding: 4px;

    transform: translateX(-10px);
    opacity: 0;

    transition: all 0.5s;

    cursor: pointer;
  }

  .right {
    display: flex;
    align-items: center;
    column-gap: 8px;

    .color {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background-color: ${({ $color }) => $color};
    }

    .movingButtonContainer {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 70%;

      .movingButton {
        width: 5px;
        height: 5px;
      }
    }
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  max-width: 400px;
  column-gap: 8px;
  margin: 16px auto;

  .perPageInput {
    max-width: 4rem;
  }
`

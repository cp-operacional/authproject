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
  padding: 8px 16px 8px 0px;

  &:hover {
    .trashIcon,
    .editIcon {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .content {
    display: flex;

    .colorDescription {
      display: flex;
      flex-direction: column;
      row-gap: 4px;
    }

    .colorButtonsContainer {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .itemHeader {
      display: flex;
      align-items: center;
      column-gap: 4px;

      .name {
        font-size: 18px;
        font-weight: bold;
        text-transform: capitalize;
      }
    }

    .pantone,
    .year {
      font-size: 12px;
    }

    .nameInput,
    .pantoneInput,
    .yearInput {
      width: 80%;
      font-size: 16px;
      border: none;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      padding: 2px 4px;
    }

    .pantoneInput,
    .yearInput {
      font-size: 12px;
    }
  }

  .trashIcon,
  .editIcon,
  .checkIcon,
  .cancelIcon {
    font-size: 20px;
    color: #ffffff;
    background-color: #1976d2;
    border-radius: 50%;
    padding: 4px;

    transform: translateX(10px);
    opacity: 0;

    transition: all 0.5s;

    cursor: pointer;
  }

  .disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .trashIcon,
  .cancelIcon {
    background-color: #ea3f38;
  }

  .cancelIcon,
  .checkIcon {
    opacity: 1;
    transform: translateX(0);
  }

  .right {
    display: flex;
    align-items: center;
    column-gap: 8px;

    .color {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background-color: ${({ $color }) => $color};

      .hexColorInput {
        max-width: 90%;
        width: 100%;
        padding: 2px 4px;
        border: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 4px;
        font-size: 12px;
      }

      .error {
        border: 1px solid red;
        outline: none;
      }
    }

    .movingButtonContainer {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 70%;

      .movingButton {
        width: 5px;
        height: 5px;
        margin-left: 8px;
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

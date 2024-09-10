import styled from '@emotion/styled'
import { breakpoints } from '../../styles'

export const Container = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  max-width: 250px;
  width: 100%;
  height: 100vh;
  z-index: 10;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px 16px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  .userData {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .avatar {
    border-radius: 50%;
    width: 128px;
    height: 128px;
    object-fit: cover;
    margin-bottom: 8px;
  }

  .email {
    font-size: 8px;
    margin-bottom: 4px;
  }

  .userName {
    display: flex;
  }

  @media (max-width: ${breakpoints.desktop}) {
    top: auto;
    bottom: 0;
    left: 0;
    max-width: 100%;
    width: 100%;
    height: 64px;
    flex-direction: row;
    padding: 16px 10%;

    .userData {
      flex-direction: row;
      column-gap: 8px;
    }

    .email {
      display: none;
    }

    .avatar {
      width: 48px;
      height: 48px;
      margin-bottom: 0px;
    }
  }
`

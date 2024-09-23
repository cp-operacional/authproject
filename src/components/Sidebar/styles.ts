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

  .fileInput {
    display: none;
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

export const AvatarContainer = styled.div`
  position: relative;
  width: 128px;
  height: 128px;
  margin-bottom: 16px;

  @media (max-width: ${breakpoints.desktop}) {
    width: 32px;
    height: 32px;
    margin-bottom: 0px;
  }

  &:hover .avatarOverlay {
    opacity: 1;
    cursor: pointer;
  }

  .avatarOverlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 50%;
  }

  .editIcon {
    color: #fff;
  }
`

export const Avatar = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

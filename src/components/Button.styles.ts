import styled, { css } from 'styled-components'
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'
interface ButtonContainerProps {
  variant: ButtonVariant
}
const buttonVariants = {
  primary: 'purple',
  secondary: 'orange',
  danger: 'tomato',
  success: 'green',
}
export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;

  border-radius: 8px;
  border: 0;
  margin: 8px;

  color: ${(props) => props.theme.white};
  background: ${(props) => props.theme['green-500']};
  /* ${(props) => {
    return css`
      background-color: ${buttonVariants[props.variant]};
    `
  }} */
`

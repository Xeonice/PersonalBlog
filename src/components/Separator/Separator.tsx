import styled from '@emotion/styled';
import { Theme } from "../../gatsby-plugin-theme-ui"

const Separator = styled.hr<{ theme: Theme }>`
  border-color: ${props => props.theme.colors.black.lighter};
  border-width: 2px;
  margin: ${props => props.theme.spacing[8]} 0;
  width: 24px;
`

export default Separator

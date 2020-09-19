import styled from 'styled-components';
import {Button, TextField} from '@material-ui/core';

export const StyBasedButton = styled(Button)`
  && {
    color: #ffffff;
    border-radius: 3px;
    text-align: center;
    text-transform: none;
    font-size: 16px;
    line-height: 26px;
  }
`;

export const StyTextField = styled(TextField)`
  && {
    color: #ffffff;
    & > label {
      color: #ffffff;
    }
    & > div {
      color: #ffffff;
    }
  }
`;

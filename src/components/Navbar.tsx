import {AppBar, Toolbar} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React, {ChangeEvent, Dispatch, useState} from 'react';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import {SEARCH_SUBMIT, UiActionTypes} from '../redux/types';
import {StyBasedButton, StyTextField} from './styled-components';

const StyToolbar = styled(Toolbar)`
  && {
    display: flex;
    justify-content: center;
  }
`;

export default function Navbar() {
  const dispatch: Dispatch<UiActionTypes> = useDispatch();
  const [search, setSearch] = useState('');

  const handleSearchType = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch({type: SEARCH_SUBMIT, payload: {query: search}});
  };

  return (
    <AppBar style={{background: '#292929'}}>
      <StyToolbar>
        <form onSubmit={handleSubmit}>
          <StyTextField
            label="Search"
            value={search}
            onChange={handleSearchType}
            InputProps={{
              endAdornment: (
                <StyBasedButton type="submit">
                  <SearchIcon />
                </StyBasedButton>
              ),
            }}
          />
        </form>
      </StyToolbar>
    </AppBar>
  );
}

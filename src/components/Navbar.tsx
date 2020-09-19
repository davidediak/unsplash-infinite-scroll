import {AppBar, Toolbar} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React, {ChangeEvent, Dispatch, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import {StyBasedButton, StyTextField} from './styled-components';
import {SEARCH_SUBMIT, UiActionTypes} from '../redux/types';
const StyToolbar = styled(Toolbar)`
  && {
    display: flex;
    justify-content: center;
  }
`;

export default function Navbar({queryFromRoute}: {queryFromRoute: string}) {
  const dispatch: Dispatch<UiActionTypes> = useDispatch();
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (queryFromRoute) {
      const queries: string[] = queryFromRoute.split(',').filter(t => t !== '');
      setSearch(queries.join(' '));
      dispatch({type: SEARCH_SUBMIT, payload: {query: queries}});
    }
  }, [queryFromRoute]);

  const handleSearchType = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const queries: string[] = search.split(' ').filter(t => t !== '');
    dispatch({type: SEARCH_SUBMIT, payload: {query: queries}});
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

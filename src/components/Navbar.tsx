import {AppBar, Toolbar} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React, {ChangeEvent, Dispatch, useEffect, useState} from 'react';
import styled from 'styled-components';
import {StyBasedButton, StyTextField} from './styled-components';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {DO_RESET, UiActionTypes} from '../redux/types';
import HomeIcon from '@material-ui/icons/Home';

const StyToolbar = styled(Toolbar)`
  && {
    display: flex;
    justify-content: center;
  }
`;

const StyledLogo = styled(HomeIcon)`
  && {
    cursor: pointer;
    position: absolute;
    left: 20px;
  }
`;

export default function Navbar({onSubmit}: {onSubmit: (query: string[]) => void}) {
  const dispatch: Dispatch<UiActionTypes> = useDispatch();
  const [search, setSearch] = useState('');
  const history = useHistory();
  const query = useSelector<any, string[]>(state => state.UI.mainUI.query);

  useEffect(() => {
    if (query) {
      setSearch(query.join(' '));
    }
  }, [query]);

  const handleSearchType = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const queries: string[] = search.split(' ').filter(t => t !== '');
    onSubmit(queries);
  };

  const doReset = () => {
    history.push('/');
    dispatch({type: DO_RESET});
  };

  return (
    <AppBar style={{background: '#292929'}}>
      <StyToolbar>
        <StyledLogo onClick={doReset} />
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

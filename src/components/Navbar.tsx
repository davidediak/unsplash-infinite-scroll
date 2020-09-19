import {AppBar, Toolbar} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React, {ChangeEvent, useEffect, useState} from 'react';
import styled from 'styled-components';
import {StyBasedButton, StyTextField} from './styled-components';
const StyToolbar = styled(Toolbar)`
  && {
    display: flex;
    justify-content: center;
  }
`;

export default function Navbar({
  onSubmit,
  queryFromRoute,
}: {
  onSubmit: (query: string[]) => void;
  queryFromRoute: string;
}) {
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (queryFromRoute) {
      const queries: string[] = queryFromRoute.split(',').filter(t => t !== '');
      setSearch(queries.join(' '));
    }
  }, [queryFromRoute]);

  const handleSearchType = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const queries: string[] = search.split(' ').filter(t => t !== '');
    onSubmit(queries);
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

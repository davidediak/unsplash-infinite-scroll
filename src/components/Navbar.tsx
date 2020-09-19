import {AppBar, Toolbar} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React, {ChangeEvent, useState} from 'react';
import styled from 'styled-components';
import {StyBasedButton, StyTextField} from './styled-components';

const StyToolbar = styled(Toolbar)`
  && {
    display: flex;
    justify-content: center;
  }
`;

export default function Navbar({searchCallback}: {searchCallback: (query: string) => void}) {
  const [search, setSearch] = useState('');

  const handleSearchType = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleClick = () => {
    searchCallback(search);
  };

  return (
    <AppBar style={{background: '#292929'}}>
      <StyToolbar>
        <StyTextField
          label="Search"
          value={search}
          onChange={handleSearchType}
          InputProps={{
            endAdornment: (
              <StyBasedButton onClick={handleClick}>
                <SearchIcon />
              </StyBasedButton>
            ),
          }}
        />
      </StyToolbar>
    </AppBar>
  );
}

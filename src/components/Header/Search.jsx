import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';

function Search() {
    const { t } = useTranslation('header');
    const [searchValue, setSearchValue] = useState('');

    return (
        <TextField
            value={searchValue}
            id="outlined-search"
            label={t('search')}
            type="text"
            variant="outlined"
            size="small"
            sx={{
                minWidth: '120px',
                maxWidth: '180px',
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Tooltip title={t('search')}>
                            <SearchIcon
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover': {
                                        color: 'primary.main',
                                    },
                                }}
                            />
                        </Tooltip>
                    </InputAdornment>
                ),
                endAdornment: (
                    <>
                        {searchValue && (
                            <InputAdornment position="end">
                                <CloseIcon
                                    fontSize="small"
                                    sx={{
                                        color: 'warning.light',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => setSearchValue('')}
                                />
                            </InputAdornment>
                        )}
                    </>
                ),
            }}
            onChange={(e) => setSearchValue(e.target.value)}
        />
    );
}

export default Search;
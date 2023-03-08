import React, {FC} from 'react';
import {IconButton, useColorScheme} from '@mui/material';
import {ModeNight} from '@mui/icons-material';

export const ModeN: FC = () => {
    const {mode, setMode} = useColorScheme();

    return (
        <IconButton aria-label="delete" size="small" sx={{mr: '30px'}}
                    onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
        >
            <ModeNight/>
        </IconButton>
    );
}
import * as React from 'react';
import { useState } from "react";
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Typography, Box, Container, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import TruckList from './TruckList';


export function Home () {
    return(
        <div>
            <h1>Main Page</h1>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <TruckList />
            </Paper>
        </div>
    )
}
import React from 'react';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import { func, shape, instanceOf } from 'prop-types';

export const TableLabel = ({ openFilters, headRef }) => (
  <Toolbar
    ref={headRef}
    sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      bgcolor: (theme) =>
        alpha(
          theme.palette.primary.main,
          theme.palette.action.activatedOpacity,
        ),
    }}
  >
    <Typography
      sx={{ width: '10vw' }}
      variant="h4"
      id="tableTitle"
      component="div"
    >
      Products
    </Typography>

    <IconButton onClick={() => openFilters()}>
      <FilterListIcon />
      Filters
    </IconButton>
  </Toolbar>
);

TableLabel.propTypes = {
  openFilters: func,
  headRef: shape({ current: instanceOf(Element) }),
};

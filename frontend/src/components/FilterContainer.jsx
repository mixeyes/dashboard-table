import React, { useEffect, useState } from 'react';
import { getFiltersList } from '../services';
import { Checkbox } from '@mui/material';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';

export const FilterContainer = ({ filtersChange, width }) => {
  const [filters, setFilters] = useState({});
  const [checked, setChecked] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const filtersList = await getFiltersList();
      setFilters(filtersList);
    };
    fetchData();
  }, []);

  const handleCheck = (group, item) => {
    let newChecked = { ...checked };
    if (checked[group]) {
      const index = checked[group].indexOf(item);
      if (index >= 0) {
        newChecked[group].splice(index, 1);
        if(!newChecked[group].length){
            delete newChecked[group];
        }
      } else {
        newChecked = { ...newChecked, [group]: [...newChecked[group], item] };
      }
    } else {
      newChecked = { ...newChecked, [group]: [item] };
    }
    setChecked(newChecked);
    filtersChange(newChecked);
  };

  return (
    <div style={{width}}>
      {Object.keys(filters).map((fGroup) => {
        return (
          <div key={fGroup}>
            <h5>{fGroup}</h5>
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
              {Object.keys(filters[fGroup]).map((item, index) => (
                <FormControlLabel
                  key={`${fGroup}_${item}_${index}`}
                  label={`${item} (${filters[fGroup][item]})`}
                  control={
                    <Checkbox onChange={() => handleCheck(fGroup, item)} />
                  }
                />
              ))}
            </Box>
          </div>
        );
      })}
    </div>
  );
};

import React, { useState } from 'react';
import { Box, Grid, Tab, Tabs } from '@mui/material';
import UserReg from './Registration.js';
import UserLogin from './Login.js';

const TabPanel = (props) => {
  const { children, value, index } = props;
  return (
    <div role='tabpanel' hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const LogReg = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        textshadow='3px 2px 2px white'
        display="flex"
        flexDirection="column"
        sx={{
          backgroundColor: 'white',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
          padding: 2,
        }}
      >
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          lg={4}
          sx={{
            background: 'rgba(255, 255, 255, 0.8)',
            border: '2px solid rgba(0, 0, 0, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 3,
            borderRadius: 8,
            backdropFilter: 'blur(20px)',
            boxShadow: 3,
            textAlign: 'center',
          }}
        >
          <Box sx={{ width: '100%' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              centered
              TabIndicatorProps={{
                style: {
                  backgroundColor: 'navy',
                },
              }}
              sx={{ marginBottom: 2 }}
            >
              <Tab label='Login' sx={{ textTransform: 'none', fontWeight: 'bold', color: 'navy' }} />
              <Tab label='Registration' sx={{ textTransform: 'none', fontWeight: 'bold', color: 'navy' }} />
            </Tabs>

            <TabPanel value={value} index={0}>
              <UserLogin />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <UserReg />
            </TabPanel>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default LogReg;

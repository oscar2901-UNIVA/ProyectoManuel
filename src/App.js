import React, { useState } from 'react';
import './App.css';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Menu from './components/Dashboard/Menu';
import Impresoras from './components/Dashboard/Impresoras';
import Categorias from './components/Dashboard/Categorias';
import Tickets from './components/Dashboard/Tickets';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(<Login />);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleComponentChange = (component) => {
    setSelectedComponent(component);
    setDrawerOpen(false);
  };

  return (
    <div className="App" style={{ height: '100%', width:"100%" }}>
      <AppBar position="static" >
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Fish
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: '20px', height: '50%' }}>
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={handleDrawerToggle}
        >
          <List>
            <ListItem button onClick={() => handleComponentChange(<Login />)}>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button onClick={() => handleComponentChange(<Dashboard />)}>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={() => handleComponentChange(<Orders />)}>
              <ListItemText primary="Orders" />
            </ListItem>
            <ListItem button onClick={() => handleComponentChange(<Menu />)}>
              <ListItemText primary="Menu" />
            </ListItem>
            <ListItem button onClick={() => handleComponentChange(<Impresoras />)}>
              <ListItemText primary="Impresoras" />
            </ListItem>
            <ListItem button onClick={() => handleComponentChange(<Categorias />)}>
              <ListItemText primary="Categorías" />
            </ListItem>
            <ListItem button onClick={() => handleComponentChange(<Tickets />)}>
              <ListItemText primary="Tickets" />
            </ListItem>
          </List>
        </Drawer>

        <Container >
          {selectedComponent}
        </Container>
      </Container>
    </div>
  );
}

export default App;

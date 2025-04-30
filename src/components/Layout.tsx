import React from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, useMediaQuery, useTheme, Container, Divider } from '@mui/material';
import { Menu as MenuIcon, Dashboard as DashboardIcon, People as PeopleIcon, AccountBalance as AccountBalanceIcon } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Gastos Comunes', icon: <AccountBalanceIcon />, path: '/common-expenses' },
    { text: 'Gastos Persona 1', icon: <PeopleIcon />, path: '/person1-expenses' },
    { text: 'Gastos Persona 2', icon: <PeopleIcon />, path: '/person2-expenses' },
  ];

  const drawer = (
    <Box sx={{ 
      width: 250, 
      backgroundColor: '#1E1E1E',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Toolbar sx={{ 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '64px',
      }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Billulla
        </Typography>
      </Toolbar>
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <Link
            key={item.text}
            to={item.path}
            style={{
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <ListItem
              sx={{
                backgroundColor: location.pathname === item.path ? 'rgba(124, 77, 255, 0.16)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                },
                borderRadius: 1,
                mx: 1,
                my: 0.5,
              }}
            >
              <ListItemIcon sx={{ 
                color: location.pathname === item.path ? 'primary.main' : 'inherit',
                minWidth: '40px',
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  sx: {
                    fontWeight: location.pathname === item.path ? 600 : 400,
                  }
                }}
              />
            </ListItem>
          </Link>
        ))}
      </List>
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          © 2024 Billulla
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - 250px)` },
          ml: { sm: '250px' },
          backgroundColor: '#1E1E1E',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600 }}>
            Control de Gastos
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: 250 }, flexShrink: { sm: 0 } }}
      >
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: 250,
                backgroundColor: '#1E1E1E',
                borderRight: '1px solid rgba(255, 255, 255, 0.12)',
              },
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: 250,
                backgroundColor: '#1E1E1E',
                borderRight: '1px solid rgba(255, 255, 255, 0.12)',
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        )}
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: { sm: `calc(100% - 250px)` },
          mt: '64px',
          backgroundColor: '#121212',
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Container maxWidth="lg" sx={{ flexGrow: 1 }}>
          {children}
        </Container>
        <Box component="footer" sx={{ 
          py: 3, 
          mt: 'auto',
          textAlign: 'center',
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
        }}>
          <Typography variant="body2" color="text.secondary">
            © 2024 Billulla - Control de Gastos
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout; 
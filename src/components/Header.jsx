import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
//import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
//import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { useAuth0 } from '@auth0/auth0-react';

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = (theme) => ({
    secondaryBar: {
          zIndex: 0,
        },
    menuButton: {
          marginLeft: -theme.spacing(1),
        },
    iconButtonAvatar: {
          padding: 4,
        },
    link: {
          textDecoration: 'none',
          color: lightColor,
          '&:hover': {
                  color: theme.palette.common.white,
                },
        },
    button: {
          borderColor: lightColor,
        },
});

const LoginButton = () => {
  const {loginWithRedirect } = useAuth0();
  return (
    <Button
      variant="outlined"
      onClick={() => loginWithRedirect()}>Log In</Button>
  );
}

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <Button
      variant="outlined"
       onClick={() => logout({ returnTo: window.location.origin })}>Log Out</Button>
  );
}

const ProfileButton = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return '...';
  }
  return (
    <div>
    {isAuthenticated ?
      <div>
      <LogoutButton />
      <IconButton color="inherit">
        <Avatar src={user.picture} alt={user.name} />
      </IconButton>
      </div>
    :
    <LoginButton />
    }
    </div>
  );

}

function Header(props) {
    const { classes, onDrawerToggle } = props;

    return (
      <React.Fragment>
        <AppBar color="primary" position="sticky" elevation={0}>
          <Toolbar>
            <Grid container spacing={1} alignItems="center">
              <Hidden smUp>
                <Grid item>
                  <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={onDrawerToggle}
                  className={classes.menuButton}
                  >
                    <MenuIcon />
                  </IconButton>
                </Grid>
              </Hidden>
              <Grid item xs />
              <Grid item>
                <ProfileButton />
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </React.Fragment>
        );
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    onDrawerToggle: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);

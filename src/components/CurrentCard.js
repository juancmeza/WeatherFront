import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import LibraryAddOutlinedIcon from '@material-ui/icons/LibraryAddOutlined';
import IconButton from '@material-ui/core/IconButton';
import { Row, Item } from '@mui-treasury/components/flex';



const useStyles = makeStyles((theme) => ({
  true: {
    width: '85%',
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
      width: '90%',
      marginRight: theme.spacing(2),
    },
    
    [theme.breakpoints.up('md')]: {
      width: '80%',
      marginRight: theme.spacing(-3),
    },
    borderRadius: 12,
    padding: 12,
    background: 'linear-gradient(#ff8503, #ffb514)',
    color: 'rgb(255,255,255)',
    boxShadow: '0 5px 10px 0 rgba(10,10,10,0.82)',
  },
  false: {
    width: '85%',
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
      width: '50%',
    },
    [theme.breakpoints.up('md')]: {
      width: '40%',
      // marginRight: theme.spacing(1),    
    },
    borderRadius: 12,
    padding: 12,
    background: 'linear-gradient(#ff8503, #ffb514)',
    color: 'rgb(255,255,255)',
    boxShadow: '0 5px 10px 0 rgba(10,10,10,0.82)',
  },
  action: {
    backgroundColor: '#ffb514',
    color: '#fff',
    marginBottom: -100,
    marginTop: -80,
    boxShadow: '0 1px 4px 0 rgba(0,0,0,0.12)',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#000',
    },
  },
  avatar: {
    width: 125,
    height: 125,
    margin: 'auto',
    marginTop: -40,
    marginBottom: -40,
  },
  info: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  box: {
    marginBottom: -10,
  },
  info2: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  }
}));

export const CurrentCard = React.memo(function MusicCard({current, selected, latitude, longitude, user_id, addToUserLocations, user_locations}) {
  const styles = useStyles();
  const shadowStyles = useOverShadowStyles({ inactive: true });

  return (
    user_locations.length ? 
    <Card className={cx(styles.true, shadowStyles.root)}>
      <Row>
        <Item position={'right'}>
          {user_locations.filter(loc => loc.latitude === latitude && loc.longitude === longitude).length ?
            null
            :
            <IconButton className={styles.action}>
              <LibraryAddOutlinedIcon onClick={() => addToUserLocations(selected, latitude, longitude, user_id)}></LibraryAddOutlinedIcon>
            </IconButton>
          }
        </Item>
      </Row>
      <Avatar className={styles.avatar} src={`http://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`} />
      <CardContent>
        <Box className={styles.box}>
          <h2>
            {selected}
          </h2>
          <Divider light />
          <p className={styles.info2}>
            {current.weather[0].description}
          </p>
          <p className={styles.info}>
            Temp: {Math.round(current.temp)}° F
          </p>
          <p className={styles.info}>
            Feels Like: {Math.round(current.feels_like)}° F
          </p>
          <p className={styles.info}>
            Humidity: {current.humidity}%
          </p>
          <p className={styles.info}>
            Wind: {Math.round(current.wind_speed)} mph
          </p>
        </Box>
      </CardContent>
    </Card> 
    :
    <Card className={cx(styles.false, shadowStyles.root)}>
      <Row>
        <Item position={'right'}>
          <IconButton className={styles.action}>
            <LibraryAddOutlinedIcon onClick={() => addToUserLocations(selected, latitude, longitude, user_id)}></LibraryAddOutlinedIcon>
          </IconButton>
        </Item>
      </Row>
      <Avatar className={styles.avatar} src={`http://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`} />
      <CardContent>
        <Box className={styles.box}>
          <h2>
            {selected}
          </h2>
          <Divider light />
          <p className={styles.info2}>
            {current.weather[0].description}
          </p>
          <p className={styles.info}>
            Temp: {Math.round(current.temp)}° F
          </p>
          <p className={styles.info}>
            Feels Like: {Math.round(current.feels_like)}° F
          </p>
          <p className={styles.info}>
            Humidity: {current.humidity}%
          </p>
          <p className={styles.info}>
            Wind: {Math.round(current.wind_speed)} mph
          </p>
        </Box>
      </CardContent>
    </Card>
  );
});
export default CurrentCard
import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    margin: 'auto',
    borderRadius: 12,
    padding: 12,
    background: 'linear-gradient(#ffb514, #ff8503)',
    color: 'rgb(255,255,255)',
    boxShadow: '0 5px 10px 0 rgba(10,10,10,0.82)',
  },
  avatar: {
    width: 125,
    height: 125,
    margin: 'auto',
    marginTop: -20,
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

export const CurrentCard = React.memo(function MusicCard({current, selected}) {
  const styles = useStyles();
  const textCardContentStyles = useN04TextInfoContentStyles();
  const shadowStyles = useOverShadowStyles({ inactive: true });
  return (
    <Card className={cx(styles.root, shadowStyles.root)}>
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
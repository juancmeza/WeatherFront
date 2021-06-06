import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import CallMadeIcon from '@material-ui/icons/CallMade';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { Row, Item } from '@mui-treasury/components/flex';
import { Info, InfoTitle, InfoSubtitle } from '@mui-treasury/components/info';
import { useTutorInfoStyles } from '@mui-treasury/styles/info/tutor';
import { useSizedIconButtonStyles } from '@mui-treasury/styles/iconButton/sized';
import { useDynamicAvatarStyles } from '@mui-treasury/styles/avatar/dynamic';

const useStyles = makeStyles((theme) => ({
  row: {
    marginLeft: theme.spacing(0.25),
  },
  action: {
    backgroundColor: '#ffb514',
    marginLeft: theme.spacing(0.5),
    boxShadow: '0 1px 4px 0 rgba(0,0,0,0.12)',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#000',
    },
  },
  temp: {
    color: '#fff',
    fontSize: 14,
  },
  city: {
    color: '#fff',
  }
}));

export const LocationCard = React.memo(function TutorCard({data, updateSelectedCity, deleteUserLocation}) {
  const styles = useStyles();
  const iconBtnStyles = useSizedIconButtonStyles({ padding: 6 });
  const avatarStyles = useDynamicAvatarStyles({ radius: 12, size: 48 });
  return (
    <Row p={1.5} gap={1} bgcolor={'linear-gradient(#ffb514, #ff8503)'} borderRadius={16} className={styles.row}>
      <Item>
        <Avatar
          classes={avatarStyles}
          src={
            `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`
          }
        />
      </Item>
      <Info position={'middle'} useStyles={useTutorInfoStyles}>
        <InfoTitle className={styles.city}>{data.location.city}</InfoTitle>
        <InfoSubtitle className={styles.temp}>Temp: {Math.round(data.current.temp)}° F</InfoSubtitle>
      </Info>
      <Item mr={1} position={'right'}>
        <IconButton className={styles.action} classes={iconBtnStyles} position={'left'}
                    onClick={() => updateSelectedCity(data.current, data.daily, data.location.city, data.location.latitude, data.location.longitude)}>
          <CallMadeIcon/>
        </IconButton>
        <IconButton className={styles.action} classes={iconBtnStyles} position={'right'} onClick={() => deleteUserLocation(data.location)}>
          <DeleteForeverOutlinedIcon/>
        </IconButton>
      </Item>
    </Row>
  );
});

export default LocationCard
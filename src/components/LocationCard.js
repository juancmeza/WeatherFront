import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import { Row, Item } from '@mui-treasury/components/flex';
import { Info, InfoTitle, InfoSubtitle } from '@mui-treasury/components/info';
import { useTutorInfoStyles } from '@mui-treasury/styles/info/tutor';
import { useSizedIconButtonStyles } from '@mui-treasury/styles/iconButton/sized';
import { useDynamicAvatarStyles } from '@mui-treasury/styles/avatar/dynamic';

const useStyles = makeStyles(() => ({
  action: {
    backgroundColor: '#ffb514',
    boxShadow: '0 1px 4px 0 rgba(0,0,0,0.12)',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#000',
    },
  },
}));

export const LocationCard = React.memo(function TutorCard({data, location}) {
  const styles = useStyles();
  const iconBtnStyles = useSizedIconButtonStyles({ padding: 6 });
  const avatarStyles = useDynamicAvatarStyles({ radius: 12, size: 48 });
  debugger
  return (
    <Row p={1.5} gap={2} bgcolor={'linear-gradient(#ffb514, #ff8503)'} borderRadius={16}>
      <Item>
        <Avatar
          classes={avatarStyles}
          src={
            `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`
          }
        />
      </Item>
      <Info position={'middle'} useStyles={useTutorInfoStyles}>
        <InfoTitle>{location.city}</InfoTitle>
        <InfoSubtitle>{data.current.temp}</InfoSubtitle>
      </Info>
      <Item ml={1} position={'middle'}>
        <IconButton className={styles.action} classes={iconBtnStyles}>
          <Add />
        </IconButton>
        <IconButton className={styles.action} classes={iconBtnStyles}>
          <Add />
        </IconButton>
      </Item>
    </Row>
  );
});

export default LocationCard
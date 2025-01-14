import axios from 'axios';
import React from 'react';
import styles from '../connect/connections.module.css'
import { Context } from '../context';
import { Paper, Button } from '@material-ui/core';

interface Props {
  username: string;
  first: string;
  last: string;
  avatar: string;
  sent: boolean;
}

const UserCard = ({ username, first, last, avatar, sent }: Props) => {
  const global = React.useContext(Context);

  const [friend, setFriend] = React.useState(false)

  const addFriend = async (friend: string) => {
    setFriend(true);
    await axios({
      url: `${window.location.origin}/api/addUser`,
      method: 'post',
      data: {
        me: global.userData.username,
        them: friend,
      },
    });
    return;
  }
 // ------------------LEAVE FOR TESTING----------------
  // const removeFriend = async (friend:string) => {
  //   setFriend(false);
  //   await axios({
  //     url: `${window.location.origin}/api/deleteFriend`,
  //     method: 'post',
  //     data: {
  //       me: global.userData.username,
  //       them: friend,
  //     },

  //   });
  //   return;
  // }

  return (
    <Paper
      elevation={2}
      className={styles.card}
      key={username}
    >
      <div className={styles.left}>
        <img className={styles.img} src={avatar} />
        <div>
          <div className={styles.username}>@{username}</div>
          <div>{first} {last}</div>
        </div>
      </div>
      {friend || sent ?
        <Button
          variant="contained"
          color="secondary"
          disabled className={styles.button}
          value={username}
        >
          Sent
        </Button>
        :
        <Button
          variant="contained"
          color="secondary"
          className={styles.button}
          value={username}
          onClick={() => addFriend(username)}
        >
          Request
        </Button>
        }
    </Paper>
  )
}

export default UserCard;

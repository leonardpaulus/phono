import { FriendListProps } from '../../lib/types';
import styles from './FriendsCardList.module.css';

export default function FriendsCardList({
  friendsList,
}: FriendListProps): JSX.Element {
  return (
    <>
      {friendsList.map((friend) => (
        <article
          className={styles.friendsCard}
          key={friend.id}
          onClick={() => console.log(friend.username)}
        >
          <img className={styles.avatar} src={friend.avatar} />
          <div className={styles.username}>
            <h2>{friend.username}</h2>
          </div>
        </article>
      ))}
    </>
  );
}

import { FriendListProps } from '../../lib/types';
import styles from './FriendsCardList.module.css';

export default function FriendsCardList({
  friendsList,
  showFriendsCollection,
}: FriendListProps): JSX.Element {
  return (
    <>
      {friendsList.map((friend) => (
        <article
          className={styles.friendsCard}
          key={friend.id}
          onClick={() => showFriendsCollection(friend.username)}
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

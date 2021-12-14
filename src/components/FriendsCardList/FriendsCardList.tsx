import { FriendListProps } from '../../lib/types';
import styles from './FriendsCardList.module.css';
import { useTransition, animated } from 'react-spring';

export default function FriendsCardList({
  friendsList,
  showFriend,
}: FriendListProps): JSX.Element {
  const friendsCardListTransition = useTransition(friendsList, {
    from: { y: 800, opacity: 0 },
    enter: { y: 0, opacity: 1 },
    leave: { y: 800, opacity: 0 },
    trail: 30,
  });

  return (
    <div className={styles.friendCards}>
      {friendsCardListTransition(
        (style, friend) =>
          friend && (
            <animated.article
              style={style}
              className={styles.friendsCard}
              key={friend.id}
              onClick={() => showFriend(friend.username)}
            >
              <img className={styles.avatar} src={friend.avatar} alt={''} />
              <div className={styles.username}>
                <h2>{friend.username}</h2>
              </div>
            </animated.article>
          )
      )}
    </div>
  );
}

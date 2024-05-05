import { Button, Modal, Table } from "flowbite-react";
import { useState } from "react";
import styles from './FriendsListModal.module.scss';
import ProfileImg from '../../assets/images/profile-img.jpeg';
import LoadingSpinner from "../LoadingSpinner";


export const modes = {
  FOLLOWERS: 'followers',
  FOLLOWING: 'following'
}

export function FriendsListModal({ show, onClose, mode, friends, isLoading }) {

  let list = [];
  if (friends && mode === modes.FOLLOWING) list = friends.following;
  else if (friends && mode === modes.FOLLOWERS) { list = friends.followers; }

  return (
    <Modal dismissible {...{ show, onClose }} size='sm'>
      {isLoading ?
        <LoadingSpinner /> : <>
          <h6 className={styles.modalTitle}>{mode === modes.FOLLOWERS ? 'Followers' : 'Following'}</h6>
          <div className={styles.modalBody}>

            {list.map((item) => {
              const fullName = `${item.firstName} ${item.lastName}`

              return <div className={styles.row}>
                <span>
                  <span className={styles.profilePictureWrap}>
                    <img src={item.imgUrl || ProfileImg} alt='Profile Image' />
                  </span>
                  <span className={styles.fullName}>{fullName}</span>
                </span>
                <span className={styles.actions}>
                  <Button size='xs' color='gray'>{mode === modes.FOLLOWERS ? 'Remove' : 'Unfollow'}</Button>
                </span>
              </div>;
            })}

          </div>
        </>
      }
    </Modal>
  );
}

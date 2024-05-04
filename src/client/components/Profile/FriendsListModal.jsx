import { Button, Modal, Table } from "flowbite-react";
import { useState } from "react";
import styles from './FriendsListModal.module.scss';
import ProfileImg from '../../assets/images/profile-img.jpeg';


export const modes = {
  FOLLOWERS: 'followers',
  FOLLOWING: 'following'
}

export function FriendsListModal({ show, onClose, mode }) {

  return (
    <Modal dismissible {...{ show, onClose }} size='sm'>
      <h6 className={styles.modalTitle}>{mode === modes.FOLLOWERS ? 'Followers' : 'Following'}</h6>
    
      <div className={styles.modalBody}>

        <div className={styles.row}>
          <span>
            <span className={styles.profilePictureWrap}>
              <img src={ProfileImg} alt='Profile Image' />
            </span>
            <span className={styles.fullName}>yahav nir</span>
          </span>
          <span className={styles.actions}>
            <Button size='xs' color='gray' {...({className:'button'})}>{mode === modes.FOLLOWERS ? 'Followers' : 'Following'}</Button>
          </span>
        </div>

        <div className={styles.row}>
          <span>
            <span className={styles.profilePictureWrap}>
              <img src={ProfileImg} alt='Profile Image' />
            </span>
            <span className={styles.fullName}>yahav nir</span>
          </span>
          <span className={styles.actions}>
            <Button size='xs' color='gray' {...({className:'button'})}>{mode === modes.FOLLOWERS ? 'Followers' : 'Following'}</Button>
          </span>
        </div>

        <div className={styles.row}>
          <span>
            <span className={styles.profilePictureWrap}>
              <img src={ProfileImg} alt='Profile Image' />
            </span>
            <span className={styles.fullName}>yahav nir</span>
          </span>
          <span className={styles.actions}>
            <Button size='xs' color='gray' {...({className:'button'})}>{mode === modes.FOLLOWERS ? 'Followers' : 'Following'}</Button>
          </span>
        </div>

      </div>

    </Modal>
  );
}

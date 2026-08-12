import styles from "./AvatarImg.module.css";

export default function AvatarImg({user}) {
    return user.avatar_url ? (
        <img src={user.avatar_url} alt="avatar" className={styles.img}/>
    ) : (
        <img src="/default_user_photo.png" alt="default avatar" className={styles.img}/>
    )
}
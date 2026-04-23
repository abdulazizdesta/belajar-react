import styles from './Card.module.css'

export default function Card() {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Profil Saya</h2>
      <p className={styles.subtitle}>Developer React</p>
    </div>
  )
}
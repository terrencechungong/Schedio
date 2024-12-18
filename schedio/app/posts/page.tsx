"use client"
import FullCalendarWrapper from './calandertest'
// app/schedule/page.tsx
import styles from './test.module.scss'

export default function PostPage() {

  return (
    <FullCalendarWrapper />
  )

  // return (
  //   <div className={styles.gridContainer}>
  //     <div className={`${styles.gridItem} ${styles.item1}`}>Event 1</div>
  //     <div className={`${styles.gridItem} ${styles.item2}`}>Event 2</div>
  //     <div className={`${styles.gridItem} ${styles.item3}`}>Event 3</div>
  //   </div>
  // );
}

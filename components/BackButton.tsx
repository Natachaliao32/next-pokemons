
import { ArrowLeftOutlined } from '@ant-design/icons'
import Link from 'next/link'
import styles from '../styles/BackButton.module.css'

export const BackButton = () => (
  <Link href="/">
    <a>
      <ArrowLeftOutlined width={10} height={10} className={styles.icon} />
      Back
    </a>
  </Link>
)
import React from 'react'
import Link from 'next/link'
import styles from './Header.module.css'
import SearchFrom from './SearchFrom'

const Header = () => {
  return (
    <header className={styles.header}>
        <div className={styles.logo}>
            <Link href="/"><a>React Events</a></Link>
        </div>

        <SearchFrom />

        <nav>
            <ul>
                <li>
                    <Link href="/events"><a>Events</a></Link>
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default Header
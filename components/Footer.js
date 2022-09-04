import React from 'react'
import styles from './Footer.module.css'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className={styles.footer}>
        <p>Copyright &copy; React Events 2022</p>
        <p><Link href='/about'><a >About this project</a></Link></p>
    </footer>
  )
}

export default Footer
import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import Showcase from './Showcase'

import classes from './Layout.module.css'

const Layout = ({title, keywords, description, children}) => {
  const router = useRouter();
  return (
    <div>
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
        </Head>
        <Header />
        { router.pathname === '/' && <Showcase />}
        <div className={classes.container}>
            {children}
        </div>

        <Footer />
        
    </div>
  )
}

export default Layout

Layout.defaultProps = {
    title:"React events",
    description: "Latest events on React"
}
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import AuthHOC from '../components/AuthHOC'
import { useAppStore } from '../stores/app-store'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const app = useAppStore();

  return (
    <div className={styles.container}>
      <Head>
        <title>Auth Demo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome {app.username} !
        </h1>
        <br/>
        <br/>

        <h2>
          Roles:
        </h2>
        <p>
          {app.roles.map(role => <div>
            {role}
          </div>)}
        </p>
        <br/>

        <Link href="/resource-1">
          Resource 1
        </Link>
        <p>default, admin, super-admin</p>
        <br/>
        
        <Link href="/resource-2">
          Resource 2
        </Link>
        <p>admin, super-admin</p>
        <br/>

        <Link href="/resource-3">
          Resource 3
        </Link>
        <p>super-admin</p>

        <p className={styles.description}>
          <Link href="/logout">
            <span style={{ color: 'blue', cursor: 'pointer' }}>
              Logout
            </span>
          </Link>
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default AuthHOC(Home, ['default', 'admin', 'super-admin']);

import { FC } from 'react'
import Head from 'next/head'
import { Navbar } from '../ui'

interface Props {
  children: React.ReactNode
  title?: string
}

export const Layout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || 'Pokemon App'}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='keywords' content={`${title}, pokemon, pokedex`} />
      </Head>

      <Navbar />

      <main
        style={{
          padding: '20px',
        }}>
        {children}
      </main>
    </>
  )
}

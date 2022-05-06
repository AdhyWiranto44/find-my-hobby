import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Head from 'next/head'
import { useEffect } from 'react'


function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
  }, [])

  useEffect(() => {
    import('../public/js/script')
  }, [])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Find My Hobby</title>
      </Head>

      <Component {...pageProps} />
    </>
  )
}

export default MyApp

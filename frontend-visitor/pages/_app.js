import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import Head from 'next/head'
import Script from 'next/script'
import { useEffect } from 'react'


function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap');
  }, []);

  useEffect(() => {
    import('../public/js/script');
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="personal, hobby, website, community, productivity" />
        <meta name="description" content="Find My Hobby adalah platform untuk mencari hobi baru." />
        <title>Find My Hobby - Cari kegemaranmu sekarang!</title>
      </Head>

      <Component {...pageProps} />
    </>
  )
}

export default MyApp

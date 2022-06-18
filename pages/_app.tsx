import '../styles/globals.css'
import type { AppProps } from 'next/app';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }: AppProps) {
  return <RecoilRoot>
    <Component {...pageProps} />
  </RecoilRoot>
}

export default MyApp

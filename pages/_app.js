import { GlobalStyle } from "../GlobalStyle";

export default function App({ Component, pageProps }) {
    return (
        <>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    );
}
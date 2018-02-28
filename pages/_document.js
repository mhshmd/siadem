import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  static getInitialProps (ctx) {
    return Document.getInitialProps(ctx)
  }

  render () {
    return (
     <html>
       <Head>
        <title>Politeknik Statistika STIS</title>
        <link rel='shortcut icon' type='image/x-icon' href='/static/favicon.ico' />
        <link href="/static/css/antd.min.css" rel="stylesheet" />
        <link href="/static/css/nprogress.css" rel="stylesheet" />
        <link rel="stylesheet" href="/_next/static/style.css" />
        <style>{`
          .reset-a, .reset-a:hover, .reset-a:visited, .reset-a:focus, .reset-a:active  {
            text-decoration: none;
            color: inherit;
            outline: 0;
          }
        `}</style>
       </Head>
       <body>
         <Main />
         <NextScript />
       </body>
     </html>
    )
  }
}
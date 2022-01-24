import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <div className={clsx('header', styles.header)}>
      <img src="img/logo.png" alt="BeAPI" />
      <h1>BeAPI</h1>
      <h2>Gametests could never be easier</h2>
      <div className={clsx('buttons', styles.buttons)}>
        <Link
            className="button button--primary button--lg"
            to="/docs/starting">
            Get Started
          </Link>
        <Link
            className="button button--secondary button--lg"
            to="/docs/starting">
            Learn More
          </Link>
      </div>
      <div className={clsx('content', styles.content)}>
        <div className={clsx('itemm', styles.itemm)}>
          <h3>😀 Simple Setup</h3>
          <p>Simple minimilistic setup utiizing NPM with next to no hastle!</p>
        </div>
        <div className={clsx('itemm', styles.itemm)}>
          <h3>🛠️ Rich Features</h3>
          <p>Adds polyfill for more helpful events and methods.</p>
        </div>
        <div className={clsx('itemm', styles.itemm)}>
          <h3>📦 Optimized Build</h3>
          <p>Precompiled BeAPI core modules leave a small footprint.</p>
        </div>
        <div className={clsx('itemm', styles.itemm)}>
          <h3>🔩 Share Your Creations</h3>
          <p>New module concepts, sharing your creations easier than ever.</p>
        </div>
        <div className={clsx('itemm', styles.itemm)}>
          <h3>🔑 Fully Typed APIs</h3>
          <p>Completely typed programmatic APIs with Typescript.</p>
        </div>
        <div className={clsx('itemm', styles.itemm)}>
          <h3>😎 Made By Cool People</h3>
          <p>Big thanks to <a href="https://github.com/Nobu-sh">Nobu-sh</a> and <a href="https://github.com/PMK744">PMK744</a>!</p>
        </div>
      </div>
    </div>
    // <header className={clsx('hero', styles.heroBanner)}>
    //   <div className={clsx('container', styles.container)}>
    //   </div>
    // </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const [show, setShow] = React.useState<boolean>(true)

  return (
    <Layout
      title={`Docs`}
      description="an advanced Minecraft Bedrock edition gametest wrapper.">
      <HomepageHeader />
    </Layout>
  );
}

import React from 'react';
import styles from './footer.module.scss';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.links}>
          <div>
            <img src="/assets/footer/01.svg" alt="Company Logotype" />
          </div>
          <div>
            <img src="/assets/footer/02.svg" alt="Company Logotype" />
          </div>
          <div>
            <img src="/assets/footer/03.svg" alt="Company Logotype" />
          </div>
          <div>
            <img src="/assets/footer/04.svg" alt="Company Logotype" />
          </div>
        </div>
        <div className={styles.reference}>
          Powered by{' '}
          <span className={styles.reference_gray}>
            Design Share | <Link style={{padding: '0 5px'}} target='_blank' href={'https://designshare.net/terms-conditions/'}>Terms</Link>
            <Link style={{padding: '0 5px'}} target='_blank' href={'https://designshare.net/privacy-policy/'}>Privacy</Link>
          </span>
        </div>
      </div>
    </footer>
  );
};
export default Footer;

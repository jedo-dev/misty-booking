import { Card, QRCode } from 'antd';
import appStoreImg from '../../assets/app-store.png';
import googleImg from '../../assets/google-play.png';
import styles from './styles.module.css';
const QrBlock = () => {
  return (
    <Card className={styles.card} variant='borderless'>
      <div className={styles.qrWrapper}>
        <div className={styles.qrCodeContainer}>
          {/*   //TODO:внести корректный qr */}
          <QRCode value={'https://misty.ru/'} size={90} bordered={false} />
        </div>
        <div className={styles.qrTextWrapper}>
          <span>Скачивай приложение, чтобы управлять бронированиями и получать бонусы!</span>
          <div className={styles.qrIconWrapper}>
            {/* //TODO:внести корректные ссылки */}
            <a href='ya.ru' target='_blank'>
              <img src={googleImg} />
            </a>
            <a href='ya.ru' target='_blank'>
              <img src={appStoreImg} />
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default QrBlock;

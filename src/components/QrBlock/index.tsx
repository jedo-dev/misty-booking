import { Card, QRCode } from 'antd';
import appStoreImg from '../../assets/app-store.png';
import googleImg from '../../assets/google-play.png';
import styles from './styles.module.css';
const QrBlock = () => {
  return (
    <Card className={styles.card} variant='borderless'>
      <div className={styles.qrWrapper}>
        <div className={styles.qrCodeContainer}>
 
          <QRCode value={'https://redirect.appmetrica.yandex.com/serve/100374109476641564?reserve=qr'} size={90} bordered={false} />
        </div>
        <div className={styles.qrTextWrapper}>
          <span>Скачивай приложение, чтобы управлять бронированиями и получать бонусы!</span>
          <div className={styles.qrIconWrapper}>
       
            <a href='https://play.google.com/store/apps/details?id=com.misty.client' target='_blank'>
              <img src={googleImg} />
            </a>
            <a href='https://apps.apple.com/ru/app/my-misty/id6446065720' target='_blank'>
              <img src={appStoreImg} />
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default QrBlock;

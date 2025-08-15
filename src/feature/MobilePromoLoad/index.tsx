import { Button } from 'antd';
import styles from './styles.module.css';
const MobilePromoLoad = () => {
    const handleGoToMain = () => {
    window.open('https://redirect.appmetrica.yandex.com/serve/100374109476641564?reserve=qr');
  };
  return (
    <div className={styles.wrapper} >
      <Button className={styles.btn} onClick={handleGoToMain} > Скачать приложение My Misty</Button>
      <span className={styles.text}>
        Скачивай приложение, чтобы управлять бронированиями и получать бонусы!
      </span>
    </div>
  );
};

export default MobilePromoLoad;

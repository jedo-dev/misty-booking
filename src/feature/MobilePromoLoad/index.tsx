import { Button } from 'antd';
import styles from './styles.module.css';
const MobilePromoLoad = () => {
  return (
    <div className={styles.wrapper}>
      <Button className={styles.btn}> Скачать приложение My Misty</Button>
      <span className={styles.text}>
        Скачивай приложение, чтобы управлять бронированиями и получать бонусы!
      </span>
    </div>
  );
};

export default MobilePromoLoad;

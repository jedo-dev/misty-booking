import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import styles from './styles.module.css';
const BookingUnavailable = () => {
  const handleGoToMain = () => {
    window.open('https://misty.ru');
  };

  return (
    <div className={styles.container}>
      <ExclamationCircleOutlined className={styles.icon} />
      <span className={styles.text}>
        Онлайн-бронирование временно недоступно, но скоро заработает
      </span>
      <Button type='primary' onClick={handleGoToMain} className={styles.button}>
        На главную
      </Button>
    </div>
  );
};

export default BookingUnavailable;

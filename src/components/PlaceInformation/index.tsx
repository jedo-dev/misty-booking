import { type InputProps } from 'antd';
import styles from './styles.module.css';
interface CustomInputProps extends InputProps {
  text: string;
  address: string;
}

const PlaceInformation = ({ text, address }: CustomInputProps) => {
  return (
    <div className={styles.wrapper}>
      <strong className={styles.name}>{text}</strong>
      <div className={styles.address}>{address}</div>
    </div>
  );
};

export default PlaceInformation;

import image from '../../assets/Logo.svg';
import styles from './styles.module.css';
const MistyBlock = ({ centred }: { centred?: boolean }) => {
  return (
    <div className={!centred ? styles.wrapper : styles.wrappedCenter}>
      <img src={image} style={{ width: !centred ? 'inherit' : 200 }} />
      <div className={ styles.text }>Экосистема проектов</div>
    </div>
  );
};

export default MistyBlock;

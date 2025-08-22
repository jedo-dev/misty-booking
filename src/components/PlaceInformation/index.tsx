import styles from './styles.module.css';
interface PlaceInformation {
  text: string;
  address: string;
  rules?: string;
}

const PlaceInformation = ({ text, address, rules }: PlaceInformation) => {
  return (
    <div className={styles.wrapper}>
      <strong className={styles.name}>{text}</strong>
      <div className={styles.address}>{address}</div>
      {rules && (
        <div className={styles.rules}>
          <span>Правила бронирования</span>
          <div>
            <span className={styles.ruleText} >
              {rules?.split('\n')?.map((el)=><span key={el}>{el}<br/></span>)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceInformation;

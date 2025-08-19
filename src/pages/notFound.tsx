import { Button } from 'antd';
import line from '../assets/Union.svg';
import MistyBlock from '../components/MistyBlock';
const NotFound = () => {
  const handleGoToMain = () => {
    window.open('https://misty.ru');
  };

  return (
    <div
      className='notfound-wrapper'
      style={{ background: `#000000 url(${line}) center/cover no-repeat` }}>
      <div
        style={{
          position: 'absolute',
          top: '80px',
        }}>
        <MistyBlock centred={true} />
      </div>

      <div className='notfound-text-wrapper'>
        <span className='notfound-text'>Страница не найдена</span>
        <Button style={{ width: 240 }} type='primary' onClick={handleGoToMain}>
          На главную
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

import { CheckOutlined } from '@ant-design/icons';
import { Form as AntForm, Card, notification, QRCode } from 'antd';
import { useState } from 'react';
import appStoreImg from './assets/app-store.png';
import googleImg from './assets/google-play.png';
import image from './assets/Logo.svg';
import img from './assets/Misty.png';
import { formStep } from './constant';
import Form from './feature/Form';
import FormResults from './feature/FormResults';

export const BookingForm = () => {
  const [form] = AntForm.useForm();
  const [step, setStep] = useState(formStep.initial);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.open({
      message: (
        <span className='notification-text'>
          <CheckOutlined />
          Бронирование создано
        </span>
      ),
      icon: null,
      closeIcon: null,
      placement: 'top',
    });
  };
  const onFinish = (values: unknown) => {
    console.log('Бронирование отправлено:', values);
    openNotification();
    setStep(formStep.finish);
  };
  const resetForm = () => {
    form.resetFields();
    setStep(formStep.initial);
  };
  return (
    <div
      className='main-wrapper'
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        width: '100vw',
        justifyContent: 'space-evenly',
        background: `url(${img}) center/cover no-repeat`,
        boxShadow: 'inset 0 100vh rgba(0, 0, 0, 0.7)',
      }}>
      {contextHolder}
      <div
        style={{
          top: 40,
          left: 40,
          color: 'white',
          fontSize: 24,
          fontWeight: 'bold',
        }}
        className='logo-placeholder'>
        <img src={image} />
        <div style={{ fontSize: 14, fontWeight: 'normal' }}>Экосистема проектов</div>
      </div>

      <div>
        <Card
          variant='borderless'
          className='border-card'
          bodyStyle={{ padding: 16 }}
          title={
            <>
              {step === formStep.initial && <h3 className='card-title'>Бронирование столика</h3>}
              {step === formStep.finish && (
                <h3 className='card-title'>Бронирование создано успешно</h3>
              )}
            </>
          }>
          <div style={{ marginBottom: 16 }}>
            <strong className='project-name'>Urban Winery</strong>
            <div className='project-address'>ул. Спартаковская, 3с1</div>
          </div>
          {step === formStep.initial && <Form form={form} onFinish={onFinish} />}
          {step === formStep.finish && (
            <FormResults {...form.getFieldsValue()} resetForm={resetForm} />
          )}
        </Card>
        {step === formStep.finish && (
          <Card className='gradient-border-card ' variant='borderless'>
            <div className='qr-wrapper'>
              <div className='qr-code-container'>
                {/*   //TODO:внести корректный qr */}
                <QRCode
                  value={'https://misty.ru/'}
                  size={90} // задаем явный размер
                  style={{ width: '100%', height: '100%' }}
                  bordered={false}
                />
              </div>
              <div className='qr-text-wrapper'>
                <span className='qr-text'>
                  Скачивай приложение, чтобы управлять бронированиями и получать бонусы!
                </span>
                <div className='qr-icon-wrapper'>
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
        )}
      </div>
    </div>
  );
};

export default BookingForm;

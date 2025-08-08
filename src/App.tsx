import { CheckOutlined } from '@ant-design/icons';
import { Form as AntForm, Card, notification } from 'antd';
import { useState } from 'react';

import image from './assets/Logo.svg';
import img from './assets/Misty.png';
import BookingUnavailable from './components/BookingUnavailable';
import PlaceInformation from './components/PlaceInformation';
import QrBlock from './components/QrBlock';
import { formStep } from './constant';
import Form from './feature/Form';
import FormResults from './feature/FormResults';
import MobilePromoLoad from './feature/MobilePromoLoad';

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
          <PlaceInformation text='Urban Winery' address='ул. Спартаковская, 3с1' />
          {step === formStep.initial && <Form form={form} onFinish={onFinish} />}
          {step === formStep.finish && (
            <>
              <FormResults {...form.getFieldsValue()} resetForm={resetForm} />
              <MobilePromoLoad />
            </>
          )}

          {step === formStep.error && <BookingUnavailable />}
        </Card>
        {step === formStep.finish && <QrBlock />}
      </div>
    </div>
  );
};

export default BookingForm;

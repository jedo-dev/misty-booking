import { Form as AntForm, Card } from 'antd';
import { useState } from 'react';
import image from './assets/Logo.svg';
import img from './assets/Misty.png';
import Form from './feature/Form';
import FormResults from './feature/FormResults';

enum formStep {
  initial = 'initial',
  finish = 'finish',
  error = 'error',
}

export const BookingForm = () => {
  const [form] = AntForm.useForm();
  const [step, setStep] = useState(formStep.initial);

  const onFinish = (values: unknown) => {
    console.log('Бронирование отправлено:', values);
    setStep(formStep.finish);
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

      <Card
        style={{ width: 400, backdropFilter: 'blur(8px)', background: '#121212' }}
        bodyStyle={{ padding: 16 }}>
        {step === formStep.initial && (
          <h3 style={{ textAlign: 'center', marginBottom: 16 }}>Бронирование столика </h3>
        )}
        {step === formStep.finish && (
          <h3 style={{ textAlign: 'center', marginBottom: 16 }}>Бронирование создано успешно </h3>
        )}
        <div style={{ marginBottom: 16 }}>
          <strong>Urban Winery</strong>
          <div style={{ fontSize: 12, color: '#999' }}>ул. Спартаковская, 3с1</div>
        </div>
        {step === formStep.initial && <Form form={form} onFinish={onFinish} />}
        {step === formStep.finish && <FormResults {...form.getFieldsValue()} />}
      </Card>
    </div>
  );
};

export default BookingForm;

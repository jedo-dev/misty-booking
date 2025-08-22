import { CheckOutlined, ExclamationOutlined } from '@ant-design/icons';
import { Form as AntForm, notification } from 'antd';
import { useState } from 'react';

import { useParams } from 'react-router';
import { baseUrl, saveBooking } from '../api';
import img from '../assets/Misty.png';
import BookingUnavailable from '../components/BookingUnavailable';
import CustomCard from '../components/CustomCard';
import MistyBlock from '../components/MistyBlock';
import PlaceInformation from '../components/PlaceInformation';
import QrBlock from '../components/QrBlock';
import { formStep } from '../constant';
import Form from '../feature/Form';
import FormResults from '../feature/FormResults';
import MobilePromoLoad from '../feature/MobilePromoLoad';
import useProject from '../hooks/useProject';

export const Main = () => {
  const { id } = useParams();
  const { data, loading, error } = useProject(id || '');
  const [form] = AntForm.useForm();
  const [step, setStep] = useState(formStep.initial);
  const [api, contextHolder] = notification.useNotification();
  const [Isloading, setLoading] = useState<boolean>(false);
  const openNotification = () => {
    api.open({
      className: 'basic-wrapper',
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

  const openErrorNotification = (text: string) => {
    api.open({
      className: 'error-wrapper',
      message: (
        <span className='notification-text-error'>
         
          {text}
        </span>
      ),
      icon: null,
      closeIcon: null,
      placement: 'top',
    });
  };

  function cleanPhoneNumber(phone: string) {
    if (!phone) return '';

    // Оставляем только + и цифры
    const cleaned = phone.replace(/[^\d+]/g, '');

    // Если есть плюс, оставляем его только в начале
    if (cleaned.includes('+')) {
      return '+' + cleaned.replace(/[^\d]/g, '');
    }

    return cleaned;
  }
 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (values: any) => {
    console.log(`values`, values);
    setLoading(true);
    try {
      // Формируем данные для API из значений формы
      console.log(`val`, values.date, values.time);
      const bookingData = {
        projectId: data?.projectId || '', // projectId из данных проекта
         startDate: `${values.time}.000Z`, // объединяем date и time
        //  startDate: '2025-08-21T10:00:00.000Z',
        guestCount: values.guests,
        clientPhone: cleanPhoneNumber(values.phone),
        clientName: values.name,
        comment: values.comment || '', // если комментарий не обязателен
      };

      // Вызываем API сохранения бронирования
      await saveBooking(bookingData);

      // Показываем уведомление об успехе
      openNotification();
      setStep(formStep.finish);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response.status == 400) {
       return openErrorNotification(error.response.data.message);
      }
      else{
           setStep(formStep.error);
      }

      console.error('Ошибка при сохранении бронирования:', error);
      // Можно добавить обработку ошибки, например показать уведомление об ошибке
    }
  };
  const resetForm = () => {
    form.resetFields();
    setStep(formStep.initial);
  };

  const obj = {
    [formStep.initial]: (
      <CustomCard title={<h3 className='card-title'>Бронирование столика</h3>}>
        <PlaceInformation
          rules={data?.rulesText || ''}
          text={data?.projectName || ''}
          address={data?.projectAddress || ''}
        />
        <Form
          guestCountEnabled={!!data?.guestCountEnabled}
          commentEnabled={!!data?.commentEnabled}
          form={form}
          Isloading={Isloading}
          daysOfWeek={data?.daysOfWeek}
          projectId={data?.projectId}
          onFinish={onFinish}
        />
      </CustomCard>
    ),
    [formStep.finish]: (
      <>
        <CustomCard title={<h3 className='card-title'>Бронирование создано успешно</h3>}>
          <PlaceInformation
            rules={data?.rulesText || ''}
            text={data?.projectName || ''}
            address={data?.projectAddress || ''}
          />
          <FormResults {...form.getFieldsValue()} resetForm={resetForm} />
          <MobilePromoLoad />
        </CustomCard>
        <QrBlock />
      </>
    ),
    [formStep.error]: (
      <CustomCard>
        <BookingUnavailable />
      </CustomCard>
    ),
  };
  if (error) {
    setStep(formStep.error);
  }
  return (
    <div
      className='main-wrapper'
      style={{
        background: `url(${ data?.backgroundUrl ?baseUrl + data?.backgroundUrl : img}) center/cover no-repeat`,
      }}>
      {contextHolder}
      <MistyBlock />
      {!loading && <div>{obj[step]}</div>}
    </div>
  );
};

export default Main;

import { CheckOutlined } from '@ant-design/icons';
import { Form as AntForm, notification } from 'antd';
import { useState } from 'react';

import dayjs from 'dayjs';
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (values: any) => {
    console.log(`values`,values)
    setLoading(true);
    try {
      // Формируем данные для API из значений формы
      console.log(`val`, values.date, values.time);
      const bookingData = {
        projectId: data?.projectId || '', // projectId из данных проекта
        startDate: `${dayjs(values.date).format('YYYY-MM-DD')}T${values.time}.000Z`, // объединяем date и time
        guestCount: values.guests,
        clientPhone: values.phone,
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
      setStep(formStep.error);
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
          background: `url(${baseUrl + data?.backgroundUrl || img}) center/cover no-repeat`,
        }}>
        {contextHolder}
        <MistyBlock />
        {!loading && <div>{obj[step]}</div>}
      </div>
   
  );
};

export default Main;

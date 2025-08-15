import { CalendarOutlined, ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Form as AntForm, Button, Checkbox, Col, Divider, Row, Select } from 'antd';

import type { FormInstance } from 'antd/lib';
import type { Dayjs } from 'dayjs';
import React from 'react';
import { fetchAvailableTimeSlots } from '../../api';
import CustomDatepicker from '../../components/CustomDatepicker';
import CustomInput from '../../components/CustomInput';
import CustomSelector from '../../components/CustomSelector';
import CustomTextArea from '../../components/CustomTextArea';
import type { DayOfWeek } from '../../constant';
const { Option } = Select;
export interface FormValues {
  agreement: boolean;
  comment?: string;
  date: Dayjs;
  guests: string;
  name: string;
  phone: string;
  time: string;
}
interface FormProps {
  form: FormInstance<unknown> | undefined;
  onFinish: (values: unknown) => void;
  daysOfWeek?: DayOfWeek[];
  projectId?: string;
}

const Form = ({ form, onFinish, daysOfWeek = [], projectId }: FormProps) => {
  const [options, setOptions] = React.useState<string[]>([]);
  return (
    <AntForm form={form} layout='vertical' onFinish={onFinish} requiredMark='optional'>
      <Row gutter={[8, 0]}>
        <Col span={24}>
          <AntForm.Item
            name='date'
            rules={[{ required: true, message: 'Пожалуйста, выберите дату' }]}>
            <CustomDatepicker
              projectId={projectId || ''}
              onChange={async (_date, formatted) => {
                const data = await fetchAvailableTimeSlots({
                  projectId: projectId || '',
                  date: !Array.isArray(formatted) ? formatted || '' : '',
                });

                setOptions(data);
              }}
              prefix={<CalendarOutlined style={{ color: '#9f9f9f' }} />}
              text='Дата'
              daysOfWeek={daysOfWeek}
              style={{ width: '100%' }}
            />
          </AntForm.Item>
        </Col>

        <Col span={12}>
          <AntForm.Item
            name='time'
            rules={[{ required: true, message: 'Пожалуйста, выберите время' }]}>
            <CustomSelector
              text='Время'
              style={{ width: '100%' }}
              prefix={<ClockCircleOutlined style={{ color: '#9f9f9f' }} />}>
              {options.map((el: string) => (
                <Option value={el}>{el}</Option>
              ))}
            </CustomSelector>
          </AntForm.Item>
        </Col>

        <Col span={12}>
          <AntForm.Item
            name='guests'
            rules={[{ required: true, message: 'Укажите количество гостей' }]}>
            <CustomSelector text='Гости' prefix={<UserOutlined style={{ color: '#9F9F9F' }} />}>
              {Array.from({length: 20}, (_v, i) => i).map((_el, index) => {
                return <Option value={index + 1}>{index + 1}</Option>;
              })}
            </CustomSelector>
          </AntForm.Item>
        </Col>
        <Divider style={{ margin: '20px 0' }} />
        <Col span={12}>
          <AntForm.Item
            name='name'
            rules={[{ required: true, message: 'Пожалуйста, введите имя' }]}>
            <CustomInput text='Имя' />
          </AntForm.Item>
        </Col>

        <Col span={12}>
          <AntForm.Item
            name='phone'
            rules={[{ required: true, message: 'Пожалуйста, введите телефон' }]}>
            <CustomInput text='Телефон' />
          </AntForm.Item>
        </Col>

        <Col span={24}>
          <AntForm.Item name='comment'>
            <CustomTextArea rows={3} text='Комментарий к бронированию' />
          </AntForm.Item>
        </Col>

        <Col span={24}>
          {' '}
          <AntForm.Item
            name='agreement'
            valuePropName='checked'
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('Необходимо согласие')),
              },
            ]}>
            <Checkbox>
              Я соглашаюсь с условиями{' '}
              <a href='/terms' style={{ color: '#ff5c01' }}>
                Пользовательского соглашения
              </a>{' '}
              и{' '}
              <a href='/privacy' style={{ color: '#ff5c01' }}>
                политикой конфиденциальности
              </a>
            </Checkbox>
          </AntForm.Item>
        </Col>
      </Row>

      <AntForm.Item>
        <Button type='primary' htmlType='submit' block>
          Забронировать
        </Button>
      </AntForm.Item>
    </AntForm>
  );
};

export default Form;

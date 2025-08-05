import { CalendarOutlined, ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Col, Divider, Form, Row, Select } from 'antd';
import image from './assets/Logo.svg';
import img from './assets/Misty.png';
import CustomDatepicker from './components/CustomDatepicker';
import CustomInput from './components/CustomInput';
import CustomSelector from './components/CustomSelector';
import CustomTextArea from './components/CustomTextArea';
const { Option } = Select;

export const BookingForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values: unknown) => {
    console.log('Бронирование отправлено:', values);
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
        <h3 style={{ textAlign: 'center', marginBottom: 16 }}>Бронирование столика</h3>
        <div style={{ marginBottom: 16 }}>
          <strong>Urban Winery</strong>
          <div style={{ fontSize: 12, color: '#999' }}>ул. Спартаковская, 3с1</div>
        </div>
        <Form form={form} layout='vertical' onFinish={onFinish} requiredMark='optional'>
          <Row gutter={[8, 0]}>
            <Col span={24}>
              <Form.Item
                name='date'
                rules={[{ required: true, message: 'Пожалуйста, выберите дату' }]}>
                <CustomDatepicker
                  prefix={<CalendarOutlined style={{ color: '#9f9f9f' }} />}
                  text='Дата'
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name='time'
                rules={[{ required: true, message: 'Пожалуйста, выберите время' }]}>
                <CustomSelector
                  text='Время'
                  style={{ width: '100%' }}
                  prefix={<ClockCircleOutlined style={{ color: '#9f9f9f' }} />}>
                  <Option value='1'>1</Option>
                  <Option value='2'>2</Option>
                  <Option value='3'>3</Option>
                  <Option value='4'>4</Option>
                  <Option value='5+'>5+</Option>
                </CustomSelector>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name='guests'
                rules={[{ required: true, message: 'Укажите количество гостей' }]}>
                <CustomSelector text='Гости' prefix={<UserOutlined style={{ color: '#9F9F9F' }} />}>
                  <Option value='1'>1</Option>
                  <Option value='2'>2</Option>
                  <Option value='3'>3</Option>
                  <Option value='4'>4</Option>
                  <Option value='5+'>5+</Option>
                </CustomSelector>
              </Form.Item>
            </Col>
            <Divider style={{ margin: '20px 0' }} />
            <Col span={12}>
              <Form.Item
                name='name'
                rules={[{ required: true, message: 'Пожалуйста, введите имя' }]}>
                <CustomInput text='Имя' />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name='phone'
                rules={[{ required: true, message: 'Пожалуйста, введите телефон' }]}>
                <CustomInput text='Телефон' />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name='comment'>
                <CustomTextArea rows={3} text='Комментарий к бронированию' />
              </Form.Item>
            </Col>

            <Col span={24}>
              {' '}
              <Form.Item
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
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type='primary' htmlType='submit' block>
              Забронировать
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default BookingForm;

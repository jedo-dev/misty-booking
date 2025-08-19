import { CalendarOutlined, CommentOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Row, Space } from 'antd';
import type { FormValues } from '../Form';

interface CustomInputProps extends FormValues {
  text?: string;
  resetForm: () => void;
}

const FormResults = ({ comment, date, name, phone, time, resetForm }: CustomInputProps) => {
  return (
    <Row gutter={[8, 8]} className='finish-form'>
      <Col span={24}>
        <Space className='finish-text-wrapper'>
          <UserOutlined style={{ color: '#9F9F9F' }} />
          <span>{name},</span>
          <span>{phone}</span>
        </Space>
      </Col>

      <Col span={24}>
        <Space className='finish-text-wrapper'>
          <CalendarOutlined style={{ color: '#9f9f9f' }} />
          <span>{date.format('dddd, D MMMM')}</span>
          <span>в</span>
          <span>{time.replace(/:00$/, '')}</span>
        </Space>
      </Col>
      {
       comment&& <Col span={24} style={{ marginBottom: '16px' }}>
        <Space className='finish-text-wrapper'>
          <CommentOutlined style={{ color: '#9f9f9f' }} />
          <span> {comment}</span>
        </Space>
      </Col>
      }

      <Col span={24}>
        <Button
          size='large'
          onClick={() => {
            resetForm();
          }}
          block
          type='primary'>
          Создать новое бронирование
        </Button>
      </Col>
    </Row>
  );
};

export default FormResults;

import { CalendarOutlined, CommentOutlined, UserOutlined } from '@ant-design/icons';
import type { FormValues } from '../Form';
import { Button } from 'antd';

interface CustomInputProps extends FormValues {
  text?: string;
}

const FormResults = ({  comment, date, name, phone, time }: CustomInputProps) => {
  return (
    <div>
      <div>
        <span>
          <UserOutlined style={{ color: '#9F9F9F' }} />
          {name} , {phone}
        </span>
      </div>

      <div>
        <span>
          <CalendarOutlined style={{ color: '#9f9f9f' }} />
          {date.format('dddd, D MMMM')} в {time}
        </span>
      </div>

      <div>
        <span>
          <CommentOutlined style={{ color: '#9f9f9f' }} />
          {comment}
        </span>
      </div>
      <Button block type='primary'>Создать новое бронирование</Button>
    </div>
  );
};

export default FormResults;

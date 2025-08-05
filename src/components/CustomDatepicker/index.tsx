import { DatePicker, type DatePickerProps } from 'antd';

import locale from 'antd/lib/date-picker/locale/ru_RU';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/ru'; // для русской локализации
import updateLocale from 'dayjs/plugin/updateLocale';
import React from 'react';

dayjs.locale('ru');
dayjs.extend(updateLocale);

// Настраиваем формат дней недели
dayjs.updateLocale('ru', {
  weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
});

interface CustomDatePickerProps extends DatePickerProps {
  text: string;
}

const CustomDatepicker = ({ text, ...rest }: CustomDatePickerProps) => {
  const [open, setOpen] = React.useState(false);
  const hasValue = !!rest.value;

  // Форматируем дату для отображения
  const formatDate = (date: Dayjs) => {
    return date.format('dddd, D MMMM'); // Например: "Вторник, 7 июня"
  };

  return (
    <div className='input-container'>
      <div
        className={`custom-placeholder ${hasValue || open ? 'has-value' : ''}`}
        style={{ left: '30px' }}>
        {text} <span className='redmark'>*</span>
      </div>
      <DatePicker
        {...rest}
        size='large'
        placeholder=' '
        onOpenChange={(bool) => {
          setOpen(bool);
        }}
        style={{ height: '56px', width: '100%' }}
        suffixIcon={null}
        locale={locale}
        format={formatDate}
        showToday={false}
        allowClear={false}
        inputReadOnly // предотвращает предзаполнение при наведении
      />
    </div>
  );
};

export default CustomDatepicker;

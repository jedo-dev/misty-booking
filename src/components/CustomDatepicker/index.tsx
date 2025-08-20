import { DatePicker, type DatePickerProps } from 'antd';
import locale from 'antd/lib/date-picker/locale/ru_RU';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import updateLocale from 'dayjs/plugin/updateLocale';
import { useEffect, useState } from 'react';
import { fetchAvailableDates } from '../../api'; // Импортируем ваш API-клиент
import type { DayOfWeek } from '../../constant';

dayjs.locale('ru');
dayjs.extend(updateLocale);

dayjs.updateLocale('ru', {
  weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
});

interface CustomDatePickerProps extends DatePickerProps {
  text: string;
  daysOfWeek: DayOfWeek[];
  projectId: string; // Добавляем projectId для запроса
}

const dayOfWeekToDayjsMap: Record<DayOfWeek, number> = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
};

const CustomDatepicker = ({ text, daysOfWeek, projectId, ...rest }: CustomDatePickerProps) => {
  const [open, setOpen] = useState(false);
  const [disabledDates, setDisabledDates] = useState<string[]>([]);
  const [currentMonth, setCurrentMonth] = useState(dayjs().month() + 1);
  const [currentYear, setCurrentYear] = useState(dayjs().year());
  const hasValue = !!rest.value;
  const set= new Set()
  const allowedDays = daysOfWeek.map((day) => dayOfWeekToDayjsMap[day]);

  const loadDisabledDates = async (month: number, year: number) => {
    try {
      const response = await fetchAvailableDates({
        month,
        year,
        projectId,
      });
      setDisabledDates(response.disabledDates || []);
    } catch (error) {
      console.error('Failed to load disabled dates:', error);
      setDisabledDates([]);
    }
  };



  const cellRender: DatePickerProps<Dayjs>['cellRender'] = (current, info) => {
      if(currentYear!==dayjs(current).year()){
        set.clear()
      }
    set.add(dayjs(current)?.month() + 1)
   setCurrentYear(dayjs(current).year())
    console.log(`info`,set)
    if (info.type !== 'date') {
      return info.originNode;
    }
    if (typeof current === 'number' || typeof current === 'string') {
      return <div className='ant-picker-cell-inner'>{current}</div>;
    }
    const newMonth = current?.month() + 1;
    const newYear = current.year();
    console.log(`here`, newMonth, newYear);
    return <div className='ant-picker-cell-inner'>{current.date()}</div>;
  };

  const disabledDate = (current: Dayjs) => {
    if (current.isBefore(dayjs(), 'day')) {
      return true;
    }

    if (!allowedDays.includes(current.day())) {
      return true;
    }

    const dateString = current.format('YYYY-MM-DD');
    return disabledDates.includes(dateString);
  };

  const formatDate = (date: Dayjs) => {
    return date.format('dddd, D MMMM');
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
        onOpenChange={setOpen}
        onChange={(date) => {
          rest.onChange?.(date, date?.format('YYYY-MM-DD'));
        }}
        style={{ height: '56px', width: '100%' }}
        suffixIcon={null}
        locale={locale}
        format={formatDate}
        showToday={false}
        allowClear={false}
        inputReadOnly
        disabledDate={disabledDate}
        cellRender={cellRender}
      />
    </div>
  );
};

export default CustomDatepicker;

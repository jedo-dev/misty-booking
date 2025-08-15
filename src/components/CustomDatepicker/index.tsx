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

  const allowedDays = daysOfWeek.map((day) => dayOfWeekToDayjsMap[day]);

  // Загружаем доступные даты при изменении месяца/года
  useEffect(() => {
    const loadDisabledDates = async () => {
      try {
        const response = await fetchAvailableDates({
          month: currentMonth,
          year: currentYear,
          projectId,
        });
        console.log(`data`,response.disabledDates)
        // Предполагаем, что сервер возвращает массив дат в формате ISO
        setDisabledDates(response.disabledDates || []);
      } catch (error) {
        console.error('Failed to load disabled dates:', error);
        // В случае ошибки просто блокируем все даты
        setDisabledDates([]);
      }
    };

    loadDisabledDates();
  }, [currentMonth, currentYear, projectId]);

  // Функция для блокировки дат
  const disabledDate = (current: Dayjs) => {
    // Блокируем прошедшие даты
    if (current.isBefore(dayjs(), 'day')) {
      return true;
    }

    // Блокируем неразрешенные дни недели
    if (!allowedDays.includes(current.day())) {
      return true;
    }

    // Блокируем даты из disabledDates
  
    const dateString = current.format('YYYY-MM-DD');
    return disabledDates.includes(dateString);
  };

  // Обработчик изменения панели (месяца/года)
  const onPanelChange = (date: Dayjs, mode: unknown) => {
    if (mode === 'month' || mode === 'year') {
      const newMonth = date.month() + 1;
      const newYear = date.year();

      if (newMonth !== currentMonth || newYear !== currentYear) {
        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
      }
    }
  };

  // Форматируем дату для отображения
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
          if (date) {
            const newMonth = date.month() + 1;
            const newYear = date.year();
            setCurrentMonth(newMonth);
            setCurrentYear(newYear);
          }
          rest.onChange?.(date, date?.format('YYYY-MM-DD'));
        }}
        onPanelChange={onPanelChange}
        style={{ height: '56px', width: '100%' }}
        suffixIcon={null}
        locale={locale}
        format={formatDate}
        showToday={false}
        allowClear={false}
        inputReadOnly
        disabledDate={disabledDate}
      />
    </div>
  );
};

export default CustomDatepicker;

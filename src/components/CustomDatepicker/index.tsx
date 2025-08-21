import { DatePicker, Spin, type DatePickerProps } from 'antd';
import locale from 'antd/lib/date-picker/locale/ru_RU';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import updateLocale from 'dayjs/plugin/updateLocale';
import { useEffect, useState, useRef, useCallback } from 'react';
import { fetchAvailableDates } from '../../api';
import type { DayOfWeek } from '../../constant';

dayjs.locale('ru');
dayjs.extend(updateLocale);

dayjs.updateLocale('ru', {
  weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
});

interface CustomDatePickerProps extends DatePickerProps {
  text: string;
  daysOfWeek: DayOfWeek[];
  projectId: string;
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
  const [loadingMonths, setLoadingMonths] = useState<Set<string>>(new Set());
  const [allMonthsLoaded, setAllMonthsLoaded] = useState(false);
  const processedMonthsRef = useRef<Set<string>>(new Set());
  const visibleMonthsRef = useRef<Set<string>>(new Set());
  const requestQueueRef = useRef<Map<string, Promise<void>>>(new Map());
  const hasValue = !!rest.value;
  const allowedDays = daysOfWeek.map((day) => dayOfWeekToDayjsMap[day]);

  // Функция для загрузки заблокированных дат с использованием useCallback
  const loadDisabledDates = useCallback(async (month: number, year: number) => {
    const monthKey = `${year}-${month}`;
    
    if (loadingMonths.has(monthKey) || processedMonthsRef.current.has(monthKey)) {
      return;
    }

    // Проверяем, есть ли уже запрос для этого месяца
    if (requestQueueRef.current.has(monthKey)) {
      return requestQueueRef.current.get(monthKey);
    }

    const requestPromise = (async () => {
      try {
        setLoadingMonths(prev => new Set(prev).add(monthKey));
        
        const response = await fetchAvailableDates({
          month,
          year,
          projectId,
        });
        
        setDisabledDates(prev => {
          const newDates = [...prev];
          response.disabledDates?.forEach(date => {
            if (!newDates.includes(date)) {
              newDates.push(date);
            }
          });
          return newDates;
        });
        
        processedMonthsRef.current.add(monthKey);
        
      } catch (error) {
         
        console.error('Failed to load disabled dates:', error);
      } finally {
        setLoadingMonths(prev => {
          const newSet = new Set(prev);
          newSet.delete(monthKey);
          
          // Проверяем, все ли видимые месяцы загружены
          const allVisibleLoaded = Array.from(visibleMonthsRef.current).every(
            key => processedMonthsRef.current.has(key)
          );
          
          if (allVisibleLoaded) {
            setAllMonthsLoaded(true);
          }
          
          return newSet;
        });
        
        // Удаляем запрос из очереди после завершения
        requestQueueRef.current.delete(monthKey);
      }
    })();

    // Добавляем запрос в очередь
    requestQueueRef.current.set(monthKey, requestPromise);
    
    return requestPromise;
  }, [projectId, loadingMonths]);

  // Обработчик рендера ячеек календаря
  const cellRender: DatePickerProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type !== 'date') {
      return info.originNode;
    }
    
    if (typeof current === 'number' || typeof current === 'string') {
      return <div className='ant-picker-cell-inner'>{current}</div>;
    }
    
    const month = current.month() + 1;
    const year = current.year();
    const monthKey = `${year}-${month}`;
    
    // Добавляем месяц в список видимых
    if (!visibleMonthsRef.current.has(monthKey)) {
      visibleMonthsRef.current.add(monthKey);
      
      // Сбрасываем флаг полной загрузки при появлении новых месяцев
      if (allMonthsLoaded) {
        setAllMonthsLoaded(false);
      }
    }
    
    // Если месяц еще не обрабатывался, загружаем данные
    if (!processedMonthsRef.current.has(monthKey) && !loadingMonths.has(monthKey)) {
      loadDisabledDates(month, year);
    }
    
    return <div className='ant-picker-cell-inner'>{current.date()}</div>;
  };

  const disabledDate = useCallback((current: Dayjs) => {
    if (current.isBefore(dayjs(), 'day')) {
      return true;
    }

    if (!allowedDays.includes(current.day())) {
      return true;
    }

    const dateString = current.format('YYYY-MM-DD');
    return disabledDates.includes(dateString);
  }, [allowedDays, disabledDates]);

  const formatDate = (date: Dayjs) => {
    return date.format('dddd, D MMMM');
  };

  // Сбрасываем кэш при изменении projectId
  useEffect(() => {
    setDisabledDates([]);
    processedMonthsRef.current.clear();
    visibleMonthsRef.current.clear();
    requestQueueRef.current.clear();
    setLoadingMonths(new Set());
    setAllMonthsLoaded(false);
  }, [projectId]);

  // Сбрасываем флаг загрузки при закрытии/открытии календаря
  useEffect(() => {
    if (!open) {
      visibleMonthsRef.current.clear();
      requestQueueRef.current.clear();
      setAllMonthsLoaded(false);
    }
  }, [open]);

  return (
    <div className='input-container'>
      <div
        className={`custom-placeholder ${hasValue || open ? 'has-value' : ''}`}
        style={{ left: '30px' }}
      >
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
        panelRender={(panel) => (
          <Spin spinning={!allMonthsLoaded && loadingMonths.size > 0}>
            {panel}
          </Spin>
        )}
        mode='date'
        inputReadOnly
        
        disabledDate={disabledDate}
        cellRender={cellRender}
      />
    </div>
  );
};

export default CustomDatepicker;
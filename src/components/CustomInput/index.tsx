import { Input, type InputProps } from 'antd';

interface CustomInputProps extends InputProps {
  text: string;
  isPhone?: boolean;
  capitalizeFirst?: boolean;
}

const CustomInput = ({
  text,
  onChange,
  isPhone,
  capitalizeFirst = false,
  ...rest
}: CustomInputProps) => {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Применяем фильтрацию только если isPhone=true
    if (isPhone) {
      // Оставляем только + и цифры
      value = value.replace(/[^+\d]/g, '');

      // Ограничиваем количество символов (например, максимум 15)
      if (value.length > 15) {
        value = value.substring(0, 15);
      }

      // Автоматически добавляем + в начало, если его нет и ввод не пустой
      if (value.length > 0 && !value.startsWith('+')) {
        value = `+${value.replace(/\D/g, '')}`;
      }
    } else if (capitalizeFirst && value.length > 0) {
      // Логика для CamelCase первой буквы
      value = value.charAt(0).toUpperCase() + value.slice(1);
    }
    // Если есть onChange в props, вызываем его с обработанным значением
    if (onChange) {
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: value,
        },
      };
      onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>);
    }
  };
  const hasValue = !!rest.value;
  return (
    <div className='input-container'>
      <div className={`custom-placeholder ${hasValue ? 'has-value' : ''}`}>
        {text} <span className='redmark'>*</span>
      </div>
      <Input
        {...rest}
        onChange={handleChange}
        size='large'
        style={{ height: '56px', paddingTop: `${hasValue ? '18px' : '12px'}` }}
      />
    </div>
  );
};

export default CustomInput;

// Замените на более легковесное решение
import { Input } from 'antd';
import { PatternFormat, type PatternFormatProps } from 'react-number-format';
interface CustomInputProps extends PatternFormatProps {
  text: string;
  isPhone?: boolean;
  capitalizeFirst?: boolean;
}

const CustomPhone = ({ text, value, ...rest }: CustomInputProps) => {
  const hasValue = !!value;
  return (
    <div className='input-container'>
      <div className={`custom-placeholder ${hasValue ? 'has-value' : ''}`}>
        {text} <span className='redmark'>*</span>
      </div>
      <PatternFormat
        {...rest}
        customInput={Input}
        format='+# (###) ###-##-##'
        size='large'
        value={value}
        
        style={{ height: '56px', paddingTop: `${hasValue ? '18px' : '12px'}` }}
      />
    </div>
  );
};
export default CustomPhone;

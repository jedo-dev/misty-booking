import { Input, type InputProps } from 'antd';

interface CustomInputProps extends InputProps {
  text: string;
}

const CustomInput = ({ text, ...rest }: CustomInputProps) => {
  console.log(`rest`, rest);
  const hasValue = !!rest.value;
  return (
    <div className='input-container'>
      <div className={`custom-placeholder ${hasValue ? 'has-value' : ''}`}>
        {text} <span className='redmark'>*</span>
      </div>
      <Input
        {...rest}
        size='large'
        style={{ height: '56px', paddingTop: `${hasValue ? '18px' : '12px'}` }}
      />
    </div>
  );
};

export default CustomInput;

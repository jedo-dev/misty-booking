import { Select, type SelectProps } from 'antd';

interface CustomSelectProps extends SelectProps {
  text: string;
}

const CustomSelector = ({ text, ...rest }: CustomSelectProps) => {
  console.log(`rest`, rest);
  const hasValue = !!rest.value;
  return (
    <div className='input-container'>
      <div className={`custom-placeholder ${hasValue ? 'has-value' : ''}`} style={{ left: '30px' }}>
        {text} <span className='redmark'>*</span>
      </div>
      <Select
        {...rest}
        size='large'
        style={{ height: '56px',  }}
      />
    </div>
  );
};

export default CustomSelector;

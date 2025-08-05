import { Input } from 'antd';
import type { TextAreaProps } from 'antd/es/input';

interface CustomTextAreaProps extends TextAreaProps {
  text: string;
}

const CustomTextArea = ({ text, ...rest }: CustomTextAreaProps) => {
  console.log(`rest`, rest);
  const hasValue = !!rest.value;
  return (
    <div className='input-container'>
      <div className={`custom-placeholder ${hasValue ? 'has-value' : ''}`}>
        {text} <span className='redmark'>*</span>
      </div>
      <Input.TextArea {...rest} size='large' style={{paddingTop:`${hasValue ? '18px' : '12px'}`}} />
    </div>
  );
};

export default CustomTextArea;

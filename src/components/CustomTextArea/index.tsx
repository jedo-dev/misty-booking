import { Input } from 'antd';
import type { TextAreaProps } from 'antd/es/input';

interface CustomTextAreaProps extends TextAreaProps {
  text: string;
}

const CustomTextArea = ({ text, ...rest }: CustomTextAreaProps) => {
  const hasValue = !!rest.value;
  return (
    <div className='input-container'>
      <div className={`custom-placeholder ${hasValue ? 'has-value' : ''}`}>
        {text} <span className='redmark'></span>
      </div>
      <Input.TextArea
        {...rest}
        size='large'
        style={{
          paddingTop: `${hasValue ? '18px' : '12px'}`,
          overflowY: 'auto',
          resize: 'none',
        }}
        rows={3}
        maxLength={100}
      />
    </div>
  );
};

export default CustomTextArea;

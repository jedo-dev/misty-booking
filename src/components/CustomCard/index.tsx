import { Card, type CardProps } from 'antd';

const CustomCard = ({ ...rest }: CardProps) => {
  return (
    <Card
      variant='borderless'
      className='border-card'
      styles={{
        body: {
          padding: '16px',
        },
      }}
      {...rest}
    />
  );
};

export default CustomCard;

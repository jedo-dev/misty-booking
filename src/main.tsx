import { ConfigProvider, theme } from 'antd';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BookingForm } from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#FF5C01', // красный цвет акцентов (как в соглашении на скрине)
          colorBgContainer: '#1f1f1f', // фон инпутов и формы
          colorText: '#f0f0f0', // цвет текста на фоне
          colorTextPlaceholder: '#888', // цвет плейсхолдера
          colorBorder: '#444', // цвет границ инпутов
          colorBgElevated: '#2b2b2b', // фон элементов типа Card
          borderRadius: 8, // чуть скруглить края
        },

        components: {
          Button: {
            colorPrimary: 'rgb(255,92,1)',
            colorPrimaryBorder: 'rgb(246, 123, 57)',
            colorPrimaryHover: 'rgb(248, 105, 29)',
            colorPrimaryBorderHover: 'rgb(240, 122, 59)',
            colorPrimaryActive: 'rgba(248, 106, 29, 0.949)',
          },
          Input: {
            colorBgContainer: '#1f1f1f',
          },
          Select: {
            colorBgContainer: '#1f1f1f',
          },
          DatePicker: {
            colorBgContainer: '#1f1f1f',
          },
        },
      }}>
      <BookingForm />
    </ConfigProvider>
  </StrictMode>,
);

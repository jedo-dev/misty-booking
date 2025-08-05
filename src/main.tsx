import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import  { BookingForm } from './App.tsx'
import { ConfigProvider, theme } from 'antd'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <ConfigProvider theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#ff5c01",           // красный цвет акцентов (как в соглашении на скрине)
          colorBgContainer: "#1f1f1f",       // фон инпутов и формы
          colorText: "#f0f0f0",              // цвет текста на фоне
          colorTextPlaceholder: "#888",      // цвет плейсхолдера
          colorBorder: "#444",               // цвет границ инпутов
          colorBgElevated: "#2b2b2b",        // фон элементов типа Card
          borderRadius: 8,                   // чуть скруглить края
        },
        
        components: {
        
          Input: {
            colorBgContainer: "#1f1f1f",
          },
          Select: {
            colorBgContainer: "#1f1f1f",
          },
          DatePicker: {
            colorBgContainer: "#1f1f1f",
          },
        
        },
      }}>
     <BookingForm />
   </ConfigProvider>
  </StrictMode>,
)

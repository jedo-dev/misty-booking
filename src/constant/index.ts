export enum formStep {
  initial = 'initial',
  finish = 'finish',
  error = 'error',
}
export interface Project {
  projectId: string;
  projectName: string;
  projectAddress: string;
  daysOfWeek: DayOfWeek[];
  backgroundUrl: string;
  guestCountEnabled: boolean;
  commentEnabled: boolean;
  rulesText: string;
}
export enum DayOfWeek {
  Monday = 'MONDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY',
  Thursday = 'THURSDAY',
  Friday = 'FRIDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
}

export interface AvailableDatesRequest {
  month: number; // 1-12
  year: number; // например 2023
  projectId: string; // UUID формата
}
export interface AvailableTimeSlotRequest {
  date: string; // например 2023
  projectId: string; // UUID формата
}
export interface SaveForm {
  projectId: string; // UUID формата
  startDate:string;
  guestCount:number;
  clientPhone:string;
  clientName:string;
  comment:string;
}

export interface AvailableDate {
  date: string; // ISO формат даты "YYYY-MM-DD"
  available: boolean;
}

export interface AvailableDatesResponse {
  disabledDates: string[];
}
export const initialData = {
  projectAddress: '',
  projectId: '',
  projectName: '',
  backgroundUrl: '',
  guestCountEnabled: true,
  commentEnabled: true,
  daysOfWeek: [DayOfWeek.Monday],
  rulesText: '',
};

export const mocketData = {
  projectId: 'dac8de04-8537-4c96-8aee-0de0a03d13e5',
  projectName: 'Urban Winery',
  projectAddress: 'ул. Спартаковская, д. 3, стр. 1',
  backgroundUrl: '',
  guestCountEnabled: true,
  commentEnabled: true,
  daysOfWeek: [DayOfWeek.Monday],
  rulesText: '- ограничение по времени на 1 кальян <br/>- минимум 1 кальян на двоих',
};

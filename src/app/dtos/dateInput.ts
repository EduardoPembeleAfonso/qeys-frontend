import { Dispatch, SetStateAction } from 'react'
import { DateRange } from 'react-day-picker'

export interface DateInput {
  timeValue: string
  schedulingStartAndEndTimes: Date | undefined
  setSchedulingStartAndEndTimes: Dispatch<SetStateAction<Date | undefined>>
  setTimeValue: Dispatch<SetStateAction<string>>
  setDateSchedulingDetails: Dispatch<SetStateAction<string>>
}

export interface DatePickerModalProps {
  selected: DateRange | undefined
  setSelected: React.Dispatch<React.SetStateAction<DateRange | undefined>>
  closeDatePickerModalOpen: () => void
}
export interface HourPickerModalProps {
  selected: Date | undefined
  setSelected: React.Dispatch<React.SetStateAction<Date | undefined>>
  timeValue: string
  setTimeValue: React.Dispatch<React.SetStateAction<string>>
  closeDatePickerModalOpen: () => void
}
export interface DayPickerModalProps {
  selected: Date | undefined
  setSelected: React.Dispatch<React.SetStateAction<Date | undefined>>
  closeDatePickerModalOpen: () => void
}

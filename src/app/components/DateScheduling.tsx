import { useEffect, useState } from 'react'

import { Calendar } from 'lucide-react'
import { DateInput } from '../dtos/dateInput'
import { displayDateAndHour } from '@/utils/functions/displayDateAndHour'
import HourPickerModal from './HourPickerModal'


export default function DateScheduling({
  schedulingStartAndEndTimes,
  setSchedulingStartAndEndTimes,
  timeValue,
  setTimeValue,
  setDateSchedulingDetails,
}: DateInput) {
  

  const displayHour = displayDateAndHour(schedulingStartAndEndTimes)

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  function closeDatePicker() {
    setIsDatePickerOpen(false)
  }

  useEffect(() => {
    if (displayHour) {
      setDateSchedulingDetails(displayHour as string)
    }
  }, [displayHour, setDateSchedulingDetails])

  return (
    <div className="relative flex w-full flex-col gap-8 rounded-lg bg-slate-50 border px-4 py-6 shadow-shape md:h-16 md:flex-row md:items-center md:gap-4 md:py-0">
      <button
        onClick={() => setIsDatePickerOpen(true)}
        className={`flex flex-1 items-center gap-2 transition-all active:scale-[.98]`}
      >
        <Calendar className="size-6 text-zinc-400" />
        <span
          className={`${!displayHour ? 'text-TextButtonSecondaryColor' : 'text-sm text-TextButtonSecondaryColor sm:text-base'} font-Montserrat bg-transparent text-lg tracking-wide`}
        >
          {displayHour || 'Quando?'}
        </span>
      </button>
      <div className="hidden h-6 w-px gap-8 bg-zinc-800 md:flex" />
      {isDatePickerOpen && (
        <HourPickerModal
          closeDatePickerModalOpen={closeDatePicker}
          selected={schedulingStartAndEndTimes}
          setSelected={setSchedulingStartAndEndTimes}
          timeValue={timeValue}
          setTimeValue={setTimeValue}
        />
      )}
    </div>
  )
}

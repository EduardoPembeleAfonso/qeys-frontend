import { X } from 'lucide-react'
import { DayPicker, getDefaultClassNames } from 'react-day-picker'
import 'react-day-picker/style.css'
import { ChangeEventHandler } from 'react'
import { setHours, setMinutes } from 'date-fns'
import { pt } from 'date-fns/locale'
import Colors from 'tailwindcss/colors'
import { HourPickerModalProps } from '../dtos/dateInput'
import { displayDateAndHour } from '@/utils/functions/displayDateAndHour'

export default function HourPickerModal({
  closeDatePickerModalOpen,
  selected,
  setSelected,
  timeValue,
  setTimeValue,
}: HourPickerModalProps) {
  const defaultClassNames = getDefaultClassNames()

  const handleTimeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value
    if (!selected) {
      setTimeValue(time)
      return
    }
    const [hours, minutes] = time.split(':').map((str) => parseInt(str, 10))
    const newSelectedDate = setHours(setMinutes(selected, minutes), hours)
    setSelected(newSelectedDate)
  }

  const handleDaySelect = (date: Date | undefined) => {
    if (!timeValue || !date) {
      setSelected(date)
      return
    }
    const [hours, minutes] = timeValue
      .split(':')
      .map((str) => parseInt(str, 10))
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes,
    )

    setSelected(newDate)
  }

  const displayHour = displayDateAndHour(selected)

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="space-y-5 rounded-xl bg-slate-50 w-[350px] lg:w-full px-5 py-6 shadow-shape">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-wider text-primary">
              Horário
            </h2>
            <button
              type="button"
              onClick={closeDatePickerModalOpen}
              className="transition-all active:scale-90"
            >
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <div className="h-px w-full bg-primary" />

          <div className="space-y-4">
            <div className="flex w-full flex-col gap-2">
              <input
                type="time"
                value={timeValue}
                onChange={handleTimeChange}
                name="appt-time"
                className="cursor-pointer rounded-xl bg-zinc-900 p-4 text-zinc-200 outline-none md:px-4"
              />
              {selected && (
                <div className="rounded-xl p-4">
                  <span className="text-TextButtonSecondaryColor">{displayHour || ''}</span>
                </div>
              )}
            </div>
            <DayPicker
              style={{
                color: Colors.zinc[100],
              }}
              className='w-[350px] lg:w-full'
              startMonth={new Date()}
              disabled={{ before: new Date() }}
              locale={pt}
              mode="single"
              selected={selected}
              onSelect={handleDaySelect}
              classNames={{
                month: 'text-primary',
                today: ` rounded-full text-white`,
                selected: `bg-primary border-primary text-white rounded-full`,
                range_middle: 'bg-primary/20',
                range_start: 'bg-primary',
                range_end: 'bg-primary',
                root: `${defaultClassNames.root} shadow-lg p-5`,
                chevron: `fill-primary`,
              }}
            />
            <div className="flex w-full items-center justify-start gap-4 border-t border-primary pt-4">
              <p className="w-full max-w-[320px] text-sm text-zinc-400">
                <span className="font-medium text-TextButtonSecondaryColor">OBS:</span>{' '}
                Selecione a hora e o dia inicial.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

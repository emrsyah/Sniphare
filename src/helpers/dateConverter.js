import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
dayjs.extend(isToday)

export default function dateConverter(date){
  const d = (date ? date.toDate() : new Date())
  if(dayjs(d).isToday()){
    return dayjs(d).fromNow()
  }
  return dayjs(d).format("DD MMM")
}
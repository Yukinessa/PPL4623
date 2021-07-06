import dayjs from "dayjs"
import "dayjs/locale/id"

export function utcToLocal(date, formatDate = null) {
  return dayjs(date).locale("id").format(formatDate)
}

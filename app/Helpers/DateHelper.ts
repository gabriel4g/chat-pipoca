export default class DateHelper {
  date: string

  Date(date) {
    this.date = date
  }

  public generateDate() {
    let day = new Date(this.date).getDate()
    let month = new Date(this.date).getUTCMonth() + 1
    let year = new Date(this.date).getUTCFullYear()

    const toDifineDay = (day <= 9 && day > 0)? '0':''
    const toDifineMonth = (month <= 9 && month > 0)? '0':''

    return `${toDifineDay}${day}/${toDifineMonth}${month}/${year}`
  }
}

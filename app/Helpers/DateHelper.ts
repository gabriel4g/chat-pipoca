export default class DateHelper {
  date: string
  hour: string

  Date(date) {
    this.date = date
  }

  public generateDate() {
    let day = new Date(this.date).getDate()
    let month = new Date(this.date).getUTCMonth() + 1
    let year = new Date(this.date).getUTCFullYear()

    const TO_DEFINE_DAY = (day <= 9 && day > 0)? '0':''
    const TO_DEFINE_MONTH = (month <= 9 && month > 0)? '0':''

    return `${TO_DEFINE_DAY}${day}/${TO_DEFINE_MONTH}${month}/${year}`
  }
}

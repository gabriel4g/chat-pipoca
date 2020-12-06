export default class DateHelper {
  date: string

  Date(date) {
    this.date = date
  }

  public generateDate() {
    let day = new Date(this.date).getDate()
    let month = new Date(this.date).getUTCMonth() + 1
    let year = new Date(this.date).getUTCFullYear()

    if(day <=9 && day > 0) {
      return `0${day}/${month}/${year}`
    } else {
      return `${day}/${month}/${year}`
    }
  }
}

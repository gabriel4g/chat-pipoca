export default class StyleHelper {

  public static style() {
    const HOUR = new Date().getHours()

    if (HOUR >= 18 || HOUR < 6) {
      return "style.css"
    } else {
      return "style_light.css"
    }
  }

  public static styleSecondary() {
    const HOUR = new Date().getHours()

    if (HOUR >= 18 || HOUR < 6) {
      return "Dark"
    } else {
      return "Light"
    }
  }
}

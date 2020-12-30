export default class BBCodeHelper {
  tokenMatch = /{[A-Z_]+[0-9]*}/ig

  // Regular expressions for the different bbcode tokens
  tokens = {
    'URL': '((?:(?:[a-z][a-z\\d+\\-.]*:\\/{2}(?:(?:[a-z0-9\\-._~\\!$&\'*+,;=:@|]+|%[\\dA-F]{2})+|[0-9.]+|\\[[a-z0-9.]+:[a-z0-9.]+:[a-z0-9.:]+\\])(?::\\d*)?(?:\\/(?:[a-z0-9\\-._~\\!$&\'*+,;=:@|]+|%[\\dA-F]{2})*)*(?:\\?(?:[a-z0-9\\-._~\\!$&\'*+,;=:@\\/?|]+|%[\\dA-F]{2})*)?(?:#(?:[a-z0-9\\-._~\\!$&\'*+,;=:@\\/?|]+|%[\\dA-F]{2})*)?)|(?:www\\.(?:[a-z0-9\\-._~\\!$&\'*+,;=:@|]+|%[\\dA-F]{2})+(?::\\d*)?(?:\\/(?:[a-z0-9\\-._~\\!$&\'*+,;=:@|]+|%[\\dA-F]{2})*)*(?:\\?(?:[a-z0-9\\-._~\\!$&\'*+,;=:@\\/?|]+|%[\\dA-F]{2})*)?(?:#(?:[a-z0-9\\-._~\\!$&\'*+,;=:@\\/?|]+|%[\\dA-F]{2})*)?)))',
    'LINK': '([a-z0-9\-\./]+[^"\' ]*)',
    'EMAIL': '((?:[\\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*(?:[\\w\!\#$\%\'\*\+\-\/\=\?\^\`{\|\}\~]|&)+@(?:(?:(?:(?:(?:[a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(?:\\d{1,3}\.){3}\\d{1,3}(?:\:\\d{1,5})?))',
    'TEXT': '(.*?)',
    'SIMPLETEXT': '([a-zA-Z0-9-+.,_ ]+)',
    'INTTEXT': '([a-zA-Z0-9-+,_. ]+)',
    'IDENTIFIER': '([a-zA-Z0-9-_]+)',
    'COLOR': '([a-z]+|#[0-9abcdef]+)',
    'NUMBER': '([0-9]+)'
  }

  bbCodeMatches: string[] = []// Matches for BBCode to HTML
  htmlTpls: string[] = [] // HTML templates for HTML to BBCode
  htmlMatches: string[] = [] // Matches for HTML to BBCode
  bbcodeTpls: string[] = [] // BBCode templates for BBCode to HTML

  /**
   * Turns a bbcode into a regular rexpression by changing the tokens into
   * their regex form
   */
  public _getRegEx = (str): any => {
    let matches = str.match(this.tokenMatch)
    let nrMatches: number = matches.length
    let replacement: string = ''

    if (nrMatches <= 0) {
      return new RegExp(this.pregQuote(str), 'g')
    }

    for (let i = 0; i < nrMatches; i++) {
      let token: string = matches[i].replace(/[{}0-9]/g, '')

      if (this.tokens[token]) {
        replacement += this.pregQuote(str.substr(0, str.indexOf(matches[i]))) + this.tokens[token]

        str = str.substr(str.indexOf(matches[i]) + matches[i].length)
      }
    }

    replacement += this.pregQuote(str)

    return new RegExp(replacement, 'gi')
  }

  public _getTpls = (str): any => {
    let matches: string = str.match(this.tokenMatch)
    let nrMatches: number = matches.length
    let replacement: string = ''
    let positions = {}
    let nextPosition: number = 0

    if (nrMatches <= 0) {
      return str
    }

    for (let i = 0; i < nrMatches; i++) {
      let token: string = matches[i].replace(/[{}0-9]/g, '')
      let position: number

      if (positions[matches[i]]) {
        position = positions[matches[i]]
      } else {
        nextPosition += 1
        position = nextPosition
        positions[matches[i]] = position
      }

      if (this.tokens[token]) {
        replacement += str.substr(0, str.indexOf(matches[i])) + '$' + position
        str = str.substr(str.indexOf(matches[i]) + matches[i].length)
      }
    }

    replacement += str

    return replacement
  }

  public addBBCode = (BBCodeMatch, BBCodeTpl): void => {
    this.bbCodeMatches.push(this._getRegEx(BBCodeMatch))
    this.htmlTpls.push(this._getTpls(BBCodeTpl))

    this.htmlMatches.push(this._getRegEx(BBCodeTpl))
    this.bbcodeTpls.push(this._getTpls(BBCodeMatch))
  }

  public bbCodeToHtml = (str): any => {
    let nrBbcMatches: number = this.bbCodeMatches.length

    for (let i = 0; i < nrBbcMatches; i++) {
      str = str.replace(this.bbCodeMatches[i], this.htmlTpls[i])
    }

    return str
  }

  public htmlToBBCode = (str): any => {
    let nrHtmlMatches: number = this.htmlMatches.length

    for (let i = 0; i < nrHtmlMatches; i++) {
      str = str.replace(this.htmlMatches[i], this.bbcodeTpls[i])
    }

    return str
  }

  public pregQuote(str): any {
    return (str + '').replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + '' + '-]', 'g'), '\\$&');
  }

  public run(): any {
    this.addBBCode('[b]{TEXT}[/b]', '<strong>{TEXT}</strong>')
    this.addBBCode('[code]{TEXT}[/code]', '<code>{TEXT}</code>')
    this.addBBCode('[user={NUMBER}]{TEXT}[/user]', '<a href="/u/{NUMBER}" target="_blank">{TEXT}</a>')
    this.addBBCode('[i]{TEXT}[/i]', '<em>{TEXT}</em>')
    this.addBBCode('[u]{TEXT}[/u]', '<span style="text-decoration:underline;">{TEXT}</span>')
    this.addBBCode('[s]{TEXT}[/s]', '<span style="text-decoration:line-through;">{TEXT}</span>')
    this.addBBCode('[url={URL}]{TEXT}[/url]', '<a href="{URL}" title="link" target="_blank">{TEXT}</a>')
    this.addBBCode('[url]{URL}[/url]', '<a href="{URL}" title="link" target="_blank">{URL}</a>')
    this.addBBCode('[url={LINK}]{TEXT}[/url]', '<a href="{LINK}" title="link" target="_blank">{TEXT}</a>')
    this.addBBCode('[url]{LINK}[/url]', '<a href="{LINK}" title="link" target="_blank">{LINK}</a>')
    this.addBBCode('[img={URL} width={NUMBER1} height={NUMBER2}]{TEXT}[/img]', '<img src="{URL}" width="{NUMBER1}" height="{NUMBER2}" alt="{TEXT}" />')
    this.addBBCode('[img]{URL}[/img]', '<img src="{URL}" alt="{URL}" />')
    this.addBBCode('[img={LINK} width={NUMBER1} height={NUMBER2}]{TEXT}[/img]', '<img src="{LINK}" width="{NUMBER1}" height="{NUMBER2}" alt="{TEXT}" />')
    this.addBBCode('[img]{LINK}[/img]', '<img src="{LINK}" alt="{LINK}" />')
    this.addBBCode('[color={COLOR}]{TEXT}[/color]', '<span style="color:{COLOR}">{TEXT}</span>')
    this.addBBCode('[highlight={COLOR}]{TEXT}[/highlight]', '<span style="background-color:{COLOR}">{TEXT}</span>')
    this.addBBCode('[quote="{TEXT1}"]{TEXT2}[/quote]', '<div class="quote"><cite>{TEXT1}</cite><p>{TEXT2}</p></div>')
    this.addBBCode('[quote]{TEXT}[/quote]', '<cite>{TEXT}</cite>')
    this.addBBCode('[blockquote]{TEXT}[/blockquote]', '<blockquote>{TEXT}</blockquote>')
    this.addBBCode('[center]{TEXT}[/center]', '<p style="text-align: center;">{TEXT}</p>')
  }
}

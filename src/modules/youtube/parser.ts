import { load } from 'cheerio'
import queryString from 'query-string'
import { YTVideo } from '../../types/youtube'

export const parseDuration = (duration: any) => {
  var a = duration.match(/\d+/g)
  if (
    duration.indexOf('M') >= 0 &&
    duration.indexOf('H') === -1 &&
    duration.indexOf('S') === -1
  ) {
    a = [0, a[0], 0]
  }
  if (duration.indexOf('H') >= 0 && duration.indexOf('M') === -1) {
    a = [a[0], 0, a[1]]
  }
  if (
    duration.indexOf('H') >= 0 &&
    duration.indexOf('M') === -1 &&
    duration.indexOf('S') === -1
  ) {
    a = [a[0], 0, 0]
  }
  duration = 0
  if (a.length === 3) {
    duration = duration + parseInt(a[0], 10) * 3600
    duration = duration + parseInt(a[1], 10) * 60
    duration = duration + parseInt(a[2], 10)
  }
  if (a.length === 2) {
    duration = duration + parseInt(a[0], 10) * 60
    duration = duration + parseInt(a[1], 10)
  }
  if (a.length === 1) {
    duration = duration + parseInt(a[0], 10)
  }
  return duration * 1000
}

export const parseHtml = (html: string) => {
  const $ = load(html)
  let results: YTVideo[] = []
  $('.yt-lockup').each((_inx, section) => {
    const content = $('.yt-lockup-content', section)

    const title = $('a', $('.yt-lockup-title', content))
    const duration = $('span', $('.yt-lockup-title', content)).text()
    const description = $('.yt-lockup-description', content)
      .text()
      .trim()
    const link = title.attr('href') || ''

    if (
      link.indexOf('/watch?') === 0 &&
      link.indexOf('/user/') === 0 &&
      link.indexOf('/channel/') === 0
    ) {
      return
    }

    const { v }: { v?: string } = queryString.parse(link.split('?', 2)[1])

    if (v) {
      results.push({
        type: 'video',
        title: title.text().trim(),
        description: description,
        duration: duration,
        url: 'https://youtube.com/watch?v=' + v,
        id: v,
      })
    }
  })
  return results
}

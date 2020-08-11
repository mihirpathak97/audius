import { parseHtml } from './parser'

const { ipcRenderer } = window.require('electron')

const searchById = (id: string) => {
  return parseHtml(ipcRenderer.sendSync('fetch-youtube', id))[0]
}

const search = (query: String) => {
  return parseHtml(ipcRenderer.sendSync('fetch-youtube', query))
}

export { searchById, search }

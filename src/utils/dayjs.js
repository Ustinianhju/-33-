import dayjs from 'dayjs'

const relstiveTime = require('dayjs/plugin/relativeTime')
// 默认语言为英文
require('dayjs/locale/zh-cn')
dayjs.extend(relstiveTime)
dayjs.locale('zh-cn')

export default dayjs

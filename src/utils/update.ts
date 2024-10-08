import { ElMessage } from "element-plus"

export const checkVersion = async () => {
  console.log("进入checkVersion")
  // 对比 import.meta.env.VERSION_TIME 与 public/VERSION_TIME.json.data
  const publicVersion = await fetch(location.origin + `/version.json?t=` + Date.now(), {
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '-1'
    }
  })
  const data = await publicVersion.json()
  const NEW_VERSION_TIME = data.VERSION_TIME
  const VERSION_TIME = import.meta.env.VERSION_TIME

  if (import.meta.env.DEV) {
    return
  }
  if (NEW_VERSION_TIME && new Date(NEW_VERSION_TIME) > new Date(VERSION_TIME)) {
    // updateVersion()
    console.log("reload111")
    ElMessage.warning("检测到新版本，正在更新...")
    setTimeout(() => {
      location.reload()
    }, 4000)
  }
}


export const updateVersion = (count: number = 30) => {
  let timer: any = setTimeout(() => {
    count--
    if (count < 1) {
      clearTimeout(timer!)
      timer = null
      location.reload()
    }
  }, 1000)
}

const appParams = useSessionStorage<{token?: string}>("app-params", {})

export function base64toBlob(dataurl: string) {
    const arr = dataurl.split(',')
    // @ts-ignore
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
  }
  
  export function resourceUrl(url?: string) {
    return import.meta.env.VITE_BASE_API + "/resource" + url + "?Authorization=" + appParams.value.token
  }
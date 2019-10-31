export function getLimitedString(target = '', limit = Infinity) {
  const realTarget = target || '';
  let length = 0;
  let currentLength = 0;
  let result = '';
  for (let i = 0; i < realTarget.length; i += 1) {
    const stringCode = realTarget.charCodeAt(i);
    if (stringCode > 65248 || stringCode === 12288) {
      // 全角字符
      currentLength += 1;
    } else if ([8216, 8217, 8220, 8221].indexOf(stringCode) !== -1) {
      // 中文单引号和中文双引号
      currentLength += 1;
    } else if (realTarget[i].match(/[\u4e00-\u9fa5]/g)) {
      // 中文
      currentLength += 1;
    } else {
      currentLength += 0.5;
    }
    if (currentLength > limit) {
      break
    } else {
      result += realTarget[i];
      length = currentLength
    }
  }
  return {
    result,
    length
  };
}

export function upload({
  method, url = '', name, file
}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open(method.toUpperCase(), url, true);
    xhr.onerror = (error) => {
      reject(error)
    };
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          resolve(xhr.response)
        } else {
          reject(xhr.response)
        }
      }
    };
    const data = new FormData();
    data.append(name, file);
    xhr.send(data);
  })
}

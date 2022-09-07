const username = process.env.ST_USER
const password = process.env.ST_PASS

export const get = async (url: string) => {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: 'Basic ' + btoa(username + ':' + password),
      'Content-Type': 'application/json',
    },
  })
  return await res.json()
}

export const get_with_token = async (url: string) => {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: 'Basic ' + btoa(username + ':' + password),
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token') || 'none',
      client: localStorage.getItem('client') || 'none',
      uid: localStorage.getItem('uid') || 'none',
    },
  })
  return await res.json()
}

export const post = async (url: string, data: any) => {
  const res = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      Authorization: 'Basic ' + btoa(username + ':' + password),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return res
}

export const put = async (url: string, data: any) => {
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: 'Basic ' + btoa(username + ':' + password),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return res
}

export const del = async (url: string, data: any) => {
  const res = await fetch(url, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      Authorization: 'Basic ' + btoa(username + ':' + password),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return res
}

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const accessToken = localStorage.getItem('access')
  if (!accessToken) {
    throw new Error('Token de acesso não encontrado')
  }

  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  })

  if (!res.ok) {
    throw new Error('Falha na requisição')
  }

  return res
}

export default fetchWithAuth

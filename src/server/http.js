export async function readJsonBody(request) {
  if (request.body && typeof request.body === 'object') {
    return request.body
  }

  if (typeof request.body === 'string') {
    return JSON.parse(request.body || '{}')
  }

  const chunks = []
  for await (const chunk of request) {
    chunks.push(chunk)
  }

  return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')
}

export function allowPostOnly(request, response) {
  if (request.method === 'POST') {
    return true
  }

  response.setHeader('Allow', 'POST')
  response.status(405).json({ error: 'Method not allowed' })
  return false
}

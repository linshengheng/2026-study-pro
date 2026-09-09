import axios from 'axios'

interface LoginParams {
  username: string
  password: string
  nickname: string
}

interface LoginResponse {
  username: string
  nickname: string
  token: string
}

interface MockUser {
  username: string
  password: string
  token: string
}

const request = axios.create({
  baseURL: '/api',
  timeout: 5000,
})

interface GoPostAddress {
  city: string
  road: string
}

interface GoPostParams {
  userName: string
  age: number
  address: GoPostAddress
}

export async function goPostApi(params: GoPostParams) {
  const { data } = await request.post('/goPost', params)
  return data
}

export async function loginApi(params: LoginParams): Promise<LoginResponse> {
  const { data } = await request.get<MockUser>('/mock-user.json')

  if (params.username !== data.username || params.password !== data.password) {
    throw new Error('用户名或密码错误')
  }

  return {
    username: data.username,
    nickname: params.nickname,
    token: data.token,
  }
}

export const login = () => {
  return `/oauth/token`
}

export const postFund = () => {
  return `/api/funds`
}

export const listFunds = (page) => {
  return `/api/funds?page=${page}`
}

export const deductFund = () => {
  return `/api/funds/deduct`
}

export const register = () => {
  return `/api/user/register`
}

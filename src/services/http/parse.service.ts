export const parseAuthentResult = (response: any) => {
  if ([200, 201, 204].includes(response.status)) {
    return {
      code: response.status,
      data: response.data
    }
  }

  return {
    code: response.status,
    message: response.statusText ?? ''
  }

}
export const parseExecuteResult = (response: any) => {
  if ([200, 201, 204].includes(response.status)) {
    return {
      code: response.status,
      data: response.data
    }
  }

  return {
    code: response.status,
    message: response.statusText ?? ''
  }

}
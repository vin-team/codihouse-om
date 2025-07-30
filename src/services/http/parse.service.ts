export const parseAuthentResult = (response: any) => {
    if ([200,201,204].includes(response.status)) {
      return {
        code: response.status,
        data: response.data
      }
    } else {
      return {
        code: response.status,
        message: response.statusText??''
      }
    }
  }
export const parseExecuteResult = (response: any) => {
  //console.log("basic response",response)
    if ([200,201,204].includes(response.status)) {
      return {
        code: response.status,
        data: response.data
      }
    } else {
      console.log(response)
      return {
        code: response.status,
        message: response.statusText??''
      }
    }
  }
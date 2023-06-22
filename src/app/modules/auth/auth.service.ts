import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import User from '../user/user.model'
import { ILoginUser, ILoginUserResponse } from './auth.interface'
import { Secret } from 'jsonwebtoken'
import config from '../../../config'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload
  //if user exist
  // const isUserExist = await User.findOne(
  //   { id },
  //   { id: 1, password: 1, needsPasswordChange: 1 }
  // ).lean()
  // const user = new User()
  // const isUserExist = await user.isUserExist(id)
  const isUserExist = await User.isUserExist(id)

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }
  const { needsPasswordChange } = isUserExist
  //match password
  // const isPasswordMatched = await bycrypt.compare(
  //   password,
  //   isUserExist.password
  // )
  if (
    isUserExist.password &&
    !User.isPasswordMatched(password, isUserExist.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect')
  }

  // create access token
  const accessToken = jwtHelpers.createToken(
    { id: isUserExist.id, role: isUserExist.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  )

  const refreshToken = jwtHelpers.createToken(
    { id: isUserExist.id, role: isUserExist.role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  )

  console.log({ accessToken, refreshToken, needsPasswordChange })
  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
    // isUserExist.needsPasswordChange
  }
}

export const AuthService = {
  loginUser,
}

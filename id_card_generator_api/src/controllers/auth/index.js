import {
  loginUserService,
  logoutUserService,
  registerUserService,
  retrieveUserService,
} from '../../services';
import {loginSchema, userCreateSchema} from '../../validators';

export const register = async (request, response) => {
  try {
    const validatedData = await userCreateSchema.validateAsync(request.body);
    const user = await registerUserService(validatedData);
    if (!user) {
      return response
          .status(400)
          .json({detail: 'Both the passwords should match.'});
    }
    return response.status(201).json({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      dateJoined: user.dateJoined,
    });
  } catch (e) {
    return response.status(400).json(e);
  }
};

export const login = async (request, response) => {
  try {
    const validatedData = await loginSchema.validateAsync(request.body);
    const data = await loginUserService(validatedData);
    if (!data) return response.status(403).json({detial: 'Forbidden'});
    return response.status(201).json(data);
  } catch (e) {
    return response.status(400).json(e);
  }
};

export const detail = async (request, response) => {
  const user = await retrieveUserService(request.user);
  return response.status(200).json(user);
};

export const logout = async (request, response) => {
  const data = await logoutUserService(request.user);
  return response.status(204).json(data);
};

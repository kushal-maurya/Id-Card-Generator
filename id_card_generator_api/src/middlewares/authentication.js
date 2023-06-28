import {User} from '../models';

const EXCLUDE_URLS = ['/api/user/login', '/api/user/register'];

export const authenticate = async (request, response, next) => {
  const authorization = request.headers?.authorization;
  if (!EXCLUDE_URLS.includes(request.path)) {
    if (!authorization) {
      return response.status(401).json({detail: 'Unauthorized'});
    }
    const values = authorization.split(' ');
    if (values.length !== 2) {
      return response.status(401).json({detail: 'Unauthorized'});
    }
    if ('Token'.toLowerCase() !== values[0].toLowerCase()) {
      return response.status(401).json({detail: 'Unauthorized'});
    }
    const user = await User.findOne({
      'token.key': values[1],
    });
    if (!user) {
      return response.status(403).json({detail: 'Forbidden'});
    }
    request.user = user;
  }
  next();
};

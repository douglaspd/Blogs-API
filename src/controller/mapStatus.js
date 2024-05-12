const httpErrorMap = {
  SUCCESS: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INVALID_VALUE: 422,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
};

const mapStatus = (status) => httpErrorMap[status] || 500;

module.exports = mapStatus;

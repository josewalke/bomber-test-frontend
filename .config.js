export default process.env.NODE_ENV === 'development'
  ? require('./.env')
  : process.env
const timestamp = () => new Date().toISOString();

const info = (...params) => {
  console.log(`[${timestamp()}]`, ...params);
};

const warn = (...params) => {
  console.warn(`[${timestamp()}]`, ...params);
};

const error = (...params) => {
  console.error(`[${timestamp()}]`, ...params);
};

export default {
  info,
  warn,
  error,
};

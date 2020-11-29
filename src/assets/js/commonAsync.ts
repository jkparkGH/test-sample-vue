const commonAsyncFunction = async (
  asyncFn: Function,
  callback: Function,
  processingState?: boolean
) => {
  typeof processingState === 'boolean' && (processingState = true);
  try {
    await asyncFn();
    callback();
  } catch (error) {
    console.dir(error);
  } finally {
    typeof processingState === 'boolean' &&
      setTimeout(() => {
        processingState = false;
      }, 500);
  }
};

export default commonAsyncFunction;

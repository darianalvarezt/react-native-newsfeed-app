import {useEffect} from 'react';

export default (func: () => void, timeOut: number) => {
  useEffect(() => {
    const _timeOut = setTimeout(() => {
      func && func();
    }, timeOut);
    return () => {
      clearTimeout(_timeOut);
    };
  }, [func, timeOut]);
};

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

/**
 * Executes the effect only one time when when the component did mount and the cleanup effet (if any)
 * when the component did unmount
 */
function useOnMountAndUnmount(effect: () => void | (() => void)) {
  useEffect(effect, []);
}

export default useOnMountAndUnmount;

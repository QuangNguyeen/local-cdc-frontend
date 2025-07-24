import { useState, useEffect } from 'react';

/**
 * NOTE: A better solution would be to import the tailwind config so that there is one
 * source of truth and the values can never by out of sync. This adds a lot of unecessary
 * tailwind code to the build though, so the recommendation is to use preval to prevent that.
 *
 * @see https://tailwindcss.com/docs/configuration#referencing-in-java-script
 * @see https://github.com/kentcdodds/babel-plugin-preval
 *
 * ```
 * import resolveConfig from 'tailwindcss/resolveConfig';
 * import tailwindConfig from '../../../tailwind.config';
 * const resolvedConfig = resolveConfig(tailwindConfig);
 * const screens = resolvedConfig.theme?.screens || {};
 * ```
 */

const screens = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

type Size = keyof typeof screens;

const useScreenSize = (size: Size): boolean => {
  const [value, setValue] = useState(
    typeof window !== 'undefined' &&
      window.matchMedia(`(min-width: ${screens[size]})`).matches,
  );
  useEffect(() => {
    const mediaQueryList = window.matchMedia(`(min-width: ${screens[size]})`);
    const handleChange = ({ matches }: MediaQueryList | MediaQueryListEvent) =>
      setValue(matches);
    mediaQueryList.onchange = handleChange;
    handleChange(mediaQueryList);
  }, [size]);
  return value;
};

export default useScreenSize;

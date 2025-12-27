import { sideSize } from "./constants";

const safeAttributes = ['w', 'h', 'left', 'right'];

const safeSizes = [
  ...Object.values(sideSize)
];

const responsiveSizes = [
  'sm',
  'md',
  'lg',
];

export function getTailwindSafeList(): string[] {
  return safeAttributes.reduce((safeList: string[], attr) => {
    safeSizes.forEach(size => {
      safeList.push(`${attr}-[${size}px]`);

      responsiveSizes.forEach(responsive => {
        safeList.push(`${responsive}:${attr}-[${size}px]`);
      });
    });
    return safeList;
  }, []);
}

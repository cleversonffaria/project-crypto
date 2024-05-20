import { fromZonedTime } from 'date-fns-tz';
import Decimal from 'decimal.js-light';

export const formatPrice = (price: number) => {
  const fractionDigits = price.toString().split('.')[1]?.length;
  const defaultFractionDigits = 2;
  const minimumFractionDigits = fractionDigits > 1 ? fractionDigits : defaultFractionDigits;

  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits }).format(price);
};

let timer: number | null = null;

export function debounce<T extends (...args: any[]) => void>(func: T, wait = 100): (...args: Parameters<T>) => void {
  return function (...args: Parameters<T>) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

export function timeToTz({ originalTime, timeZone }: { originalTime: string; timeZone: 'America/Sao_Paulo' | 'UTC' }) {
  const zonedDate = fromZonedTime(+originalTime, timeZone, {
    timeZone: timeZone,
  });
  return zonedDate.getTime() / 1000;
}

export const formatPriceQuantity = (price: string) => {
  const fractionDigits = price
    .replace(/\.?0+$/, '')
    .toString()
    .split('.')[1]?.length;

  const minFractionDigits = 2;
  const maxFractionDigits = 5;
  const decimalPlaces =
    fractionDigits > 2 && new Decimal(price).lessThanOrEqualTo(1) ? maxFractionDigits : minFractionDigits;

  return new Decimal(price)
    .toDecimalPlaces(8)
    .toDecimalPlaces(decimalPlaces, Decimal.ROUND_DOWN)
    .toNumber()
    .toFixed(decimalPlaces);
};

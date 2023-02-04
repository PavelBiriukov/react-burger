import { FC } from "react";

export function setCookie(name: string, value: string, props: { [key: string]: any } & { expires?: number | Date | string } = {}) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 20000);
    exp = props.expires = d;
  }
  if (exp && (exp as Date).toUTCString) {
    props.expires = (exp as Date).toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;

}

export function deleteCookie(name: string) {
  setCookie(name, "", {
    'max-age': -1
  })
}

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setDay(day: number) {
  if (day === 0) {
    return 'сегoдня'
  };
  if (day === 1) {
    return 'вчера'
  };
  if ( day > 1 && day < 5 ) {
    return `${day} дня назад`
  } 
  if ( (day % 10 > 1) && (day % 10 <= 5) && (day > 20)) {
    return `${day} дня назад`
  }
  if ( (day % 10 === 1) && (day > 20)) {
    return `${day} день назад`
  }
 return `${day} дней назад`
}

export const setDate = (date: string | any) => { // если только string то почему-то ошибка ?  
  const dateTime = date?.slice(11, 16);
  const dateYearMonthDay = date?.slice(0, 10);
  const dateNew: any = new Date;
  const dateDayMS = dateNew - Date.parse(dateYearMonthDay);
  const dateDay = Math.floor(dateDayMS / 3600 / 24 / 1000);
  const newFormatDay = setDay(dateDay)
  return `${newFormatDay} ${dateTime} i-GMT+3`
} 

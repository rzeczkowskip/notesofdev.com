import React from 'react';

type PostDateProps = {
  date?: string | Date;
  intFormatOptions?: Intl.DateTimeFormatOptions;
  locale?: string;
  className?: string;
};

const dateToYmdString = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth().toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const Time = ({ date, locale, intFormatOptions }: PostDateProps) => {
  if (!date) {
    return null;
  }

  const dateToUse = typeof date === 'string' ? new Date(date) : date;

  const formattedDate = new Intl.DateTimeFormat(
    locale,
    intFormatOptions || {
      dateStyle: 'medium',
    },
  ).format(dateToUse);

  return <time dateTime={dateToYmdString(dateToUse)}>{formattedDate}</time>;
};

export default Time;

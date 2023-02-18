export function compare_date(a: string, b: string) {
  let Adate = a.split('.') // день, месяц, год
  let ADate = Adate.map((x) => parseInt(x))

  let Bdate = b.split('.') // день, месяц, год
  let BDate = Bdate.map((x) => parseInt(x))

  let ans = 0;
  // Сравнение годов
  if(ADate[2] < BDate[2]) ans = -1;
  else if(ADate[2] > BDate[2]) ans = 1;
  // Сравнение месяцев
  else if(ADate[1] < BDate[1]) ans = -1;
  else if(ADate[1] > BDate[1]) ans = 1;
  // Сравнение дней
  else if(ADate[0] < BDate[0]) ans = -1;
  else if(ADate[0] > BDate[0]) ans = 1;

  return ans;
}

export function compare_time(a: string, b: string) {
  let Atime = a.split(':') // час(24ч), минуты
  let ATime = Atime.map((x) => parseInt(x))

  let Btime = b.split(':') // час(24ч), минуты
  let BTime = Btime.map((x) => parseInt(x))

  let ans = 0;
  // Сравнение часов
  if(ATime[0] < BTime[0]) ans = -1;
  else if(ATime[0] > BTime[0]) ans = 1;

  // Сравнение минут
  else if(ATime[1] < BTime[1]) ans = -1;
  else if(ATime[1] > BTime[1]) ans = 1;
  return ans;
}
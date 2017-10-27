/**
 * Created by wuxiaoran on 2017/10/27.
 */
/* eslint-disable */
export default function (option) {
  var { number = 0,
    symbol = '$',
    precision = 2,
    thousand = ',',
    decimal = '.' } = option;
  var negative = number < 0 ? '-' : '',
    i = parseInt((number = Math.abs(+number || 0).toFixed(precision)), 10) + '',
    j = (j = i.length) > 3 ? j % 3 : 0;
  return (
    symbol +
    negative +
    (j ? i.substr(0, j) + thousand : '') +
    i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) +
    (precision
      ? decimal +
        Math.abs(number - i)
          .toFixed(precision)
          .slice(2)
      : '')
  );
}

export const getElemsFromObj = (obj, param = null) => {
  const result = []; 
  for (const key in obj) {
    param
      ? result.push(obj[key][param])
      : result.push(obj[key]);
  }
  return result.join(', ');
}; 
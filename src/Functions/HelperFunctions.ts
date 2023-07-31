const generateKey = (data:string) => {
  return `${ data }_${ (Math.random() * new Date().getTime()) }`;
}

export {
  generateKey
}
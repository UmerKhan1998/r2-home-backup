const setLocal = (name, value) => localStorage.setItem(name, value);

const getLocal = (name) => localStorage.getItem(name);

const removeLocal = (name) =>  localStorage.removeItem(name);

export { setLocal, getLocal, removeLocal };

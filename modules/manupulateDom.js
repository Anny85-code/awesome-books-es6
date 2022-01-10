export const findHight = () => {
  if (window.innerHeight < document.body.scrollHeight) {
    document.querySelector('footer').style.position = 'relative';
  } else {
    document.querySelector('footer').style.position = 'fixed';
  }
};
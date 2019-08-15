class CreateDom {
  static addStyleByLink(url) {
    const style = document.createElement('link');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('href', url);
    document.getElementsByTagName('head')[0].appendChild(style);
  }
}

export default CreateDom;

let alerts = 0;

class Alert extends HTMLDivElement {
  constructor(text) {
    super();
    this.id = 'alert_' + alerts;
    this.className = 'alert';

    this.style.opacity = '0.0';
    this.ticks = 0;
    let int = setInterval(() => {
      this.style.opacity = '0.' + this.ticks++;
      if(this.ticks == 10) {
        clearInterval(int);
        this.style.opacity = '1.0';
      }
    }, 50);

    this.innerHTML = text + '<br>';
    this.appendChild(new AlertButton(alerts));
    
    let _break = document.createElement('br');
    _break.id = 'br_' + alerts++;
    document.body.appendChild(this);
    document.body.appendChild(_break);
  }
}

class AlertButton extends HTMLButtonElement {
  constructor(id) {
    super();
    this.className = 'alertbutton';
    this.onclick = () => {
      document.getElementById('alert_' + id).remove();
      document.getElementById('br_' + id).remove();
    };
    this.innerHTML = 'Dismiss';
  }
}


customElements.define('alert-box', Alert, {extends: 'div'});
customElements.define('alert-button', AlertButton, {extends: 'button'});
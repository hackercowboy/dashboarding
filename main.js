import { app, BrowserWindow } from 'electron';

const CONFIG = {
  DASHBOARDING_WIDTH: parseInt(process.env.DASHBOARDING_WIDTH || 1920, 10),
  DASHBOARDING_HEIGHT: parseInt(process.env.DASHBOARDING_HEIGHT || 1080, 10),
  DASHBOARDING_TITLE: process.env.DASHBOARDING_TITLE || 'Dashboarding',
  DASHBOARDING_URLS: process.env.DASHBOARDING_URLS || 'http://dashingdemo.herokuapp.com/sample',
  DASHBOARDING_INTERVAL: parseInt(process.env.DASHBOARDING_INTERVAL || 30000, 10),
};

let window = null;

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  window = new BrowserWindow({
    width: CONFIG.DASHBOARDING_WIDTH,
    height: CONFIG.DASHBOARDING_HEIGHT,
    title: CONFIG.TITLE,
    kiost: true,
    frame: false,
    webPreferences: { webSecurity: false, allowRunningInsecureContent: true },
  });

  window.DASHBOARDING_WIDTH = CONFIG.DASHBOARDING_WIDTH;
  window.DASHBOARDING_HEIGHT = CONFIG.DASHBOARDING_HEIGHT;
  window.DASHBOARDING_URLS = CONFIG.DASHBOARDING_URLS;
  window.DASHBOARDING_INTERVAL = CONFIG.DASHBOARDING_INTERVAL;

  window.webContents.on('did-finish-load', () => {
    setTimeout(() => {
      window.show();
    }, 300);
  });

  window.loadURL(`file://${__dirname}/index.html`);
  window.on('closed', () => {
    window = null;
  });
});

FROM node:8

RUN apt-get update && apt-get install -y --no-install-recommends \
  apt-utils \
  clang \
  xserver-xorg-core \
  xserver-xorg-input-all \
  xserver-xorg-video-fbdev \
  xorg \
  libxcb-image0 \
  libxcb-util0 \
  xdg-utils \
  libdbus-1-dev \
  libgtk-3-dev \
  libnotify-dev \
  libgnome-keyring-dev \
  libgconf2-dev \
  libasound2-dev \
  libcap-dev \
  libcups2-dev \
  libxtst-dev \
  libxss1 \
  libnss3-dev \
  libsmbclient \
  libssh-4 \
  fbset \
  libexpat-dev

RUN echo "#!/bin/bash" > /etc/X11/xinit/xserverrc \
  && echo "" >> /etc/X11/xinit/xserverrc \
  && echo 'exec /usr/bin/X -s 0 dpms -nocursor -nolisten tcp "$@"' >> /etc/X11/xinit/xserverrc

# Move to app dir
WORKDIR /usr/src/app

# Move package.json to filesystem
COPY package.json yarn.lock ./

# Install npm modules for the application
RUN yarn install && node_modules/.bin/electron-rebuild

# Move app to filesystem
COPY ./ ./

## uncomment if you want systemd
ENV INITSYSTEM on

# Start app
CMD ["bash", "/usr/src/app/start.sh"]

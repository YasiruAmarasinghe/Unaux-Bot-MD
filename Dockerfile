FROM unaxbotmd/YasiruAmarasinghe:main

RUN git clone https://github.com/YasiruAmarasinghe/Unaux-Bot-MD /root/Unaux-Bot-MD
WORKDIR /root//Unaux-Bot-MD
ENV TZ=Europe/Istanbul
RUN npm install
RUN npm start

CMD ["node", "index.js"]
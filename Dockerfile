FROM yasiruamarasinghe/unauxbotmd

RUN git clone https://github.com/YasiruAmarasinghe/Unaux-Bot-MD /root/Unaux-Bot-MD
WORKDIR /root/unauxbotmd
ENV TZ=Europe/Istanbul
RUN npm install
RUN npm start
COPY --from=builder /root/unauxbotmd /root/unauxbotmd
CMD ["node", "index.js"]

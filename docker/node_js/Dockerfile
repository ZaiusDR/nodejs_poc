FROM ubuntu:latest
ENV src_dir /src
RUN apt-get update && apt-get install -y curl

RUN apt-get install -y gcc g++ make gnupg2

RUN curl -sL https://deb.nodesource.com/setup_11.x | bash -

RUN apt-get update && apt-get install -y nodejs

RUN npm install -g nodemon pg

VOLUME ${src_dir}

EXPOSE 3000 9229

WORKDIR ${src_dir}

CMD ["/usr/bin/nodemon", "--inspect=0.0.0.0:9229", "app.js"]

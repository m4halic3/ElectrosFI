FROM conda/miniconda3 as conda_base
WORKDIR /
RUN conda update conda
RUN conda create -n mp -c conda-forge/label/cf202003 pymeep
RUN activate mp

FROM node:14 as node_base
WORKDIR /
COPY package*.json ./
RUN npm install
COPY . .
COPY --from=conda_base  . .
WORKDIR /
RUN mkdir routes/storage
RUN mkdir storage
RUN mkdir storage/users
RUN chown -R www-data:www-data /routes/storage
RUN chown -R www-data:www-data /storage
USER www-data
RUN conda --version 
CMD conda run --verbose --debug-wrapper-scripts -n mp npm run start

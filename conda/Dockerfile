FROM cloudfoundry/cflinuxfs3:0.82.0

WORKDIR /root

ENV PATH="/root/miniconda3/bin:$PATH"

RUN apt-get update && apt-get install -y groff groff-base libcairo2-dev libpango1.0-dev libgif-dev && \
    curl -L https://repo.continuum.io/miniconda/Miniconda3-4.6.14-Linux-x86_64.sh -o miniconda.sh && \
    /bin/bash miniconda.sh -b -p $HOME/miniconda3 && \
    rm miniconda.sh && \
    echo 'root=$(pwd -P)' >> /root/.bashrc && \
    export root=$root && \
    echo "y" | conda install python=3.6 && \
    conda config --add channels bioconda && \
    conda config --add channels conda-forge && \
    conda config --add channels local && \
    echo "y" | conda update -n root --all && \
    echo "y" | conda install "conda-build=3.17.8"

COPY ./ /root/

CMD ["bash", "./build.sh"]

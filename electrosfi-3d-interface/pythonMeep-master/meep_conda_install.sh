#Download data from meep repository 
wget https://repo.continuum.io/miniconda/Miniconda3-latest-Linux-x86_64.sh -O miniconda.sh
#Running the bash downloaded
bash miniconda.sh -b -p mp
#creating the environment of development
export PATH=mp/bin:$PATH
#defining the conda meep mode
conda create -n mp -c conda-forge pymeep
#activating the conda mp
conda activate mp

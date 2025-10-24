# NLopt

## Documentação do NLopt

NLopt é uma biblioteca de otimização não linear, ou seja, quando no resultado obtemos uma parábola, com curvas ou retas não lineares, obtendo muitos valores Y para apenas um X.
Pode-se utilizar a biblioteca nas linguagens: C, C++, Fortran, Matlab ou GNU Octave, Python, GNU Guile, Julia, GNU R, Lua, OCalm, Rust e Crystal.


### Como instalar NLopt no Manjaro Linux:
Ao iniciar seu ISO abra o terminal;
Caso não tenha o comando “yay” pode-se instalá-lo com o comando: sudo pacman -S yay;
Use o comando “sudo yay -S nlopt” para instalar a biblioteca no computador;
Caso não tenha instalado a biblioteca “NumPy” pode-se instalá-la com o comando: sudo pacman -S python-numpy;
Depois pode-se instalar o Visual Studio Code para começar a fazer a utilização das biblioteca com o comando:sudo ln -s /var/lib/snapd/snap /snap, e depois o comando: sudo snap install code --classic; 

### Entendendo NLopt:
Para começar a utilizar a biblioteca deve-se antes saber como ela funciona, primeiro deve-se saber como é usada a otimização da biblioteca NLopt: basicamente  um problema de otimização é aquele onde se procura determinar os valores extremos de uma função, isto é, o maior ou o menor valor que uma função pode assumir em um dado intervalo.
	Segundo deve-se saber o que são pontos mínimo e máximo e global. Observe a imagem abaixo:

 
##### O ponto máximo global é o ponto mais alto de uma função f(x) onde x² é negativo. Exemplo:  f(x)=-x²+3x-2.
Com  -x²  consegue-se a informação necessária para saber que deve-se utilizar a função do máximo global. Caso utilizasse a função do mínimo global daria erro, pois o ponto mínimo na função é infinito.


##### O ponto mínimo global é o ponto mais baixo de uma função f(x) onde x² é positivo.Exemplo: f(x)=x²-2x.
Com x² consegue-se a informação necessária para saber que  deve-se usar a função do mínimo global. Caso utilizasse a função do máximo global daria erro, pois o ponto máximo na função é infinito.




#### Terceiro deve-se saber o que são os pontos mínimos e máximos locais. Observe a imagem abaixo:




##### O ponto máximo local são os pontos altos de cada região do gráfico:

O que diferencia os pontos máximos locais do ponto máximo global é: o ponto máximo global é o ponto mais alto de toda função, enquanto os pontos máximos locais são os pontos mais altos de cada região da função.


##### O ponto máximo local são os pontos altos de cada região do gráfico:

O que diferencia os pontos mínimos locais do ponto mínimo global é: o ponto mínimo global é o ponto mais baixo de toda função, enquanto os pontos mínimos locais são os pontos mais baixos de cada região da função.
### Utilizando NLopt:
Depois de entender como funciona pode-se começar a prática. Para iniciar deve-se abrir o Visual Studio Code e criar um arquivo .py, em seguida devemos chamar a biblioteca Nlopt e a Numpy:

import nlopt 
from numpy import *

## Inforcações do projeto

### bibliotecas utilizadas:

- nlopt
- numpy
- FastAPI

### como rodar?

#### para criar a imagem docker: 

```shell
docker build -t nlopt .
```

#### para rodar localmente:

crie um virtualenv:

```shell
python -m venv venv

source venv/bin/activate
```

baixe as dependencias:

```shell
pip install -r requirements.txt
```

rode o comando:

```shell
uvicorn app.main:app --reload --port 5000
```

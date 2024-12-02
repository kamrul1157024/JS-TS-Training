# Setup:

## Install jupyter notebook:
```
pyenv virtualenv 3.11 js-notebook
pip3 install jupyter
```
[https://docs.jupyter.org/en/latest/install/notebook-classic.html](https://docs.jupyter.org/en/latest/install/notebook-classic.html)


## Setup Deno:
[https://docs.deno.com/runtime/getting_started/installation/](https://docs.deno.com/runtime/getting_started/installation/)

## Setup Deno Kernal:
```
deno jupyter --unstable --install

```

## Running the Notebook:
```
cd <intern-js-ts-repo-path>
deno jupyter --unstable
jupyter notebook
```
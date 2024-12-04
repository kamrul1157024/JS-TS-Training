# Setup:
To Find the Session Slides [Click Here](https://docs.google.com/presentation/d/1wY1Wg98byqshZKg0iCfvOHjjNi17zvbLuzdOvh-u_Bk/edit?usp=sharing)
## Install jupyter notebook:
```
pyenv install 3.11
pyenv virtualenv 3.11 js-notebook
pyenv activate js-notebook
pip3 install jupyter
```
[https://docs.jupyter.org/en/latest/install/notebook-classic.html](https://docs.jupyter.org/en/latest/install/notebook-classic.html)


## Setup Deno:
[https://docs.deno.com/runtime/getting_started/installation/](https://docs.deno.com/runtime/getting_started/installation/)
For macos: `curl -fsSL https://deno.land/install.sh | sh`

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

## Homework:
- Work write a async iterator to iterate over paginated response in for loop [using this dummy data API and Typescript](https://dummyjson.com/docs/posts#posts-limit_skip)
- Iterate over DOM using BFS and print the node in level order without blocking CPU thread

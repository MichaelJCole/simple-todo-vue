#!/bin/bash

# Run this code locally w/o docker

# This loads nvm, load node version in .nvmrc
[[ -s "$HOME/.nvm/nvm.sh" ]] && source "$HOME/.nvm/nvm.sh" && nvm install

# Npm install if not already.
[[ ! -d "node_modules" ]] && npm install

NO_HMR=1 meteor

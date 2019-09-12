#!/bin/sh
git checkout master && \
(git branch -D dist || true) && \
git checkout -b dist && \
rm .gitignore && \
ng build --prod && \
cp CNAME dist/reportit-user/ && \
git add dist/reportit-user && \
git commit -m dist && \
(git branch -D gh-pages || true) && \
git subtree split --prefix dist/reportit-user -b gh-pages && \
git push -f origin gh-pages:gh-pages && \
git checkout master && \
git branch -D gh-pages && \
git branch -D dist && \
git checkout . && \
git push

git checkout -b deploy

# clear all source files and put contens of dist/ into public/
rm -rf public/src
rm public/index.html
rm public/style.css

cp public/dist/* public/

rm -rf public/dist

# commit deploy files
git add . --all
git commit -m "automated deploy commit"

# deploy branch on deploy remote (dokku)
git push deploy deploy -f

# clear deploy stuff
git checkout master
rm public/script.js # we don't use this
# git branch -D deploy
git checkout -b deploy

if [[ `git symbolic-ref HEAD` != "refs/heads/deploy" ]]; then
  echo "Can't deploy when branch 'deploy' already exists. Please delete it."
  exit 1
fi

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
git push deploy deploy:master -f

# clear deploy stuff
git checkout master
git branch -D deploy
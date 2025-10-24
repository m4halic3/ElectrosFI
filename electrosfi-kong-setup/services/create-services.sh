cd ./services

git clone https://github.com/electrosfi-org/gmsh-integration.git
git clone https://github.com/electrosfi-org/nlopt_integration.git
git clone https://github.com/electrosfi-org/electrosfi-base.git

rm -r gmsh-integration/.git -f
rm -r nlopt_integration/.git -f
rm -r electrosfi-base/.git -f

cp ../.env ./electrosfi-base/electrosfi-master/.env
cp ../.env ./electrosfi-base/electrosfi-backend-master/.env

mkdir ./electrosfi-base/pythonMeep-master/storage/users
mkdir ./electrosfi-base/pythonMeep-master/routes/storage

chmod 775 -R ./electrosfi-base/pythonMeep-master/storage
chmod 775 -R ./electrosfi-base/pythonMeep-master/routes/storage

cd ..

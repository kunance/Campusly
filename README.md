## To build and run the application:

### In angular directory:
        - grunt build
        - grunt compile
        - grunt watch

###    In express directory:
        node app



#### Install mysql and sequelize-auto on your local machine globally to generate the ORM models to be used by Node code
```
$ sudo npm install -g mysql
$ sudo npm install -g sequelize-auto
```


#### When you changing the ERD (database schema) , you can quickly regenerate the models but note if you use the models dir it will overwrite previous definitions

**Do NOT delete the directory since models/index.js loads all the models AND is not regenerated**

Currently the config file is not used due to a bug https://github.com/sequelize/sequelize-auto/issues/6 but I haven't found a better alternative yet so you have to add manually to each generated model
```
$ sequelize-auto -h localhost -d Rented -u renteddbadmin -x rentedrented -p 3306 -e mysql -c "../sequelizeAutoConfig.json"  -o "./models"
```


## How to setup EC2 instance after it is created

#### Modify your local ~/.ssh/config by adding two entries for the newly created EC2 instance and pem file (AWS key pair)

#### You need this to ssh ec2Micro from your local machine into EC2 instance
```
Host ec2Micro
HostName ec2-54-149-70-41.us-west-2.compute.amazonaws.com
User ubuntu
IdentityFile ~/.ssh/RentedJR.pem
```

#### You need this entry to git push from your local machine into EC2 instance since most Git upstream definitions use a FQDN and don't use an alias
```
Host ec2-54-149-70-41.us-west-2.compute.amazonaws.com
HostName ec2-54-149-70-41.us-west-2.compute.amazonaws.com
User ubuntu
IdentityFile ~/.ssh/RentedJR.pem
```


#### ssh into your EC2 instance
```
$ ssh ec2Mirco
```

#### Install node.js:
```
sudo apt-get update
sudo apt-get install -y python-software-properties python g++ make
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install nginx
```

#### Install GIT, Forever, PM2, and Grunt:
```
sudo apt-get install git
sudo npm install forever -g
sudo npm install pm2 -g
sudo npm install grunt-cli -g
```

#### Ensure permission for ubuntu user for globally installed tools since you installed as sudo
```
$ cd /home/ubuntu/.npm
$ sudo chown ubuntu:ubuntu *
```


#### On EC2 instance
```
$ cd /home/ubuntu
$ mkdir repo_rented_do_not_delete
$ cd repo_rented_do_not_delete/
$ git init --bare
```

#### On local machine in your root directory, Rented, of you local cloned or forked repo
```
$ git remote add AWS_micro_server ssh://ubuntu@ec2-54-149-70-41.us-west-2.compute.amazonaws.com/repo_rented_do_not_delete
```


#### On EC2 instance, modify the post-receive file by adding the following:

```
$ vi /home/ubuntu/repo_rented_do_not_delete/hooks/post-receive
#!/bin/bash

while read oldrev newrev ref
do
  branch=`echo $ref | cut -d/ -f3`
  echo branch
  if [ "production" == "$branch" -o "master" == "$branch" ]; then

    git --work-tree=/var/www/rentedBranches/master/ checkout -f $branch

    echo 'Changes pushed to Amazon EC2 master.'
  fi

 if [ "v1.02" == "$branch" ]; then

    git --work-tree=/var/www/rentedBranches/v1.02/ checkout -f $branch

    echo 'Changes pushed to Amazon EC2 for v1.02.'
  fi

  if [ "Experian" == "$branch" ]; then

    git --work-tree=/var/www/rentedBranches/experian/ checkout -f $branch

    echo 'Changes pushed to Amazon EC2 for Experian branch.'
  fi
done
```

#### Ensure hook is executable
```
$ chmod +x hooks/post-receive
```

####  On EC2 instance, create directories for the repo's branches you will push over to the EC2 instance from your local machine
```
$ sudo mkdir /var/www/rented.co
$ sudo mkdir /var/www/rented.co/public_html
$ sudo mkdir /var/www/rented.co/experian
```


####  Push code from your local machine
```
$ git push AWS_micro_server master
$ git push AWS_micro_server Experian
```

####  On EC2 instance, check code was copied into the appropriate directoroy from the post-recieve hook
```
$ ls -lart /var/www/rented.co/public_html/
$ ls -lart /var/www/rented.co/experian/
```



#### Check Ubuntu version
```
$ lsb_release -a
```
No LSB modules are available.
Distributor ID:	Ubuntu
Description:	Ubuntu 14.04.1 LTS
Release:	14.04
Codename:	trusty


###  OpenSSL http://docs.aws.amazon.com/opsworks/latest/userguide/workingsecurity-ssl.html
##### http://manpages.ubuntu.com/manpages/hardy/man1/version.1ssl.html
##### check latest versions @  http://www.openssl.org/

##### check your EC2 instance's version
```
$ openssl version
```

##### create a private key to be used for SSL by Nginx
```
$ openssl genrsa 2048 > privkey.pem
```


##### You can also generate a self-signed certificate, which can be used for testing purposes only. For this example, use the following command line to generate a self-signed certificate.
```
$ openssl x509 -req -days 365 -in csr.pem -signkey privkey.pem -out server.crt
```

**Ensure you move server.crt, privkey.pem, and csr.pem into the directory that is configured in nginx.conf /home/ubuntu/certificates in my case**





### Current questions to be moved to wiki Q&A
Should Nginx be installed in /usr/sbin/nginx since that is the default on ubuntu with sudo apt-get install nginx?








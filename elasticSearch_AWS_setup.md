### Create EC2 instance(s) for Elastic Search cluster and tag each instance
### Create new key pair Elastic Search cluster   (use same key for all instances in cluster)
### Create a new security group for Elastic Search cluster (use same sec group for all instances in cluster)
### Create an elastic IP for each EC2 instance
### Associate elastic IP with EC2 Instance
### Modify EC2 instance hosts file:
```
     sudo vim /etc/hosts   and add 127.0.01 cool_name
     sudo hostname cool_name
     logoff and login to verify ubuntu@cool_name instead of ubuntu@IP
```



### Create the IAM user, so the cluster instances would receive the access to our AWS account and would be able to find each other.
``` elasticsearch
Access Key ID:
AKIAID32FB67NM4UWO2Q
Secret Access Key:
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
```

### Set user, elasticsearch to read-only permissions by attaching a user policy, so it can read the EC2 instances list.



### https://gist.github.com/ricardo-rossi/8265589463915837429d

### copied here just in case gist above goes away :)

### Install OpenJDK
cd ~
sudo apt-get update
sudo apt-get install openjdk-7-jre-headless -y

### Download and Install ElasticSearch
### Check http://www.elasticsearch.org/download/ for latest version of ElasticSearch and replace wget link below
wget https://download.elasticsearch.org/elasticsearch/elasticsearch/elasticsearch-1.3.1.deb
sudo dpkg -i elasticsearch-1.3.1.deb

### Install the Java Service Wrapper for ElasticSearch
curl -L http://github.com/elasticsearch/elasticsearch-servicewrapper/tarball/master | tar -xz
sudo mkdir /usr/local/share/elasticsearch
sudo mkdir /usr/local/share/elasticsearch/bin
sudo mv *servicewrapper*/service /usr/local/share/elasticsearch/bin/
rm -Rf *servicewrapper*
sudo /usr/local/share/elasticsearch/bin/service/elasticsearch install
sudo ln -s `readlink -f /usr/local/share/elasticsearch/bin/service/elasticsearch` /usr/local/bin/rcelasticsearch

### Start ElasticSearch
sudo service elasticsearch start

### Make sure service is running
curl http://localhost:9200

### Should return something like this:
```
{
  "status" : 200,
  "name" : "Storm",
  "version" : {
    "number" : "1.3.1",
    "build_hash" : "2de6dc5268c32fb49b205233c138d93aaf772015",
    "build_timestamp" : "2014-07-28T14:45:15Z",
    "build_snapshot" : false,
    "lucene_version" : "4.9"
  },
  "tagline" : "You Know, for Search"
}
```



### Install https://github.com/jprante/elasticsearch-river-jdbc


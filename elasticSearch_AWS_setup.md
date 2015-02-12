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



### https://gist.github.com/ricardo-rossi/8265589463915837429d   copied below just in case gist above goes away :)


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


### Stop ElasticSearch
sudo service elasticsearch stop

## Enable the elasticsearch start during the server start we should execute:
	
sudo update-rc.d elasticsearch defaults 95 10

## Install the elasticsearch-cloud-aws plugin
cd /usr/share/elasticsearch/
sudo bin/plugin -install elasticsearch/elasticsearch-cloud-aws/2.3.0

## Install is the kopf plugin, the one we would use to overview our cluster configuration
sudo bin/plugin -install lmenezes/elasticsearch-kopf/1.2&nbsp;


## Now, we should update the elasticsearch configuration file.
## Backup the default file:
sudo cp /etc/elasticsearch/elasticsearch.yml /etc/elasticsearch/elasticsearch.yml.bak


## Referencing http://pavelpolyakov.com/2014/08/14/elasticsearch-cluster-on-aws-part-2-configuring-the-elasticsearch/
## Create the new elasticsearch.yml file, for hermes ( or another EC2 instance) it should look like this:
# paths
# path.data: "/srv/elasticsearch/data"
 
# additional configuration
bootstrap.mlockall: true
indices.fielddata.cache.size: "30%"
indices.cache.filter.size: "30%"
 
# AWS discovery  keys made for elasticsearch user
cloud.aws.access_key: "AKIAID32FB67NM4UWO2Q"
cloud.aws.secret_key: "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"

 
#plugin.mandatory: "cloud-aws"
 
#cluster.name: "LogstashCluster"
 
node.name: "hermes"
 
discovery.type: "ec2"
discovery.ec2.groups: "elasticsearch cluster"
discovery.ec2.host_type: "public_ip"
discovery.ec2.ping_timeout: "30s"
discovery.ec2.availability_zones: "us-west-2"
cloud.aws.region: "us-west-2"
 
discovery.zen.ping.multicast.enabled: false
 
# public facing elastic IP
network.publish_host: "54.191.87.148"



### start/restart our elasticsearch instance
sudo service elasticsearch start


### Install elasticsearch-river-jdbc  ( https://github.com/jprante/elasticsearch-river-jdbc)
```
cd /usr/share/elasticsearch

sudo ./bin/plugin --install jdbc --url http://xbib.org/repository/org/xbib/elasticsearch/plugin/elasticsearch-river-jdbc/1.4.0.6/elasticsearch-river-jdbc-1.4.0.6-plugin.zip

sudo curl -o mysql-connector-java-5.1.33.zip -L 'http://dev.mysql.com/get/Downloads/Connector-J/mysql-connector-java-5.1.33.zip/from/http://cdn.mysql.com/'
sudo unzip mysql-connector-java-5.1.33.zip 

sudo cp mysql-connector-java-5.1.33/mysql-connector-java-5.1.33-bin.jar /usr/share/elasticsearch/plugins/jdbc/
sudo chmod 644 /usr/share/elasticsearch/plugins/jdbc/*

sudo mkdir /usr/share/elasticsearch/config

sudo ln -s /etc/elasticsearch/elasticsearch.yml /usr/share/elasticsearch/config/elasticsearch.yml


sudo service elasticsearch stop

sudo service elasticsearch start


curl -XPUT 'localhost:9200/_river/my_jdbc_river/_meta' -d '{
    "type" : "jdbc",
    "jdbc" : {
        "url" : "jdbc:mysql://172-31-35-208:3306/Rented",
        "user" : "ivan",
        "password" : "rentedrented",
        "sql" : "select * from apartment_complex"
    }
}'

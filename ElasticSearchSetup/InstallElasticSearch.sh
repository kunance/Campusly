### https://gist.github.com/gourneau/66e0bd90c92ad829590b

### Install OpenJDK
cd ~
sudo add-apt-repository -y ppa:webupd8team/java
sudo apt-get update
echo debconf shared/accepted-oracle-license-v1-1 select true | sudo debconf-set-selections
echo debconf shared/accepted-oracle-license-v1-1 seen true | sudo debconf-set-selections
sudo aptitude -y install oracle-java8-installer

## Download and Install ElasticSearch using apt
echo "Downloading and Installing latest stable 1.4 ElasticSearch using apt"

### Download and install the Public Signing Key
wget -qO - https://packages.elasticsearch.org/GPG-KEY-elasticsearch | sudo apt-key add -

### Add the following to your /etc/apt/sources.list to enable the repository
sudo add-apt-repository "deb http://packages.elasticsearch.org/elasticsearch/1.4/debian stable main"

### Run apt-get update and the repository is ready for use. You can install it with :
sudo apt-get update && sudo apt-get install elasticsearch

cd /usr/share/elasticsearch

## Install is the kopf plugin, the one we would use to overview our cluster configuration
sudo ./bin/plugin -install lmenezes/elasticsearch-kopf/1.4.5


## Install the elasticsearch-cloud-aws plugin
#cd /usr/share/elasticsearch/
sudo ./bin/plugin -install elasticsearch/elasticsearch-cloud-aws/2.4.1


### Referencing http://pavelpolyakov.com/2014/08/14/elasticsearch-cluster-on-aws-part-2-configuring-the-elasticsearch/
### Create the new elasticsearch.yml file, for hermes ( or another EC2 instance) and backup the default file:
sudo cp  /etc/elasticsearch/elasticsearch.yml  /etc/elasticsearch/elasticsearch.yml.bak
sudo cp ~/elasticsearch.yml  /etc/elasticsearch/elasticsearch.yml



### Configure Elasticsearch to automatically start during bootup :
sudo update-rc.d elasticsearch defaults 95 10



### Start ElasticSearch
#sudo service elasticsearch start

### Make sure service is running ... but service takes a minute to run so don't auto test without a wait first
#curl http://localhost:9200

### Should return something like this:
#{
#  "status" : 200,
#  "name" : "Storm",
#  "version" : {
#    "number" : "1.3.1",
#    "build_hash" : "2de6dc5268c32fb49b205233c138d93aaf772015",
#    "build_timestamp" : "2014-07-28T14:45:15Z",
#    "build_snapshot" : false,
#    "lucene_version" : "4.9"
#  },
#  "tagline" : "You Know, for Search"
#}


### Stop ElasticSearch
#sudo service elasticsearch stop




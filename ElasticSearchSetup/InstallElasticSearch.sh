### https://gist.github.com/janpieper/2c96fb12d9b566a679a5
### ElasticSearch version
if [ -z "$1" ]; then
  echo ""
  echo "  Please specify the Elasticsearch version you want to install!"
  echo ""
  echo "    $ $0 1.4.2"
  echo ""
  exit 1
fi

ELASTICSEARCH_VERSION=$1

if [[ ! "${ELASTICSEARCH_VERSION}" =~ ^[0-9]+\.[0-9]+\.[0-9]+ ]]; then
  echo ""
  echo "  The specified Elasticsearch version isn't valid!"
  echo ""
  echo "    $ $0 1.4.2"
  echo ""
  exit 2
fi

### Install OpenJDK
cd ~
sudo apt-get update
sudo apt-get install openjdk-7-jre-headless -y

### Download and Install ElasticSearch
### Check http://www.elasticsearch.org/download/ for latest version of ElasticSearch and replace wget link below
wget https://download.elasticsearch.org/elasticsearch/elasticsearch/elasticsearch-${ELASTICSEARCH_VERSION}.deb
sudo dpkg -i elasticsearch-${ELASTICSEARCH_VERSION}.deb

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
sudo service elasticsearch stop

## Enable the elasticsearch start during the server start we should execute:

sudo update-rc.d elasticsearch defaults 95 10

## Install the elasticsearch-cloud-aws plugin
cd /usr/share/elasticsearch/
sudo bin/plugin -install elasticsearch/elasticsearch-cloud-aws/2.3.0

## Install is the kopf plugin, the one we would use to overview our cluster configuration
sudo bin/plugin -install lmenezes/elasticsearch-kopf/1.2&nbsp;

### Referencing http://pavelpolyakov.com/2014/08/14/elasticsearch-cluster-on-aws-part-2-configuring-the-elasticsearch/
### Create the new elasticsearch.yml file, for hermes ( or another EC2 instance) it should look like this:
### Now, we should update the elasticsearch configuration file, so backup the default file:

sudo cp /etc/elasticsearch/elasticsearch.yml /etc/elasticsearch/elasticsearch.yml.bak


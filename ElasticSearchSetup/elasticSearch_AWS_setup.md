### Create EC2 instance(s) for Elastic Search cluster and tag each instance 
### Create new key pair Elastic Search cluster   (use same key for all instances in cluster)
### Create a new security group for Elastic Search cluster (use same sec group for all instances in cluster)
### Create an elastic IP for each EC2 instance
### Associate elastic IP with EC2 Instance
### Modify EC2 instance hosts file:
     * sudo vim /etc/hosts   and add 127.0.01 cool_name
     * sudo hostname cool_name
     * logoff and login to verify ubuntu@cool_name instead of ubuntu@IP



### Create the IAM user, so the cluster instances would receive the access to our AWS account and would be able to find each other:
    * user: elasticsearch
    * Access Key ID: AKIAID32FB67NM4UWO2Q
    * Secret Access Key: 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


### Set user, elasticsearch to read-only permissions by attaching a user policy, so it can read the EC2 instances list.


[Install elastic search using this script](InstallElasticSearch.sh)


### Create your new /etc/elasticsearch/elasticsearch.yml
[Example elasticsearch config file](elasticsearch.yml)

### Update /etc/default/elasticsearch with param values before starting
     * ES_HEAP_SIZE=2g
     * MAX_LOCKED_MEMORY=unlimited




### start/restart our elasticsearch instance
sudo service elasticsearch start



### Install elasticsearch-river-jdbc  ( https://github.com/jprante/elasticsearch-river-jdbc)
[Run this install script](InstallEsRiverJdbc.sh)

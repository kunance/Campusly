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

# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "dduportal/boot2docker"
  config.vm.box_version = ">= 1.5.0, < 1.6.0"

  config.vm.network :forwarded_port, guest: 3000, host: 3000
  config.vm.network :forwarded_port, guest: 28017, host: 28017

  config.vm.provider "virtualbox" do |v|
    v.memory = 1024
  end

  # Dockerをリモート実行するために認証情報をローカルへコピーする
  config.vm.provision "shell", inline: <<-SHELL
    sudo echo 'nameserver 8.8.8.8' >  /etc/resolv.conf
    sudo echo 'nameserver 8.8.4.4' >> /etc/resolv.conf

    sleep 5
    sudo cp -rf /var/lib/boot2docker/tls /vagrant/.vagrant/
    sudo echo 'cp -rf /var/lib/boot2docker/tls /vagrant/.vagrant/' >> /var/lib/boot2docker/bootlocal.sh
  SHELL
end

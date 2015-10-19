HOSTNAME = "pomodoro.dev"
Vagrant.configure('2') do |config|
  config.vm.define "web" do |web|
    web.vm.box = "ubuntu/vivid64"
    web.vm.network :private_network, ip: "192.168.11.2"
    # web.vm.hostname = HOSTNAME
    web.vm.provision :shell, inline: "hostnamectl set-hostname #{HOSTNAME}"
    web.vm.network "forwarded_port", guest: 80, host: 8080
    # web.vm.synced_folder "./", "/pomodoro.cc", type: "nfs", :mount_options => ['nolock,vers=3,udp,noatime,actimeo=1']
    web.vm.provision :ansible do |ansible|
      ansible.inventory_path = "provisioning/vagrant_hosts"
      ansible.playbook = "provisioning/web.yml"
      ansible.sudo  = true
      ansible.verbose = true
    end
    web.vm.provider "virtualbox" do |vb|
      vb.customize ["modifyvm", :id, "--memory", 1024]
      vb.customize ["modifyvm", :id, "--cpus", 1]
    end
  end
end

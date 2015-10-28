Vagrant.configure('2') do |config|
  config.vm.box = 'ubuntu/trusty64'
  config.vm.hostname = 'pomodoro.dev'
  config.ssh.shell = 'bash -c \'BASH_ENV=/etc/profile exec bash\''

  config.vm.provider "virtualbox" do |vb|
    vb.customize ["modifyvm", :id, "--memory", 1024]
    vb.customize ["modifyvm", :id, "--cpus", 1]
  end

  config.vm.hostname = "pomodoro.dev"
  config.vm.network :private_network, ip: "192.168.11.2"
  config.vm.network "forwarded_port", guest: 80, host: 8080

  config.vm.synced_folder "./", "/pomodoro.cc", type: "nfs", :mount_options => ['nolock,vers=3,udp,noatime,actimeo=1']

  config.vm.provision "shell",
    inline: "echo 'cd /pomodoro.cc' >> /home/vagrant/.bashrc"

  config.vm.provision "shell", run: "always", path: "opt/docker.fix"
  config.vm.provision "docker" do |d|
    d.pull_images "alpine"
    d.pull_images "smebberson/alpine-nginx"
    d.pull_images "smebberson/alpine-redis"
    d.pull_images "asaaki/elixir-pure-alpine"
    d.pull_images "mongo"
    d.pull_images "jekyll/jekyll:stable"
  end
  config.vm.provision "shell",
    inline: "cd /pomodoro.cc; opt/docker.restart DEV"
end

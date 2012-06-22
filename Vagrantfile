# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant::Config.run do |config|
  # All Vagrant configuration is done here. The most common configuration
  # options are documented and commented below. For a complete reference,
  # please see the online documentation at vagrantup.com.

  # Every Vagrant virtual environment requires a box to build off of.
  config.vm.box = "lucid32"

  config.vm.boot_mode = :gui
  config.ssh.max_tries = 150

  config.vm.forward_port 80, 1111

  config.vm.provision :chef_solo do |chef|
      chef.json = {
          "hostname" => "devsrv.local"
      }

      chef.add_recipe "devsrv"
  end
end



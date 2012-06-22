# apt is needed for most recipes
require_recipe "apt"

# build essential is needed to build stuff locally
require_recipe "build-essential"


require_recipe "apache2"

apache_module "expires"

# setup the proxy mods

apache_module "proxy" do
    conf true
    enable true
end
apache_module "proxy_http"
apache_module "proxy_connect"





apache_site "default" do
  enable false
end



cookbook_file "#{node[:apache][:dir]}/sites-available/site.conf" do
  owner "root"
  group "root"
  mode "0644"
  action :create
end

apache_site "site.conf" do
  enable true
end












service "apache2" do
  action :restart
end

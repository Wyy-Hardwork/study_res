# nvm -- node版本管理工具

在拉取项目后进行依赖安装，发现有一部分无法安装。在yarn.lock确认了一下项目的node要高于本机安装的版本，于是决定使用nvm工具。
### 备注
- yarn.lock 里的@types/node@ 的 version 查看node版本
- 安装node前配置一下镜像地址
node_mirror: https://npm.taobao.org/mirrors/node
npm_mirror: https://npm.taobao.org/mirrors/npm
### nvm指令
- nvm install latest 安装最新版本node.js
- nvm use 版本号 使用某一具体版本，例如 ：nvm use 14.3.0
- nvm list 列出当前已安装的所有版本
- nvm ls 列出当前已安装的所有版本
- nvm uninstall 版本号 卸载某一具体版本，例如：nvm use 14.3.0
- nvm ls-remote Mac版本中,列出全部可以安装的node版本
- nvm ls available windows版本,列出全部可以安装的node版本
- nvm current 显示当前的版本
- nvm alias 给不同的版本号添加别名
- nvm unalias 删除已定义的别名
- nvm reinstall-packages 在当前版本node环境下，重新全局安装指定版本号的npm包

### 教程链接
https://blog.csdn.net/jj2320711457/article/details/117431854
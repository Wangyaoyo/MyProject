# [Linux CentOS 7 防火墙/端口设置](https://www.cnblogs.com/taiyonghai/p/5825578.html)

CentOS升级到7之后用firewall代替了iptables来设置Linux端口，

下面是具体的设置方法：

[]：选填

<>：必填

[<zone>]：作用域（block、dmz、drop、external、home、internal、public、trusted、work）

<port>：端口号

[-<port>]：或者端口范围

<protocol>：端口协议（tcp、udp）

[<seconds>]：过期时间，使用N秒后自动关闭（秒）

[--permanent]：永久设置，在重启后依然保证设置可用，如果不加此项，重启后端口会恢复关闭状态

**注：设置端口后要重启防火墙使其生效 firewall-cmd --reload**

**1、检查端口状态**

yes：已开通

no：未开通

```
firewall-cmd --query-port=<port>[-<port>]/<protocol>
```

```
firewall-cmd [--zone=<zone>] --query-port=<port>[-<port>]/<protocol>
```

```
firewall-cmd [--permanent] [--zone=<zone>] --query-port=<port>[-<port>]/<protocol>
```

![img](https://images2015.cnblogs.com/blog/172889/201608/172889-20160831134948965-763883536.jpg)

 查看已开放的端口

```
firewall-cmd --zone=public --list-ports
```

![img](https://images2015.cnblogs.com/blog/172889/201608/172889-20160831154143324-870883085.jpg)

 

**2、启用端口**

success：执行成功

warning：警告xxx

```
firewall-cmd --add-port=<port>[-<port>]/<protocol>
```

```
firewall-cmd [--zone=<zone>] --add-port=<port>[-<port>]/<protocol> [--timeout=<seconds>]
```

```
firewall-cmd [--permanent] [--zone=<zone>] --add-port=<port>[-<port>]/<protocol>
```

![img](https://images2015.cnblogs.com/blog/172889/201608/172889-20160831135015496-617743534.jpg)

 

**3、禁用端口** 

success：执行成功

warning：警告xxx

```
firewall-cmd --remove-port=<port>[-<port>]/<protocol>
```

```
firewall-cmd [--zone=<zone>] --remove-port=<port>[-<port>]/<protocol>
```

```
firewall-cmd [--permanent] [--zone=<zone>] --remove-port=<port>[-<port>]/<protocol>
```

![img](https://images2015.cnblogs.com/blog/172889/201608/172889-20160831135028121-1364100740.jpg)

 

**4、防火墙相关**

--reload：不改变状态的条件下重启防火墙

--complete-reload：状态信息将会丢失，当防火墙有问题时可以使用，如，状态信息和防火墙规则都正常却无法建立任何链接的情况等

```
firewall-cmd --reload
firewall-cmd --complete-reload
```

查看防火墙状态

```
firewall-cmd --state
```

查看、打开、关闭应急模式（应急模式阻断所有网络连接，防止出现紧急状况）

```
firewall-cmd --query-panic
firewall-cmd --panic-on
firewall-cmd --panic-off
```

打开、关闭、重启防火墙 

```
systemctl stop firewalld
systemctl start firewalld
systemctl restart firewalld
```

 开启/关闭 开机自启动防火墙

```
systemctl enable firewalld
systemctl disable firewalld
```
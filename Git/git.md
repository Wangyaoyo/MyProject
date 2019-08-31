## Git

工作区：自己建立的文件夹

暂存区（stage）：.git中的index文件

版本库：.git文件

**为什么存在暂存区？**：可以不必提交整个工作区间的修改内容，加入暂存区就可以分段提交

**答：便于分阶段和分批（分文件）提交**

### 删除

远程分支：

```git push origin --delete <BranchName> ```

删除本地分支：

```git branch -d <BranchName> ```

### 创建

本地创建分支提交到远程：

```git push --set-upstream origin <BranchName>```

合并冲突之后 ```add  commit```

### 拉取

拉取指定分支的代码：```git pull <远程主机名> <远程分支名>:<本地分支名> ```

设置代理：```set http_proxy=http://172.17.18.80:8080```

### 关联

将本地分支与远程分支进行关联：

 ```git branch --set-upstream-to=origin/develop yaoxxxyao```

### 推送

```git push  主机名  本地分支名 ： 远程分支名```

如果失败：尝试

```git config --system --unset credential.helper``` 输入账号密码后再推送

### 比较

本地分支：``` diff branchA branchB```

远程分支的话，```git diff branchA remoteB/branchB```

### 版本切换

版本的切换：```git reset --hard commit_id(head^x)```（x代表回退几个版本）

```git log```可以查看提交历史，以便确定要回退到哪个版本

```git reflog```查看命令历史，来确定要回到未来哪个版本

### 比较

```git diff ```：比较工作区和暂存区

```git diff --staged```：比较暂存区和HEAD文件

```git diff HEAD```：比较工作区和上次递交的文件的差异
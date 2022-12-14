用下列命令执行，查看引用情况

```
node --experimental-modules entry.mjs
```

总结的导入逻辑
1.按顺序先遍历文件里的所有import，
2.import一个文件，建立对应的引用（不会重复建立，后续碰到会略过），进入该文件从1步骤开始执行
3.走完该文件内所有的import,略过或从import的文件退出后。按顺序执行该文件的代码（碰到export时才会把导出的绑定到import的引用上）

特殊的点：
函数会有提升的效果，在遍历一个文件的import前，该文件的函数就已经定义了。


所以执行顺序是a.1=>a.2=>b.1=>b.2=>b.3=>a.3

# 总结
## 原则
1. import的顺序会影响文件link阶段和执行阶段与子模块之间的执行顺序，会把当前模块的阶段分成若干份，子模块执行完了才会回来执行后续的父模块剩下的逻辑
2. link阶段干的事情：声明模块导出引用，并绑定对应导出变量到引用上（此时全局会感知到该模块已导出引用，后续不会重复导出，直接使用该引用），声明并绑定子模块的引用，声明并初始化方法的实例（方法会提升），其他变量只会声明不会初始化
3. evaluate阶段干的事情：按顺序执行模块的代码，并初始化各个变量。


## 归纳
1. console.log在link阶段不执行，在evaluate阶段执行，可以判断其执行顺序。
2. 变量的声明在link阶段，且疑似声明在导入的一开始就做好了






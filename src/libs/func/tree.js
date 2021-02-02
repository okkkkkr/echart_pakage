import dfs from './dfs-deep-copy.js';
import { type } from './dfs-deep-copy.js';

// 树形结构类
class Tree {
    constructor(data) {
        this.data = data;
        this.linksData = [];
    }

    // 对象数据扁平化
    map(func) {
        let index = 0;
        let level = 0;

        let execute = (data, parentName) => {
            if (type(data) === 'array') {
                level++;

                data.map(item => {
                    // 存储关系链
                    if (parentName) {
                        this.linksData.push([parentName, item.name, item.links || '']);
                    }
                    execute(item);
                });

                level--;
            } else if (type(data) === 'object') {
                data.level = level;
                func(dfs(data), index);
                index++;

                Object.keys(data).map(item => {
                    execute(data[item], data.name);
                });
            }
        };

        execute(this.data);
    }

    // 关系链处理
    links() {
        return this.linksData;
    }
}

export default Tree;

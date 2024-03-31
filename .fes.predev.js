/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-16 10:53:09
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-05 08:47:57
 */
import { defineBuildConfig } from '@fesjs/fes';


//这里是配置的编辑处
export default defineBuildConfig({
    layout: {
        title: '数字孪生毕设',
        navigation: 'top',
        multiTabs: false,
        isFixedHeader: true,
        menus: [
            {
                name: 'preview',
                path: '/',
                title: '📀 预览演示'
            },
            {
                path: 'https://github.com/SJTU-syy/Vue3_Digital_Twin',
                title: '📜 工程源码'
            },
            {
                title: '📚 说明文档',
                children: [{
                        path: 'https://threejs.org/docs/index.html#manual/zh/introduction/Creating-a-scene',
                        title: '🎲 three.js'
                    }, {
                        path: 'https://tresjs.org/guide/',
                        title: '⚡ tres.js'
                    }, {
                        path: 'https://fesjs.mumblefe.cn/',
                        title: '💠 fes.js'
                    },
                ]
            },
            {
                path: 'https://skitter-surgeon-40d.notion.site/BUG-a5440aa5d23e4c76addfc4a8f6b7a0eb?pvs=73',
                title: '🙋‍♀️ Notion反馈'
            },
            {
                path: 'http://www.cloudready.cn/',
                title: '💫 公司主页'
            },
            {
                path: 'https://me.sjtu.edu.cn/bysj/',
                title: '🖼️交大毕设'
            },
        ],
    },
});

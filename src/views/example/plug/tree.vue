<template>
    <div class="views__plug__tree">
        <menu-item :data="data"></menu-item>
    </div>
</template>

<script>
import MenuItem from './tree/menu-item.vue';

export default {
    components: {
        MenuItem
    },
    data() {
        return {
            data: [
                {
                    name: '公司A',
                    children: [
                        {
                            name: '部门A',
                            children: []
                        },
                        {
                            name: '部门B',
                            children: []
                        },
                        {
                            name: '部门C',
                            children: [
                                {
                                    name: '人员A',
                                    children: []
                                },
                                {
                                    name: '人员B',
                                    children: []
                                }
                            ]
                        }
                    ]
                },
                {
                    name: '公司B',
                    children: []
                },
                {
                    name: '公司C',
                    children: []
                }
            ]
        };
    }
};
</script>
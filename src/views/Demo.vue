<template>
    <div class="demo-box">
        <el-row>
            <el-input size="small" v-model="content" placeholder="请输入值"></el-input>
        </el-row>
        <el-row>
            <span>你刚才输入的值是：</span>
            <span>{{content}}</span>
        </el-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            content: '',
        }
    },
    created: {},
    methods: {},
}
</script>
<style lang="less" scoped>
.demo-box {
    width: 500px;
}
</style>

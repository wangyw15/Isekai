<script lang="ts" setup>
import { toRefs, toRef, watchEffect, reactive, ref, Ref } from 'vue';
import { Item, Catalog } from '../dto';

const props = defineProps<{ selectedItems: Map<string, string>, selectedFeatures: string[] }>();
const refProps = ref(props);
const reaProps = reactive(props);
watchEffect(() => {
    console.log(props.selectedFeatures);
});
</script>

<template>
<el-tag v-for="feature in selectedFeatures">{{ feature }}</el-tag>
    <!--<el-descriptions title="角色卡！" direction="vertical" border>
        <el-descriptions-item label="尊姓大名"><el-input placeholder="名字" clearable/></el-descriptions-item>
        <el-descriptions-item label="性别"><el-input placeholder="名字" clearable/></el-descriptions-item>
        <el-descriptions-item label="种族"><el-input placeholder="名字" clearable/></el-descriptions-item>
        <el-descriptions-item label="世界局势"></el-descriptions-item>
        <el-descriptions-item label="开局状态"></el-descriptions-item>
        <el-descriptions-item label="居民风貌"></el-descriptions-item>
        <el-descriptions-item label="基础能力-力量"></el-descriptions-item>
        <el-descriptions-item label="基础能力-魔力"></el-descriptions-item>
        <el-descriptions-item label="基础能力-智力"></el-descriptions-item>
        <el-descriptions-item label="基础能力-体质"></el-descriptions-item>
        <el-descriptions-item label="基础能力-魅力"></el-descriptions-item>
        <el-descriptions-item label="基础能力-运气"></el-descriptions-item>
        <el-descriptions-item label="特质">
            <el-tag v-for="feature in refProps.selectedFeatures">{{ feature }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="你的角色传记（可选）"><el-input type="textarea" /></el-descriptions-item>
    </el-descriptions>-->
</template>
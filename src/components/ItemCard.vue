<script setup lang="ts">
defineProps<{ msg: string[] }>();
</script>

<template>
<el-table :data="msg">
    <el-table-column />
</el-table>
</template>
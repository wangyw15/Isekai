<script lang="ts" setup>
import { inject } from 'vue';
import type { Item, Catalog } from '../dto'

defineProps<{ catalog: Catalog }>();

const setFeatures: any = inject('$SetFeatures');
</script>

<template>
    <el-table
        :data="catalog.choices"
        style="width: 100%"
        highlight-current-row
        @selection-change="(val: Item[]) => setFeatures(val.map((item: Item) => item.name))"
    >
        <el-table-column>
            <template #header>
                <h1>{{ catalog.title }}</h1>
                <h2 v-if="catalog.description != ''">{{ catalog.description }}</h2>
            </template>
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column width="80" label="图标">
                <template #default="scope">
                    <el-avatar
                        shape="square"
                        :size="54"
                        :src="'data:image/png;base64,' + scope.row.imgdata"
                    ></el-avatar>
                </template>
            </el-table-column>
            <el-table-column width="90" label="名称">
                <template #default="scope">
                    <span>{{ scope.row.name }}</span>
                    <br />
                    <div>
                        <el-tag
                            v-if="scope.row.point > 0"
                            color="#1d9900"
                            effect="dark"
                            size="large"
                        >+{{ scope.row.point }}</el-tag>
                        <el-tag
                            v-else-if="scope.row.point == 0"
                            effect="dark"
                            size="large"
                        >{{ scope.row.point }}</el-tag>
                        <el-tag
                            v-else-if="scope.row.point < 0"
                            color="#d4371e"
                            effect="dark"
                            size="large"
                        >{{ scope.row.point }}</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="description" label="描述" />
        </el-table-column>
    </el-table>
    <el-divider></el-divider>
</template>
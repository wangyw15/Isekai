<script lang="ts" setup>
import { ElTable, selectGroupKey } from 'element-plus';
import { inject, watch, ref, defineComponent, onMounted } from 'vue'
import { Item, Catalog } from '../dto'

const props = defineProps<{ catalog: Catalog, selectName: String | undefined }>();

const setChoice: any = inject('$SetChoice');
const tableRef = ref<InstanceType<typeof ElTable>>();
var onInitial = true;

onMounted(() => {
    if (props.selectName) {
        var currentChoice = props.catalog.choices.filter((value, index, array) => value.name == props.selectName)[0];
        tableRef.value!.setCurrentRow(currentChoice);
    }
    onInitial = false;
});

function onChanged(newVal: Item, oldVal: Item) {
    if (!onInitial) {
        setChoice(props.catalog.title, newVal.name);
    }
}

</script>

<template>
    <el-table
        ref="tableRef"
        :data="catalog.choices"
        style="width: 100%"
        highlight-current-row
        @current-change="onChanged"
    >
        <el-table-column>
            <template #header>
                <h1>{{ catalog.title }}</h1>
                <h2 v-if="catalog.description != ''">{{ catalog.description }}</h2>
            </template>
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

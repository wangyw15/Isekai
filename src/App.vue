<script setup lang="ts">
import { ref, Ref, provide } from 'vue'
import { Item, Catalog } from './dto'
import CalalogTable from './components/CalalogTable.vue'
import MultiSelectCatalogTable from './components/MultiSelectCatalogTable.vue'
import Intro from './components/Intro.vue'
import CharacterCard from './components/CharacterCard.vue'

const InitialPoint = 30;
const Point = ref(InitialPoint);
const selectedItems = ref(new Map<string, string>());
const selectedFeatures: Ref<string[]> = ref([])
const catalogs: Ref<Catalog[]> = ref([]);
const features: Ref<Catalog | undefined> = ref();
var initialWorldPoints: number[] = [];
var worldIndex = 0;

provide('$SetChoice', (title: string, item: string) => { selectedItems.value.set(title, item); calculatePoint(); });
provide('$SetFeatures', (newFeatures: string[]) => { selectedFeatures.value = newFeatures; calculatePoint(); });
provide('$SwitchMamonoStatus', switchMamonoStatus);

fetch('./isekai-data/data.json').then(response => response.json()).then((json: Catalog[]) => {
  json.forEach((item: Catalog, index, array) => {
    if (item.title == '特质') {
      features.value = item;
    }
    else {
      catalogs.value.push(item);
      if (item.title == '世界局势') {
        initialWorldPoints = item.choices.map((value, index, array) => value.point);
        worldIndex = index;
      }
    }
  });
});

function calculatePoint() {
  var newPoint = InitialPoint;
  selectedItems.value.forEach((value, key) => {
    var currentCatalog = catalogs.value.filter((item, index, array) => item.title == key)[0];
    var currentItem = currentCatalog.choices.filter((item, index, array) => item.name == value)[0];
    newPoint += currentItem.point;
  });
  selectedFeatures.value.forEach((feature, index, array) => {
    var currentFeature = features.value?.choices.filter((item, index, array) => item.name == feature)[0];
    if (currentFeature) {
      newPoint += currentFeature.point;
    }
  });
  Point.value = newPoint;
}

function switchMamonoStatus(isMamono: boolean) {
  initialWorldPoints.forEach((value, index, array) => {
    catalogs.value[worldIndex].choices[isMamono ? array.length - 1 - index : index].point = value;
  });
}
</script>

<template>
  <div>
    <intro></intro>
  </div>
  <el-affix :offset="10">
    <el-card class="box-card">
      <h2>当前点数：{{ Point }}</h2>
    </el-card>
  </el-affix>
  <el-divider></el-divider>
  <el-skeleton :loading="features == undefined" :rows="5" animated style="text-align: left;"></el-skeleton>
  <div id="tableContainer">
    <calalog-table v-for="item in catalogs" :catalog="item" :select-name="undefined"></calalog-table>
    <multi-select-catalog-table v-if="features != undefined" :catalog="features"></multi-select-catalog-table>
  </div>
  <div id="charCardContainer">
    <!--<character-card :selected-items="reactive(selectedItems)" :selected-features="reactive(selectedFeatures)"></character-card>-->
  </div>
</template>

<style>
body {
  font-family: "LXGW WenKai Screen", sans-serif;
  /*background-color: #e6dcd2;*/
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>

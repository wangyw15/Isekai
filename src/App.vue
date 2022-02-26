<script setup lang="ts">
//import ElementPlus from 'element-plus'
import { createApp, computed, ref, App, reactive } from 'vue'
import { Item, Catalog } from './dto'
import CalalogTable from './components/CalalogTable.vue'
import MultiSelectCatalogTable from './components/MultiSelectCatalogTable.vue'
import Intro from './components/Intro.vue'
import CharacterCard from './components/CharacterCard.vue'

const InitialPoint = 30;
const Point = ref(30);
const selectedItems = new Map<string, string>();
var selectedFeatures = new Array<string>();
//var selectedFeatures = ref(new Array<string>());

var dataPromise: Promise<Catalog[]> = fetch('./isekai-data/data.json').then(response => response.json());
dataPromise.then(json => {
  var worldIndex = 0;
  json.forEach((catalog, index, array) => {
    if (catalog.title == '世界局势') {
      worldIndex = index;
    }
  });
  var initialWorldPoints = json[worldIndex].choices.map(item => item.point);

  var worldTable: App<Element>;
  var worldDiv: HTMLDivElement;

  json.forEach((val) => {
    var table = null;
    if (val.title == '特质') {
      table = createApp(MultiSelectCatalogTable, { catalog: val });
      table.provide('$SetFeatures', (features: string[]) => { selectedFeatures = features; calculatePoint(); });
      /*table.provide('$AddFeature', (featureName: string) => selectedFeatures.push(featureName));
      table.provide('$RemoveFeature', (featureName: string) => {
        selectedFeatures.splice(selectedFeatures.indexOf(featureName, 0), 1);
      });*/
    }
    else {
      table = createApp(CalalogTable, { catalog: val, selectName: undefined });
      table.provide('$SetChoice', (key: string, value: string) => { selectedItems.set(key, value); calculatePoint(); });
    }
    //table.use(ElementPlus);
    var newDiv = document.createElement('div');
    if (val.title == '世界局势') {
      worldTable = table;
      worldDiv = newDiv;
    }
    document.getElementById('tableContainer')?.appendChild(newDiv);
    //document.body.appendChild(newDiv);
    table.mount(newDiv);
  });

  /*var characterCard = createApp(CharacterCard);
  characterCard.mount('#charCardContainer');*/

  function calculatePoint() {
    var isMamono = false;

    for (let item of selectedItems.values()) {
      if (item == '魔物') {
        isMamono = true;
        break;
      }
    }

    if (isMamono) {
      for (let i = 0; i < initialWorldPoints.length; i++) {
        json[worldIndex].choices[i].point = initialWorldPoints[initialWorldPoints.length - 1 - i];
      }
    }
    else {
      for (let i = 0; i < initialWorldPoints.length; i++) {
        json[worldIndex].choices[i].point = initialWorldPoints[i];
      }
    }

    var worldSelected: string = '';
    if (selectedItems.has('世界局势')) {
      worldSelected = selectedItems.get('世界局势')!;
    }

    worldTable.unmount();
    worldTable = createApp(CalalogTable, { catalog: json[worldIndex], selectName: worldSelected });
    worldTable.provide('$SetChoice', (key: string, value: string) => { selectedItems.set(key, value); calculatePoint(); });
    worldTable.mount(worldDiv);

    var newPoint = InitialPoint;
    selectedItems.forEach((value, key) => {
      var currentItem = json.filter((catalog, index, array) => catalog.title == key)[0].choices.filter((item, index, array) => item.name == value)[0];
      newPoint += currentItem.point;
    });
    selectedFeatures.forEach((feature, index, array) => {
      var featuresList = json.filter((catalog, index, array) => catalog.title == '特质')[0];
      var currentFeature = featuresList.choices.filter((item, index, array) => item.name == feature)[0];
      newPoint += currentFeature.point;
    });
    Point.value = newPoint;
  }
});
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
  <div id="tableContainer"></div>
  <div id="charCardContainer">
    <character-card :selected-items="reactive(selectedItems)" :selected-features="reactive(selectedFeatures)"></character-card>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

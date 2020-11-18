<template>
  <div id="app">
    <NavigationHeader />
    <router-view class="router-view-container" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavigationHeader from '@/components/common/NavigationHeader.vue';

@Component({
  components: { NavigationHeader }
})
export default class App extends Vue {}
</script>

<style lang="scss">
.router-view-container {
  padding-top: 100px;
  padding-left: 20%;
  h1 {
    font-size: 28px;
    padding-bottom: 22px;
    color: #333;
  }
  h3 {
    font-size: 22px;
    padding-bottom: 16px;
    color: #444;
  }
}
</style>

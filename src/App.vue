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

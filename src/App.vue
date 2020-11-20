<template>
  <div id="app">
    <NavigationHeader />
    <transition name="slide-fade">
      <router-view class="router-view-container" />
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavigationHeader from '@/components/common/NavigationHeader.vue';

@Component({
  components: { NavigationHeader }
})
export default class App extends Vue {
  created() {
    this.$store.dispatch('UserAuth/CHECK_USER_COOKIE');
  }
}
</script>

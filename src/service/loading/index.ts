import Store from '@/store';

export function SetLoadingIndicator(type: 'on' | 'off') {
  if (typeof Store !== 'undefined') {
    type === 'on' && Store.dispatch('SET_IS_LOADING', true);
    type === 'off' &&
      setTimeout(() => {
        Store.dispatch('SET_IS_LOADING', false);
      }, 1000);
  }
}

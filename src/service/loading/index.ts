import Store from '@/store';

export function SetLoadingIndicator(type: 'on' | 'off') {
  type === 'on' && Store.dispatch('SET_IS_LOADING', true);
  type === 'off' &&
    setTimeout(() => {
      Store.dispatch('SET_IS_LOADING', false);
    }, 300);
}

<script>
import {mapMutations} from 'vuex';

export default {
  created () {
    wx.login({
      success: async res => {
        console.log('res...', res);
        this.updateState({
          code: res.code
        })
      }
    });
  },
  methods: {
    ...mapMutations({
      updateState: 'user/updateState'
    })
  }
}
</script>

<style>
page{
  width: 100%;
  height: 100%;
}

button{
  padding: 0;
  margin: 0;
}
.container {
  height: 100%;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>

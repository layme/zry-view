<template>
  <div id="all">
    <Input type="text" placeholder="请输入地点" prefix="ios-pin"
              :style="searchStyle" v-model="keyword" clearable></Input>
    <baidu-map
      class="bm-view"
      :center="center"
      :zoom="zoom"
      :scroll-wheel-zoom="true"
      @ready="handleReady"
      @click="handleClick"
      @moving="syncCenterAndZoom"
      @moveend="syncCenterAndZoom"
      @zoomend="syncCenterAndZoom">
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
      <bm-local-search :keyword="keyword" :auto-viewport="true" :panel="false"></bm-local-search>
    </baidu-map>
  </div>
</template>
<script>

export default {
  name: 'MapCard',
  props: {
    location: Object,
    searchStyle: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      keyword: '',
      center: {},
      zoom: 15,
      BMap: '',
      map: ''
    }
  },
  mounted () {
  },
  methods: {
    handleReady ({ BMap, map }) {
      this.BMap = BMap
      this.map = map
      if (this.location.lng && this.location.lat) {
        this.center = this.location
        const new_point = new BMap.Point(this.location.lng, this.location.lat)
        const marker = new BMap.Marker(new_point)
        map.addOverlay(marker)
        map.panTo(new_point)
      } else {
        let location = new BMap.Geolocation()
        location.getCurrentPosition((r) => {
          this.center = { lng: r.longitude, lat: r.latitude }
          const new_point = new BMap.Point(r.longitude, r.latitude)
          const marker = new BMap.Marker(new_point)
          map.addOverlay(marker)
          map.panTo(new_point)
        }, {
          enableHighAccuracy: true
        })
      }
    },
    handleClick ({ type, target, point, pixel, overlay }) {
      this.map.clearOverlays()
      const new_point = new BMap.Point(point.lng, point.lat)
      const marker = new BMap.Marker(new_point)
      this.map.addOverlay(marker)
      this.$emit('click', point)
    },
    syncCenterAndZoom (e) {
      const { lng, lat } = e.target.getCenter()
      this.center.lng = lng
      this.center.lat = lat
      this.zoom = e.target.getZoom()
    }
  }
}
</script>
<style scoped>
  .bm-view {
    width: 100%;
    height: 100%;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
  }
</style>
